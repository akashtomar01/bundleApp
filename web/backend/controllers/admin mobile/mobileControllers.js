// export default async function getMobileBundles(req, res){
// import bundleModel from "../../models/bundleSchema.js";
import bundleModel from "../../models/bundleSchema.js";
// import shopInfoModel from "../../models/shopInfoSchema.js";
// import shopify from "../../../shopify.js";
// import pageDataModel from "../../models/pageData.js";
// import { ObjectId } from "mongodb";
// import analyticsModel from "../../models/analytics.js";
// import discountIdModel from "../../models/discountIdSchema.js";
  export async function getMobileBundles(req, res) {
    try {
      let shop = "https://robins-store1.myshopify.com";
      let pId = "gid://shopify/Product/7874771910891"
      let collId = "gid://shopify/Collection/263500988545"
      // console.log("**********************",pId);
      const response = await bundleModel.aggregate([
        {
          $match: {
            shop: "shop",
            status: "active",
            $or: [
              {
                $and: [
                  { type: "productBundle" },
                  {
                    $or: [
                      { "bundleDetail.display.productPages": false },
                      {
                        $and: [
                          { "bundleDetail.display.productPages": true },
                          {
                            "bundleDetail.display.productPagesList": pId,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $and: [
                  { type: "volumeBundle" },
                  {
                    $or: [
                      {
                        $and: [
                          {
                            "bundleDetail.discountedProductType":
                              "specific_product",
                          },
                          {
                            $or: [
                              { "bundleDetail.display.productPages": false },
                              {
                                $and: [
                                  { "bundleDetail.display.productPages": true },
                                  {
                                    "bundleDetail.display.productPagesList": pId,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        $and: [
                          {
                            "bundleDetail.discountedProductType": "all_products",
                          },
                        ],
                      },
                      {
                        $and: [
                          { "bundleDetail.discountedProductType": "collection" },
                          {
                            $or: [
                              { "bundleDetail.display.productPages": false },
                              {
                                $and: [
                                  { "bundleDetail.display.productPages": true },
                                  {
                                    "bundleDetail.display.productPagesList": {
                                      $in: [collId],
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $and: [
                  { type: "collectionMixMatch" },
                  {
                    $or: [
                      { "bundleDetail.display.productPages": false },
                      {
                        $and: [
                          { "bundleDetail.display.productPages": true },
                          {
                            "bundleDetail.display.productPagesList": {
                              $in: [collId],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $and: [
                  { type: "bxgy" },
                  {
                    $or: [
                      { "bundleDetail.display.productPages": false },
                      {
                        $and: [
                          { "bundleDetail.display.productPages": true },
                          {
                            "bundleDetail.display.productPagesList": pId,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $and: [
                  { type: "productMixMatch" },
                  {
                    $or: [
                      { "bundleDetail.display.productPages": false },
                      {
                        $and: [
                          { "bundleDetail.display.productPages": true },
                          {
                            "bundleDetail.display.productPagesList": pId,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $and: [
                  { type: "fbt" },
                  {
                    $or: [
                      { "bundleDetail.display.productPages": false },
                      {
                        $and: [
                          { "bundleDetail.display.productPages": true },
                          {
                            "bundleDetail.display.productPagesList": pId,
                          },
                        ],
                      },
                    ],
                  },
                ],
              }
            ],
          },
        },
        {
          $lookup: {
            from: "customizations",
            localField: "shop",
            foreignField: "shop",
            as: "customization",
          },
        },
        {
          $lookup: {
            from: "translations",
            localField: "shop",
            foreignField: "shop",
            as: "translations",
          },
        },
        {
          $lookup: {
            from: "settings",
            localField: "shop",
            foreignField: "shop",
            as: "settings",
          },
        },
        {
          $lookup: {
            from: "plans",
            localField: "shop",
            foreignField: "shop",
            as: "plans",
          },
        },
        {
          $project: {
            _id: 1,
            shop: 1,
            type: 1,
            name: 1,
            title: 1,
            description:1,
            status: 1,
            currencyCode: 1,
            bundleDetail: 1,
            startdate: 1,
            endDate: 1,
            display: 1,
            customization: { $arrayElemAt: ["$customization", 0] },
            translations: { $arrayElemAt: ["$translations", 0] },
            settings: { $arrayElemAt: ["$settings", 0] },
            plans: { $arrayElemAt: ["$plans", 0] },
          },
        },
      ]);
  
      if (response) {
      console.log("check response :::::::::=====::::::::::::::::::::::>>",response);
  
        return res
          .status(200)
          .send({ message: "success", response: response, status: 200 });
      }
      return res
        .status(400)
        .send({ message: "SOMETHING_WENT_WRONG", status: 400 });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      if (error.code === "ETIMEDOUT" && retries < MAX_RETRIES) {
        console.log(
          `Operation timed out, retrying... (attempt ${
            retries + 1
          } of ${MAX_RETRIES})`
        );
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        return myOperation(); // Retry the operation
      } else {
        // Gracefully terminate the application
        console.log("Fatal error occurred, terminating application.");
        process.exit(1);
      }
    }
  }

  export async function getDataDummy(req,res){
    try{
      return res.status(200).send({
        message:"helllo this is work properly",
        status:200
      })
    }catch(err){
      console.log("errroorororororororororororrororororoorororororororor",err);
    }
    
  }