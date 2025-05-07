// device 별로 토큰 관리
export class RefreshJwtUserPayload {
  readonly userId!: number;

  readonly userDeviceId!: number;
}

export class RefreshJwtUserRequestDto extends RefreshJwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
