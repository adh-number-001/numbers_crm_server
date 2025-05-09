export namespace BigIntTransformer {
  export function toObject<T>(obj: object): T {
    return JSON.parse(
      JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
    );
  }
}
