/**
 * Hari 1 · Soal 02 — Union & Intersection  (★☆☆)
 *
 * TODO:
 *  1. `Id` bisa berupa string ATAU number.
 *  2. `formatId(id)`:
 *       - number -> "#" + angka dengan padding nol sampai 4 digit (7 -> "#0007", 12345 -> "#12345")
 *       - string -> di-trim lalu huruf besar ("  ab-1 " -> "AB-1")
 *  3. `WithId` = { id: string }, `Timestamped` = { createdAt: Date; updatedAt: Date }.
 *     `Message` = gabungan WithId, Timestamped, dan { text: string } (pakai intersection `&`).
 *  4. `touch(message, now)` mengembalikan Message baru dengan `updatedAt = now`.
 *  5. `toArray(input)` menerima string ATAU string[] (perbaiki tipe parameternya)
 *     dan selalu mengembalikan string[].
 */

export type Id = unknown; // TODO

export function formatId(id: Id): string {
  throw new Error("TODO");
}

export type WithId = unknown; // TODO
export type Timestamped = unknown; // TODO
export type Message = unknown; // TODO

export function touch(message: Message, now: Date): Message {
  throw new Error("TODO");
}

export function toArray(input: unknown): string[] {
  throw new Error("TODO");
}
