#!/bin/bash

# TneXa FTP Deployment Script
# This script builds the project and uploads the 'dist' folder to OVH FTP.

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
else
    echo "Error: .env file not found. Please create one with FTP_HOST, FTP_USER, FTP_PASS, and FTP_REMOTE_DIR."
    exit 1
fi

echo "🚀 Starting deployment for TneXa..."

# 1. Build the project
echo "📦 Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Deployment aborted."
    exit 1
fi

# 2. Upload to FTP
# We use lftp which is robust for mirror operations
echo "📤 Uploading to FTP: $FTP_HOST..."

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp is not installed. Please install it (brew install lftp on Mac)."
    exit 1
fi

lftp -f <<EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
set ssl:verify-certificate no
lcd dist
mirror -R . $FTP_REMOTE_DIR
bye
EOF

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful! Your site is live."
else
    echo "❌ FTP upload failed."
    exit 1
fi
