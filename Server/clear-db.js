const mongoose = require('mongoose');
const Experience = require('./models/Experience');

mongoose.connect("mongodb://127.0.0.1:27017/iniq")
.then(async () => {
    console.log('Connected to MongoDB');
    await Experience.deleteMany({});
    console.log('Deleted all experiences successfully.');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
