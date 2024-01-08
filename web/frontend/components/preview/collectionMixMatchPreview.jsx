import React from "react";
// import { useAPI} from "../shop"
import { Divider } from "antd";
import {PlusOutlined} from '@ant-design/icons';

import pic from "../../assets/image2.png";
import EmptyPreview from "../commonSections/emptyPreview";
const CollectionMixMatchPreview=({data})=>{
// const {currency}=useAPI();
// console.log('check collection data****',data);

    return (
        <div className="sd-bundle-bundleSection-common">
<div className="sd-bundle-bundleSection-heading-common">Preview</div>
{data.bundleDetail.products.length > 0  ?
<div className="sd-collection-customise-preview sd-preview-wrapper-common sd-only-collection" style={{backgroundColor:data.customization[0].collectionMixMatch.box.backgroundColor,borderRadius:data.customization[0].collectionMixMatch.box.borderRadius+"px",borderColor:data.customization[0].collectionMixMatch.box.borderColor}}>
     
<div className="sd-collection-discount-badge"  style={{color:data.customization[0].collectionMixMatch.DiscountBadge.color,backgroundColor:data.customization[0].collectionMixMatch.DiscountBadge.backgroundColor,fontSize:data.customization[0].collectionMixMatch.DiscountBadge.fontSize+"px"}} >
    <span>{data.customization[0].collectionMixMatch.DiscountBadge.text}</span>  
 </div>
<div className="sd-collection-main-section">
<div className="sd-collection-customise-titleSection" style={{textAlign:data.customization[0].collectionMixMatch.title.alignment}}>
    <p className="sd-collection-customise-titleNaming" style={{color:data.customization[0].collectionMixMatch.title.color,fontSize : data.customization[0].collectionMixMatch.title.fontSize +"px",}}>
{data.title} </p>
    <div className="sd-collection-customise-description" style={{color:data.customization[0].collectionMixMatch.title.description.color,fontSize:data.customization[0].collectionMixMatch.title.description.fontSize +"px",}}>
    {data.bundleDetail.description ==
              "Buy products from below collections,Save {discount}" ? (
                <p>
                  <span>Buy products from below collections,Save </span>
                  <span>
                    {data.bundleDetail.discountType == "fixed"
                    
                      ? data.currency + " "
                      : "" }
                  </span>
                  <span>
                    {data.bundleDetail.discountType == "percent" || data.bundleDetail.discountType == "fixed"
                      ? data.bundleDetail.discountValue
                
                      : null}
                  </span>
                  <span>
                   {
                    data.bundleDetail.discountType=="percent" ? "%" : "" 
                   }
                  </span>
                </p>
              ) : (
                data.bundleDetail.description
              )}
        
        </div>
</div>
<div style={{backgroundColor:(data.customization[0].collectionMixMatch.theme == "dark" ? "#FFFFFF" :null)}}><Divider/></div>

{data.bundleDetail.products.map((item,index)=>
<>
<div className="sd-selected-collection" >
 
 <div className="sd-selected-collection-data">
   <div>
  <p style={{color:data.customization[0].collectionMixMatch.collectionDetails.title.color,fontSize:data.customization[0].collectionMixMatch.collectionDetails.title.fontSize +"px"}}>{item.title}          Collection</p>
<p style={{color:data.customization[0].collectionMixMatch.collectionDetails.description.color,fontSize:data.customization[0].collectionMixMatch.collectionDetails.description.fontSize +"px"}}>Add {item.quantity} items from {item.title} collection</p> </div>
  </div>
   <div className="sd-selected-collection-img" >
                  
                    <img
                      src={ item?.image ? item?.image?.originalSrc : pic}
                      
                    style={{borderColor:data.customization[0].collectionMixMatch.collectionDetails.imageBorderColor}}/>
                  </div> 
                  </div>
{index !== data.bundleDetail.products.length -1 &&
<div className="sd-bundle-svg-common" style={{backgroundColor:data.customization[0].collectionMixMatch.collectionDetails.plus.backgroundColor}}>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data.customization[0].collectionMixMatch.collectionDetails.plus.color}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg> */}
           
           <PlusOutlined style={{  color: data.customization[0].collectionMixMatch.collectionDetails.plusColor }} />
           
            </div>

}
</>
)}

      <button
          type="button"
          className="sd-addToCart-button"         
        >
        {data.customization[0].collectionMixMatch.button.text_others}
        </button>
</div>
      </div>
    :
      <EmptyPreview  type="collection"/>

}
    </div>
      
    )
}

export default CollectionMixMatchPreview;