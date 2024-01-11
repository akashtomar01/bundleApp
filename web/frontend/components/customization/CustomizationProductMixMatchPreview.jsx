import Title from "antd/es/typography/Title";
import pic from "../../assets/image2.png";
import {
  PlusOutlined
} from "@ant-design/icons";

const CustomizationProductMixMatchPreview = ({data}) =>{
  console.log("check data ****",data);
  return(
    <div>
      <div 
      className="sd-bundle-bundleSection-common sd-bundle-productBundle-preview" 
      style={{"backgroundColor":data.productMixMatch.box.backgroundColor,
      "borderColor": data.productMixMatch.box.borderColor,
      "borderRadius":data.productMixMatch.box.borderRadius+"px",
      "border":data.productMixMatch.box.thickness+"px solid"+ data.buyXgetY.box.borderColor
      }}>
      
      {data.productMixMatch.button.position=="top" && 
        <button
          disabled  
          style={{"color":data.productMixMatch.button.color,
          "fontSize":data.productMixMatch.button.fontSize+"px",
          "backgroundColor":data.productMixMatch.button.backgroundColor}}
        >Add selected to cart
        </button>}

        <div
          style={{"color":data.productMixMatch.title.color,
          "fontSize":data.productMixMatch.title.fontSize +"px",
          "textAlign":data.productMixMatch.title.alignment,
          "fontWeight":data.productMixMatch.title.titleBold,}}
        >new product mix and match test test
        </div>

        <div style={{"color":data.productMixMatch.title.descriptionColor,
          "fontSize":data.productMixMatch.title.descriptionFontSize +"px",
          "fontWeight":data.productMixMatch.title.descriptionBold,}}
        >At least 2 items should be selected
        </div>
      <hr/>
        <div className="productMixMatchHeadBorder centerIntem">
          2+items|50% off
        </div>
        <div>
          <p>You have selected 2 items</p>
          <p>50% discount is applied on the selected products.</p>
        </div>
      <hr/>
        <div>
          <div className="design">
            <div className="designChildDiv">
            <img style={{"border":"1px solid white",
              "borderColor":data.productMixMatch.productDetails.image.borderColor,
              "borderRadius":data.productMixMatch.productDetails.image.borderRadius +"px"}}
              src={pic} width={50}/>
            </div>
            <div className=" sd-bundle-svg-common" 
              style={{background:data.productMixMatch.productDetails.plusBackgroundColor,
                "fontSize": data.productMixMatch.productDetails.plusfontSize +"px"}}
            >
                <PlusOutlined style={{"color": data.productMixMatch.productDetails.plusColor,
                  }}
                /> 
            </div>
            <div className="designChildDiv">
              <img style={{"border":"1px solid white",
                "borderColor":data.productMixMatch.productDetails.image.borderColor,
                "borderRadius":data.productMixMatch.productDetails.image.borderRadius +"px"}}
                src={pic} width={50}/>
            </div>
          </div>

          <div  className="productMixMatchBorder">
            <div className="design">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
                <label>All products</label>
              </div>
              <div className="sd-bundle-showQuantity" 
                style={{"color":data.productMixMatch.productDetails.quantities.color,
                "backgroundColor":data.productMixMatch.productDetails.quantities.backgroundColor,
                "borderColor":data.productMixMatch.productDetails.quantities.borderColor}}
              >2X </div>
            </div>
            <hr/>
            <div>
              <div className="design designChildDiv">
                <div>
                  <input type="checkbox" checked/>
                </div>
                <div className="design">
                  <div className="designChildDiv">
                    <img style={{"border":"1px solid white",
                      "borderColor":data.productMixMatch.productDetails.image.borderColor,
                      "borderRadius":data.productMixMatch.productDetails.image.borderRadius +"px"}}
                      src={pic} width={50}/>
                  </div>
                  <div className="designChildDiv">
                    <p style={{"color":data.productMixMatch.productDetails.title.color,
                      "fontSize":data.productMixMatch.productDetails.title.fontSize +"px"}}
                    >Daisy Dress</p>

                    <p style={{"color":data.productMixMatch.productDetails.price.color,
                      "fontSize":data.productMixMatch.productDetails.price.fontSize +"px"}}
                    >Rs. 550.00</p>

                  </div>
                  <select style={{"backgroundColor":data.productMixMatch.productDetails.variantSelector.backgroundColor,
                    "color":data.productMixMatch.productDetails.variantSelector.color,
                    "borderColor":data.productMixMatch.productDetails.variantSelector.borderColor}}
                    disabled
                  >
                  <option>Select Variant</option>
                </select>
                </div>
              </div>
              {/* <div>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div> */}
                
            </div>
            <hr/>
            <div>
              <div className="design designChildDiv">
                <div>
                  <input type="checkbox" checked/>
                </div>
                <div className="design">
                  <div className="designChildDiv">
                    <img style={{"border":"1px solid white",
                      "borderColor":data.productMixMatch.productDetails.image.borderColor,
                      "borderRadius":data.productMixMatch.productDetails.image.borderRadius +"px"}}
                      src={pic} width={50}/>
                  </div>
                  <div className="designChildDiv">
                    <p style={{"color":data.productMixMatch.productDetails.title.color,
                      "fontSize":data.productMixMatch.productDetails.title.fontSize +"px"}}
                    >Aliam Skirt</p>

                    <p style={{"color":data.productMixMatch.productDetails.price.color,
                      "fontSize":data.productMixMatch.productDetails.price.fontSize +"px"}}
                    >Rs. 560.00</p>
                  </div>
                  <select style={{"backgroundColor":data.productMixMatch.productDetails.variantSelector.backgroundColor,
                    "color":data.productMixMatch.productDetails.variantSelector.color,
                    "borderColor":data.productMixMatch.productDetails.variantSelector.borderColor}}
                    disabled
                  >
                  <option>Select Variant</option>
                </select>
                </div>
              </div>
              {/* <div>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div> */}
                
            </div>
          </div>
            <div className="design productMixMatchBGColor" 
              style={{"backgroundColor":data.productMixMatch.totalSection.backgroundColor}}>
              <div className="designChildDiv"
                style={{"color":data.productMixMatch.totalSection.color,
                  "fontSize":data.productMixMatch.totalSection.fontSize +"px"}}
              >Total</div>
              <div className="design designChildDiv">
                <div style={{"color":data.productMixMatch.totalSection.originalPrice.color,
                  "fontSize":data.productMixMatch.totalSection.originalPrice.fontSize +"px"}}  
                >
                  <del>Rs. 1,070.00</del>
                </div> 
                <div style={{"color":data.productMixMatch.totalSection.finalPrice.color,
                  "fontSize":data.productMixMatch.totalSection.finalPrice.fontSize +"px"}}  >Rs. 535.00</div>
              </div>
            </div>
            <div>
              {data.productMixMatch.button.position=="bottom" && <button disabled  style={{"color":data.productMixMatch.button.color,"fontSize":data.productMixMatch.button.fontSize+"px","backgroundColor":data.productMixMatch.button.backgroundColor}}>Add selected to cart</button>}
            </div>
        </div>
      </div>
      
      
    </div>
  )
}
export default CustomizationProductMixMatchPreview;