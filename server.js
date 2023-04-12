const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const PIN_LOCATION_TYPE = 'Point';
const DEFAULT_PIN_SEARCH_RADIUS = 1000;
const DEFAULT_LIGHT_DARK_MODE = true;
const DEFAULT_THEME = 1;


require('dotenv').config()
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log('mongodb connected'));

const path = require('path');
const { ObjectId } = require('mongodb');
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

app.post('/api/getAllUserInformation', async(request, response, next) =>
{
  // incoming: objectId
  // outgoing: ALL USER DATA

  var error = '';
  var ret;
  var retVal;

  const { objectId } = request.body;
  
  if (objectId === null)
  {
    ret = {success:false, results:null, error:'objectId cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({_id:new ObjectId(objectId)}).toArray();

    if (results.length > 0)
    {
      var theme = results[0].theme;
      var lightDarkMode = results[0].lightDarkMode;
      var searchRadius = results[0].searchRadius;
      var firstName = results[0].firstName;
      var lastName = results[0].lastName;
      var userName = results[0].userName;
      var email = results[0].email;
      var countryCode = results[0].countryCode;
      var regionCode = results[0].regionCode;

      retVal = {firstName:firstName, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius,
        firstName:firstName, lastName:lastName, userName:userName, email:email, countryCode:countryCode, regionCode:regionCode};

      ret = {success:true, results:retVal, error:''}
      response.status(200).json(ret);
      return;
    }
    else
    {
      ret = {success:false, results:null, error:'User does not exist'};
      response.status(500).json(ret);
      return;
    }

  }
});

app.post('/api/getSettings', async(request, response, next) =>
{
  // incoming: objectId
  // outcoming: theme, lightDarkMode, searchRadius

  var error = '';
  var ret;

  const { objectId } = request.body;

  if (objectId === null)
  {
    ret = {success:false, error:'objectId cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else 
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').find({_id:new ObjectId(objectId)}).toArray();

    var theme = '';
    var lightDarkMode = null;
    var searchRadius = 0;

    if (results.length > 0)
    {
      theme = results[0].theme;
      lightDarkMode = results[0].lightDarkMode;
      searchRadius = results[0].searchRadius;

      ret = {success:true, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius, error:''};
      response.status(200).json(ret);
      return;
    }
    else
    {
      ret = {success:false, error:'User Settings does not exist'};
      response.status(500).json(ret);
      return;
    }
  }

});

app.post('/api/setSettings', async(request, response, next) =>
{
  // incoming: objectId, theme, lightDarkMode, searchRadius
  // outcoming: success, error

  var error = '';
  var ret;

  const { objectId, theme, lightDarkMode, searchRadius } = request.body;

  if (objectId === null)
  {
    ret = {success:false, error:'objectId cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else if (theme === null || theme < 0)
  {
    ret = {success:false, error:'theme cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else if (lightDarkMode === null)
  {
    ret = {success:false, error:'lightDarkMode cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else if (searchRadius === null || searchRadius < 0)
  {
    ret = {success:false, error:'searchRadius cannot be null'};
    response.status(500).json(ret);
    return;
  }
  else 
  {
    const db = client.db("LargeProject");
    const results = await db.collection('Users').updateOne(
      {_id:new ObjectId(objectId)}, {$set:{theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}});

    if (results.modifiedCount > 0)
    {
      ret = {success:true, error:''};
      response.status(200).json(ret);
      return;
    }
    else
    {
      ret = {success:false, error:'User Settings cannot be edited or user does not exist'};
      response.status(500).json(ret);
      return;
    }
  }

});

app.post('/api/login', async (request, response, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, username, regionCode, countryCode, error
	
  var error = '';
  var ret;

  const { login, pass } = request.body;

  if (isNotValidString(login))
  {
    ret = {success:false, error:'login/username cannot be empty or null'};
    response.status(500).json(ret);
    return;

  }
  else if (isNotValidString(pass))
  {
    ret = {success:false, error:'password cannot be empty or null'};
    response.status(500).json(ret);
    return;
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
      ret = {success:true, _id:id, userName:userName, firstName:firstName, lastName:lastName, regionCode:regionCode, countryCode:countryCode, error:''};

      response.status(200).json(ret);
      return;
    }
    else
    {
      ret = {success:false, error:'User is not found'};
      response.status(500).json(ret);
      return;
    }
  }

});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'Vigilant12023@gmail.com',
    pass: 'mnsqssobuemcjfzr'
  }
});

app.post('/api/signup', async (request, response, next) => 
{
  // incoming: firstname, lastname, username, password, email, regioncode, countrycode
  // outgoing: id, firstName, lastName, error
	
  var error = '';
  var results;

  const { firstname, lastname, login, pass, email, regioncode, countrycode } = request.body;
  const verificationToken = Math.random().toString(36).substr(2, 8); 

  if (isNotValidString(firstname))
  {
    response.status(500).json({ success:false, error:'First name is not valid (empty or null)' });
    return;
  }
  else if (isNotValidString(lastname))
  {
    response.status(500).json({ success:false, error:'Last name is not valid (empty or null)' });
    return;
  }
  else if (isNotValidString(login))
  {
    response.status(500).json({ success:false, error:'Login is not valid (empty or null)' });
    return;
  }
  else if (isNotValidString(pass))
  {
    response.status(500).json({ success:false, error:'Password is not valid (empty or null)' });
    return;
  }
  else if (isNotValidString(email))
  {
    response.status(500).json({ success:false, error:'Email is not valid (empty or null)' });
    return;
  }
  else if (regioncode === null || regioncode < 0)
  {
    response.status(500).json({ success:false, error:'Region code is not valid (negative number or null)' });
    return;
  }
  else if (countrycode === null || countrycode < 0)
  {
    response.status(500).json({ success:false, error:'Country code is not valid (negative number or null)' });
    return;
  }
  else
  {
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
        regionCode: regioncode,
        verified:false,
        verificationToken: verificationToken,
        theme:DEFAULT_THEME,
        lightDarkMode:DEFAULT_LIGHT_DARK_MODE,
        searchRadius:DEFAULT_PIN_SEARCH_RADIUS
      });
  
      const mailOptions = {
        from: 'vigilant12023@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: `<p>Thank you for signing up! Please <a href="http://localhost:4091/verify?email=${email}&token=${verificationToken}">click here</a> to verify your email.</p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  
    
  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: false, error: 'Server error' });
  }

  return response.status(200).json({ success: true, error: '' });
}

});

