const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");

require('dotenv').config()
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log('mongodb connected'));

const path = require('path');
const PORT = process.env.PORT || 4091;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 4091));

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
}); // start Node + Express server on port PORT

if (process.env.NODE_ENV == 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) =>
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// Users
//////////////////////////////////////////////////////////////////////
app.post('/api/login', async (request, response, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, username, regionCode, countryCode, error
	
  var error = '';
  var ret;

  const { login, pass } = request.body;

  if (isNotValidString(login))
  {
    ret = {error:'login/username cannot be empty or null'};
  }
  else if (isNotValidString(pass))
  {
    ret = {error:'password cannot be empty or null'};
  }
  else
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({userName:login,password:pass}).toArray();
  
    var id = -1;
    var firstName = '';
    var lastName = '';
    var userName = '';
    var regionCode = -1;
    var countryCode = -1;
  
    if( results.length > 0 )
    {
      id = results[0]._id;
      firstName = results[0].firstName;
      lastName = results[0].lastName;
      userName = results[0].userName;
      regionCode = results[0].regionCode;
      countryCode = results[0].countryCode;
      ret = { _id:id, userName:userName, firstName:firstName, lastName:lastName, regionCode:regionCode, countryCode:countryCode, error:''};
    }
    else
    {
      ret = { error:'User is not found'};
    }
  }

  response.status(200).json(ret);
});

app.post('/api/signup', async (request, response, next) => 
{
  // incoming: firstname, lastname, username, password, email, regioncode, countrycode
  // outgoing: id, firstName, lastName, error
	
  var error = '';
  var results;

  const { firstname, lastname, login, pass, email, regioncode, countrycode } = request.body;

  try
  {
    const db = client.db("LargeProject");

    var resultsBool = (await db.collection('Users').countDocuments({"userName":login}) > 0);

    if (resultsBool)
    {
      response.status(200).json({ success:false, error:'Username is taken' });
      return;
    }

    resultsBool = (await db.collection('Users').countDocuments({"email":email}) > 0);

    if (resultsBool)
    {
      response.status(200).json({ success:false, error:'Email is in use' });
      return;
    }

    results = await db.collection('Users').insertOne({
      firstName: firstname,
      lastName: lastname, 
      userName: login, 
      password: pass, 
      email: email,
      dateCreated: new Date(),
      countryCode: countrycode,
      regionCode: regioncode
    });

  }
  catch (error)
  {
    console.error(error);
  }

  response.status(200).json({
      success: true,
      error:'' });
});

app.post('/api/emailInUse', async (request, response, next) => 
{
  // incoming: email
  // outgoing: true/false (if an email is in use)
  var error = '';

  const { email } = request.body;

  const db = client.db("LargeProject");
  const results = await db.collection('Users').find({email:email}).toArray();

  var ret;

  if( results.length > 0 )
  {
    ret = { emailInUse:true, error:'Email is in use'};
  }
  else
  {
    ret = { emailInUse:false, error:''};
  }

  response.status(200).json(ret);
});

// User Emergency Contacts
//////////////////////////////////////////////////////////////////////////

app.post('/api/getContacts', async (request, response, next) => 
{
  // incoming: objectId
  // outgoing: id, firstName, lastName, phoneNumber, description, error
	
  var error = '';

  const { objectId } = request.body;

  const db = client.db("LargeProject");
  const results = await db.collection('UserEmergencyContacts').find({userCreatedObjectId:objectId}).toArray();

  var ret;
  var id = -1;
  var firstName = '';
  var lastName = '';
  var phoneNumber = '';
  var description = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    firstName = results[0].firstName;
    lastName = results[0].lastName;
    phoneNumber = results[0].phoneNumber;
    description = results[0].description;
    ret = { _id:id, firstName:firstName, lastName:lastName, phoneNumber:phoneNumber, description:description, error:''};
  }
  else
  {
    ret = { error:'User id is not found or User has empty contacts'};
  }

  response.status(200).json(ret);
});

app.post('/api/deleteContact', async (request, response, next) => 
{
  // incoming: objectId
  // outgoing: success, error
	
 var error = '';

  const { objectId } = request.body;

  const db = client.db("LargeProject");
  const results = await db.collection('UserEmergencyContacts').deleteOne({_id:objectId});
 
  var ret = ( results.length > 0 ) ? { success:true, error:'' } : { success:false, error:'Could not find contact' };

  response.status(200).json(ret);
});

app.post('/api/addContact', async (request, response, next) => 
{
  // incoming: firstName, lastName, phoneNumber, description, userCreatedObjectId
  // outgoing: error
	
 var error = '';

  const { usercreatedobjectid, firstname, lastname, phonenumber, description } = request.body;

  const db = client.db("LargeProject");
  var ret = await db.collection('UserEmergencyContacts').insertOne({firstName:firstname, lastName:lastname, phoneNumber:phonenumber, description:description, userCreatedObjectId:usercreatedobjectid});

  response.status(200).json({success:true, error:''});
});

