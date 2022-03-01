# Sport-Societies-Network

## Virtual Environment
It is recommended to run this program and install its libraries inside a venv virtual environment

Run all the commands for this Virtual Environment section whilst being in .\Sport-Societies-Network
### Creating the virtual environment
```powershell
python -m venv webenv
```
> If working on this project, the environment fileneame webenv should be used as it is in the gitignore file

### Running the virtual environment
```shell
# Command Line
.\webenv\scripts\activate.bat

# Powershell
.\webenv\scripts\activate.ps1

# macOS
source webenv/bin/activate
```
### Installing project dependenices
Now that the virtual environment is running you need to install the specific versions of the project dependenices using the following command
```powershell
pip install -r requirements.txt
```
> After setting up the virtual environment with these 3 steps, running the activate file (see [above](#running-the-virtual-environment)) is all that is required to run the virtual environment in the future
## Development
After cloning the repo and setting up webenv there are two commands you need to run
1. Run this whilst inside .\Sport-Socienties-Network\spector
```powershell
python manage.py migrate
```
2. And run this whilst inside .\Sport-Socienties-Network\spector\frontend
> This installs the neccessary node dependencies specified in package-lock.json
```powershell
npm ci
```

### Django Server
Everytime you are working on this project, most of the time you will require the server running locally. To do this run the following command whilst being in the following directory .\Sport-Socienties-Network\spector\
```powershell
python manage.py runserver
```
> Make sure you are running the virtual environment before running this command
### Webpack Dev Mode
With the server running locally you can view the app by going to http://127.0.0.1:8000/


For those working on any React/JS code:
1. Make sure you are in .\Sport-Socienties-Network\spector\frontend
2. Then run
```powershell
npm run dev
```
This will run webpack in dev mode allowing you to make changes to the front end and see if the code compiles correctly. It will check for any runtime errors.


Front end dev setup:
1. Run `npm run dev` in a terminal window
2. In a separate terminal window, with virtual environment running, run `python manage.py runserver` 
3. Open local host - http://127.0.0.1:8000/
4. Edit react code and save
5. Reload http://127.0.0.1:8000/ to see the changes
### Updates to views or models
If any changes to a view or model has been made in any app you have to create migrations. Run the following commands whilst being in the .\Sport-Socienties-Network\spector\ directory
```powershell
python manage.py makemigrations
python manage.py migrate
```
### Adding react code
All the react components are in .\Sport-Socienties-Network\spector\frontend\src\components. The main App is in App.js and all other components must be linked to the main app. Stick to a functional style as it will make things easier. Components that need to be reused make sure they are in their own JavaScript file inside the components folder. Have a look at App.Js and Index.Js to see how to import and export JS funcitons if you are unfamiliar.

## APIs
All API endpoints return JSON data. To check the format of the json object check the admin page.
#### /api/userdata
Returns all user objects. Will be changed to allow to access individual users and include permisions and authentication.
Name is likely to change slightly too.
#### /api/sports
Returns all sports objects.
#### /api/activities/"id"
Returns the activity object of the given id. If id is not supplied it will return all activity objects. Will be able to filter by sport but not implemented yet.
