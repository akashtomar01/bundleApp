import React, { useEffect, useState } from "react";
import MoveToHomePage from "../../components/commonSections/MoveToHomePage";
import BundleNameTitle from "../../components/commonSections/bundleNameTitle";
import BundleStatus from "../../components/commonSections/bundleStatus";
import DateTime from "../../components/commonSections/dateTime";
import DisplayOptions from "../../components/commonSections/displayOptions";
import DeleteSave from "../../components/commonSections/deleteSave";
import BundlePickerData from "../../components/resourcePickerData/BundlePickerData";
import CreateBundleModal from "../../components/createBundleModal";
import ProductVariantData from "../../components/productVariantData";
import { handleEditFurther } from "../../components/helperFunctions";
import { useAPI } from "../../components/shop";
import AlertSection from "../../components/commonSections/AlertSection";
import { alertCommon } from "../../components/helperFunctions";
import VolumePreview from "../../components/preview/VolumePreview";
import defaultData from "../../components/customization/defaultData.json";
import { Col, Row, Button, Input, Divider, Modal, Select,Spin } from "antd";
import { TextField, InlineError } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import postApi from "../../components/postApi";
import { useNavigate,useParams } from "react-router-dom";
import toastNotification from "../../components/commonSections/Toast";
import BoatLoader from "../../components/BoatLoader";
const VolumeBundle = () => {
  let headerkey = "Create Volume Bundle" ;

 const navigate = useNavigate()
 const app = useAppBridge()
 const param = useParams()

  const [modal, setModal] = useState(false);
  const [antModal, setAntModal] = useState(false);

  const [showPrice, setShowPrice] = useState({});

  const [priceData, setPriceData] = useState([]);
  const [sumData, setSumData] = useState([]);
  const [endPriceData, setEndPriceData] = useState([]);

  const [pid, setPid] = useState("");
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [checkedIds, setCheckedIds] = useState([]);

  const [errorArray, setErrorArray] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [alert, setAlert] = useState({ state: false, message: [], status: "" });
  const [spinner,setSpinner] = useState(false) 
  const [previewSpinner,setPreviewSpinner] = useState(false) 

  const { timeZone,currencyCode } = useAPI();
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    title: "",
    shop: "",
    type: "volumeBundle",
    status: "active",
    startdate: "",
    endDate: "",
    bundleDetail: {
      products: [],
      discountedProductType: "specific_product",
      discountOptions: [
        {
          quantity: 2,
          type: "percent",
          value: 5,
          description: "Buy 2 & Save {discount}",
        },
      ],
      allowDiscountOnIncrease: false,
      display: { productPages: false,
         bundle: false,
         
          productPagesList: [],
         },
    },
    customization: [defaultData] ,
    timeZone:timeZone
  });


  const getVolumeBundleData = async()=>{
    let body = {id :param.id}
   
const response = await postApi("/api/admin/editBundle",body,app)
if(response.status === 200){

    setData(response.data.response)
    // setVariantData(response.data.response.bundleDetail.products[0].variants)
    getPreviewData(response.data.response)
    setSpinner(false)
  
}
}

useEffect(() => {
  setSpinner(true)
if(param.id !== "create"){


    getVolumeBundleData()
} else{
  setSpinner(false)
}
}, [])



