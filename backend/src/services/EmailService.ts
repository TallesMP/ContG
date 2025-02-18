import nodemailer from 'nodemailer'
import dns from 'dns/promises'

export class EmailService {
  static async validateEmail(email: string): Promise<boolean> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido.');
    }

    const domain = email.split('@')[1];
    try {
      await dns.resolveMx(domain);
    } catch (error) {
      throw new Error('Domínio de email inválido.');
    }

    return true;
  }

  static async sendVerificationEmail(email: string, codigo: string): Promise<void> {
    try {
      await this.validateEmail(email);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Verifique seu endereço de email',
        text: `Seu codigo de verificação é codigo: ${codigo}`
      };

      await transporter.sendMail(mailOptions);
      console.log("Código enviado");
    } catch (error) {
      console.error("Erro ao enviar email: ", error);
      throw new Error("Erro ao enviar email");
    }
  }
}
