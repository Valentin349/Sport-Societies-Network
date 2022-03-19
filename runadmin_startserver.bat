@setlocal enableextensions
@cd /d "%~dp0"

CALL .\webenv\scripts\activate.bat

CALL pip install -r requirements.txt

CALL cd spector

CALL python manage.py makemigrations

CALL python manage.py migrate

CALL cd frontend

CALL nvm use newest

CALL npm ci

CALL cd ..

CALL python manage.py runserver