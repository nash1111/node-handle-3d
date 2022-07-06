import { describe, expect, it } from "vitest";
import { readSTL } from "../lib/readSTL";

describe("add", () => {
  it("1 + 2 = 3", () => {
    const result = readSTL("Hello");

    expect(result).toBe("Hello");
  });
});