// server.js

//swati-gupta-011815453
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');	
var Order       = require('./app/models/order');


// DATABASE CONNECTION
mongoose.connect('mongodb://localhost/SFO'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/SFO)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});

// more routes for our API will happen here


// on routes that end in /orders
// ----------------------------------------------------
router.route('/orders')

    // create a Order (accessed at POST http://localhost:8080/SFO/orders)
    .post(function(req, res) {
        
        var order = new Order();      // create a new instance of the order
       // order.orderID = req.body.orderID;  // set orderID
        order.Coffee = req.body.Coffee;  // set the Coffee Ordered
        order.CupSize = req.body.CupSize;  // set the CupSize for drink ordered
        

        // save the order and check for errors
        order.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Order created!'+'    '+ 'Order Number is : '+ order._id.toHexString() + '     '+'Drink Ordered : '+order.CupSize+' '+ order.Coffee});
           
        });
        
    });


// on routes that end in /orders
// ----------------------------------------------------
router.route('/orders')

    // get all the orders (accessed at GET http://localhost:8080/SFO/orders)
    .get(function(req, res) {
        Order.find(function(err,SFO) {
            if (err)
                res.send(err);

            res.json(SFO);
        });
    });




// on routes that end in /orders/:orderID
// ----------------------------------------------------
router.route('/orders/:_id')

    // update the order with this id (accessed at PUT http://localhost:8080/SFO/orders:orderID)
    .put(function(req, res) {

        // use our order model to find the order we want
        Order.findById(req.params.orderID, function(err, order) {

            if (err)
                res.send(err);

            order._id = req.body._id;  // update the order info

            // save the order
            order.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Order updated!' });
            });

        });
    });


// on routes that end in /orders/:orderID
// ----------------------------------------------------
router.route('/orders/:_id')

    // get the order with that id (accessed at GET http://localhost:8080/SFO/orders/:_id)
    .get(function(req, res) {
        Order.find({"_id":req.params._id},function(err, order) {
            if (err)
                res.send(err);
            res.json(order);
        });
    });


// on routes that end in /orders/:_id
// ----------------------------------------------------
router.route('/orders/:_id')

    // delete the ORDER with this id (accessed at DELETE http://localhost:8080/SFO/orders/:_id)
    .delete(function(req, res) {
        Order.remove({
           "_id": req.params._id
        }, function(err, order) {
            if (err)
                res.send(err);

            res.json({ message: 'Order Successfully deleted !'});

        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /SFO
app.use('/SFO', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on Port ' + port);
