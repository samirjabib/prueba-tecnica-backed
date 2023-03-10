// NPM
const nodemailer = require('nodemailer')
const pug = require('pug')
const path = require('path')
const { htmlToText } = require('html-to-text')
const dotenv = require('dotenv')
const pdf = require("html-pdf")

dotenv.config({ path: './config.env' })

class Email {
  constructor(to) {
    this.to = to
  }

  // Connect to mail service
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '046ab6b4f02e47', // Mover a dotenv
        pass: '476a8e1e59a9b9' // Mover a dotenv
      }
    })
  }

  async sendEmail(template, subject, mailData) {
    const html = pug.renderFile(
      path.join(__dirname, 'templates', `${template}.pug`),
      {
        mailData
      }
    )

    pdf.create(html).toFile("pdf.pdf", (err, res) => {
      if (err) {
        console.log(err)
      } else {
        this.newTransport().sendMail({
          from: process.env.MAIL_FROM, // Mover a dotenv
          to: this.to,
          subject,
          html,
          text: htmlToText(html),
          attachments: {
            path: res.filename
          }
        })
      }
    })

    return null
  }


  async sendInventory(mailData) {
    await this.sendEmail('Inventory', 'Here you can find the inventory of the company', mailData)
  }
}

module.exports = { Email }