app.post('/api/editContact', async (request, response, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, username, regionCode error
	
 var error = '';

  const { usercreatedobjectid, firstname, lastname, phonenumber, description } = request.body;

  const db = client.db("LargeProject");
  
  const results = await db.collection('UserEmergencyContacts').updateOne(
    { userCreatedObjectId:usercreatedobjectid }, {$set:{firstName:firstname, lastName:lastname, phoneNumber:phonenumber, description:description}});


  if( results.length > 0 )
  {
    ret = { success:true, error:''};
  }
  else
  {
    ret = { success:false, error:'User is not found or no contact found'};
  }

  response.status(200).json(ret);
});

// Main Emergency Contacts
//////////////////////////////////////////////////////////////////////////

app.post('/api/getMainEmergencyContacts', async (request, response, next) => 
{
  // incoming: firstName, lastName, phoneNumber, description, userCreatedObjectId
  // outgoing: error
	
 var error = '';

  const { countrycode } = request.body;

  const db = client.db("LargeProject");
  var result = await db.collection('UserEmergencyContacts').find({ countryCode:countrycode }).toArray();

  if (result.length > 0)
  {
    var name = result[0].name;
    var phoneNumber = result[0].phoneNumber;
    if (result[0].description === null)
    {
      ret = {name:name, phoneNumber:phoneNumber, error:''};
    }
    else
    {
      var description = result[0].description;
      ret = {success:true, name:name, phoneNumber:phoneNumber, description:description, error:''};
    }

  }
  else
  {
    ret = {success:false, error:'No Main Emergency Contact for the Country Code'};
  }

  response.status(200).json(ret);
});

// Region Emergency Contacts
//////////////////////////////////////////////////////////////////////////

app.post('/api/getRegionEmergencyContacts', async (request, response, next) => 
{
  // incoming: regioncode, countrycode
  // outgoing: error
	
 var error = '';
 
  const { regioncode, countrycode } = request.body;

  const db = client.db("LargeProject");
  var result = await db.collection('RegionEmergencyContacts').find({ regionCode:regioncode, countryCode:countrycode }).toArray();

  var ret;

  if (result.length > 0)
  {
    var name = result[0].name;
    var phoneNumber = result[0].phoneNumber;
    var address = result[0].address;
    var zipCode = result[0].zipCode;
    var state = result[0].state;
    var country = result[0].country;
    var description = result[0].description;
    
    if (description === null)
    {
      ret = {name:name, phoneNumber:phoneNumber, address:address, zipCode:zipCode, state:state, country:country, error:''};  
    }
    else
    {
      ret = {name:name, phoneNumber:phoneNumber, description:description, address:address, zipCode:zipCode, state:state, country:country, error:''};
    }
    
  }
  else
  {
    ret = {error:'No Region Emergency Contact found'};
  }
  
  response.status(200).json(ret);
});

function isNotValidString(myString)
{
  return (!myString || myString.length === 0);
}
app.post('/api/emailChange', async (request, response, next) => 
{
  // incoming: login, Password, Email
  // outgoing: userName, email, error

  const { login, Password, Email } = request.body;

  try
  {
    const db = client.db("LargeProject");

    const emailExists = await db.collection('Users').findOne({"email":Email});
    if (emailExists)
    {
      response.status(200).json({ error:'Email is already in use.' });
      return;
    }

    const result = await db.collection('Users').updateOne(
      {
        "userName": login,
        "password": Password
      },
      {
        $set:
        {
          "email":Email
        }
      }
    );

    if (result.modifiedCount === 0) {
      response.status(200).json({ error:'Failed to update email.' });
      return;
    }

    response.status(200).json({
      userName: login, 
      email: Email,
      error:'Email updated successfully.' 
    });
  }
  catch (error)
  {
    console.error(error);
    response.status(500).json({ error:'An error occurred while updating email.' });
  }
});

app.post('/api/passwordChange', async (request, response, next) => 
{
  // incoming: firstname, lastname, username, password, email, regioncode countrycode
  // outgoing: id, firstName, lastName, error
	
  var error = '';
  var results;

  const { login, Password, Email } = request.body;

  try
  {
    const db = client.db("LargeProject");

    resultsBool = (await db.collection('Users').countDocuments({"password":Password}) > 0);
    if (resultsBool)
    {
      response.status(200).json({ error:'Password in use' });
      return;
    }

    results = await db.collection('Users').updateOne(
      {
        userName: login,
        email: Email
      },
      {
        $set:
        {
          password:Password
        }
      }
    );

    console.log(results);
  }
  catch (error)
  {
    console.error(error);
  }

  response.status(200).json({
      userName: login, 
      password: Password,
      error:'Password Updated' });
});

// Region Emergency Contacts
//////////////////////////////////////////////////////////////////////////
