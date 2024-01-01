import React, { useState } from "react" ;
import { Icon } from "@shopify/polaris";
import { useAPI } from "../shop";
// import pic from   './image.jpg';
import {PlusOutlined} from '@ant-design/icons';
import pic from "../../assets/image2.png";
const CustomizationProductBundlePreview=({data})=>{
const {currency}=useAPI();
const discount=40;

return(

  <div className="sd-preview-wrapper-common sd-productCustom-preview"  style={{"backgroundColor":data.bundle.box.backgroundColor,"borderColor": data.bundle.box.borderColor,"borderRadius":data.bundle.box.borderRadius+"px"}} >
  {data.bundle.button.position=="top" && <button type="button" style={{"color":data.bundle.button.color,"fontSize":data.bundle.button.fontSize+"px","backgroundColor":data.bundle.button.backgroundColor}}>
        {data.bundle.button.text_others +" "}{discount}% </button>
}
<div className="sd-preview-title-common" style={{"color":data.bundle.title.color,"fontSize":data.bundle.title.fontSize +"px","textAlign":data.bundle.title.alignment}}>Build Demo Bundle</div>
                  <div className="sd-preview-data-section-common">
            <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
          <div className="sd-custom-image-container">
        
          <img  src={pic} style={{"borderColor":data.bundle.productDetails.image.borderColor,"borderRadius":data.bundle.productDetails.image.borderRadius+"px"}} />
           
           </div>
            <div className="sd-bundle-title-price">
              <div style={{"color":data.bundle.productDetails.title.color,"fontSize":data.bundle.productDetails.title.fontSize +"px"}}>Product Name</div>
             
              <div style={{"color":data.bundle.productDetails.price.color,"fontSize":data.bundle.productDetails.price.fontSize+"px"}}>
                {currency}{" "}
               500
              </div>
            </div>
            </div>
            <div className="sd-bundle-showQuantity" style={{"color":data.bundle.productDetails.quantities.color,"backgroundColor":data.bundle.productDetails.quantities.backgroundColor}}>2X </div>
          </div>
             
                  <div className="sd-preview-variant-selection-common">
                  <p style={{color:data.bundle.productDetails.variantSelector.color}}>1</p>
                  <select style={{"backgroundColor":data.bundle.productDetails.variantSelector.backgroundColor,"color":data.bundle.productDetails.variantSelector.color }}     
                    >
                      <option
                        value="select"
                      >
                        {" "}
                        Select Variant{" "}
                      </option>

                          <option
                            value="one"
                            data-varindex="3"
                          >
                           variant one
                          </option>
                          <option
                            value="two"
                            data-varindex="3"
                          >
                           variant two
                          </option>
                     
                    </select>
                  </div>
               
                  <div className="sd-preview-variant-selection-common">
                    <p style={{color:data.bundle.productDetails.variantSelector.color}}>2</p>
                    <select style={{"backgroundColor":data.bundle.productDetails.variantSelector.backgroundColor,"color":data.bundle.productDetails.variantSelector.color }}     
                    >
                      <option
                        value="select"
                      >
                        {" "}
                        Select Variant{" "}
                      </option>

                          <option
                            value="one"
                            data-varindex="3"
                          >
                           variant one
                          </option>
                          <option
                            value="two"
                            data-varindex="3"
                          >
                           variant two
                          </option>
                     
                    </select>
                  </div>
     
            <div className="sd-bundle-svg-common" style={{background:data.bundle.productDetails.plusBackgroundColor}}>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data.productDetails.plusColor}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg> */}

              <PlusOutlined style={{  color: data.bundle.productDetails.plusColor }} />



            </div>
         
           
          

<div className="sd-preview-data-section-common">
            <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
          <div>
        
          <img  src={pic} style={{"borderColor":data.bundle.productDetails.image.borderColor,"borderRadius":data.bundle.productDetails.image.borderRadius+"px"}} />
           
           </div>
            <div className="sd-bundle-title-price">
              <div style={{"color":data.bundle.productDetails.title.color,"fontSize":data.bundle.productDetails.title.fontSize +"px"}}>Product Name</div>
             
              <div style={{"color":data.bundle.productDetails.price.color,"fontSize":data.bundle.productDetails.price.fontSize+"px"}}>
                {currency}{" "}
               500
              </div>
            </div>
            </div>
           
          </div>
             
                <br/>
        
      <div className="sd-bundle-total-common" style={{"color":data.bundle.totalSection.color,"backgroundColor":data.bundle.totalSection.backgroundColor,"fontSize":data.bundle.totalSection.fontSize +"px"}}>
       <p>{data.bundle.totalSection.text}</p>
        <div className="sd-bundle-customization-total-common">
     
<span className="sd-bundle-mrp-price" style={{"color":data.bundle.totalSection.originalPrice.color,"fontSize":data.bundle.totalSection.originalPrice.fontSize +"px"}} >
<del>{currency}  1000 </del>
</span>
<span className="sd-bundle-real-price"  style={{"color":data.bundle.totalSection.finalPrice.color,"fontSize":data.bundle.totalSection.finalPrice.fontSize +"px"}}>{currency} 600</span>
</div>
      </div>
     {data.bundle.button.position=="bottom" && <button type="button" className="sd-addToCart-button" style={{"color":data.bundle.button.color,"fontSize":data.bundle.button.fontSize+"px","backgroundColor":data.bundle.button.backgroundColor}}>
        {data.bundle.button.text_others }</button>
}
  </div>

)
}
  export default  CustomizationProductBundlePreview;