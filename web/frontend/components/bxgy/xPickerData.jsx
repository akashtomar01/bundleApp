import React from 'react'
import { TextField,InlineError,Button} from "@shopify/polaris";
import { handleEditFurther } from "../helperFunctions";
import { Divider } from 'antd';
import { useAPI } from "../shop";
import pic from "../../assets/image2.png";
import {Thumbnail} from '@shopify/polaris';
const XpickerData = ({page,modalType,data,setData,errorArray,removeProductFromList,temp}) => {
const {app}=useAPI()

  function  showOutOfStockError(item){

    let check ;
    for (let index = 0; index < item.variants.length; index++) {
      if(item.variants[index].inventoryQuantity <= 0){
        check = true;
        break
      }
      
    }
  
  return check;
  }
  return (
    <div className="sd-bundle-ProductListMain">
    {data.bundleDetail.xproducts.map((item, index) => {
                 return (
                   <>
                     <div key={index} className="sd-bundle-selectedProductList">
                       <div className="sd-bundle-image-title">
                         
                         
   {/* {
     modalType=="Collection" ? <img  src={ item?.image ? item?.image?.originalSrc : pic } /> : <img  src={ item?.images ? item?.images[0]?.originalSrc : item ?.src ? item ?.src : pic } alt="photo" />
    } */} 
    <div>
    <Thumbnail
         source={ item?.image ? item?.image?.originalSrc : item?.images ? item?.images[0]?.originalSrc : item ?.src ? item ?.src : pic }
         alt=""
         size="small"
       />
    </div>
                                    
                     
                         <div key={index} className="sd-bundle-title-section">
                           <div className="sd-bundle-title">{item.title}</div>
                           {
                             (page=="xproduct" ) && item.hasOnlyDefaultVariant == false && (
                               <div className="sd-bundle-variant">
                                 
                                  <span>
                                   <Button
                                      plain
                                     onClick={() => handleEditFurther(item.id,temp.setPid,temp.setAntModal,temp.setLoader,data.bundleDetail.xproducts,temp.setCheckedIds,temp.setVariantData,app)}
                                   >
                                     Edit Further
                                   </Button>
                                 </span>   
                                 {showOutOfStockError(item)  && (
                                    <div className="sd-bundle-out-of-stock">few variants are out of stock.</div>)}
                                 
   
                               </div>
                             )
                             // </div>
                           }
                         </div>
                       </div>
                       
                      { page=="xproduct" &&
                       <div className="sd-bundle-quantity">
                         <TextField
                           type="number"
                           label="Minimum order"
                           onChange={(newvalue) => {
                            
   
                             if (newvalue == "" || newvalue < 0) {
                               let update = [...data.bundleDetail.xproducts];
                            
   
                               update[update?.indexOf(item)].minimumOrder = 0;
                             
                               // setSelectedProducts(update);
                               setData({...data,bundleDetail:{...data.bundleDetail,xproducts:[...update]}});
                               
                             } else {
                               if (String(newvalue).length > 1) {
                                 newvalue = newvalue.replace(/^0/, "");
                               }
   
                               let update = [...data.bundleDetail.xproducts];
                             
   
                               update[update?.indexOf(item)].minimumOrder =
                                 newvalue;
   
                               setData({...data,bundleDetail:{...data.bundleDetail,xproducts:[...update]}});
   
   
                             }
                           }}
                           value={item.minimumOrder}
                           autoComplete="off"
                           min="0"
                         />
    
                    
                       </div>
                     }
                       <button
                         className="Polaris-Button Polaris-Button--plain Polaris-Button--iconOnly"
                         type="button"
                         onClick={() => removeProductFromList(item,index)}
                         
                       >
                         <span className="Polaris-Button__Content">
                           <span className="Polaris-Button__Icon">
                             <span className="Polaris-Icon">
                               <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden"></span>
                               <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z" fill="#5C5F62"/><path d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z" fill="#5C5F62"/><path fill-rule="evenodd" d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z" fill="#5C5F62"/></svg>
                             </span>
                           </span>
                         </span>
                       </button>
                     </div>
                     {page == "xproduct" && errorArray?.includes(index) ? (
                       <InlineError message=" Minimum Order can't be empty or zero   " />
                       ) : (
                         ""
                         )}
                         {index !== data.bundleDetail.xproducts.length-1  ? <Divider /> : ""}
                   </>
                 );
               })}
   </div>
  )
}

export default XpickerData