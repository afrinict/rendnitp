# Copy backend code to server
Write-Host "Copying backend code to server..."
& 'C:\Program Files\PuTTY\pscp.exe' -i "F:\deployment\AWS KEY\DevSys.ppk" -r backend/* ubuntu@13.60.51.79:/var/www/backend/

Write-Host "Backend code copied successfully!" 