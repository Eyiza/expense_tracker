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
- Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, http://127.0.0.1:5000/, which is set as a proxy in the frontend configuration.

- Authentication: This version of the application does not require authentication or API keys. 

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

#### POST /register - To register
- Sample URL: `curl http://127.0.0.1:5000/register -X POST -H "Content-Type: application/json" -d '{"username":"Joe", "email":"joe@gmail.com", "password":"JoeDaniel20"}'`
- Request Arguments: username, email, password.
- Response body:
  - Creates a new question using the submitted username, email and  password.
  - Returns the details of the created user and success value.
```
{
  "created": 24,
  "success": true
}
```

