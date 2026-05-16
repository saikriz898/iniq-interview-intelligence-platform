@echo off
echo ========================================
echo   INIQ Platform - Starting Servers
echo ========================================
echo.
echo Starting Backend on Port 5000...
echo Starting Frontend on Port 3000...
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

cd "%~dp0"
npm run dev
