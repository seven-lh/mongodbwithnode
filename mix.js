var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
  if (err) throw err
  var prices = db.collection('prices')
  prices.aggregate([{
      $match: {
        size: process.argv[2]
      }
    },
    {
      $group: {
        _id: 'average',
        average: {
          $avg: '$price'
        }
      }
    }
  ]).toArray(function(err, results) {
    if (err) throw err
    if (!results.length) {
      throw new Error('no results')
    }
    // console.log(results);
    var avg = Number(results[0].average).toFixed(2)
    console.log(avg);
    db.close()
  })
})


// 其他处理函式有：
//
//   * `$avg`
//   * `$first`
//   * `$last`
//   * `$max`
//   * `$min`
//   * `$push`
//   * `$addToSet`
//   * `$sum`
