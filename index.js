const startupDebug = require('debug')('app:startup'); 
//const dbDebug = require('debug')('app:db');
//const config = require('./config');
const express = require('express');

const setupRoutes = require('./routes/SetupRoutes');
const userRoutes = require('./routes/UserRouter');
const adminRoutes = require('./routes/AdminRouter');
const app = express();
const morgan = require('morgan');

startupDebug('App Started');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for url abc=abc&
app.use(express.static('public')); 

app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') == 'development') app.use(morgan('tiny'));

app.get('/', (req, res) => { 
    res.render('index', {title: 'App', message:'Welcome'});
});

app.use('/setup', setupRoutes)
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));

// Export the Express API
module.exports = app

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
-npm -i
-npm install 
-npm install --save common

-npm run devStart
-sudo npm i -g nodemon
-nodemon index.js
-export PORT=5000
-export NODE_ENV=production
-jshint server.js
-jshint index.js
-export DEBUG=app:*
-npm init --yes
http://localhost:3000/user/subscribe/1
*/

//console.log(config.get('name'));
//console.log(config.get('mail_host'));
//console.log(config.get('mail_password'));
//console.log(config.get('mail_password'));


/*
Node


Verify that MongoDB has started successfully:
ps aux | grep -v grep | grep mongod

Check
mongosh
mongo
mongod



Set env MongoDB
 mkdir $HOME/data; 
mongod --dbpath $HOME/data


brew install mongodb
mongod --config /usr/local/etc/mongod.conf
*/