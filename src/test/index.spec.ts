import { Redsys, fromBase64 } from "../index";

describe("index exports", () => {
  it("exports the Redsys class", () => {
    expect(typeof Redsys).toBe("function");
  });

  it("exports fromBase64 utility", () => {
    expect(fromBase64("abc+/==")).toBe("abc-_");
  });
});
