# Create a temporary directory on the server
Write-Host "Creating temporary directory on server..."
& 'C:\Program Files\PuTTY\plink.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" ubuntu@13.60.51.79 "sudo mkdir -p /tmp/deploy && sudo chown ubuntu:ubuntu /tmp/deploy"

# Copy all files to the temporary directory
Write-Host "Copying files to server..."
& 'C:\Program Files\PuTTY\pscp.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" -r deploy/* ubuntu@13.60.51.79:/tmp/deploy/

# Execute deployment commands on the server
Write-Host "Setting up the application on server..."
$commands = @'
sudo rm -rf /var/www/html/*
sudo mv /tmp/deploy/* /var/www/html/
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

sudo ln -sf /etc/nginx/sites-available/nitp-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
sudo nginx -t
sudo systemctl restart nginx
'@

& 'C:\Program Files\PuTTY\plink.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" ubuntu@13.60.51.79 $commands

Write-Host "Deployment completed! The application should be available at http://13.60.51.79" 