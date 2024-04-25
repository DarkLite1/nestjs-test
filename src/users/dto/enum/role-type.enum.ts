export enum RoleType {
  'INTERN',
  'ENGINEER',
  'ADMIN',
}

export type RoleTypeStrings = keyof typeof RoleType