import shopify from "../../../shopify.js";
import planModel from "../../models/plan.js";
import shopInfoModel from "../../models/shopInfoSchema.js";


export async function recurringBiling(req, res) {
    try {
  
      const { plan, interval, price } = req.body;
      const session = res.locals.shopify.session;
      const shop = session.shop 
      const API_KEY = process.env.SHOPIFY_API_KEY;
      const client = new shopify.api.clients.Graphql({session});
      let testCharge;
      if (
        shop == "nezuko-komada.myshopify.com" 
      ) {
        testCharge = true;
      } else {
        testCharge = false;
      }
      const recurringString = `mutation CreateSubscription {
              appSubscriptionCreate(
                  name: "${plan}",
        returnUrl: "https://${shop}/admin/apps/${API_KEY}/plans"
                  test : ${testCharge}
                  lineItems: [{
                      plan: {
            appRecurringPricingDetails: {
              price: { amount: ${price}, currencyCode: USD }
              interval: EVERY_30_DAYS
                          }
                      }
                  }]
              ){
                  userErrors {
                      field
                      message
                  }
                  confirmationUrl    
                  appSubscription {
                      id
                  }
              }
          }`;
  
      const response = await client.query({
        data: recurringString,
      });
  
      res.status(200).send(response);
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }
  
  /****************************Billing Success***************************************** */
  export async function recurringBilingSelected(req, res) {
    try {
      const { charge_id } = req.body;
      const shop =  res.locals.shopify.session.shop ;
     const verifyBilling = await shopify.api.rest.RecurringApplicationCharge.find({
       session : res.locals.shopify.session,
       id : charge_id
     })
  
  
     if(verifyBilling.status === "active") {
      const updatePlan = await planModel.findOneAndUpdate(
        { shop },
        { chargeId:charge_id, plan: verifyBilling.name, price: verifyBilling.price, interval: "MONTHLY" },
        { upsert: true, new: true }
      );
  
      if (!updatePlan) {
        return res.json({
          message: "something went wrong!!!",
          result: 0,
        });
      } else {
        return res
          .status(202)
          .json({ message: "Updated Successfully", result: 1, plan: verifyBilling.name });
      }
     } else {
        res.status(499).json({message : "Payment status is pending!!!", result : 0})
     }
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }

  export async function getPlans(req,res){
try {
  const shop = res.locals.shopify.session.shop
    const response = await planModel.findOne({shop:shop})
    if(response){
      res.status(200).json({message:"success",data:response,status:"200"})
    }
} catch (error) {
  console.log(error)
}
  }

  export async function freePlans (req,res){
    try {
      console.log(req.body)
      const {plan} = req.body
      const shop = res.locals.shopify.session.shop ;
      const response = await planModel.findOneAndUpdate({ shop }, { charge_id:"", plan: plan, price: "0", interval: "MONTHLY" },
      { upsert: true, new: true })
      if(response){
        res.status(200).json({message:"success",data:response,status:"200"})
      }
    } catch (error) {
      console.log(error)
    }
  }


export async function createPlan (req,res){
const shopData = await shopInfoModel.find({},{shop:1})
var ops = []
shopData.forEach(item => {
                ops.push(
                    {
                        updateOne: {
                            filter: { shop:  item.shop },
                            update:{ shop:item.shop,interval:"MONTHLY",plan:"free",price:"0",chargeId:""},
                            upsert: true
                        }
                    }
                )
            })
           
      const createPlan =await  planModel.bulkWrite(ops, { ordered: false })
      console.log(createPlan)
      res.send("success")

}