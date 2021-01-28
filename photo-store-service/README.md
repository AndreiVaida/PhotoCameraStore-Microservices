# Photo camera application server

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using Docker
```bash
# see running processes
# add '-a' to see all processes
$ docker ps
____________________________________________________________________________________________________

# a) build with Dockerfile
$ docker build -t photo-store-server .

# run with Dockerfile
# '-d' for detached
# '-p' maps HOST_PORT:CONTAINER_PORT
# '--name' gives an arbitrary name to the image (that appears in 'docker ps -a')
$ docker run -dp 3000:3000 --name photo-server photo-store-server
____________________________________________________________________________________________________

# b) build and run with docker-compose.yml
$ docker-compose up
____________________________________________________________________________________________________

# stop image
$ docker stop photo-server

# remove image
$ docker rm photo-server
```