import React, { useEffect, useState } from 'react'
import { Card ,Divider,Typography,Row,Col,Spin,Input,Skeleton} from 'antd';
import {Button,Icon,} from "@shopify/polaris";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useNavigate } from "@shopify/app-bridge-react";
import { useAppBridge } from "@shopify/app-bridge-react";
import postApi from './postApi';
import BoatLoader from './BoatLoader';
import toastNotification from './commonSections/Toast';

const BundleSetting = () => {
  const navigate = useNavigate()
  const app = useAppBridge();
  const [spinner,setSpinner] = useState(false)
  const [settingData,setSettingData] = useState({
  shop:"",
  discountLabel:""
  })

  useEffect(()=>{
    getSetting()
  },[])
async function getSetting(){
  setSpinner(true)
  const response = await postApi("/api/admin/getSetting",{},app)
  if(response){
    setSpinner(false)
    if(response.data.status == 200){
    setSettingData(response.data.response)
    }
    else if(response.data.status == 500){
      toastNotification("warning","Something went wrong ! please try again","bottom")
    }
  }
}

async function handleSave(){
  setSpinner(true)
const response = await postApi("/api/admin/saveSetting",settingData,app)
if(response){
  setSpinner(false)
  if(response.data.status == 200){
    toastNotification("success","Save Successfully","bottom")
  }else{
    toastNotification("warning","Something went wrong ! please try again","bottom")
  }
}
}
function handleDiscountLabel(e){
setSettingData({...settingData,discountLabel:e.target.value})
}
  return (
  //  <Spin 
  //  spinning={spinner}
  //  indicator={<BoatLoader/>}
  //  >
     
     <div className='sd-bundle-setting-translation'>
      <div className='sd-bundle-bundle-setting'>
      {/* <Typography.Title
        level={3}
        style={{
          margin: 0,
        }}
      >
        Discount Label
      </Typography.Title>
        <span>This label appears on the discounted bundle items in your cart.</span>
        <Typography.Title
        level={2}
        style={{
          margin: 0,
        }}
      >
      Bundle-
      </Typography.Title>
      */}
    
      {/* <div className='sd-bundle-setting-box'>
        <div className='sd-bundle-setting-left-heading'>
        <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        Subscription
      </Typography.Title>
       <span>

        Install any subscription app and start selling your bundles weekly, monthly, yearly, etc.
       </span>
      
        </div>
        <div className='sd-bundle-setting-right-heading'>
             <Card className='sd-bundle-subscription-box'>
              this feature is comming soon.
             </Card>
          </div>
      </div> */}

      <div className='sd-bundle-setting-box'>
        <Skeleton active loading={spinner}>
        <div className='sd-bundle-setting-left-heading'>
        <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        Discount
      </Typography.Title>
        
        </div>
        <div className='sd-bundle-setting-right-heading'>
        <Card className='sd-bundle-subscription-box'>
        <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Discount label
      </Typography.Title>
      <span>
      This label appears on the discounted bundle items in your cart.
      </span>
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
       {/* Label: <input type="text" placeholder='BUNDLE DISCOUNT' value={settingData.discountLabel} onChange={handleDiscountLabel} />  */}
       <Input className='sd-setting-discount-prefix'  addonAfter="-XXXXXX" onChange={handleDiscountLabel} value={settingData.discountLabel} />
      </Typography.Title>
             </Card>
          </div>
          </Skeleton>
      </div>

      <div className='sd-bundle-setting-box'>
        <div className='sd-bundle-setting-left-heading'>

        </div>
        <div className='sd-bundle-setting-right-heading'>

          </div>
      </div>
      <div>
        
        <button onClick={handleSave}>save</button>
      </div>
      </div> 
     

   </div>
  //  {/* </Spin> */}
  )
}

export default BundleSetting