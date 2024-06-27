import React from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

function CreateBundleModal(props) {

  const handleCancel = () => {
    
    if (props.searchValue) {
      props.setSearchValue("");
    }

    props.setOpen(false);
  };

  const handleProducts = (e, page) => {
    

    if (page == "productBundle") {
      let x = {};
      
      props?.data.bundleDetail.products.map((item) => {
        console.log("item for checking:",item)
        x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
      });
      const result1 = e.selection.filter(({ id: id1 }) =>
        props?.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );
      let update = result1.map((item) => {
        if (x[item.id] || x[item.id] == 0) {
          item.minimumOrder = x[item.id];
          item.required= false;
          item.multiItemSelect= false;
          return item;
        }
      });

      const result2 = e.selection.filter(
        ({ id: id1 }) =>
          !props.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );
     
    // console.log("result2", result2, "update",update)
      let arr = [];
      result2.map((item, index) => {
        item.minimumOrder = 1;
        item.required= false;
        item.multiItemSelect= false;
        arr.push(item.id);

        if (index + 1 == result2.length) {
          props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              products: [...update, ...result2],
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
//..................................................Product mix match.......................................................
    if (page == "productMixMatch") {
      let x = {};
      
      props?.data.bundleDetail.products.map((item) => {
        console.log("item for checking:",item)
        x[item.id] = item.minimumOrder ? item.minimumOrder : 0;
      });
      const result1 = e.selection.filter(({ id: id1 }) =>
        props?.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );
      let update = result1.map((item) => {
        if (x[item.id] || x[item.id] == 0) {
          item.minimumOrder = x[item.id];
          item.required= false;
          item.multiItemSelect= false;
          return item;
        }
      });

      const result2 = e.selection.filter(
        ({ id: id1 }) =>
          !props.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );
     
    // console.log("result2", result2, "update",update)
      let arr = [];
      result2.map((item, index) => {
        item.minimumOrder = 1;
        item.required= false;
        item.multiItemSelect= false;
        arr.push(item.id);

        if (index + 1 == result2.length) {
          props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              products: [...update, ...result2],
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
    //------------------------------------------------------------
    else if (page == "volumeBundle") {
      props.setShowPrice({});

      props.setData({
        ...props.data,
        bundleDetail: {
          ...props.data.bundleDetail,
          products: [...e.selection],
          display: {
            ...props.data.bundleDetail.display,
            productPages: true,
            productPagesList: [e.selection[0].id]
          },
        },
      });

      let priceArray = [];
      let sumArray = [];
      let endPriceArray = [];

      props.data.bundleDetail.discountOptions.map((item, index) => {
        let temp = Array.from({ length: item.quantity }, (x, itemIndex) =>
          props.data.bundleDetail.discountedProductType == "specific_product"
            ? e.selection[0].variants[0].price
            : 50
        );
        priceArray.push(temp);
        sumArray.push(props.calculateMrp(temp));
        endPriceArray.push(props.calculateFinalPrice(index, sumArray));
      });
      props.setPriceData(priceArray);
      props.setSumData(sumArray);
      props.setEndPriceData(endPriceArray);
    }

    //---------------------------------
    else if (page == "CollectionMixMatch") {
      let x = {};

      props?.data.bundleDetail.products.map((item) => {
        x[item.id] = item.quantity ? item.quantity : 1;
      });

      const result1 = e.selection.filter(({ id: id1 }) =>
        props?.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );

      let update = result1.map((item) => {
        if (x[item.id] || x[item.id] == 0) {
          item.quantity = x[item.id];
          return item;
        }
      });

      const result2 = e.selection.filter(
        ({ id: id1 }) =>
          !props?.data.bundleDetail.products.some(({ id: id2 }) => id2 === id1)
      );

      let arr = [];
      result2.map((item, index) => {
        item.quantity = 1;
        arr.push(item.id);
        if (index + 1 == result2.length) {
          props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              products: [...update, ...result2],
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
  if(props.page!= "CollectionMixMatch")
  {
    props.setSearchValue("");
    } 
   };

  return (
    <>
      <ResourcePicker
        resourceType={props.modalType}
        open={props.open}
        onSelection={(e) => handleProducts(e, props.page)}
        initialSelectionIds={[...props?.data.bundleDetail?.products]}
        onCancel={handleCancel}
        initialQuery={props.searchValue ? props.searchValue : ""}
        // selectMultiple={props.page == "volumeBundle" ? false : true || props.page == "CollectionMixMatch" ? 2 : true}
        selectMultiple ={props.page == "productBundle" ? true : props.page == "volumeBundle" ? false : props.page == "CollectionMixMatch" ? 2 : true}
        showDraftBadge={true}
      />
    </>
  );
}

export default CreateBundleModal;
