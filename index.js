const moment = require('moment/moment');
const {queryShakespeare} = require('./bq/get');
const {updateOrInsert,getRecords,getRecordById} = require('./firestore/firestore');

async function compareBqToFirestore()
{
    const maxRecords = 1000;
    const bqRows = await queryShakespeare();

    for(var i = 0;i<bqRows.length;i+=maxRecords){
        var bqSubRows = bqRows.splice(i,i+maxRecords);
        console.log(bqSubRows[0]);
        bqSubRows.forEach(async(row) =>{
            if(!getRecordById(row.word).empty){
                // console.log(moment().format());
                row.time = moment().format();
                await updateOrInsert(row)
            }
        });
    }
    // console.log(bqRows);
}

// getRecords();



compareBqToFirestore();