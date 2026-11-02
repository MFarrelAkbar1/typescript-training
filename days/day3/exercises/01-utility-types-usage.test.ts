import { describe, it, expect, expectTypeOf } from "vitest";
import {
  toPublicUser,
  applyUpdate,
  groupByRole,
  type User,
  type CreateUserInput,
  type UpdateUserInput,
  type PublicUser,
  type UsersByRole,
} from "@ex/day3/01-utility-types-usage";

type Simplify<T> = { [K in keyof T]: T[K] } & {};

const ana: User = {
  id: "u1",
  email: "ana@x.id",
  name: "Ana",
  passwordHash: "hash",
  role: "admin",
  createdAt: new Date("2024-01-01"),
};

describe("01 utility types usage", () => {
  it("CreateUserInput", () => {
    expectTypeOf<Simplify<CreateUserInput>>().toEqualTypeOf<{
      email: string;
      name: string;
      role: "admin" | "member";
      password: string;
    }>();
  });

  it("UpdateUserInput", () => {
    expectTypeOf<UpdateUserInput>().toEqualTypeOf<{
      email?: string;
      name?: string;
      role?: "admin" | "member";
    }>();
  });

  it("PublicUser & UsersByRole", () => {
    expectTypeOf<PublicUser>().not.toHaveProperty("passwordHash");
    expectTypeOf<PublicUser>().toHaveProperty("email");
    expectTypeOf<UsersByRole>().toEqualTypeOf<{ admin: PublicUser[]; member: PublicUser[] }>();
  });

  it("toPublicUser membuang passwordHash", () => {
    const pub = toPublicUser(ana) as Record<string, unknown>;
    expect(pub).not.toHaveProperty("passwordHash");
    expect(pub["email"]).toBe("ana@x.id");
  });

  it("applyUpdate", () => {
    const patch = { name: "Ana B", email: undefined } as UpdateUserInput;
    const updated = applyUpdate(ana, patch);
    expect(updated.name).toBe("Ana B");
    expect(updated.email).toBe("ana@x.id");
    expect(ana.name).toBe("Ana");
  });

  it("groupByRole", () => {
    const g = groupByRole([ana]) as { admin: unknown[]; member: unknown[] };
    expect(g.admin).toHaveLength(1);
    expect(g.member).toEqual([]);
    expect(g.admin[0]).not.toHaveProperty("passwordHash");
  });
});
