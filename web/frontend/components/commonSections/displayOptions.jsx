import React from "react";

import { Checkbox} from "antd";

const DisplayOptions=(props)=>{

 
    return(

        <div  className="sd-bundle-bundleSection-common  sd-bundle-displaySection">
        <div className="sd-bundle-bundleSection-heading-common ">Display Options</div>
        <p className="sd-bundle-plainText-common">
          check page options where you want to display bundle
        </p>

        <div className="sd-bundle-page-selection  ">
      
            <Checkbox
              value={props.discountedProductType == "all_products" ? true : props.display.productPages}
              onChange={props.discountedProductType == "all_products" ? "":props.handleDisplayOptions}
              name="productPages"
              className="sd-bundle-set-checkbox"
              checked={props.display.productPages}
            >
               {props.bundleType=="volume" ?
            
             <div className="sd-bundle-product-pages">Product Page({props.discountedProductType == "all_products" ? "all" : props.title})</div>:props.bundleType == "collectionMixMatch" ? <div className="sd-bundle-product-pages">product pages of below collections </div>: <div className="sd-bundle-product-pages">Product pages</div>
}
            </Checkbox>
          
            <br />

{ props.bundleType == "productBundle" || props.bundleType == "collectionMixMatch" ?
            <div className={props.products.length > 0 ? "sd-bundle-productPage-selection" : null}>
              {props?.products.map((item,ind) => {
                return (
                  <>
                    <Checkbox.Group key={ind}
                      value={props.display.productPagesList}
                    >
                      <Checkbox
                        value={item.id}
                        onChange={props.handleDisplayPageOptions}
                        className=""
                      >
                       <div className='sd-bundle-product-pages'> {item.title}  </div> 
                      </Checkbox>
                      <br/>
                    </Checkbox.Group>
                  </>
                );
              })}
            </div>
            : ""
}    
          {/* { props?.bundleType == "productBundle" ? <Checkbox
              value={props.display.popUp}
              className="sd-bundle-set-checkbox"
              name="popUp"
              onChange={props.handleDisplayOptions}
              checked={props.display.popUp}
            >
          
              pop up
            </Checkbox>
            :""
} */}
       {/* <br/> */}
          {/* { props.bundleType == "volume" && props?.discountedProductType == "specific_product"  || props.bundleType == "productBundle" ?
            <Checkbox
              value={props.display.bundle}
              className="sd-bundle-set-checkbox"
              name="bundle"
              onChange={props.handleDisplayOptions}
              checked={props.display.bundle}
            >
             Bundles Page
            </Checkbox>
            :""
        } */}
        </div>
      </div>
    )
}
export default DisplayOptions;


// import React from "react";

// import { Checkbox} from "antd";

// const DisplayOptions=(props)=>{

//     return(

//         <div className="productBundleCommonSection  displaySection">
//         <div className="productBundleSection-heading ">Display Options</div>
//         <p className="productBundleSectionPlainText">
//           check page options where you want to display bundle
//         </p>

//         <div className="page-selection  ">

         
//           <Checkbox.Group value={props.displayOptions}>
//             <Checkbox
//               value="productPages"
//               onChange={props.handleDisplayOptions}
//               name="productPages"
//               className="set-checkbox"
//             >
//               product Pages {props.bundleType=="volumeBundle" ? (props?.productTitle ) : "" }
//             </Checkbox>
          
//             <br />





// { props.bundleType=="productBundle"  ?
//             <div className="productPage-selection">
//               {props?.selectedProducts.map((item) => {
//                 return (
//                   <>
//                     <Checkbox.Group
//                       value={props.displayPageOptions}
//                     >
//                       <Checkbox
//                         value={item.title}
//                         onChange={props.handleDisplayPageOptions}
//                         className=""
//                       >
//                         {item.title}
//                       </Checkbox>
//                     </Checkbox.Group>
//                   </>
//                 );
//               })}
//             </div>
//             :""
// }
            
//           { props?.bundleType == "productBundle" ? <Checkbox
//               value="popUp"
//               className="set-checkbox"
//               name="popUp"
//               onChange={props.handleDisplayOptions}
//             >
          
//               pop up
//             </Checkbox>
//             :""
// }
//             <Checkbox
//               value="bundle"
//               className="set-checkbox"
//               name="bundle"
//               onChange={props.handleDisplayOptions}
//             >
//               bundle
//             </Checkbox>
//           </Checkbox.Group>

//         </div>
//       </div>




//     )

// }

// export default DisplayOptions;