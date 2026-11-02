# 30 Pertanyaan Interview — Magang Software Engineer Fullstack TypeScript

Cara latihan: baca pertanyaan, jawab **lisan** maksimal 2 menit, lalu bandingkan dengan poin jawaban. Poin di bawah adalah kerangka, bukan untuk dihafal kata per kata.

---

## TypeScript (1–10)

**1. Apa itu TypeScript dan apa manfaatnya dibanding JavaScript?**
- Superset JS dengan static typing yang dicek saat compile, lalu tipe dihapus (*type erasure*) menjadi JS biasa.
- Bug tertangkap lebih awal, refactor lebih aman, autocomplete dan dokumentasi hidup di editor.
- Tipe tidak memvalidasi data di runtime, jadi data luar tetap perlu divalidasi (zod).

**2. `type` vs `interface`?**
- Keduanya bisa mendeskripsikan objek. `interface` mendukung declaration merging dan `extends`. `type` mendukung union, tuple, mapped type, dan conditional type.
- Module augmentation library (Fastify, JWT) **harus** memakai interface. Yang penting konsisten dalam tim.

**3. `any` vs `unknown` vs `never`?**
- `any` mematikan type checking dan sifatnya menular. `unknown` aman karena wajib narrowing sebelum dipakai (cocok untuk JSON/`catch`).
- `never` adalah tipe tanpa nilai: fungsi yang selalu throw, cabang mustahil, dan exhaustiveness check.

**4. Jelaskan narrowing dan type guard.**
- Control flow analysis mempersempit union lewat `typeof`, `instanceof`, `in`, equality, truthiness, dan discriminant.
- Custom guard `x is T` dan assertion function `asserts x is T`. Keduanya adalah "janji" yang harus benar.

**5. Apa itu generics? Beri contoh constraint.**
- Parameter tipe yang mempertahankan hubungan input dan output. `function getProp<T, K extends keyof T>(o: T, k: K): T[K]`.
- Constraint membatasi T, dan tipe asli tetap dipertahankan di output.

**6. Sebutkan utility types yang sering kamu pakai dan contoh nyatanya.**
- `Partial` untuk DTO update, `Pick`/`Omit` untuk public user tanpa `passwordHash`, `Record<Role, ...>`, `ReturnType`/`Awaited` untuk tipe hasil fungsi async, `NonNullable`.

**7. Implementasikan `Omit` sendiri.**
- `type MyOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] }`, atau `Pick<T, Exclude<keyof T, K>>`.
- Jelaskan mapped type, key remapping, dan `never` untuk membuang key.

**8. Apa itu conditional type yang distributif?**
- `T extends U ? X : Y` dengan T naked diterapkan ke setiap anggota union (begitulah cara kerja `Exclude`).
- Cegah distribusi dengan `[T] extends [U]`. Ingat juga jebakan `never`.

**9. Apa itu discriminated union dan exhaustiveness check?**
- Union objek dengan properti literal bersama (`type`). `switch` mempersempit tipe per case, dan di `default` assign ke `never`.
- Dipakai untuk action reducer, protokol WebSocket, dan event audit.

**10. Apa yang dilakukan `strict: true`? Sebutkan 3 flag di dalamnya.**
- `strictNullChecks`, `noImplicitAny`, `strictPropertyInitialization`, `strictFunctionTypes`, `useUnknownInCatchVariables`, dan lainnya.
- Tambahan yang bagus: `noUncheckedIndexedAccess`.

## Node.js & Backend (11–18)

**11. Jelaskan event loop Node.js.**
- Single thread JS, I/O non-blocking melalui libuv. Fase: timers, pending callbacks, poll, check (`setImmediate`), close.
- Microtask (Promise, `queueMicrotask`) dijalankan setelah setiap macrotask. CPU-bound berat memblokir semua request, jadi pakai worker threads.

**12. `Promise.all` vs `allSettled` vs `race` vs `any`?**
- `all` fail-fast, `allSettled` menunggu semua, `race` mengambil yang pertama settle (timeout), `any` mengambil sukses pertama.
- Paralel vs serial: `await` di dalam loop berjalan serial.

**13. Bagaimana kamu menangani error di aplikasi Node/Fastify?**
- Hierarki custom error (`AppError` dengan `code` dan `statusCode`), satu `setErrorHandler` terpusat, format response konsisten.
- Jangan membocorkan detail internal (log saja di server), dan tangani `unhandledRejection`.
- Pola Result untuk error domain yang memang diharapkan.

**14. Kenapa Fastify? Jelaskan plugin & encapsulation.**
- Performa tinggi (serializer berbasis schema), sistem plugin, hooks lifecycle, typing bagus, `inject` untuk test.
- `register` membuat child context. `fastify-plugin` membuka encapsulation untuk decorator lintas aplikasi.

**15. Jelaskan REST yang baik: status code & idempotency.**
- 200/201/204, 400 validasi, 401 belum login, 403 tidak berhak, 404, 409 conflict, 422, 500.
- GET/PUT/DELETE idempotent, POST tidak. Gunakan nama resource berbentuk kata benda, pagination, dan versioning.

