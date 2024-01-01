import React from "react" ;
import { TextField } from "@shopify/polaris";
import { handleChangeCommon,handleChangeValueCommon } from "../helperFunctions";
const ButtonSection=({bundleOption,data,setData})=>{

const handleNoDiscountText=(newvalue)=>{
setData({...data,[bundleOption]:{...data[bundleOption],button:{...data[bundleOption]["button"],text_noDiscount:newvalue}}})

}

const handleText=(newvalue)=>{
    setData({...data,[bundleOption]:{...data[bundleOption],button:{...data[bundleOption]["button"],text_others:newvalue}}})
}


return(

<div className="sd-bundle-buttonCustom">

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Background</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["button"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon(e,"button","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color</p>
<p> {data[bundleOption]["button"]["backgroundColor"]} </p>

</div>
</div>

</div>

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Button Text</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["button"]["color"]}  onChange={(e)=>handleChangeCommon(e,"button","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color</p>
<p> {data[bundleOption]["button"]["color"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon(e,"button","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["button"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

{/* <TextField
           
            label="text"
            // placeholder="set minimum order  for item"
            onChange={handleText}
            value={data[bundleOption]["button"]["text_others"]}
            autoComplete="off"
        
          />

<TextField
           
            label="text(for 'No Discount' option)"
            // placeholder="set minimum order  for item"
            onChange={handleNoDiscountText}
            value={data[bundleOption]["button"]["text_noDiscount"]}
            autoComplete="off"
            
          /> */}
 
</div>
{bundleOption != "collection" &&
<div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Position</p>
<div className="sd-bundle-item-custom-radio-common">
    <input  id="top"   type="radio" name="position"  value="top" checked={data[bundleOption]["button"]["position"]=="top"} onChange={(e)=>handleChangeCommon(e,"button","position",data,setData,bundleOption)}/>
<label htmlFor="top" >top</label>
</div>
<div className="sd-bundle-item-custom-radio-common">
    <input  id="bottom"   type="radio" name="position"  value="bottom" checked={data[bundleOption]["button"]["position"]=="bottom"} onChange={(e)=>handleChangeCommon(e,"button","position",data,setData,bundleOption)}/>
<label htmlFor="bottom" >bottom</label>
</div>


</div> }

</div>

)


}

export default ButtonSection;
