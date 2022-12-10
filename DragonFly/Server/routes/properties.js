var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/properties');

// list all properties
router.get('/', function (req, res, next) {
    var collection = db.get('properties');
    collection.find({}, function (err, properties) {
        if (err) throw err;
        res.send(JSON.stringify(properties));

    })
});

// show a particular property with property id
router.get('/:id', function (req, res, next) {
    var collection = db.get('properties');
    collection.findOne({ _id: req.params.id }, function (err, propertie) {
        if (err) throw err;
        if (propertie) {
            res.send(JSON.stringify(propertie));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }
    })
});

// add a property 
router.post('/', function (req, res, next) {
    console.log(req.body)
    var propcollection = db.get('properties');
    propcollection.insert(req.body, function (err, propertie) {
        if (err) {
            throw err;
        }
        res.status(200)
        res.send(JSON.stringify({ status: 200, messgae: "data inserted sucessfully", data: (propertie) }));
    })

});

// delete a property with a property id
router.delete('/:id', function (req, res, next) {
    var collection = db.get('properties');
    collection.findOne({ _id: req.params.id }, function (err, propertie) {
        if (err) {
            res.status(400)
            throw err;
        }
        if (propertie) {
            collection.remove(propertie)
            res.send(JSON.stringify({ status: 200, messgae: "data delete sucessfully" }));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }

    })
});

// update a property with a property id
router.patch('/:id', function (req, res, next) {
    var collection = db.get('properties');
    collection.update({ _id: req.params.id }, { $set: req.body }, { upsert: true }, function (err, result) {
        console.log(err);
        res.send(
            (err === null) ? { msg: 'data updated sucessfully' } : { msg: 'error: ' + err }
        );
    });

})
module.exports = router;