app.get('/verify', async (request, response) => {
  const { email, token } = request.query;

  try {
    const db = client.db("LargeProject");

    const user = await db.collection('Users').findOneAndUpdate(
      { email: email, verificationToken: token },
      { $set: { verified: true }, $unset: { verificationToken: 1 } },
      { returnOriginal: false }
    );

    if (!user.value) {
      return response.status(400).json({ error: 'Invalid verification token' });
    }

    return response.status(200).json({ message: 'Email verified successfully' });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Server error' });
  }
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
  var retval;

  const { objectId } = request.body;

  const db = client.db("LargeProject");

  const exists = !(await db.collection('Users').countDocuments({_id:new ObjectId(objectId)}) > 0);

  if (exists)
  {
    retval = {success:false, results:null, error:'User does not exist'};
    response.status(500).json(retval);
    return;
  }

  const results = await db.collection('UserEmergencyContacts').find({userCreatedObjectId:new ObjectId(objectId)}).toArray();

  var ret = [];
  var id = -1;
  var firstName = '';
  var lastName = '';
  var phoneNumber = '';
  var description = '';

  if( results.length > 0 )
  {
    for (i = 0; i < results.length; i++)
    {
      id = results[i]._id;
      firstName = results[i].firstName;
      lastName = results[i].lastName;
      phoneNumber = results[i].phoneNumber;
      description = results[i].description;

      ret.push({id:id, firstName:firstName, lastName:lastName, phoneNumber:phoneNumber, description:description});
    }

    retval = {success:true, results:ret, error:''};
  }
  else
  {
    retval = {success:false, results:null, error:'User has empty contact'};
    response.status(500).json(retval);
    return;
  }

  response.status(200).json(retval);
});

