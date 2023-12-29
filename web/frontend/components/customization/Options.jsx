import React from "react" ;
import { Divider } from "antd";
import { TextField } from "@shopify/polaris";
import { handleChangeCommon,handleChangeCommon2,handleChangeValueCommon,handleChangeValueCommon2 } from "../helperFunctions";

const Options=({bundleOption,data,setData,displayOption})=>{


return(

 <div className="sd-bundle-optionsCustom">
    
{/* <div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Icon</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["options"]["iconColor"]}  onChange={(e)=>handleChangeCommon(e,"options","iconColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>BackgroundColor </p>
<p> {data[bundleOption]["options"]["iconColor"]}</p>

</div>
</div>

</div> */}
 <div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Text</p>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["options"]["color"]}  onChange={(e)=>handleChangeCommon(e,"options","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Title Text Color </p>
<p>{data[bundleOption]["options"]["color"]} </p>
</div>
</div>

<TextField
            type="number"
            label="Font Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon(newvalue,"options","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["options"]["fontSize"]}
            autoComplete="off"
            min="0"
          />
</div> 



<div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Save Discount Badge </p>

<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["options"]["saveDiscount"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"options","saveDiscount","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p> {data[bundleOption]["options"]["saveDiscount"]["color"]}  </p>
</div>
</div>

<TextField
            type="number"
            label="Font Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon2(newvalue,"options","saveDiscount","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["options"]["saveDiscount"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["options"]["saveDiscount"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon2(e,"options","saveDiscount","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["options"]["saveDiscount"]["backgroundColor"]}  </p>
</div>
</div>


<TextField
            type="number"
            label="Border Radius"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon2(newvalue,"options","saveDiscount","borderRadius",data,setData,bundleOption)}
            value={data[bundleOption]["options"]["saveDiscount"]["borderRadius"]}
            autoComplete="off"
            min="0"
          />
</div> 



</div> 

)

}

export default Options;
