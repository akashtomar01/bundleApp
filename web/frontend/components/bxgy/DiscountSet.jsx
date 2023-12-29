import {useState} from 'react'
import { Select,InputNumber } from 'antd';
import { useAPI } from '../shop';
const DiscountSet = (props) => {
  const { shop, timeZone, currencyCode } = useAPI();
    
    const [discount,setDiscount] = useState("percent")
    function handleSelectDiscount(e){
setDiscount(e)
props.setData({
    ...props.data,
    bundleDetail: {
      ...props.data.bundleDetail,
      discountType: e,
    },
  });
    }
    function handleDiscountValue(e){
      
        props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              discountValue: e,
            },
          });
    }
  return (
        <div className="sd-bundle-bundleSection-common sd-bundle-productBundleSearchSection">
               <div className="sd-bundle-bundleSection-heading-common">
               Discount
              </div>
              <div className="sd-bundle-discount-value">
              <Select
              onChange={handleSelectDiscount}
      defaultValue={props.data.bundleDetail.discountType}
      style={{
        width: 300,
      }}
    //   onChange={handleChange}
      options={[
        {
          value: 'percent',
          label: 'Percentage discount',
        },
        {
          value: 'fixed',
          label: 'Fixed discount',
        },
        {
          value: 'free',
          label: 'Free gift',
        },
      
      ]}
    />
    {
        discount !== "free" ? <InputNumber min={0} max={discount == "percent" ? 100 : null} onChange={handleDiscountValue} defaultValue={props.data.bundleDetail.discountValue} prefix={discount == "fixed" ? currencyCode.replace(/{{.*?}}/g, "")  : null} suffix={ discount == "percent" ? "%" : null}  />  : null 
    }
    
   
            
        </div>
        </div>

  )
}

export default DiscountSet