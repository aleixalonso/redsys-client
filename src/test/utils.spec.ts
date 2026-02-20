import { fromBase64, zeroPad } from "../utils";

describe("utils", () => {
  describe("zeroPad", () => {
    it("pads to block size when needed", () => {
      const result = zeroPad("abc", 8);
      expect(result.length).toBe(8);
      expect(result.subarray(0, 3).toString("utf8")).toBe("abc");
    });

    it("does not pad when already aligned to block size", () => {
      const result = zeroPad("abcdefgh", 8);
      expect(result.length).toBe(8);
      expect(result.toString("utf8")).toBe("abcdefgh");
    });
  });

  describe("fromBase64", () => {
    it("converts standard base64 into URL-safe base64", () => {
      expect(fromBase64("A+/B==")).toBe("A-_B");
    });
  });
});
