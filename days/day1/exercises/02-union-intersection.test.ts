import { describe, it, expect, expectTypeOf } from "vitest";
import { formatId, touch, toArray, type Id, type Message } from "@ex/day1/02-union-intersection";

describe("02 union & intersection", () => {
  it("Id adalah string | number", () => {
    expectTypeOf<Id>().toEqualTypeOf<string | number>();
  });

  it("formatId untuk number dan string", () => {
    expect(formatId(7)).toBe("#0007");
    expect(formatId(12345)).toBe("#12345");
    expect(formatId("  ab-1 ")).toBe("AB-1");
  });

  it("Message punya id, text, createdAt, updatedAt", () => {
    expectTypeOf<Message>().toHaveProperty("id").toEqualTypeOf<string>();
    expectTypeOf<Message>().toHaveProperty("text").toEqualTypeOf<string>();
    expectTypeOf<Message>().toHaveProperty("createdAt").toEqualTypeOf<Date>();
    expectTypeOf<Message>().toHaveProperty("updatedAt").toEqualTypeOf<Date>();
  });

  it("touch mengganti updatedAt tanpa mutasi", () => {
    const created = new Date("2024-01-01");
    const msg = { id: "m1", text: "halo", createdAt: created, updatedAt: created } as Message;
    const now = new Date("2024-02-02");
    const touched = touch(msg, now) as { createdAt: Date; updatedAt: Date };
    expect(touched.updatedAt).toBe(now);
    expect(touched.createdAt).toBe(created);
    expect((msg as { updatedAt: Date }).updatedAt).toBe(created);
  });

  it("toArray menerima string | string[]", () => {
    expect(toArray("a")).toEqual(["a"]);
    expect(toArray(["a", "b"])).toEqual(["a", "b"]);
    expectTypeOf(toArray).parameter(0).toEqualTypeOf<string | string[]>();
  });
});
