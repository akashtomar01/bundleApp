import React,{useEffect} from "react" ;
import { themeData } from "./themeData";
const Theme=({bundleOption,data,setData,displayOption})=>{
    
//        useEffect(() => {
//         themeData(data,setData,bundleOption)            
//   }, [data[bundleOption]["theme"]]);
    const handleChange=(e,x)=>{
        // setData({...data,
        //     [bundleOption]:{
        //         ...data[bundleOption],
        //         theme:e.target.value}})
        themeData(data,setData,bundleOption,x)

    }
return(

<div className="sd-bundle-themeCustom">
    <div className="sd-bundle-item-custom-radio-common">
    <input  id="light"   type="radio" name="theme"  value={"light"} onChange={(e)=>handleChange(e,"light")} checked={data[bundleOption]["theme"]=="light"}/>
<label htmlFor="light" >light</label>
</div>
<div className="sd-bundle-item-custom-radio-common">
<input  id="dark"   type="radio" name="theme"  value={"dark"} onChange={(e)=>handleChange(e,"dark")} checked={data[bundleOption]["theme"]=="dark"}/>
    <label htmlFor="dark">dark</label>
    </div>
</div>

)

}

export default Theme;
