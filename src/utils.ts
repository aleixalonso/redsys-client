import * as crypto from "crypto";

export function zeroPad(smth: string, blocksize: number) {
  const buf = Buffer.from(smth.toString(), "utf8");
  const pad = Buffer.alloc(
    (blocksize - (buf.length % blocksize)) % blocksize,
    0
  );

  return Buffer.concat([buf, pad]);
}

export function encrypt3DES(orderId: string, secret: string) {
  const secretKey = Buffer.from(secret, "base64");
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv("des-ede3-cbc", secretKey, iv);
  cipher.setAutoPadding(false);
  const paddedStr = zeroPad(orderId, 8);

  return (
    cipher.update(paddedStr.toString(), "utf8", "base64") +
    cipher.final("base64")
  );
}

export function mac256(orderEncoded: string, merchantData: string) {
  const hexMac256 = crypto
    .createHmac("sha256", Buffer.from(orderEncoded, "base64"))
    .update(merchantData)
    .digest("hex");

  return Buffer.from(hexMac256, "hex").toString("base64");
}

// Convert to URL-safe Base64
export function fromBase64(base64: string): string {
  return base64
    .replace(/\+/g, "-") // Replace + with -
    .replace(/\//g, "_") // Replace / with _
    .replace(/=+$/, ""); // Remove padding characters
}
