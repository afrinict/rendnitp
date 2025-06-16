#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create a deployment directory if it doesn't exist
echo "Creating deployment directory..."
mkdir -p deploy

# Copy the built files to the deployment directory
echo "Copying built files..."
cp -r dist/* deploy/

# Create a simple nginx configuration
echo "Creating nginx configuration..."
cat > deploy/nginx.conf << EOL
server {
    listen 80;
    server_name 13.60.51.79;
    root /var/www/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOL

# Create deployment instructions
echo "Deployment package is ready in the 'deploy' directory"
echo "To deploy to AWS EC2:"
echo "1. Copy the contents of the 'deploy' directory to your EC2 instance:"
echo "   scp -i \"F:/deployment/AWS KEY/DevSys.ppk\" -r deploy/* ubuntu@13.60.51.79:/var/www/html/"
echo "2. Copy nginx configuration:"
echo "   scp -i \"F:/deployment/AWS KEY/DevSys.ppk\" deploy/nginx.conf ubuntu@13.60.51.79:/etc/nginx/sites-available/nitp-app"
echo "3. SSH into your EC2 instance:"
echo "   ssh -i \"F:/deployment/AWS KEY/DevSys.ppk\" ubuntu@13.60.51.79"
echo "4. On the EC2 instance, run:"
echo "   sudo ln -s /etc/nginx/sites-available/nitp-app /etc/nginx/sites-enabled/"
echo "   sudo nginx -t"
echo "   sudo systemctl restart nginx" 