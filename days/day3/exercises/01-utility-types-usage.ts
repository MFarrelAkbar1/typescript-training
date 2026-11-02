/**
 * Hari 3 · Soal 01 — Memakai Built-in Utility Types  (★☆☆)
 *
 * Di dunia kerja, satu entity (User) punya banyak "turunan": input create, input update,
 * bentuk publik (tanpa data sensitif), dsb. Turunkan semuanya dari `User`.
 * JANGAN menulis ulang properti secara manual.
 *
 * TODO:
 *  1. `CreateUserInput` -> User TANPA id, createdAt, passwordHash; DITAMBAH `password: string`.
 *  2. `UpdateUserInput` -> hanya email, name, role, dan SEMUANYA opsional.
 *  3. `PublicUser`      -> User tanpa passwordHash.
 *  4. `UsersByRole`     -> objek dengan key setiap role ("admin" & "member"),
 *                          value-nya PublicUser[].
 *  5. `toPublicUser(user)` -> buang passwordHash (objek baru).
 *  6. `applyUpdate(user, patch)` -> User baru; properti di patch yang `undefined` diabaikan.
 *  7. `groupByRole(users)` -> UsersByRole; setiap role SELALU ada (array kosong jika tidak ada user).
 */

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin" | "member";
  createdAt: Date;
}

export type CreateUserInput = unknown; // TODO
export type UpdateUserInput = unknown; // TODO
export type PublicUser = unknown; // TODO
export type UsersByRole = unknown; // TODO

export function toPublicUser(user: User): PublicUser {
  throw new Error("TODO");
}

export function applyUpdate(user: User, patch: UpdateUserInput): User {
  throw new Error("TODO");
}

export function groupByRole(users: User[]): UsersByRole {
  throw new Error("TODO");
}
