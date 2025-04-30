export class JwtUserPayload {
  readonly userId!: number;

  readonly userDeviceId!: number;
}

// device 별로 토큰 관리
export class JwtUserRequestDto extends JwtUserPayload {
  readonly iat!: number;

  readonly exp!: number;
}
