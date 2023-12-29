import React from "react";

const BundleStatus=(props)=>{

const handleChangeStatus=(e)=>{

props.setData({
   ...props.data,
 status:e.target.value

})



}
return(
    <div className="sd-bundle-bundleSection-common sd-bundle-productBundle-statusSection">
            <div className="sd-bundle-bundleSection-heading-common">
              Set Bundle Status
            </div>
            <div>
              <select value={props.data.status} onChange={handleChangeStatus}>
                <option className="option"  value="active" >Active</option>
                <option className="option"  value="draft"  > Draft</option>
              </select>
            </div>
          </div>
)

}

export default  BundleStatus;