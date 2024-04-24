
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import cors from"cors";
import api from "./backend/routes/api.js"
import db from "./backend/config/database.js";
import path from "path"
import { verifyWebhooks } from "./webhooks/webhookHandlers.js";
import customizationModel from "./backend/models/customizationSchema.js";
import shopInfoModel from "./backend/models/shopInfoSchema.js";
import translationModel from "./backend/models/translationSchema.js";
import settingModel from "./backend/models/settings.js";
import Customizations from './backend/helper/Customization.json' assert { type: "json" }
import { privacyPolicy } from "./backend/controllers/admin/adminController.js";

import dotenv from "dotenv";
import planModel from "./backend/models/plan.js";
import discountIdModel from "./backend/models/discountIdSchema.js";
 
 
dotenv.config();
const app=express();
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
// DB.connect();
// app.use(express.static(`${process.cwd()}/../uploads`))

app.post(shopify.config.webhooks.path, express.text({type: '*/*'}), verifyWebhooks);


app.use(express.static(path.join(`${process.cwd()}`, '../uploads')))
app.use(cors());
const STATIC_PATH =
process.env.NODE_ENV === "production"
? `${process.cwd()}/web/frontend/dist`
: `${process.cwd()}/frontend/`;

db()

console.log(process.env.HOST)

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(), async(req, res, next) => {
    const session = res.locals.shopify.session;
    console.log(session, "session")
  
    const customizationData =  await customizationModel.findOneAndUpdate({shop : session.shop}, {shop : session.shop, bundle:Customizations['bundle'],collectionMixMatch :Customizations['collectionMixMatch'],popUp :Customizations["popUp"],
       volume:Customizations["volume"],bxgy:Customizations["buyXgetY"],productMixMatch:Customizations["productMixMatch"],frequentlyBoughtTogether:Customizations["frequentlyBoughtTogether"]}, {upsert:true, new : true},)
       if(customizationData){
        console.log("customization data saved successfully !!!")
       }

     const shopInfo = await shopInfoModel.findOneAndUpdate({shop:session.shop},{shop:session.shop,accessToken:session.accessToken},{upsert:true, new : true})
     if(shopInfo){
      console.log("shop info successfully saved")
     }    
     let translationData = {
      add:"add",
      off:"off",
      total:"Total",
      FreeShipping:"Get Free Shipping",
      searchProducts:"Search Products",
      seeMore:"See more",
      seeLess:"See less",
      discountApplied:"Discount will be applied at checkout",
      save:"save",
      delete:"delete",
      added:"added",
      addedItems:"added items",
      addItemToSaveMore :"Add {{item}} items to save more",
      addToCartButton :"Add to cart",
      goToBundleBuilder : "Go To Bundle Builder",
      grabTheDeal :"Grab the deal !",
      youHavenotSelectedanyItemsYet : "You have not selected any items yet",
      youHaveSelectedItems: "You have selected {{item}} items",
      noDiscountIsApplied : "No discount is applied on the selected products",
      discountIsApplied : "discount is applied on the selected products",
      selectAtLeastItemsToApplyTheDiscount : "Select at least {{item}} items to apply the discount",
      allProducts : "ALL PRODUCTS"
     } 
     const translation = await translationModel.findOneAndUpdate({shop:session.shop},{translation:translationData},{upsert:true,new:true})
     if(translation){
      console.log("translation data successfully saved !!")
     }
   
      await settingModel.findOneAndUpdate({shop:session.shop},{discountLabel:'SMART'},{upsert:true,new:true}).then((resp)=>{
        console.log("setting updated",resp)
      }).catch((err)=>{
        console.log(err.message)
      })

      await planModel.findOneAndUpdate({shop:session.shop},{plan:"free",price:"0",interval:"monthly",charge_id:""},{upsert:true,new:true}).then((resp)=>{
        console.log("Plans updated",resp)
      }).catch((err)=>{
        console.log(err.message)
      })


     const page =  new shopify.api.rest.Page({session:session});
    page.title = "Collection Mix & Match";
    page.handle = "sd-Collection-Mix-&-Match"
    page.body_html = `<div id="sd-bundle-container"></div>`;


    await page.save({
      update: true,
    });


  //   const client = new shopify.api.clients.Graphql({ session: res.locals.shopify.session});
  // let Input = {
  //         "automaticAppDiscount": {
  //           "title": "Smart Bundle (DO NOT DELETE)",
  //           "functionId": "b96d3230-7a17-4b58-8417-afe9e1504fb7",
  //           "combinesWith": {
  //             "orderDiscounts": true,
  //             "productDiscounts": true,
  //             "shippingDiscounts": true
  //           },
  //           "startsAt": "2021-02-02T17:09:21Z",
           
  //           "metafields": [
  //             {
  //               "namespace": "product-discount",
  //               "key": "function-configuration",
  //               "type": "json",
  //               "value": "0"
  //             }
  //           ]
  //         }
  //       }
        
  
  // let queryString = `mutation discountAutomaticAppCreate($automaticAppDiscount: DiscountAutomaticAppInput!) {
  //     discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
  //       userErrors {
  //         field
  //         message
  //       }
  //       automaticAppDiscount {
  //         discountId
  //         title
  //         startsAt
  //         endsAt
  //         status
  //         appDiscountType {
  //           appKey
  //           functionId
  //         }
  //         combinesWith {
  //           orderDiscounts
  //           productDiscounts
  //           shippingDiscounts
  //         }
  //       }
  //     }
  //   }
  //   `
  //   const response = await client.query({
  //     data: {
  //       query: queryString,
  //       variables: Input,
  //     },
  //   });
  //  if(response.body.data.discountAutomaticAppCreate.automaticAppDiscount.discountId){
  //    await discountIdModel.findOneAndUpdate({shop:session.shop},
  //      {discountId: response.body.data.discountAutomaticAppCreate.automaticAppDiscount.discountId},
  //      {upsert:true,new:true}).then((resp)=>{
  //      console.log("setting updated",resp)
  //    }).catch((err)=>{
  //      console.log(err.message)
  //    })
  //  }
   
      next();


    },
    shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);
app.use(express.json({limit : "100mb"}));
// All endpoints after this point will require an active session

app.use("/api/storefront",api)
app.get("/api/privacy-policy", privacyPolicy)

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/api",api)


app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});
app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;
  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});
app.listen(PORT);
