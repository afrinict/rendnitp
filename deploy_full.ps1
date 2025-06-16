# Build the frontend
Write-Host "Building frontend..."
npm run build

# Create deployment directories
Write-Host "Creating deployment directories..."
mkdir -Force deploy
Copy-Item -Path "dist\*" -Destination "deploy" -Recurse

# Create nginx configuration
Write-Host "Creating nginx configuration..."
$nginxConfig = @'
server {
    listen 80;
    server_name 13.60.51.79;
    root /var/www/html;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API routes
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
'@

Set-Content -Path "deploy/nginx.conf" -Value $nginxConfig

# Create backend setup script
Write-Host "Creating backend setup script..."
$backendSetup = @'
#!/bin/bash

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Create backend directory
sudo mkdir -p /var/www/backend
sudo chown -R ubuntu:ubuntu /var/www/backend

# Install backend dependencies
cd /var/www/backend
npm install

# Start backend with PM2
pm2 start index.js --name backend
pm2 save
pm2 startup
'@

Set-Content -Path "deploy/setup_backend.sh" -Value $backendSetup

# Create server setup script
Write-Host "Creating server setup script..."
$serverSetup = @'
#!/bin/bash

# Create necessary directories
sudo mkdir -p /var/www/html
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# Set proper permissions
sudo chown -R ubuntu:ubuntu /var/www/html
sudo chmod -R 755 /var/www/html

# Install nginx if not already installed
sudo apt-get update
sudo apt-get install -y nginx

# Move nginx configuration
sudo mv /var/www/html/nginx.conf /etc/nginx/sites-available/nitp-app
sudo ln -sf /etc/nginx/sites-available/nitp-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx

# Make backend setup script executable and run it
chmod +x /var/www/backend/setup_backend.sh
/var/www/backend/setup_backend.sh
'@

Set-Content -Path "deploy/setup_server.sh" -Value $serverSetup

# Copy files to server
Write-Host "Copying files to server..."
& 'C:\Program Files\PuTTY\pscp.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" -r deploy/* ubuntu@13.60.51.79:/tmp/deploy/

# Execute setup on server
Write-Host "Setting up server..."
$commands = @'
sudo rm -rf /var/www/html/*
sudo mv /tmp/deploy/* /var/www/html/
sudo chmod +x /var/www/html/setup_server.sh
sudo /var/www/html/setup_server.sh
'@

& 'C:\Program Files\PuTTY\plink.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" ubuntu@13.60.51.79 $commands

Write-Host "Deployment completed! The application should be available at http://13.60.51.79" 