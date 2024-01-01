import React from "react" ;
import { Divider } from "antd";
import { TextField } from "@shopify/polaris";
import { handleChangeCommon,handleChangeValueCommon,handleChangeCommon2,handleChangeValueCommon2 } from "../helperFunctions";

const CollectionDetails=({data,setData,bundleOption,displayOption})=>{



return(

 <div className="sd-bundle-boxCustom">

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Title</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["collectionDetails"]["title"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"collectionDetails","title","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Title Color </p>
<p> {data[bundleOption]["collectionDetails"]["title"]["color"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon2(e,"collectionDetails","title","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["collectionDetails"]["title"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

</div>



<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Description</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["collectionDetails"]["description"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"collectionDetails","description","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Text Color </p>
<p> {data[bundleOption]["collectionDetails"]["description"]["color"]} </p>

</div>
</div>

<TextField
            type="number"
            label="Size"
            // placeholder="set minimum order  for item"
            onChange={(e)=>handleChangeValueCommon2(e,"collectionDetails","description","fontSize",data,setData,bundleOption)}
            value={data[bundleOption]["collectionDetails"]["description"]["fontSize"]}
            autoComplete="off"
            min="0"
          />

</div>

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Image Border</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["collectionDetails"]["imageBorderColor"]}  onChange={(e)=>handleChangeCommon(e,"collectionDetails","imageBorderColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Border Color </p>
<p> {data[bundleOption]["collectionDetails"]["imageBorderColor"]} </p>

</div>
</div>



</div>

<div className="sd-bundle-custom-item-common">
    <p className="sd-bundle-custom-item-heading-common">Plus</p>
    <div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["collectionDetails"]["plus"]["backgroundColor"]}  onChange={(e)=>handleChangeCommon2(e,"collectionDetails","plus","backgroundColor",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Background Color </p>
<p> {data[bundleOption]["collectionDetails"]["plus"]["backgroundColor"]} </p>

</div>
</div>


<div className="sd-bundle-custom-item-inputSection">
<input type="color" value={data[bundleOption]["collectionDetails"]["plus"]["color"]}  onChange={(e)=>handleChangeCommon2(e,"collectionDetails","plus","color",data,setData,bundleOption)}/>
<div className="sd-bundle-custom-fieldColorCode-common">
    <p>Color </p>
<p> {data[bundleOption]["collectionDetails"]["plus"]["color"]} </p>

</div>
</div>



</div>




</div> 
)


}

export default CollectionDetails;
