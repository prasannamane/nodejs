const mongoose = require('mongoose');

class CommonModel {
    connection() {
        mongoose.connect('mongodb://127.0.0.1:27017/subscriber')
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.error('Could not connect to MongoDB...', err));
            const subscribeSchema = new mongoose.Schema({
                name: String,
                email: String,
            });
            return mongoose.model('Subscribe', subscribeSchema);
    }
   
    creteSubscribe(Subscribe) {
        return new Subscribe({
            name: 'Subscribe Chennel Now',
            email: 'prasannamane7@gmail.com',
            author: 'Prasanna',
            tags: ['node', 'backend'], 
            isPublished: true
        });
    }
    subscribe(Subscribe) {
        return Subscribe.find().limit(1);
    }
}

Setup = new CommonModel();
exports.connection = Setup.connection();