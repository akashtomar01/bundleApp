import mongoose from "mongoose"


const translationSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
   translation : {
    type:Object
   }


});
translationSchema.index({ shop: 1 });

const translationModel = mongoose.model('translation', translationSchema);
export default translationModel ;
