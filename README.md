### Introduction

Hello, and welcome to the Inventory Manager.

This app allows you to view items created by an inventory manager. You can also create an account as an inventory manager, log in, view, update, add, and delete items in your inventory. You can also click "continue as a guest" on the home page to view all items. Click on an item title to bring up the details of that item in full. I hope you enjoy!

### Setup

To get started, please pull down the repo to your local machine.

This app uses a Postgres database in a Docker container, which you'll need to create and set up!

To set up your Docker container, you can run the following commands in your terminal:
'docker pull postgres'

'mkdir -p $HOME/docker/volumes/postgres'

'docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres'

Check that the commands above ran successfully by listing out the currently running Docker images:

docker ps -a

Switch to the Docker shell using the container ID:

docker exec -it <PSQL-Container-ID> bash

verify that postgres was installed by checking the version:

psql --version

Log in to the psql shell:

psql -U postgres

You will need to create a database with the following name:

CREATE DATABASE inventory_management;

From here, you should be able to run 'npm start' while inside of the api_server directory to populate the database with the appropriate tables and seed data (NOTE: The seed users do not have hashed passwords, and thus will not be able to login), as well as start the server! If not, make sure you ran all of the commands as outlined above and try again. If issues still persist, god speed.

After the above has been accomplished, CD into the 'client' directory and run 'npm start'

This should start the React app and open it in your browser. From here, you can enjoy the app!

### Notes

- There is no persistent log in, which I would like to implement. There is a log in system, however if you click "view all items" from your account page, it will then treat you the same as a guest.

- Refactoring: There are PLENTY of places that the app could use some cleanup. Notably, in the Itemlist.js file there are multiple functions that I would liked to have separated into their own files and pull in in order to shorten the overall file length.