function getPreviewData(data){
  // let priceArray = [];
  //   let sumArray = [];
  //   let endPriceArray = [];
  //   let temp;
  //   response.data.response.bundleDetail.discountOptions.map((item, index) => {
  //      temp = Array.from({ length: item.quantity }, (x, itemIndex) =>
  //     response.data.response.bundleDetail.discountedProductType == "specific_product"
  //         ? response.data.response.bundleDetail.products[0].variants[0].price
  //         : 50
  //     );
  //     priceArray.push(temp);
  //     sumArray.push(calculateMrp(temp));
  //     endPriceArray.push(calculateFinalPrice(index, sumArray));
  //     return
  //   });

  //   setPriceData(priceArray);
  //   setSumData(sumArray);
  //   setEndPriceData(endPriceArray);
  let priceArray =[];
  let sumArray = [];
  let endPriceArray = [];

 data.bundleDetail.discountOptions.map((item,index)=>{
  
    let temp = Array.from({ length: item.quantity }, (x, itemIndex) =>
       data.bundleDetail.discountedProductType == "specific_product"
            ? data.bundleDetail.products[0]?.variants[0].price
            : 50
        );
        priceArray.push(temp);
        sumArray.push(calculateMrp(temp))
        let finalPrice = 0;

        if (data.bundleDetail.discountOptions[index].type == "percent") {
          if (data.bundleDetail.discountOptions[index].value > 100) {
            finalPrice = 0;
          } else {
           let discountedPrice =  parseFloat(sumArray[index]) -parseFloat(sumArray[index]) * (data.bundleDetail.discountOptions[index].value / 100);
            finalPrice = discountedPrice ;
          }
        }else if (data.bundleDetail.discountOptions[index]?.type == "fixed") {
          if (parseFloat(data.bundleDetail.discountValue) > sumArray[index]) {
            finalPrice = 0;
          } else {
            finalPrice =
              parseFloat(sumArray[index]) -
              data.bundleDetail.discountOptions[index].value;
          }
        } else if (data.bundleDetail.discountOptions[index]?.type == "price") {
      
          if (
            data.bundleDetail.discountOptions[index].value >
            parseFloat(sumArray[index])
          ) {
         
            finalPrice = parseFloat(sumArray[index]);
          } else {
       
            finalPrice = parseFloat(data.bundleDetail.discountOptions[index].value);
          }
        } else if (
          data.bundleDetail.discountOptions[index]?.discountType == "freeShipping" ||
          data.bundleDetail.discountOptions[index]?.discountType == "noDiscount"
        ) {
          finalPrice = parseFloat(sumArray[index]);
        }
        endPriceArray.push(finalPrice)
      })
 
      setPriceData(priceArray)
      setSumData(sumArray)
    setEndPriceData(endPriceArray);

} 




  const handleDiscountProductType = (e) => {

    if (e.target.value == "all_products") {
      // setShowPrice({});

      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          discountedProductType: "all_products",
          display: { productPages: true },
          products: [],
        },
      });

      let priceArray = [];
      let sumArray = [];
      let endPriceArray = [];

      data.bundleDetail.discountOptions.map((item, index) => {
        let temp = Array.from({ length: item.quantity }, (x, itemIndex) => 50);
        priceArray.push(temp);
        sumArray.push(calculateMrp(temp));
        endPriceArray.push(calculateFinalPrice(index, sumArray));
      });
      setPriceData(priceArray);
      setSumData(sumArray);
      setEndPriceData(endPriceArray);
    } else if (e.target.value == "collection") {
      setShowPrice({});

      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          discountedProductType: "collection",

          display: { productPages: false, id: "" },
          products: [],
        },
      });
    } else if (e.target.value == "specific_product") {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          discountedProductType: "specific_product",
          display: { productPages: false, bundle: false, id: "" },
          products: [],
        },
      });
    }
  };


  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
    setModal(true);
  };

  const handleBrowseProducts = () => {
    setModal(true);
  };

  const setOk = () => {
    
    let getData = variantData.data.filter(
      (item) => checkedIds.indexOf(item.id) != -1
    );
   
    if (checkedIds.length > 0) {
      let update = [...data.bundleDetail.products];
      let update2 = update.map((item) => {
        if (item.id == pid) {
          item.variants = getData;
        }

        return item;
      });
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          products: update2,
        },
      });

      setCheckedIds([]);
      setVariantData([]);
      setPid("");
      setError("");
      setAntModal(false);
    } else if (checkedIds.length == 0) {
      setError("uncheckedVariantModal");
      return false;
    }
  };

  const setCancel = () => {
    setVariantData([]);
    setCheckedIds([]);
    setPid("");
    setError("");
    setAntModal(false);
  };

  const handleDiscountQuantity = (newvalue, index) => {
   if (newvalue != "" ){
    if (parseInt(newvalue) < 2){
      if(errorArray.includes(`minimumQuantity${index}`)==false) {

      let copy = [...errorArray];
      if (errorArray.includes(`increasingOrder${index}`)) {
        copy.splice(copy.indexOf[`increasingOrder${index}`], 1);
      }
      setErrorArray([...copy, `minimumQuantity${index}`]);    
    } 
  }
    else if (
      (data.bundleDetail?.discountOptions[index + 1] &&
        parseInt(newvalue) >= parseInt(data.bundleDetail?.discountOptions[index + 1].quantity)) 
    ) {
      if(errorArray.includes(`increasingOrder${index}`)==false && parseInt(newvalue) >= 2){
        let copy = [...errorArray];
      if (errorArray.includes(`minimumQuantity${index}`)) {
        copy.splice(copy.indexOf[`minimumQuantity${index}`], 1);
      }
      setErrorArray([...copy, `increasingOrder${index}`]);
    }
    }
    else if( index > 0 && parseInt(newvalue) <= parseInt(data.bundleDetail?.discountOptions[index-1].quantity)){
      if(errorArray.includes(`increasingOrder${index}`)==false){
      let copy = [...errorArray];
      if (errorArray.includes(`minimumQuantity${index}`)) {
        copy.splice(copy.indexOf[`minimumQuantity${index}`], 1);
      }
      setErrorArray([...errorArray, `increasingOrder${index}`]);
       }
    }
    else if (String(newvalue).includes(".") == false) {
      let copy = [...errorArray];
      if (errorArray.includes(`minimumQuantity${index}`)) {
        copy.splice(copy.indexOf[`minimumQuantity${index}`], 1);
      }
  
      if (errorArray.includes(`increasingOrder${index}`)) {
        copy.splice(copy.indexOf[`increasingOrder${index}`], 1);
      }
  
      setErrorArray(copy);
    }
      let update = { ...data };
      update.bundleDetail.discountOptions[index].quantity = newvalue;

      if (
        !(
          data.bundleDetail.discountedProductType == "specific_product" &&
          data.bundleDetail.products.length == 0
        )
      ) {
        let newArr = [...priceData];
        newArr[index].push(
          data.bundleDetail.discountedProductType != "specific_product"
            ? 50
            : data.bundleDetail.products[0]?.variants[0]?.price
        );
        setPriceData(newArr);

        let update2 = [...sumData];
        update2.splice(
          index,
          1,
          (
            parseFloat(update2[index]) +
            parseFloat(
              data.bundleDetail.discountedProductType != "specific_product"
                ? 50
                : data.bundleDetail.products[0]?.variants[0]?.price
            )
          ).toFixed(2)
        );
        setSumData(update2);

        let newUpdate = [...endPriceData];
        newUpdate.splice(index, 1, calculateFinalPrice(index, update2));
        setEndPriceData(newUpdate);
      }

      setData(update);
    }
  };


  const handleDiscountType = (value, index) => {
    let update = { ...data };
    update.bundleDetail.discountOptions[index].type = value;
    setData(update);

    let newUpdate = [...endPriceData];
    newUpdate.splice(index, 1, calculateFinalPrice(index, sumData));
    setEndPriceData(newUpdate);
  };

  const handleDiscountValue = (newvalue, index) => {
    if (newvalue == "" || newvalue < 0) {
      let update = { ...data };
      update.bundleDetail.discountOptions[index].value = 0;

      let newUpdate = [...endPriceData];
      newUpdate.splice(index, 1, calculateFinalPrice(index, sumData));
      setEndPriceData(newUpdate);

      setData(update);
    } else {
      setError("");
      if (!(data.bundleDetail.discountOptions[index].type=="percent" &&   newvalue > 100) ) {
        newvalue = String(newvalue);
        // if (String(newvalue).length > 1) {
        newvalue = newvalue.replace(/^0/, "");
        // }
        let update = { ...data };
        update.bundleDetail.discountOptions[index].value = newvalue;

        let newUpdate = [...endPriceData];
        newUpdate.splice(index, 1, calculateFinalPrice(index, sumData));
        setEndPriceData(newUpdate);

        setData(update);
      }
    }
  };


  const handleDiscountDescription = (e, index) => {
    let update = { ...data };
    update.bundleDetail.discountOptions[index].description = e.target.value;
    setData(update);
  };

  const handleAddDiscountOption = () => {
    let update = { ...data };
    update.bundleDetail.discountOptions.push({
      quantity:
        parseInt(
          update.bundleDetail.discountOptions[
            update.bundleDetail.discountOptions.length - 1
          ].quantity
        ) + 1,
      type: "percent",
      value: 5,
      description: `Buy ${
        parseInt(
          update.bundleDetail.discountOptions[
            update.bundleDetail.discountOptions.length - 1
          ].quantity
        ) + 1
      } & Save {discount}`,
    });
    setData(update);

    if (
      data.bundleDetail.products[0] ||
      data.bundleDetail.discountedProductType == "all_products"
    ) {
     
      let dummy = Array.from(
        {
          length:
            update.bundleDetail.discountOptions[
              update.bundleDetail.discountOptions.length - 1
            ].quantity,
        },
        (x, itemIndex) =>
          data.bundleDetail.discountedProductType == "specific_product"
            ? data.bundleDetail.products[0].variants[0].price
            : 50
      );

      let calculatedPrice = calculateMrp(dummy);
      setPriceData([...priceData, dummy]);
      setSumData([...sumData, calculatedPrice]);
      setEndPriceData([
        ...endPriceData,
        (calculatedPrice - (calculatedPrice * 5) / 100).toFixed(2),
      ]);
    }
  };

  const handleDeleteDiscountOption = (index) => {
    let update = { ...data };
    update.bundleDetail.discountOptions.splice(index, 1);
    setData(update);

   setErrorArray([])
    

    let update2 = [...priceData];
    update2.splice(index, 1);
    setPriceData(update2);

    let update3 = [...sumData];
    update3.splice(index, 1);
    setSumData(update3);

    let newUpdate = [...endPriceData];
    newUpdate.splice(index, 1);
    setEndPriceData(newUpdate);
  };

  const temp = {
    setPid,
    setAntModal,
    setLoader,
    setCheckedIds,
    setVariantData,
  };

  const removeProductFromList = (item) => {
    let update = [...data.bundleDetail.products];
    update.splice(update.indexOf(item), 1);

    setData({
      ...data,
      bundleDetail: {
        ...data.bundleDetail,
        products: update,
        display: { ...data.bundleDetail.display, productPages: false, id: "" },
      },
    });
  };
 

  const handleDisplayOptions = (e) => {
    if (e.target.checked) {
      if (
        data.bundleDetail.discountedProductType == "specific_product" &&
        e.target.name == "bundle"
      ) {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: { ...data.bundleDetail.display, [e.target.name]: true },
          },
        });
      } else if (data.bundleDetail.products.length > 0) {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: { ...data.bundleDetail.display, [e.target.name]: true },
          },
        });
      }
    } else {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          display: { ...data.bundleDetail.display, [e.target.name]: false },
        },
      });
    }
  };

  const handleAllowDiscount = (e) => {
    if (e.target.checked) {
      let update = { ...data };
      update.bundleDetail.discountOptions[
        update.bundleDetail.discountOptions.length - 1
      ].description = `Buy ${
        update.bundleDetail.discountOptions[
          update.bundleDetail.discountOptions.length - 1
        ].quantity
      }+ & Save {discount}`;
      update.bundleDetail.allowDiscountOnIncrease = true;

      setData(update);
    } else {
      let update = { ...data };
      update.bundleDetail.discountOptions[
        update.bundleDetail.discountOptions.length - 1
      ].description = `Buy ${
        update.bundleDetail.discountOptions[
          update.bundleDetail.discountOptions.length - 1
        ].quantity
      } & Save {discount}`;
      update.bundleDetail.allowDiscountOnIncrease = false;

      setData(update);
    }
  };

  function calculateMrp(arr) {
    let sum = 0;

    arr?.map((item) => {
      sum += parseFloat(item);
    });
    return parseFloat(sum.toFixed(2));
  }

  function calculateFinalPrice(index, sumArray) {
    let finalPrice = 0;

    if (data.bundleDetail.discountOptions[index].type == "percent") {
      if (data.bundleDetail.discountOptions[index].value > 100) {
        finalPrice = 0;
      } else {
        finalPrice =  parseFloat(sumArray[index]) -parseFloat(sumArray[index]) * (data.bundleDetail.discountOptions[index].value / 100);
      }
    } else if (data.bundleDetail.discountOptions[index].type == "fixed") {
      if (parseFloat(data.bundleDetail.discountValue) > sumArray[index]) {
        finalPrice = 0;
      } else {
        finalPrice =
          parseFloat(sumArray[index]) -
          data.bundleDetail.discountOptions[index].value;
      }
    } else if (data.bundleDetail.discountOptions[index].type == "price") {
      if (
        data.bundleDetail.discountOptions[index].value >
        parseFloat(sumArray[index])
      ) {
        finalPrice = parseFloat(sumArray[index]);
      } else {
        finalPrice = parseFloat(data.bundleDetail.discountOptions[index].value);
      }
    } else if (
      data.bundleDetail.discountOptions[index].discountType == "freeShipping" ||
      data.bundleDetail.discountOptions[index].discountType == "noDiscount"
    ) {
      finalPrice = parseFloat(sumArray[index]);
    }
    return finalPrice.toFixed(2);
  }

  const handleVariantChoice = (e, main, index) => {

    let newArr = [...priceData];
    setShowPrice({ ...showPrice, [main]: e.target.value });
    newArr[main].splice(index, 1, e.target.value);
    setPriceData(newArr);
    let update = [...sumData];
    update.splice(main, 1, calculateMrp(newArr[main]));
    setSumData(update);
    let newUpdate = [...endPriceData];
    newUpdate.splice(main, 1, calculateFinalPrice(main, update));
    setEndPriceData(newUpdate);
  };

  const handleDelete = () => {};


  

  const handleSave = async() => {

    let alertText=[]
    let flag=true;


     if (data.bundleDetail.discountedProductType!="all_products"  && data.bundleDetail.products.length == 0) {
      if(!errorArray.includes("emptyProduct"))
      {
          setErrorArray((prev)=>[...prev,"emptyProduct"])

     }
     flag=false
    let message=   `Please add atleast one ${
      data.bundleDetail.discountedProductType == "specific_product"
       ? "product"
    : "collection"
     }`
   alertText.push(message)
    }

    if (data.name == "") {
     
        if(!errorArray.includes("bundleName"))
        {
          setErrorArray((prev)=>[...prev,"bundleName"])
        }
       
        flag=false
        alertText.push("Please provide name of bundle")
    }

    if (data.title == "") {
        if(!errorArray.includes("bundleTitle")){
               setErrorArray((prev)=>[...prev,"bundleTitle"])
      }
          flag=false
          alertText .push("Please provide title of bundle")    
    }

    if (data.startdate == "") {
      if(!errorArray.includes("startdate")){
        setErrorArray((prev)=>[...prev,"startdate"])
      }
        flag=false
        alertText.push("Please select start date & time")
      
    }

    if(flag==false ){
      alertCommon(
          setAlert,
          alertText,
          "critical",
          false
        );
    }
   if(flag==true){
  //   if (param.id == "create") {
  //   const response  = await postApi("/api/admin/createBundle",data,app)
  //   if(response.data.status === 200){
  //     return (
       
  //       toastNotification("success","Saved","top"),
  //       navigate('/')
  //     )
  //   }else{
  //     return alertCommon(setAlert, ["Something went wrong"],"warning",false)
  //   }
   
  //  }else{
  //   const response = await postApi("/api/admin/updateBundle", data, app);
   
  //   if (response.data.status === 200) {
  //     return (
  //       toastNotification("success", "Update successfully", "top"),
  //       navigate("/")
  //     );
  //   } else {
  //     return alertCommon(
  //       setAlert,
  //       ["Something went wrong"],
  //       "warning",
  //       false
  //     );
  //   }
  // }
  if (param.id == "create") {
    setSpinner(true)
    const response = await postApi("/api/admin/createBundle", data, app);
    if (response.data.status === 200) {
      return(
        setSpinner(false),
        toastNotification("success", "Saved", "bottom"), navigate("/bundle")
      );
    } else {
    setSpinner(false)

      return alertCommon(
        setAlert,
        ["Something went wrong"],
        "warning",
        false
      );
    }
  } else {
    setSpinner(true)

    const response = await postApi("/api/admin/updateBundle", data, app);
    if (response.data.status === 200) {
      return (
    setSpinner(false),

        toastNotification("success", "Update successfully", "bottom"),
        navigate("/bundle")
      );
    } else {
    setSpinner(false)

      return alertCommon(

        setAlert,
        ["Something went wrong"],
        "warning",
        false
      );
    }
  }

  }else {
    return alertCommon(setAlert, ["Something went wrong"],"warning",false)
  }
  
}
  return (
    <Spin spinning={spinner}
    indicator={<BoatLoader/>}
    size="large"> 
    <div className="Polaris-Page Polaris-Page--fullWidth">
      <MoveToHomePage data={headerkey} />
      {alert.state == true && (
        <AlertSection
          message={alert.message}
          setAlert={setAlert}
          status={alert.status}
        />
      )}
      <div className="sd-bundle-wrapper-common">
        <div className="sd-bundle-left-section-common">
          <div className="sd-bundle-bundleSection-common  sd-bundle-volumeBundle-browseSection">
            <div className="sd-bundle-bundleSection-heading-common">
              Discounted Products{" "}
            </div>
            <div className="sd-bundle-browseItem">
              <input
                type="radio"
                id="all"
                name="discountProductType"
                value="all_products"
                checked={
                  data.bundleDetail.discountedProductType == "all_products"
                }
                onChange={handleDiscountProductType}
              />
              <label htmlFor="all">All Products</label>
            </div>
            <div className="sd-bundle-browseItem">
              <input
                type="radio"
                id="collection"
                name="discountProductType"
                value="collection"
                checked={
                  data.bundleDetail.discountedProductType == "collection"
                }
                onChange={handleDiscountProductType}
              />
              <label htmlFor="collection">A Collection</label>
            </div>
            <div className="sd-bundle-browseItem">
              <input
                type="radio"
                id="specific_product"
                name="discountProductType"
                value="specific_product"
                checked={
                  data.bundleDetail.discountedProductType == "specific_product"
                }
                onChange={handleDiscountProductType}
              />
              <label htmlFor="specific_product">A Specific Product</label>
            </div>
            {data.bundleDetail.discountedProductType != "all_products" && (
              <>
                <div className="sd-bundle-plainText-common">
                  Select the products for which you want to create this volume
                  discount. You can create the volume discount for a specific
                  product or all products of a collection or all of your
                  products. The discount options will be available for each
                  product separately
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder={
                      data.bundleDetail.discountedProductType ==
                      "specific_product"
                        ? "search products"
                        : "search collection"
                    }
                    onChange={handleSearchInput}
                    className="sd-bundle-search-box-common"
                    value={searchValue}
                  />
                  <button
                    type="button"
                    // onClick={handleBrowseProducts}
                    onClick={()=>handleBrowseProducts()}
                    className="sd-bundle-search-button-common"
                  >
                    Browse
                  </button>
                </div>
              </>
            )}
            <BundlePickerData
              page="volumeBundle"
              modalType={
                data.bundleDetail.discountedProductType == "specific_product"
                  ? "Product"
                  : "Collection"
              }
              data={data}
              setData={setData}
              temp={temp}
              errorArray={errorArray}
              handleEditFurther={handleEditFurther}
              removeProductFromList={removeProductFromList}
            />
          </div>
          {modal && (
            <CreateBundleModal
              open={modal}
              setOpen={setModal}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              page={"volumeBundle"}
              data={data}
              setData={setData}
              setPriceData={setPriceData}
              modalType={
                data.bundleDetail.discountedProductType == "specific_product"
                  ? "Product"
                  : "Collection"
              }
              setSumData={setSumData}
              calculateFinalPrice={calculateFinalPrice}
              calculateMrp={calculateMrp}
              setEndPriceData={setEndPriceData}
              setShowPrice={setShowPrice}
            />
          )}

          <div className="sd-bundle-bundleSection-common sd-bundle-volumeBundle-discountOptions">
            <div className="sd-bundle-bundleSection-heading-common">
              {" "}
              Discount Options{" "}
            </div>
            {data.bundleDetail.discountOptions.map((item, index) => (
              <div key={index} className="sd-volume-discount-option">
                <div
                  className="sd-bundle-volume-discount-option-topbar"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>option{index + 1}</p>
                  {data.bundleDetail.discountOptions.length > 1 && (
                    <Button
                      danger
                      onClick={() => handleDeleteDiscountOption(index)}
                    >
                      DELETE
                    </Button>
                  )}
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={8}>
                    <div>
                      <p>Required items</p>
                      <TextField
                        type="number"
                        // label="Minimum order"
                        // placeholder="set minimum order  for item"
                        onChange={(newvalue) =>
                          handleDiscountQuantity(newvalue, index)
                        }
                        value={item.quantity}
                        autoComplete="off"
                        // min={2}
                      />
                      {errorArray.includes(`minimumQuantity${index}`) && (
                        <InlineError message="Minimum quantity must be 2 " />
                      )}
                      {errorArray.includes(`increasingOrder${index}`) && (
                        <InlineError message="Options quantities must be in increasing order " />
                      )}
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div>
                      <p>Discount Type</p>
                      <Select
                        value={data.bundleDetail.discountOptions[index].type}
                        style={{
                          width: "100%",
                        }}
                        onChange={(value) => handleDiscountType(value, index)}
                        options={[
                          {
                            value: "fixed",
                            label: "Fixed Discount",
                          },
                          {
                            value: "percent",
                            label: "Percentage Discount",
                          },
                          {
                            value: "price",
                            label: "Set Price",
                          },
                          // {
                          //   value: "freeShipping",
                          //   label: "Free Shipping",
                          // },
                          {
                            value: "noDiscount",
                            label: "No Discount",
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div>
                      <p>Discount value</p>
                      <TextField
                        type="number"
                        // label="Minimum order"
                        // placeholder="set minimum order  for item"
                        onChange={(newvalue) =>
                          handleDiscountValue(newvalue, index)
                        }
                        value={item.value}
                        autoComplete="off"
                        min="0"
                      />
                      
                    </div>
                  </Col>
                </Row>
                <br />
                <p>Description</p>
                <Input
                  placeholder="Buy"
                  value={item.description}
                  onChange={(e) => handleDiscountDescription(e, index)}
                />
                <span className="sd-bundle-Disclaimer-common">
                  Use discount to show the discount value
                </span>
                <br />

                {/* {data.bundleDetail.discountOptions.length == index + 1 && (
                  <div className="sd-bundle-volumeBundle-allowDiscount">
                    <input
                      type="checkbox"
                      id="discountOptionCheckbox"
                      name=""
                      value={data.bundleDetail.allowDiscount}
                      onChange={handleAllowDiscount}
                    />
                    <label htmlFor="discountOptionCheckbox">
                      Allow this discount to be applied on more items than the
                      required numbers
                    </label>
                  </div>
                )} */}
                <Divider />
              </div>
            ))}
            <Button size="large" onClick={handleAddDiscountOption}>
              Add Another Option
            </Button>
          </div>
          <BundleNameTitle data={data} setData={setData} errorArray={errorArray} />
          <DateTime data={data} setData={setData} errorArray={errorArray} />
          <DeleteSave  handleSave={handleSave} />
        </div>
        <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
          <BundleStatus data={data} setData={setData} />
          <DisplayOptions
            bundleType="volume"
            discountedProductType={data.bundleDetail.discountedProductType}
            title={data.bundleDetail.products[0]?.title}
            display={data.bundleDetail.display}
            handleDisplayOptions={handleDisplayOptions}
            products={data.bundleDetail.products}
          />
     
      

          <VolumePreview
            data={data}
            setData={setData}
            currency={currencyCode}
            discountType={"product"}
            sumData={sumData}
            allowDiscountOnIncrease={data.bundleDetail.allowDiscountOnIncrease}
            endPriceData={endPriceData}
            handleVariantChoice={handleVariantChoice}
            showPrice={showPrice}
          />

        </div>
      </div>
      {antModal && (
        <Modal
          title="Select Variant Options  for Bundle Modal"
          open={antModal}
          onOk={setOk}
          onCancel={setCancel}
          className="sd-bundle-modal sd-bundle-modal-variant"
        >
          <ProductVariantData
            checkedIds={checkedIds}
            setCheckedIds={setCheckedIds}
            variantData={variantData}
            loader={loader}
           
            error={error}
          />
        </Modal>
      )}
    </div>
    </Spin>
  );
};
export default VolumeBundle;
