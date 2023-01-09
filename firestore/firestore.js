const {initializeDB} = require('../utils/sharedFunctions')
const table_name = "sprear";

async function getRecords()
{
    var db = initializeDB();
    let collectionRef = db.collection(table_name);
    let snapshot = await collectionRef.get();
    snapshot.forEach(element => {
        console.log(element.data());
    });
}

async function getRecordById(id){
    var db = initializeDB();
    let collectionRef = db.collection(table_name);
    let snapshot = await collectionRef.where('word','==',id).get();
    
    return snapshot;
}

async function updateOrInsert(data)
{
    var db =  initializeDB();

    let collectionRef = db.collection(table_name);
    let documentRef = collectionRef.doc(data.word);
    await documentRef.set(data);

}

module.exports = {getRecords,updateOrInsert,getRecordById};