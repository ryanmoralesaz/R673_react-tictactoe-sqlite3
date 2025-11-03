@echo off
REM Script to create client/src folder structure for Tic-Tac-Toe project
REM Creates all necessary directories and adds .gitkeep files so they track in git

echo Creating client/src folder structure...
echo.

REM Create directory structure
mkdir client\src\components\Auth 2>nul
mkdir client\src\components\Game 2>nul
mkdir client\src\components\UI 2>nul
mkdir client\src\context 2>nul
mkdir client\src\hooks 2>nul
mkdir client\src\services 2>nul
mkdir client\src\utils 2>nul
mkdir client\src\styles 2>nul
mkdir client\src\assets 2>nul

REM Create .gitkeep files
echo. > client\src\components\.gitkeep
echo. > client\src\components\Auth\.gitkeep
echo. > client\src\components\Game\.gitkeep
echo. > client\src\components\UI\.gitkeep
echo. > client\src\context\.gitkeep
echo. > client\src\hooks\.gitkeep
echo. > client\src\services\.gitkeep
echo. > client\src\utils\.gitkeep
echo. > client\src\styles\.gitkeep
echo. > client\src\assets\.gitkeep

echo.
echo Folder structure created successfully!
echo.
echo Created folders:
echo   client\src\components\
echo   client\src\components\Auth\
echo   client\src\components\Game\
echo   client\src\components\UI\
echo   client\src\context\
echo   client\src\hooks\
echo   client\src\services\
echo   client\src\utils\
echo   client\src\styles\
echo   client\src\assets\
echo.
echo All folders now contain .gitkeep files and will be tracked by git.
pause
