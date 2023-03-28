const request = require('request');

const loginEndpoint = 'http://localhost:4091/api/login';
const singupEndpoint = 'http://localhost:4091/api/signup';
const getContactsEndpoint = 'http://localhost:4091/api/getContacts';
const deleteContactEndpoint = 'http://localhost:4091/api/deleteContact';
const addContactEndpoint = 'http://localhost:4091/api/addContact';
const editContactEndpoint = 'http://localhost:4091/api/editContact';
const getMainEmergencyContactsEndpoint = 'http://localhost:4091/api/getMainEmergencyContacts';
const getRegionEmergencyContactsEndpoint = 'http://localhost:4091/api/getRegionEmergencyContacts';

const testObjectId = "123456789012345678901234";

// NOTE TO USER: these tests put must be used in conjuction with scripts to insert
//               data into the database and npm start on the API
describe('User Unit Tests',function()
{
    it('login Pass',function()
    {
        request.post(loginEndpoint, {json: true, body: {login:'IAmATestUser', pass:'testytesy123'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual('');
            expect(response.body.firstName).toEqual('Test');
            expect(response.body.lastName).toEqual('User');
            expect(response.body.userName).toEqual('IAmATestUser');
            expect(response.body.countryCode).toEqual(1);
            expect(response.body.regionCode).toEqual(1);
            expect(response.body._id).toEqual(testObjectId);
            done();
        });
    });

    it('login Does Not Exist', function()
    {
        request.post(loginEndpoint, {json: true, body: {login:'thisLogInDoesNotExist', pass:'pass123456789'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("User is not found");
            done();
        });
    });

    it('login Username is null',function()
    {
        request.post(loginEndpoint, {json: true, body: {login:null, pass:'pass123456789'}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("login/username cannot be empty or null");
            done();
        });
    });

    it('login Password is null',function()
    {
        request.post(loginEndpoint, {json: true, body: {login:'thisLogInDoesNotExist', pass:null}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("password cannot be empty or null");
            done();
        });
    });

    it('signup Pass',function()
    {
        request.post(singupEndpoint, {json: true, body: {firstName:'Abhi', lastName:'Kotta', userName:'CoolGuy',
            password:'IlikeMicrofiberTowles', email:'cool@email.com', regionCode:2, countryCode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("User created");
            expect(response.body.userName).toEqual('CoolGuy');
            expect(response.body.regionCode).toEqual(2);
            expect(response.body.countryCode).toEqual(2);
            done();
        });
    });

    it('signup Email already being Used',function()
    {
        request.post(singupEndpoint, {json: true, body: {firstName:'Abhi', lastName:'Kotta', userName:'CoolGuy',
            password:'IlikeMicrofiberTowles', email:'test@me.com', regionCode:2, countryCode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("Email is in use");
            done();
        });
    });

    it('signup Username already being Used',function()
    {
        request.post(singupEndpoint, {json: true, body: {firstName:'Abhi', lastName:'Kotta', userName:'IAmATestUser',
            password:'IlikeMicrofiberTowles', email:'testytesty@me.com', regionCode:2, countryCode:2}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            expect(response.body.error).toEqual("Email is in use");
            done();
        });

        //TODO Add null checks for signup
    });
});

describe('User Emergency Contacts', function()
{
    it('getContacts Pass',function()
    {
        request.post(getContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('getContacts No User',function()
    {
        request.post(getContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('getContacts No Contacts',function()
    {
        request.post(getContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('deleteContact Pass',function()
    {
        request.post(deleteContactEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('deleteContact Not matching Contact',function()
    {
        request.post(deleteContactEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('addContact Pass',function()
    {
        request.post(addContactEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('editContact Pass',function()
    {
         request.post(editContactEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('editContact No matching Contact',function()
    {
         request.post(getMainEmergencyContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
});

describe('Region Emergency Contacts', function()
{
    it('getRegionEmergencyContacts Pass',function()
    {
        request.post(getRegionEmergencyContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('getRegionEmergencyContacts Contact Does Not Exist',function()
    {
        request.post(getRegionEmergencyContactsEndpoint, {json: true, body: {regionCode:1, countryCode:1}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
});

describe('Main Emergency Contacts', function()
{
    it('getMainEmergencyContacts Pass',function()
    {
        request.post(getMainEmergencyContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('getMainEmergencyContacts Contact Does Not Exist',function()
    {
        request.post(getMainEmergencyContactsEndpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});

/*
describe('Pins', function()
{

});
*/
