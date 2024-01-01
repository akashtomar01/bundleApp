import React from 'react'
import { Card, Button, Input, Modal, Table,Select,Dropdown,Space,Tabs} from "antd";
import { ArrowLeftOutlined} from "@ant-design/icons";
import BundleSetting from '../components/bundleSetting';
import Translation from '../components/translation';
import {TranslationOutlined,FormOutlined,SettingOutlined,UnorderedListOutlined} from "@ant-design/icons"
import { useNavigate } from "@shopify/app-bridge-react";
import Watermark from '../components/watermark';
import ContactUs from '../components/contactUs';
import LogoHeader from '../components/logoHeader';


const Settings = () => {
  const navigate = useNavigate()

  const items = [
    {
      key: '1',
      label: `Bundle Settings`,
      children: <div> 
        <BundleSetting/>
    </div>
    },
    {
      key: '2',
      label: `Translation`,
      children: <div>
         <Translation/>
      </div>,
    },
 
  ];

  const onChange = (key) => {
  };

  return (
    <>
    <LogoHeader/>
    <div className='sd-bundle-setting-container sd-margin-top'>
        <div className="sd-bundle-MoveToHome-section">
     
        
     <div className="sd-bundle-MoveToHome-arrow">


 </div>
 <div className="sd-bundle-commonHeading">Setting</div>


</div>
        <Card className='sd-bundle-setting-card-box'
        // title="Settings"
        >
   
          {/* <div className='sd-bundle-setting-item-box'>
             <div onClick={()=>navigate('/BundleSetting')} className='sd-bundle-setting-container-item'>
            <div className='sd-bundle-setting-item-icon'>
            <SettingOutlined className='sd-bundle-setting-icon'/>
            </div>
            <div  className='sd-bundle-setting-item-detail'>
              <span>Bundle Settings</span>
              <p>Here you can manage settings about bundle</p>
            </div>
          </div>

          <div  onClick={()=>navigate('/translation')}  className='sd-bundle-setting-container-item'>
            <div className='sd-bundle-setting-item-icon'>
            <TranslationOutlined className='sd-bundle-setting-icon' />
            </div>
            <div className='sd-bundle-setting-item-detail'>
              <span>Translation</span>
              <p>Translate the bundles' content to your shops language</p>
            </div>
          </div>

       
          </div> */}

<Tabs defaultActiveKey="1" items={items} onChange={onChange}  />

           
        </Card>
        <Watermark/>
        <ContactUs/>
    </div>
    </>
  )
}

export default Settings