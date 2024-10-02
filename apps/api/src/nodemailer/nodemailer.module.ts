import { Module } from '@nestjs/common';
import { NodemailerService } from './services/nodemailer.service';
import { NodemailerController } from './controllers/nodemailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DEFAULT_EMAIL_FROM } from './constants/email_config.constant';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST_OUTLOOK,
          port: Number(process.env.MAIL_PORT_OUTLOOK),
          secure: false, // true para 465, false para otros puertos
          requireTLS: true,
          auth: {
            user: process.env.MAIL_USER_OUTLOOK,
            pass: process.env.MAIL_PASS_OUTLOOK,
          },
        },
        transports: {},
        defaults: {
          from: `No responder ${DEFAULT_EMAIL_FROM}`,
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [NodemailerController],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
