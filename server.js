const express = require("express");
const userRoutes = require('./routes/UserRouter');
const app = express();
//npm run devStart

app.use('/', userRoutes);
app.listen(3000);


/*
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