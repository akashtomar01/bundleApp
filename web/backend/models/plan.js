import mongoose from "mongoose"


const planSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  plan:{
    type: String,
    required: true
  },
  interval:{
    type: String,
    required: true
  },
  chargeId:{
    type: String,
  },
  price:{
    type: String,
    required: true
  }
},{
  timestamps:true
});

planSchema.index({ shop: 1 });

const planModel = mongoose.model('plan', planSchema);
export default planModel ;
