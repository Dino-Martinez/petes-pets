const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

// auth with our mailgun API key and domain
const auth = {
  auth: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN,
  },
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth))

module.exports.sendMail = (user, req, res) => {
  nodemailerMailgun
    .sendMail({
      from: 'no-reply@example.com',
      to: user.email, // An array if you have multiple recipients.
      subject: 'Hey you, awesome!',
      template: {
        name: 'email.handlebars',
        engine: 'handlebars',
        context: user,
      },
    })
    .then(info => {
      console.log('Response: ' + info)
    })
    .catch(err => {
      console.log('Error: ' + err)
    })
}
