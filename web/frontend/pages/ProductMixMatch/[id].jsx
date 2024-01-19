import React, { useEffect, useState } from "react";
import { Col, Row, Button, Input, Divider, Modal, Select,Spin } from "antd";
import MoveToHomePage from "../../components/commonSections/MoveToHomePage";
import toastNotification from "../../components/commonSections/Toast";
import AlertSection from "../../components/commonSections/AlertSection";
import BoatLoader from "../../components/BoatLoader";
import BundlePickerData from "../../components/resourcePickerData/BundlePickerData";
import { useAppBridge } from "@shopify/app-bridge-react";
import CreateBundleModal from "../../components/createBundleModal";
import { useAPI } from "../../components/shop";
import defaultData from "../../components/customization/defaultData.json";
import BundleStatus from "../../components/commonSections/bundleStatus";
import DateTime from "../../components/commonSections/dateTime";
import DeleteSave from "../../components/commonSections/deleteSave";
import ProductBundlePreview from "../../components/preview/productBundlePreview";
import { TextField, InlineError } from "@shopify/polaris";
import ProductVariantData from "../../components/productVariantData";
import {Thumbnail} from '@shopify/polaris';
import { useNavigate, useParams } from "react-router-dom";
import postApi from "../../components/postApi";
import { alertCommon } from "../../components/helperFunctions";
import General from "../../components/bxgy/General";
import ProductMixMatchPreview from "../../components/preview/ProductMixMatchPreview";


