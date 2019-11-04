import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expresshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const templatePath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: expresshbs.create({
          layoutsDir: resolve(templatePath, 'layouts'),
          partialsDir: resolve(templatePath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath: templatePath,
        extName: '.hbs'
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();
