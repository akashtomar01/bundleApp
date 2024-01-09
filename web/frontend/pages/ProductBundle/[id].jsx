import React, { useEffect, useState } from "react";
import CreateBundleModal from "../../components/createBundleModal";
import { Modal, Spin } from "antd";
import toastNotification from "../../components/commonSections/Toast";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useAPI } from "../../components/shop";
import BundleNameTitle from "../../components/commonSections/bundleNameTitle";
import DateTime from "../../components/commonSections/dateTime";
import BundleStatus from "../../components/commonSections/bundleStatus";
import ProductBundlePreview from "../../components/preview/productBundlePreview";
import MoveToHomePage from "../../components/commonSections/MoveToHomePage";
import DisplayOptions from "../../components/commonSections/displayOptions";
import DiscountOptions from "../../components/commonSections/discountOptions";
import DeleteSave from "../../components/commonSections/deleteSave";
import AlertSection from "../../components/commonSections/AlertSection";
import BundlePickerData from "../../components/resourcePickerData/BundlePickerData";
import ProductVariantData from "../../components/productVariantData";
import { alertCommon } from "../../components/helperFunctions";
import defaultData from "../../components/customization/defaultData.json";
import postApi from "../../components/postApi";
import { useNavigate, useParams } from "react-router-dom";
import BoatLoader from "../../components/BoatLoader";
function CreateBundle() {
  let headerkey = "Create Product Bundle" ;

  const navigate = useNavigate();
  const param = useParams();
  const [myModal, setMyModal] = useState(false);
  const [endPrice, setEndPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [showPrice, setShowPrice] = useState({});

  const [pid, setPid] = useState("");

  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [antModal, setAntModal] = useState(false);
  const [pickerError, setPickerError] = useState([]);
  const [errorArray, setErrorArray] = useState([]);

  const [alert, setAlert] = useState({ state: false, message: [], status: "" });

  const [arr, setArr] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { shop, timeZone, currencyCode } = useAPI();
  const [data, setData] = useState({
    shop: shop,
    type: "productBundle",
    name: "",
    title: "",
    status: "active",
    startdate: "",
    endDate: "",
    currencyCode: currencyCode,
    bundleDetail: {
      discountType: "percent",
      discountValue: 5,
      products: [],
      display: {
        productPages: true,
        popUp: false,
        bundle: false,
        productPagesList: [],
      },
    },
    customization: [defaultData] ,
    timeZone:timeZone
  });

  const app = useAppBridge();

  const getBundleData = async () => {
    let body = { id: param.id };
    setSpinner(true);
    const response = await postApi("/api/admin/editBundle", body, app);
    if (response.status === 200) {
      
      setData(response.data.response);
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (param.id !== "create") {
      getBundleData();
    }
  }, []);

  const handleBrowseProducts = async () => {
    setMyModal(true);
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

  //     let update = [...data.bundleDetail.products];
  //     update.splice(update.indexOf(item),1);
  //     setData({...data,bundleDetail:{...data.bundleDetail,products:update}});

  //     let copyErrorArray=[...errorArray];
  //     let copyArray=[];

  //   copyErrorArray.map((item2)=>
  //       {
  //     if( item2 >= index )
  //     {
  //       copyArray.push(item2 - 1)

  //     }}
  //    )
  // setErrorArray(copyArray)

  //     // let copy = [...(data.display?.productPagesList)];
  //     // copy.splice(copy.indexOf(item.id),1);

  // let copy =[...(data.bundleDetail.display.productPagesList)];
  // copy= copy.filter(item2=>item2 != item.id )

  // if(copy.length == 0 ){

  //   setData({ ...data,
  //     bundleDetail:{
  //       ...data.bundleDetail,
  //     display:{...(data.bundleDetail.display),productPages:false,productPagesList:[]}
  //   }
  //   });
  //     }
  // else{

  //   setData({ ...data,
  //     bundleDetail:{...data.bundleDetail,
  //     display:{...(data.bundleDetail.display),productPagesList: copy }
  //     }
  //   });

  // }

  //   };

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

  const temp = {
    setPid,
    setAntModal,
    setLoader,
    setCheckedIds,
    setVariantData,
  };
  // console.log('hello test array====>',showPrice);
  useEffect(() => {
    let dummyArray = [];
    data.bundleDetail.products.map((item, mainindex) => {
      dummyArray.push(
        Array.from(
          { length: item.minimumOrder },
          (x, itemIndex) => item.variants[0].price
        )
      );
    });
    setArr(dummyArray);
// console.log("check arr data of bundle------->",dummyArray);
setShowPrice({});
  }, [data.bundleDetail.products]);
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

  const handleDiscountType = (e) => {
    setData({
      ...data,
      bundleDetail: {
        ...data.bundleDetail,
        discountType: e.target.value,
      },
    });
  };

  const handleDiscountValue = (newvalue) => {
    if (newvalue == "" || newvalue < 0) {
      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          discountValue: 0,
        },
      });
    } else {
      newvalue = String(newvalue);
      // if (String(newvalue).length > 1) {
      newvalue = newvalue.replace(/^0/, "");
      // }

      setData({
        ...data,
        bundleDetail: {
          ...data.bundleDetail,
          discountValue: newvalue,
        },
      });
    }
  };

  useEffect(() => {
    setEndPrice(parseFloat(calculateFinalPrice()).toFixed(2));
  }, [arr, data.bundleDetail.discountType, data.bundleDetail.discountValue]);

  const handleVariantChoice = (e, main, index) => {
    let newArr = [...arr];

    // let getIndex = Number(e.target.value.split("/")[0]);
    // let getPrice = e.target.value.split("/")[1];

    setShowPrice({ ...showPrice, [main]: e.target.value });
    newArr[main].splice(index, 1, e.target.value);

    setArr(newArr);
  };


  const handleDisplayOptions = (e) => {
    if (e.target.checked) {
      if (e.target.name == "productPages") {
        let arr = [];
        data.bundleDetail.products.map((item) => {
          arr.push(item.id);
        });

        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: {
              ...data.bundleDetail.display,
              productPages: true,
              productPagesList: [...arr],
            },
          },
        });
      } else {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: { ...data.bundleDetail.display, [e.target.name]: true },
          },
        });
      }
    } else {
      if (e.target.name == "productPages") {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: {
              ...data.bundleDetail.display,
              productPages: false,
              productPagesList: [],
            },
          },
        });
      } else {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: { ...data.bundleDetail.display, [e.target.name]: false },
          },
        });
      }
    }
  };

  const handleDisplayPageOptions = (e) => {
    if (e.target.checked) {
      // setData([...data,e.target.value])
      let update = { ...data };

      if (update.bundleDetail.display?.productPagesList.length < 1) {
        update.bundleDetail.display = {
          ...update.bundleDetail.display,
          productPages: true,
          productPagesList: [e.target.value],
        };

        setData(update);
      } else {
        update.bundleDetail.display.productPagesList = [
          ...update.bundleDetail.display.productPagesList,
          e.target.value,
        ];
        setData(update);
      }
    } else {
      let update = { ...data };
      let temp = update.bundleDetail.display.productPagesList.filter((item) => {
        return item !== e.target.value;
      });

      if (temp.length > 0) {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: { ...data.bundleDetail.display, productPagesList: temp },
          },
        });
      } else {
        setData({
          ...data,
          bundleDetail: {
            ...data.bundleDetail,
            display: {
              ...update.bundleDetail.display,
              productPages: false,
              productPagesList: temp,
            },
          },
        });
      }
    }
  };

  function calculateFinalPrice() {
    let finalPrice = 0;

    if (data.bundleDetail.products.length < 2) {
      finalPrice = calculateMrp();
    } else {
      if (data.bundleDetail.discountType == "percent") {
        if (data.bundleDetail.discountValue > 100) {
          finalPrice = 0;
        } else {
          finalPrice =
            calculateMrp() -
            calculateMrp() * (data.bundleDetail.discountValue / 100);
        }
      } else if (data.bundleDetail.discountType == "fixed") {
        if (parseFloat(data.bundleDetail.discountValue) > calculateMrp()) {
          finalPrice = 0;
        } else {
          finalPrice = calculateMrp() - data.bundleDetail.discountValue;
        }
      } else if (data.bundleDetail.discountType == "price") {
        if (data.bundleDetail.discountValue > calculateMrp()) {
          finalPrice = calculateMrp();
        } else {
          finalPrice = data.bundleDetail.discountValue;
        }
      } else if (
        data.bundleDetail.discountType == "freeShipping" ||
        data.bundleDetail.discountType == "noDiscount"
      ) {
        finalPrice = calculateMrp();
      }
    }

    return finalPrice;
  }
  function calculateMrp() {
    let sum = 0;

    arr?.map((item) => {
      item.map((sub) => {
        sum += parseFloat(sub);
      });
    });

    setMrp(parseFloat(sum).toFixed(2));
    return parseFloat(sum.toFixed(2));
  }

  const handleSave = async () => {
   
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

 
    if (data.name == "") {
      if (!errorArray.includes("bundleName")) {
        setErrorArray((prev) => [...prev, "bundleName"]);
      }

      flag = false;
      alertText.push("Please provide name of bundle");
    }
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
        console.log("in the try")
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
        console.log(err)
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

            <BundleNameTitle
              data={data}
              setData={setData}
              errorArray={errorArray}
            />

            <DiscountOptions
              discountType={data.bundleDetail.discountType}
              discountValue={data.bundleDetail.discountValue}
              handleDiscountType={handleDiscountType}
              handleDiscountValue={handleDiscountValue}
              currency={currencyCode}
            />

            <DateTime data={data} setData={setData} errorArray={errorArray} />

            <DeleteSave handleSave={handleSave} />
          </div>

          <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
            <BundleStatus data={data} setData={setData} />

            <DisplayOptions
              bundleType="productBundle"
              display={data.bundleDetail.display}
              handleDisplayOptions={handleDisplayOptions}
              displayPageOptions={data.bundleDetail.display.productPages}
              handleDisplayPageOptions={handleDisplayPageOptions}
              products={data.bundleDetail.products}
            />
            <ProductBundlePreview
              data={data}
              currency={currencyCode}
              mrp={mrp}
              endPrice={endPrice}
              showPrice={showPrice}
              handleVariantChoice={handleVariantChoice}
              bundleType={"productBundle"}
              errorArray={errorArray}
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
  );
}

export default CreateBundle;
