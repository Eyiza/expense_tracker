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
   - Run the collection individually.


## API Reference

### Getting Started
- Refer to the General [README](../README.md) file for instructions on the prerequisites, requirements, and procedures to configure your server.

- Base URL: The backend app is hosted at the default, http://127.0.0.1:5000/, which is set as a proxy in the frontend configuration.

- Authentication: This application uses [Flask Session](https://flask-session.readthedocs.io/en/latest/)  Package to handle authentication. 

### Mail Server
This application uses [Flask Mail](https://pythonhosted.org/Flask-Mail/) Package to handle emails. <br>
Run the following commands from the /backend directory to set up the environment variables of the mailing server of your application (otherwise hard code the string ```MAIL_USERNAME``` and ```MAIL_PASSWORD``` in __init__.py file):<br> 
For Mac/Linux
```
export MAIL_USERNAME=example@gmail.com
export MAIL_PASSWORD=password
```
For Windows PowerShell, use $env: instead of export:
```
$env:MAIL_USERNAME = "example@gmail.com" 
$env:MAIL_PASSWORD = "password" 
``` 

Google has a two-factor authentication (2FA) feature, which requires you to use an application-specific password to access your account when using a third-party application like Flask to send emails through Gmail. Therefore, you'll need to generate an application-specific password and use that password in your Flask app instead of your regular Gmail password.<br>
Here are the steps to generate an application-specific password:
- Go to your Google account's security page at [myaccount.google.com/security](https://myaccount.google.com/security).
- 2-step verification must be turned on for your gmail account.
- Scroll down to the "Signing in to Google" section and click on "App passwords".
- Select "Mail" and "Other (custom name)" as the app and device, respectively.
- Enter a name for the custom app password (e.g. "Flask app password") and click on "Generate".
- Google will generate a new password for you. Copy this password and use it in your Flask app's email configuration (MAIL_PASSWORD) instead of your regular Gmail password.


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
  - Returns success value and a 'Account created' message.
  - If user already exists, it returns 'User already exists'.
```
{
  "message": "Account created",
  "success": true
}
```

#### POST /login - To login
- Sample URL: `curl http://127.0.0.1:5000/login -X POST -H "Content-Type: application/json" -d '{"email":"joe@gmail.com","password":"JoeDaniel20"}'`
- Request Arguments: email, password.
- Response body:
  - Searches for a user using the provided email address and password, then launches a session for that user using its ID.
  - Returns success value and a 'Login successful' message.
```
{
  "message": "Login successful",
  "success": true
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
  - Returns the details of logged-in user (email, ID, username, time_created) and success value.
```
{
  "success": true,
   "user": {
      "email": "joe@gmail.com",
      "id": 1,
      "time_created": "Wed, 01 Mar 2023 01:24:58 GMT",
      "username": "Joe"
  }
}
```

#### DELETE /user - To delete user's account
- Sample URL: `curl -X DELETE http://127.0.0.1:5000/user`
- Request Arguments: None
- Response body:
  - Deletes the account of the user who is currently logged in using the session ID. 
  - Returns success value.
```{
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
      "time_created": "Wed, 01 Mar 2023 11:42:20 GMT",
      "username": "Joe Daniel"
  }
}
```

**For additional tests, please refer to the [Postman collection file](./tests/expense_tracker.postman_collection.json).**
