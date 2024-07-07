import { Redsys } from "../redsys";
import { fromBase64 } from "../utils";

describe("Redsys", () => {
  let redsys: Redsys;

  beforeEach(() => {
    redsys = new Redsys();
    redsys.merchantParameters = {
      Ds_Merchant_MerchantCode: "999008881",
      Ds_Merchant_Terminal: "1",
      Ds_Merchant_TransactionType: "0",
      Ds_Merchant_Amount: 1000,
      Ds_Merchant_Currency: "978",
      Ds_Merchant_Order: "1234567890",
      Ds_Merchant_MerchantURL: "https://www.example.com",
    };
  });

  describe("createMerchantParameters", () => {
    it("Should the expected base64 string", () => {
      const result = redsys.createMerchantParameters();
      expect(result).toMatchSnapshot();
    });
  });

  describe("createMerchantSignature", () => {
    it("Should the expected signature", () => {
      const result = redsys.createMerchantSignature(
        "sq7HjrUOBfKmC576ILgskD5srU870gJ7" // redsys test secret
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe("createMerchantSignatureNotif", () => {
    it("Should the expected signature", () => {
      // Example params and signature from an ok redirect
      const params =
        "eyJEc19EYXRlIjoiMDYlMkYwNyUyRjIwMjQiLCJEc19Ib3VyIjoiMTglM0EwMSIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQW1vdW50IjoiMTAwMCIsIkRzX0N1cnJlbmN5IjoiOTc4IiwiRHNfT3JkZXIiOiIxNzIwMjgxNjMxNTUiLCJEc19NZXJjaGFudENvZGUiOiI5OTkwMDg4ODEiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19BdXRob3Jpc2F0aW9uQ29kZSI6IjA5NDc3OSIsIkRzX0NhcmRfTnVtYmVyIjoiNDU0ODgxKioqKioqMDAwNCIsIkRzX0NvbnN1bWVyTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZF9Db3VudHJ5IjoiNzI0IiwiRHNfQ2FyZF9CcmFuZCI6IjEiLCJEc19Qcm9jZXNzZWRQYXlNZXRob2QiOiI3OCIsIkRzX0VDSSI6IjA1IiwiRHNfUmVzcG9uc2VfRGVzY3JpcHRpb24iOiJPUEVSQUNJT04rQVVUT1JJWkFEQSIsIkRzX0NvbnRyb2xfMTcyMDI4MTY2MzMxNSI6IjE3MjAyODE2NjMzMTUifQ==";
      const receivedSignature = "VF8kC7KJlVCn45Gn_75MEB2dZYsjOs5QZHrOValj5BU=";

      const computedSignature = redsys.createMerchantSignatureNotif(
        "sq7HjrUOBfKmC576ILgskD5srU870gJ7", // redsys test secret
        params
      );

      expect(computedSignature).toMatchSnapshot();
    });
  });
});
