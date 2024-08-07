### Setup

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
