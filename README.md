# Microservice code challenge

Microservices project. Allow authentication, CRUD operations using different services on different databases based on different user roles.

## Technologies

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Graphql
- Apollo Server
- Docker / Docker Compose

## Start (dev)

```sh
# in main directory:
docker-compose up
```

Or

```sh
# in each service directory(url need to change from service-name to localhost):
npm install
npm run dev
```

## Design

There are three services in this project.
bff-service: API-gateway using graphql as a rest api wrapper, also authenticate user for each request.
db-service: Express server using mongoose orm to manage CRUD operation on database db-service-db's vacancy&company collection.
auth-service: Express server using JWT to provide token and manage user collection on auth-service-db.
