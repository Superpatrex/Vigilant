const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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


app.post('/api/login', async (request, response, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, username, regionCode error
	
 var error = '';

  const { login, pass } = request.body;

  const db = client.db("LargeProject");
  const results = await db.collection('Users').find({userName:login,password:pass}).toArray();

  var ret;
  var id = -1;
  var firstName = '';
  var lastName = '';
  var userName = '';
  var regionCode = -1;
  var countryCode = -1;

  console.log(results);

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

  response.status(200).json(ret);
});

app.post('/api/signup', async (request, response, next) => 
{
  // incoming: firstname, lastname, username, password, email, regioncode countrycode
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
      response.status(200).json({ error:'Username is taken' });
      return;
    }

    resultsBool = (await db.collection('Users').countDocuments({"email":email}) > 0);

    if (resultsBool)
    {
      response.status(200).json({ error:'Email is in use' });
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

    console.log(results);
  }
  catch (error)
  {
    console.error(error);
  }

  response.status(200).json({
      userName: login, 
      countryCode: countrycode,
      regionCode: regioncode,
      error:'User created' });
});

app.post('/api/emailChange', async (request, response, next) => 
{
  // incoming: firstname, lastname, username, password, email, regioncode countrycode
  // outgoing: id, firstName, lastName, error
	
  var error = '';
  var results;

  const { login, Password, Email } = request.body;

  try
  {
    const db = client.db("LargeProject");

    resultsBool = (await db.collection('Users').countDocuments({"email":Email}) > 0);
    if (resultsBool)
    {
      response.status(200).json({ error:'Email is in use' });
      return;
    }

    results = await db.collection('Users').updateOne(
      {
        userName: login,
        password: Password
      },
      {
        $set:
        {
          email:Email
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
      email: Email,
      error:'Email Updated' });
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
