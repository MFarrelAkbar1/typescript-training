import { describe, it, expect, expectTypeOf, vi } from "vitest";
import {
  applyOp,
  compose,
  once,
  createLogger,
  type BinaryOp,
  type NumFn,
  type Logger,
} from "@ex/day2/01-function-types";

describe("01 function types", () => {
  it("BinaryOp & applyOp", () => {
    expectTypeOf<BinaryOp>().toEqualTypeOf<(a: number, b: number) => number>();
    expect(applyOp((a, b) => a * b, 3, 4)).toBe(12);
  });

  it("compose", () => {
    expectTypeOf<NumFn>().toEqualTypeOf<(x: number) => number>();
    const inc = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const f = compose(inc, double) as (x: number) => number;
    expect(f(5)).toBe(11);
  });

  it("once hanya memanggil sekali", () => {
    const spy = vi.fn(() => 42);
    const f = once(spy);
    expect(f()).toBe(42);
    expect(f()).toBe(42);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Logger callable + properti", () => {
    expectTypeOf<Logger>().toBeCallableWith("x");
    expectTypeOf<Logger>().toHaveProperty("prefix").toEqualTypeOf<string>();
    const logger = createLogger("api") as unknown as ((m: string) => string) & { prefix: string };
    expect(logger("halo")).toBe("[api] halo");
    expect(logger.prefix).toBe("api");
  });
});
