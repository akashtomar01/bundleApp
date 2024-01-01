import React from 'react'
import { LoadingOutlined} from "@ant-design/icons";
import { Spin,Checkbox } from "antd";
import { Thumbnail,InlineError } from "@shopify/polaris";
import noImg from "../../assets/no-Image.png" 
const BXGYproductVariantData = (props) => {
  return (
    <Spin
    spinning={props.loader}
    indicator={
      <LoadingOutlined style={{ fontSize: "40px", color: "#7d2ae8" }} />
    }
  >
   {/* {props.errorArray.includes("uncheckedVariantModal") && <InlineError message="Atleast one variant must be selected"  />}   */}
    <Checkbox.Group value={props.checkedIds}>
      {props.variantData?.data?.map((item, index1) => {
        return (
         <div key={index1}>
           <div className="sd-bundle-selectedProductList sd-bundle-productBundle-editFurther-ModalBodyDataWrapper">
            <div>
              <Checkbox
                value={item.id}
                // name="variant"
                onChange={(e) => {
                  if (e.target.checked) {
                    
                    props.setCheckedIds([...(props.checkedIds), e.target.value]);
                    
                  } else {
                  
                    props.setCheckedIds([
                      ...(props.checkedIds.filter(
                        (item) => item != e.target.value
                      ))
                    ]);
                 

                  }
                }}
              >
               <div className="sd-bundle-moadl-product-variant-img-title-box">
               <div>
             
             <Thumbnail source={!item.src ? noImg : item.src} size="small" alt="pic" />
           </div>
                <div className="">{item.title}</div>
               </div>
              </Checkbox>
            </div>

            
            <div className="">{item.inventory_quantity} in stock</div>
            <div className="">Rs {item.price}</div>
            
          </div>
          {props.variantData?.data.length -1 !== index1 ?
          <hr /> : null}
         </div>
        )
      })}
    </Checkbox.Group>
  </Spin>

  )
}

export default BXGYproductVariantData