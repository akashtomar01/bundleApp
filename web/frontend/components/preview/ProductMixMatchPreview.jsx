import { useEffect, useState } from "react";
import { showAmountWithCurrency } from "../showCurrencyFormat";

const ProductMixMatchPreview = ({data,mrp,endPrice,currency}) =>{
  // console.log('product mix match data******************************************',data);
  let freeShipping = "Free Shipping";

  return(

    <div className="sd-bundle-bundleSection-common sd-bundle-productBundle-statusSection">
      <div className="sd-bundle-bundleSection-heading-common">
        <div>Bundle Preview</div>
        {data.bundleDetail.products.length <= 0 ?
          <>
            Please select products
          </>
          :
          <div  className="sd-preview-wrapper-common sd-productBundle-preview-specific"
            style={{"backgroundColor":data.customization[0].productMixMatch.box.backgroundColor,
            "borderColor": data.customization[0].productMixMatch.box.borderColor,
            "borderRadius":data.customization[0].productMixMatch.box.borderRadius+"px",
            "border":data.customization[0].productMixMatch.box.thickness +"px solid"+data.customization[0].productMixMatch.box.borderColor}}
          >
          {/* {data.productMixMatch.button.position=="top" && 
          <button
            disabled  
            style={{"color":data.productMixMatch.button.color,
            "fontSize":data.productMixMatch.button.fontSize+"px",
            "backgroundColor":data.productMixMatch.button.backgroundColor}}
          >Add selected to cart
          </button>} */}
          <>
            <div style={{}}
            >{data.title}</div>

            <div 
            >{data.description}</div>
          </>
          <hr />
          {data.bundleDetail.discountOptions[0].type==="freeShipping"?
          <div className="productMixMatchHeadBorder centerIntem">
            {data.bundleDetail.discountOptions[0].quantity}+items|{freeShipping}
          </div>:
          <div className="productMixMatchHeadBorder centerIntem">
            {data.bundleDetail.discountOptions[0].quantity}+items|{data.bundleDetail.discountOptions[0].value}% off
          </div>
          }
          
          {data?.bundleDetail?.products?.length >= data.bundleDetail.discountOptions[0].quantity ? 
            <div>
              <p>You have selected {data?.bundleDetail?.products?.length} items</p>
              {data.bundleDetail.discountOptions[0].type==="freeShipping"?
                <p>100% {freeShipping} discount is applied on the selected products.</p>:

              <p>{data?.bundleDetail?.discountOptions[0]?.value}% discount is applied on the selected products.</p>
              }
            </div>:
            <div>
              <p>You have selected {data?.bundleDetail?.products?.length} items</p>
              <p>Select at least {data.bundleDetail.discountOptions[0].quantity} items to apply the discount.</p>
            </div>
          }
          

          <hr />

          <div className="design">
          {data?.bundleDetail?.products?.length>0 && 
            data?.bundleDetail?.products?.map((item,index)=>{
                {/* console.log("check data from map",item.title) */}
                return(
                  <div className="designChildDiv">
                    <img src={item?.images[0]?.originalSrc} width={50}/>
                  </div>
                )
              })
            }
          </div>
          <div  className="sd-preview-wrapper-common sd-productBundle-preview-specific">
            <div className="design">
              <div className=" designChildDiv">
                <input type="checkbox" checked/> <label>All products</label>
              </div>
              <div className="sd-bundle-showQuantity  designChildDiv" 
                  // style={{"color":data.productMixMatch.productDetails.quantities.color,
                  // "backgroundColor":data.productMixMatch.productDetails.quantities.backgroundColor,
                  // "borderColor":data.productMixMatch.productDetails.quantities.borderColor}}
                >{data?.bundleDetail?.products?.length}X </div>
              </div>
              <hr/>

              {data?.bundleDetail?.products?.length>0 && 
                data?.bundleDetail?.products?.map((item)=>{
                  return(
                    <div>
                      <div className="design designChildDiv">
                        <div>
                          <input type="checkbox" checked/>
                        </div>
                        <div className="design">
                          <div className="designChildDiv">
                            <img
                            // style={{"border":"1px solid white",
                            //   "borderColor":data.productMixMatch.productDetails.image.borderColor,
                            //   "borderRadius":data.productMixMatch.productDetails.image.borderRadius +"px"}}
                            src={item?.images[0]?.originalSrc} width={50}/>
                          </div>
                          <div className="designChildDiv">
                            <p 
                            // style={{"color":data.productMixMatch.productDetails.title.color,
                            //   "fontSize":data.productMixMatch.productDetails.title.fontSize +"px"}}
                            >{item?.title}</p>

                            <p 
                            // style={{"color":data.productMixMatch.productDetails.price.color,
                            //   "fontSize":data.productMixMatch.productDetails.price.fontSize +"px"}}
                            >{showAmountWithCurrency(item?.variants[0]?.price,currency)}</p>

                          </div>
                        </div>
                      </div>
                      <div className="designChildDiv">
                          <select
                          // style={{"backgroundColor":data.productMixMatch.productDetails.variantSelector.backgroundColor,
                          //   "color":data.productMixMatch.productDetails.variantSelector.color,
                          //   "borderColor":data.productMixMatch.productDetails.variantSelector.borderColor}}
                            disabled
                          >
                          <option>Select Variant</option>
                        </select>
                      </div>
                    </div>
                  )
                })
              }
            </div>
              <div className="design productMixMatchBGColor" 
                  // style={{"backgroundColor":data.productMixMatch.totalSection.backgroundColor}}
                  >
                  <div className="designChildDiv"
                    // style={{"color":data.productMixMatch.totalSection.color,
                    //   "fontSize":data.productMixMatch.totalSection.fontSize +"px"}}
                  >Total</div>
                  <div className="design designChildDiv">
                  {data.bundleDetail.discountOptions[0].type === "freeShipping" || data.bundleDetail.discountOptions[0].type === "noDiscount"?
                  <div 
                    // style={{"color":data.productMixMatch.totalSection.finalPrice.color,
                    //   "fontSize":data.productMixMatch.totalSection.finalPrice.fontSize +"px"}}  
                      ><p>{showAmountWithCurrency(endPrice,currency)}</p></div>
                      :
                      <>
                        <div 
                      //  style={{"color":data.productMixMatch.totalSection.originalPrice.color,
                      //   "fontSize":data.productMixMatch.totalSection.originalPrice.fontSize +"px"}} 
                        >
                          <del>{showAmountWithCurrency(mrp,currency)}</del>
                        </div>
                        <div 
                        // style={{"color":data.productMixMatch.totalSection.finalPrice.color,
                        //   "fontSize":data.productMixMatch.totalSection.finalPrice.fontSize +"px"}}  
                          ><p>{showAmountWithCurrency(endPrice,currency)}</p></div>
                      </>
                  }
                    
                  </div>
                </div>
              <div>
                {/* {data.productMixMatch.button.position=="bottom" && */}
                  <button disabled  
                  // style={{"color":data.productMixMatch.button.color,"fontSize":data.productMixMatch.button.fontSize+"px","backgroundColor":data.productMixMatch.button.backgroundColor}}
                  >Add selected to cart</button>
                {/* } */}
              </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductMixMatchPreview;