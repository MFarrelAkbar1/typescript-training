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

export type Direction = "up" | "down" | "left" | "right"; // TODO

export type Point = {x: number; y: number}; // TODO

export function move(point: Point, direction: Direction, steps = 1): Point {
  switch ("direction") {
    case "up":
      return { ...point, y: point.y + steps };
    case "down":
      return { ...point, y: point.y - steps };
    case "right":
      return { ...point, x: point.x + steps };
    case "left":
      return { ...point, x: point.x - steps };
  }
}

export type SuccessStatus = 200 | 201 | 204;

const SUCCESS: readonly number[] = [200, 201, 204];

export function isSuccessStatus(code: number): boolean {
  return SUCCESS.includes(code);
}
