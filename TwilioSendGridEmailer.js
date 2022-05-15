const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

//function sendTwilio(emailIDtoCall, callIDtoSend){
const message = {
    to: '23ab1107@wwprsd.org',
    // ENTER YOUR EMAIL FROM SINGLE SENDER
    from: '23ab1107@wwprsd.org',
    subject: 'CookIt Interactive Session Join Code',
    text: `Your call ID is `,
    html: `<strong>Your call ID is Q2A5UdryGh5TOTGTzVqB</strong>`,
  }

sgMail.send(message)
.then(response => console.log('Email has been sent!'))
.catch(error => console.log(error.message))
//}