var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/users');
router.get('/', function (req, res, next) {
    var collection = db.get('users');
    collection.find({}, function (err, properties) {
        if (err) throw err;
        res.send(JSON.stringify(properties));

    })
});
router.get('/:id', function (req, res, next) {
    var collection = db.get('users');
    collection.findOne({ _id: req.params.id }, function (err, user) {
        if (err) throw err;
        if (user) {
            res.send(JSON.stringify(user));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }
    })
});

router.post('/', function (req, res, next) {
    console.log(req.body)
    var propcollection = db.get('users');
    propcollection.insert(req.body, function (err, user) {
        if (err) {
            throw err;
        }
        res.status(200)
        res.send(JSON.stringify({ status: 200, messgae: "data inserted sucessfully", data: (user) }));
    })

});

router.delete('/:id', function (req, res, next) {
    var collection = db.get('users');
    collection.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.status(400)
            throw err;
        }
        if (user) {
            collection.remove(user)
            res.send(JSON.stringify({ status: 200, messgae: "data delete sucessfully" }));
        } else {
            res.send(JSON.stringify({ status: 404, messgae: "data not found" }));
        }

    })
});
router.patch('/:id', function (req, res, next) {
    var collection = db.get('users');
    collection.update({ _id: req.params.id }, { $set: req.body }, { upsert: true }, function (err, result) {
        console.log(err);
        res.send(
            (err === null) ? { msg: 'data updated sucessfully' } : { msg: 'error: ' + err }
        );
    });

})
module.exports = router;
