import React from "react" ;
import { Divider } from "antd";
import { TextField } from "@shopify/polaris";
import { handleChangeCommon,handleChangeCommon2,handleChangeValueCommon,handleChangeValueCommon2 } from "../helperFunctions";

const TotalSection=({bundleOption,displayOption,data,setData})=>{
    console.log(data[bundleOption]["totalSection"]["background"])
return(

 <div className="sd-bundle-boxCustom">
    
<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Background</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["totalSection"]["background"]}  onChange={(e)=>handleChangeCommon(e,"totalSection","background",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["totalSection"]["background"]}</p>

</div>
</div>

</div>
 <div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Text</p>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["totalSection"]["color"]}  onChange={(e)=>handleChangeCommon(e,"totalSection","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p>{data[bundleOption]["totalSection"]["color"]} </p>
</div>
</div>

<TextField
            type="number"
            label="Font Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon(newvalue,"totalSection","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["totalSection"]["fontSize"]}
            autoComplete="off"
            min="0"
          />
</div> 

<div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Original Price Style</p>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["totalSection"]["originalPrice"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"totalSection","originalPrice","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Price Color </p>
<p> {data[bundleOption]["totalSection"]["originalPrice"]["color"]}  </p>
</div>
</div>

<TextField
            type="number"
            label="Font Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon2(newvalue,"totalSection","originalPrice","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["totalSection"]["originalPrice"]["fontSize"]} 
            autoComplete="off"
            min="0"
          />
</div> 

<div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Final Price Style</p>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["totalSection"]["finalPrice"]["color"]} onChange={(e)=>handleChangeCommon2(e,"totalSection","finalPrice","color",data,setData,bundleOption)} />
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Price Color </p>
<p> {data[bundleOption]["totalSection"]["finalPrice"]["color"]} </p>
</div>
</div>

<TextField
            type="number"
            label="Font Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon2(e,"totalSection","finalPrice","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["totalSection"]["finalPrice"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

</div> 

</div>

)

}

export default TotalSection;
