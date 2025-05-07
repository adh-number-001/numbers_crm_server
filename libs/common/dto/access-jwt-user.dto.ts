// device 별로 토큰 관리
export class AccessJwtUserPayload {
  readonly userId!: number;

  readonly userDeviceId!: number;
}

export class JwtUserRequestDto extends AccessJwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