**16. Bagaimana JWT bekerja dan apa risikonya?**
- header.payload.signature, di-sign (HS256/RS256), stateless. Klaim `sub`, `exp`.
- Risiko: tidak bisa dicabut sebelum expired (solusinya umur pendek + refresh token/denylist), payload terbaca siapa saja, dan secret yang lemah.
- Simpan di cookie httpOnly (perlu proteksi CSRF) atau di memori (rentan XSS jika di localStorage).

**17. Bagaimana mendesain RBAC?**
- Matriks role → permission di satu tempat. Cek permission di service layer (bukan hanya di route) dan tambahkan pengecekan kepemilikan untuk "edit milik sendiri".
- 401 vs 403. Catat aksi sensitif di audit log.

**18. WebSocket: bagaimana auth, broadcast per room, dan scaling?**
- Auth saat handshake (token atau cookie) atau lewat pesan pertama. Simpan `Map<roomId, Set<socket>>`, lalu bersihkan saat close.
- Simpan pesan ke DB dulu, baru broadcast. Untuk banyak instance butuh pub/sub (Redis/NOTIFY). Pertimbangkan juga heartbeat/ping.

## PostgreSQL (19–23)

**19. Jelaskan jenis JOIN dan kapan memakainya.**
- INNER (hanya yang cocok), LEFT (semua dari kiri, sisi kanan NULL jika tidak ada), RIGHT, FULL, CROSS.
- Contoh: pesan + username author memakai INNER JOIN users.

**20. Apa itu index, kapan membantu, dan kapan merugikan?**
- Struktur (B-tree default) untuk mempercepat WHERE/ORDER BY/JOIN. Index komposit `(room_id, created_at desc)` untuk "pesan terbaru di room".
- Kerugiannya: menulis jadi lebih lambat dan butuh storage. Gunakan `EXPLAIN ANALYZE` untuk verifikasi.

**21. Apa itu transaksi dan ACID? Beri contoh kapan wajib.**
- Atomicity, Consistency, Isolation, Durability. `BEGIN … COMMIT/ROLLBACK`.
- Contoh: membuat room + menambahkan creator sebagai member + menulis audit dalam satu transaksi. Sebutkan juga isolation level (Read Committed default).

**22. Kenapa memakai migrasi? Bagaimana alurnya di tim?**
- Perubahan schema yang terversi, bisa diulang, dan di-review. File berurutan `up`/`down` yang tercatat di tabel migrasi.
- Jangan edit migrasi yang sudah jalan. Untuk zero-downtime: tambah kolom nullable → backfill → constraint.

**23. Apa itu N+1 query problem dan cara mengatasinya?**
- 1 query daftar + N query detail di dalam loop. Solusi: JOIN, `WHERE id IN (...)`, batching/DataLoader, atau eager loading di ORM.

## React (24–26)

**24. Bagaimana kamu memberi tipe pada props, state, dan event di React?**
- `type Props = {...}`, `ComponentProps<"button">` untuk meneruskan atribut, props discriminated union, komponen generic `List<T>`.
- `useState<T | null>(null)`, `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`.

**25. `useEffect`: dependency array, cleanup, dan kesalahan umum.**
- Effect jalan setelah render dan dijalankan ulang jika dependency berubah. Cleanup dipakai untuk abort fetch, clear interval, dan menutup socket.
- Kesalahan umum: dependency kurang (stale closure), race condition, effect untuk hal yang bisa dihitung saat render. StrictMode menjalankan effect 2x saat dev.

**26. Kapan memakai `useReducer`, context, atau state management library?**
- `useReducer` untuk transisi kompleks dan logika yang bisa diuji. Context untuk data global yang jarang berubah (auth, tema).
- Library/server-state (TanStack Query, Zustand) untuk cache data server dan state yang dibagi banyak komponen. Hindari prop drilling yang berlebihan.

## Testing & CI (27–29)

**27. Unit vs integration vs E2E? Bagaimana strategi testing untuk API?**
- Piramida test. Unit untuk service/logika murni dengan fake. Integration untuk route + DB nyata via `fastify.inject`. E2E sedikit saja untuk alur kritis.
- Test perilaku, bukan implementasi.

**28. Bagaimana membuat kode mudah dites?**
- Dependency injection (repo, clock, mailer), app factory `buildApp(deps)` tanpa `listen`, fungsi murni, dan batas I/O yang jelas.
- Fake timers untuk waktu, contract test untuk fake vs implementasi asli.

**29. Apa isi pipeline CI yang baik?**
- `npm ci` → lint → typecheck → unit → integration (service Postgres) → build. Pakai cache dependency dan fail fast.
- Wajib hijau sebelum merge (branch protection). Secret lewat GitHub Secrets.

## Umum / Behavioral (30)

**30. Ceritakan proyek yang kamu banggakan (gunakan mini project chat ini).**
- Pakai metode STAR: konteks, tugas, aksi, hasil.
- Poin teknis: kontrak tipe bersama BE/FE, validasi zod, RBAC berbasis permission, audit log + soft delete, WebSocket hub, integration test dengan Postgres nyata, dan CI.
- Ceritakan juga trade-off (Kysely vs ORM, token di query string), kendala yang dihadapi beserta cara mengatasinya, dan apa yang akan diperbaiki (pub/sub untuk scaling, refresh token, rate limiting).
