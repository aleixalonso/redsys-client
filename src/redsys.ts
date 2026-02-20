import { MerchantParameters } from "./types";
import { encrypt3DES, fromBase64, mac256 } from "./utils";

const DEFAULT_MERCHANT_PARAMETERS: MerchantParameters = {
  Ds_Merchant_MerchantCode: "",
  Ds_Merchant_Terminal: "",
  Ds_Merchant_TransactionType: "",
  Ds_Merchant_Amount: 0,
  Ds_Merchant_Currency: "",
  Ds_Merchant_Order: "",
  Ds_Merchant_MerchantURL: "",
};

export class Redsys {
  private _merchantParameters: MerchantParameters;

  constructor(merchantParameters?: MerchantParameters) {
    this._merchantParameters = {
      ...DEFAULT_MERCHANT_PARAMETERS,
      ...merchantParameters,
    };
  }

  // setters and getters

  public set merchantParameters(merchantParameters: MerchantParameters) {
    this._merchantParameters = merchantParameters;
  }

  public setMerchantParameters(merchantParameters: MerchantParameters): this {
    this._merchantParameters = merchantParameters;
    return this;
  }

  public get merchantParameters(): MerchantParameters {
    return this._merchantParameters;
  }

  // public methods

  public createMerchantParameters(): string {
    return Buffer.from(JSON.stringify(this.merchantParameters)).toString(
      "base64"
    );
  }

  public createMerchantSignature(secret: string): string {
    const merchantParameters = this.createMerchantParameters();
    // Encrypt order
    const encodedOrder = encrypt3DES(
      this.merchantParameters.Ds_Merchant_Order,
      secret
    );
    // Calculate signature
    const signature = mac256(encodedOrder, merchantParameters);

    return signature;
  }

  public createMerchantSignatureNotif(secret: string, params: string): string {
    const decodedData = JSON.parse(Buffer.from(params, "base64").toString());

    // Encrypt order
    const orderEncoded = encrypt3DES(decodedData.Ds_Order, secret);

    // Compute signature with the order encoded and params from response
    const computedSignature = mac256(orderEncoded, params);

    // Return the signature in URL-safe Base64
    return fromBase64(computedSignature);
  }

  public isMerchantSignatureValid(
    receivedSignature: string,
    secret: string,
    params: string
  ): boolean {
    const decodedData = JSON.parse(Buffer.from(params, "base64").toString());

    // Encrypt order
    const orderEncoded = encrypt3DES(decodedData.Ds_Order, secret);

    // Compute signature with the order encoded and params from response
    const computedSignature = mac256(orderEncoded, params);

    // Return valid if the received signature matches the computed one
    return fromBase64(receivedSignature) === fromBase64(computedSignature);
  }
}
