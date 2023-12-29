import React from "react" ;
import { TextField } from "@shopify/polaris";

const Box=(props)=>{
console.log(props)

     let dataToChange=props["data"][props.bundleOption]
    const handleChangeCommon=(e,key1,key2,bundleOption)=>{
    
        props.setData({...props.data,[bundleOption]:{...(props["data"][props.bundleOption]),[key1]:{...(props["data"][props.bundleOption][key1]),[key2]:e.target.value}}})   
     }
        const handleChangeValueCommon=(newvalue,key1,key2,bundleOption)=>{
    

        if (newvalue == "" || newvalue < 0) {
        props.setData({...props.data,[bundleOption]:{...(props["data"][props.bundleOption]),[key1]:{...(props["data"][props.bundleOption][key1]),[key2]:0}}})  
        } 
        else {  
            newvalue = String(newvalue);
            {
            newvalue = newvalue.replace(/^0/, "");
        props.setData({...props.data,[bundleOption]:{...(props["data"][props.bundleOption]),[key1]:{...(props["data"][props.bundleOption][key1]),[key2]:newvalue}}})   
        }}
        }

     return(

     <>
{  props.displayOption == "productPages"   ? 
    <div className="sd-bundle-boxCustom">
<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Background</p>
    <div  className="sd-bundle-custom-item-inputSection">
<input type="color" value={dataToChange.box.backgroundColor}  onChange={(e)=>handleChangeCommon(e,"box","backgroundColor",props.bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {dataToChange.box.backgroundColor} </p>
</div>
</div>
</div>
 <div className="sd-bundle-custom-item-common">
<p className="sd-bundle-custom-item-heading-common">Border</p>
<div className="sd-bundle-custom-item-inputSection" >
<input type="color"  value={dataToChange.box.borderColor} onChange={(e)=>handleChangeCommon(e,"box","borderColor",props.bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Border Color </p>
<p> {dataToChange.box.borderColor} </p>
</div>
</div>
<TextField
            type="number"
            label="Radius"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon(newvalue,"box","borderRadius",props.bundleOption)}
            value={dataToChange.box.borderRadius}
            autoComplete="off"
            min="0"
          />
<TextField
            type="number"
            label="Thickness"
            onChange={(newvalue)=>handleChangeValueCommon(newvalue,"box","thickness",props.bundleOption)}
            value={dataToChange.box.thickness}
            autoComplete="off"
            min="0"
          />
</div> 
</div> 
:
props.displayOption == "popUp" ?
<div className="sd-bundle-boxCustom">
<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Background</p>
    <div  className="sd-bundle-custom-item-inputSection">
<input type="color" value={dataToChange.box.backgroundColor}  onChange={(e)=>handleChangeCommon(e,"box","backgroundColor",props.bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {dataToChange.box.backgroundColor} </p>
</div>
</div>
</div>


</div>
:

<>fsdfsd</>
     }
    </>
 )
}

export default Box;
