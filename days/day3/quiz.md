# Quiz Hari 3 — Tipe Lanjutan

1. Implementasikan `Partial<T>` dan `Pick<T, K>` di papan tulis. Kenapa `Pick` butuh `K extends keyof T`?
2. Apa itu *distributive conditional type*? Beri contoh, lalu jelaskan cara mencegahnya.
3. Apa fungsi kata kunci `infer`? Tulis `ReturnType` versi sendiri.
4. Bedanya `Omit<T, K>` dan `Exclude<T, U>`? Kapan memakai masing-masing?
5. Apa itu discriminated union? Bagaimana TypeScript mempersempit tipe di dalam `switch`, dan bagaimana memastikan semua kasus tertangani?
6. Jelaskan key remapping (`as`) di mapped type, dan bagaimana `never` dipakai untuk membuang key.
7. Kenapa `IsNever<never>` dengan implementasi `T extends never ? true : false` menghasilkan `never`?
8. Berikan contoh nyata template literal types di backend/frontend.

---

<br><br><br><br><br><br><br><br><br><br>

## Jawaban

1. `type Partial<T> = { [K in keyof T]?: T[K] }`. `type Pick<T, K extends keyof T> = { [P in K]: T[P] }`. Constraint `K extends keyof T` memastikan setiap K benar-benar key T, sehingga `T[P]` valid dan typo terdeteksi saat compile.
2. Conditional type `T extends U ? X : Y` dengan T *naked type parameter* akan diterapkan pada setiap anggota union lalu hasilnya digabung. Contoh: `ToArray<string | number>` menghasilkan `string[] | number[]`. Cegah dengan membungkus: `[T] extends [U] ? ...`, sehingga hasilnya `(string | number)[]`.
3. `infer` mendeklarasikan variabel tipe baru di sisi `extends` yang akan "diisi" TS lewat pattern matching. `type MyReturnType<F extends (...a: any) => any> = F extends (...a: any) => infer R ? R : never;`
4. `Exclude` bekerja pada **anggota union** (`Exclude<"a" | "b", "a">` menghasilkan `"b"`). `Omit` bekerja pada **properti objek** (`Omit<User, "password">`). Implementasi `Omit` bawaan: `Pick<T, Exclude<keyof T, K>>`.
5. Union beberapa objek yang punya satu properti literal bersama (discriminant, misalnya `type` atau `kind`). Di dalam `switch (x.type)`, setiap `case` mempersempit `x` ke anggota yang sesuai. Untuk exhaustiveness: di `default`, assign `x` ke variabel bertipe `never` atau panggil `assertNever(x)`. Kalau ada kasus baru yang belum ditangani, hasilnya compile error.
6. `[K in keyof T as NewKey]` memungkinkan kita mengganti nama key (misalnya `` `get${Capitalize<K & string>}` ``) atau memfilternya. Kalau ekspresi `as` menghasilkan `never`, key tersebut dihapus dari hasil, misalnya `as T[K] extends Function ? never : K`.
7. `never` diperlakukan sebagai union kosong. Conditional type distributif atas union kosong menghasilkan union kosong, yaitu `never`, tanpa pernah mengevaluasi cabang `true`/`false`. Solusinya `[T] extends [never]`.
8. Contoh: tipe route params di Fastify/Express (`"/users/:id"` menghasilkan `{ id: string }`), nama event handler React (`onClick`), CSS units (`` `${number}px` ``), nama event bertingkat (`` `${Entity}.${Action}` `` seperti `"message.deleted"`), dan key i18n bertipe.
