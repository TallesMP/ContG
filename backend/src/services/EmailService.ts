import nodemailer from "nodemailer";
import dns from "dns/promises";
import { EmailRepository } from "../repositories/EmailRepository";

export class EmailService {
  static async sendVerificationCode(email: string) {
    await this.validateEmail(email);
    const text = "Seu código de verificação é: ";
    const subject = "Código de verificação.";
    const value = await EmailRepository.insertCode(email);

    this.sendEmail(email, text, subject, value);
  }

  static async sendEmail(
    email: string,
    text: string,
    subject: string,
    value: string
  ): Promise<void> {
    try {
      await this.validateEmail(email);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: subject,
        text: text + value,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error("Erro ao enviar email");
    }
  }

  static async validateEmail(email: string): Promise<boolean> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido.");
    }

    const domain = email.split("@")[1];
    try {
      await dns.resolveMx(domain);
    } catch (error) {
      throw new Error("Domínio de email inválido.");
    }
    return true;
  }
}
