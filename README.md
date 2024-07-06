# redsys-client

Redsys Inspired client from Redsys PHP and Java official clients. [Check](https://canales.redsys.es/canales/ayuda/documentacion/Manual%20integracion%20para%20conexion%20por%20Redireccion.pdf) Redsys official documentation for more information

Test parameters can be found [here](https://pagosonline.redsys.es/entornosPruebas.html)

### Redsys Request Usage

1. Create the Redsys Client

```
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
```

2. Create the needed merchant parameters and secret to call Redsys

```
const merchantParameters = redsys.createMerchantParameters();

const signature = redsys.createMerchantSignature("sq7HjrUOBfKmC576ILgskD5srU870gJ7");
```

3. To validate a given merchant params and signature, use createMerchantSignatureNotif

```
const computedSignature = redsys.createMerchantSignatureNotif("sq7HjrUOBfKmC576ILgskD5srU870gJ7", params);

computedSignature === receivedSignature

```
