import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateContactRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @IsString()
  readonly phoneNumber!: string;

  @ApiProperty({ type: [String] })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  readonly subContactList!: string[];

  @ApiProperty({ type: [Number] })
  @Type(() => Number)
  @IsArray()
  @IsInt({ each: true })
  readonly contactGroupIdList!: number[];

  @ApiProperty({ type: [String] })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  readonly addressList!: string[];

  @ApiProperty({ type: [String] })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  readonly vehicleList!: string[];

  @ApiProperty({ type: [String] })
  @Type(() => String)
  @IsArray()
  @IsString({ each: true })
  readonly carNumberList!: string[];
}

export class CreateContactResponseDto {
  @ApiProperty()
  readonly status: string;

  constructor() {
    this.status = 'Success!';
  }
}
