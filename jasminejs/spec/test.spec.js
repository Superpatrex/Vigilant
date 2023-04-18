const { ObjectId } = require('mongodb');
const request = require('request');

const LOGIN_ENDPOINT = 'http://localhost:4091/api/login';
const SIGNUP_ENDPOINT = 'http://localhost:4091/api/signup';
const GET_CONTACTS_ENDPOINT = 'http://localhost:4091/api/getContacts';
const DELETE_CONTACT_ENDPOINT = 'http://localhost:4091/api/deleteContact';
const ADD_CONTACT_ENDPOINT = 'http://localhost:4091/api/addContact';
const EDIT_CONTACT_ENDPOINT = 'http://localhost:4091/api/editContact';
const GET_MAIN_EMERGENCY_CONTACTS_ENDPOINT = 'http://localhost:4091/api/getMainEmergencyContacts';
const GET_REGION_EMERGENCY_CONTACTS_ENDPOINT = 'http://localhost:4091/api/getRegionEmergencyContacts';
const ADD_PIN_ENDPOINT = 'http://localhost:4091/api/addPin';
const DELETE_PIN_ENDPOINT = 'http://localhost:4091/api/deletePin';
const EDIT_PIN_ENDPOINT = 'http://localhost:4091/api/editPin';
const SEARCH_PIN_ENDPOINT = 'http://localhost:4091/api/searchPins';
const GET_ALL_USER_INFORMATION_PIN_ENDPOINT = 'http://localhost:4091/api/getAllUserInformation';
const GET_SETTINGS_PIN_ENDPOINT = 'http://localhost:4091/api/getSettings';
const SET_SETTINGS_PIN_ENDPOINT = 'http://localhost:4091/api/setSettings';
 
const testObjectId = "123456789012345678901234";
const deleteObjectId = "123456789012345678901235";
const editObjectId = "123456789012345678901236";
const testObjectIdDoesNotExist = "123456789012345678901230";
let secondaryTestObjectId = "123456789012345678901237";
let doesNotExistObjectId = '111111111111111111111111';
let emptyUserObjectId = "333456789012345678901236";

const SUCCESS_STATUS_CODE = 200;
const NOT_MODIFIED_STATUS_CODE = 304;
const NOT_FOUND_STATUS_CODE = 404;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;




