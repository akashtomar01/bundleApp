import express from "express";
const router = express.Router();

import {
  createBundle,
  deleteBundle,
  editBundle,
  getBundle,
  updateStatus,
  getCurrencyCode,
  actionDelete,
  actionStatus,
  updateBundle,
  updateBundleCustomization,
  updateTranslation,
  getTransaltion,
  getAnalyticsData,
  fetchVariants,
  getCustomization,
  saveSetting,
  getSetting,
  getThemeId,
  createAutomaticDiscount,
 
  
 
} from "../controllers/admin/adminController.js";
import {
  activateRule,
  createRule,

  deactivateRule,

} from "../controllers/admin/bundleController.js";
import { createPage, getBundleData, getCollectionMixMatchData, getPage ,getCollectionProducts, getMoreCollectionProducts, searchCollectionProducts,getBundleViews, getBundleClick, updateAutomaticDiscount} from "../controllers/admin/storefrontController.js";
import contactEmail from "../helper/Email.js";
import { createPlan, freePlans, getPlans, recurringBiling,recurringBilingSelected } from "../controllers/admin/billingController.js";
// ---------------------------------------App -Admin Routes  :------------------------------------------------------
router.post("/admin/createBundle", createBundle);
router.post("/admin/deleteBundle", deleteBundle);
router.post("/admin/editBundle", editBundle);
router.post("/admin/getBundle", getBundle);
router.post("/admin/updateStatus", updateStatus);
router.post("/admin/getCurrencyCode", getCurrencyCode);
router.post("/admin/actionDelete", actionDelete);
router.post("/admin/actionStatus",actionStatus );
router.post("/admin/updateBundle",updateBundle );
router.post("/admin/getCustomization",getCustomization);
router.post("/admin/updateCustomization",updateBundleCustomization)
router.post("/admin/updateTranslation", updateTranslation);
router.post("/admin/contactUs",contactEmail);
router.post("/admin/getTranslation",getTransaltion);
router.post("/admin/getAnalyticsData",getAnalyticsData);
router.post("/admin/fetchVariants",fetchVariants);
router.post("/admin/saveSetting",saveSetting);
router.post("/admin/getSetting",getSetting);
router.post("/admin/getThemeId",getThemeId);
router.post("/admin/createAutomaticDiscount",createAutomaticDiscount);
//---------------------------------- Bundle Product Discount Routes :--------------------------------------------

router.post("/createRule", createRule);
router.post("/deactivateRule", deactivateRule);
router.post("/activateRule", activateRule);


//------------------------------------Storefront: ---------------------------------------------------------
router.post("/getBundleData",getBundleData)
router.post("/createPage",createPage)
router.post("/getPage",getPage)
router.post("/getCollectionMixMatchData",getCollectionMixMatchData)
router.post("/getCollectionProdcuts",getCollectionProducts)
router.post("/getMoreCollectionProducts",getMoreCollectionProducts)
router.post("/searchCollectionProducts",searchCollectionProducts)
router.post("/getBundleViews",getBundleViews)
router.post("/getBundleClick",getBundleClick)
router.post("/admin/updateAutomaticDiscount",updateAutomaticDiscount);

//--------------------------------------Pricing Plans :--------------------------------------------------------
router.post("/admin/getBilling",recurringBiling)
router.post("/admin/billingSelected",recurringBilingSelected)
router.post("/admin/getPlans",getPlans)
router.post("/admin/freePlans",freePlans)
router.post("/admin/createPlans",createPlan)

//----------------------------------------privacy policy-------------------------------------------------------




export default router;
