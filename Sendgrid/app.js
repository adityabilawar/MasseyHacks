const sgMail = require("@sendgrid/mail")

const API_KEY = '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'

sgMail.setApiKey(API_KEY)

const message = {
    to: 'derek.s.prog@gmail.com',
    from: 'CookitModel@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
    .send(message)
    .then(response => console.log('Email sent...'))
    .catch(error => console.log(error.message))