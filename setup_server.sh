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

# Create nginx configuration
sudo tee /etc/nginx/sites-available/nitp-app << 'EOL'
server {
    listen 80;
    server_name 13.60.51.79;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOL

# Enable the site
sudo ln -sf /etc/nginx/sites-available/nitp-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx 