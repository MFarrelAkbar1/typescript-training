/**
 * Hari 1 · Soal 05 — Narrowing dengan `in` dan `instanceof`  (★★☆)
 *
 * TODO:
 *  1. `speak(pet)` -> panggil `meow()` jika Cat, `bark()` jika Dog.
 *  2. `toDate(input)` menerima Date | string | number:
 *       - Date    -> kembalikan apa adanya (instance yang sama)
 *       - lainnya -> new Date(input)
 *  3. `HttpError` adalah subclass Error dengan properti readonly `status: number`.
 *     Constructor: (status: number, message: string). Set juga `name = "HttpError"`.
 *  4. `errorMessage(e: unknown)`:
 *       - Error   -> e.message
 *       - string  -> e itu sendiri
 *       - lainnya -> "Unknown error"
 *  5. `statusOf(e: unknown)` -> e.status jika HttpError, selain itu 500.
 */

export type Cat = { name: string; meow(): string };
export type Dog = { name: string; bark(): string };

export function speak(pet: Cat | Dog): string {
  throw new Error("TODO");
}

export function toDate(input: Date | string | number): Date {
  throw new Error("TODO");
}

export class HttpError extends Error {
  // TODO
}

export function errorMessage(e: unknown): string {
  throw new Error("TODO");
}

export function statusOf(e: unknown): number {
  throw new Error("TODO");
}
