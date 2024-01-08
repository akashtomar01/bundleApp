import {useEffect,useState} from 'react'
import MoveToHomePage from '../../components/commonSections/MoveToHomePage';
import DiscountOptions from "../../components/commonSections/discountOptions";
import MainProducts from '../../components/fbt/mainProducts';
import OfferedProducts from '../../components/fbt/offeredProducts';
import { useAPI } from '../../components/shop';
import defaultData from "../../components/customization/defaultData.json";
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
import FBTBundlePreview from '../../components/preview/fbtBundlePreview';

const FrequentlyBoughtTogether = () => {
  const navigate = useNavigate();
  const param = useParams();
  const app = useAppBridge();

  let headerkey = "Frequently Bought Together"
  const { shop, timeZone, currencyCode } = useAPI();
  const [errorArray, setErrorArray] = useState([]);
  const [endPrice, setEndPrice] = useState(0);
  const [showPrice, setShowPrice] = useState({});
  const [mrp, setMrp] = useState(0);
  const [spinner,setSpinner] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [sumData, setSumData] = useState([]);
  const [endPriceData, setEndPriceData] = useState([]);
  
  let [mainProductLength, setMainProductLength] = useState(0);
  let [customizeData,setCustomizeData] =useState([]);

  let getCustomizeData = async() =>{
    const response = await postApi("/api/admin/getCustomization",{},app)
    setCustomizeData(response.data.response.frequentlyBoughtTogether);
  }

  useEffect(()=>{
    getCustomizeData();
  },[])

    const [data,setData] = useState({
        shop: shop,
        type: "fbt",
        name: "",
        title: "Bundle title",
        description:"Bundle description",
        status: "active",
        startdate: "",
        endDate: "",
        currencyCode: currencyCode,
        bundleDetail: {
          discountedProductType: "specific_product",
          discountType: "percent",
          discountValue: 5,
          mainProducts: [],
          offeredProducts: [],
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

    useEffect(()=>{
      setMainProductLength(data.bundleDetail.mainProducts.length)
    },[data.bundleDetail.mainProducts])

    const handleDiscountProductType = (e) => {
      console.log('eeeeee',e);
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
  
      }else if (e.target.value == "specific_product") {
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

    };
  return (
    <Spin spinning={spinner}>
    <div className="Polaris-Page Polaris-Page--fullWidth">
        <MoveToHomePage data={headerkey}/>
        
        <div className="sd-bundle-wrapper-common">
        
        <div className="sd-bundle-left-section-common">
              <div className="sd-bundle-bundleSection-common  sd-bundle-volumeBundle-browseSection">
                  <div className="sd-bundle-bundleSection-heading-common">
                      FBT type{" "}
                  </div>
                  <div className="sd-bundle-browseItem">
                      <input
                          type="radio"
                          id="all"
                          name="fbtProductType"
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
                          id="specific_product"
                          name="fbtProductType"
                          value="specific_product"
                          checked={
                              data.bundleDetail.discountedProductType == "specific_product"
                          }
                          onChange={handleDiscountProductType}
                      />
                      <label htmlFor="specific_product">A Specific Product</label>
                  </div>
              </div>
            {data.bundleDetail.discountedProductType==='specific_product' &&
            <>
              <MainProducts data={data} setData={setData} type={"MainProduct"}/>
              <OfferedProducts data={data} setData={setData}  mainProductsLength={mainProductLength}/>
            </>
            }
            <DiscountOptions
              discountType={data.bundleDetail.discountType}
              discountValue={data.bundleDetail.discountValue}
              handleDiscountType={handleDiscountType}
              handleDiscountValue={handleDiscountValue}
              currency={currencyCode}
            />
            <General data={data} setData={setData} errorArray={errorArray} type="FrequentlyBoughtTogether"/>
        </div>
        <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
            <BundleStatus data={data} setData={setData} />
             <FBTBundlePreview 
              data={data}
              currency={currencyCode}
              mrp={mrp}
              endPrice={endPrice}
              showPrice={showPrice}
              // bundleType={"productBundle"}
              errorArray={errorArray}
              customizeData = {customizeData}
              // handleVariantChoice={handleVariantChoice}
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

export default FrequentlyBoughtTogether ;