import mongoose from "mongoose"


const bundleSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  type:{
       type:String
  },
  name: {
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  title: {
    type: String
  },
  status: {
    type: String
  },
  currencyCode:{
    type:String
  },
  bundleDetail:{
    type:Object
  },
  startdate:{
    type:String
  },
  endDate:{
    type:String
  },
  timeZone:{
    type:String
  }
 
},{
  timestamps:true
});


bundleSchema.index({ shop: 1 });

bundleSchema.index({
  shop: 1,
  type: 1,
  name: 1,
  status: 1,
  currencyCode: 1,
});
  

const bundleModel = mongoose.model('bundleData', bundleSchema);
export default bundleModel ;