const ProductMixMatch = () => {
  let headerkey = "Create Product Mix & Match Bundle" ;
    const navigate = useNavigate();
  const param = useParams();
  const [alert, setAlert] = useState({ state: false, message: [], status: "" });
  const [spinner, setSpinner] = useState(false);
  const { shop, timeZone, currencyCode } = useAPI();
  const[errorArray,setErrorArray]=useState([])
   const [endPrice, setEndPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [showPrice, setShowPrice] = useState({});
  const [arr, setArr] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [endPriceData, setEndPriceData] = useState([]);
  const [error, setError] = useState("");
  const [sumData, setSumData] = useState([]);
 
  const [data, setData] = useState({
    shop: shop,
    type: "productMixMatchBundle",
    name: "",
    title: "",
    status: "active",
    startdate: "",
    endDate: "",
    currencyCode: currencyCode,
    bundleDetail: {
      products: [],
      discountedProductType: "specific_product",
      discountOptions: [
        {
          quantity: 2,
          type: "percent",
          value: 5,
          // description: "Buy 2 & Save {discount}",
        },
      ],
      allowDiscountOnIncrease: false,
      display: {
        productPages: true,
        popUp: false,
        bundle: false,
        productPagesList: [],
      },
      requiredItem:{
        enable: false
      },
      multiItemSelection:{
        enable: false
      },
    },
    customization: [defaultData] ,
    timeZone:timeZone
  });
  const [pid, setPid] = useState("");

  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [variantData, setVariantData] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [antModal, setAntModal] = useState(false);
  const [pickerError, setPickerError] = useState([]);
  const [myModal, setMyModal] = useState(false);
  const app = useAppBridge();
  const [selectedDiscountIndex,setSelectedDiscountIndex] = useState(0);
  const [selectedPlacement,setSelectedPlacement] = useState({
    productPage:true,
    bundlePage:false
  });
  const temp = {
    setPid,
    setAntModal,
    setLoader,
    setCheckedIds,
    setVariantData,
  };
  const [disableAddOptions,setDisableAddOptions] = useState(false);

  // useEffect(()=>{
  //   console.log("data",data)
  // },[data])
  useEffect(()=>{
    data.bundleDetail.discountOptions.map((item,index)=>{
      {item.type==="freeShipping"?
        <>
          {((item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)) && setSelectedDiscountIndex(index)}
        </>
      :item.type === "fixed"?
        <>
          {((item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)) && setSelectedDiscountIndex(index)}
        </>
      :item.type === "noDiscount" ?
        <>
          {((item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)) && setSelectedDiscountIndex(index)}
        </>
      :
        <>
          {((item.quantity == data.bundleDetail.products.length)  || (index === data.bundleDetail.discountOptions.length-1 && data.bundleDetail.products.length >= item.quantity)) && setSelectedDiscountIndex(index)}
        </>
      }
    })
  },[data]);
  
  const removeProductFromList = (item, index) => {
    let update = [...data.bundleDetail.products];
    update.splice(update.indexOf(item), 1);
    let copy = [...data.bundleDetail.display.productPagesList];

    let copy2 = copy.filter((item2) => item2 != item.id);

    if (update.length > 0 && copy2.length == 0) {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          products: update,
          display: {
            ...data.bundleDetail.display,
            productPages: false,
            productPagesList: copy2,
          },
        },
      });
    } else if (update.length == 0) {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          products: update,
          display: {
            ...data.bundleDetail.display,
            productPages: true,
            productPagesList: copy2,
          },
        },
      });
    } else {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          products: update,
          display: { ...data.bundleDetail.display, productPagesList: copy2 },
        },
      });
    }
    let copyErrorArray = [...pickerError];
    let copyArray = [];
    copyErrorArray.map((item2) => {
      if (item2 >= index) {
        copyArray.push(item2 - 1);
      }
    });
    setPickerError(copyArray);
  };

  const handleSearchInput = (e) => {
    const { value } = e.target;
    if (value) {
      setMyModal(true);
      setSearchValue(value);
    } else {
      setSearchValue("");
    }
  };

  const handleBrowseProducts = async () => {
    setMyModal(true);
  };

  const getBundleData = async () => {
    let body = { id: param.id };
    setSpinner(true);
    const response = await postApi("/api/admin/editBundle", body, app);
    if (response.status === 200) {
      
      setData(response.data.response);
      setSpinner(false);
    }
  };

  const handleSave = async () => {
    // console.log("enter in save function")
    let alertText = [];
    let flag = true;

    let search2 = [];
    data.bundleDetail.products.map((item, index) => {
      if (item.minimumOrder < 1 || item.minimumOrder == "") {
        search2.push(index);
      }
    });

    if (search2.length > 0 || data.bundleDetail.products.length < 2) {
      flag = false;
      setPickerError(search2);
      alertText.push(
        "Minimum  products for bundle  is 2  & Minimum Order for each product  can not be empty  or less than 1 ."
      );
    }

    // console.log(search2, "search2")
    if (data.name == "") {
      if (!errorArray.includes("bundleName")) {
        setErrorArray((prev) => [...prev, "bundleName"]);
      }

      flag = false;
      alertText.push("Please provide name of bundle");
    }

    // console.log("errorArray", errorArray, data)
    if (data.title == "") {
      if (!errorArray.includes("bundleTitle")) {
        setErrorArray((prev) => [...prev, "bundleTitle"]);
      }
      flag = false;
      alertText.push("Please provide title of bundle");
    }
    
    if (data.startdate == "") {
      if (!errorArray.includes("startdate")) {
        setErrorArray((prev) => [...prev, "startdate"]);
      }
      flag = false;
      alertText.push("Please select start date & time");
    }
    if (flag == false) {
      alertCommon(setAlert, alertText, "critical", false);
    }

    if (flag == true) {
      setSpinner(true);
      setErrorArray("");
      setPickerError([]);
      if (param.id == "create") {
        try{
        const response = await postApi("/api/admin/createBundle", data, app);
        if (response.data.status === 200) {
          return toastNotification("success", "Saved", "bottom"), navigate("/bundle");
        } else {
          return alertCommon(
            setAlert,
            ["Something went wrong"],
            "warning",
            false
          );
        }
      }catch(err){
        // console.log(err)
       }
      } else {
        const response = await postApi("/api/admin/updateBundle", data, app);
        if (response.data.status === 200) {
          return (
            toastNotification("success", "Update successfully", "bottom"),
            navigate("/bundle")
          );
        } else {
          return alertCommon(
            setAlert,
            ["Something went wrong"],
            "warning",
            false
          );
        }
      }
    }
  };
  function calculateFinalPrice() {
    let finalPrice = 0;

    if (data.bundleDetail.products.length < 2) {
      finalPrice = calculateMrp();
    } else {
      if (data.bundleDetail.discountOptions[selectedDiscountIndex].type == "percent") {
        if (data.bundleDetail.discountOptions[selectedDiscountIndex].value > 100) {
          finalPrice = 0;
        } else {

          finalPrice =
            calculateMrp() -
            calculateMrp() * (data.bundleDetail.discountOptions[selectedDiscountIndex].value / 100);
        }
      } else
       if (data.bundleDetail.discountOptions[selectedDiscountIndex].type == "fixed") {
        if (parseFloat(data.bundleDetail.discountOptions[selectedDiscountIndex].value) > calculateMrp()) {
          finalPrice = selectedDiscountIndex;
        } else {
          finalPrice = calculateMrp() - data.bundleDetail.discountOptions[selectedDiscountIndex].value;
        }
      } else if (data.bundleDetail.discountOptions[selectedDiscountIndex].type == "price") {
        if (data.bundleDetail.discountOptions[selectedDiscountIndex].value > calculateMrp()) {
          finalPrice = calculateMrp();
        } else {
          finalPrice = data.bundleDetail.discountOptions[selectedDiscountIndex].value;
        }
      } else if (
        data.bundleDetail.discountOptions[selectedDiscountIndex].type == "freeShipping" ||
        data.bundleDetail.discountOptions[selectedDiscountIndex].type == "noDiscount"
      ) {
        finalPrice = calculateMrp();
      }
    }
    return finalPrice;
  }

  useEffect(()=>{
    let newArray = [];
    if(data.bundleDetail.products.length>0){
      data.bundleDetail.products.map((item,index)=>{
        newArray.push(Array.from(
          { length: item.minimumOrder },
          (x, itemIndex) => item.variants[0].price
        ));
      });
      // console.log('hello test ====>',newArray);
      setArr(newArray);
    }else{
      setArr([]);
    }
  },[data]);


  const handleDeleteDiscountOption = (index) => {
    let update = { ...data };
    if(update.bundleDetail.discountOptions.length<=2){
      setDisableAddOptions(false)
    }
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
  function calculateMrp() {
    if(arr.length>0){
      let sum = 0;
      arr?.map((item) => {
        item.map((sub) => {
          sum += parseFloat(sub);
        });
      });
      setMrp(parseFloat(sum).toFixed(2));
      return parseFloat(sum.toFixed(2));
    // }else{
    //   setMrp(parseFloat(sum).toFixed(2));
    //   return parseFloat(sum.toFixed(2));
    }
  }

    // console.log("check array ennnnddddprice length*************************************************************************",calculateFinalPrice());

  const handleAddDiscountOption = () => {
    let update = { ...data };
    if(update.bundleDetail.discountOptions.length>=2){
      setDisableAddOptions(true)
    }
    update.bundleDetail.discountOptions.push({
      quantity:
        parseInt(
          update.bundleDetail.discountOptions[
            update.bundleDetail.discountOptions.length - 1
          ].quantity
        ) + 1,
      type: "percent",
      value: 5,
      // description: `Buy ${
      //   parseInt(
      //     update.bundleDetail.discountOptions[
      //       update.bundleDetail.discountOptions.length - 1
      //     ].quantity
      //   ) + 1
      // } & Save {discount}`,
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
  const setCancel = () => {
    setVariantData([]);
    setCheckedIds([]);
    setPid("");
    let copy = [...errorArray];
    copy.splice(copy.indexOf("uncheckedVariantModal"), 1);
    setErrorArray(copy);
    setAntModal(false);
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
      let copy = [...errorArray];
      copy.splice(copy.indexOf("uncheckedVariantModal"), 1);
      setErrorArray(copy);

      setAntModal(false);
    } else if (checkedIds.length == 0) {
      setErrorArray([...errorArray, "uncheckedVariantModal"]);

      return false;
    }
  };

  const handleCheck=(e)=>{
      let update={...data}
      update.bundleDetail[`${e.target.id}`].enable=e.target.checked
       setData(update)
      //  console.log("datat=", data.bundleDetail.requiredItem, data.bundleDetail.multiItemSelection, data)
    }

  const handleRequiredProducts=(e, item)=>{
      // console.log(e.target.checked, item.required, data.bundleDetail.products)

    let key= "products"
    let bundleProduct=data.bundleDetail.products
    let index=bundleProduct.findIndex(e => e.id === item.id)
    if(e.target.checked){
      bundleProduct[index]= {...bundleProduct[index], required: true}
      setData({...data, bundleDetail:{...data.bundleDetail, [key]:bundleProduct}})
    }else{
      bundleProduct[index]= {... bundleProduct[index], required: false}
      setData({...data, bundleDetail:{...data.bundleDetail, [key]:bundleProduct}})
    }
    // console.log("requiredProducts finally", "bundle product", data.bundleDetail.products)
  }

  const handleMultiProductsSelection=(e, item)=>{
    // console.log(e.target.checked, item.id, data.bundleDetail.products)
    let key= "products"
    let bundleProduct=data.bundleDetail.products
    let index=bundleProduct.findIndex(e => e.id === item.id)
    if(e.target.checked){
      bundleProduct[index]= {...bundleProduct[index], multiItemSelect: true}
      setData({...data, bundleDetail:{...data.bundleDetail, [key]:bundleProduct}})
    }else{
      bundleProduct[index]= {... bundleProduct[index], multiItemSelect: false}
      setData({...data, bundleDetail:{...data.bundleDetail, [key]:bundleProduct}})
    }
    // console.log("multiProductsSelectionProducts finally", "bundle product", data.bundleDetail.products)
  }

  const handlePlacementsSelection = (e, type) =>{
      // if(type==="productPage"){
      //   setSelectedPlacement(selectedPlacement.productPage===e.target.checked);
      // }else{
      //   setSelectedPlacement(selectedPlacement.bundlePage===e.target.checked);
      // } 
  }
  console.log("handlePlacementsSelection work ===================>",selectedPlacement.bundlePage);

  useEffect(() => {
    calculateMrp();
    
    setEndPrice(parseFloat(calculateFinalPrice()).toFixed(2));
  }, [arr]);
  // console.log('chckekekkjdskjfkjsdgfgdsh0',endPrice);

  useEffect(() => {
    if (param.id !== "create") {
      getBundleData();
    }
  }, []);
   
  return (
    <Spin spinning={spinner}
    indicator={<BoatLoader/>} size="large">
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
            <div className="sd-bundle-bundleSection-common sd-bundle-productBundleSearchSection">
              <div className="sd-bundle-bundleSection-heading-common">
                Product Bundle{" "}
              </div>

                <div className="sd-bundle-plainText-common">
                  Add product you want to sell
                </div>
                <div className="sd-bundle-search">
                  <input
                    type="text"
                    placeholder="search products"
                    onChange={handleSearchInput}
                    className="sd-bundle-search-box-common"
                    value={searchValue}
                  />
                  <button
                    type="button"
                    onClick={handleBrowseProducts}
                    className="sd-bundle-search-button-common"
                  >
                    Browse
                  </button>
                </div>
                <BundlePickerData
                  page="productBundle"
                  modalType=""
                  data={data}
                  setData={setData}
                  temp={temp}
                  errorArray={pickerError}
                  removeProductFromList={removeProductFromList}
                />
            </div>

            {myModal && (
              <CreateBundleModal
                open={myModal}
                setOpen={setMyModal}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                page={"productBundle"}
                modalType="Product"
                setData={setData}
                data={data}
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
                        // min={item.quantity}
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
                          // {
                          //   value: "price",
                          //   label: "Set Price",
                          // },
                          {
                            value: "freeShipping",
                            label: "Free Shipping",
                          },
                          {
                            value: "noDiscount",
                            label: "No Discount",
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  {(data.bundleDetail.discountOptions[index].type === "percent" || data.bundleDetail.discountOptions[index].type === "fixed") && 
                  
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
                  }
                </Row>
                <br />
               
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
            <Button size="large" disabled={disableAddOptions} onClick={handleAddDiscountOption}>
              Add Another Option
            </Button>
          </div>
 
            <General 
              data={data}
              setData={setData}
              errorArray={errorArray}
            />

            <div className="sd-bundle-bundleSection-common sd-bundle-createBundleNamingSection">
              <div className="sd-bundle-bundleSection-heading-common">
                Placements
              </div>
              <div className="sd-bundle-plainText-common">
                Choose where to display this bundle and preview the options to see which one you prefer.
              </div>
              <div>
                <div>
                  <input 
                    type="checkbox" 
                    onChange={(e)=>{handlePlacementsSelection(e,"productPage")}}
                    // checked={selectedPlacement.productPage===true}
                  />
                  <label>Included products page</label>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    onChange={(e)=>{handlePlacementsSelection(e,"bundlePage")}}
                    // checked={selectedPlacement.bundlePage===true}
                  />
                  <label>Bundles page</label>
                </div>
              </div>
            </div>

            {/* <DiscountOptions
              discountType={data.bundleDetail.discountType}
              discountValue={data.bundleDetail.discountValue}
              handleDiscountType={handleDiscountType}
              handleDiscountValue={handleDiscountValue}
              currency={currencyCode}
            /> */}

          <div  className="sd-bundle-bundleSection-common">
              <p className='sd-bundle-bundleSection-heading-common'>Required products</p>
              <p className='sd-bundle-plainText-common'>If you need to force some products of the bundle to be selected, activate this option and then check the products that should be considered as required in this bundle.</p>
              <div className="sd-bundle-toggle-end-time">
              <input type="checkbox" checked={data.bundleDetail.requiredItem.enable} id="requiredItem" onChange={(e)=>{handleCheck(e)}}/>
              <label for="requiredItem">Enable required products</label>
                {data.bundleDetail.requiredItem.enable  &&
                     <div className="sd-bundle-ProductListMain">
                     {data.bundleDetail.products.map((item, index) => {
                     return (
                       <>
                         <div key={index} className="sd-bundle-selectedProductList">
                           <div className="sd-bundle-image-title">
                             <div>
                                 <input type="checkbox" checked={item.required}  onChange={(e)=>{handleRequiredProducts(e, item)}}/>
                             </div>
                             <div>
                               <Thumbnail
                                     source={ item?.image ? item?.image?.originalSrc : item?.images ? item?.images[0]?.originalSrc : item ?.src ? item ?.src : pic }
                                     alt=""
                                     size="small"
                                   />
                             </div>
                                       
                         
                             <div key={index} className="sd-bundle-title-section">
                               <div className="sd-bundle-title">{item.title}</div>
                             </div>
                           </div>
                      </div>
                      
                             {index !== data.bundleDetail.products.length-1  ? <Divider /> : ""}
                       </>
                     );
                   })}
                  </div>
                }
             
            </div>
            </div>
          <div  className="sd-bundle-bundleSection-common">
              <p className='sd-bundle-bundleSection-heading-common'>Multi selection options</p>
              <p className='sd-bundle-plainText-common'>If you need to allow some products to be selected multiple time in the bundle, activate this option and then check the products that multiple items of them can be selected in this bundle.</p>
              <div className="sd-bundle-toggle-end-time">
              <input type="checkbox" checked={data.bundleDetail.multiItemSelection.enable}  id="multiItemSelection" onChange={(e)=>{handleCheck(e)}} />
              <label for="multiItemSelection">Enable selecting multiple items</label>
              {data.bundleDetail.multiItemSelection.enable  &&
                     <div className="sd-bundle-ProductListMain">
                     {data.bundleDetail.products.map((item, index) => {
                     return (
                       <>
                         <div key={index} className="sd-bundle-selectedProductList">
                           <div className="sd-bundle-image-title">
                             <div>
                                 <input type="checkbox" checked={item.multiItemSelect} onChange={(e)=>{handleMultiProductsSelection(e, item)}}/>
                             </div>
                             <div>
                               <Thumbnail
                                     source={ item?.image ? item?.image?.originalSrc : item?.images ? item?.images[0]?.originalSrc : item ?.src ? item ?.src : pic }
                                     alt=""
                                     size="small"
                                   />
                             </div>
                                       
                         
                             <div key={index} className="sd-bundle-title-section">
                               <div className="sd-bundle-title">{item.title}</div>
                             </div>
                           </div>
                      </div>
                      
                             {index !== data.bundleDetail.products.length-1  ? <Divider /> : ""}
                       </>
                     );
                   })}
                  </div>
                }
            </div>
            </div>
            <DateTime data={data} setData={setData} errorArray={errorArray} />

            <DeleteSave handleSave={handleSave} />
          </div>

          <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
            <BundleStatus data={data} setData={setData} />
            <ProductMixMatchPreview
              data={data}
              currency={currencyCode}
              mrp={mrp}
              endPrice={endPrice}
              showPrice={showPrice}
              // handleVariantChoice={handleVariantChoice}
              bundleType={"productMixMatch"}
              errorArray={errorArray}
              discountIndex={selectedDiscountIndex}
            />
            
          </div>
        </div> 

        {/* below code is for the modal opening on click of Edit Further  */}
         {antModal && (
          <Modal
            title="Select Variant Options  for Bundle Modal"
            open={antModal}
            onOk={setOk}
            onCancel={setCancel}
            className="sd-bundle-modal sd-bundle-modal-variant"
            // width={1000}
          >
            <ProductVariantData
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              variantData={variantData}
              loader={loader}
              errorArray={errorArray}
            />
          </Modal>
        )} 
      </div>
    </Spin>
  )
}

export default ProductMixMatch