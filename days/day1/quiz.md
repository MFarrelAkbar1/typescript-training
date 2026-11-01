# Quiz Hari 1 — Fondasi Tipe

Jawab dengan kata-katamu sendiri (lisan atau tulis) **sebelum** membaca bagian jawaban. Bayangkan sedang di depan interviewer.

1. Apa perbedaan `unknown` dan `any`? Kapan kamu memakai masing-masing?
2. Jelaskan kapan memilih `interface` dan kapan memilih `type`. Sebutkan satu hal yang hanya bisa dilakukan `interface` dan satu hal yang hanya bisa dilakukan `type`.
3. Apa itu narrowing? Sebutkan minimal 4 cara melakukan narrowing di TypeScript.
4. Apa itu tipe `never`, dan bagaimana ia dipakai untuk *exhaustiveness checking*?
5. Apa yang terjadi jika `strictNullChecks` dimatikan? Beri contoh bug yang bisa lolos.
6. Apa bedanya `x is User` (type predicate) dengan `x as User` (type assertion)? Mana yang lebih aman, dan kenapa keduanya tetap bisa "berbohong"?
7. Kenapa `let a = "GET"` bertipe `string`, sedangkan `const a = "GET"` bertipe `"GET"`?
8. Apa efek `noUncheckedIndexedAccess`, dan kenapa banyak tim menyalakannya?

---

<br><br><br><br><br><br><br><br><br><br>

## Jawaban

1. **unknown vs any**: keduanya bisa menampung nilai apa pun. `any` mematikan pengecekan, sehingga operasi apa pun diizinkan dan sifatnya "menular". `unknown` memaksa narrowing sebelum dipakai. Pakai `unknown` untuk data dari luar (JSON, request body, `catch`). `any` hanya untuk migrasi JS ke TS atau situasi darurat yang sangat terbatas.
2. **interface vs type**: `interface` bisa declaration merging (penting untuk module augmentation library, misalnya `FastifyRequest`) dan pesan error `extends`-nya lebih jelas. `type` bisa merepresentasikan union, tuple, primitive alias, mapped type, dan conditional type. Untuk bentuk objek keduanya hampir setara, yang penting konsisten.
3. **Narrowing** adalah proses mempersempit tipe berdasarkan alur kontrol. Caranya: `typeof`, `instanceof`, `in`, equality (`=== null`), truthiness (`if (x)`), discriminated union (`switch (x.kind)`), custom type guard (`x is T`), dan assertion function (`asserts x is T`).
4. **never** adalah tipe tanpa nilai (bottom type). Untuk exhaustiveness checking: di `default` sebuah `switch`, assign variabel ke `never` atau panggil `assertNever(x)`. Kalau ada anggota union yang belum ditangani, tipenya bukan `never` sehingga compiler memberi error. Bug ditemukan saat compile, bukan di production.
5. **Tanpa strictNullChecks**, `null` dan `undefined` bisa di-assign ke semua tipe. Contoh: `users.find(...).name` lolos compile padahal `find` bisa mengembalikan `undefined`, sehingga muncul `TypeError: Cannot read properties of undefined` di runtime.
6. **Predicate vs assertion**: `x is User` adalah fungsi yang *memeriksa* di runtime lalu memberi tahu compiler hasilnya. `as User` tidak memeriksa apa pun, hanya memaksa compiler percaya. Predicate lebih aman karena ada logika runtime-nya, tapi keduanya bisa salah. Predicate yang logikanya keliru tetap dipercaya compiler.
7. **Widening**: `let` bisa di-reassign, jadi TS melebarkan literal ke tipe umumnya (`string`). `const` tidak bisa di-reassign, jadi tipenya tetap literal. Untuk objek dan array, gunakan `as const` agar propertinya juga tidak di-widen (Hari 2).
8. **noUncheckedIndexedAccess**: akses lewat index (`arr[i]`, `record[key]`) bertipe `T | undefined`. Index di luar batas dan key yang tidak ada adalah sumber bug yang sangat umum. Flag ini memaksa kita menanganinya dengan `??`, optional chaining, atau pengecekan.
