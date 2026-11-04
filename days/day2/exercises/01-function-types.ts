/**
 * Hari 2 · Soal 01 — Function Types  (★☆☆)
 *
 * TODO:
 *  1. `BinaryOp` adalah tipe fungsi yang menerima dua number dan mengembalikan number.
 *  2. `applyOp(op, a, b)` -> memanggil op dengan a dan b.
 *  3. `NumFn` adalah tipe fungsi (x: number) => number.
 *     `compose(f, g)` -> fungsi baru x => f(g(x)).
 *  4. `once(fn)` -> mengembalikan fungsi yang hanya memanggil `fn` SEKALI;
 *     panggilan berikutnya mengembalikan hasil pertama (cache).
 *  5. `Logger` adalah tipe yang BISA DIPANGGIL `(msg: string) => string` sekaligus punya
 *     properti `prefix: string`. `createLogger("api")` mengembalikan Logger, di mana
 *     `logger("halo")` mengembalikan "[api] halo" dan `logger.prefix === "api"`.
 */

export type BinaryOp = unknown; // TODO

export function applyOp(op: BinaryOp, a: number, b: number): number {
  throw new Error("TODO");
}

export type NumFn = unknown; // TODO

export function compose(f: NumFn, g: NumFn): NumFn {
  throw new Error("TODO");
}

export function once(fn: () => number): () => number {
  throw new Error("TODO");
}

export type Logger = unknown; // TODO

export function createLogger(prefix: string): Logger {
  throw new Error("TODO");
}
