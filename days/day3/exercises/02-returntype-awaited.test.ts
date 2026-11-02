import { describe, it, expect, expectTypeOf } from "vitest";
import {
  fetchUser,
  loadAll,
  type FetchUserPromise,
  type FetchUserResult,
  type FetchUserParams,
  type Store,
} from "@ex/day3/02-returntype-awaited";

type Expected = { id: string; name: string; roles: string[] };

describe("02 ReturnType, Parameters, Awaited", () => {
  it("FetchUserPromise & FetchUserResult", () => {
    expectTypeOf<FetchUserPromise>().toEqualTypeOf<Promise<Expected>>();
    expectTypeOf<FetchUserResult>().toEqualTypeOf<Expected>();
  });

  it("FetchUserParams", () => {
    expectTypeOf<FetchUserParams>().toEqualTypeOf<[id: string, opts?: { includeRoles: boolean }]>();
  });

  it("Store", () => {
    expectTypeOf<Store>().toEqualTypeOf<{ items: string[]; add(item: string): number }>();
  });

  it("loadAll paralel & berurutan", async () => {
    const order: string[] = [];
    const slowFetcher: typeof fetchUser = async (id) => {
      await new Promise((r) => setTimeout(r, id === "1" ? 30 : 1));
      order.push(id);
      return fetchUser(id);
    };
    const result = (await loadAll(["1", "2"], slowFetcher)) as Expected[];
    expect(result.map((u) => u.id)).toEqual(["1", "2"]);
    expect(order).toEqual(["2", "1"]); // bukti dijalankan paralel
  });
});
