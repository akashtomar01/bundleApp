import React, { useEffect, useState } from 'react'
import { ResourcePicker } from "@shopify/app-bridge-react";
import toastNotification from '../commonSections/Toast';
const FBTResourcePicker = (props) => {
  
  // useEffect(()=>{
  //   console.log("props1july",props.open)
  //   if (props.type==='MainProduct') {
  //       setSlectMultiple(false);
  //   }else{
  //     setSlectMultiple(3);
  //   }
  // },[selectMultiple]);

    // const handleProducts = (e, page) => {
    //     if (page == "fbtMainProducts") {
    //       let x = {};
    //       props?.data.bundleDetail.mainProducts.map((item) => {
    //         x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
    //       });
    //       const result1 = e.selection.filter(({ id: id1 }) =>
    //         props?.data.bundleDetail.mainProducts.some(({ id: id2 }) => id2 === id1)
    //       );
    //       let update = result1.map((item) => {
    //         if (x[item.id] || x[item.id] == 0) {
    //           item.minimumOrder = x[item.id];
    //           return item;
    //         }
    //       });
    
    //       const result2 = e.selection.filter(
    //         ({ id: id1 }) =>
    //           !props.data.bundleDetail.mainProducts.some(({ id: id2 }) => id2 === id1)
    //       );
    
    //       let arr = [];
    //       result2.map((item, index) => {
    //         item.minimumOrder = 1;
    //         arr.push(item.id);
    
    //         if (index + 1 == result2.length) {
    //           props.setData({
    //             ...props.data,
    //             bundleDetail: {
    //               ...props.data.bundleDetail,
    //               mainProducts: [...update, ...result2],
    //               display:
    //                 props.data.bundleDetail.display.productPages == true
    //                   ? {
    //                       ...props.data.bundleDetail.display,
    //                       productPagesList: [
    //                         ...props.data.bundleDetail.display.productPagesList,
    //                         ...arr,
    //                       ],
    //                     }
    //                   : {
    //                       ...props.data.bundleDetail.display,
    //                       productPages: true,
    //                       productPagesList: [
    //                         ...props.data.bundleDetail.display.productPagesList,
    //                         ...arr,
    //                       ],
    //                     },
    //             },
    //           });
    //         }
    //       });
    //     }
    //     if(page == "fbtOfferedProducts"){
    //       let x = {};
    //       props?.data.bundleDetail.offeredProducts.map((item) => {
    //         x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
    //       });
    //       const result1 = e.selection.filter(({ id: id1 }) =>
    //         props?.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
    //       );
    //       let update = result1.map((item) => {
    //         if (x[item.id] || x[item.id] == 0) {
    //           item.minimumOrder = x[item.id];
    //           return item;
    //         }
    //       });
    
    //       const result2 = e.selection.filter(
    //         ({ id: id1 }) =>
    //           !props.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
    //       );
    
    //       let arr = [];
    //       result2.map((item, index) => {
    //         item.minimumOrder = 1;
    //         arr.push(item.id);
    
    //         if (index + 1 == result2.length) {
    //           handleInitialSelectedIds([...update, ...result2])
    //           props.setData({
    //             ...props.data,
    //             bundleDetail: {
    //               ...props.data.bundleDetail,
    //               offeredProducts: [...update, ...result2],
    //               display:
    //                 props.data.bundleDetail.display.productPages == true
    //                   ? {
    //                       ...props.data.bundleDetail.display,
    //                       productPagesList: [
    //                         ...props.data.bundleDetail.display.productPagesList,
    //                         ...arr,
    //                       ],
    //                     }
    //                   : {
    //                       ...props.data.bundleDetail.display,
    //                       productPages: true,
    //                       productPagesList: [
    //                         ...props.data.bundleDetail.display.productPagesList,
    //                         ...arr,
    //                       ],
    //                     },
    //             },
    //           });
    //         }
    //       });
    //     }
    
     
    //     //------------------------------------
    
    //     props.setOpen(false);
   
    //    };


       const handleProducts = (e, page) => {

        if (page == "fbtMainProducts") {               
              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  mainProducts: e.selection,
                  },
              });           
        }

        if(page == "fbtOfferedProducts"){
      
          // const result1 = e.selection.filter(({ id: id1 }) =>
          //   props?.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
          // );        
    
          const result2 = e.selection.filter(
            ({ id: id1 }) =>
              !props.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
          )

          const requiredItems= result2.slice(0,3-props.data.bundleDetail.offeredProducts.length) 
          
          
              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  offeredProducts: [...props.data.bundleDetail.offeredProducts, ...requiredItems],                  
                },
              }); 
              if(props.data.bundleDetail.offeredProducts.length + result2.length > 3){
                toastNotification("warning","Maximum 3 products can be  added to offered products !!","top")
               }

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

  return (
    <>
    <ResourcePicker
        resourceType={props.modalType}
        open={props.open}
        onSelection={(e) => handleProducts(e, props.page)}
        // initialSelectionIds={props.page == "fbtMainProducts" ? [...props?.data.bundleDetail?.mainProducts]:props.page == "fbtOfferedProducts" ? props.initialSelectionIds: [{id:"gid://shopify/Product/8431470903600"}] }
        onCancel={handleCancel}
        initialQuery={props.searchValue ? props.searchValue : ""}
        selectMultiple ={props.type==='MainProduct' ? 1 : true}
        showDraftBadge={true}
      />
    </>
  )
}

export default FBTResourcePicker