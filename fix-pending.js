const mongoose = require('mongoose');
const Experience = require('./Server/models/Experience');
require('dotenv').config({ path: './Server/.env' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const result = await Experience.updateMany(
      { verdict: 'Pending' },
      { $set: { verdict: 'Selected' } }
    );
    console.log(`Updated ${result.modifiedCount} experiences from Pending to Selected.`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
    process.exit(1);
  });
