import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IdTypesService } from '../services/id_types.service';
import { CreateIdTypeDto } from '../dto/create-id_type.dto';
import { UpdateIdTypeDto } from '../dto/update-id_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';

@ApiTags('id-types')
@ApiBearerAuth()
@Controller('id-types')
export class IdTypesController {
  constructor(private readonly idTypesService: IdTypesService) {}

  // POST METHODS //

  @Post('/create')
  createIdType(@Body() createIdType: CreateIdTypeDto) {
    return this.idTypesService.createIdType(createIdType);
  }

  // GET METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Get('/getAll')
  getAllIdTypes() {
    return this.idTypesService.getAllIdTypes();
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Patch('/update/:id')
  updateIdType(@Param('id') id: number, @Body() updateIdType: UpdateIdTypeDto) {
    return this.idTypesService.updateIdType(id, updateIdType);
  }
}
