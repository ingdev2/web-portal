import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActionTypesEnum } from '../../utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from '../../utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from '../../utils/enums/audit_logs_enums/module_names.enum';

export class CreateAuditLogDto {
  @IsOptional()
  @IsString()
  user_name: string;

  @IsOptional()
  @IsString()
  user_id_number: string;

  @IsOptional()
  @IsString()
  user_email: string;

  @IsOptional()
  @IsString()
  user_role: string;

  @IsNotEmpty()
  @IsEnum(ActionTypesEnum)
  action_type: ActionTypesEnum;

  @IsNotEmpty()
  @IsEnum(QueryTypesEnum)
  query_type: QueryTypesEnum;

  @IsNotEmpty()
  @IsEnum(ModuleNameEnum)
  module_name: ModuleNameEnum;

  @IsNotEmpty()
  @IsString()
  module_record_id: string;

  @IsOptional()
  @IsString()
  ip_address: string;

  @IsOptional()
  @IsString()
  is_mobile: string;

  @IsOptional()
  @IsString()
  browser_version: string;

  @IsOptional()
  @IsString()
  operating_system: string;
}
