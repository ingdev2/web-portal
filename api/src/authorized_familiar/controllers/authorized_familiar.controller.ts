import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorizedFamiliarService } from '../services/authorized_familiar.service';
import { CreateAuthorizedFamiliarDto } from '../dto/create-authorized_familiar.dto';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';

@Controller('authorized-familiar')
export class AuthorizedFamiliarController {
  constructor(
    private readonly authorizedFamiliarService: AuthorizedFamiliarService,
  ) {}

  @Post()
  create(@Body() createAuthorizedFamiliarDto: CreateAuthorizedFamiliarDto) {
    return this.authorizedFamiliarService.create(createAuthorizedFamiliarDto);
  }

  @Get()
  findAll() {
    return this.authorizedFamiliarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorizedFamiliarService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorizedFamiliarDto: UpdateAuthorizedFamiliarDto,
  ) {
    return this.authorizedFamiliarService.update(
      +id,
      updateAuthorizedFamiliarDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorizedFamiliarService.remove(+id);
  }
}
