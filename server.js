const startupDebug = require('debug')('app:startup'); 
//const dbDebug = require('debug')('app:db');
//const config = require('./config');
const express = require('express');
const userRoutes = require('./routes/UserRouter');
const adminRoutes = require('./routes/AdminRouter');
const app = express();
const morgan = require('morgan');



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/subscriber')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err))

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

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 3001;
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
-npm -i
-npm install 
-npm install --save common

-npm run devStart
-sudo npm i -g nodemon
-nodemon index.js
-export PORT=5000
-export NODE_ENV=production
-jshint server.js
-export DEBUG=app:*
-npm init --yes
http://localhost:3000/user/subscribe/1
*/

//console.log(config.get('name'));
//console.log(config.get('mail_host'));
//console.log(config.get('mail_password'));
//console.log(config.get('mail_password'));