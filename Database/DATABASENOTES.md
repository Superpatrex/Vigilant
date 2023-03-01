# Database Notes

## Documentation
### [MongoDB Documentation](https://www.mongodb.com/docs/atlas/) 

### Terminology
MongoDB uses the terms of Collections->Documents->fields instead of Tables->rows->column. Additionally MongoDB allows for more lateral data compared to a SQL database.

### Common Commands
 - `db.help` Returns a list of commands 
 - `cls` Clears the mongoDB console output
 - `show dbs` Shows a list of all databases within your MongoDb
 - `use "Insert Database Name"` Create or uses a new or existing database
 - `db` Show your current database that you are in
 - `db.dropDatabase()` Drops your current database (e.i. deletes it) (better to delete on the actual MongoDB platform
 - `db.createCollection("<DatabaseName>")` Creates a new collection
 - `db.DatabaseName.find()` Outputs all the documents contained in the collection for DatabaseName 
 - `db.DatabaseName.find({field: <data>})` Outputs all the documents with the filed with the data within it

## Collection Structure
### User Collection
|Field|Datatype|
|----|----|          
|_id|`ObjectId`|         
|firstName|`string`|
|lastName|`string`|
|userName|`string`|
|password|`string`|
|email|`string`|
|dateCreated|`ISODate`|
|countryCode|`int`|
|regionCode|`int`|

### Pins Collection
|Field|Datatype|
|----|----|          
|_id|`ObjectId`|         
|address|`string`|
|zipcode|`int`|
|state|`string`|
|country|`string`|
|location|`Location`|
|numResolved|`int`|
|userCreatedObjectId|`ObjectId`|
|dateCreated|`ISODate`|

### Emergency Contacts
|Field|Datatype|
|----|----|   
|_id|`ObjectId`|         
|firstName|`string`|
|lastName|`string`|
|phoneNumber|`string`|
|description|`string`|
|userCreatedObjectId|`ObjectId`|

### Main Emergency Contacts
|Field|Datatype|
|----|----|   
|_id|`ObjectId`|         
|name|`string`|
|phoneNumber|`string`|
|description|`string`|
|countryCode|`int`|

### Region Emergency Contacts
|Field|Datatype|
|----|----|   
|_id|`ObjectId`|         
|name|`string`|
|phoneNumber|`string`|
|description|`string`|
|description|`string`|
|userCreatedObjectId|`ObjectId`|
