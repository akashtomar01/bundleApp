import React, { useState } from "react" ;
import { Icon } from "@shopify/polaris";
import { useAPI } from "../shop";
// import pic from   './image.jpg';
import {PlusOutlined} from '@ant-design/icons';
import pic from "../../assets/image2.png";
const CustomizationBuyXgetY = ({data}) => {
    const {currency}=useAPI();
const discount=40;
// console.log("hello check bxgy",data)
  return (
//     <div className="sd-preview-wrapper-common sd-productCustom-preview"  style={{"backgroundColor":data.buyXgetY.box.backgroundColor,"borderColor": data.buyXgetY.box.borderColor,"borderRadius":data.buyXgetY.box.borderRadius+"px"}} >

//     {data.buyXgetY.button.position=="top" && <button type="button" style={{"color":data.buyXgetY.button.color,"fontSize":data.buyXgetY.button.fontSize+"px","backgroundColor":data.buyXgetY.button.backgroundColor}}>
//           {data.buyXgetY.button.text_others +" "}{discount}% </button>
//   }
//   <div className="sd-preview-title-common" style={{"color":data.buyXgetY.title.color,"fontSize":data.buyXgetY.title.fontSize +"px","textAlign":data.buyXgetY.title.alignment}}>Bundle Title</div>
//                     <div className="sd-preview-data-section-common">
//               <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
//             <div className="sd-custom-image-container">
          
//             <img  src={pic} style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} />
             
//              </div>
//               <div className="sd-bundle-title-price">
//                 <div style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Product Name</div>
               
//                 <div style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>
//                   {currency}{" "}
//                  500
//                 </div>
//               </div>
//               </div>
//               <div className="sd-bundle-showQuantity" style={{"color":data.buyXgetY.productDetails.quantities.color,"backgroundColor":data.buyXgetY.productDetails.quantities.backgroundColor}}>2X </div>
//             </div>
               
//                     <div className="sd-preview-variant-selection-common">
//                     <p style={{color:data.buyXgetY.productDetails.variantSelector.color}}>1</p>
//                     <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color }}     
//                       >
//                         <option
//                           value="select"
//                         >
//                           {" "}
//                           Select Variant{" "}
//                         </option>
  
//                             <option
//                               value="one"
//                               data-varindex="3"
//                             >
//                              variant one
//                             </option>
//                             <option
//                               value="two"
//                               data-varindex="3"
//                             >
//                              variant two
//                             </option>
                       
//                       </select>
//                     </div>
                 
//                     <div className="sd-preview-variant-selection-common">
//                       <p style={{color:data.buyXgetY.productDetails.variantSelector.color}}>2</p>
//                       <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color }}     
//                       >
//                         <option
//                           value="select"
//                         >
//                           {" "}
//                           Select Variant{" "}
//                         </option>
  
//                             <option
//                               value="one"
//                               data-varindex="3"
//                             >
//                              variant one
//                             </option>
//                             <option
//                               value="two"
//                               data-varindex="3"
//                             >
//                              variant two
//                             </option>
                       
//                       </select>
//                     </div>
       
//               <div className="sd-bundle-svg-common" style={{background:data.buyXgetY.productDetails.plusBackgroundColor}}>
//                 {/* <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   width="25px"
//                   fill={data.productDetails.plusColor}
//                 >
//                   <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
//                 </svg> */}
  
//                 <PlusOutlined style={{  color: data.buyXgetY.productDetails.plusColor }} />
  
  
  
//               </div>
           
             
            
  
//   <div className="sd-preview-data-section-common">
//               <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
//             <div>
          
//             <img  src={pic} style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} />
             
//              </div>
//               <div className="sd-bundle-title-price">
//                 <div style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Product Name</div>
               
//                 <div style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>
//                   {currency}{" "}
//                  500
//                 </div>
//               </div>
//               </div>
             
//             </div>
               
//                   <br/>
          
//         <div className="sd-bundle-total-common" style={{"color":data.buyXgetY.totalSection.color,"backgroundColor":data.buyXgetY.totalSection.backgroundColor,"fontSize":data.buyXgetY.totalSection.fontSize +"px"}}>
//          <p>{data.buyXgetY.totalSection.text}</p>
//           <div className="sd-bundle-customization-total-common">
       
//   <span className="sd-bundle-mrp-price" style={{"color":data.buyXgetY.totalSection.originalPrice.color,"fontSize":data.buyXgetY.totalSection.originalPrice.fontSize +"px"}} >
//   <del>{currency}  1000 </del>
//   </span>
//   <span className="sd-bundle-real-price"  style={{"color":data.buyXgetY.totalSection.finalPrice.color,"fontSize":data.buyXgetY.totalSection.finalPrice.fontSize +"px"}}>{currency} 600</span>
//   </div>
//         </div>
//        {data.buyXgetY.button.position=="bottom" && <button type="button" className="sd-addToCart-button" style={{"color":data.buyXgetY.button.color,"fontSize":data.buyXgetY.button.fontSize+"px","backgroundColor":data.buyXgetY.button.backgroundColor}}>
//           {data.buyXgetY.button.text_others }</button>
//   }
//     </div>
<div class="sd-preview-wrapper-common sd-productCustom-preview" style={{"backgroundColor":data.buyXgetY.box.backgroundColor,"border":data.buyXgetY.box.thickness+"px solid"+ data.buyXgetY.box.borderColor,"borderRadius":data.buyXgetY.box.borderRadius+"px"}}>
{data.buyXgetY.button.position=="top" &&
        <div class="bxgy_productT_Cart-bottom">
            <button style={{"color":data.buyXgetY.button.color,"fontSize":data.buyXgetY.button.fontSize+"px","backgroundColor":data.buyXgetY.button.backgroundColor}}>Add to Cart</button>
        </div>}
        <h5 style={{"color":data.buyXgetY.title.color, "fontSize": data.buyXgetY.title.fontSize + "px","fontWeight":data.buyXgetY.title.titleBold,"textAlign":data.buyXgetY.title.alignment }}>Bundle Title</h5>
        <p style={{"color":data.buyXgetY.title.descriptionColor, "fontSize": data.buyXgetY.title.descriptionFontSize + "px","fontWeight":data.buyXgetY.title.descriptionBold,"textAlign":data.buyXgetY.title.alignment  }}>Bundle description</p>
        <div class="bxgy_productsListing_main">
            <div class="bxgy_products_listing">
                <div style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
                    <img style={{"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"></img>
                </div>
                <div class="bxgy_product_listingText">
                    <h6  style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Sample product</h6>

                    <span style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>$5666</span>
                </div>
                <div style={{"color":data.buyXgetY.productDetails.quantities.color,"backgroundColor":data.buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
                    <h3 style={{"color":data.buyXgetY.productDetails.quantities.color}}>5X</h3>
                </div>
            </div>

            <div class="bxgy_productsListing_Column">
                <div class="bxgy_products_listing">
                <div style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
                    <img style={{"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"></img>
                </div>
                    <div class="bxgy_product_listingText">
                    <h6  style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Sample product</h6>

<span style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>$5666</span>
                    </div>
                    <div style={{"color":data.buyXgetY.productDetails.quantities.color,"backgroundColor":data.buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
                    <h3 style={{"color":data.buyXgetY.productDetails.quantities.color}}>5X</h3>
                </div>
                </div>


                <div class="bxgy_product_variant_main">
                    <div class="bxgy_product_variant">
                        <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>1</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>2</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>3</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bxgy_plusProduct_icon">
            <h5>+</h5>
        </div>

        <div class="bxgy_productsListing_main">
          {data.buyXgetY.DiscountBadge.badgeType == "rightBanner" ?
  <div class="bxgy_productDiscount_badges" style={{"background": data.buyXgetY.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.buyXgetY.DiscountBadge.color, "fontSize": data.buyXgetY.DiscountBadge.fontSize +"px"}}>{ data.buyXgetY.DiscountBadge.text}</h5>
</div>
: data.buyXgetY.DiscountBadge.badgeType == "leftBanner" ?
<div class="bxgy_productDiscount_badges left" style={{"background": data.buyXgetY.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.buyXgetY.DiscountBadge.color, "fontSize": data.buyXgetY.DiscountBadge.fontSize +"px"}}>{ data.buyXgetY.DiscountBadge.text}</h5>
</div> 
: data.buyXgetY.DiscountBadge.badgeType == "ribbon" ? 
<div style={{"background": data.buyXgetY.DiscountBadge.backgroundColor}} class="dis-ribbon" >
  <span style={{"color": data.buyXgetY.DiscountBadge.color, "fontSize": data.buyXgetY.DiscountBadge.fontSize +"px"}} >{ data.buyXgetY.DiscountBadge.text}</span>
  </div> : null
          }
        
         

            <div class="bxgy_products_listing second">
            <div style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
                    <img style={{"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"></img>
                </div>
                <div class="bxgy_product_listingText">
                <h6  style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Sample product</h6>

<span style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>$5666</span>
                </div>
                <div style={{"color":data.buyXgetY.productDetails.quantities.color,"backgroundColor":data.buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
                    <h3 style={{"color":data.buyXgetY.productDetails.quantities.color}}>5X</h3>
                </div>
            </div>

            <div class="bxgy_productsListing_Column">
                <div class="bxgy_product_variant_main">
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>1</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>2</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>3</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bxgy_products_listing second">
            <div style={{"borderColor":data.buyXgetY.productDetails.image.borderColor,"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
                    <img style={{"borderRadius":data.buyXgetY.productDetails.image.borderRadius+"px"}} src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"></img>
                </div>
                <div class="bxgy_product_listingText">
                <h6  style={{"color":data.buyXgetY.productDetails.title.color,"fontSize":data.buyXgetY.productDetails.title.fontSize +"px"}}>Sample product</h6>

<span style={{"color":data.buyXgetY.productDetails.price.color,"fontSize":data.buyXgetY.productDetails.price.fontSize+"px"}}>$5666</span>
                </div>
                <div style={{"color":data.buyXgetY.productDetails.quantities.color,"backgroundColor":data.buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
                    <h3 style={{"color":data.buyXgetY.productDetails.quantities.color}}>5X</h3>
                </div>
            </div>
            <div class="bxgy_productsListing_Column">
                <div class="bxgy_product_variant_main">
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>1</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>2</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                    <div class="bxgy_product_variant">
                    <h6 style={{"color":data.buyXgetY.productDetails.variantSelector.color }}>3</h6>
                        <div class="bxgy_selected_field">
                            <select style={{"backgroundColor":data.buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.buyXgetY.productDetails.variantSelector.color,"borderColor":data.buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                        <option>Select Variant</option>
                      </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bxgy_productTotal" style={{"backgroundColor":data.buyXgetY.totalSection.background}}>
            <div class="bxgy_productTotal_text">
                <h4  style={{"color":data.buyXgetY.totalSection.color,"fontSize":data.buyXgetY.totalSection.fontSize +"px"}}>Total</h4>
            </div>
            <div class="bxgy_productTotal_price">
                <h3 style={{"color":data.buyXgetY.totalSection.originalPrice.color,"fontSize":data.buyXgetY.totalSection.originalPrice.fontSize +"px"}}>$567</h3>
                <span style={{"color":data.buyXgetY.totalSection.finalPrice.color,"fontSize":data.buyXgetY.totalSection.finalPrice.fontSize +"px"}}>$8787</span>
            </div>

        </div>
        {data.buyXgetY.button.position=="bottom" &&
        <div class="bxgy_productT_Cart">
            <button style={{"color":data.buyXgetY.button.color,"fontSize":data.buyXgetY.button.fontSize+"px","backgroundColor":data.buyXgetY.button.backgroundColor}}>Add to Cart</button>
        </div>}
    </div>


  )
}

export default CustomizationBuyXgetY