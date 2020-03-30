const mongoose = require('mongoose');

// Aldrin's mongodb connection string
const url = 'mongodb://admin:admin@cluster0-shard-00-00-yrtfx.mongodb.net:27017,cluster0-shard-00-01-yrtfx.mongodb.net:27017,cluster0-shard-00-02-yrtfx.mongodb.net:27017/chatapplication?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Succesful Connection to Database!'))
    .catch(err => (console.log(err)));

module.exports = connect;