const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iniq').then(async () => {
    const db = mongoose.connection.db;
    const exps = await db.collection('experiences').find().toArray();
    for(const exp of exps) {
        let changed = false;
        const fixedQs = exp.questions.map(q => {
            if(q.roundId && q.roundId.length > 5) {
                changed = true;
                return { ...q, roundId: '1' };
            }
            return q;
        });
        if(changed) {
            await db.collection('experiences').updateOne({_id: exp._id}, { $set: {questions: fixedQs} });
        }
    }
    console.log('Fixed retroactively!');
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
