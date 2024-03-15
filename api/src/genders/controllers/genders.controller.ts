import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderTypeService } from '../services/genders.service';
import { CreateGenderTypeDto } from '../dto/create-gender.dto';
import { UpdateGenderTypeDto } from '../dto/update-gender.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';

@ApiTags('genders')
@ApiBearerAuth()
@Controller('genders')
export class GenderTypeController {
  constructor(private readonly genderTypeService: GenderTypeService) {}

  // POST METHODS //

  @Post('/create')
  createGenderType(@Body() createGenderType: CreateGenderTypeDto) {
    return this.genderTypeService.createGenderType(createGenderType);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllGenderTypes() {
    return this.genderTypeService.getAllGenderTypes();
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Patch('/update/:id')
  updateGenderType(
    @Param('id') id: number,
    @Body() updateGenderType: UpdateGenderTypeDto,
  ) {
    return this.genderTypeService.updateGenderType(id, updateGenderType);
  }
}
