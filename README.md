# GComplaints

A service to create and analyze geolocalized complaints

# Getting Started

Clone the Git repo

```shell
git clone https://github.com/paulobochi/gcomplaints.git
cd gcomplaints
```
### With Docker

The recommended way to build the environment is with docker

```shell
docker-compose build
docker-compose up -d
docker-compose exec api rails db:seed   //creates sample data
```

### Without Docker

#### Requirements

- Mongo
- Ruby 2.6.3
- NPM

#### Backend

To setup and get the backend running locally run:

```shell
cd backend
bundle install
rails db:seed             //creates sample data
rails s -p 4000
```

#### Frontend

To setup and get the frontend running locally run:

```shell
cd frontend
yarn install
npm start
```

#### Browse app

After configuring your environment, the app can be accessed at http://localhost:3000 and the api at http://localhost:4000.

# Running Backend Tests

The backend tests were done with rspec, to execute them run:

```shell
cd backend
rspec
```

# Documentation
Documentation can be accessed at http://localhost:4000/docs