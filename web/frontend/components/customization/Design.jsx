import React, { useState } from "react" ;
const Design=(props)=>{
    let designOption = props.data.frequentlyBoughtTogether.design;
    let [checkedOption,setChecked] = useState(designOption);
    const handleChange=(e)=>{
        if(e.target.value === "classic"){
            setChecked(e.target.value);
        }else{
            setChecked(e.target.value);
        }
        props.setData({...props.data,frequentlyBoughtTogether:{design:e.target.value}});
    }
    console.log("Check Design Data from handle click***",props);
    return(
    <div className="sd-bundle-designCustom">
        <div className="sd-bundle-item-custom-radio-common">
        <input  
            id="classic"   
            type="radio" 
            name="theme"  
            value={"classic"} 
            onChange={handleChange} 
            checked={checkedOption=="classic"}
        />
    <label htmlFor="classic" >classic</label>
    </div>
    <div className="sd-bundle-item-custom-radio-common">
        <input  
            id="modern"  
            type="radio" 
            name="theme"  
            value={"modern"} 
            onChange={handleChange} 
            checked={checkedOption=="modern"}
        />
        <label htmlFor="modern">modern</label>
        </div>
    </div>

    )

    }

export default  Design;
