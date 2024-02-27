import { Body, Controller, Post } from '@nestjs/common';
import { NodemailerService } from '../services/nodemailer.service';
import { SendEmailDto } from '../dto/send_email.dto';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('/send-email')
  async emailSend(
    @Body()
    {
      from,
      recipients,
      subject,
      userName,
      medicalReqFilingNumber,
      requirementType,
      requestStatusReq,
      emailTemplate,
    }: SendEmailDto,
  ) {
    return await this.nodemailerService.sendEmail({
      from,
      recipients,
      subject,
      userName,
      medicalReqFilingNumber,
      requirementType,
      requestStatusReq,
      emailTemplate,
    });
  }
}