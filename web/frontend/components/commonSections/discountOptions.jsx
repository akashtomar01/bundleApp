import React from "react" ;
import { InlineError,TextField } from "@shopify/polaris";

const DiscountOptions=(props)=>{
    return (
    <div className="sd-bundle-bundleSection-common  sd-bundle-createBundleDiscountSection">
    <div className="sd-bundle-bundleSection-heading-common">Discount </div>
    <p className="sd-bundle-plainText-common">
      Choose type of discount and discount value for each product.
    </p>
    <div className="sd-bundle-item">
   
      <input
        type="radio"
        name="discount"
        value="percent"
        id="percent"
        checked={props.discountType == "percent" ? true : false}
        onChange={props.handleDiscountType}
      />
              <label htmlFor="percent">Percentage Discount</label>

      {props.discountType == "percent" && (
        <div className="sd-bundle-discount-value">
          <TextField
            type="number"
            label="set value for discount"
            // placeholder="set minimum order  for item"
            onChange={props.handleDiscountValue}
            suffix="%"
            value={props.discountValue}
            autoComplete="off"
            min="0"
          />

        </div>
      )}
    </div>

    <div className="sd-bundle-item ">
      <input
        type="radio"
        name="discount"
        value="fixed"
        checked={props.discountType == "fixed" ? true : false}
        id="fixed"
        onChange={props.handleDiscountType}
      />
              <label htmlFor="fixed"> Fixed Discount</label>

     
      {props.discountType == "fixed" && (
        <div className="sd-bundle-discount-value">
          <TextField
            type="number"
            label="set value for discount"
            // placeholder="set minimum order  for item"
            onChange={props.handleDiscountValue}
            suffix={props.currency.replace(/{{.*?}}/g, "") }
            value={props.discountValue}
            autoComplete="off"
            min="0"
          />


              </div>
      )}
    </div>
    {/* <div className="sd-bundle-item sd-bundle-item-price">
      <input
        type="radio"
        name="discount"
        value="price"
        id="price"
        checked={props.discountType == "price" ? true : false}
        onChange={props.handleDiscountType}
      />
              <label htmlFor="price">Set Price</label>
      {props.discountType == "price" && (
        <>
          <div className="sd-bundle-discount-value sd-bundle-discount-price">
            <TextField
              type="number"
              label="set Price for discount"
              // placeholder="set minimum order  for item"
              onChange={props.handleDiscountValue}
              suffix={props.currency.replace(/{{.*?}}/g, "")}
              value={props.discountValue}
              autoComplete="off"
              min="0"
            />
          
          </div>

        {(props?.page !="collectionMixMatch" && props.error != "discountValuePrice" ) &&    <p>
            The price should be less than the sum of the bundled
            products' prices. If you enter a greater price the set price
            will be ignored.
          </p>
}
        </>
      )}
    </div> */}

    <div className="sd-bundle-item">
      <input
        type="radio"
        name="discount"
        value="freeShipping"
        id="freeShipping"
        checked={props.discountType == "freeShipping" ? true : false}
        onChange={props.handleDiscountType}
      />
              <label htmlFor="freeShipping">Free Shipping</label>
      
      
    </div>

    <div className="sd-bundle-item">
      <input
        type="radio"
        name="discount"
        value="noDiscount"
        id="noDiscount"
        checked={props.discountType == "noDiscount" ? true : false}
        onChange={props.handleDiscountType}
      />
              <label htmlFor="noDiscount">No Discount</label>
    </div>
  </div>
    
    )

}

export default DiscountOptions;
