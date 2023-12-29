import React from "react";
import { useAPI } from "../shop";
import { Divider } from "antd";
import pic from "../../assets/image2.png"
const CustomizationPopUpPreview=({data})=>{
const {currency}=useAPI();


    return (
<div className="sd-popUp-customise-preview" style={{backgroundColor:data["popUp"].box.backgroundColor}}>
{/* style={{backgroundColor:data.box.backgroundColor,textAlign:data.title.alignment,borderRadius:data.box.borderRadius+"px",borderColor:data.box.borderColor}} */}
{/* style={{color:data.title.color,fontSize : data.title.fontSize +"px",}} */}


    <p className="sd-popUp-customize-title" style={{color:data["popUp"].title.color,fontSize : data["popUp"].title.fontSize +"px",textAlign:data["popUp"].title.alignment}}>test bundle</p>

<div className="sd-popUp-productData-wrapper">

    <div className="sd-popUp-productData">
   
                    <img
                      src={pic}
                      
                    />
                    <p style={{color:data["popUp"].productDetails.title.color,fontSize : data["popUp"].productDetails.title.fontSize +"px"}}>product name</p>
                    <p style={{color:data["popUp"].productDetails.price.color,fontSize : data["popUp"].productDetails.price.fontSize +"px"}}>{currency} 100</p>
                    <select style={{"backgroundColor":data["popUp"].productDetails.variantSelector.backgroundColor,"color":data["popUp"].productDetails.variantSelector.color }}    
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
<div className="sd-popUp-plus-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data["popUp"].productDetails.plusColor}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg>
            </div>

            <div className="sd-popUp-productData">
    
                    <img
                      src={pic}  
                    />
                    <p style={{color:data["popUp"].productDetails.title.color,fontSize : data["popUp"].productDetails.title.fontSize +"px"}}>product name</p>
                    <p style={{color:data["popUp"].productDetails.title.color,fontSize : data["popUp"].productDetails.title.fontSize +"px"}}>Blue</p>
                    <p  style={{color:data["popUp"].productDetails.price.color,fontSize : data["popUp"].productDetails.price.fontSize +"px"}}>{currency} 150</p>
                    {/* <select disabled value="one" style={{"backgroundColor":data.productDetails.variantSelector.backgroundColor,"color":data.productDetails.variantSelector.color }}
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
                     
                    </select> */}

</div>

       </div>         

       <div className="sd-bundle-total-common" style={{"color":data["popUp"].totalSection.color,"fontSize":data["popUp"].totalSection.fontSize+"px","backgroundColor":data["popUp"].totalSection.backgroundColor}}>
       {data["popUp"].totalSection.text}
       <div className="sd-bundle-customization-total-common">
     
<span className="sd-bundle-mrp-price" style={{"color":data["popUp"].totalSection.originalPrice.color,"fontSize":data["popUp"].totalSection.originalPrice.fontSize+"px"}} >
<del>{currency}  1000 </del>
</span>
<span className="sd-bundle-real-price"  style={{"color":data["popUp"].totalSection.finalPrice.color,"fontSize":data["popUp"].totalSection.finalPrice.fontSize+"px"}}>{currency} 600</span>
</div>
      </div>

      {data["popUp"].button.position=="bottom" && <button type="button" className="sd-addToCart-button" style={{"color":data["popUp"].button.color,"fontSize":data["popUp"].button.fontSize+"px","backgroundColor":data["popUp"].button.backgroundColor}}>
        {data["popUp"].button.text_others +" "} </button>
}
  
</div>

    )
}

export default CustomizationPopUpPreview;