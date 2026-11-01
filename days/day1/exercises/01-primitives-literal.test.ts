import { describe, it, expect, expectTypeOf } from "vitest";
import {
  move,
  isSuccessStatus,
  type Direction,
  type Point,
  type SuccessStatus,
} from "@ex/day1/01-primitives-literal";

describe("01 primitives & literal types", () => {
  it("Direction adalah literal union 4 arah", () => {
    expectTypeOf<Direction>().toEqualTypeOf<"up" | "down" | "left" | "right">();
  });

  it("Point adalah { x: number; y: number }", () => {
    expectTypeOf<Point>().toEqualTypeOf<{ x: number; y: number }>();
  });

  it("move menggeser sesuai arah dan steps", () => {
    const p = { x: 0, y: 0 };
    expect(move(p, "up")).toEqual({ x: 0, y: 1 });
    expect(move(p, "down", 3)).toEqual({ x: 0, y: -3 });
    expect(move(p, "right", 2)).toEqual({ x: 2, y: 0 });
    expect(move(p, "left")).toEqual({ x: -1, y: 0 });
  });

  it("move tidak memutasi input", () => {
    const p = { x: 5, y: 5 };
    const result = move(p, "up", 10);
    expect(p).toEqual({ x: 5, y: 5 });
    expect(result).not.toBe(p);
  });

  it("SuccessStatus adalah 200 | 201 | 204", () => {
    expectTypeOf<SuccessStatus>().toEqualTypeOf<200 | 201 | 204>();
  });

  it("isSuccessStatus", () => {
    expect(isSuccessStatus(200)).toBe(true);
    expect(isSuccessStatus(204)).toBe(true);
    expect(isSuccessStatus(404)).toBe(false);
  });
});
