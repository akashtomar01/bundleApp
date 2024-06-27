import express from "express";
import {getMobileBundles,getDataDummy} from "../controllers/admin mobile/mobileControllers.js";
import ValidateFunc from "../controllers/admin mobile/validator.js";
const router = express.Router();
router.get("/getMobileBundles",ValidateFunc,getMobileBundles);
router.get("/getDataDummy",getDataDummy)

export default router