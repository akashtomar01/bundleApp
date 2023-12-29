import React, { useEffect, useState } from 'react'
import { ResourcePicker } from "@shopify/app-bridge-react";

const BxgyResourcePicker = (props) => {
  let [selectMultiple,setSlectMultiple] = useState(true);
  useEffect(()=>{
    if (props.type==='MainProduct') {
        setSlectMultiple(false);
    }else{
      setSlectMultiple(true);
    }
  },[selectMultiple]);
    const handleProducts = (e, page) => {
        if (page == "xproduct") {
          let x = {};
          props?.data.bundleDetail.mainProducts.map((item) => {
            x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
          });
          const result1 = e.selection.filter(({ id: id1 }) =>
            props?.data.bundleDetail.mainProducts.some(({ id: id2 }) => id2 === id1)
          );
          let update = result1.map((item) => {
            if (x[item.id] || x[item.id] == 0) {
              item.minimumOrder = x[item.id];
              return item;
            }
          });
    
          const result2 = e.selection.filter(
            ({ id: id1 }) =>
              !props.data.bundleDetail.mainProducts.some(({ id: id2 }) => id2 === id1)
          );
    
          let arr = [];
          result2.map((item, index) => {
            item.minimumOrder = 1;
            arr.push(item.id);
    
            if (index + 1 == result2.length) {
              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  mainProducts: [...update, ...result2],
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
          props?.data.bundleDetail.offeredProducts.map((item) => {
            x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
          });
          const result1 = e.selection.filter(({ id: id1 }) =>
            props?.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
          );
          let update = result1.map((item) => {
            if (x[item.id] || x[item.id] == 0) {
              item.minimumOrder = x[item.id];
              return item;
            }
          });
    
          const result2 = e.selection.filter(
            ({ id: id1 }) =>
              !props.data.bundleDetail.offeredProducts.some(({ id: id2 }) => id2 === id1)
          );
    
          let arr = [];
          result2.map((item, index) => {
            item.minimumOrder = 1;
            arr.push(item.id);
    
            if (index + 1 == result2.length) {
              props.setData({
                ...props.data,
                bundleDetail: {
                  ...props.data.bundleDetail,
                  offeredProducts: [...update, ...result2],
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
  return (
    <>
    <ResourcePicker
        resourceType={props.modalType}
        open={props.open}
        onSelection={(e) => handleProducts(e, props.page)}
        initialSelectionIds={props.page == "xproduct" ? [...props?.data.bundleDetail?.mainProducts]:props.page == "yproduct" ? [...props?.data.bundleDetail?.offeredProducts] : null }
        onCancel={handleCancel}
        initialQuery={props.searchValue ? props.searchValue : ""}
        selectMultiple ={selectMultiple}
        showDraftBadge={true}
      />
    </>
  )
}

export default BxgyResourcePicker