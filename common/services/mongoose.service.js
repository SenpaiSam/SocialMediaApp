const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

var url = "mongodb+srv://tourguide:guide02@cluster0.0bkqq.mongodb.net/Cluster0?retryWrites=true&w=majority"; //"mongodb://localhost:27017/rest-tutorial"

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(url, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        // console.log(err.reason);
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000);
    })
};

connectWithRetry();

exports.mongoose = mongoose;