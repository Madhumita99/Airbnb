var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/properties');

// store the user information based on user id
router.get('/', function (req, res, next) {
    let userId = req.query.id;
    let userCollection = db.get('users');
    let reservationsCollection = db.get('reservations');
 
    if(userId){

        userCollection.findOne({ _id:userId }, function (err, propertie) {
            if (err) throw err;
            if (propertie) {
                res.send(JSON.stringify(propertie));
            } else {
                res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
            }
        })
    }

});

// list all reservations for a particular user
router.get('/:id', function (req, res, next) {
    var collection = db.get('reservations');
    collection.find({ userId: req.params.id }, function (err, propertie) {
        if (err) throw err;
        console.log(req.params.id)
        if (propertie) {
            res.send(JSON.stringify(propertie));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }
    })
});

// show a reservation for a particular user using reservation id
router.get('/:id/:reserveId', function (req, res, next) {
    var collection = db.get('reservations');
    collection.findOne({ userId: req.params.id, _id: req.params.reserveId }, function (err, propertie) {
        if (err) throw err;
        if (propertie) {
            res.send(JSON.stringify(propertie));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }
    })
});

// add a reservation for a particular user
router.post('/:id', function (req, res, next) {
    console.log(req.body)
    var propcollection = db.get('reservations');
    propcollection.insert(req.body, function (err, propertie) {
        if (err) {
            throw err;
        }
        res.status(200)
        res.send(JSON.stringify({ status: 200, messgae: "data inserted sucessfully", data: (propertie) }));
    })

});

// delete a reservation for a particular user using the reservation id
router.delete('/:id/:reserveId', function (req, res, next) {
    var collection = db.get('reservations');
    collection.findOne({ userId: req.params.id, _id: req.params.reserveId }, function (err, propertie) {
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

// update a reservation for a particular user using the reservation id
router.patch('/:id/:reserveId', function (req, res, next) {
    var collection = db.get('reservations');
    collection.update({ userId: req.params.id, _id: req.params.reserveId }, { $set: req.body }, { upsert: true }, function (err, result) {
        console.log(err);
        res.send(
            (err === null) ? res.send(JSON.stringify({ status: 200, messgae: "data updated sucessfully"})) : res.send(JSON.stringify({ status: 404, messgae: "error" + err }))
        );
    });

});
module.exports = router;
