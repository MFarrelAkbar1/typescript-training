import { describe, it, expect } from "vitest";
import { formatValue, padLeft } from "@ex/day1/04-narrowing-typeof";

describe("04 narrowing typeof", () => {
  it("formatValue string & number", () => {
    expect(formatValue("halo")).toBe('"halo"');
    expect(formatValue(3.14159)).toBe("3.14");
  });

  it("formatValue boolean, null, undefined", () => {
    expect(formatValue(true)).toBe("yes");
    expect(formatValue(false)).toBe("no");
    expect(formatValue(null)).toBe("null");
    expect(formatValue(undefined)).toBe("-");
  });

  it("formatValue function", () => {
    expect(formatValue(() => "lazy")).toBe("lazy");
  });

  it("padLeft", () => {
    expect(padLeft("x", 3)).toBe("   x");
    expect(padLeft("x", ">> ")).toBe(">> x");
  });
});
