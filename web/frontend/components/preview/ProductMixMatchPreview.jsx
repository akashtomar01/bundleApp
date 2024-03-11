import { useEffect, useState } from "react";
import { showAmountWithCurrency } from "../showCurrencyFormat";
import {
  PlusOutlined
} from "@ant-design/icons";

const ProductMixMatchPreview = ({data,mrp,endPrice,currency,discountIndex}) =>{
  console.log('product mix match data****************===**************************',data);
  let freeShipping = "Free Shipping";
  console.log('hello check the values ',mrp,endPrice,currency,discountIndex);
  return(

    <div className="sd-bundle-bundleSection-common sd-bundle-productBundle-statusSection">
      <div className="sd-bundle-bundleSection-heading-common">
        <div>Bundle Preview</div>
        {data.bundleDetail.products.length <= 0 ?
          <div className="sd-preview-wrapper-common sd-productBundle-preview-specific">
            Please select products
          </div>
          :
          <div className="sd-preview-wrapper-common sd-productBundle-preview-specific"
            style={{"backgroundColor":data.customization[0]?.productMixMatch.box.backgroundColor,
            "borderColor": data.customization[0]?.productMixMatch.box.borderColor,
            "borderRadius":data.customization[0]?.productMixMatch.box.borderRadius+"px",
            "border":data.customization[0]?.productMixMatch.box.thickness +"px solid"+data.customization[0]?.productMixMatch.box.borderColor}}
          >
          {data.customization[0]?.productMixMatch.button.position=="top" && 
            <button
              disabled
              style={{"color":data.productMixMatch.button.color,
              "fontSize":data.productMixMatch.button.fontSize+"px",
              "backgroundColor":data.productMixMatch.button.backgroundColor}}
            >Add selected to cart
            </button>
          }
          <>
            <div style={{"color":data.customization[0]?.productMixMatch.title.color,
                "fontSize":data.customization[0]?.productMixMatch.title.fontSize +"px",
                "textAlign":data.customization[0]?.productMixMatch.title.alignment,
                "fontWeight":data.customization[0]?.productMixMatch.title.titleBold,}}
            >{data.title}</div>

            <div style={{"color":data.customization[0]?.productMixMatch.title.descriptionColor,
                "fontSize":data.customization[0]?.productMixMatch.title.descriptionFontSize +"px",
                "fontWeight":data.customization[0]?.productMixMatch.title.descriptionBold,}}
            >{data.description}</div>
          </>
          <hr />

          {data.bundleDetail.discountOptions.map((item,index)=>{
            return(<div key={index}>
              {item.type==="freeShipping"?
                <>
                  {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)? 
                    <div className="productMixMatchHeadBorder centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|{freeShipping}
                    </div>
                  :
                    <div className="productMixMatchHeadBorderDisable centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|{freeShipping}
                    </div>
                  }
                </>
              :item.type === "fixed"?
                <>
                {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)? 
                    <div className="productMixMatchHeadBorder centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items| -{showAmountWithCurrency(item.value,currency)} off
                    </div>
                  :
                    <div className="productMixMatchHeadBorderDisable centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items| -{showAmountWithCurrency(item.value,currency)} off
                    </div>
                  }
                </>
              :item.type === "noDiscount" ?
                <> 
                {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)?
                    <div className="productMixMatchHeadBorder centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|off
                    </div>
                  :
                    <div className="productMixMatchHeadBorderDisable centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|off
                    </div>
                  }
                </>
              :
                <>
                {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)?
                    <div className="productMixMatchHeadBorder centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|{item.value}% off
                    </div>
                  :
                    <div className="productMixMatchHeadBorderDisable centerIntem">
                      {item.quantity}{index === data.bundleDetail.discountOptions.length-1 && "+"} items|{item.value}% off
                    </div>
                  }
                </>
              }
            </div>)
          })
          }
         
          {data?.bundleDetail?.products?.length >= data.bundleDetail.discountOptions[0]?.quantity ? 
            <div>
              <p>You have selected {data?.bundleDetail?.products?.length} items</p>
              <>
                {data.bundleDetail.discountOptions.map((item,index)=>{
                  return(
                    <div key={index}>
                      {item.type==="freeShipping"?
                        <>
                          {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)? 
                            <p>100% {freeShipping} discount is applied on the selected products.</p>
                          : 
                            ""
                          }
                        </>
                      :item.type==="fixed"?
                        <>
                          {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)?
                            <p>-{showAmountWithCurrency(item.value,currency)} discount is applied on the selected products.</p>
                          :
                            ""  
                          }
                        </>
                      :item.type === "noDiscount" ?
                        <>
                          {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)?
                            <p>discount is applied on the selected products.</p>
                          :
                            ""
                          }
                        </>
                      :
                        <>
                          {(item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)?
                            <p>{item?.value}% discount is applied on the selected products.</p>
                          :
                            ""
                          }
                        </>
                      }
                    </div>
                  )
                }
                )}
              </>
              {/* {data.bundleDetail.discountOptions[discountIndex].type==="freeShipping"?
                <p>100% {freeShipping} discount is applied on the selected products.</p>
              :data.bundleDetail.discountOptions[discountIndex].type==="fixed"?
                <p>-{showAmountWithCurrency(data.bundleDetail.discountOptions[discountIndex].value,currency)} discount is applied on the selected products.</p>
              :data.bundleDetail.discountOptions[discountIndex].type === "noDiscount" ?
                <p>discount is applied on the selected products.</p>
              :
                <p>{data?.bundleDetail?.discountOptions[discountIndex]?.value}% discount is applied on the selected products.</p>
              } */}
            </div>
          :
            <div>
              <p>You have selected {data?.bundleDetail?.products?.length} items</p>
              <p>Select at least {data.bundleDetail.discountOptions[discountIndex].quantity} items to apply the discount.</p>
            </div>
          }
          

          <hr />

          <div className="design sd-productMiatch_div sdproductMixMatch_row design sd_bundle_ sd_bundle_thumbnailImg_multiple">
          {data?.bundleDetail?.products?.length>0 && 
            data?.bundleDetail?.products?.map((item,index)=>{
                {/* console.log("check data from map",item.title) */}
                return(
                  <>
                    {data?.bundleDetail?.products.length >1 ? 
                      <>
                        <div className="designChildDiv sd_bundle_thumbnailImg">
                        <img 
                          style={{"border":"1px solid white",
                          "borderColor":data.customization[0]?.productMixMatch.productDetails.image.borderColor,
                          "borderRadius":data.customization[0]?.productMixMatch.productDetails.image.borderRadius +"px"}}
                          src={item?.images[0]?.originalSrc} width={50}/>
                        </div>
                        {index !== data?.bundleDetail?.products?.length-1 &&
                          <div className=" sd-bundle-svg-common" 
                              style={{background:data.customization[0]?.productMixMatch.productDetails.plusBackgroundColor,
                              "fontSize": data.customization[0]?.productMixMatch.productDetails.plusfontSize +"px"}}
                          >
                            <PlusOutlined style={{"color": data.customization[0]?.productMixMatch.productDetails.plusColor}}/>
                          </div>
                        }
                      </>
                      : 
                      ""
                    }
                    
                  </> 
                )
              })
            }
          </div>
          <div  className="sd-preview-wrapper-common sd-productBundle-preview-specific sdproductMixMatch_row">
            <div className="design sd_bundle_producQuantity">
              <div className=" designChildDiv ">
                <input type="checkbox" checked/> <label>All products</label>
              </div>
              <div className="sd-bundle-showQuantity" 
                  style={{"color":data.customization[0]?.productMixMatch.productDetails.quantities.color,
                  "backgroundColor":data.customization[0]?.productMixMatch.productDetails.quantities.backgroundColor,
                  "borderColor":data.customization[0]?.productMixMatch.productDetails.quantities.borderColor}}
                >{data?.bundleDetail?.products?.length}X
              </div>
            </div>
            <hr/>

              {data?.bundleDetail?.products?.length>0 && 
                data?.bundleDetail?.products?.map((item)=>{
                  return(
                    <div className=" designChildDiv_main">
                      <div className="design designChildDiv designChildDiv_main">
                        <div>
                          <input type="checkbox" checked/>
                        </div>
                        <div className="design">
                          <div className="designChildDiv sd_bundle_thumbnailImg">
                            <img
                                style={{"border":"1px solid white",
                                "borderColor":data.customization[0]?.productMixMatch.productDetails.image.borderColor,
                                "borderRadius":data.customization[0]?.productMixMatch.productDetails.image.borderRadius +"px"}}
                            src={item?.images[0]?.originalSrc} width={50}/>
                          </div>
                          <div className="designChildDiv">
                            <p 
                              style={{"color":data.customization[0]?.productMixMatch.productDetails.title.color,
                              "fontSize":data.customization[0]?.productMixMatch.productDetails.title.fontSize +"px"}}
                            >{item?.title}</p>

                            <p
                              style={{"color":data.customization[0]?.productMixMatch.productDetails.price.color,
                              "fontSize":data.customization[0]?.productMixMatch.productDetails.price.fontSize +"px"}}
                            >{showAmountWithCurrency(item?.variants[0]?.price,currency)}</p>

                          </div>
                        </div>
                      </div>
                      <div className="designChildDiv">
                          <select
                            style={{"backgroundColor":data.customization[0]?.productMixMatch.productDetails.variantSelector.backgroundColor,
                            "color":data.customization[0]?.productMixMatch.productDetails.variantSelector.color,
                            "borderColor":data.customization[0]?.productMixMatch.productDetails.variantSelector.borderColor}}
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
                  style={{"backgroundColor":data.customization[0]?.productMixMatch.totalSection.backgroundColor}}
                  >
                  <div className="designChildDiv"
                    style={{"color":data.customization[0]?.productMixMatch.totalSection.color,
                      "fontSize":data.customization[0]?.productMixMatch.totalSection.fontSize +"px"}}
                  >Total</div>
                  <div className="design designChildDiv">
                  {data.bundleDetail.discountOptions[discountIndex].type === "freeShipping" || data.bundleDetail.discountOptions[discountIndex].type === "noDiscount" || data.bundleDetail.products.length<2 ?
                    <div
                      style={{"color":data.customization[0]?.productMixMatch.totalSection.finalPrice.color,
                        "fontSize":data.customization[0]?.productMixMatch.totalSection.finalPrice.fontSize +"px"}}  
                        >
                          <p>{showAmountWithCurrency(endPrice,currency)}</p>
                    </div>
                    :
                    <>
                      <div 
                     style={{"color":data.customization[0]?.productMixMatch.totalSection.originalPrice.color,
                      "fontSize":data.customization[0]?.productMixMatch.totalSection.originalPrice.fontSize +"px"}} 
                      >
                        <del>{showAmountWithCurrency(mrp,currency)}</del>
                      </div>
                      <div 
                      style={{"color":data.customization[0]?.productMixMatch.totalSection.finalPrice.color,
                        "fontSize":data.customization[0]?.productMixMatch.totalSection.finalPrice.fontSize +"px"}}  
                        ><p>{showAmountWithCurrency(endPrice,currency)}</p></div>
                    </>
                  } 
                    
                  </div>
                </div>
              <div>
                {data.customization[0]?.productMixMatch.button.position=="bottom" &&
                  <button disabled  className="add_select_cartbtn"
                  style={{"color":data.customization[0]?.productMixMatch.button.color,"fontSize":data.customization[0]?.productMixMatch.button.fontSize+"px","backgroundColor":data.customization[0]?.productMixMatch.button.backgroundColor}}
                  >Add selected to cart</button>
                }
              </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductMixMatchPreview;