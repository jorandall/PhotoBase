# PhotoBase

PhotoBase is a proof of concept data-driven full stack web application for photo journalling developed for a second year assessment at university.

It uses the following:

* MongoDB - NoSQL database
* Node.js - Runtime environment
* Mongoose - Object modeling for node.js
* Express.js - Framework for node.js
* BCrypt - Password-hashing
* Cloudinary - Cloud-based image storage
* Multer - Handling file uploads

## Local Application Instructions

To run this application locally, please do the following:

1. Clone the repository
2. Rename **.env.example** to **.env** and update variables accordingly
3. Open the project within Visual Studio Code
4. Open a terminal window and run the below command:

```
npm install
```
5. Add preset tags to the database with the below command:

```
node seeder
```

6. Start the server with the below command:

```
npm run dev
```

7. Visit the local web application at [http://localhost:2020](http://localhost:2020) (_note:_ the port number for the local host can be changed as desired within the **.env** file)

## Screen Resolution

As this application is proof-of-concept, it does not include any media queries. Therefore, the resolution of 1280 x 800 pixels is required as a minimum.


