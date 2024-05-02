// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";
// import User from "@/models/userModel";

// export const sendEmail = async ({ email, emailType, userId }) => {
//   try {
//     const hashedToken = bcryptjs.hash(userId.toString(), 10);
//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       });
//     } else if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "ac7e016c957fb9",
//         pass: "1c7eb4805b7588",
//       },
//     });

//     const mailOption = {
//       from: "kanak1803@gmail.com", // sender address
//       to: email, // list of receivers
//       subject:
//         emailType === "VERIFY" ? "verify your email" : "Reset your password", // Subject line
//       html: `<p>Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       }
//         or copy and paste the link below in your browser. <br> ${
//           process.env.DOMAIN
//         }/verifyemail?token=${hashedToken}
//         </p>`,
//     };
//     const mailRespone = await transport.sendMail(mailOption);
//     return mailRespone;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
