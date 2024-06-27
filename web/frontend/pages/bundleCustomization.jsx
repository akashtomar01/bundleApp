import React, { useEffect, useState } from "react";
import CustomizationEditor from "../components/customization/CustomizationEditor";
import defaultData from "../components/customization/defaultData.json";
import { themeData } from "../components/customization/themeData";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import postApi from "../components/postApi";
import BoatLoader from "../components/BoatLoader";
const BundleCustomization = () => {
  const app = useAppBridge();
 const params = useLocation()
  const fullscreen = Fullscreen.create(app);
  // const [fullScreen, setFullScreen] = useState(false);

  const [bundleOption, setBundleOption] = useState("bundle");
  const [spinner,setSpinner] = useState(false)
  // const [data, setData] = useState(defaultData["bundle"]);
  const [data, setData] = useState({
    bundle:defaultData["bundle"],
    volume:defaultData["volume"],
    collection:defaultData["collectionMixMatch"],
    popUp:defaultData["popUp"],
    buyXgetY:defaultData["buyXgetY"],
    productMixMatch:defaultData["productMixMatch"],
    frequentlyBoughtTogether:defaultData["frequentlyBoughtTogether"]
    });

    async function getCustomizationData(){
      setSpinner(true)
      const response = await postApi("/api/admin/getCustomization",{},app)
      console.log('get api call',response);
      if(response.data.status == 200){
        setSpinner(false)
        
         setData({bundle:response.data.response.bundle,
                  volume:response.data.response.volume,
                  collection:response.data.response.collectionMixMatch,
                  buyXgetY:response.data.response.buyXgetY,
                  // productMixMatch:defaultData['productMixMatch'],
                  productMixMatch:response.data.response.productMixMatch,
                  popUp:response.data.response.popUp,
                  frequentlyBoughtTogether:response.data.response.frequentlyBoughtTogether,
                })
      }
    }
    useEffect(()=>{
    getCustomizationData()
    },[])

useEffect(() => {
  if(params.pathname == "/bundleCustomization"){

    fullscreen.dispatch(Fullscreen.Action.ENTER);
  }
  // setFullScreen(true);

}, [])
  return (
    <>
    <Spin
    spinning={spinner}
    indicator={<BoatLoader/>}
    size="large"
    >
        <CustomizationEditor
          data={data}
          setData={setData}
          bundleOption={bundleOption}
          setBundleOption={setBundleOption}
        />
        </Spin>
         </>
  );
};
export default BundleCustomization;
