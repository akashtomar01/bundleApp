import React from 'react'
import EmptyPreview from '../commonSections/emptyPreview'
import { showAmountWithCurrency } from '../showCurrencyFormat'

const BxgyBundlePreviewData = ({ data,currency,mrp,endPrice,showPrice,handleVariantChoice,}) => {
  console.log(data)
  return (
   
  <div className="sd-bundle-bundleSection-common sd-bundle-productBundle-preview first-previewCard">
      <div className="sd-bundle-bundleSection-heading-common">Preview</div>
      
  { data.bundleDetail.xproducts.length && data.bundleDetail.yproducts.length > 0 ? <div class="sd-preview-wrapper-common sd-productBundle-preview-specific" style={{"backgroundColor":data.customization[0].buyXgetY.box.backgroundColor,"border":data.customization[0].buyXgetY.box.thickness+"px solid"+ data.customization[0].buyXgetY.box.borderColor,"borderRadius":data.customization[0].buyXgetY.box.borderRadius+"px"}}>
{data.customization[0].buyXgetY.button.position=="top" &&
        <div class="bxgy_productT_Cart-bottom">
            <button style={{"color":data.customization[0].buyXgetY.button.color,"fontSize":data.customization[0].buyXgetY.button.fontSize+"px","backgroundColor":data.customization[0].buyXgetY.button.backgroundColor}}>Add to Cart</button>
        </div>}
        <h5 style={{"color":data.customization[0].buyXgetY.title.color, "fontSize": data.customization[0].buyXgetY.title.fontSize + "px","fontWeight":data.customization[0].buyXgetY.title.titleBold,"textAlign":data.customization[0].buyXgetY.title.alignment }}>{data.title}</h5>
        <p style={{"color":data.customization[0].buyXgetY.title.descriptionColor, "fontSize": data.customization[0].buyXgetY.title.descriptionFontSize + "px","fontWeight":data.customization[0].buyXgetY.title.descriptionBold,"textAlign":data.customization[0].buyXgetY.title.alignment  }}>Bundle description</p>
        <div class="bxgy_productsListing_main">
           {data.bundleDetail.xproducts.map((item,index)=>{
            return (
              <>

 <div class="bxgy_products_listing">
 <div style={{"borderColor":data.customization[0].buyXgetY.productDetails.image.borderColor,"borderRadius":data.customization[0].buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
     <img style={{"borderRadius":data.customization[0].buyXgetY.productDetails.image.borderRadius+"px"}} src={ item?.images[0]?.originalSrc
                                  ?  item?.images[0]?.originalSrc
                                  : "https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"}></img>
 </div>
 <div class="bxgy_product_listingText">
     <h6  style={{"color":data.customization[0].buyXgetY.productDetails.title.color,"fontSize":data.customization[0].buyXgetY.productDetails.title.fontSize +"px"}}>{item.title}</h6>

     <span style={{"color":data.customization[0].buyXgetY.productDetails.price.color,"fontSize":data.customization[0].buyXgetY.productDetails.price.fontSize+"px"}}> {showPrice[index]?
                           showAmountWithCurrency(showPrice[index],currency)
                           :
                           showAmountWithCurrency(item.variants[0]?.price,currency)}</span>
 </div>
 <div style={{"color":data.customization[0].buyXgetY.productDetails.quantities.color,"backgroundColor":data.customization[0].buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.customization[0].buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
     <h3 style={{"color":data.customization[0].buyXgetY.productDetails.quantities.color}}>{item.minimumOrder}X</h3>
 </div>
</div>
{item.variants.length > 1 && <div class="bxgy_product_variant_main">
               
                      {
                       Array.from({ length: item.minimumOrder }).map((emptyItem,index)=>{return (

                       
                        <div class="bxgy_product_variant">
                            <h6 style={{"color":data.customization[0].buyXgetY.productDetails.variantSelector.color }}>{index+1}</h6>
                            <div class="bxgy_selected_field">
                                <select style={{"backgroundColor":data.customization[0].buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.customization[0].buyXgetY.productDetails.variantSelector.color,"borderColor":data.customization[0].buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                             {
                              item.variants.map((vItem,i)=>{
                                return(
                                  <option>{vItem.title}</option>

                                )
                              })
                             }
                          
                          </select>
                            </div>
                        </div>
)})
                        }
                    
                </div>}
</>
            )
           })}

        
        </div>

        <div class="bxgy_plusProduct_icon">
            <h5>+</h5>
        </div>

        <div class="bxgy_productsListing_main">
          {data.customization[0].buyXgetY.DiscountBadge.badgeType == "rightBanner" ?
  <div class="bxgy_productDiscount_badges" style={{"background": data.customization[0].buyXgetY.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.customization[0].buyXgetY.DiscountBadge.color, "fontSize": data.customization[0].buyXgetY.DiscountBadge.fontSize +"px"}}>{ data.customization[0].buyXgetY.DiscountBadge.text}</h5>
</div>
: data.customization[0].buyXgetY.DiscountBadge.badgeType == "leftBanner" ?
<div class="bxgy_productDiscount_badges left" style={{"background": data.customization[0].buyXgetY.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.customization[0].buyXgetY.DiscountBadge.color, "fontSize": data.customization[0].buyXgetY.DiscountBadge.fontSize +"px"}}>{ data.customization[0].buyXgetY.DiscountBadge.text}</h5>
</div> 
: data.customization[0].buyXgetY.DiscountBadge.badgeType == "ribbon" ? 
<div class="dis-ribbon" >
  <span  style={{"background": data.customization[0].buyXgetY.DiscountBadge.backgroundColor,"color": data.customization[0].buyXgetY.DiscountBadge.color, "fontSize": data.customization[0].buyXgetY.DiscountBadge.fontSize +"px"}}>{ data.customization[0].buyXgetY.DiscountBadge.text}</span>
  </div> : null
          }
        
         
{data.bundleDetail.yproducts.map((item,index)=>{
  return(
<>
<div class="bxgy_products_listing second">
            <div style={{"borderColor":data.customization[0].buyXgetY.productDetails.image.borderColor,"borderRadius":data.customization[0].buyXgetY.productDetails.image.borderRadius+"px"}} class="bxgy_product_listingImg">
                    <img style={{"borderRadius":data.customization[0].buyXgetY.productDetails.image.borderRadius+"px"}} src={ item?.images[0]?.originalSrc
                                  ?  item?.images[0]?.originalSrc
                                  : "https://cdn.shopify.com/s/files/1/0801/7264/6691/files/dummyImage.jpg?v=1700561335"}></img>
                </div>
                <div class="bxgy_product_listingText">
                <h6  style={{"color":data.customization[0].buyXgetY.productDetails.title.color,"fontSize":data.customization[0].buyXgetY.productDetails.title.fontSize +"px"}}>{item.title}</h6>

<span style={{"color":data.customization[0].buyXgetY.productDetails.price.color,"fontSize":data.customization[0].buyXgetY.productDetails.price.fontSize+"px"}}>{showPrice[index]?
                           showAmountWithCurrency(showPrice[index],currency)
                           :
                           showAmountWithCurrency(item.variants[0]?.price,currency)}</span>
                </div>
                <div style={{"color":data.customization[0].buyXgetY.productDetails.quantities.color,"backgroundColor":data.customization[0].buyXgetY.productDetails.quantities.backgroundColor,"borderColor":data.customization[0].buyXgetY.productDetails.quantities.borderColor}} class="bxgy_product_listingClose">
                    <h3 style={{"color":data.customization[0].buyXgetY.productDetails.quantities.color}}>{item.minimumOrder}X</h3>
                </div>
            </div>

            {item.variants.length > 1 && <div class="bxgy_product_variant_main">
               
               {
                Array.from({ length: item.minimumOrder }).map((emptyItem,index)=>{return (

                
                 <div class="bxgy_product_variant">
                     <h6 style={{"color":data.customization[0].buyXgetY.productDetails.variantSelector.color }}>{index+1}</h6>
                     <div class="bxgy_selected_field">
                         <select style={{"backgroundColor":data.customization[0].buyXgetY.productDetails.variantSelector.backgroundColor,"color":data.customization[0].buyXgetY.productDetails.variantSelector.color,"borderColor":data.customization[0].buyXgetY.productDetails.variantSelector.borderColor }} class="selectpicker">
                      {
                       item.variants.map((vItem,i)=>{
                         return(
                           <option>{vItem.title}</option>

                         )
                       })
                      }
                   
                   </select>
                     </div>
                 </div>
)})
                 }
             
         </div>}
</>
  )
})
         }
 
        </div>

        <div class="bxgy_productTotal" style={{"backgroundColor":data.customization[0].buyXgetY.totalSection.background}}>
            <div class="bxgy_productTotal_text">
                <h4  style={{"color":data.customization[0].buyXgetY.totalSection.color,"fontSize":data.customization[0].buyXgetY.totalSection.fontSize +"px"}}>Total</h4>
            </div>
            <div class="bxgy_productTotal_price">
                <h3 style={{"color":data.customization[0].buyXgetY.totalSection.originalPrice.color,"fontSize":data.customization[0].buyXgetY.totalSection.originalPrice.fontSize +"px"}}>$567</h3>
                <span style={{"color":data.customization[0].buyXgetY.totalSection.finalPrice.color,"fontSize":data.customization[0].buyXgetY.totalSection.finalPrice.fontSize +"px"}}>$8787</span>
            </div>

        </div>
        {data.customization[0].buyXgetY.button.position=="bottom" &&
        <div class="bxgy_productT_Cart">
            <button style={{"color":data.customization[0].buyXgetY.button.color,"fontSize":data.customization[0].buyXgetY.button.fontSize+"px","backgroundColor":data.customization[0].buyXgetY.button.backgroundColor}}>Add to Cart</button>
        </div>}
    </div> :
     <EmptyPreview type={""} />
    }
    </div>
  )
}

export default BxgyBundlePreviewData