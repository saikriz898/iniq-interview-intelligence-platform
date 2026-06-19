const mongoose = require('mongoose');
const Experience = require('./models/Experience');

mongoose.connect("mongodb://127.0.0.1:27017/iniq")
.then(async () => {
    const exps = await Experience.find({});
    console.log(`Found ${exps.length} experiences`);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
