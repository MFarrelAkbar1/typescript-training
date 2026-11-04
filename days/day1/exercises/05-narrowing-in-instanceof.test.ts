import { describe, it, expect, expectTypeOf } from "vitest";
import { speak, toDate, HttpError, errorMessage, statusOf } from "@ex/day1/05-narrowing-in-instanceof";

// Helper agar test bisa dikompilasi walau constructor HttpError belum dibuat.
const makeHttpError = (status: number, message: string): HttpError =>
  new (HttpError as unknown as new (s: number, m: string) => HttpError)(status, message);

describe("05 narrowing in & instanceof", () => {
  it("speak", () => {
    expect(speak({ name: "Tom", meow: () => "meong" })).toBe("meong");
    expect(speak({ name: "Rex", bark: () => "guk" })).toBe("guk");
  });

  it("toDate", () => {
    const d = new Date("2024-05-01T00:00:00Z");
    expect(toDate(d)).toBe(d);
    expect(toDate("2024-05-01T00:00:00Z").getTime()).toBe(d.getTime());
    expect(toDate(d.getTime()).getTime()).toBe(d.getTime());
  });

  it("HttpError", () => {
    const err = makeHttpError(404, "Not found");
    expect(err).toBeInstanceOf(Error);
    expect(err).toHaveProperty("status", 404);
    expect(err.message).toBe("Not found");
    expect(err.name).toBe("HttpError");
    expectTypeOf<HttpError>().toHaveProperty("status").toEqualTypeOf<number>();
    expectTypeOf(HttpError).constructorParameters.toEqualTypeOf<[status: number, message: string]>();
  });

  it("errorMessage", () => {
    expect(errorMessage(new Error("boom"))).toBe("boom");
    expect(errorMessage("teks")).toBe("teks");
    expect(errorMessage(42)).toBe("Unknown error");
  });

  it("statusOf", () => {
    expect(statusOf(makeHttpError(403, "Forbidden"))).toBe(403);
    expect(statusOf(new Error("x"))).toBe(500);
  });
});
