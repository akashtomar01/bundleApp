import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
let { restResources } = await import(`@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`);
import dotenv from "dotenv";
dotenv.config();

console.log("*****************************************************************=====>>>>>************************************",LATEST_API_VERSION);

const DB_PATH = `${process.cwd()}/database.sqlite`;
let scopes = process.env.SCOPES.split(",");
// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
    // apiKey : process.env.SHOPIFY_API_KEY,
    // apiSecretKey: process.env.SHOPIFY_API_SECRET,
    // hostScheme : "https",
    // hostName : process.env.DOMAIN,
    // scopes: scopes
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
