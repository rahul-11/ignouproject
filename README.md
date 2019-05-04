# worthero
The Worthero Project which was taken down on 4 May, 2019, since it is no longer 'relevant' to the market. 

This project contains:
  1. client:
      The frontend setup of the Worthero, based on React and Redux frameworks.
      To run frontend on local machine:
        pwd: /client
        1. npm install
        2. Run mongodb on local machine
        3. Run /server directory
  2. server:
      The backend setup of Worthero, based on Node.js and Requires MongoDB as database setup to run properly.
      To run server on local machine:
        pwd: /server
        1. npm install
        2. npm run start
        3. Run MongoDb
        4. To test: npm run test
  3. k8s:
      The kubernetes setup, to build the setup and create images out of the Dockerfile provided in /client and /server.
  4. travis.yml and deploy.sh :
      The setup file for travis-ci.org to test and deploy the docker images to dockerhub, then informing and seting up the 
      google cloud, in deploy.sh file.
     
 ######################## TO DEPLOY TO CLOUD ( GOOGLE CLOUD ) #########################################
 1. Setup the Travis-ci,
    Environment variable to be provided: DOCKER_USERNAME, DOCKER_PASSWORD
 2. Get credentials from Google Cloud to deploy application and setup from Travis-ci
    1. Get the file
    2. Rename it as 'service-account.json'
    3. Encrypt on travis-cli on local machine using docker container
    4. Make the Github Repository Public
    5. Watch the travis-ci logs.