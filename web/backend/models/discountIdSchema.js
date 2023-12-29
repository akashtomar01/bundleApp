import mongoose from "mongoose"


const discountIdSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  discountId :{
    type:String
}

},{
  timestamps:true
});

discountIdSchema.index({ shop: 1 });

const discountIdModel = mongoose.model('discountids', discountIdSchema);
export default discountIdModel ;