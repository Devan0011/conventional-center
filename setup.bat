@echo off
echo ========================================================
echo   Aether Grand Convention Center - Automated Setup
echo ========================================================
echo.

echo [1/3] Installing Frontend Dependencies...
call npm install

echo.
echo [2/3] Installing Backend Dependencies...
cd backend
call npm install

echo.
echo [3/3] Setup Complete!
echo.
echo ========================================================
echo To start the backend:
echo cd backend
echo npm run dev (or node server.js)
echo.
echo To start the frontend:
echo npm run dev
echo ========================================================
pause
