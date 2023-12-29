import React from "react" ;
const Design=(props)=>{
const handleChange=(e)=>{
props.setData({...props.data,design:e.target.value})

}

return(
<div className="sd-bundle-designCustom">
    <div className="sd-bundle-item-custom-radio-common">
    <input  id="classic"   type="radio" name="theme"  value={"classic"} onChange={handleChange} checked={props.data.design=="classic"}/>
<label htmlFor="classic" >classic</label>
</div>
<div className="sd-bundle-item-custom-radio-common">
<input  id="modern"  type="radio" name="theme"  value={"modern"} onChange={handleChange} checked={props.data.design=="modern"}/>
    <label htmlFor="modern">modern</label>
    </div>
</div>

)

}

export default  Design;
