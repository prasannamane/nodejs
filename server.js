const express = require("express");
const userRoutes = require('./routes/UserRouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); //for url abc=abc&
app.use(express.static('public'));

app.use('/', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));


/* 1. 
const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello Eorld');
        res.end();
    }

    if(req.url === '/api/cources'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(3000);
console.log('started 3000');
*/

/* 2. 
GET
PUT
POST
DELETE
*/

/* 3. 
-npm run devStart
-sudo npm i -g nodemon
-nodemon index.js
-export PORT=5000
-jshint server.js

*/