app.post('/api/deleteContact', async (request, response, next) => 
{
  // incoming: objectId
  // outgoing: success, error
	
 var error = '';

  const { objectId } = request.body;

  const db = client.db("LargeProject");
  const results = await db.collection('UserEmergencyContacts').deleteOne({_id:new ObjectId(objectId)});
 
  var ret = ( results.deletedCount === 1 ) ? { success:true, error:'' } : { success:false, error:'Could not find contact' };

  response.status(200).json(ret);
});

app.post('/api/addContact', async (request, response, next) => 
{
  // incoming: firstName, lastName, phoneNumber, description, userCreatedObjectId
  // outgoing: error
	
 var error = '';

  const { usercreatedobjectid, firstname, lastname, phonenumber, description } = request.body;

  const db = client.db("LargeProject");
  var ret = await db.collection('UserEmergencyContacts').insertOne({firstName:firstname, lastName:lastname, phoneNumber:phonenumber, description:description, userCreatedObjectId:new ObjectId(usercreatedobjectid)});

  response.status(200).json({success:true, error:''});
});

app.post('/api/editContact', async (request, response, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, username, regionCode error
	
 var error = '';

  const { id, firstname, lastname, phonenumber, description } = request.body;

  const db = client.db("LargeProject");
  
  const results = await db.collection('UserEmergencyContacts').updateOne(
    { _id:new ObjectId(id) }, {$set:{firstName:firstname, lastName:lastname, phoneNumber:phonenumber, description:description}});

  if( results.modifiedCount > 0 )
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
  // incoming: countrycode
  // outgoing: error
	
 var error = '';

  const { countrycode } = request.body;

  const db = client.db("LargeProject");
  var result = await db.collection('MainEmergencyContacts').find({ countryCode:countrycode }).toArray();
  var ret;
  var _ret = [];
  
  if (result.length > 0)
  {
    for (i = 0; i < result.length; i++)
    {
        var name = result[i].name;
        var phoneNumber = result[i].phoneNumber;
        var description = result[i].description;
        
        _ret.push({name:name, phoneNumber:phoneNumber, description:description, error:''});
    }
      
      ret = {success:true, results:_ret, error:''};
      response.status(200).json(ret);
  }
  else
  {
    ret = {success:false, results:_ret, error:'No Main Emergency Contacts for the Country Code'};
    response.status(500).json(ret);
  }

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

  var ret = [];

  if (result.length > 0)
  {
    for (i = 0; i < result.length; i++)
    {
      var name = result[i].name;
      var phoneNumber = result[i].phoneNumber;
      var address = result[i].address;
      var zipCode = result[i].zipCode;
      var state = result[i].state;
      var country = result[i].country;
      var description = result[i].description;

      ret.push({name:name, phoneNumber:phoneNumber, description:description, address:address, zipCode:zipCode, state:state, country:country, error:''});
    }
  }
  else
  {
    response.status(500).json({success:false, results:ret, error:'No Region Emergency Contacts found'});
    return;
  }
  
  response.status(200).json({success:true, results:ret, error:''});
});

