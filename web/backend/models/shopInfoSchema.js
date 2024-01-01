import mongoose from "mongoose"


const shopInfoSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  accessToken:{
    type : String
  },


},{
  timestamps:true
});


shopInfoSchema.index({ shop: 1 });
const shopInfoModel = mongoose.model('shopInfo', shopInfoSchema);
export default shopInfoModel ;
