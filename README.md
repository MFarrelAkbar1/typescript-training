# ts-training — Program Intensif TypeScript 7 Hari

Persiapan interview & magang **Software Engineer Fullstack TypeScript** (Node.js + Fastify, React, PostgreSQL, REST + WebSocket, testing, CI, auth/RBAC/audit).

## Setup

Prasyarat: **Node.js ≥ 20.12**, **Docker Desktop** (untuk Hari 5–7).

```bash
npm install
npm run typecheck          # harus bersih
npm run test:day1          # awalnya MERAH semua — tugasmu membuatnya hijau
```

## Jadwal (4–6 jam/hari)

| Hari | Topik | Materi | Mini project |
|---|---|---|---|
| 1 | Fondasi tipe: literal, union/intersection, type vs interface, narrowing, unknown/never, strict | [days/day1](days/day1/README.md) | — |
| 2 | Fungsi & generics: overload, constraint, keyof/typeof, indexed access, readonly/as const | [days/day2](days/day2/README.md) | — |
| 3 | Tipe lanjutan: utility, mapped, conditional, infer, template literal, discriminated union | [days/day3](days/day3/README.md) | — |
| 4 | TS di Node: Promise, error class, Result, zod, ESM, env | [days/day4](days/day4/README.md) | — |
| 5 | Fastify, JWT, RBAC, PostgreSQL + Kysely, audit log | [days/day5](days/day5/README.md) | tahap 1: backend |
| 6 | WebSocket, React + TS, tipe bersama BE/FE | [days/day6](days/day6/README.md) | tahap 2: realtime + UI |
| 7 | Unit/integration test, CI, review, simulasi interview | [days/day7](days/day7/README.md) | tahap 3: test + CI |

Alur tiap hari: baca `README.md` (±15 menit) → kerjakan `exercises/` berurutan → jawab `quiz.md` → centang `PROGRESS.md` → tambahkan catatanmu ke `CHEATSHEET.md`.

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run test:day1` … `test:day7` | test soal hari tsb (runtime **dan** type-level) |
| `npm run test:ex -- day3/exercises/06` | test satu soal |
| `npm run test:watch -- day3/exercises/06` | mode watch saat mengerjakan |
| `npm run test:project` | test mini project (butuh `npm run db:up`) |
| `npm run test:solutions` | test yang sama terhadap folder `solutions/` (sanity check repo) |
| `npm run typecheck` | `tsc --noEmit` untuk solutions + test + infrastruktur |
| `npm run db:up` / `db:down` | PostgreSQL dev (port 5434) & test (port 5433) |
| `npm run dev:server` / `dev:web` | jalankan mini project |

## Cara kerja test

- Test meng-import soal lewat alias `@ex/dayN/<file>`. Konfigurasi biasa mengarah ke `days/dayN/exercises/`, sedangkan `test:solutions` mengarah ke `solutions/dayN/`.
- Setiap file test dijalankan **dua kali**: runtime (`expect`) dan typecheck (`expectTypeOf`, `@ts-expect-error`). Soal selesai jika keduanya hijau.
- Jangan mengubah file `*.test.ts`, `note-repository.contract.ts`, `fixtures/`, atau `project/test/`.

## Aturan belajar bersama mentor

1. Minta bantuan → kamu dapat **petunjuk bertingkat**: petunjuk 1 (arah) → petunjuk 2 (konsep) → petunjuk 3 (potongan kode parsial). Solusi lengkap hanya jika kamu bilang **"kasih solusinya"**.
2. Bilang **"cek day N"** → mentor menjalankan test hari itu, menjelaskan yang gagal, dan me-review kodemu.
3. Folder `solutions/` ada untuk verifikasi repo. **Jangan dibuka** sebelum berjuang sendiri.

## Struktur

```
days/dayN/          README.md · quiz.md · exercises/*.ts + *.test.ts
solutions/          solusi semua soal + solutions/project (implementasi referensi)
project/            kerangka mini project (shared/, server/, web/, test/)
PROGRESS.md         checklist yang kamu centang sendiri
CHEATSHEET.md       ringkasan sintaks & pola
INTERVIEW.md        30 pertanyaan interview + poin jawaban
```
