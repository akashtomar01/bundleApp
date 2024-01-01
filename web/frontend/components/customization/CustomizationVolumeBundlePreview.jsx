import React, { useEffect, useState } from "react";
import pic from "../../assets/image2.png";
import {
  ArrowLeftOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useAPI } from "../shop";
import { Button } from "antd";
import { data } from "@shopify/app-bridge/actions/Modal";
const CustomizationVolumeBundlePreview = ({data}) => {
  const [selected, setSelected] = useState("first");
  const [quantity, setQuantity] = useState(2);
  const [showMore, setShowMore] = useState(false);
  const { currency } = useAPI();
 


  const handleSelected = (option) => {
    option != selected ? setSelected(option) : "";
  };

  const handlePlus = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinus = () => {
    quantity > 2 && setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    quantity == 2 && setShowMore(false);
  }, [quantity]);

  return (

    <div
      className="sd-volume-preview-specific sd-preview-wrapper-common"
      style={{
        backgroundColor: data["volume"]["box"]["backgroundColor"],
        borderColor:  data["volume"]["box"]["borderColor"],
        borderRadius:data["volume"]["box"]["borderRadius"] + "px",
      }}
    >

 {data["volume"]["button"]["position"] == "top" && (
          <button
            type="button"
            className="sd-addToCart-button"
            style={{
              color: data["volume"]["button"]["color"],
              fontSize: data["volume"]["button"]["fontSize"] + "px",
              backgroundColor: data["volume"]["button"]["backgroundColor"],
            }}
          >
            {data["volume"]["button"]["text_others"] + " "}
            {"discount"}%{" "}
          </button>
        )} 

     
      <div
        className="sd-preview-title-common"
        style={{
          color: data["volume"]["title"]["color"],
          fontSize: data["volume"]["title"]["fontSize"] + "px",
          textAlign: data["volume"]["title"]["alignment"],
        }}
      >
        Test
      </div>
      <div className="sd-volume-preview-option-section">
        <div className="sd-volume-preview-option-wrapper">
          <div
             className={
            selected == "first"
               ? "sd-volume-preview-option-headline"
               : "sd-volume-preview-option-headline sd-option-cursor-hover"
            }
            onClick={() => handleSelected("first")}
          >
           
            <div
              className="sd-option-titleSection"
              style={{
                color: data["volume"]["options"]["color"],
                fontSize: data["volume"]["options"]["fontSize"] + "px",
              }}
            >
              <div style={{ color: data["volume"]["options"]["iconColor"] }}>
                {/* {selected == "first" ? (
                  <CaretDownOutlined />
                ) : (
                  <CaretRightOutlined />
                )} */}
                <input type="radio" name="option" value="first"  checked={selected=="first"}/>
              </div>
              <p>Buy 2 & Get 10% Discount</p>{" "}
            </div>
            <div className="sd-option-badgeSection" style={{backgroundColor:data["volume"]["options"]["saveDiscount"]["backgroundColor"] , color:data["volume"]["options"]["saveDiscount"]["color"] , borderRadius:data["volume"]["options"]["saveDiscount"]["borderRadius"]+"px",fontSize:data["volume"]["options"]["saveDiscount"]["fontSize"]+"px"}}>Save {currency} 50</div>
          </div>
          {selected == "first" && (
            <>
              <div className="sd-preview-data-section-common sd-volume-preview-data-section">
                <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
                  <div>
                    <img
                      src={pic}
                      style={{
                        borderColor: data["volume"]["productDetails"]["image"]["borderColor"],
                        borderRadius:
                        data["volume"]["productDetails"]["image"]["borderRadius"] + "px",
                      }}
                    />
                  </div>
                  <div className="sd-bundle-title-price">
                    <div
                      style={{
                        color: data["volume"]["productDetails"]["title"]["color"],
                        fontSize: data["volume"]["productDetails"]["title"]["fontSize"] + "px",
                      }}
                    >
                      Product Name
                    </div>

                    <div
                      style={{
                        color: data["volume"]["productDetails"]["price"]["color"],
                        fontSize: data["volume"]["productDetails"]["price"]["fontSize"] + "px",
                      }}
                    >
                      {currency} 500
                    </div>
                  </div>
                </div>
                <div
                  className="sd-bundle-showQuantity"
                  style={{
                    color: data["volume"]["productDetails"]["quantities"]["color"],
                    backgroundColor:
                    data["volume"]["productDetails"]["quantities"]["backgroundColor"],
                  }}
                >
                  2X{" "}
                </div>
              </div>
              {/*  */}

              <div className="sd-preview-variant-selection-common">
                <p style={{ color:  data["volume"]["productDetails"]["variantSelector"]["color"] }}>
                  1
                </p>
                <select
                  style={{
                    backgroundColor:
                    data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
                    color: data["volume"]["productDetails"]["variantSelector"]["color"],
                  }}
                >
                  <option value="select"> Select Variant </option>

                  <option value="one" data-varindex="3">
                    variant one
                  </option>
                  <option value="two" data-varindex="3">
                    variant two
                  </option>
                </select>
              </div>

              <div className="sd-preview-variant-selection-common">
                <p style={{ color:  data["volume"]["productDetails"]["variantSelector"]["color"]}}>
                  2
                </p>
                <select
                  style={{
                    backgroundColor:
                    data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
                    color:  data["volume"]["productDetails"]["variantSelector"]["color"]
                  }}
                >
                  <option value="select"> Select Variant </option>

                  <option value="one" data-varindex="3">
                    variant one
                  </option>
                  <option value="two" data-varindex="3">
                    variant two
                  </option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="sd-volume-preview-option-wrapper">
          <div
            className={
              selected == "second"
                ? "sd-volume-preview-option-headline"
                : "sd-volume-preview-option-headline sd-option-cursor-hover"
            }
            onClick={() => handleSelected("second")}
           
          >
            {" "}
            <div
              className="sd-option-titleSection"
              style={{
                color: data["volume"]["options"]["color"],
                fontSize: data["volume"]["options"]["fontSize"] + "px",
              }}
            >
              <div style={{ color: data["volume"]["options"]["iconColor"] }}>
              <input type="radio" name="option" value="second" checked={selected=="second"}/>

              </div>
              <p>Buy 2+ & Get 10% Discount</p>{" "}
            </div>
            <div className="sd-option-badgeSection" style={{backgroundColor:data["volume"]["options"]["saveDiscount"]["backgroundColor"] , color:data["volume"]["options"]["saveDiscount"]["color"] , borderRadius:data["volume"]["options"]["saveDiscount"]["borderRadius"]+"px",fontSize:data["volume"]["options"]["saveDiscount"]["fontSize"]+"px"}}>Save {currency} 50 </div>
          </div>

          {selected == "second" && (
            <>
              <div className="sd-preview-data-section-common sd-volume-preview-data-section">
                <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
                  <div>
                    <img
                      src={pic}
                      style={{
                        borderColor: data["volume"]["productDetails"]["image"]["borderColor"],
                        borderRadius:
                        data["volume"]["productDetails"]["image"]["borderRadius"] + "px",
                      }}
                    />
                  </div>
                  <div className="sd-bundle-title-price">
                    <div
                      style={{
                        color:  data["volume"]["productDetails"]["title"]["color"],
                        fontSize: data["volume"]["productDetails"]["title"]["fontSize"] + "px",
                      }}
                    >
                      Product Name
                    </div>

                    <div
                      style={{
                        color: data["volume"]["productDetails"]["price"]["color"],
                        fontSize: data["volume"]["productDetails"]["price"]["fontSize"] + "px",
                      }}
                    >
                      {currency} 500
                    </div>
                    {/* <div
                      className="sd-volume-quantity-selector"
                      style={{
                        color: data["volume"]["productDetails"]["quantitiesSelector"]["color"],
                        backgroundColor:
                        data["volume"]["productDetails"]["quantitiesSelector"]["backgroundColor"]
                           
                      }}
                    >
                      <button
                        onClick={handleMinus}
                        style={{
                          color:
                           data["volume"]["productDetails"]["quantitiesSelector"]["plusMinusColor"]
                              
                        }}
                      >
                        <MinusOutlined />
                      </button>
                      {quantity}
                      <button
                        onClick={handlePlus}
                        style={{
                          color:
                          data["volume"]["productDetails"]["quantitiesSelector"]["plusMinusColor"]
                        }}
                      >
                        <PlusOutlined />
                      </button>
                    </div> */}
                  </div>
                </div>
                <div
                  className="sd-bundle-showQuantity"
                  style={{
                    color: data["volume"]["productDetails"]["quantities"]["color"],
                    backgroundColor:
                    data["volume"]["productDetails"]["quantities"]["backgroundColor"]
                  }}
                >
                  2X{" "}
                </div>
              </div>
              {/*  */}

              {Array.from({ length: quantity }).map((item, index) => {
                return (
                  (index <= 1 || showMore) && (
                    <div className="sd-preview-variant-selection-common">
                      <p
                        style={{
                          color: data["volume"]["productDetails"]["variantSelector"]["color"],
                        }}
                      >
                        {index + 1}
                      </p>
                      <select
                        style={{
                          backgroundColor:
                          data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
                          color: data["volume"]["productDetails"]["variantSelector"]["color"],
                        }}
                      >
                        <option value="select"> Select Variant </option>

                        <option value="one" data-varindex="3">
                          variant one
                        </option>
                        <option value="two" data-varindex="3">
                          variant two
                        </option>
                      </select>
                    </div>
                  )
                );
              })}
              {quantity > 2 && (
                <div>
                  {" "}
                  <Button
                    type="link"
                    className="sd-volume-showMoreLess"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {" "}
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        <div
          className="sd-bundle-total-common"
          style={{
            color: data["volume"]["totalSection"]["color"],
            backgroundColor: data["volume"]["totalSection"]["backgroundColor"],
            fontSize: data["volume"]["totalSection"]["fontSize"] + "px",
          }}
        >
          {data["volume"]["totalSection"]["text"]}
          <div className="sd-bundle-customization-total-common">
            <span
              className="sd-bundle-mrp-price"
              style={{
                color: data["volume"]["totalSection"]["originalPrice"]["color"],
                fontSize: data["volume"]["totalSection"]["originalPrice"]["fontSize"] + "px",
              }}
            >
              <del>{currency} 1000 </del>
            </span>
            <span
              className="sd-bundle-real-price"
              style={{
                color: data["volume"]["totalSection"]["finalPrice"]["color"],
                fontSize:data["volume"]["totalSection"]["finalPrice"]["fontSize"] + "px",
              }}
            >
              {currency} 600
            </span>
          </div>
        </div>

        {data["volume"]["button"]["position"] == "bottom" && (
          <button
            type="button"
            className="sd-addToCart-button"
            style={{
              color: data["volume"]["button"]["color"],
              fontSize: data["volume"]["button"]["fontSize"] + "px",
              backgroundColor: data["volume"]["button"]["backgroundColor"],
            }}
          >
            {data["volume"]["button"]["text_others"] + " "}
            {"discount"}%{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomizationVolumeBundlePreview;






// import React, { useEffect, useState } from "react";
// import pic from "../../assets/image2.png";
// import {
//   ArrowLeftOutlined,
//   CaretRightOutlined,
//   CaretDownOutlined,
//   PlusOutlined,
//   MinusOutlined,
// } from "@ant-design/icons";
// import { useAPI } from "../shop";
// import { Button } from "antd";
// import { data } from "@shopify/app-bridge/actions/Modal";
// const CustomizationVolumeBundlePreview = ({data}) => {
//   const [selected, setSelected] = useState("first");
//   const [quantity, setQuantity] = useState(2);
//   const [showMore, setShowMore] = useState(false);
//   const { currency } = useAPI();
 


//   const handleSelected = (option) => {
//     option != selected ? setSelected(option) : "";
//   };

//   const handlePlus = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const handleMinus = () => {
//     quantity > 2 && setQuantity((prev) => prev - 1);
//   };

//   useEffect(() => {
//     quantity == 2 && setShowMore(false);
//   }, [quantity]);

//   return (

//     <div
//       className="sd-volume-preview-specific sd-preview-wrapper-common"
//       style={{
//         backgroundColor: data["volume"]["box"]["backgroundColor"],
//         borderColor:  data["volume"]["box"]["borderColor"],
//         borderRadius:data["volume"]["box"]["borderRadius"] + "px",
//       }}
//     >

//  {data["volume"]["button"]["position"] == "top" && (
//           <button
//             type="button"
//             className="sd-addToCart-button"
//             style={{
//               color: data["volume"]["button"]["color"],
//               fontSize: data["volume"]["button"]["fontSize"] + "px",
//               backgroundColor: data["volume"]["button"]["backgroundColor"],
//             }}
//           >
//             {data["volume"]["button"]["text_others"] + " "}
//             {"discount"}%{" "}
//           </button>
//         )} 

     
//       <div
//         className="sd-preview-title-common"
//         style={{
//           color: data["volume"]["title"]["color"],
//           fontSize: data["volume"]["title"]["fontSize"] + "px",
//           textAlign: data["volume"]["title"]["alignment"],
//         }}
//       >
//         Test
//       </div>
//       <div className="sd-volume-preview-option-section">
//         <div className="sd-volume-preview-option-wrapper">
//           <div
//             className={
//               selected == "first"
//                 ? "sd-volume-preview-option-headline"
//                 : "sd-volume-preview-option-headline sd-option-cursor-hover"
//             }
//             onClick={() => handleSelected("first")}
//           >
//             {" "}
//             <div
//               className="sd-option-titleSection"
//               style={{
//                 color: data["volume"]["options"]["color"],
//                 fontSize: data["volume"]["options"]["fontSize"] + "px",
//               }}
//             >
//               <div style={{ color: data["volume"]["options"]["iconColor"] }}>
//                 {selected == "first" ? (
//                   <CaretDownOutlined />
//                 ) : (
//                   <CaretRightOutlined />
//                 )}
//               </div>
//               <p>Buy 2 & Get 10% Discount</p>{" "}
//             </div>
//             <div className="sd-option-badgeSection" style={{backgroundColor:data["volume"]["options"]["saveDiscount"]["backgroundColor"] , color:data["volume"]["options"]["saveDiscount"]["color"] , borderRadius:data["volume"]["options"]["saveDiscount"]["borderRadius"]+"px",fontSize:data["volume"]["options"]["saveDiscount"]["fontSize"]+"px"}}>Save {currency} 50</div>
//           </div>
//           {selected == "first" && (
//             <>
//               <div className="sd-preview-data-section-common sd-volume-preview-data-section">
//                 <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
//                   <div>
//                     <img
//                       src={pic}
//                       style={{
//                         borderColor: data["volume"]["productDetails"]["image"]["borderColor"],
//                         borderRadius:
//                         data["volume"]["productDetails"]["image"]["borderRadius"] + "px",
//                       }}
//                     />
//                   </div>
//                   <div className="sd-bundle-title-price">
//                     <div
//                       style={{
//                         color: data["volume"]["productDetails"]["title"]["color"],
//                         fontSize: data["volume"]["productDetails"]["title"]["fontSize"] + "px",
//                       }}
//                     >
//                       Product Name
//                     </div>

//                     <div
//                       style={{
//                         color: data["volume"]["productDetails"]["price"]["color"],
//                         fontSize: data["volume"]["productDetails"]["price"]["fontSize"] + "px",
//                       }}
//                     >
//                       {currency} 500
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="sd-bundle-showQuantity"
//                   style={{
//                     color: data["volume"]["productDetails"]["quantities"]["color"],
//                     backgroundColor:
//                     data["volume"]["productDetails"]["quantities"]["backgroundColor"],
//                   }}
//                 >
//                   2X{" "}
//                 </div>
//               </div>
//               {/*  */}

//               <div className="sd-preview-variant-selection-common">
//                 <p style={{ color:  data["volume"]["productDetails"]["variantSelector"]["color"] }}>
//                   1
//                 </p>
//                 <select
//                   style={{
//                     backgroundColor:
//                     data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
//                     color: data["volume"]["productDetails"]["variantSelector"]["color"],
//                   }}
//                 >
//                   <option value="select"> Select Variant </option>

//                   <option value="one" data-varindex="3">
//                     variant one
//                   </option>
//                   <option value="two" data-varindex="3">
//                     variant two
//                   </option>
//                 </select>
//               </div>

//               <div className="sd-preview-variant-selection-common">
//                 <p style={{ color:  data["volume"]["productDetails"]["variantSelector"]["color"]}}>
//                   2
//                 </p>
//                 <select
//                   style={{
//                     backgroundColor:
//                     data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
//                     color:  data["volume"]["productDetails"]["variantSelector"]["color"]
//                   }}
//                 >
//                   <option value="select"> Select Variant </option>

//                   <option value="one" data-varindex="3">
//                     variant one
//                   </option>
//                   <option value="two" data-varindex="3">
//                     variant two
//                   </option>
//                 </select>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="sd-volume-preview-option-wrapper">
//           <div
//             className={
//               selected == "second"
//                 ? "sd-volume-preview-option-headline"
//                 : "sd-volume-preview-option-headline sd-option-cursor-hover"
//             }
//             onClick={() => handleSelected("second")}
           
//           >
//             {" "}
//             <div
//               className="sd-option-titleSection"
//               style={{
//                 color: data["volume"]["options"]["color"],
//                 fontSize: data["volume"]["options"]["fontSize"] + "px",
//               }}
//             >
//               <div style={{ color: data["volume"]["options"]["iconColor"] }}>
//                 {selected == "second" ? (
//                   <CaretDownOutlined />
//                 ) : (
//                   <CaretRightOutlined />
//                 )}
//               </div>
//               <p>Buy 2+ & Get 10% Discount</p>{" "}
//             </div>
//             <div className="sd-option-badgeSection" style={{backgroundColor:data["volume"]["options"]["saveDiscount"]["backgroundColor"] , color:data["volume"]["options"]["saveDiscount"]["color"] , borderRadius:data["volume"]["options"]["saveDiscount"]["borderRadius"]+"px",fontSize:data["volume"]["options"]["saveDiscount"]["fontSize"]+"px"}}>Save {currency} 50 </div>
//           </div>

//           {selected == "second" && (
//             <>
//               <div className="sd-preview-data-section-common sd-volume-preview-data-section">
//                 <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
//                   <div>
//                     <img
//                       src={pic}
//                       style={{
//                         borderColor: data["volume"]["productDetails"]["image"]["borderColor"],
//                         borderRadius:
//                         data["volume"]["productDetails"]["image"]["borderRadius"] + "px",
//                       }}
//                     />
//                   </div>
//                   <div className="sd-bundle-title-price">
//                     <div
//                       style={{
//                         color:  data["volume"]["productDetails"]["title"]["color"],
//                         fontSize: data["volume"]["productDetails"]["title"]["fontSize"] + "px",
//                       }}
//                     >
//                       Product Name
//                     </div>

//                     <div
//                       style={{
//                         color: data["volume"]["productDetails"]["price"]["color"],
//                         fontSize: data["volume"]["productDetails"]["price"]["fontSize"] + "px",
//                       }}
//                     >
//                       {currency} 500
//                     </div>
//                     <div
//                       className="sd-volume-quantity-selector"
//                       style={{
//                         color: data["volume"]["productDetails"]["quantitiesSelector"]["color"],
//                         backgroundColor:
//                         data["volume"]["productDetails"]["quantitiesSelector"]["backgroundColor"]
                           
//                       }}
//                     >
//                       <button
//                         onClick={handleMinus}
//                         style={{
//                           color:
//                            data["volume"]["productDetails"]["quantitiesSelector"]["plusMinusColor"]
                              
//                         }}
//                       >
//                         <MinusOutlined />
//                       </button>
//                       {quantity}
//                       <button
//                         onClick={handlePlus}
//                         style={{
//                           color:
//                           data["volume"]["productDetails"]["quantitiesSelector"]["plusMinusColor"]
//                         }}
//                       >
//                         <PlusOutlined />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="sd-bundle-showQuantity"
//                   style={{
//                     color: data["volume"]["productDetails"]["quantities"]["color"],
//                     backgroundColor:
//                     data["volume"]["productDetails"]["quantities"]["backgroundColor"]
//                   }}
//                 >
//                   2X{" "}
//                 </div>
//               </div>
//               {/*  */}

//               {Array.from({ length: quantity }).map((item, index) => {
//                 return (
//                   (index <= 1 || showMore) && (
//                     <div className="sd-preview-variant-selection-common">
//                       <p
//                         style={{
//                           color: data["volume"]["productDetails"]["variantSelector"]["color"],
//                         }}
//                       >
//                         {index + 1}
//                       </p>
//                       <select
//                         style={{
//                           backgroundColor:
//                           data["volume"]["productDetails"]["variantSelector"]["backgroundColor"],
//                           color: data["volume"]["productDetails"]["variantSelector"]["color"],
//                         }}
//                       >
//                         <option value="select"> Select Variant </option>

//                         <option value="one" data-varindex="3">
//                           variant one
//                         </option>
//                         <option value="two" data-varindex="3">
//                           variant two
//                         </option>
//                       </select>
//                     </div>
//                   )
//                 );
//               })}
//               {quantity > 2 && (
//                 <div>
//                   {" "}
//                   <Button
//                     type="link"
//                     className="sd-volume-showMoreLess"
//                     onClick={() => setShowMore(!showMore)}
//                   >
//                     {" "}
//                     {showMore ? "Show Less" : "Show More"}
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         <div
//           className="sd-bundle-total-common"
//           style={{
//             color: data["volume"]["totalSection"]["color"],
//             backgroundColor: data["volume"]["totalSection"]["backgroundColor"],
//             fontSize: data["volume"]["totalSection"]["fontSize"] + "px",
//           }}
//         >
//           {data["volume"]["totalSection"]["text"]}
//           <div>
//             <span
//               className="sd-bundle-mrp-price"
//               style={{
//                 color: data["volume"]["totalSection"]["originalPrice"]["color"],
//                 fontSize: data["volume"]["totalSection"]["originalPrice"]["fontSize"] + "px",
//               }}
//             >
//               <del>{currency} 1000 </del>
//             </span>
//             <span
//               className="sd-bundle-real-price"
//               style={{
//                 color: data["volume"]["totalSection"]["finalPrice"]["color"],
//                 fontSize:data["volume"]["totalSection"]["finalPrice"]["fontSize"] + "px",
//               }}
//             >
//               {currency} 600
//             </span>
//           </div>
//         </div>

//         {data["volume"]["button"]["position"] == "bottom" && (
//           <button
//             type="button"
//             className="sd-addToCart-button"
//             style={{
//               color: data["volume"]["button"]["color"],
//               fontSize: data["volume"]["button"]["fontSize"] + "px",
//               backgroundColor: data["volume"]["button"]["backgroundColor"],
//             }}
//           >
//             {data["volume"]["button"]["text_others"] + " "}
//             {"discount"}%{" "}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomizationVolumeBundlePreview;






