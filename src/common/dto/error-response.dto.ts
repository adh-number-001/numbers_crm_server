import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly message: string;

  @ApiProperty({ type: Date })
  readonly timestamp: string;

  @ApiProperty()
  readonly path: string;

  constructor(
    status: number,
    code: string,
    message: string,
    timestamp: string,
    path: string,
  ) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.timestamp = timestamp;
    this.path = path;
  }

  static from(args: {
    status: number;
    code: string;
    message: string;
    path: string;
  }) {
    const { status, code, message, path } = args;

    return new ErrorResponseDto(
      status,
      code,
      message,
      new Date().toISOString(),
      path,
    );
  }
}
