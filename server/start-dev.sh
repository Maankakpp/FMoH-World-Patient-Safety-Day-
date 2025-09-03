#!/bin/bash

# Health Day Server Development Startup Script

echo "🚀 Starting Health Day Server Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if ! pgrep -x "mongod" > /dev/null; then
        echo "⚠️  MongoDB is not running. Starting MongoDB..."
        mongod --fork --logpath /dev/null
        echo "✅ MongoDB started"
    else
        echo "✅ MongoDB is already running"
    fi
else
    echo "⚠️  MongoDB not found. Make sure MongoDB is installed and running."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your configuration before starting the server."
    echo "   Key settings to configure:"
    echo "   - MONGODB_URI"
    echo "   - JWT_SECRET"
    echo "   - SMTP settings (for email functionality)"
    echo ""
    read -p "Press Enter to continue after editing .env file..."
fi

# Run setup script if it hasn't been run before
if [ ! -f ".setup-complete" ]; then
    echo "🔧 Running initial setup..."
    npm run setup
    touch .setup-complete
    echo "✅ Setup completed"
fi

# Start the development server
echo "🌐 Starting development server..."
echo "   Server will be available at: http://localhost:3001"
echo "   API documentation: http://localhost:3001/api/health"
echo "   Press Ctrl+C to stop the server"
echo ""

npm run dev 