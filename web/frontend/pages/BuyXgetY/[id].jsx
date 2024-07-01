import { useEffect, useState } from "react";
import MoveToHomePage from "../../components/commonSections/MoveToHomePage";
import BuyY from "../../components/bxgy/buyY";
import BuyX from "../../components/bxgy/buyX";
import { useAPI } from "../../components/shop";
import defaultData from "../../components/customization/defaultData.json";
import DiscountSet from "../../components/bxgy/DiscountSet";
import General from "../../components/bxgy/General";
import DateTime from "../../components/commonSections/dateTime";
import BundleStatus from "../../components/commonSections/bundleStatus";
import DisplayOptions from "../../components/commonSections/displayOptions";
import DeleteSave from "../../components/commonSections/deleteSave";
import BxgyBundlePreviewData from "../../components/preview/BxgyBundlePreviewData";
import { useNavigate, useParams } from "react-router-dom";
import postApi from "../../components/postApi";
import { useAppBridge } from "@shopify/app-bridge-react";
import toastNotification from "../../components/commonSections/Toast";
import { Spin } from "antd";
import { alertCommon } from "../../components/helperFunctions";
import AlertSection from "../../components/commonSections/AlertSection";

const BuyXgetY = () => {
  const navigate = useNavigate();
  const param = useParams();
  const app = useAppBridge();

  let headerkey = "Create Buy X get Y";
  const { shop, timeZone, currencyCode } = useAPI();
  const [customizationData, setCustomizationData] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [endPrice, setEndPrice] = useState(0);
  const [showPrice, setShowPrice] = useState({});
  const [mrp, setMrp] = useState(0);
  const [arrX, setArrX] = useState([]);
  const [arrY, setArrY] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState({ state: false, message: [], status: "" });
  const [pickerError, setPickerError] = useState([]);
  const [data, setData] = useState({
    shop: shop,
    type: "bxgy",
    name: "",
    title: "",
    description: "",
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
    customization: [defaultData],
    timeZone: timeZone,
  });

  console.log("BxGymaindata", data);

  // function to fetch  customization data from customization api and updating existing


  
  async function getCustomization() {
    try {
      const response = await postApi("/api/admin/getCustomization", { shop: shop }, app);
      setCustomizationData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getCustomization();
  }, []); 
  
  useEffect(() => {
    console.log("customizationdata", customizationData);
    setData((prevData) => ({
      ...prevData,
      customization: [
        {
          bundle: customizationData.bundle,
          buyXgetY: customizationData.buyXgetY,
          collectionMixMatch: customizationData.collectionMixMatch,
          frequentlyBoughtTogether: customizationData.frequentlyBoughtTogether,
          popUp: customizationData.popUp,
          productMixMatch: customizationData.productMixMatch,
          volume: customizationData.volume,
        },
      ],
    }));
  }, [customizationData]);
  



  //----------------------------------------------------------

  // const handleDisplayOptions = (e) => {
  //   if (e.target.checked) {
  //     if (e.target.name == "productPages") {
  //       let arrX = [];
  //       let arrY = [];
  //       data.bundleDetail.xproducts.map((item) => {
  //         arrX.push(item.id);
  //       });
  //       data.bundleDetail.yproducts.map((item) => {
  //         arrY.push(item.id);
  //       });

  //       setData({
  //         ...data,
  //         bundleDetail: {
  //           ...data.bundleDetail,
  //           display: {
  //             ...data.bundleDetail.display,
  //             productPages: true,
  //             productPagesList: [...arrX, ...arrY],
  //           },
  //         },
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         bundleDetail: {
  //           ...data.bundleDetail,
  //           display: { ...data.bundleDetail.display, [e.target.name]: true },
  //         },
  //       });
  //     }
  //   } else {
  //     console.log("enter in handleDisplayOptions",e);
  //     if (e.target.name == "productPages") {
  //       setData({
  //         ...data,
  //         bundleDetail: {
  //           ...data.bundleDetail,
  //           display: {
  //             ...data.bundleDetail.display,
  //             productPages: false,
  //             productPagesList: [],
  //           },
  //         },
  //       });
  //     } else {
  //       setData({
  //         ...data,
  //         bundleDetail: {
  //           ...data.bundleDetail,
  //           display: { ...data.bundleDetail.display, [e.target.name]: false },
  //         },
  //       });
  //     }
  //   }
  // };

  const handleDisplayOptions = (e) => {
    if (e.target.checked) {
      if (e.target.name == "productPages") {
        let arr = [];
        data.bundleDetail.xproducts.map((item) => {
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

  useEffect(() => {
    let dummyArrayX = [];
    let dummyArrayY = [];
    {
      data.bundleDetail.xproducts
        ? data.bundleDetail.xproducts.map((item) =>
            dummyArrayX.push(
              Array.from(
                { length: item.minimumOrder },
                (x, itemIndex) => item.variants[0].price
              )
            )
          )
        : null;
    }

    {
      data.bundleDetail.yproducts
        ? data.bundleDetail.yproducts.map((item) =>
            dummyArrayY.push(
              Array.from(
                { length: item.minimumOrder },
                (x, itemIndex) => item.variants[0].price
              )
            )
          )
        : null;
    }

    setArrX(dummyArrayX);
    setArrY(dummyArrayY);
  }, [data.bundleDetail.xproducts, data.bundleDetail.yproducts]);

  useEffect(() => {
    setEndPrice(parseFloat(calculateFinalPrice(arrX, arrY)).toFixed(2));
  }, [arrX, data.bundleDetail.discountType, data.bundleDetail.discountValue]);

  //function to calculate final EndPrice
  function calculateFinalPrice(arrX, arrY) {
    let finalPrice = 0;
    const totalMrp = calculateMrp(arrX) + calculateMrp(arrY);
    setMrp(parseFloat(totalMrp).toFixed(2));

    if (data.bundleDetail.discountType == "percent") {
      if (data.bundleDetail.discountValue > 100) {
        finalPrice = 0;
      } else {
        finalPrice =
          calculateMrp(arrX) +
          (calculateMrp(arrY) -
            calculateMrp(arrY) * (data.bundleDetail.discountValue / 100));
      }
    } else if (data.bundleDetail.discountType == "fixed") {
      if (
        parseFloat(data.bundleDetail.discountValue) >
        calculateMrp(arrY) + calculateMrp(arrX)
      ) {
        finalPrice = 0;
      } else {
        finalPrice =
          calculateMrp(arrX) +
          calculateMrp(arrY) -
          data.bundleDetail.discountValue;
      }
    } else {
      finalPrice = calculateMrp(arrX);
    }
    return finalPrice;
  }

  //function to calculate Mrp

  function calculateMrp(arr) {
    let sum = 0;
    arr?.map((item) => {
      item.map((sub) => {
        sum += parseFloat(sub);
      });
    });
    // setMrp(parseFloat(sum).toFixed(2));
    return parseFloat(sum.toFixed(2));
  }

  //----------------------------------------------------------------------

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

  const handleSave = async () => {
    let alertText = [];
    let flag = true;

    let search1 = [];
    data.bundleDetail.xproducts.map((item, index) => {
      if (item.minimumOrder < 1 || item.minimumOrder == "") {
        search1.push(index);
      }
    });

    if (search1.length > 0 || data.bundleDetail.xproducts.length < 1) {
      flag = false;
      setPickerError(search1);
      alertText.push(
        "Minimum  products for bundle  is 1  & Minimum Order for each X product   can not be empty  or less than 1 ."
      );
    }

    let search2 = [];
    data.bundleDetail.yproducts.map((item, index) => {
      if (item.minimumOrder < 1 || item.minimumOrder == "") {
        search2.push(index);
      }
    });
    if (search2.length > 0 || data.bundleDetail.yproducts.length < 1) {
      flag = false;
      setPickerError(search2);
      alertText.push(
        "Minimum  products for bundle  is 1  & Minimum Order for each Y product  can not be empty  or less than 1 ."
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

    if (data.description == "") {
      if (!errorArray.includes("bundleDescription")) {
        setErrorArray((prev) => [...prev, "bundleDescription"]);
      }
      flag = false;
      alertText.push("Please provide description of bundle");
    }

    // if (data.startdate == "") {
    //   if (!errorArray.includes("startdate")) {
    //     setErrorArray((prev) => [...prev, "startdate"]);
    //   }
    //   flag = false;
    //   alertText.push("Please select start date & time");
    // }
    if (flag == false) {
      alertCommon(setAlert, alertText, "critical", false);
    }

    if (flag == true) {
      setSpinner(true);
      setErrorArray("");
      setPickerError([]);
      if (param.id == "create") {
        try {
          console.log(" in the try");
          const response = await postApi("/api/admin/createBundle", data, app);
          if (response.data.status === 200) {
            return (
              toastNotification("success", "Saved", "bottom"),
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
        } catch (err) {
          console.log(err);
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
    <Spin spinning={spinner}>
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
            <BuyX data={data} setData={setData} />
            <BuyY data={data} setData={setData} />
            <DiscountSet 
              discountType={data.bundleDetail.discountType}
              discountValue={data.bundleDetail.discountValue} 
              data={data} 
              setData={setData} 
            />
            <General data={data} setData={setData} errorArray={errorArray} />
            {/* <DateTime data={data} setData={setData} errorArray={errorArray} /> */}
          </div>
          <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
            <BundleStatus data={data} setData={setData} />
            <DisplayOptions
              bundleType="bxgy"
              display={data.bundleDetail.display}
              handleDisplayOptions={handleDisplayOptions}
              displayPageOptions={data.bundleDetail.display.productPages}
              handleDisplayPageOptions={handleDisplayPageOptions}
              xproducts={data.bundleDetail.xproducts}
              yproducts={data.bundleDetail.yproducts}
            />
            <BxgyBundlePreviewData
              data={data}
              currency={currencyCode}
              mrp={mrp}
              endPrice={endPrice}
              showPrice={showPrice}
              //handleVariantChoice={handleVariantChoice}
              bundleType={"productBundle"}
              errorArray={errorArray}
            />
          </div>
        </div>
        <div className="sd-bundle-wrapper-common">
          <DeleteSave handleSave={handleSave} />
        </div>
      </div>
    </Spin>
  );
};

export default BuyXgetY;