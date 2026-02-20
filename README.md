# redsys-client

[![Build Status](https://github.com/aleixalonso/redsys-client/actions/workflows/test-code.yml/badge.svg?branch=main)](https://github.com/aleixalonso/redsys-client/actions/workflows/test-code.yml)
[![npm version](https://img.shields.io/npm/v/redsys-client)](https://www.npmjs.com/package/redsys-client)
[![Coverage](https://raw.githubusercontent.com/aleixalonso/redsys-client/main/coverage-badge.svg)](https://github.com/aleixalonso/redsys-client/actions/workflows/test-code.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Redsys redirection client inspired from the Redsys PHP and Java official clients.

## Redsys Client Usage

### Client initialization

1. Install the library

```
npm install redsys-client
```

2. Create the Redsys Client

Preferred (constructor style):

```
const redsys = new Redsys({
  Ds_Merchant_MerchantCode: "999008881",
  Ds_Merchant_Terminal: "1",
  Ds_Merchant_TransactionType: "0",
  Ds_Merchant_Amount: 1000,
  Ds_Merchant_Currency: "978",
  Ds_Merchant_Order: "1234567890",
  Ds_Merchant_MerchantURL: "https://www.example.com",
});
```

Legacy-compatible (still supported):

```
const redsys = new Redsys();
redsys.merchantParameters = {
  Ds_Merchant_MerchantCode: "999008881",
  Ds_Merchant_Terminal: "1",
  Ds_Merchant_TransactionType: "0",
  Ds_Merchant_Amount: 1000,
  Ds_Merchant_Currency: "978",
  Ds_Merchant_Order: "1234567890",
  Ds_Merchant_MerchantURL: "https://www.example.com",
};
```

Fluent setup alternative:

```
const redsys = new Redsys().setMerchantParameters({
  Ds_Merchant_MerchantCode: "999008881",
  Ds_Merchant_Terminal: "1",
  Ds_Merchant_TransactionType: "0",
  Ds_Merchant_Amount: 1000,
  Ds_Merchant_Currency: "978",
  Ds_Merchant_Order: "1234567890",
  Ds_Merchant_MerchantURL: "https://www.example.com",
});
```

### Redsys request

1. Create the needed merchant parameters and secret to call Redsys

```
const secret = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";

const merchantParameters = redsys.createMerchantParameters();

const signature = redsys.createMerchantSignature(secret);
```

### Redsys redirect validate signature

1. To validate a given signature, use `createMerchantSignatureNotif`. This method will return a URL-safe base64 string. To make sure the comparison is fair, this method should also be applied to the received signature, the library includes an exported function called `fromBase64` to do so.

```
const computedSignature = redsys.createMerchantSignatureNotif(secret, params);

if(computedSignature === fromBase64(receivedSignature)){
  console.log("OK")
} else {
  console.log("INVALID")
}

```

2. As an alternative, a function `isMerchantSignatureValid` is provided, this function will return a boolean if the signature is valid or invalid.

```
const isValid = redsys.isMerchantSignatureValid(receivedSignature, secret, params);
```

## Useful resources

- Official Redsys [documentation](https://canales.redsys.es/canales/ayuda/documentacion/Manual%20integracion%20para%20conexion%20por%20Redireccion.pdf)

- [Test Parameters](https://pagosonline.redsys.es/entornosPruebas.html)
