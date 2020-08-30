'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {
    let body = req.body

    if (body.object === 'page') {

        body.entry.forEach((entry) => {
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)

            // let sender_psid = webhook_event.sender.id
            // console.log('Sender psid : ', sender_psid)
        })
        res.status(200).send('Event Recieved')
    }
    else {
        res.status(404).send()
    }
})

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "test"

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK VERIFIED')
            res.status(200).send(challenge)
        }
        else {
            res.status(403).send()
        }
    }
})

app.listen(process.env.PORT || 1337, () => {
    console.log('Webhook is live')
})