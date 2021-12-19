const {admin,db} = require('../utils/firestore');

module.exports = {
    async save(data){
        const remindersDB = db.collection('reminders');

        return  await remindersDB.doc().set({
            ...data
        })
    },
    async findAll(startDate, endDate){
        const remindersDB = db.collection('reminders');

        return remindersDB
                    .where('reminderDate', '>=',admin.firestore.Timestamp.fromDate(new Date(`${startDate}T00:00`)))
                    .where('reminderDate', '<=', admin.firestore.Timestamp.fromDate(new Date(`${endDate}T23:59`)))
                    .get()
                    .then((snapshot)=>{
                        const results = [];
                        snapshot.forEach(doc => {
                            results.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        });

                        return results;
                    });
    },
    async update(id, data){
        const remindersDB = db.collection('reminders');

        return  await remindersDB.doc(id).update({
            ...data
        })
    },
    async delete(id){
        const remindersDB = db.collection('reminders');
        return await remindersDB.doc(id).delete()
    }
};