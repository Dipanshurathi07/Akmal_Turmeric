const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');
const { sendEmail } = require("../Services/email");
const { adminHtml, customerHtml } = require("../Utils/otpandHtml");

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    const contact = new Contact({ name, email, phoneNumber, message });
      await sendEmail(process.env.EMAIL_USER,"New Contact Enquiry","New enquiry received",adminHtml(name, email, phoneNumber, message)
    );

    // Customer Mail
    await sendEmail(
      email,
      "Thank You For Contacting Us",
      "We received your enquiry",
      customerHtml(name)
    );

    await contact.save();
    return res.status(201).json({ Message: 'Contact form submitted successfully', contact });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

module.exports = router;
