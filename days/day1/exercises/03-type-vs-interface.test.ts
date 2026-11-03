import { describe, it, expect, expectTypeOf } from "vitest";
import {
  describeUser,
  area,
  type User,
  type Admin,
  type AppConfig,
  type Shape,
  type Circle,
  type Square,
} from "@ex/day1/03-type-vs-interface";

describe("03 type vs interface", () => {
  it("User dan Admin", () => {
    expectTypeOf<User>().toEqualTypeOf<{ id: string; name: string }>();
    expectTypeOf<Admin>().toExtend<User>();
    expectTypeOf<Admin>().toHaveProperty("permissions").toEqualTypeOf<string[]>();
  });

  it("AppConfig punya port dan host (declaration merging)", () => {
    expectTypeOf<AppConfig>().toEqualTypeOf<{ port: number; host: string }>();
  });

  it("Shape adalah Circle | Square", () => {
    expectTypeOf<Shape>().toEqualTypeOf<Circle | Square>();
  });

  it("describeUser", () => {
    expect(describeUser({ id: "1", name: "Ana" } as User)).toBe("Ana");
    const admin = { id: "2", name: "Ana", permissions: ["read", "write"] } as Admin;
    expect(describeUser(admin)).toBe("Ana (admin: read, write)");
  });

  it("area", () => {
    expect(area({ kind: "square", side: 3 } as Shape)).toBe(9);
    expect(area({ kind: "circle", radius: 1 } as Shape)).toBeCloseTo(Math.PI);
  });
});
