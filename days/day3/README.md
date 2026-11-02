# Hari 3 — Tipe Lanjutan

> Target: bisa **membaca** dan **menulis** type-level code: utility types, mapped types, conditional types, `infer`, dan template literal types.
> Ini topik favorit interviewer untuk menguji "seberapa dalam" pemahaman TypeScript kandidat.

## 1. Utility types bawaan

| Utility | Hasil |
|---|---|
| `Partial<T>` | semua properti opsional |
| `Required<T>` | semua properti wajib |
| `Readonly<T>` | semua properti readonly |
| `Pick<T, K>` | hanya properti K |
| `Omit<T, K>` | semua kecuali K |
| `Record<K, V>` | objek dengan key K, value V |
| `Exclude<U, X>` / `Extract<U, X>` | filter anggota union |
| `NonNullable<T>` | buang `null`/`undefined` |
| `ReturnType<F>` / `Parameters<F>` | tipe return / tuple parameter |
| `Awaited<T>` | unwrap Promise (rekursif) |

Pola sehari-hari: **satu entity, banyak turunan**.

```ts
type PublicUser = Omit<User, "passwordHash">;
type CreateUserInput = Omit<User, "id" | "createdAt"> & { password: string };
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;
type Result = Awaited<ReturnType<typeof fetchUser>>;
```

## 2. Mapped types

"Loop" atas key sebuah tipe.

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
type Mutable<T>   = { -readonly [K in keyof T]: T[K] };   // `-` menghapus modifier
type Concrete<T>  = { [K in keyof T]-?: T[K] };
```

Mapped type berbentuk `[K in keyof T]` disebut **homomorphic**: modifier `?` dan `readonly` dari T **dipertahankan**.

### Key remapping dengan `as`

```ts
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] }; // `never` = buang key
```

## 3. Conditional types

```ts
type IsString<T> = T extends string ? true : false;
```

**Distributive**: kalau T adalah *naked type parameter* dan diisi union, kondisinya dijalankan **per anggota**:

```ts
type ToArray<T> = T extends unknown ? T[] : never;
ToArray<string | number>          // string[] | number[]

type ToArrayND<T> = [T] extends [unknown] ? T[] : never;  // bungkus tuple = tidak distributif
ToArrayND<string | number>        // (string | number)[]
```

Inilah cara kerja `Exclude<T, U> = T extends U ? never : T`.

> Jebakan: `never` adalah union kosong, sehingga `IsX<never>` yang distributif menghasilkan `never`, bukan `true`/`false`. Gunakan `[T] extends [never]`.

## 4. `infer`

Mendeklarasikan variabel tipe **di dalam** klausa `extends` untuk "menangkap" sebagian tipe.

```ts
type MyReturnType<F> = F extends (...args: any) => infer R ? R : never;
type ElementOf<T>    = T extends readonly (infer E)[] ? E : never;
type UnwrapPromise<T> = T extends Promise<infer V> ? UnwrapPromise<V> : T;  // rekursif
type Head<T>          = T extends [infer H, ...unknown[]] ? H : never;
```

## 5. Template literal types

```ts
type Method = "get" | "post";
type Handler = `on${Capitalize<Method>}`;     // "onGet" | "onPost"
type Px = `${number}px`;                       // "10px", "1.5px", ...

// parsing string di level tipe!
type Param<P> = P extends `${string}:${infer Name}/${infer Rest}`
  ? Name | Param<`/${Rest}`>
  : P extends `${string}:${infer Name}` ? Name : never;
Param<"/rooms/:roomId/messages/:id">   // "roomId" | "id"
```

Intrinsic: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. Pola ini dipakai Fastify/Express types untuk menebak `request.params`.

## 6. Discriminated union + exhaustiveness

```ts
type Event =
  | { type: "message.sent"; text: string }
  | { type: "message.deleted"; messageId: string };

function handle(e: Event) {
  switch (e.type) {                     // `type` = discriminant (literal type)
    case "message.sent":    return e.text;        // e dipersempit otomatis
    case "message.deleted": return e.messageId;
    default: {
      const _exhaustive: never = e;     // ERROR jika ada case terlewat
      return _exhaustive;
    }
  }
}

type EventOf<T extends Event["type"]> = Extract<Event, { type: T }>;
```

Pola ini akan kamu pakai untuk **protokol WebSocket** (Hari 6), **action reducer** di React, dan **audit log action** (Hari 5).

## Kesalahan umum

1. **Type-level code yang terlalu "pintar".** Kalau rekan tim tidak bisa membacanya, itu utang teknis. Pakai seperlunya.
2. **Lupa sifat distributif.** Hasil aneh pada union atau `never` biasanya berasal dari sini.
3. **`Omit` tidak "type-safe" pada K.** `Omit<User, "typo">` tidak error karena K hanya `PropertyKey`. Ini disengaja oleh TS.
4. **`{} ` bukan "objek kosong"**, melainkan "apa pun selain null/undefined". Untuk objek tanpa properti gunakan `Record<string, never>`.
5. **Membandingkan intersection dengan objek**: `A & B` dan `{...A, ...B}` setara secara assignability, tapi tidak identik di tooling. Gunakan helper `Simplify<T> = { [K in keyof T]: T[K] } & {}` untuk merapikan.

## Latihan

| No | Soal | Level |
|---|---|---|
| 01 | utility-types-usage | ★☆☆ |
| 02 | returntype-awaited | ★☆☆ |
| 03 | implement-basic-utils (MyPartial, MyPick, ...) | ★★☆ |
| 04 | implement-exclude-omit | ★★☆ |
| 05 | conditional-types | ★★☆ |
| 06 | infer | ★★★ |
| 07 | template-literal | ★★★ |
| 08 | mapped-key-remapping | ★★★ |
| 09 | discriminated-union | ★★★ |
| 10 | deep-utils (DeepPartial, Paths, Get) | ★★★ |

```bash
npm run test:day3
```

Tips debugging tipe: hover di editor, atau tulis `type _Debug = MyType<X>;` lalu hover `_Debug`.
