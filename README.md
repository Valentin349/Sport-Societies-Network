# Sport-Socienties-Network

## development
### django server
Everytime you are working on this project, most of the time you will require the server running localy. To do this run the following command in while being in the following directory .\Sport-Socienties-Network\spector\
```shell
python manage.py runserver
```
### webpack dev mode
If you are working on any react/JS code, make sure you are in .\Sport-Socienties-Network\spector\frontend\ and run
```shell
npm run dev
```
This will run webpack in dev mode allowing you to make changes to the front end and see if the code compiles correctly. It will check for any runtime errors.
### Updates to views or models
If any changes to a view or model has been made in any app you have to create migrations. Run the following commands in while being in the following directory .\Sport-Socienties-Network\spector\
```shell
python manage.py makemigrations
python manage.py migrate
```
### adding react code
All the react components are in .\Sport-Socienties-Network\spector\frontend\src\components. The main App is in App.js and all other components must be linked to the main app. Stick to a functional style as it will make things easier. Components that need to be reused make sure they are in their own JavaScript file inside the components folder. Have a look at App.Js and Index.Js to see how to import and export JS funcitons if you are unfamiliar.
