All backend code follows [PEP8 style guidelines](https://www.python.org/dev/peps/pep-0008/). 

### Tests
1. In order to run tests navigate to the backend folder and run the following commands: 

```
dropdb expense_test
createdb expense_test
psql expense_test < data.psql
python test_flaskr.py
```

The first time you run the tests, omit the dropdb command. 

2. You can also test your endpoints with [Postman](https://getpostman.com).
   - Import the postman collection `./backend/tests/expense_tracker.postman_collection.json`
   - Right-clicking the collection folder, navigate to the edit tab, then the variables section and update the host variable to your running server link.
   - Run the collection individually or collectively.


## API Reference

### Getting Started
- Refer to the General [README](../README.md) file for instructions on the prerequisites, requirements, and procedures to configure your server.

- Base URL: The backend app is hosted at the default, http://127.0.0.1:5000/, which is set as a proxy in the frontend configuration.

- Authentication: This application uses Flask Session Package to handle authentication. 

### Mail Server
This application uses Flask Mail Package to handle emails. <br>
Run the following commands from the /backend directory to set up the environment variables of the mailing server of your application (otherwise hard code the string ```MAIL_USERNAME``` and ```MAIL_PASSWORD``` in __init__.py file):<br> 
For Mac/Linux
```
export MAIL_USERNAME=example@gmail.com
export MAIL_PASSWORD=password
```
For Windows PowerShell, use $env: instead of export:
```
$env:MAIL_USERNAME = "example@gmail.com" 
$env:MAIL_PASSWORD = "" 
``` 


### Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "success": False, 
    "error": 404, 
    "message": "resource not found"
}
```
The API will return the following error types when requests fail:
- 400: Bad Request
- 401: Unauthorized request, User is not logged in
- 404: Resource Not Found
- 405: Method not allowed
- 422: Not Processable
- 500: Internal server error

### Endpoints 

#### GET / - To test login
- Sample URL: `curl http://127.0.0.1:5000/`
- Request Arguments: None
- Response body:
  - Returns email of user if user is logged in. Otherwise it returns "You are not logged in".
```
{
  "Logged in": "Logged in as joe@gmail.com"
}
```

#### POST /register - To register
- Sample URL: `curl http://127.0.0.1:5000/register -X POST -H "Content-Type: application/json" -d '{"username":"Joe", "email":"joe@gmail.com", "password":"JoeDaniel20"}'`
- Request Arguments: username, email, password.
- Response body:
  - Creates a new user using the provided username, email and hashed password, then launches a session for that user using its ID.
  - Returns the details of the created user and success value.
  - If user already exists, it returns 'User already exist'.
```
{
  "created": {
      "email": "joe@gmail.com",
      "id": 1,
      "password": "pbkdf2:sha256:260000$Sn1hxZ9C9hDAzARH$af767daea2959d22506d5beeda11b53c0e9cd8381219711ada4989f1f2f7d464",
      "time_created": "Wed, 01 Mar 2023 11:25:25 GMT",
      "username": "Joe"
  },
  "message": "User created",
  "success": true
}
```

#### POST /login - To login
- Sample URL: `curl http://127.0.0.1:5000/login -X POST -H "Content-Type: application/json" -d '{"email":"joe@gmail.com","password":"JoeDaniel20"}'`
- Request Arguments: email, password.
- Response body:
  - Searches for a user using the provided email address and password, then launches a session for that user using its ID.
  - Returns the details of the existing user and success value.
```
{
  "message": "Login successful",
  "success": true,
  "user": {
      "email": "joe@gmail.com",
      "id": 1,
      "password": "pbkdf2:sha256:260000$Sn1hxZ9C9hDAzARH$af767daea2959d22506d5beeda11b53c0e9cd8381219711ada4989f1f2f7d464",
      "time_created": "Wed, 01 Mar 2023 01:24:58 GMT",
      "username": "Joe"
  }
}
```

#### GET /logout - To logout
- Sample URL: `curl http://127.0.0.1:5000/logout`
- Request Arguments: None.
- Response body:
  - Ends the session of the user.
  - Returns success value if user is successfully logged out.
```
{
  'success': True,
  'message': 'Logout successful',
}
```

#### GET /user - To retrieve user's data
- Sample URL: `curl http://127.0.0.1:5000/user`
- Request Arguments: None.
- Response body:
  -  Retrieves the data of the user who is currently logged in using the session ID. 
  - Returns the details of logged-in user (email, ID, username) and success value.
```
{
  "email": "joe@gmail.com",
  "id": 1,
  "success": true,
  "username": "Joe"
}
```

#### DELETE /user - To delete user's account
- Sample URL: `curl -X DELETE http://127.0.0.1:5000/user`
- Request Arguments: None
- Response body:
  - Deletes the account of the user who is currently logged in using the session ID. 
  - Returns success value and the id of the deleted user.
```{
  "deleted": 1,
  "success": true
}
```


#### PATCH /user - To update user's data
- Sample URL: `curl http://127.0.0.1:5000/user -X POST -H "Content-Type: application/json" -d '{"username":"Joe Daniel"}'`
- Request Arguments: Property to be updated.
- Response body:
  - Searches for specified user using the session ID, then updates property and value provided in request.
  - Returns the user's updated data and success value.
```
{
  "success": true,
  "user": {
      "email": "joe@gmail.com",
      "id": 1,
      "password": "pbkdf2:sha256:260000$Sn1hxZ9C9hDAzARH$af767daea2959d22506d5beeda11b53c0e9cd8381219711ada4989f1f2f7d464",
      "time_created": "Wed, 01 Mar 2023 11:42:20 GMT",
      "username": "Joe Daniel"
  }
}
```

**For additional tests, please refer to the [Postman collection file](./tests/expense_tracker.postman_collection.json).**
