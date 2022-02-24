# Sport-Socienties-Network

## Virtual Environment
It is recommended to run this program and install its libraries inside a venv virtual environment

Run all the commands for this Virtual Environment section whilst being in .\Sport-Societies-Network
### Creating the virtual environment
```powershell
python -m venv webenv
```
> note - if working on this project, the environment fileneame webenv should be used as it is in the gitignore file

### Running the virtual environment
For *command line*:
```shell
.\webenv\scripts\activate.bat
```
For *powershell*:
```powershell
.\webenv\scripts\activate.ps1
```
### Installing project dependenices
Now that the virtual environment is running you need to install the specific versions of the project dependenices using the following command
```powershell
pip install -r requirements.txt
```
## Development
### Django Server
Everytime you are working on this project, most of the time you will require the server running locally. To do this run the following command whilst being in the following directory .\Sport-Socienties-Network\spector\
```powershell
python manage.py runserver
```
### Webpack Dev Mode
With the server running locally you can view the app by going to http://127.0.0.1:8000/


If you are working on any react/JS code, make sure you are in .\Sport-Socienties-Network\spector\frontend\ and run
```powershell
npm run dev
```
This will run webpack in dev mode allowing you to make changes to the front end and see if the code compiles correctly. It will check for any runtime errors.
### Updates to views or models
If any changes to a view or model has been made in any app you have to create migrations. Run the following commands whilst being in the .\Sport-Socienties-Network\spector\ directory
```powershell
python manage.py makemigrations
python manage.py migrate
```
### Adding react code
All the react components are in .\Sport-Socienties-Network\spector\frontend\src\components. The main App is in App.js and all other components must be linked to the main app. Stick to a functional style as it will make things easier. Components that need to be reused make sure they are in their own JavaScript file inside the components folder. Have a look at App.Js and Index.Js to see how to import and export JS funcitons if you are unfamiliar.
