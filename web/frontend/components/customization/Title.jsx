import React from "react" ;
import { Divider } from "antd";
import { TextField,Select } from "@shopify/polaris";
import { handleChangeCommon,handleChangeValueCommon } from "../helperFunctions";
const Title=({bundleOption,displayOption,data,setData})=>{

return(

 <div className="sd-bundle-titleCustom">

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Title styling</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["title"]["color"]}  onChange={(e)=>handleChangeCommon(e,"title","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Title Color </p>
<p> {data[bundleOption]["title"]["color"]} </p>

</div>
</div>

 <TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon(e,"title","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["title"]["fontSize"]}
            autoComplete="off"
            min="0"
          /> 
        
           <Select

              label="Boldness"
              options={['100','200','300','400','500','600','700','800','900']}
              value={data[bundleOption]["title"]["titleBold"]}
              onChange={(e)=>handleChangeValueCommon(e,"title","titleBold",data,setData,bundleOption)}
            />
</div>
<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Description styling</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["title"]["color"]}  onChange={(e)=>handleChangeCommon(e,"title","descriptionColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Description Color </p>
<p> {data[bundleOption]["title"]["descriptionColor"]} </p>

</div>
</div>

 <TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon(e,"title","descriptionFontSize",data,setData,bundleOption)}
            value={data[bundleOption]["title"]["descriptionFontSize"]}
            autoComplete="off"
            min="0"
          /> 
           <Select

label="Boldness"
options={['100','200','300','400','500','600','700','800','900']}
value={data[bundleOption]["title"]["descriptionBold"]}
onChange={(e)=>handleChangeValueCommon(e,"title","descriptionBold",data,setData,bundleOption)}
/>
</div>

 <div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Alignment</p>
<div className="sd-bundle-item-custom-radio-common">
    <input  id="left"   type="radio" name="position"  checked={data[bundleOption]["title"]["alignment"] == "left"} value="left" onChange={(e)=>handleChangeCommon(e,"title","alignment",data,setData,bundleOption)}/>
<label htmlFor="left"  >Left</label>
</div>
<div className="sd-bundle-item-custom-radio-common">
    <input  id="center"   type="radio" name="position"  value="center"  checked={data[bundleOption]["title"]["alignment"] == "center"} onChange={(e)=>handleChangeCommon(e,"title","alignment",data,setData,bundleOption)}/>
<label htmlFor="center" >Center</label>
</div>
<div className="sd-bundle-item-custom-radio-common">
    <input  id="right"   type="radio" name="position"  value="right" checked={data[bundleOption]["title"]["alignment"] == "right"} onChange={(e)=>handleChangeCommon(e,"title","alignment",data,setData,bundleOption)}/>
<label htmlFor="right" >Right</label>
</div>

</div>  

</div> 


)

}

export default Title;
