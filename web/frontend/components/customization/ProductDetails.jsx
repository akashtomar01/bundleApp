import React from "react" ;
import { TextField } from "@shopify/polaris";
import { handleChangeCommon,handleChangeValueCommon,handleChangeCommon2,handleChangeValueCommon2 } from "../helperFunctions";

const ProductDetails=({bundleOption,data,setData,displayOption})=>{
    

// const handlePlusMinusColor=(e)=>{

//    setData({
//     ...data,
//     productDetails:{
//         ...productDetails,
//     }
//    })

//}


return(

 <div className="sd-bundle-boxCustom">

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Title</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["title"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","title","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Title Color </p>
<p> {data[bundleOption]["productDetails"]["title"]["color"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon2(e,"productDetails","title","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["productDetails"]["title"]["fontSize"]}
            autoComplete="off"
            min="0"
          />


</div>


<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Price</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["price"]["color"]} onChange={(e)=>handleChangeCommon2(e,"productDetails","price","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Price Color </p>
<p> {data[bundleOption]["productDetails"]["price"]["color"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon2(newvalue,"productDetails","price","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["productDetails"]["price"]["fontSize"]}
            autoComplete="off"
            min="0"
          />
</div>


<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Image</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["image"]["borderColor"]} onChange={(e)=>handleChangeCommon2(e,"productDetails","image","borderColor",data,setData,bundleOption)}/>

<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Border Color </p>
<p> {data[bundleOption]["productDetails"]["image"]["borderColor"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Border Radius"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon2(newvalue,"productDetails","image","borderRadius",data,setData,bundleOption)}
            value={data[bundleOption]["productDetails"]["image"]["borderRadius"]}
            autoComplete="off"
            min="0"
          />

</div>

{bundleOption != "popUp" &&
<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Quantities</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantities"]["color"]} onChange={(e)=>handleChangeCommon2(e,"productDetails","quantities","color",data,setData,bundleOption)}/>

<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p> {data[bundleOption]["productDetails"]["quantities"]["color"]} </p>

</div>
</div>


<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantities"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","quantities","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["productDetails"]["quantities"]["backgroundColor"]} </p>

</div>
</div>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantities"]["borderColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","quantities","borderColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Border Color </p>
<p> {data[bundleOption]["productDetails"]["quantities"]["borderColor"]} </p>

</div>
</div>
</div>

}

{/* 
{ bundleOption == "volume" && <div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Quantities Selector</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantitiesSelector"]["color"]} onChange={(e)=>handleChangeCommon2(e,"productDetails","quantitiesSelector","color",data,setData,bundleOption)}/>

<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p> {data[bundleOption]["productDetails"]["quantitiesSelector"]["color"]} </p>

</div>
</div>


<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantitiesSelector"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","quantitiesSelector","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["productDetails"]["quantitiesSelector"]["backgroundColor"]} </p>

</div>
</div>


<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["quantitiesSelector"]["plusMinusColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","quantitiesSelector","plusMinusColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>PlusMinus Color </p>
<p> {data[bundleOption]["productDetails"]["quantitiesSelector"]["plusMinusColor"]} </p>

</div>
</div>

</div> } */}


<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Variant Selector Style</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["variantSelector"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","variantSelector","color",data,setData,bundleOption)}/>

<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p>{data[bundleOption]["productDetails"]["variantSelector"]["color"]} </p>

</div>
</div>

<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["variantSelector"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","variantSelector","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p>{data[bundleOption]["productDetails"]["variantSelector"]["backgroundColor"]} </p>

</div>
</div>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["variantSelector"]["borderColor"]}  onChange={(e)=>handleChangeCommon2(e,"productDetails","variantSelector","borderColor",data,setData,bundleOption)}/>

<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Border Color </p>
<p>{data[bundleOption]["productDetails"]["variantSelector"]["borderColor"]} </p>

</div>
</div>
</div>


{bundleOption != "volume" && <div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Plus Icon</p>

<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["plusColor"]} onChange={(e)=>handleChangeCommon(e,"productDetails","plusColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Color </p>
<p>{data[bundleOption]["productDetails"]["plusColor"]}</p>

</div>
</div>
<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["productDetails"]["plusBackgroundColor"]} onChange={(e)=>handleChangeCommon(e,"productDetails","plusBackgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p>{data[bundleOption]["productDetails"]["plusBackgroundColor"]}</p>

</div>

</div>
<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(newvalue)=>handleChangeValueCommon(newvalue,"productDetails","plusfontSize",data,setData,bundleOption)}
            value={data[bundleOption]["productDetails"]["plusfontSize"]}
            autoComplete="off"
            min="0"
          />
</div>}

</div> 
)


}

export default ProductDetails;
