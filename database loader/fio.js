var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/';
var collectionName = 'Books';
var filename = 'proj2-book-list.txt';

var printLine = 1000;

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error('Problem connecting to database');
    } else {
        console.log('Connected correctly to server.');

        var lineReader = require('line-reader');
        var dbName = db.db('Library');

        var lineNum = -1;

        lineReader.eachLine(filename, function(line, last, cb) {
            lineNum++;
            try {
                var split = line.split(',');
                var object = {ISBN: split[0], Rating: parseInt(split[1]), Review: '', ReviewTitle: '', Title: split[2], Author: split[3], Genre: split[4], Desc: split[5], Cover: split[6]};

                    dbName.collection('Books').insertOne(object, function (insertErr, insertObj) {
                        if (insertErr) {
                            console.error(insertErr);
                        }
                        if (lineNum % printLine === 0) {
                            console.log('Line ' + lineNum);
                        }
                        if (last) {
                            console.log('Done with ' + filename + ' (' + lineNum + ' records)');
                            process.exit(0);
                        } else {
                            cb();
                        }
                    })

            } catch (lineError) {
                console.error(lineError);
            }
        })
    }
})
