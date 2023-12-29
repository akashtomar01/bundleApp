import React from "react";
import { useAPI } from "../shop";
import { Divider } from "antd";
import {PlusOutlined} from '@ant-design/icons';
import pic from "../../assets/image2.png"
const CustomizationCollectionBundlePreview=({data})=>{
const {currency}=useAPI();


    return (

      <div className="sd-collection-customise-preview sd-preview-wrapper-common" style={{backgroundColor:data["collection"]["box"]["backgroundColor"],borderRadius:data["collection"]["box"]["borderRadius"]+"px",borderColor:data["collection"]["box"]["borderColor"]}}>

      
{/* <div className="sd-collection-discount-badge"  style={{color:data["collection"]["DiscountBadge"]["color"],backgroundColor:data["collection"]["DiscountBadge"]["backgroundColor"],fontSize:data["collection"]["DiscountBadge"]["fontSize"]+"px",borderTopLeftRadius:data["collection"]["box"]["borderRadius"]+"px"}} >{data["collection"]["DiscountBadge"]["text"]}</div> */}

<div className="sd-collection-main-section">
{data.collection.DiscountBadge.badgeType == "rightBanner" ?
<div class="bxgy_productDiscount_badges" style={{"background": data.collection.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.collection.DiscountBadge.color, "fontSize": data.collection.DiscountBadge.fontSize +"px"}}>{ data.collection.DiscountBadge.text}</h5>
</div>
: data.collection.DiscountBadge.badgeType == "leftBanner" ? 
<div class="bxgy_productDiscount_badges left" style={{"background": data.collection.DiscountBadge.backgroundColor}}>
  <h5 style={{"color": data.collection.DiscountBadge.color, "fontSize": data.collection.DiscountBadge.fontSize +"px"}}>{ data.collection.DiscountBadge.text}</h5>
</div> 
 : data.collection.DiscountBadge.badgeType == "ribbon" ? 
<div class="dis-ribbon" >
  <span  style={{"background": data.collection.DiscountBadge.backgroundColor,"color": data.collection.DiscountBadge.color, "fontSize": data.collection.DiscountBadge.fontSize +"px"}}>{ data.collection.DiscountBadge.text}</span>
  </div> 
  : null 
          } 
<div className="sd-collection-customise-titleSection" style={{textAlign:data["collection"]["title"]["alignment"]}}>
    <p className="sd-collection-customise-titleNaming" style={{color:data["collection"]["title"]["color"],fontSize : data["collection"]["title"]["fontSize"] +"px",}}>Create Your Bundle & Get Discount</p>
    <p className="sd-collection-customise-description" style={{color:data["collection"]["title"]["description"]["color"],fontSize:data["collection"]["title"]["description"]["fontSize"] +"px",}}>Buy products from these collections and save
</p> 
</div>
<div style={{backgroundColor:(data["collection"]["theme"] == "dark" ? "#FFFFFF" :null)}}><Divider/></div>

<div className="sd-selected-collection" >
 
 <div className="sd-selected-collection-data">
   <div>
  <p style={{color:data["collection"]["collectionDetails"]["title"]["color"],fontSize:data["collection"]["collectionDetails"]["title"]["fontSize"] +"px"}}>Collection Name</p>
<p style={{color:data["collection"]["collectionDetails"]["description"]["color"],fontSize:data["collection"]["collectionDetails"]["description"]["fontSize"] +"px"}}>Add 2 items from collection collection collection</p> </div>
  </div>
   <div className="sd-selected-collection-img" >
                  
                    <img
                      src={pic}
                      
                    style={{borderColor:data["collection"]["collectionDetails"]["imageBorderColor"]}}/>
                  </div> 
                  </div>
<div className="sd-bundle-svg-common" style={{backgroundColor:data["collection"]["collectionDetails"]["plus"]["backgroundColor"]}}>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data.collectionDetails.plus.color}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg> */}

<PlusOutlined style={{  color:data["collection"]["collectionDetails"]["plus"]["color"]}} />



            </div>

<div className="sd-selected-collection" >
 
 <div className="sd-selected-collection-data">
   <div>
  <p style={{color:data["collection"]["collectionDetails"]["title"]["color"],fontSize:data["collection"]["collectionDetails"]["title"]["fontSize"] +"px"}}>Collection Name</p>
