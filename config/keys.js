// add this file to .gitignore
const aws = require('aws-sdk');

let s3 = new aws.S3({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  dbURI: process.env.dbURI,
  cookieKey: process.env.cookieKey
});

module.exports = {
    google: {
        clientID: "646189365515-8kbfmofo5nihrs3hrcoukasu47rp6rfo.apps.googleusercontent.com",
        clientSecret: "DRS8bp2crWJ5MNspU2I5nbmR"
    },
    mongo: {
        dbURI: "mongodb+srv://davelist:daveslist123@cluster0.eair7.mongodb.net/<dbname>?retryWrites=true&w=majority" 
    },
    session: {
        cookieKey: "tryandguessmyidformycookieiditwillbeencyrpted"

    }
};
