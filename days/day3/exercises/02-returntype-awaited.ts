/**
 * Hari 3 · Soal 02 — ReturnType, Parameters, Awaited  (★☆☆)
 *
 * Kadang tipe sebuah fungsi (misalnya dari library atau kode lama) tidak diekspor.
 * Turunkan tipe-tipe di bawah dari fungsi yang sudah ada. JANGAN tulis ulang manual.
 *
 * TODO:
 *  1. `FetchUserPromise` -> tipe kembalian fetchUser (masih Promise).
 *  2. `FetchUserResult`  -> isi Promise dari fetchUser (sudah di-unwrap).
 *  3. `FetchUserParams`  -> tuple parameter fetchUser.
 *  4. `Store`            -> tipe objek yang dikembalikan createStore.
 *  5. `loadAll(ids, fetcher)` -> panggil fetcher untuk SEMUA id secara paralel,
 *     kembalikan array hasil sesuai urutan ids.
 */

export async function fetchUser(id: string, opts?: { includeRoles: boolean }) {
  return {
    id,
    name: `user-${id}`,
    roles: opts?.includeRoles ? ["member"] : [],
  };
}

export function createStore() {
  const items: string[] = [];
  return {
    items,
    add(item: string) {
      items.push(item);
      return items.length;
    },
  };
}

export type FetchUserPromise = unknown; // TODO
export type FetchUserResult = unknown; // TODO
export type FetchUserParams = unknown; // TODO
export type Store = unknown; // TODO

export function loadAll(ids: string[], fetcher: typeof fetchUser): Promise<FetchUserResult[]> {
  throw new Error("TODO");
}
