import mongoose from "mongoose"


const pageDataSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
pageId :{
    type:Number
}

},{
  timestamps:true
});

pageDataSchema.index({ shop: 1 });

const pageDataModel = mongoose.model('pageData', pageDataSchema);
export default pageDataModel ;
