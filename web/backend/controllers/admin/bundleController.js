import shopify from "../../../shopify.js";
import shopInfoModel from "../../models/shopInfoSchema.js";
const MAX_RETRIES = 3;
let retries = 0;


export async function createRule(req,res){
  const type = req.body.type;
  if(type != "bxgy"){
    try{
      const shop = req.body.shop;
      const title = req.body.discount_name;
      const code = req.body.code;
      const discountValue = req.body.discountValue;
      const variantsId = req.body.variantsId;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const bundleType = req.body.bundleType
      const totalPrice = req.body.totalPrice
      const discountId = req.body.discountCreateId
      const quantityItem = variantsId.length
      const shopInfo = await shopInfoModel.findOne({shop})
      const client = new shopify.api.clients.Graphql({ session:  {
        shop:shop,
        accessToken:shopInfo.accessToken
      }});
      const uniqueSet = new Set(variantsId);
      const mergedArray = Array.from(uniqueSet);
      let productVariantsId = []
      // console.log("create rule check id***********************",code,"***********************",type);
        // console.log("type != bxgy");
          if(discountId.length > 0){ 
            // console.log("discount id is greater than zero",discountId);
          let getDiscountquery =`query {
            codeDiscountNode(id:"${discountId}") {
              id
              codeDiscount {
                ... on DiscountCodeBasic {
                  title
                  customerGets {
                    items {
                      ... on DiscountProducts {
                        productVariants(first: 50) {
                          edges {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
          
          const response = await client.query({
            data: {
              query: getDiscountquery,
            }
          });
  
          if(response.body.data.codeDiscountNode == null){
            // console.log("discount id is null");
  
            if(bundleType == "freeShipping"){
              // console.log("discount id is null than create freeshipping");
              let Input ={
                "freeShippingCodeDiscount": {
                  // "startsAt": startDate,
              
                  "appliesOncePerCustomer": false,
                  "title": code,
                  "code": code,
                  "minimumRequirement": {
                    "subtotal": {
                      "greaterThanOrEqualToSubtotal": totalPrice
                    }
                  },
                  "customerSelection": {
                    "all": true
                  },
                  "destination": {
                    "all": true
                  }
                }
              }
  
              let queryString =`mutation discountCodeFreeShippingCreate($freeShippingCodeDiscount: DiscountCodeFreeShippingInput!) {
                discountCodeFreeShippingCreate(
                  freeShippingCodeDiscount: $freeShippingCodeDiscount
                ) {
                  codeDiscountNode {
                    id
                    codeDiscount {
                      ... on DiscountCodeFreeShipping {
                        title
                        startsAt
                        endsAt
                        maximumShippingPrice {
                          amount
                        }
                        customerSelection {
                          ... on DiscountCustomerAll {
                            allCustomers
                          }
                        }
                        destinationSelection {
                          ... on DiscountCountryAll {
                            allCountries
                          }
                        }
                        minimumRequirement {
                          ... on DiscountMinimumSubtotal {
                            greaterThanOrEqualToSubtotal {
                              amount
                            }
                          }
                        }
                        codes(first: 2) {
                          nodes {
                            code
                          }
                        }
                      }
                    }
                  }
                  userErrors {
                    field
                    code
                    message
                  }
                }
              }`
  
              const response = await client.query({
                data: {
                  query: queryString,
                  variables: Input,
                },
              });
              let bundleDiscountId = response.body.data.discountCodeFreeShippingCreate.codeDiscountNode.id
              return  res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
            }else{
              // console.log("discount id is null than create discountcode instead of freeshipping");
              let Input ={
                "basicCodeDiscount": {
                  "appliesOncePerCustomer": false,
                  "code":code,
                  "combinesWith": {
                    "productDiscounts": true,
                    "shippingDiscounts": true
                  },
                  "customerGets": {
                    "items": {
                      "products": {
                        "productVariantsToAdd": mergedArray
                      }
                    },
                    "value": {
                      "discountAmount": {
                        "amount": discountValue,
                        "appliesOnEachItem": false
                      }
                    }
                  },
                  "customerSelection": {
                    "all": true
                  },
                  "minimumRequirement": {
                    "quantity": {
                      "greaterThanOrEqualToQuantity": quantityItem.toString()
                    }
                  },
              
                  // "startsAt": startDate,
                  "title": code,
                  "usageLimit": null
                }
              }
      
      
              let queryString =  `  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
                discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
                  codeDiscountNode {
                    id
                    codeDiscount {
                      ... on DiscountCodeBasic {
                        title
                        codes(first: 10) {
                          nodes {
                            code
                          }
                        }
                        startsAt
                        endsAt
                        customerSelection {
                          ... on DiscountCustomerAll {
                            allCustomers
                          }
                        }
                        customerGets {
                          value {
                            ... on DiscountPercentage {
                              percentage
                            }
                          }
                          items {
                            ... on AllDiscountItems {
                              allItems
                            }
                          }
                        }
                        appliesOncePerCustomer
                      }
                    }
                  }
                  userErrors {
                    field
                    code
                    message
                  }
                }
              }`;
      
              const response = await client.query({
                data: {
                  query: queryString,
                  variables: Input,
                },
              });
              let bundleDiscountId = response.body.data.discountCodeBasicCreate.codeDiscountNode.id
              return  res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
            }
          }else{
            if(bundleType == "freeShipping"){
              // console.log("discount id is not null than update  freeshipping");
              let bundleDiscountId = response.body.data.codeDiscountNode.id
              let input=  {
                "freeShippingCodeDiscount": {
                  // "startsAt": startDate,
              
                  "appliesOncePerCustomer": false,
                  "title": code,
                  "code": code,
                  "minimumRequirement": {
                    "subtotal": {
                      "greaterThanOrEqualToSubtotal": totalPrice
                    }
                  },
                  "customerSelection": {
                    "all": true
                  },
                  "destination": {
                    "all": true
                  }
                },"id": bundleDiscountId
              }
            
              let queryString =`mutation discountCodeFreeShippingUpdate($freeShippingCodeDiscount: DiscountCodeFreeShippingInput!, $id: ID!) {
                discountCodeFreeShippingUpdate(freeShippingCodeDiscount: $freeShippingCodeDiscount, id: $id) {
                  codeDiscountNode {
                    id
                    codeDiscount {
                      ... on DiscountCodeFreeShipping {
                        title
                        startsAt
                        endsAt
                        minimumRequirement {
                          ... on DiscountMinimumSubtotal {
                            greaterThanOrEqualToSubtotal {
                              amount
                              currencyCode
                            }
                          }
                        }
                        codes(first: 2) {
                          nodes {
                            code
                          }
                        }
                      }
                    }
                  }
                  userErrors {
                    field
                    code
                    message
                  }
                }
              }`
              const update = await client.query({
                data: {
                  query: queryString,
                  variables: input,
                },
              });
              let bundleShoppingDiscountId = update.body.data.discountCodeFreeShippingUpdate.codeDiscountNode.id
              return  res.status(200).json({message:"SUCCESS!",response:bundleShoppingDiscountId,status:200})
            }else{
              // console.log("discount id is not null than update discount code instead of freeshipping");
              let getDiscountProductArr = response.body.data.codeDiscountNode.codeDiscount.customerGets?.items.productVariants.edges ;
              getDiscountProductArr?.forEach((e)=>{
                productVariantsId.push(e.node.id)
              })
  
              const filteredArray = productVariantsId.filter((element) => !mergedArray.includes(element));
              let bundleDiscountId = response.body.data.codeDiscountNode.id
              
  
              let Input ={
                "basicCodeDiscount": {
                  "appliesOncePerCustomer": false,
                  "code": code,
                  "combinesWith": {
                    "productDiscounts": true,
                    "shippingDiscounts": true
                  },
                  "customerGets": {
                    "items": {
                      "products": {
                        "productVariantsToRemove" : filteredArray,
                        "productVariantsToAdd": mergedArray
                      }
                    },
                    "value": {
                      "discountAmount": {
                        "amount": discountValue,
                        "appliesOnEachItem": false
                      }
                    }
                  },
                  "customerSelection": {
                    "all": true
                  },
                  "minimumRequirement": {
                    "quantity": {
                      "greaterThanOrEqualToQuantity": quantityItem.toString()
                    }
                  },
                
                  // "startsAt": startDate,
                  "title": code,
                  "usageLimit": null
                },
                "id":bundleDiscountId
              }
  
              let queryString =   `mutation discountCodeBasicUpdate($id: ID!, $basicCodeDiscount: DiscountCodeBasicInput!) {
                discountCodeBasicUpdate(id: $id, basicCodeDiscount: $basicCodeDiscount) {
                  codeDiscountNode {
                    codeDiscount {
                      ... on DiscountCodeBasic {
                        title
                        codes(first: 10) {
                          nodes {
                            code
                          }
                        }
                        startsAt
                        endsAt
                        customerSelection {
                          ... on DiscountCustomerAll {
                            allCustomers
                          }
                        }
                        customerGets {
                          value {
                            ... on DiscountPercentage {
                              percentage
                            }
                          }
                          items {
                            ... on AllDiscountItems {
                              allItems
                            }
                          }
                        }
                        appliesOncePerCustomer
                      }
                    }
                  }
                  userErrors {
                    field
                    code
                    message
                  }
                }
              }`
              const update = await client.query({
                data: {
                  query: queryString,
                  variables: Input,
                },
              });
              return res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200,update:update})
            }
          }
        }else{
          if(bundleType == "freeShipping"){
            // console.log("discount id is found than create freeshipping");
            let Input ={
              "freeShippingCodeDiscount": {
                "startsAt": "2022-06-22T21:12:07.000Z",
                "appliesOncePerCustomer": false,
                "title": code,
                "code": code,
                "minimumRequirement": {
                  "subtotal": {
                    "greaterThanOrEqualToSubtotal": totalPrice
                  }
                },
                "customerSelection": {
                  "all": true
                },
                "destination": {
                  "all": true
                }
              }
            }
  
            let queryString =`mutation discountCodeFreeShippingCreate($freeShippingCodeDiscount: DiscountCodeFreeShippingInput!) {
              discountCodeFreeShippingCreate(
                freeShippingCodeDiscount: $freeShippingCodeDiscount
              ){
                codeDiscountNode {
                  id
                  codeDiscount {
                    ... on DiscountCodeFreeShipping {
                      title
                      startsAt
                      endsAt
                      maximumShippingPrice {
                        amount
                      }
                      customerSelection {
                        ... on DiscountCustomerAll {
                          allCustomers
                        }
                      }
                      destinationSelection {
                        ... on DiscountCountryAll {
                          allCountries
                        }
                      }
                      minimumRequirement {
                        ... on DiscountMinimumSubtotal {
                          greaterThanOrEqualToSubtotal {
                            amount
                          }
                        }
                      }
                      codes(first: 2) {
                        nodes {
                          code
                        }
                      }
                    }
                  }
                }
                userErrors {
                  field
                  code
                  message
                }
              }
            }`
  
            const response = await client.query({
              data: {
                query: queryString,
                variables: Input,
              },
            });
  
            let bundleDiscountId = response.body.data.discountCodeFreeShippingCreate.codeDiscountNode.id
            return  res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
  
          }else{
            // console.log("discount id is found than create discount code instead of freeshipping",code);
            
  
            let Input ={
              "basicCodeDiscount": {
                "appliesOncePerCustomer": false,
                "code":code,
                "combinesWith": {
                  "productDiscounts": true,
                  "shippingDiscounts": true
                },
                "customerGets": {
                  "items": {
                    "products": {
                      "productVariantsToAdd": mergedArray
                    }
                  },
                  "value": {
                    "discountAmount": {
                      "amount": discountValue,
                      "appliesOnEachItem": false
                    }
                  }
                },
                "customerSelection": {
                  "all": true
                },
                "minimumRequirement": {
                  "quantity": {
                    "greaterThanOrEqualToQuantity": quantityItem.toString()
                  }
                },
            
                "startsAt": startDate,
                "title": code,
                "usageLimit": null
              }
            }
      
            let queryString =  `  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
              discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
                codeDiscountNode {
                  id
                  codeDiscount {
                    ... on DiscountCodeBasic {
                      title
                      codes(first: 10) {
                        nodes {
                          code
                        }
                      }
                      startsAt
                      endsAt
                      customerSelection {
                        ... on DiscountCustomerAll {
                          allCustomers
                        }
                      }
                      customerGets {
                        value {
                          ... on DiscountPercentage {
                            percentage
                          }
                        }
                        items {
                          ... on AllDiscountItems {
                            allItems
                          }
                        }
                      }
                      appliesOncePerCustomer
                    }
                  }
                }
                userErrors {
                  field
                  code
                  message
                }
              }
            }`;
      
            const response = await client.query({
              data: {
                query: queryString,
                variables: Input,
              },
            });
            // console.log("responseresponseresponseresponse",response.body.data.discountCodeBasicCreate.userErrors);
            let bundleDiscountId = response.body.data.discountCodeBasicCreate.codeDiscountNode.id
            return  res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
          }
        }  
    
    }catch(error){
      console.error(`Error:::::::::::::::::::>>>>>>>>>>>>>: ${error.message}`);
      if (error.code === 'ETIMEDOUT' && retries < MAX_RETRIES)  {
          // console.log(`Operation timed out, retrying... (attempt ${retries + 1} of ${MAX_RETRIES})`);
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          return myOperation(); // Retry the operation
      
      }else{
        // Gracefully terminate the application
        // console.log('Fatal error occurred, terminating application.');
        process.exit(1);
      }
    }
  }else{
    // console.log("type === bxgy");
    bxgyDiscountCodeCreate(req,res);
  }
}

export async function deactivateRule (req,res){
  try{
    const {shop,discountId,bundle_type} = req.body
    const shopInfo = await shopInfoModel.findOne({shop:shop})

    const client = new shopify.api.clients.Graphql({ session:  {
      shop:shop,
      accessToken:shopInfo.accessToken
    }});

    let Input ={
        "id":discountId
      }
      // console.log(bundle_type,"check deactivate discount id................................................",req);
    if(bundle_type != "bxgy"){
      let queryString = `mutation discountCodeDeactivate($id: ID!) {
        discountCodeDeactivate(id: $id) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBasic {
                title
                status
                startsAt
                endsAt
              }
            }
          }
          userErrors {
            field
            code
            message
          }
        }
      }`

      const response = await client.query({
        data: {
          query: queryString,
          variables: Input,
        },
      });
      return  res.status(200).json({message:"SUCCESS!",response:response})

    }else{
      let queryString = `mutation discountCodeDeactivate($id: ID!) {
        discountCodeDeactivate(id: $id) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBxgy {
                endsAt
                usageLimit
                title
                status
                startsAt
              }
            }
          }
          userErrors {
            field
            code
            message
          }
        }
      }`

      const response = await client.query({
        data: {
          query: queryString,
          variables: Input,
        },
      });
      return  res.status(200).json({message:"SUCCESS!",response:response})

    }
  }
  catch(error){
    console.error(`Error: ${error.message}`);
    if (error.code === 'ETIMEDOUT' && retries < MAX_RETRIES)  {
      // console.log(`Operation timed out, retrying... (attempt ${retries + 1} of ${MAX_RETRIES})`);
      retries++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return myOperation(); // Retry the operation
    } else {
      // Gracefully terminate the application
      // console.log('Fatal error occurred, terminating application.');
      process.exit(1);
    }
  }
}

export async function activateRule (req,res){
  try{
    const {shop,discountId,bundle_type} = req.body
    const shopInfo = await shopInfoModel.findOne({shop:shop})
    
    // console.log("not working in bxgy------------------------->",req.body);
    const client = new shopify.api.clients.Graphql({ session:  {
      shop:shop,
      accessToken:shopInfo.accessToken
    }});

    let Input ={
        "id":discountId
      }
    if(bundle_type != "bxgy"){
      // console.log("Not.......... match with bundle type bxgy");
      let queryString = `mutation discountCodeActivate($id: ID!) {
        discountCodeActivate(id: $id) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBasic {
                title
                status
                startsAt
                endsAt
              }
            }
          }
          userErrors {
            field
            code
            message
          }
        }
      }`
      const response = await client.query({
        data: {
          query: queryString,
          variables: Input,
        },
      });
      return  res.status(200).json({message:"SUCCESS!",response:response})
    }else{
      // console.log("Yes............. match with bundle type bxgy");
      let queryString = `mutation discountCodeActivate($id: ID!) {
        discountCodeActivate(id: $id) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBxgy {
                endsAt
                title
                startsAt
                status
              }
            }
          }
          userErrors {
            field
            code
            message
          }
        }
      }`

      const response = await client.query({
        data: {
          query: queryString,
          variables: Input,
        },
      });

      return  res.status(200).json({message:"SUCCESS!",response:response})
    }
  }
  catch(error){
    console.error(`Error::::::::::::::::::::::::::::::::::::::::::: ${error.message}`);
    if (error.code === 'ETIMEDOUT' && retries < MAX_RETRIES)  {
      // console.log(`Operation timed out, retrying... (attempt ${retries + 1} of ${MAX_RETRIES})`);
      retries++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return myOperation(); // Retry the operation
    } else {
      // Gracefully terminate the application
      // console.log('Fatal error occurred, terminating application.');
      process.exit(1);
    }
  }
}

async function bxgyDiscountCodeCreate(req,res){
  try{
    // console.log("check req.body.shop",req.body);
    const shop = req.body.shop;
    const title = req.body.discount_name;
    const code = req.body.code;
    const discountValue = req.body.discountValue;
    const XvariantsId = req.body.XvariantsId;
    const YvariantsId = req.body.YvariantsId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const bundleType = req.body.bundleType
    const totalPrice = req.body.totalPrice
    const discountId = req.body.discountCreateId
    const XquantityItem = req.body.XvariantsId.length
    const YquantityItem = req.body.YvariantsId.length
    const shopInfo = await shopInfoModel.findOne({shop})
    const client = new shopify.api.clients.Graphql({ session:  {
      shop:shop,
      accessToken:shopInfo.accessToken
    }});
    const XuniqueSet = new Set(XvariantsId);
    const XmergedArray = Array.from(XuniqueSet);
    const YuniqueSet = new Set(YvariantsId);
    const YmergedArray = Array.from(YuniqueSet);
    let productVariantsId = []
    // console.log(discountId,"bxgyDiscountCodeCreate response.........................................>",XquantityItem);
    
    if(discountId.length>0){
      // console.log("enterrrrrrrr------");
      let getDiscountquery =`query {
        codeDiscountNode(id:"${discountId}") {
          id
          codeDiscount {
            ... on DiscountCodeBxgy {
              title
              customerGets {
                items {
                  ... on DiscountProducts {
                    productVariants(first: 50) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`
      
      const response = await client.query({
        data: {
          query: getDiscountquery,
        }
      });
      // console.log("check out this id }}}}------------>",response.body.data.codeDiscountNode);
      if(response.body.data.codeDiscountNode == null){
        console.log("-------------------------------------------------------------------------in null");
        let Input = {
          "bxgyCodeDiscount": {
            "code": code,
            "customerBuys": {
              "items": {
                "products": {
                  "productVariantsToAdd": XmergedArray
                }
              },
              "value": {
                "quantity": `${XquantityItem}`
              }
            },
            "customerGets": {
              "items": {
                "products": {
                  "productVariantsToAdd": YmergedArray
                }
              },
              "value": {
                "discountOnQuantity": {
                  "effect": {
                    "amount": discountValue
                  },
                  "quantity": `${YquantityItem}`
                }
              }
            },
            "customerSelection": {
              "all": true
            },
            "endsAt": "2024-09-21T00:00:00Z",
            "startsAt": "2023-06-21T00:00:00Z",
            "title": code,
            "usesPerOrderLimit": 3
          }
        };
      
        let queryString = `mutation discountCodeBxgyCreate($bxgyCodeDiscount: DiscountCodeBxgyInput!) {
          discountCodeBxgyCreate(bxgyCodeDiscount: $bxgyCodeDiscount) {
            codeDiscountNode {
              codeDiscount {
                ... on DiscountCodeBxgy {
                  title
                  codes(first: 10) {
                    edges {
                      node {
                        code
                      }
                    }
                  }
                  startsAt
                  endsAt
                  customerBuys {
                    items {
                      ... on DiscountProducts {
                        __typename
                        productVariants(first: 10) {
                          edges {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                    value {
                      ... on DiscountQuantity {
                        quantity
                      }
                    }
                  }
                  customerGets {
                    items {
                      ... on DiscountProducts {
                        __typename
                        productVariants(first: 10) {
                          edges {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                    value {
                      ... on DiscountOnQuantity {
                        effect {
                          ... on DiscountAmount {
                            __typename
                            amount {
                              amount
                              currencyCode
                            }
                          }
                        }
                        quantity {
                          quantity
                        }
                      }
                    }
                  }
                  customerSelection {
                    ... on DiscountCustomerAll {
                      allCustomers
                    }
                  }
                }
              }
              id
            }
            userErrors {
              field
              code
              message
            }
          }
        }`

      //   let Input = {
      //   "bxgyCodeDiscount": {
      //     "code": code,
      //     "customerBuys": {
      //       "items": {
      //         "products": {
      //           "productVariantsToAdd": XmergedArray
      //         }
      //       },
      //       "value": {
      //         "quantity": `${XquantityItem}`
      //       }
      //     },
      //     "customerGets": {
      //       "items": {
      //         "products": {
      //           "productVariantsToAdd": YmergedArray
      //         }
      //       },
      //       "value": {
      //         "discountOnQuantity": {
      //           "effect": {
      //             "amount":{
      //               "amount": discountValue
      //             },
      //             "appliesOnEachItem": false,
      //           },
      //           "quantity": `${YquantityItem}`
      //         }
      //       }
      //     },
      //     "customerSelection": {
      //       "all": true
      //     },
      //     "endsAt": "2024-09-21T00:00:00Z",
      //     "startsAt": "2023-06-21T00:00:00Z",
      //     "title": code,
      //     "usesPerOrderLimit": 3
      //   }
      // };
    
      // let queryString = `mutation discountCodeBxgyCreate($bxgyCodeDiscount: DiscountCodeBxgyInput!) {
      //   discountCodeBxgyCreate(bxgyCodeDiscount: $bxgyCodeDiscount) {
      //     codeDiscountNode {
      //       codeDiscount {
      //         ... on DiscountCodeBxgy {
      //           title
      //           codes(first: 10) {
      //             edges {
      //               node {
      //                 code
      //               }
      //             }
      //           }
      //           startsAt
      //           endsAt
      //           customerBuys {
      //             items {
      //               ... on DiscountProducts {
      //                 __typename
      //                 productVariants(first: 10) {
      //                   edges {
      //                     node {
      //                       id
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //             value {
      //               ... on DiscountQuantity {
      //                 quantity
      //               }
      //             }
      //           }
      //           customerGets {
      //             items {
      //               ... on DiscountProducts {
      //                 __typename
      //                 productVariants(first: 10) {
      //                   edges {
      //                     node {
      //                       id
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //             value {
      //               ... on DiscountOnQuantity {
      //                 effect {
      //                   ... on DiscountAmount {
      //                     __typename
      //                     amount {
      //                       amount
      //                       currencyCode
      //                     }
      //                     appliesOnEachItem
      //                   }
      //                 }
      //                 quantity {
      //                   quantity
      //                 }
      //               }
      //             }
      //           }
      //           customerSelection {
      //             ... on DiscountCustomerAll {
      //               allCustomers
      //             }
      //           }
      //         }
      //       }
      //       id
      //     }
      //     userErrors {
      //       field
      //       code
      //       message
      //     }
      //   }
      // }`
    
        const response = await client.query({
          data: {
            query: queryString,
            variables: Input,
          },
        });
        // console.log("check response in bxgy code creation",response);
        let bundleDiscountId = response.body.data.discountCodeBxgyCreate.codeDiscountNode.id;
        return  res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
      }else{
        let Input = {
          "id": response.body.data.codeDiscountNode.id,
          "bxgyCodeDiscount": {
            "code": code,
            "customerBuys": {
              "items": {
                "products": {
                  "productVariantsToAdd": XmergedArray
                }
              },
              "value": {
                "quantity": `${XquantityItem}`
              }
            },
            "customerGets": {
              "items": {
                "products": {
                  "productVariantsToAdd": YmergedArray
                }
              },
              "value": {
                "discountOnQuantity": {
                  "effect": {
                    "amount": discountValue
                    },
                 
                  "quantity": `${YquantityItem}`
                }
              }
            },
            "customerSelection": {
              "all": true
            },
            "endsAt": "2024-09-21T00:00:00Z",
            "startsAt": "2023-06-21T00:00:00Z",
            "title": code,
            "usesPerOrderLimit": 3
          }
        }
        
        let queryString = `mutation discountCodeBxgyUpdate($id: ID!, $bxgyCodeDiscount: DiscountCodeBxgyInput!) {
          discountCodeBxgyUpdate(id: $id, bxgyCodeDiscount: $bxgyCodeDiscount) {
            codeDiscountNode {
              codeDiscount {
                ... on DiscountCodeBxgy {
                  title
                  codes(first: 10) {
                    edges {
                      node {
                        code
                      }
                    }
                  }
                  endsAt
                  customerBuys {
                    items {
                      ... on DiscountProducts {
                        __typename
                        productVariants(first: 10) {
                          edges {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                    value {
                      ... on DiscountQuantity {
                        __typename
                        quantity
                      }
                    }
                  }
                  customerGets {
                    items {
                      ... on DiscountProducts {
                        __typename
                        productVariants(first: 10) {
                          edges {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                    value {
                      ... on DiscountOnQuantity {
                        __typename
                        effect {
                          ... on DiscountAmount {
                            __typename
                            amount {
                              amount
                              currencyCode
                              }
                          }
                        }
                        quantity {
                          quantity
                        }
                      }
                    }
                  }
                  customerSelection {
                    ... on DiscountCustomerAll {
                      __typename
                      allCustomers
                    }
                  }
                }
              }
              id
            }
            userErrors {
              field
              code
              message
            }
          }
        }`
        const update = await client.query({
          data: {
            query: queryString,
            variables: Input,
          },
        });
        // console.log("check response in bxgy code creation",update.body.data.discountCodeBxgyUpdate.codeDiscountNode.id);
        let bundleDiscountId = update.body.data.discountCodeBxgyUpdate.codeDiscountNode.id;
        return res.status(200).json({message:"Update!",response:bundleDiscountId,status:200})
      }
    }else{
      console.log("enterrrrrrrr------jjjjjjjjjjjjjj");
      // let Input = {
      //   "bxgyCodeDiscount": {
      //     "code": code,
      //     "customerBuys": {
      //       "items": {
      //         "products": {
      //           "productVariantsToAdd": XmergedArray
      //         }
      //       },
      //       "value": {
      //         "quantity": `${XquantityItem}`
      //       }
      //     },
      //     "customerGets": {
      //       "items": {
      //         "products": {
      //           "productVariantsToAdd": YmergedArray
      //         }
      //       },
      //       "value": {
      //         "discountOnQuantity": {
      //           "effect": {
      //             "amount":{
      //               "amount": discountValue
      //             },
      //             "appliesOnEachItem": false,
      //           },
      //           "quantity": `${YquantityItem}`
      //         }
      //       }
      //     },
      //     "customerSelection": {
      //       "all": true
      //     },
      //     "endsAt": "2024-09-21T00:00:00Z",
      //     "startsAt": "2023-06-21T00:00:00Z",
      //     "title": code,
      //     "usesPerOrderLimit": 3
      //   }
      // };
    
      // let queryString = `mutation discountCodeBxgyCreate($bxgyCodeDiscount: DiscountCodeBxgyInput!) {
      //   discountCodeBxgyCreate(bxgyCodeDiscount: $bxgyCodeDiscount) {
      //     codeDiscountNode {
      //       codeDiscount {
      //         ... on DiscountCodeBxgy {
      //           title
      //           codes(first: 10) {
      //             edges {
      //               node {
      //                 code
      //               }
      //             }
      //           }
      //           startsAt
      //           endsAt
      //           customerBuys {
      //             items {
      //               ... on DiscountProducts {
      //                 __typename
      //                 productVariants(first: 10) {
      //                   edges {
      //                     node {
      //                       id
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //             value {
      //               ... on DiscountQuantity {
      //                 quantity
      //               }
      //             }
      //           }
      //           customerGets {
      //             items {
      //               ... on DiscountProducts {
      //                 __typename
      //                 productVariants(first: 10) {
      //                   edges {
      //                     node {
      //                       id
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //             value {
      //               ... on DiscountOnQuantity {
      //                 effect {
      //                   ... on DiscountAmount {
      //                     __typename
      //                     amount {
      //                       amount
      //                       currencyCode
      //                     }
      //                     appliesOnEachItem
      //                   }
      //                 }
      //                 quantity {
      //                   quantity
      //                 }
      //               }
      //             }
      //           }
      //           customerSelection {
      //             ... on DiscountCustomerAll {
      //               allCustomers
      //             }
      //           }
      //         }
      //       }
      //       id
      //     }
      //     userErrors {
      //       field
      //       code
      //       message
      //     }
      //   }
      // }`
  

      let Input = {
        "bxgyCodeDiscount": {
          "code": code,
          "customerBuys": {
            "items": {
              "products": {
                "productVariantsToAdd": XmergedArray
              }
            },
            "value": {
              "quantity": `${XquantityItem}`
            }
          },
          "customerGets": {
            "items": {
              "products": {
                "productVariantsToAdd": YmergedArray
              }
            },
            "value": {
              "discountOnQuantity": {
                "effect": {
                  "amount": discountValue
                },
                "quantity": `${YquantityItem}`
              }
            }
          },
          "customerSelection": {
            "all": true
          },
          "endsAt": "2024-09-21T00:00:00Z",
          "startsAt": "2023-06-21T00:00:00Z",
          "title": code,
          "usesPerOrderLimit": 3
        }
      };
    
      let queryString = `mutation discountCodeBxgyCreate($bxgyCodeDiscount: DiscountCodeBxgyInput!) {
        discountCodeBxgyCreate(bxgyCodeDiscount: $bxgyCodeDiscount) {
          codeDiscountNode {
            codeDiscount {
              ... on DiscountCodeBxgy {
                title
                codes(first: 10) {
                  edges {
                    node {
                      code
                    }
                  }
                }
                startsAt
                endsAt
                customerBuys {
                  items {
                    ... on DiscountProducts {
                      __typename
                      productVariants(first: 10) {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                  value {
                    ... on DiscountQuantity {
                      quantity
                    }
                  }
                }
                customerGets {
                  items {
                    ... on DiscountProducts {
                      __typename
                      productVariants(first: 10) {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                  value {
                    ... on DiscountOnQuantity {
                      effect {
                        ... on DiscountAmount {
                          __typename
                          amount {
                            amount
                            currencyCode
                          }
                        }
                      }
                      quantity {
                        quantity
                      }
                    }
                  }
                }
                customerSelection {
                  ... on DiscountCustomerAll {
                    allCustomers
                  }
                }
              }
            }
            id
          }
          userErrors {
            field
            code
            message
          }
        }
      }`

      const response = await client.request(queryString,{
      
          variables: Input,
        
      });
      // console.log("check response in bxgy code creation",response.body.data,response.body.data.discountCodeBxgyCreate.userErrors);
      let bundleDiscountId = response.data.discountCodeBxgyCreate.codeDiscountNode.id;
      return res.status(200).json({message:"SUCCESS!",response:bundleDiscountId,status:200})
    }
  }catch(err){
    console.log(".*.*.*.*.*.*.*.*.*.*.*.*.*.*==>",err);
    res.status(500).send({
      message:"Internal Server Error",
      status:500
    })
  }
}

// export async function deactivateBxgyDiscountCodeCreate(req,res){

// }

// export async function activateBxgyDiscountCodeCreate(req,res){
  
// }

