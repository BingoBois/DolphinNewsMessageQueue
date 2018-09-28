const amqp = require("amqplib/callback_api");

module.exports.sendToRabbit = (message) => {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://80.167.223.178', function (err, conn) {
            if (err) {
                reject(err);
            }
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                ch.assertQueue('DolphinNews', { durable: false });
                ch.sendToQueue('DolphinNews', Buffer.from(message));
                resolve(true);
            });
        });
    })
}