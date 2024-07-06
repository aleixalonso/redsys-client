export interface MerchantParameters {
  Ds_Merchant_MerchantCode: string; // Merchant FUC code assigned to the store (9 characters)
  Ds_Merchant_Terminal: string; // Terminal number assigned by the bank (3 characters)
  Ds_Merchant_TransactionType: string; // Transaction type (1 character)
  Ds_Merchant_Amount: number; // Amount in cents (12 digits)
  Ds_Merchant_Currency: string; // Numeric currency code according to ISO-4217 (4 digits)
  Ds_Merchant_Order: string; // Order number (12 characters, first 4 numeric)
  Ds_Merchant_MerchantURL: string; // Merchant URL for online notification (250 characters)
  Ds_Merchant_ProductDescription?: string; // Product description (125 characters, optional)
  Ds_Merchant_Titular?: string; // Cardholder's first and last name (60 characters, optional)
  Ds_Merchant_UrlOK?: string; // Success URL (250 characters, optional)
  Ds_Merchant_UrlKO?: string; // Failure URL (250 characters, optional)
  Ds_Merchant_MerchantName?: string; // Merchant name (25 characters, optional)
  Ds_Merchant_ConsumerLanguage?: string; // Cardholder language (3 digits, optional)
  Ds_Merchant_SumTotal?: number; // Total amount of installments (12 digits, optional)
  Ds_Merchant_MerchantData?: string; // Merchant data (1024 characters, optional)
  Ds_Merchant_DateFrecuency?: number; // Frequency in days for recurring transactions (5 digits, optional)
  Ds_Merchant_ChargeExpiryDate?: string; // Expiry date for recurring transactions (yyyy-MM-dd, optional)
  Ds_Merchant_AuthorisationCode?: string; // Authorization code (6 digits, optional)
  Ds_Merchant_TransactionDate?: string; // Transaction date for recurring transactions (yyyy-MM-dd, optional)
  Ds_Merchant_Identifier?: string; // Reference for payment by Reference or Pago1-Clic (8 digits, optional)
  Ds_Merchant_Group?: string; // Group code for payment by Reference or Pago1-Clic (9 digits, optional)
  Ds_Merchant_DirectPayment?: string; // Payment without authentication (4 digits, optional)
  Ds_Merchant_Pan?: string; // Card number (19 digits, optional)
  Ds_Merchant_ExpiryDate?: string; // Card expiry date (YYMM, optional)
  Ds_Merchant_CVV2?: string; // Card CVV2 code (3-4 digits, optional)
}
