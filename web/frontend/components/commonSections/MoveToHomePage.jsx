import {useState,useEffect} from 'react'
import {Button,Icon,} from "@shopify/polaris";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useNavigate } from "@shopify/app-bridge-react";
import { Popconfirm } from 'antd';
import { Fullscreen } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";

const MoveToHomePage = (props) => {
console.log(props)
  const navigate = useNavigate();



  return (
    <div className="sd-bundle-MoveToHome-section">
     
        
          <div className="sd-bundle-MoveToHome-arrow">
          {/* <Popconfirm
    title="Discard Bundle"
    onConfirm={() => navigate("/")}
    description="Are you sure to discard this bundle?"
    okText="Yes"
    cancelText="No"
  > */}
         <Button 
         onClick={() => navigate("/bundle")}>
        <ArrowLeftOutlined />
      </Button>
  {/* </Popconfirm> */}
     
    

      </div>
      <div className="sd-bundle-commonHeading">{props.data}</div>
     

  </div>

  )
}

export default MoveToHomePage;