// NOTE TO USER: these tests put must be used in conjuction with scripts to insert
//               data into the database and npm start on the API
describe('User Unit Tests',function()
{
    it('login Pass',function(done)
    {
        let errorMessage = '';
        let firstName = 'TestMe';
        let lastName = 'User';
        let userName = 'asdf';
        let password = 'asdf';
        let countryCode = 1;
        let regionCode = 1;

        request.post(LOGIN_ENDPOINT, {json: true, body: {login:userName, pass:password}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.firstName).toEqual(firstName);
            expect(response.body.lastName).toEqual(lastName);
            expect(response.body.userName).toEqual(userName);
            expect(response.body.countryCode).toEqual(countryCode);
            expect(response.body.regionCode).toEqual(regionCode);
            expect(response.body._id).toEqual(testObjectId);
            done();
        });
    });

    it('login Empty userName', function(done)
    {
        let userName = '';
        let password = 'pass123456789';
        let errorMessage = 'login/username cannot be empty or null';

        request.post(LOGIN_ENDPOINT, {json: true, body: {login:userName, pass:password}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('login Empty password', function(done)
    {
        let userName = 'thisLogInDoesNotExist';
        let password = '';
        let errorMessage = 'password cannot be empty or null';

        request.post(LOGIN_ENDPOINT, {json: true, body: {login:userName, pass:password}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('login Does Not Exist', function(done)
    {
        let userName = 'thisLogInDoesNotExist';
        let password = 'pass123456789';
        let errorMessage = 'User is not found';

        request.post(LOGIN_ENDPOINT, {json: true, body: {login:userName, pass:password}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('login Username is null',function(done)
    {
        request.post(LOGIN_ENDPOINT, {json: true, body: {login:null, pass:'pass123456789'}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual("login/username cannot be empty or null");
            done();
        });
    });

    it('login Password is null',function(done)
    {
        request.post(LOGIN_ENDPOINT, {json: true, body: {login:'thisLogInDoesNotExist', pass:null}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual("password cannot be empty or null");
            done();
        });
    });

    it('signup Pass',function(done)
    {
        let firstName = 'Test';
        let lastName = 'User';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = true;
        let errorMessage = '';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Email already being Used',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'evenCoolerGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'test@me.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Email is in use';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Username already being Used',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'asdf';
        let password = 'asdf';
        let email = 'tesytesty@me.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Username is taken';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null firstName',function(done)
    {
        let firstName = '';
        let lastName = 'User';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'First name is not valid (empty or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        firstName = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null lastName',function(done)
    {
        let firstName = 'Abhi';
        let lastName = '';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Last name is not valid (empty or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        lastName = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null login',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = '';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Login is not valid (empty or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        userName = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null password',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'CoolGuy';
        let password = '';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Password is not valid (empty or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        password = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null email',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = '';
        let regionCode = 2;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Email is not valid (empty or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        email = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null regioncode',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = -1;
        let countryCode = 2;
        let success = false;
        let errorMessage = 'Region code is not valid (negative number or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        regionCode = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('signup Empty/Null countrycode',function(done)
    {
        let firstName = 'Abhi';
        let lastName = 'Kotta';
        let userName = 'CoolGuy';
        let password = 'ILikeMicrofiberTowels';
        let email = 'cool@email.com';
        let regionCode = 2;
        let countryCode = -1;
        let success = false;
        let errorMessage = 'Country code is not valid (negative number or null)';

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        countryCode = null;

        request.post(SIGNUP_ENDPOINT, {json: true, body: {firstname:firstName, lastname:lastName, login:userName,
            pass:password, email:email, regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('getAllUserInformation Pass',function(done)
    {
        let objectId = new ObjectId(testObjectId);
        let success = true;
        let errorMessage = '';
        let theme = 1;
        let lightDarkMode = true;
        let searchRadius = 1000;
        let firstName = 'TestMe';
        let lastName = 'User';
        let userName = 'asdf';
        let email = 'test@me.com';
        let countryCode = 1;
        let regionCode = 1;

        request.post(GET_ALL_USER_INFORMATION_PIN_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.results.theme).toEqual(theme);
            expect(response.body.results.lightDarkMode).toEqual(lightDarkMode);
            expect(response.body.results.searchRadius).toEqual(searchRadius);
            expect(response.body.results.firstName).toEqual(firstName);
            expect(response.body.results.lastName).toEqual(lastName);
            expect(response.body.results.userName).toEqual(userName);
            expect(response.body.results.email).toEqual(email);
            expect(response.body.results.regionCode).toEqual(regionCode);
            expect(response.body.results.countryCode).toEqual(countryCode);
            done();
        });
    });

    it('getAllUserInformation Null objectId',function(done)
    { 
        let objectId = null;
        let success = false;
        let errorMessage = 'objectId cannot be null';
    
        request.post(GET_ALL_USER_INFORMATION_PIN_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.results).toEqual(null);
            done();
        });

    });

    it('getSettings Pass',function(done)
    { 
        let objectId = new ObjectId(testObjectId);
        let theme = 1;
        let lightDarkMode = true;
        let searchRadius = 1000;
        let success = true;
        let errorMessage = '';
    
        request.post(GET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.theme).toEqual(theme);
            expect(response.body.lightDarkMode).toEqual(lightDarkMode);
            expect(response.body.searchRadius).toEqual(searchRadius);
            done();
        });
    });

    it('getSettings Null objectId',function(done)
    { 
        let objectId = null;
        let success = false;
        let errorMessage = 'objectId cannot be null';
    
        request.post(GET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('setSettings Pass',function(done)
    { 
        let objectId = new ObjectId(secondaryTestObjectId);
        let success = true;
        let errorMessage = '';
        let theme = 3;
        let lightDarkMode = false;
        let searchRadius = 300;
    
        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        request.post(GET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.theme).toEqual(theme);
            expect(response.body.lightDarkMode).toEqual(lightDarkMode);
            expect(response.body.searchRadius).toEqual(searchRadius);
            done();
        });

    });

    it('setSettings Null objectId',function(done)
    { 
        let objectId = null;
        let success = false;
        let errorMessage = 'objectId cannot be null';
        let theme = 3;
        let lightDarkMode = false;
        let searchRadius = 300;
    
        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('setSettings NULL/Invalid theme',function(done)
    { 
        let objectId = new ObjectId(secondaryTestObjectId);
        let success = false;
        let errorMessage = 'theme cannot be null';
        let theme = -1;
        let lightDarkMode = false;
        let searchRadius = 300;
    
        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        theme = null;

        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('setSettings Null lightDarkMode',function(done)
    { 
        let objectId = new ObjectId(secondaryTestObjectId);
        let success = false;
        let errorMessage = 'lightDarkMode cannot be null';
        let theme = 3;
        let lightDarkMode = null;
        let searchRadius = 300;
    
        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('setSettings Null/Invalid searchRadius',function(done)
    { 
        let objectId = null;
        let success = false;
        let errorMessage = 'objectId cannot be null';
        let theme = 3;
        let lightDarkMode = false;
        let searchRadius = -300;
    
        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
        });

        searchRadius = null;

        request.post(SET_SETTINGS_PIN_ENDPOINT, {json: true, body: {objectId:objectId, theme:theme, lightDarkMode:lightDarkMode, searchRadius:searchRadius}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });

    });

});

describe('User Emergency Contacts', function()
{
    it('getContacts Pass',function(done)
    {
        let success = true;
        let errorMessage = '';
        let numContacts = 2;
        let firstContactFirstName = 'Jack';
        let firstContactLastName = 'Andrews';
        let firstContactPhoneNumber = '123-456-7890';
        let firstContactDescription = null;

        let secondContactFirstName = 'Abhi';
        let secondContactLastName = 'Kotta';
        let secondContactPhoneNumber = '123-456-7891';
        let secondContactDescription = 'Literally a Goober';

        request.post(GET_CONTACTS_ENDPOINT, {json: true, body: {objectId:new ObjectId(secondaryTestObjectId)}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.results.length).toEqual(numContacts);

            for (i = 0; i < numContacts; i++)
            {
                if (response.body.results[i].firstName === firstContactFirstName)
                {
                    expect(response.body.results[i].lastName).toEqual(firstContactLastName);
                    expect(response.body.results[i].phoneNumber).toEqual(firstContactPhoneNumber);
                    expect(response.body.results[i].description).toEqual(firstContactDescription);

                }
                else if (response.body.results[i].firstName == secondContactFirstName)
                {
                    expect(response.body.results[i].lastName).toEqual(secondContactLastName);
                    expect(response.body.results[i].phoneNumber).toEqual(secondContactPhoneNumber);
                    expect(response.body.results[i].description).toEqual(secondContactDescription);
                }
            }
            done();
        });
    });

    it('getContacts No User',function(done)
    {
        let objectId = new ObjectId(doesNotExistObjectId);
        let success = false;
        let results = null;
        let errorMessage = 'User does not exist';

        request.post(GET_CONTACTS_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.results).toEqual(results);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('getContacts No Contacts',function(done)
    {
        let errorMessage = 'User has empty contact';
        let objectId = new ObjectId(emptyUserObjectId);
        let success = false;
        let results = null;

        request.post(GET_CONTACTS_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.success).toEqual(success);
            expect(response.body.results).toEqual(results);
            done();
        });
    });

    it('deleteContact Pass',function(done)
    {
        let objectId = new ObjectId(deleteObjectId);
        let errorMessage = '';
        let success = true;

        request.post(DELETE_CONTACT_ENDPOINT, {json: true, body: {objectId:objectId}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('deleteContact Not matching Contact',function(done)
    {
        let success = false;
        let errorMessage = 'Could not find contact';

        request.post(DELETE_CONTACT_ENDPOINT, {json: true, body: {objectId: new ObjectId()}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
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
        let success = true;

        request.post(ADD_CONTACT_ENDPOINT, {json: true, body: {usercreatedobjectid:objectId, firstname:firstName, lastname:lastName, phonenumber:phoneNumber, description:description}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            done();
        });
    });

    it('editContact Pass',function(done)
    {
        let objectId = new ObjectId(editObjectId);
        let firstName = "Some";
        let lastName = "Dude";
        let phoneNumber = "435-235-2345";
        let description = "Oooooooooo";
        let errorMessage = '';
        let success = true;

        request.post(EDIT_CONTACT_ENDPOINT, {json: true, body: {id:objectId, firstname:firstName, lastname:lastName, phonenumber:phoneNumber, description:description}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });

        // TODO Add getContacts to verify
    });

    it('editContact No matching Contact',function(done)
    {
        let errorMessage = 'User is not found or no contact found';

         request.post(EDIT_CONTACT_ENDPOINT, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
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

        let secondaryName = "Test Local Police 2";
        let secondaryPhoneNumber = "123-456-7891";
        let secondaryDescription = "More Police";
        let secondaryAddress = "345 Street Street";
        let secondaryZipCode = 67890;
        let secondaryState = "Ohio";
        
        let regionCode = 256; 
        let countryCode = 256;
        let errorMessage = '';
        let numOfResults = 2;


        request.post(GET_REGION_EMERGENCY_CONTACTS_ENDPOINT, {json: true, body: {regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.results.length).toEqual(numOfResults);

            for (i = 0; i < response.body.results.length; i++)
            {
                if (response.body.results[i].name == name)
                {
                    expect(response.body.results[i].phoneNumber).toEqual(phoneNumber);
                    expect(response.body.results[i].description).toEqual(description);
                    expect(response.body.results[i].address).toEqual(address);
                    expect(response.body.results[i].zipCode).toEqual(zipCode);
                    expect(response.body.results[i].state).toEqual(state);
                    expect(response.body.results[i].country).toEqual(country);
                }
                else if (response.body.results[i].name == secondaryName)
                {
                    expect(response.body.results[i].phoneNumber).toEqual(secondaryPhoneNumber);
                    expect(response.body.results[i].description).toEqual(secondaryDescription);
                    expect(response.body.results[i].address).toEqual(secondaryAddress);
                    expect(response.body.results[i].zipCode).toEqual(secondaryZipCode);
                    expect(response.body.results[i].state).toEqual(secondaryState);
                    expect(response.body.results[i].country).toEqual(country);
                }
            }
            done();
        });
    });

    it('getRegionEmergencyContacts Contact Does Not Exist',function(done)
    {
        let regionCode = 255; 
        let countryCode = 255;
        let errorMessage = 'No Region Emergency Contacts found';

        request.post(GET_REGION_EMERGENCY_CONTACTS_ENDPOINT, {json: true, body: {regioncode:regionCode, countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });
});

describe('Main Emergency Contacts', function()
{
    it('getMainEmergencyContacts Pass',function(done)
    {
        let countryCode = 1000;
        let numOfResults = 2;
        let errorMessage = '';
        let success = true;

        request.post(GET_MAIN_EMERGENCY_CONTACTS_ENDPOINT, {json: true, body: {countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.results.length).toEqual(numOfResults);
            for (i = 0; i < response.body.results.length; i++)
            {
                if (response.body.results[i].name === 'United States Police')
                {
                    expect(response.body.results[i].phoneNumber).toEqual('911');
                    expect(response.body.results[i].description).toEqual(null);
                }
                else if (response.body.results[i].name === 'United States Police 2')
                {
                    expect(response.body.results[i].phoneNumber).toEqual('912');
                    expect(response.body.results[i].description).toEqual('They be doing things');
                }
                else 
                {
                    expect(null).toEqual('This should never print');
                }
            }

            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it('getMainEmergencyContacts Contact Does Not Exist',function(done)
    {
        let errorMessage = 'No Main Emergency Contacts for the Country Code';
        let countryCode = 1001;
        let success = false;

        request.post(GET_MAIN_EMERGENCY_CONTACTS_ENDPOINT, {json: true, body: {countrycode:countryCode}}, function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.success).toEqual(success);
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
        let success = true;
        let title = 'Another Gas Leak';

        request.post(ADD_PIN_ENDPOINT, {json: true, body: {
            usercreatedobjectid:objectId, 
            title:title,
            Address:address, 
            zip:zipCode, 
            State:State, 
            Country:country,
            Description:description,
            Resolved:numResolved,
            latitude:latitude,
            longitude:longitude
        }}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            done();
        });
    });
    it ('edit an existing Pin', function(done)
    {
        let objectId = new ObjectId(editObjectId);
        let userCreatedObjectId = new ObjectId(doesNotExistObjectId);
        let address = "0648 Big Boi pk Tr.";
        let zipCode = "69174";
        let State = "Ohio";
        let country = "USA";
        let description = "Fist fight here";
        let numResolved = 0;
        let latitude = 15;
        let longitude = 15;
        let success = true;
        let title = 'Another Fight';
        let errorMessage = '';

        request.post(EDIT_PIN_ENDPOINT, {json: true, body: {
            ID:objectId,
            title:title,
            usercreatedobjectid:userCreatedObjectId, 
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
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it ('edit a non-existing Pin', function(done)
    { 
        let objectId = new ObjectId(doesNotExistObjectId);
        let userCreatedObjectId = new ObjectId(doesNotExistObjectId);
        let address = "0648 Big Boi pk Tr.";
        let zipCode = "69174";
        let State = "Ohio";
        let country = "USA";
        let description = "Fist fight here";
        let numResolved = 0;
        let latitude = 15;
        let longitude = 15;
        let success = false;
        let errorMessage = 'Failed to edit pin'; 
        let title = 'Different fight';

        request.post(EDIT_PIN_ENDPOINT, {json: true, body: {
            ID:objectId,
            usercreatedobjectid:userCreatedObjectId, 
            title:title,
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
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it ('delete existing pin', function(done)
    {
        let objectId = new ObjectId(deleteObjectId);
        let success = true;

        request.post(DELETE_PIN_ENDPOINT, {json: true, body: {
            objectId:objectId, 
        }}, function (error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            done();
        });
    });

    it ('delete non-existing pin', function(done)
    {
        let objectId = new ObjectId(doesNotExistObjectId);
        let success = false;
        let errorMessage = 'Failed to delete pin';

        request.post(DELETE_PIN_ENDPOINT, {json: true, body: {
            objectId:objectId, 
        }}, 

        function (error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            done();
        });
    });

    it ('search pins Pass', function(done)
    {
        let latitude = 17;
        let longitude = 17;
        let maximumDist = 1000;
        let success = true;
        let errorMessage = '';
        let address = 'Street Street';
        let zipCode = 45678;
        let state = 'State State';
        let country = 'Country Country';
        let description = 'None';
        let numResolved = 0;
        let title = 'Assault';

        let secondaryTitle = 'Gang Activity';
        let secondaryAddress = 'Street Street 2';
        let secondaryZipCode = 12345;
        let secondaryState = 'State State 2';
        let secondaryCountry = 'Country Country 2';
        let secondaryDescription = null;
        let secondaryNumResolved = 3;

        request.post(SEARCH_PIN_ENDPOINT, {json: true, body: {
            latitude:latitude, 
            longitude:longitude,
            maximumDist:maximumDist
        }}, function(error, response) {
            expect(response.statusCode).toEqual(SUCCESS_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);

            for (i = 0; i < response.body.results.length; i++)
            {
                if (response.body.results[i].address == address)
                {
                    expect(response.body.results[i].zipCode).toEqual(zipCode);
                    expect(response.body.results[i].state).toEqual(state);
                    expect(response.body.results[i].country).toEqual(country);
                    expect(response.body.results[i].description).toEqual(description);
                    expect(response.body.results[i].numResolved).toEqual(numResolved);
                    expect(response.body.results[i].title).toEqual(title);
                }
                else if (response.body.results[i].address == secondaryAddress)
                {
                    expect(response.body.results[i].zipCode).toEqual(secondaryZipCode);
                    expect(response.body.results[i].state).toEqual(secondaryState);
                    expect(response.body.results[i].country).toEqual(secondaryCountry);
                    expect(response.body.results[i].description).toEqual(secondaryDescription);
                    expect(response.body.results[i].numResolved).toEqual(secondaryNumResolved);
                    expect(response.body.results[i].title).toEqual(secondaryTitle);
                }
            }
            done();
        });
    });

    it ('search pins No Pins', function(done)
    {
        let latitude = 25;
        let longitude = 25;
        let maximumDist = 0;
        let success = false;
        let errorMessage = 'No Pins';

        request.post(SEARCH_PIN_ENDPOINT, {json: true, body: {
            latitude:latitude, 
            longitude:longitude,
            maximumDist:maximumDist
        }}, function(error, response) {
            expect(response.statusCode).toEqual(INTERNAL_SERVER_ERROR_STATUS_CODE);
            expect(response.body.success).toEqual(success);
            expect(response.body.error).toEqual(errorMessage);
            expect(response.body.results).toEqual(null);
            done();
        });
    });
    

});

