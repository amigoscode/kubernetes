const express    = require('express');        // call express
const actuator   = require('express-actuator')
const app        = express();                 // define our app using express

// envs
const port = process.env.PORT || 8081;        // set our port
const appName = process.env.APP_NAME
const killInSeconds = process.env.KILL_IN_SECONDS

const orders = [
    {customerId: 1, items: ['Apples', 'Bananas']},
    {customerId: 2, items: ['Water']},
];

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use(actuator())

router.get('/api/v1/order/customer/:customerId', function(req, res) {
    const customerOrders = orders.find(o =>  o.customerId == req.params.customerId);
    if (customerOrders) {
        return res.json(customerOrders);
    }
    return res.json([]);
});

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port, () => {
    console.log(`${appName || ""} Server Running on Port ${port}`);
    if (killInSeconds) {
        console.log(`server will die in ${killInSeconds} seconds`)
        setTimeout(() => {
            process.exit(1);
        }, killInSeconds * 1000);
    }
});