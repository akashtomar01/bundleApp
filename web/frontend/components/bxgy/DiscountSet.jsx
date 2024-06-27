import {useState} from 'react'
import { Select,InputNumber } from 'antd';
import { useAPI } from '../shop';
const DiscountSet = (props) => {
  const { shop, timeZone, currencyCode } = useAPI();
    console.log("check props--------------------------------->",props);
    // const [discount,setDiscount] = useState(props.discountType)
    function handleSelectDiscount(e){
      // setDiscount(e)
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
        // defaultValue={props.discountType}
        value={props.discountType}
        // defaultActiveFirstOption={props.discountType}
        style={{
          width: 300,
        }}
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
    props.discountType !== "free" ? <InputNumber min={1} max={props.discountType == "percent" ? 100 : null} onChange={handleDiscountValue} value={props.discountValue} prefix={props.discountType == "fixed" ? currencyCode.replace(/{{.*?}}/g, "")  : null} suffix={ props.discountType == "percent" ? "%" : null}  />  : null 
}     
      </div>
    </div>
  )
}

export default DiscountSet