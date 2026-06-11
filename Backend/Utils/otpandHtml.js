const otpGenerator = ()=>{
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

const htmlTemplate = (otp)=>{
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2 style="color: #333;">Your OTP Code</h2>
      <p style="font-size: 18px; color: #555;">Use the following OTP to complete your verification process:</p>
      <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${otp}</div>
      <p style="font-size: 14px; color: #999;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
    </div>
  `;
}
const adminHtml = (name, email, phone, message) => {
  return `
  <div style="font-family: Arial, sans-serif;">
    <h2>📩 New Contact Enquiry</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Phone:</strong> ${phone}</p>

    <p><strong>Message:</strong></p>

    <div style="
      padding:15px;
      background:#f5f5f5;
      border-radius:8px;
    ">
      ${message}
    </div>
  </div>
  `;
};
const customerHtml = (name) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    max-width:600px;
    margin:auto;
  ">

    <h2 style="color:#16a34a;">
      Thank You For Contacting Us
    </h2>

    <p>Hello ${name},</p>

    <p>
      We have received your enquiry successfully.
    </p>

    <p>
      Our team will review your request and
      get back to you as soon as possible.
    </p>

    <br/>

    <p>
      Regards,
      <br/>
      Turmeric Store Team
    </p>

  </div>
  `;
};
module.exports = {otpGenerator,htmlTemplate,adminHtml,customerHtml};