import React, { useState,useEffect } from 'react'
import { Card ,Divider,Spin,Skeleton} from 'antd';
import {Button,Icon,} from "@shopify/polaris";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useNavigate } from "@shopify/app-bridge-react";
import { useAppBridge } from "@shopify/app-bridge-react";
import postApi from './postApi';
import BoatLoader from './BoatLoader';
import toastNotification from "./commonSections/Toast.jsx";
import Watermark from './watermark';

const Translation = () => {
  const navigate = useNavigate()
  const app = useAppBridge();

  const [translateField,setTranslateField] = useState({})
  const [spinner,setSpinner] = useState(false) 

async function getTranslation(){
  setSpinner(true)
  const response = await postApi("/api/admin/getTranslation", translateField, app);
  if(response.data.status == 200){
    setTranslateField(response.data.response.translation)
    setSpinner(false)
   

  }
}
  useEffect(() => {
    getTranslation()
  }, [])

 const handleTranslation = (e) =>{
 setTranslateField({
    ...translateField,
    [e.target.name]:e.target.value
 })
 }
async function handleSave(){
setSpinner(true)
const response = await postApi("/api/admin/updateTranslation", translateField, app);
if(response.data.status == 200){
  setSpinner(false)
  toastNotification("success","Save Successfully","bottom")
}else{
  setSpinner(false)
  toastNotification("warning","Something went wrong ! please try again","bottom")

}
}

  return (
    // <Spin spinning={spinner}
    // indicator={<BoatLoader/>}
    // size="large"> 
    <div className='sd-bundle-setting-translation'>
     {/* <div className='sd-bundle-MoveToHome-section'>
        <div className='sd-bundle-MoveToHome-arrow'>
        <Button 
         onClick={() => navigate("/settings")}>
        <ArrowLeftOutlined />
      </Button>
        </div>
        <div className="sd-bundle-commonHeading">Translation</div>
        <div>
    
        </div>
     </div> */}
     <div className='sd-bundle-translate-content'>
      <Skeleton active paragraph={{rows:25}} loading={spinner}>
               <div className='sd-bundle-translate-heading-row'>
               <div className='sd-bundle-translate-original-col'>
               <div className='sd-bundle-translate-heading-text'><h3>Original</h3>
               <h3>Translate</h3></div>
            
               <div className='sd-bundle-translate-originalText'>
                <h3>add</h3>
                <input onChange={handleTranslation} name='add' className='sd-bundle-translate-translate-text' type="text" value={translateField.add} />
               </div>
               <div className='sd-bundle-translate-originalText'><h3>off</h3>
                <input onChange={handleTranslation} name='off' className='sd-bundle-translate-translate-text' type="text"  value={translateField.off} />
             
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Total</h3>
               <input onChange={handleTranslation} name='total' className='sd-bundle-translate-translate-text' type="text"  value={translateField.total}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Free Shipping</h3> 
               <input onChange={handleTranslation} name='FreeShipping' className='sd-bundle-translate-translate-text' type="text"  value={translateField.FreeShipping}/>
               
               </div>
               <div className='sd-bundle-translate-originalText'><h3>search products</h3>
               <input onChange={handleTranslation} name='searchProducts' className='sd-bundle-translate-translate-text' type="text"  value={translateField.searchProducts}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>See more</h3>
               <input onChange={handleTranslation} name='seeMore' className='sd-bundle-translate-translate-text' type="text" value={translateField.seeMore}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>See less</h3>
               <input onChange={handleTranslation} name='seeLess' className='sd-bundle-translate-translate-text' type="text" value={translateField.seeLess}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Discount will be applied at checkout</h3>
               <input onChange={handleTranslation} name='discountApplied' className='sd-bundle-translate-translate-text' type="text"  value={translateField.discountApplied}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>save</h3>
               <input onChange={handleTranslation} name='save' className='sd-bundle-translate-translate-text' type="text"  value={translateField.save}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>delete</h3>
               <input onChange={handleTranslation} name='delete' className='sd-bundle-translate-translate-text' type="text"  value={translateField.delete}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>added</h3>
               <input onChange={handleTranslation} name='added' className='sd-bundle-translate-translate-text' type="text"  value={translateField.added}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>added items</h3>
               <input onChange={handleTranslation} name='addedItems' className='sd-bundle-translate-translate-text' type="text"  value={translateField.addedItems}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>add {"{{item}}"} to save more</h3>
               <input onChange={handleTranslation} name='addItemToSaveMore' className='sd-bundle-translate-translate-text' type="text"  value={translateField.addItemToSaveMore}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Add to cart</h3>
               <input onChange={handleTranslation} name='addToCartButton' className='sd-bundle-translate-translate-text' type="text"  value={translateField.addToCartButton}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Go To Bundle Builder</h3>
               <input onChange={handleTranslation} name='goToBundleBuilder' className='sd-bundle-translate-translate-text' type="text"  value={translateField.goToBundleBuilder}/>
               </div>
               <div className='sd-bundle-translate-originalText'><h3>Grab the deal</h3>
               <input onChange={handleTranslation} name='grabTheDeal' className='sd-bundle-translate-translate-text' type="text"  value={translateField.grabTheDeal}/>
               </div>
               </div>
             
               </div>
               <div className='sd-bundle-translate-originalButton'>
                <button onClick={handleSave}>Save</button>
              </div>
              </Skeleton>
     </div>
     <div>
     </div>
     
    </div>
    // </Spin>
  )
}

export default Translation