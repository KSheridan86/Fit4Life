#run updates
sudo apt update
# install rvm
curl -sSL https://get.rvm.io | bash
source ~/.rvm/scripts/rvm
# install ruby version 3.2.2 and set as default
rvm install 3.2.2
rvm use 3.2.2 --default
# Change directory into the application folder
cd Fit4Life
cd ruby-backend
# Run a migration 
rails db:migrate RAILS_ENV=development
# Pass in certs for HTTPS
echo $PRIVATE_KEY > privatekey.pem
echo $SERVER > server.crt
# Start the server
rails server --binding 0.0.0.0 -p 4000