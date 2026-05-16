@echo off
echo ========================================
echo   Starting MongoDB Manually
echo ========================================
echo.

REM Create data directory if it doesn't exist
if not exist "C:\data\db" (
    echo Creating data directory...
    mkdir C:\data\db
)

echo Starting MongoDB on port 27017...
echo.
echo Keep this window open!
echo Press Ctrl+C to stop MongoDB
echo ========================================
echo.

mongod --dbpath "C:\data\db"
