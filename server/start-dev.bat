@echo off
REM Health Day Server Development Startup Script for Windows

echo 🚀 Starting Health Day Server Development Environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please edit .env file with your configuration before starting the server.
    echo    Key settings to configure:
    echo    - MONGODB_URI
    echo    - JWT_SECRET
    echo    - SMTP settings (for email functionality)
    echo.
    pause
)

REM Run setup script if it hasn't been run before
if not exist ".setup-complete" (
    echo 🔧 Running initial setup...
    npm run setup
    echo. > .setup-complete
    echo ✅ Setup completed
)

REM Start the development server
echo 🌐 Starting development server...
echo    Server will be available at: http://localhost:3001
echo    API documentation: http://localhost:3001/api/health
echo    Press Ctrl+C to stop the server
echo.

npm run dev 