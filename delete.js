const mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
var dbName = process.argv[2]
var collection = process.argv[3]
var _id = process.argv[4]
mongo.connect(url + dbName, function(err, db) {
  if (err) throw err
  var dbCollection = db.collection(collection)
  dbCollection.remove({
    _id: _id
  }, function(err, data) {
    if (err) throw err
    // console.log(data);
    db.close()
  })
})
