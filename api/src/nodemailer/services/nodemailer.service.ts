import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send_email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  DEFAULT_EMAIL_FROM,
  NAME_EMAIL_FROM,
} from 'src/nodemailer/constants/email_config.constant';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: SendEmailDto) {
    const {
      from,
      recipients,
      subject,
      userName,
      medicalReqFilingNumber,
      requirementType,
      emailTemplate,
      requestStatusReq,
    } = email;

    const emailSent = await this.mailerService.sendMail({
      from: from ?? {
        name: NAME_EMAIL_FROM,
        address: DEFAULT_EMAIL_FROM,
      },
      to: recipients,
      subject: subject,
      template: emailTemplate,
      context: {
        userName,
        medicalReqFilingNumber,
        requirementType,
        requestStatusReq,
      },
    });

    try {
      const response = await this.mailerService.sendMail(emailSent);

      return response;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
