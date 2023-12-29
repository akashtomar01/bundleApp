import {useEffect,useState} from 'react'
import MoveToHomePage from '../../components/commonSections/MoveToHomePage';
import BuyY from '../../components/bxgy/buyY';
import BuyX from '../../components/bxgy/buyX';
import { useAPI } from '../../components/shop';
import defaultData from "../../components/customization/defaultData.json";
import DiscountSet from '../../components/bxgy/DiscountSet';
import General from '../../components/bxgy/General';
import DateTime from '../../components/commonSections/dateTime';
import BundleStatus from '../../components/commonSections/bundleStatus';
import DisplayOptions from '../../components/commonSections/displayOptions';
import DeleteSave from '../../components/commonSections/deleteSave';
import BxgyBundlePreviewData from '../../components/preview/BxgyBundlePreviewData';
import { useNavigate, useParams } from "react-router-dom";
import postApi from '../../components/postApi';
import { useAppBridge } from "@shopify/app-bridge-react";
import toastNotification from '../../components/commonSections/Toast';
import { Spin } from 'antd';

const BuyXgetY = () => {
  const navigate = useNavigate();
  const param = useParams();
  const app = useAppBridge();

  let headerkey = "Create Buy X get Y"
  const { shop, timeZone, currencyCode } = useAPI();
  const [errorArray, setErrorArray] = useState([]);
  const [endPrice, setEndPrice] = useState(0);
  const [showPrice, setShowPrice] = useState({});
  const [mrp, setMrp] = useState(0);
  const [spinner,setSpinner] = useState(false);

    const [data,setData] = useState({
        shop: shop,
        type: "bxgy",
        name: "",
        title: "Bundle title",
        description:"Bundle description",
        status: "active",
        startdate: "",
        endDate: "",
        currencyCode: currencyCode,
        bundleDetail: {
          discountType: "percent",
          discountValue: 5,
          xproducts: [],
          yproducts: [],
          display: {
            productPages: true,
            popUp: false,
            bundle: false,
            productPagesList: [],
          },
        },
        customization: [defaultData] ,
        timeZone:timeZone
    })
    console.log("main",data)
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
      }else{
        console.log("else")
      }
    }, []);
    const handleSave = async () => {


    if (param.id == "create") {
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
        } else {
          const response = await postApi("/api/admin/updateBundle", data, app);
          if (response.data.status === 200) {
            return (
              toastNotification("success", "Update successfully", "bottom"),
              navigate("/bundle")
            );
          }
        }

















      // let alertText = [];
      // let flag = true;
  
      // let search2 = [];
      // data.bundleDetail.xproducts.map((item, index) => {
      //   if (item.minimumOrder < 1 || item.minimumOrder == "") {
      //     search2.push(index);
      //   }
      // });
  
      // if (search2.length > 0 || data.bundleDetail.products.length < 2) {
      //   flag = false;
      //   setPickerError(search2);
      //   alertText.push(
      //     "Minimum  products for bundle  is 2  & Minimum Order for each product  can not be empty  or less than 1 ."
      //   );
      // }
  
      // if (data.name == "") {
      //   if (!errorArray.includes("bundleName")) {
      //     setErrorArray((prev) => [...prev, "bundleName"]);
      //   }
  
      //   flag = false;
      //   alertText.push("Please provide name of bundle");
      // }
      // if (data.title == "") {
      //   if (!errorArray.includes("bundleTitle")) {
      //     setErrorArray((prev) => [...prev, "bundleTitle"]);
      //   }
      //   flag = false;
      //   alertText.push("Please provide title of bundle");
      // }
      
      // if (data.startdate == "") {
      //   if (!errorArray.includes("startdate")) {
      //     setErrorArray((prev) => [...prev, "startdate"]);
      //   }
      //   flag = false;
      //   alertText.push("Please select start date & time");
      // }
      // if (flag == false) {
      //   alertCommon(setAlert, alertText, "critical", false);
      // }
  
      // if (flag == true) {
      //   setSpinner(true);
      //   setErrorArray("");
      //   setPickerError([]);
      //   if (param.id == "create") {
      //     const response = await postApi("/api/admin/createBundle", data, app);
      //     if (response.data.status === 200) {
      //       return toastNotification("success", "Saved", "bottom"), navigate("/bundle");
      //     } else {
      //       return alertCommon(
      //         setAlert,
      //         ["Something went wrong"],
      //         "warning",
      //         false
      //       );
      //     }
      //   } else {
      //     const response = await postApi("/api/admin/updateBundle", data, app);
      //     if (response.data.status === 200) {
      //       return (
      //         toastNotification("success", "Update successfully", "bottom"),
      //         navigate("/bundle")
      //       );
      //     } else {
      //       return alertCommon(
      //         setAlert,
      //         ["Something went wrong"],
      //         "warning",
      //         false
      //       );
      //     }
      //   }
      // }
    };
  return (
    <Spin spinning={spinner}>
    <div className="Polaris-Page Polaris-Page--fullWidth">
        <MoveToHomePage data={headerkey}/>
        <div className="sd-bundle-wrapper-common">
        <div className="sd-bundle-left-section-common">
            <BuyX data={data} setData={setData}/>
            <BuyY data={data} setData={setData}/>
            <DiscountSet data={data} setData={setData}/>
            <General data={data} setData={setData} errorArray={errorArray}/>
            <DateTime data={data} setData={setData} errorArray={errorArray} />
        </div>
        <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
            <BundleStatus data={data} setData={setData} />
            <DisplayOptions
              bundleType="productBundle"
              display={data.bundleDetail.display}
              // handleDisplayOptions={handleDisplayOptions}
              displayPageOptions={data.bundleDetail.display.productPages}
              // handleDisplayPageOptions={handleDisplayPageOptions}
              products={data.bundleDetail.xproducts}
            />
            <BxgyBundlePreviewData
             data={data}
             currency={currencyCode}
             mrp={mrp}
             endPrice={endPrice}
             showPrice={showPrice}
            //  handleVariantChoice={handleVariantChoice}
             bundleType={"productBundle"}
             errorArray={errorArray}
             />
        </div>
        </div>
        <div className='sd-bundle-wrapper-common'>

        <DeleteSave 
        handleSave={handleSave}
        />
        </div>
        </div>
        </Spin>
  )
}

export default BuyXgetY ;