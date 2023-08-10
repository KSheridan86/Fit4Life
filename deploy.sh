#run updates
sudo apt update
# Delete the old project folder
# sudo rm -r /Fit4Life
# Clone in new repo
# git clone https://github.com/KSheridan86/Fit4Life.git
# Change directory into the application folder
cd Fit4Life
cd ruby-backend
rails db:migrate RAILS_ENV=development

# Pass in certs for HTTPS
# echo $PRIVATE_KEY > privatekey.pem
# echo $SERVER > server.crt
# Start the server
rails server --binding 0.0.0.0 -p 4000