# Expense Tracker

Expense Tracker is a website made to assist users in keeping tabs on their spending patterns. Users can register, input expenses, and categorize them according to a variety of categories, including food, travel, entertainment, and more. The website creates a report showing the user's spending patterns across all categories, as well as a graph showing the user's spending patterns over time. 

All backend code follows [PEP8 style guidelines](https://www.python.org/dev/peps/pep-0008/). 

## Built with
  * Front-end: [NextJS](https://nextjs.org/)
  * Back-end: [Flask](https://flask.palletsprojects.com), [PostgreSQL](https://www.postgresql.org/)
  * Hosting: [Render](https://render.com/)

## Getting Started
Download the project code locally
[Fork](https://help.github.com/en/articles/fork-a-repo) the project repository and [clone](https://help.github.com/en/articles/cloning-a-repository) your forked repository to your machine. 

### Pre-requisites and Local Development 
Developers using this project should already have Python3, pip, postgresql, and node installed on their local machines.


## Backend
The [backend](./backend/README.md) directory is responsible for handling data and processing user requests. It is responsible for handling user authentication, storing and retrieving expense data, generating expense reports, and more.
It contains server architecture, databases, and APIs. 

### Installation

1. **Virtual Environment** - This keeps your dependencies for each project separate and organized. 
Initialize and activate a virtualenv using:
```
python -m virtualenv env
source env/bin/activate
```

Note - In Windows, the `env` does not have a `bin` directory. Therefore, you'd use the analogous command shown below:
```
source env/Scripts/activate
```

2. **PIP Dependencies** - Once the virtual environment is setup and running, install the required dependencies by navigating to the `/backend` directory on the terminal and running:
```
pip install -r requirements.txt
```
All required packages are included in the requirements file. 


3. **Set up the Database**
With Postgres running, run the following commands from the /backend directory to connect to your database and set a secret key for your application (otherwise hard code the string ```SECRET_KEY``` in __init__.py and the string ```DATABASE_URL``` in models.py files):<br> 
For Mac/Linux
```
export DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
export SECRET_KEY=someRandomStringOfText
```
For Windows PowerShell, use $env: instead of export:
```
$env:DATABASE_URL = "postgres://{user}:{password}@{hostname}:{port}/{database-name}"
$env:SECRET_KEY = "someRandomStringOfText"
```


The **Flask-Migrate** Package is used for creating and running schema migrations.
Run the following commands from the /backend directory to have your local database (once set up and created) be populated with the right tables to run this application:
```
flask db init
flask db migrate
```

Populate the categories table using the `data.psql` file provided. This will create default spending categories for every user.<br>
From the `backend` folder in terminal run:

```
psql expense_tracker < data.psql
```

4. **Run the development server**
To run the application run the following commands from the /backend directory: <br>
For Mac/Linux
```
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```
For Windows PowerShell, use $env: instead of export:
```
$env:FLASK_APP = "flaskr"
$env:FLASK_ENV = "development"
flask run
```

These commands put the application in development and directs our application to use the `__init__.py` file in our flaskr folder. If running locally on Windows, look for the commands in the [Flask documentation](http://flask.pocoo.org/docs/1.0/tutorial/factory/).

 

### Frontend

The [frontend](./frontend/README.md) directory contains a complete NextJS frontend to consume the data from the Flask server. This project depends on Nodejs and Node Package Manager (NPM).

From the frontend folder(naviagate to /frontend directory), run the following commands to start the client: 
```
npm install // only once to install dependencies
npm run dev 
```

By default, the frontend will run on localhost:3000. 
This frontend is designed to work with [Flask-based Backend](./backend) so it will not load successfully if the backend is not working or not connected i.e Ensure the backend is already running in a terminal then open a new terminal and type the commands to run the frontend above.<br>
Update the [apiConfig](./frontend/pages/apiConfig.js) file to include your running backend URL.



## Deployment N/A

## Authors
Precious Michael, John Asaolu
