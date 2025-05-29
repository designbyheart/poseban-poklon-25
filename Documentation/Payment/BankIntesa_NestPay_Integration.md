# Bank Intesa NestPay Payment Integration

This document outlines the integration with Bank Intesa's NestPay payment gateway for processing card payments on the Poseban Poklon website.

## Test Environment Parameters

The following test parameters are used for the NestPay integration:

- **Merchant ID**: 13IN003803
- **User Name**: REPadmin
- **Password**: Pld20033
- **Type**: 3D Pay Hosting
- **Currency**: 941 (Serbian Dinar)
- **Language**: sr (Serbian)
- **Hash Algorithm**: ver2

## Test Merchant Center Access

URL for the test Merchant Center:
```
https://testsecurepay.eway2pay.com/bib/report/user.login
```

Upon first login, you will need to define a new password.

## Store Key Configuration

The Store Key is a critical security element that must be generated in the Merchant Center:
1. Log in to the Merchant Center
2. Go to the Administration tab
3. Generate a new Store Key
4. Update your `.env` file with the new Store Key:
   ```
   NESTPAY_ID=13IN003803
   NESTPAY_KEY=your_generated_store_key
   ```

## Payment Flow

1. Customer selects products and proceeds to checkout
2. The system generates a payment request to NestPay with the following parameters:
   - clientid: Merchant ID
   - amount: Order total in smallest currency unit (para)
   - oid: Order ID
   - okUrl: Success URL
   - failUrl: Failure URL
   - currency: 941 (Serbian Dinar)
   - hashAlgorithm: ver2
   - lang: sr
   - encoding: utf-8
   - storetype: 3d_pay_hosting
   - hash: SHA-512 hash of the payment parameters

3. Customer is redirected to the NestPay payment page
4. After payment processing, the customer is redirected back to the website with the transaction result
5. The system processes the response and updates the order status accordingly

## Hash Calculation

The hash is calculated using the following format:
```
clientid|oid|amount|okurl|failurl|transaction type||rnd||||currency|StoreKey
```

Note the empty fields represented by `||` and `||||` which are required by the NestPay system.

## Testing

Use the test cards provided in the "Primeri testnih case-ova za trgovce sa testnim karticama.xls" file to test different payment scenarios.

### SMS Test Cases
For immediate payment processing (Auth transactions)

### DMS Test Cases
For two-step payment processing (PreAuth transactions)

## Important Notes

1. All parameter names and values are case-sensitive
2. The POST request must not contain "instalment" or "CallbackURL" parameters
3. The "rnd" and "oid" parameters must not contain backslash ("\") or pipeline ("|") characters
4. The hash version must be "ver2"
5. Use charset="utf-8" for proper handling of Serbian characters
6. The okUrl and failUrl must be HTTPS URLs and cannot contain localhost

## Production Migration

After successful testing, you will receive production parameters. To migrate to production:
1. Replace test links with production links
2. Replace the test Store Key with the production Store Key
3. Perform a pilot test to verify that production payment cards can process payments

## Error Handling

If a transaction is not completed due to network issues or user actions, implement the Order Status Query API to check the transaction status. Refer to the "ISPC_Nestpay_Merchant Integration API Manual.pdf" document for details.

## Support

For any questions or issues, contact the Bank Intesa e-commerce support team at:
ecomm_podrska@bancaintesa.rs
