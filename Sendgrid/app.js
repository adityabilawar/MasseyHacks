const sgMail = require("@sendgrid/mail")

const API_KEY = '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'

sgMail.setApiKey(API_KEY)

const message = {
    to: email,
    from: 'CookitModel@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
    .send(message)
    .then(response => console.log('Email sent...'))
    .catch(error => console.log(error.message))