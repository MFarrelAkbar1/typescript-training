/**
 * Hari 1 · Soal 01 — Primitives & Literal Types  (★☆☆)
 *
 * TODO:
 *  1. Ubah `Direction` menjadi literal union: "up" | "down" | "left" | "right".
 *  2. Ubah `Point` menjadi objek dengan properti `x` dan `y` bertipe number.
 *  3. Implementasikan `move(point, direction, steps)`:
 *       - "up"    -> y + steps      - "down"  -> y - steps
 *       - "right" -> x + steps      - "left"  -> x - steps
 *     `steps` default-nya 1. Kembalikan objek BARU (jangan mutasi `point`).
 *  4. Ubah `SuccessStatus` menjadi literal union 200 | 201 | 204.
 *  5. Implementasikan `isSuccessStatus(code)` -> true jika code salah satu dari SuccessStatus.
 *
 * Jalankan: npm run test:day1 -- 01
 */

export type Direction = unknown; // TODO

export type Point = unknown; // TODO

export function move(point: Point, direction: Direction, steps = 1): Point {
  throw new Error("TODO");
}

export type SuccessStatus = unknown; // TODO

export function isSuccessStatus(code: number): boolean {
  throw new Error("TODO");
}
