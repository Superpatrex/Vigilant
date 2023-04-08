const { ObjectId } = require('mongodb');
const request = require('request');

const loginEndpoint = 'http://localhost:4091/api/login';
const singupEndpoint = 'http://localhost:4091/api/signup';
const getContactsEndpoint = 'http://localhost:4091/api/getContacts';
const deleteContactEndpoint = 'http://localhost:4091/api/deleteContact';
const addContactEndpoint = 'http://localhost:4091/api/addContact';
const editContactEndpoint = 'http://localhost:4091/api/editContact';
const getMainEmergencyContactsEndpoint = 'http://localhost:4091/api/getMainEmergencyContacts';
const getRegionEmergencyContactsEndpoint = 'http://localhost:4091/api/getRegionEmergencyContacts';
const addPinEndPoint = 'http://localhost:4091/api/addPin';
const deletePinEndPoint = 'http://localhost:4091/api/deletePin';
const editPinEndPoint = 'http://localhost:4091/api/editPin';

const testObjectId = "123456789012345678901234";
const deleteObjectId = "123456789012345678901235";
const editObjectId = "123456789012345678901236";
const testObjectIdDoesNotExist = "123456789012345678901230"



// NOTE TO USER: these tests put must be used in conjuction with scripts to insert
//               data into the database and npm start on the API
describe('User Unit Tests',function()
{
    it('login Pass',function(done)
    {
        request.post(loginEndpoint, {json: true, body: {login:'IAmATestUser', pass:'testytesy123'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('');
            expect(response.body.firstName).toEqual('TestMe');
            expect(response.body.lastName).toEqual('User');
            expect(response.body.userName).toEqual('IAmATestUser');
            expect(response.body.countryCode).toEqual(1);
            expect(response.body.regionCode).toEqual(1);
            expect(response.body._id).toEqual(testObjectId);
            done();
        });
    });

    it('login Does Not Exist', function(done)
    {
        request.post(loginEndpoint, {json: true, body: {login:'thisLogInDoesNotExist', pass:'pass123456789'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("User is not found");
            done();
        });
    });

    it('login Username is null',function(done)
    {
        request.post(loginEndpoint, {json: true, body: {login:null, pass:'pass123456789'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("login/username cannot be empty or null");
            done();
        });
    });

    it('login Password is null',function(done)
    {
        request.post(loginEndpoint, {json: true, body: {login:'thisLogInDoesNotExist', pass:null}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("password cannot be empty or null");
            done();
        });
    });

    it('signup Pass',function(done)
    {
        request.post(singupEndpoint, {json: true, body: {firstname:'Test', lastname:'User', login:'CoolGuy',
            pass:'IlikeMicrofiberTowles', email:'cool@email.com', regioncode:2, countrycode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            expect(response.body.error).toEqual('');
            done();
        });
    });

    it('signup Email already being Used',function(done)
    {
        request.post(singupEndpoint, {json: true, body: {firstname:'Abhi', lastname:'Kotta', login:'evenCoolerGuy',
            pass:'IlikeMicrofiberTowles', email:'test@me.com', regioncode:2, countrycode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(false);
            expect(response.body.error).toEqual("Email is in use");
            done();
        });
    });

    it('signup Username already being Used',function(done)
    {
        request.post(singupEndpoint, {json: true, body: {firstname:'Abhi', lastname:'Kotta', login:'IAmATestUser',
            pass:'IlikeMicrofiberTowles', email:'testytesty@me.com', regioncode:2, countrycode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(false);
            expect(response.body.error).toEqual("Username is taken");
            done();
        });

        //TODO Add null checks for signup
    });
});

describe('User Emergency Contacts', function()
{
    it('getContacts Pass',function(done)
    {
        request.post(getContactsEndpoint, {json: true, body: {objectId:new ObjectId(testObjectId)}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('getContacts No User',function(done)
    {
        request.post(getContactsEndpoint, {json: true, body: {objectId:new ObjectId(testObjectId)}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect()
            done();
        });
    });

    it('getContacts No Contacts',function(done)
    {
        request.post(getContactsEndpoint, {json: true, body: {objectId:new ObjectId(testObjectIdDoesNotExist)}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('User id is not found or User has empty contacts');
            done();
        });
    });

    it('deleteContact Pass',function(done)
    {
        request.post(deleteContactEndpoint, {json: true, body: {objectId:new ObjectId(deleteObjectId)}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            expect(response.body.error).toEqual('');
            done();
        });
    });

    it('deleteContact Not matching Contact',function(done)
    {
        request.post(deleteContactEndpoint, {json: true, body: {objectId: new ObjectId()}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(false);
            expect(response.body.error).toEqual('Could not find contact');
            done();
        });
    });

    it('addContact Pass',function(done)
    {
        let objectId = new ObjectId(testObjectId);
        let firstName = "Joe";
        let lastName = "Shome";
        let phoneNumber = "567-890-2345";
        let description = "What a cool guy so cool";

        request.post(addContactEndpoint, {json: true, body: {usercreatedobjectid:objectId, firstname:firstName, lastname:lastName, phonenumber:phoneNumber, description:description}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            done();
        });
    });

    it ('addContact Contact already exists', function(done)
    {
        let objectId = new ObjectId(testObjectId);
        let firstName = "Jack";
        let lastName = "Andrews";
        let phoneNumber = "123-456-7890";
        let description = null;

        request.post(addContactEndpoint, {json: true, body: {usercreatedobjectid:objectId, firstname:firstName, lastname:lastName, phonenumber:phoneNumber, description:description}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(false);
            done();
        });
    });
    

    it('editContact Pass',function(done)
    {
        let objectId = new ObjectId(editContactEndpoint);
        let firstName = "Some";
        let lastName = "Dude";
        let phoneNumber = "435-235-2345";
        let description = "Oooooooooo";

        request.post(editContactEndpoint, {json: true, body: {usercreatedobjectid:objectId, firstname:firstName, lastname:lastName, phonenumber:phoneNumber, description:description}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            expect(response.body.error).toEqual('');
            done();
        });
    });

    it('editContact No matching Contact',function(done)
    {
         request.post(editContactEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('User is not found or no contact found');
            done();
        });
    });
});

describe('Region Emergency Contacts', function()
{
    it('getRegionEmergencyContacts Pass',function(done)
    {
        let name = "Test Local Police";
        let phoneNumber = "123-456-7890";
        let description = null;
        let address = "123 Street Street";
        let zipCode = 12345;
        let state = "Florida";
        let country = "United States"


        request.post(getRegionEmergencyContactsEndpoint, {json: true, body: {regionCode:256, countryCode:256}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('');
            expect(response.body.name).toEqual(name);
            expect(response.body.phoneNumber).toEqual(phoneNumber);
            expect(response.body.description).toEqual(description);
            expect(response.body.address).toEqual(address);
            expect(response.body.zipCode).toEqual(zipCode);
            expect(response.body.state).toEqual(state);
            expect(response.body.country).toEqual(country);
            done();
        });
    });

    it('getRegionEmergencyContacts Contact Does Not Exist',function(done)
    {
        request.post(getRegionEmergencyContactsEndpoint, {json: true, body: {regionCode:255, countryCode:255}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('No Region Emergency Contact found');
            done();
        });
    });
});

describe('Main Emergency Contacts', function()
{
    it('getMainEmergencyContacts Pass',function(done)
    {
        request.post(getMainEmergencyContactsEndpoint, {json: true, body: {countrycode:1000}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('');
            done();
        });
    });

    it('getMainEmergencyContacts Contact Does Not Exist',function(done)
    {
        request.post(getMainEmergencyContactsEndpoint, {json: true, body: {countrycode:1001}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('No Main Emergency Contact for the Country Code');
            expect(response.body.success).toEqual(false);
            done();
        });
    });
});


describe('Pins', function()
{
    it ('addPin adds a Pin to DB', function(done)
    {
        let objectId = new ObjectId(testObjectId);
        let address = "0648 Big Boi pk Tr.";
        let zipCode = "69174";
        let State = "Ohio";
        let country = "USA";
        let description = "Fist fight here";
        let numResolved = 0;
        let latitude = 15;
        let longitude = 15;

        request.post(addPinEndPoint, {json: true, body: {
            usercreatedobjectid:objectId, 
            Address:address, 
            zip:zipCode, 
            State:State, 
            Country:country,
            Description:description,
            Resolved:numResolved,
            latitude:latitude,
            longitude:longitude
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            done();
        });
    });
    it ('edit an existing Pin', function(done)
    {
        let objectId = new ObjectId(testObjectId);
        let address = "0648 Big Boi pk Tr.";
        let zipCode = "69174";
        let State = "Ohio";
        let country = "USA";
        let description = "Fist fight here";
        let numResolved = 0;
        let latitude = 15;
        let longitude = 15;

        request.post(editPinEndPoint, {json: true, body: {
            usercreatedobjectid:objectId, 
            Address:address, 
            zip:zipCode, 
            State:State, 
            Country:country,
            Description:description,
            Resolved:numResolved,
            latitude:latitude,
            longitude:longitude
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            done();
        });
    });

    it ('edit a non-existing Pin', function(done)
    { 
        let objectId = new ObjectId('123456789012345678901236');
        let usercreatedobjectid = null;
        let address = "0648 Big Boi pk Tr.";
        let zipCode = "69174";
        let State = "Ohio";
        let country = "USA";
        let description = "Fist fight here";
        let numResolved = 0;
        let latitude = 15;
        let longitude = 15;

        request.post(editPinEndPoint, {json: true, body: {
            ID:objectId,
            usercreatedobjectid:usercreatedobjectid, 
            Address:address, 
            zip:zipCode, 
            State:State, 
            Country:country,
            Description:description,
            Resolved:numResolved,
            latitude:latitude,
            longitude:longitude
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(500);
            expect(response.body.success).toEqual(false);
            done();
        });
    });

    it ('delete existing pin', function(done)
    {
        let objectId = new ObjectId(testObjectId);

        request.post(deletePinEndPoint, {json: true, body: {
            objectId:objectId, 
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.success).toEqual(true);
            done();
        });
    });

    it ('delete non-existing pin', function(done)
    {
        let objectId = new ObjectId("123456789012345678901236");

        request.post(deletePinEndPoint, {json: true, body: {
            objectId:objectId, 
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(500);
            expect(response.body.success).toEqual(false);
            done();
        });
    });

    
    
});

