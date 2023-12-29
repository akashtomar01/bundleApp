import React from "react" ;
import { Divider } from "antd";
import { TextField,Select } from "@shopify/polaris";
import { Radio,Space,Avatar } from 'antd';
import { handleChangeCommon,handleChangeValueCommon } from "../helperFunctions";
const DiscountBadge=({data,setData,bundleOption,displayOption})=>{
  console.log(data)







    const handleText=(newvalue)=>{
           setData({...data,
            [bundleOption]:{
                ...data[bundleOption],
            DiscountBadge:{...data[bundleOption]["DiscountBadge"],text:newvalue}
            }
        
        })
    }

return(


 <div className="sd-bundle-titleCustom">

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Discount Badge </p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["DiscountBadge"]["color"]}  onChange={(e)=>handleChangeCommon(e,"DiscountBadge","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p> {data[bundleOption]["DiscountBadge"]["color"]} </p>

</div>
</div>


<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["DiscountBadge"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon(e,"DiscountBadge","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["DiscountBadge"]["backgroundColor"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon(e,"DiscountBadge","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["DiscountBadge"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

<TextField
            type="texts"
            label="Text"
            // placeholder="set minimum order  for item"
            onChange={handleText}
            value={data[bundleOption]["DiscountBadge"]["text"]}
            autoComplete="off"
            min="0"
          />

  <div>Select Badges</div>
    
    <Radio.Group 
     onChange={(e)=>handleChangeValueCommon(e.target.value,"DiscountBadge","badgeType",data,setData,bundleOption)} 
     value={data[bundleOption]["DiscountBadge"]["badgeType"]}
     
     >
   
      <Space direction="vertical">
       
        <Radio value="leftBanner">
        <img src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/leftBanner.png?v=1700562806" />
        </Radio>
        <Radio value="rightBanner">
        <img src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/rightBanner.png?v=1700562892" />

        </Radio>
        <Radio value='ribbon'>
        <img src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/ribbon.png?v=1700562892" />

        </Radio>
      </Space>
    </Radio.Group>

</div>


</div> 

)

}

export default DiscountBadge;
