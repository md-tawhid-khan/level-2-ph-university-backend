import nodemailer from 'nodemailer'
import config from '../app/config';
export const sendEmail=async(to:string,html:string)=>{
    // Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.NODE_ENV==='production', // true for 465, false for other ports
  auth: {
    user: "md.tawhid.khan1998@gmail.com",
    pass: "mllb kkce atue iwzw",
  },
});

 await transporter.sendMail({
    from: 'md.tawhid.khan1998@gmail.com',
    to,
    subject: "password change koro, na hoy site probes korte parbe na",
    text: "reset your password within 10 minutes", // plain‑text body
    html, // HTML body
  });

} 