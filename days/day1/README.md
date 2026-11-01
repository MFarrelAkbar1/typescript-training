# Hari 1 — Fondasi Sistem Tipe

> Target: paham cara TypeScript "berpikir" tentang tipe. Semua materi hari-hari berikutnya dibangun di atas ini.
> Waktu: ±15 menit baca, 3–4 jam latihan.

## 1. Primitives & literal types

```ts
let name: string = "Ana";
let age: number = 22;            // tidak ada int/float, semua number
let active: boolean = true;
let big: bigint = 10n;
let id: symbol = Symbol("id");
let nothing: null = null;
let missing: undefined = undefined;
```

**Literal type** adalah tipe yang hanya berisi satu nilai. Kalau digabung dengan union, hasilnya jadi semacam "enum ringan":

```ts
type Method = "GET" | "POST" | "PUT" | "DELETE";
let m: Method = "GET";  // ok
m = "PATCH";            // ❌ error
```

**Widening**: `let x = "GET"` bertipe `string` (karena bisa diubah), sedangkan `const x = "GET"` bertipe `"GET"`.

## 2. Union (`|`) dan intersection (`&`)

- **Union** `A | B` artinya nilainya *salah satu* dari A atau B. Sebelum narrowing, kamu hanya boleh memakai properti yang dimiliki **semua** anggota union.
- **Intersection** `A & B` artinya nilainya *sekaligus* A dan B, jadi semua propertinya digabung.

```ts
type WithId = { id: string };
type Timestamped = { createdAt: Date };
type Post = WithId & Timestamped & { title: string };

function show(id: string | number) {
  id.toUpperCase();          // ❌ number tidak punya toUpperCase
  if (typeof id === "string") id.toUpperCase(); // ✅ setelah narrowing
}
```

> Intersection dari tipe primitif yang tidak cocok menghasilkan `never`: `string & number` = `never`.

## 3. `type` vs `interface`

| | `type` | `interface` |
|---|---|---|
| Objek | ✅ | ✅ |
| Union / tuple / primitive alias | ✅ | ❌ |
| `extends` | via `&` | ✅ `extends` (pesan error lebih jelas) |
| Declaration merging | ❌ (error "duplicate") | ✅ dua deklarasi digabung |
| Mapped / conditional types | ✅ | ❌ |

```ts
interface User { id: string }
interface User { name: string }   // merging -> User = { id; name }

declare module "fastify" {         // dipakai di Hari 5: menambah properti ke tipe library
  interface FastifyRequest { user: { id: string } }
}
```

**Aturan praktis:** pakai `interface` untuk bentuk objek publik yang mungkin di-extend (dan wajib untuk module augmentation). Pakai `type` untuk union, tuple, dan tipe hasil komputasi. Yang terpenting, **konsisten** di satu codebase.

## 4. Narrowing

TypeScript melacak alur kontrol (*control flow analysis*) untuk mempersempit tipe.

```ts
function f(x: string | number | Date | null) {
  if (x === null) return;              // equality narrowing
  if (typeof x === "string") { }       // typeof: "string" | "number" | "boolean" | "bigint"
                                       //         | "symbol" | "undefined" | "object" | "function"
  if (x instanceof Date) { }           // instanceof: untuk class / constructor
}

type Cat = { meow(): void }; type Dog = { bark(): void };
function speak(p: Cat | Dog) {
  if ("meow" in p) p.meow(); else p.bark();  // `in`: cek keberadaan properti
}
```

### Custom type guard & assertion function

```ts
function isUser(x: unknown): x is User {          // type predicate
  return typeof x === "object" && x !== null && "id" in x;
}

function assertDefined<T>(x: T): asserts x is NonNullable<T> {
  if (x == null) throw new Error("undefined!");
}
```

Type guard adalah **janji** kamu ke compiler. Kalau logikanya salah, compiler tetap percaya, jadi tulis dan uji dengan teliti.

## 5. `unknown` vs `any` vs `never`

- **`any`**: mematikan type checker. Semua operasi diizinkan, dan sifatnya "menular" ke variabel lain. Hindari.
- **`unknown`**: "aku belum tahu tipenya". Nilai apa pun boleh di-assign ke `unknown`, tapi kamu **wajib narrowing** sebelum memakainya. Cocok untuk input luar: `JSON.parse`, `catch (e)`, body request.
- **`never`**: tipe tanpa nilai. Muncul di fungsi yang selalu `throw`, di union yang sudah habis dipersempit, dan di intersection yang mustahil.

```ts
function assertNever(x: never): never { throw new Error(`Unhandled: ${x}`); }

type Status = "active" | "deleted";
function label(s: Status) {
  switch (s) {
    case "active": return "A";
    case "deleted": return "D";
    default: return assertNever(s); // kalau Status ditambah "banned", baris ini ERROR
  }
}
```

## 6. `tsconfig` strict dan artinya

`"strict": true` menyalakan sekumpulan flag sekaligus:

| Flag | Efek |
|---|---|
| `noImplicitAny` | parameter tanpa tipe = error (tidak diam-diam jadi `any`) |
| `strictNullChecks` | `null`/`undefined` bukan anggota semua tipe, jadi wajib dicek |
| `strictFunctionTypes` | parameter fungsi dicek secara contravariant |
| `strictPropertyInitialization` | properti class wajib diinisialisasi |
| `strictBindCallApply` | `bind/call/apply` dicek tipenya |
| `useUnknownInCatchVariables` | `catch (e)` bertipe `unknown`, bukan `any` |
| `alwaysStrict` | emit `"use strict"` |
| `noImplicitThis` | `this` tanpa tipe = error |

Repo ini juga menyalakan:
- `noUncheckedIndexedAccess`: `arr[0]` dan `record[key]` bertipe `T | undefined`. Ini sangat menyelamatkan.
- `verbatimModuleSyntax`: import yang hanya berisi tipe wajib ditulis `import type`.

## Kesalahan umum

1. `typeof null === "object"`, jadi cek `null` dulu sebelum `typeof x === "object"`.
2. Memakai `as` untuk "membungkam" error. `as` tidak mengubah nilai di runtime, ia hanya membohongi compiler.
3. `any` di `catch (e: any)`. Pakai `unknown`, lalu `e instanceof Error`.
4. Menganggap type guard otomatis benar. Return `x is User` dengan logika yang salah sama bahayanya dengan `as`.
5. Lupa bahwa tipe hilang di runtime. Data dari API/JSON **harus divalidasi** (Hari 4: zod).

## Latihan

| No | Soal | Level |
|---|---|---|
| 01 | primitives-literal | ★☆☆ |
| 02 | union-intersection | ★☆☆ |
| 03 | type-vs-interface | ★★☆ |
| 04 | narrowing-typeof | ★★☆ |
| 05 | narrowing-in-instanceof | ★★☆ |
| 06 | custom-type-guard | ★★☆ |
| 07 | unknown-never | ★★☆ |
| 08 | strict-mode-fixes | ★★★ |

```bash
npm run test:day1            # semua soal hari 1
npm run test:ex -- day1/exercises/03    # hanya soal 03
npm run test:watch -- day1/exercises/03 # mode watch saat mengerjakan
```

Setiap test dijalankan **dua kali**: sekali di runtime (`expect`) dan sekali di typecheck (`expectTypeOf`). Soal dianggap selesai kalau keduanya hijau. Setelah itu kerjakan `quiz.md`.