function isNotValidString(myString)
{
  return (!myString || myString.length === 0);
}
app.post('/api/emailChange', async (request, response, next) => 
{
  // incoming: login, Password, Email
  // outgoing: userName, email, error

  const { login, pass, email } = request.body;

  try
  {
    const db = client.db("LargeProject");

    const emailExists = await db.collection('Users').findOne({"email":email});

    if (emailExists)
    {
      response.status(200).json({ error:'Email is already in use.' });
      return;
    }

    const result = await db.collection('Users').updateOne(
      {
        userName: login,
        password: pass
      },
      {
        $set:
        {
          email:email
        }
      }
    );

    if (result.modifiedCount === 0) {
      response.status(200).json({ error:'Failed to update email.' });
      return;
    }

    response.status(200).json({
      userName: login, 
      email: email,
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

  const { login, pass, email } = request.body;

  try
  {
    const db = client.db("LargeProject");

    results = await db.collection('Users').updateOne(
      {
        userName:login,
        email:email
      },
      {
        $set:
        {
          password:pass
        }
      }
    );
  }
  catch (error)
  {
    console.error(error);
    response.status(500).json({error:error});
    return;
  }

  response.status(200).json({
      userName:login, 
      password:pass,
      error:'Password Updated' });
});

// Pins
//////////////////////////////////////////////////////////////////////////

app.post('/api/addPin', async (request, response, next) => 
{
  // incoming: usercreatedobjectid, title, Address, zip, State, Country, Resolved, lastitude, longitude
  // outgoing: error, success
	
  var error = '';

  const { usercreatedobjectid, title, Address, zip, State, Country, Description, Resolved, latitude, longitude} = request.body;

  try
  {
    const db = client.db("LargeProject");
    var result = await db.collection('Pins').insertOne({
      title:title,
      address:Address, 
      zipCode:zip, 
      state:State, 
      country:Country,
      location: {
        type: PIN_LOCATION_TYPE,
        coordinates : [longitude, latitude],
        },
      description:Description,
      numResolved:Resolved, 
      userCreatedObjectId:new ObjectId(usercreatedobjectid),
      dateCreated:new Date()
    });
  }
  catch (error)
  {
    console.log(error);
    response.status(500).json({success:false, error:''});
    return;
  }

  response.status(200).json({success:true, error:''});
});

app.post('/api/editPin', async (request, response, next) => 
{
  // incoming: ID, usercreatedobjectid, title, Address, zip, State, Country, Description, Resolved, latitude, longitude
  // outgoing: error, success
	
  var error = '';
  var retval;

  const { ID, usercreatedobjectid, title, Address, zip, State, Country, Description, Resolved, latitude, longitude } = request.body;

  const db = client.db("LargeProject");
  
  const results = await db.collection('Pins').updateOne(
    { _id: new ObjectId(ID)}, 
    {$set:
      { 
        userCreatedObjectId: new ObjectId(usercreatedobjectid),
        title:title,
        address:Address, 
        zipCode:zip, 
        state:State, 
        country:Country,
        location: {
          type: PIN_LOCATION_TYPE,
          coordinates : [longitude, latitude],
        },
        description:Description,
        numResolved:Resolved,
        dateCreated:new Date()
      }
    });

  if( results.modifiedCount > 0 )
  {
    retval = {success:true, error:''};
    response.status(200).json(retval);
  }
  else
  {
    retval = {success:false, error:'Failed to edit pin'};
    response.status(500).json(retval);
  }

});

app.post('/api/searchPins', async (request, response, next) => 
{
  // incoming: latitude, longitude, maximumDist
  // outgoing: error, success

  var searchLocationType = '2dsphere';
  var ret = [];

  const {latitude, longitude, maximumDist} = request.body;

  try
  {
    const db = client.db("LargeProject");

    const results = await db.collection("Pins").find({
      location: {
        $near: {
          $geometry: {
            type:  PIN_LOCATION_TYPE, 
            coordinates: [longitude, latitude]
          },
          $maxDistance: maximumDist
        }
      }
    }).toArray();

    if (results.length > 0)
    {
      response.status(200).json({success:true, results:results, error:''});
    }
    else
    {
      response.status(500).json({success:false, results:null, error:'No Pins'});
    }
  } 
  catch (error)
  {
    console.log(error);
    response.status(500).json({success:false, results:null, error:'Internal failure'});
  }
});

app.post('/api/deletePin', async (request, response, next) => 
{
  // incoming: objectId
  // outgoing: error, success
	
  var error = '';

  const {objectId} = request.body;
  var retval;

  const db = client.db("LargeProject");
  var ret = await db.collection('Pins').deleteOne({_id: new ObjectId(objectId)});

  if (ret.deletedCount > 0)
  {
    retval = {success:true, error:''};
    response.status(200).json(retval);
  }
  else
  {
    retval = {success:false, error:'Failed to delete pin'};
    response.status(500).json(retval);
  }
});
