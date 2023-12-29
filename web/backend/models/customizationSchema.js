import mongoose from "mongoose"


const customizationSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  bundle:{
    type : Object
  },
  collectionMixMatch :{
    type : Object
  },
  popUp :{
    type:Object
  },
  volume:{
    type:Object
  },
  buyXgetY:{
    type:Object
  }

},{
  timestamps:true
});
customizationSchema.index({ shop: 1 });
const customizationModel = mongoose.model('customization', customizationSchema);
export default customizationModel ;