<p style={{color:data["collection"]["collectionDetails"]["description"]["color"],fontSize:data["collection"]["collectionDetails"]["description"]["fontSize"] +"px"}}>Add 2 items from collection collection collection</p> </div>
  </div>
   <div className="sd-selected-collection-img" >
                  
                    <img
                      src={pic}
                      style={{borderColor:data["collection"]["collectionDetails"]["imageBorderColor"]}}
                    />
                  </div> 
                  </div>
      <button
          type="button"
          className="sd-addToCart-button"  
          style={{backgroundColor:data["collection"]["button"]["backgroundColor"],color:data["collection"]["button"]["color"],fontSize:data["collection"]["button"]["fontSize"]+"px"}}       
        >
        {data["collection"]["button"]["text_others"]}
        </button>
</div>
      </div> 
    )
}

export default CustomizationCollectionBundlePreview;





{/* <div className="sd-collection-customise-preview sd-preview-wrapper-common" style={{backgroundColor:data.collectionMixMatch.box.backgroundColor,borderRadius:data.collectionMixMatch.box.borderRadius+"px",borderColor:data.collectionMixMatch.box.borderColor}}>

      
<div className="sd-collection-discount-badge"  style={{color:data.collectionMixMatch.DiscountBadge.color,backgroundColor:data.collectionMixMatch.DiscountBadge.backgroundColor,fontSize:data.collectionMixMatch.DiscountBadge.fontSize}} >{data.collectionMixMatch.DiscountBadge.text}</div>

<div className="sd-collection-main-section">

<div className="sd-collection-customise-titleSection" style={{textAlign:data.collectionMixMatch.title.alignment}}>
    <p className="sd-collection-customise-titleNaming" style={{color:data.collectionMixMatch.title.color,fontSize : data.collectionMixMatch.title.fontSize +"px",}}>Create Your Bundle & Get Discount</p>
    <p className="sd-collection-customise-description" style={{color:data.collectionMixMatch.title.description.color,fontSize:data.collectionMixMatch.title.description.fontSize +"px",}}>Buy products from these collections and save
</p> 
</div>
<div style={{backgroundColor:(data.collectionMixMatch.theme ? "#FFFFFF" :null)}}><Divider/></div>

<div className="sd-selected-collection" >
 
 <div className="sd-selected-collection-data">
   <div>
  <p style={{color:data.collectionMixMatch.collectionDetails.title.color,fontSize:data.collectionMixMatch.collectionDetails.title.fontSize +"px"}}>Collection Name</p>
<p style={{color:data.collectionMixMatch.collectionDetails.description.color,fontSize:data.collectionMixMatch.collectionDetails.description.fontSize +"px"}}>Add 2 items from collection collection collection</p> </div>
  </div>
   <div className="sd-selected-collection-img" >
                  
                    <img
                      src={pic}
                      
                    style={{borderColor:data.collectionMixMatch.collectionDetails.imageBorderColor}}/>
                  </div> 
                  </div>
<div className="sd-bundle-svg-common" style={{backgroundColor:data.collectionMixMatch.collectionDetails.plus.backgroundColor}}>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data.collectionDetails.plus.color}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg> */}

// <PlusOutlined style={{color: data.collectionMixMatch.collectionDetails.plus.color}} />



//             </div>

// <div className="sd-selected-collection" >
 
//  <div className="sd-selected-collection-data">
//    <div>
//   <p style={{color:data.collectionMixMatch.collectionDetails.title.color,fontSize:data.collectionMixMatch.collectionDetails.title.fontSize +"px"}}>Collection Name</p>
// <p style={{color:data.collectionMixMatch.collectionDetails.color,fontSize:data.collectionMixMatch.collectionDetails.description.fontSize +"px"}}>Add 2 items from collection collection collection</p> </div>
//   </div>
//    <div className="sd-selected-collection-img" >
                  
//                     <img
//                       src={pic}
//                       style={{borderColor:data.collectionMixMatch.collectionDetails.imageBorderColor}}
//                     />
//                   </div> 
//                   </div>
//       <button
//           type="button"
//           className="sd-addToCart-button"  
//           style={{backgroundColor:data.collectionMixMatch.button.backgroundColor,color:data.collectionMixMatch.button.color,fontSize:data.collectionMixMatch.button.fontSize+"px"}}       
//         >
//         {data.collectionMixMatch.button.text_others}
//         </button>
// </div>
//       </div>  */}