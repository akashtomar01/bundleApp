import React from 'react'
import { ResourcePicker } from "@shopify/app-bridge-react";
import toastNotification from '../commonSections/Toast';
const BxgyResourcePicker = (props) => {
    const handleProducts = (e, page) => {
         if (page == "xproduct") {
          let x = {};
          props?.data.bundleDetail.xproducts.map((item) => {
            x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
          });
          const result1 = e.selection.filter(({ id: id1 }) =>
            props?.data.bundleDetail.xproducts.some(({ id: id2 }) => id2 === id1)
          );
          let update = result1.map((item) => {
            if (x[item.id] || x[item.id] == 0) {
              item.minimumOrder = x[item.id];
              return item;
            }
          });
    
          const result2 = e.selection.filter(
            ({ id: id1 }) =>
              !props.data.bundleDetail.xproducts.some(({ id: id2 }) => id2 === id1)
          );
    
          let arr = [];
          result2.map((item, index) => {
            item.minimumOrder = 1;
            if(!props.data.bundleDetail.display.productPagesList.includes(item.id)){
              arr.push(item.id);  
            }
            if (index + 1 == result2.length) {
          let finalArray= filterXYProductsCommon([...update, ...result2],props.data.bundleDetail.yproducts)

              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  xproducts:finalArray,
                  display:
                    props.data.bundleDetail.display.productPages == true
                      ? {
                          ...props.data.bundleDetail.display,
                          productPagesList: [
                            ...props.data.bundleDetail.display.productPagesList,
                            ...arr,
                          ],
                        }
                      : {
                          ...props.data.bundleDetail.display,
                          productPages: true,
                          productPagesList: [
                            ...props.data.bundleDetail.display.productPagesList,
                            ...arr,
                          ],
                        },
                },
              });
            }
          });
        }
        if(page == "yproduct"){
          let x = {};
          props?.data.bundleDetail.yproducts.map((item) => {
            x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
          });
          const result1 = e.selection.filter(({ id: id1 }) =>
            props?.data.bundleDetail.yproducts.some(({ id: id2 }) => id2 === id1)
          );
          let update = result1.map((item) => {
            if (x[item.id] || x[item.id] == 0) {
              item.minimumOrder = x[item.id];
              return item;
            }
          });
    
          const result2 = e.selection.filter(
            ({ id: id1 }) =>
              !props.data.bundleDetail.yproducts.some(({ id: id2 }) => id2 === id1)
          );
    
          let arr = [];
          result2.map((item, index) => {
            item.minimumOrder = 1;
         if(!props.data.bundleDetail.display.productPagesList.includes(item.id)){
            arr.push(item.id);  
          }
         
            
            if (index + 1 == result2.length) {
              let finalArray= filterXYProductsCommon([...update, ...result2],props.data.bundleDetail.xproducts)
              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  yproducts: finalArray,
                  display:
                    props.data.bundleDetail.display.productPages == true
                      ? {
                          ...props.data.bundleDetail.display,
                          productPagesList: [
                            ...props.data.bundleDetail.display.productPagesList,
                            ...arr,
                          ],
                        }
                      : {
                          ...props.data.bundleDetail.display,
                          productPages: true,
                          productPagesList: [
                            ...props.data.bundleDetail.display.productPagesList,
                            ...arr,
                          ],
                        },
                },
              });
            }
          });
        }
    
     
        //------------------------------------
    
        props.setOpen(false);
   
       };
       const handleCancel = () => {
    
        if (props.searchValue) {
          props.setSearchValue("");
        }
    
        props.setOpen(false);
      };
      
      const filterXYProductsCommon=(array,itemArray)=>{

        // let array=[...update, ...result2];
        let finalArray=[];
      let notification=false;
        array.forEach((mainItem,index) => {
          
          let itemMatched = itemArray.find(item => item.id == mainItem.id);
          
          if (!itemMatched) {               
            finalArray.push(mainItem);
          } else {                
            let filteredVariants = mainItem.variants.filter(mainVariant =>
              !itemMatched.variants.some(itemVariant => itemVariant.id == mainVariant.id)
            );
            if(filteredVariants.length > 0){               
            finalArray.push({ ...mainItem, variants: filteredVariants});
          }
         
         if(mainItem.variants.length != filteredVariants.length) {
            notification=true
          }       
        }
        });
   
       if(notification){
        toastNotification("warning","Same variants of  a product cann't be added in both Buy X and Buy Y !!","top")
       }
        return finalArray ;
      }

  return (
    <>
    <ResourcePicker
        resourceType={props.modalType}
        open={props.open}
        onSelection={(e) => handleProducts(e, props.page)}
        initialSelectionIds={props.page == "xproduct" ? [...props?.data.bundleDetail?.xproducts]:props.page == "yproduct" ? [...props?.data.bundleDetail?.yproducts] : null }
        onCancel={handleCancel}
        initialQuery={props.searchValue ? props.searchValue : ""}
        selectMultiple ={true}
        showDraftBadge={true}
                
      />
    </>
  )
}

export default BxgyResourcePicker