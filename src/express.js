const express = require('express');
const bodyParser = require('body-parser');

const { sendToRabbit } = require('./rabbitMQ');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8081;

app.get('/', (req, res) => {
    res.json({
        message: "Hello from Express"
    })
})

app.post('/new', (req, res) => {
    console.log(`Received new request`);
    let msg = "Successfully forwarded message to RabbitMQ.";
    sendToRabbit(JSON.stringify(req.body)).then(() => {
        res.json({
            message: msg
        })
        console.log(`Successfully forwarded message!`);
    }).catch((err) => {
        res.status = 500;
        msg = "An error ocurred while forwarding message, please try again.";
        res.json({
            message: msg
        })
        console.log(`Error ocurred... ${JSON.stringify(err)}`);
    });
    
})

app.listen(PORT, () => {
    console.log(`Express server is running on Port: ${PORT}`);
})