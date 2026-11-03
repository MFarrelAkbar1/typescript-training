/**
 * Hari 1 · Soal 03 — type vs interface  (★★☆)
 *
 * TODO:
 *  1. `User` adalah interface dengan `id: string` dan `name: string`.
 *  2. `Admin` adalah interface yang MEWARISI User dan menambah `permissions: string[]`.
 *  3. `AppConfig` sudah dideklarasikan dengan `port`. Tambahkan properti `host: string`
 *     TANPA mengubah deklarasi yang sudah ada.
 *  4. `Shape` adalah gabungan "salah satu dari" `Circle` atau `Square`.
 *  5. `describeUser(user)` menerima User atau Admin:
 *       - User biasa -> "Ana"
 *       - Admin      -> "Ana (admin: read, write)"
 *  6. `area(shape)` menghitung luas (circle: Math.PI * r^2, square: side^2).
 */

export interface User {} // TODO

export interface Admin {} // TODO

export interface AppConfig {
  port: number;
}
// TODO (3)

export type Circle = { kind: "circle"; radius: number };
export type Square = { kind: "square"; side: number };
export type Shape = unknown; // TODO

export function describeUser(user: User | Admin): string {
  throw new Error("TODO");
}

export function area(shape: Shape): number {
  throw new Error("TODO");
}
