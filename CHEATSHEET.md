# Cheatsheet TypeScript Fullstack

Diisi bertahap per hari. Bagian **Catatanku** untuk tambahanmu sendiri: tulis pola yang kamu temukan saat mengerjakan soal.

---

## Hari 1 — Fondasi

```ts
type Method = "GET" | "POST";                 // literal union
type Post = WithId & Timestamped & { title: string }; // intersection
interface User { id: string } interface User { name: string } // declaration merging

typeof x === "string"   x instanceof Date   "key" in obj   x === null   // narrowing
function isUser(x: unknown): x is User { ... }                         // type predicate
function assertUser(x: unknown): asserts x is User { ... }             // assertion function
function assertNever(x: never): never { throw new Error(String(x)); }  // exhaustiveness

let a: unknown = JSON.parse(s);   // wajib narrowing sebelum dipakai
```
Flag penting: `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`.

**Catatanku:**
-

## Hari 2 — Fungsi & Generics

```ts
type Fn = (a: number, b: number) => number;
type Callable = { (x: string): string; prop: number };    // call signature + properti
function f(a: string, b?: string, ...rest: number[]) {}
function p(x: string): Date; function p(y: number, m: number, d: number): Date; function p(...) {} // overload

function first<T>(xs: readonly T[]): T | undefined
function get<T, K extends keyof T>(o: T, k: K): T[K]
function merge<A extends object, B extends object>(a: A, b: B): A & B

const ROLES = ["admin", "member"] as const; type Role = (typeof ROLES)[number];
const S = { OK: 200 } as const; type Code = (typeof S)[keyof typeof S];
```

**Catatanku:**
-

## Hari 3 — Tipe Lanjutan

```ts
Partial<T> Required<T> Readonly<T> Pick<T,K> Omit<T,K> Record<K,V>
Exclude<U,X> Extract<U,X> NonNullable<T> ReturnType<F> Parameters<F> Awaited<T>

type Mapped<T> = { readonly [K in keyof T]?: T[K] };        // -readonly / -? untuk menghapus
type Remap<T>  = { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] };
type Filter<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };

type Cond<T> = T extends string ? "s" : "x";                // distributif pada union
type NoDist<T> = [T] extends [string] ? "s" : "x";
type Ret<F> = F extends (...a: any) => infer R ? R : never; // infer
type Param<P> = P extends `${string}:${infer N}/${infer R}` ? N | Param<`/${R}`> : P extends `${string}:${infer N}` ? N : never;

type EventOf<T extends E["type"]> = Extract<E, { type: T }>;
```

**Catatanku:**
-

## Hari 4 — Node.js

```ts
await Promise.all(xs.map(f))        // paralel, fail-fast
await Promise.allSettled(ps)        // tunggu semua
await Promise.race([p, timeout])    // timeout
try { return await p } catch (e: unknown) { e instanceof Error ? e.message : String(e) }

class AppError extends Error { constructor(m: string, readonly code: string, o?: ErrorOptions) { super(m, o); this.name = new.target.name; } }
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

const S = z.object({ email: z.email(), age: z.coerce.number().int().default(18) });
type Out = z.infer<typeof S>; type In = z.input<typeof S>;
S.safeParse(data)  // { success, data } | { success: false, error }

import.meta.dirname                         // __dirname di ESM (Node ≥ 20.11)
const mod: unknown = await import(spec)     // dynamic import
const env = EnvSchema.parse(process.env)    // fail fast saat startup
```

**Catatanku:**
-

## Hari 5 — Backend

```ts
const app = Fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler); app.setSerializerCompiler(serializerCompiler);
app.post("/x", { schema: { body: B, params: P, querystring: Q, response: { 201: R } }, onRequest: [app.authenticate] }, h);

declare module "fastify" { interface FastifyInstance { authenticate: Hook } }
declare module "@fastify/jwt" { interface FastifyJWT { payload: {...}; user: {...} } }
export default fp(plugin)                      // buka encapsulation

const PERMS = { "a:b": ["admin"] } as const satisfies Record<string, readonly Role[]>;

interface T { id: Generated<string>; deleted_at: ColumnType<Date | null, Date | null | undefined, Date | null> }
db.selectFrom("t").innerJoin("u", "u.id", "t.u_id").select(["t.id", "u.name as author"]).where("t.x", "=", v).execute()
db.insertInto("t").values({...}).returningAll().executeTakeFirstOrThrow()
.onConflict((oc) => oc.columns(["a", "b"]).doNothing())
fn.count<number>("id").as("total")             // pg mengembalikan bigint sebagai string!
```

**Catatanku:**
-

## Hari 6 — Realtime & React

```ts
app.get("/ws", { websocket: true }, (socket, req) => { socket.on("message", ...); socket.on("close", ...); });
await app.injectWS("/ws", {}, { onInit: (ws) => ws.on("message", ...) });

type Props = ComponentProps<"button"> & { variant?: "a" | "b" };
function List<T>({ items, render }: { items: T[]; render: (t: T) => ReactNode }) {}
useState<User | null>(null)   useReducer(reducer, init)   return [v, set] as const
(e: ChangeEvent<HTMLInputElement>) (e: FormEvent<HTMLFormElement>) (e: KeyboardEvent<HTMLTextAreaElement>)
useEffect(() => { const c = new AbortController(); ...; return () => c.abort(); }, [url]);
```

**Catatanku:**
-

## Hari 7 — Testing & CI

```ts
vi.fn(() => x)  vi.spyOn(o, "m")  fn.mockResolvedValueOnce(v)  expect(fn).toHaveBeenCalledWith(...)
vi.useFakeTimers(); vi.advanceTimersByTime(ms); vi.setSystemTime(d); vi.useRealTimers();
await expect(p).rejects.toThrow("x")             // JANGAN lupa await
expectTypeOf(f).returns.toEqualTypeOf<X>()  expectTypeOf<A>().toExtend<B>()
const res = await app.inject({ method: "POST", url, headers, payload }); res.statusCode; res.json();
```
```yaml
services: { postgres: { image: postgres:16-alpine, ports: ["5433:5432"], options: --health-cmd "pg_isready" } }
steps: [checkout@v4, setup-node@v4 (cache npm), npm ci, npm run typecheck, npm run test:project]
```

**Catatanku:**
-
