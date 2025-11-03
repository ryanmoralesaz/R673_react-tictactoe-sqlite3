@echo off
REM Script to create src folder structure for Tic-Tac-Toe server
REM Run this from inside the server/ directory
REM Creates all necessary directories and adds .gitkeep files so they track in git

echo Creating src folder structure...
echo.

REM Create directory structure
mkdir src\config 2>nul
mkdir src\middleware 2>nul
mkdir src\models 2>nul
mkdir src\routes 2>nul
mkdir src\services 2>nul
mkdir src\utils 2>nul
mkdir database\migrations 2>nul
mkdir database\seeds 2>nul

REM Create .gitkeep files
echo. > src\config\.gitkeep
echo. > src\middleware\.gitkeep
echo. > src\models\.gitkeep
echo. > src\routes\.gitkeep
echo. > src\services\.gitkeep
echo. > src\utils\.gitkeep
echo. > database\.gitkeep
echo. > database\migrations\.gitkeep
echo. > database\seeds\.gitkeep

echo.
echo Folder structure created successfully!
echo.
echo Created folders:
echo   src\config\
echo   src\middleware\
echo   src\models\
echo   src\routes\
echo   src\services\
echo   src\utils\
echo   database\
echo   database\migrations\
echo   database\seeds\
echo.
echo All folders now contain .gitkeep files and will be tracked by git.
echo.
echo Note: The SQLite database file (tictactoe.db) will be created at runtime
echo and should be added to .gitignore
pause
