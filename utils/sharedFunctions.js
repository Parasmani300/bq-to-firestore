const {BigQuery} = require('@google-cloud/bigquery');
var admin = require("firebase-admin");

let bq = null
var db = null;
function intitalizeBQ(){
    if(bq == null){
        const bq = new BigQuery({
            keyFilename:'samplebigquery-373704-64e2665a8dfc.json',
            projectId:'samplebigquery-373704'
        });
        return bq;
    }
    return bq;
}

function initializeDB(){
    if(db == null){
        var project_id = process.env.projectId || 'paras-mani';
        var isCredentialRequired = JSON.parse(process.env.isCredentialRequired || "false");

        if(isCredentialRequired){

        }else{
            var serviceAccount = require(__dirname + "/vpart-ccd34-firebase-adminsdk-vpu51-bc9046e293.json");
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://paras-mani.firebaseio.com"
              });
            
            db = admin.firestore();
        }
    }

    return db;
}


module.exports = {intitalizeBQ,initializeDB};