import "./env";
import { words, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken"

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * words.length);
  return `${words[randomNumber]} ${nouns[randomNumber]}`;
};

// 이메일 기능(sendgrid 참고)
export const sendMail = (email) => {
  const options = {
      auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));

  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) =>{
  const email = {
    from: "gmldbd@prismagram.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret it <div> <h3>${secret} </div> </h3>. <br/> Copy paste on the app/wesite to log in`
  }

  return sendMail(email);
}

//토큰 만들어 주기
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
