/**
 * Hari 1 · Soal 04 — Narrowing dengan typeof  (★★☆)
 *
 * TODO:
 *  1. `formatValue(value)`:
 *       - string     -> dibungkus tanda kutip ganda: "halo" -> `"halo"`
 *       - number     -> 2 angka desimal: 3.14159 -> "3.14"
 *       - boolean    -> "yes" / "no"
 *       - null       -> "null"
 *       - undefined  -> "-"
 *       - function   -> panggil, lalu kembalikan hasilnya
 *  2. `padLeft(text, padding)`:
 *       - padding number -> tambahkan sejumlah spasi di kiri
 *       - padding string -> tempelkan string itu di kiri
 */

export type Formattable = string | number | boolean | null | undefined | (() => string);

export function formatValue(value: Formattable): string {
  throw new Error("TODO");
}

export function padLeft(text: string, padding: string | number): string {
  throw new Error("TODO");
}
