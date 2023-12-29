import mongoose from "mongoose"


const settingSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
   discountLabel:{
    type:String
   }
},{
  timestamps:true
});

settingSchema.index({ shop: 1 });

const settingModel = mongoose.model('settings', settingSchema);
export default settingModel ;
