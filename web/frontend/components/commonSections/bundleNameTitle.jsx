import React from "react";
import { InlineError } from "@shopify/polaris";
const BundleNameTitle=(props)=>{

        return <>
    <div className="sd-bundle-bundleSection-common sd-bundle-createBundleNamingSection">
    <div className="sd-bundle-bundleSection-heading-common">
      Bundle Name and Title{""}
    </div>
    <div className="sd-bundle-nameBlock">
      {/* <div className="productBundleSectionPlainText"> Name </div> */}
      <label className="sd-bundle-plainText-common">Name</label>
      <br />
      <input
        type="text"
        className="sd-bundle-name"
        placeholder=""
        value={props.data.name}
        onChange={(e) =>
          props.setData({
            ...(props.data),
            name: e.target.value,
          })
        }
      />

      <p className="sd-bundle-createBundleSectionDisclaimer">
        *This name is used for you to identify this bundle.Your
        customers won’t see this name.
      </p>

      {props.errorArray.includes("bundleName") ? (
        <InlineError message=" Please provide name for bundle " />
      ) : (
        ""
      )}
    </div>

    <div className="sd-bundle-titleBlock">
      {/* <div className="productBundleSectionPlainText"> Title </div> */}
      <label className="sd-bundle-plainText-common">Title</label>
      <br />

      <input
        type="text"
        className="sd-bundle-title"
        placeholder=""
        value={props.data.title}
        onChange={(e) =>
          props.setData({
            ...(props.data),
            title: e.target.value,
          })
        }
      />

      <p className="sd-bundle-createBundleSectionDisclaimer">
        {" "}
        *Customers will see this as the name of the bundle displayed .
      </p>

      {props.errorArray.includes("bundleTitle") ? (
        <InlineError message=" Please provide title of bundle " />
      ) : (
        ""
      )}
    </div>
{(props.type == "collectonMix&Match" || props.type== "productMix&Match")  &&
<div className="sd-bundle-descriptionBlock">
      <label className="sd-bundle-plainText-common">Description</label>
      <br />

      <input
        type="text"
        className="sd-bundle-description"
        placeholder=""
        value={props?.data?.bundleDetail.description}
        onChange={(e) =>
          props.setData({
            ...(props.data),
            bundleDetail:{ ...props.data.bundleDetail,
              description: e.target.value,
            }
          })
        }
   
      />

      <p className="sd-bundle-createBundleSectionDisclaimer">
        
        *You can add more details about this bundle here to aware your customers of. For example explaining the number of items they should buy from each collection.
      </p>
    </div>
    //  : ""
   
  }

  </div>

</>

}

export default BundleNameTitle;