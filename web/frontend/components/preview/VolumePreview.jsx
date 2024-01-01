import React, { useEffect, useState } from "react";
import pic from "../../assets/image2.png";

import EmptyPreview from "../commonSections/emptyPreview";
import {
  CaretRightOutlined,
  CaretDownOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Button ,Tooltip} from "antd";
import { showAmountWithCurrency } from "../showCurrencyFormat";
const VolumePreview = ({ data,sumData,endPriceData,handleVariantChoice,showPrice,currency}) => {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(2);
  const [showMore, setShowMore] = useState(false);
  const [mrp,setMrp]=useState(0)
  const [endPrice,setEndPrice]=useState(0)
  const [arr,setArr]=useState([])

  const [selectedOption, setSelectedOption] = useState('option0');

// document.getElementsByClassName("quantity-button").disabled = true;

  const handleSelected = (option) => {
    option != selected ? setSelected(option) : "";
  };


  useEffect(() => {
    quantity == 2 && setShowMore(false);
  }, [quantity]);


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
<>
<div className="sd-bundle-bundleSection-common">
<div className="sd-bundle-bundleSection-heading-common">Preview</div>

   
   { data.bundleDetail.discountedProductType == "all_products"  ||
   data.bundleDetail.products.length >0  ?
    <div
      className="sd-volume-preview-specific   sd-preview-wrapper-common sd-only-volumeBundle"
      style={{
        backgroundColor: data.customization[0].volume.box.backgroundColor,
        borderColor: data.customization[0].volume.box.borderColor,
        borderRadius: data.customization[0].volume.box.borderRadius + "px",
      }}
    >
      {data.customization[0].volume.button.position == "top" && (
        <button
          type="button"
          className="sd-addToCart-button"
          style={{
            color: data.customization[0].volume.button.color,
            fontSize: data.customization[0].volume.button.fontSize + "px",
            backgroundColor:
            data.customization[0].volume.button.backgroundColor,
          }}
        >
          {data.customization[0].volume.button.text_others + " "}
        </button>
      )}
      <div
        className="sd-preview-title-common"
        style={{
          color: data.customization[0].volume.title.color,
          fontSize: data.customization[0].volume.title.fontSize + "px",
          textAlign: data.customization[0].volume.title.alignment,
        }}
      >
        {data.title}
      </div>
      <div className="sd-volume-preview-option-section">
      {data.bundleDetail.discountOptions.map((item,index) =>
        <div key={index} className="sd-volume-preview-option-wrapper">
<label htmlFor={"option"+index}>
          <div
            className={
              selected == index
                ? "sd-volume-preview-option-headline"
                : "sd-volume-preview-option-headline sd-option-cursor-hover"
            }
            onClick={() => handleSelected(index)}
          >
            
            <div
              className="sd-option-titleSection"
              style={{
                color: data.customization[0].volume.options.color,
                fontSize:
                  data.customization[0].volume.options.fontSize + "px",
              }}
            >
              <div
                style={{
                  color: data.customization[0].volume.options.iconColor,
                }}
              >
               <input
            type="radio"
            id={"option"+index}
            value={"option"+index}
            checked={selectedOption === "option"+index}
            onChange={handleOptionChange}
          />
        
                {/* {selected == index ? (
                  <CaretDownOutlined />
                ) : (
                  <CaretRightOutlined />
                )} */}

                
              </div>
           
              {
              item.description ==`Buy ${item.quantity} & Save {discount}` || item.description ==`Buy ${item.quantity}+ & Save {discount}` ? (
                <p>
                  <span>Buy {(index ==data.bundleDetail.discountOptions.length -1) &&  data.bundleDetail.allowDiscountOnIncrease ==true ? item.quantity + "+"  : item.quantity} & Save </span>
                  <span>
                    {item.type == "fixed" ||
                    item.type == "price"
                      ? " "
                      : "" }
                  </span>
                  <span>
                    {item.type == "percent" ||item.type == "fixed"
                      ? item.value
                     
                      : item.type == "price"
                      ? ""
                      : null}
                  </span>
                  <span>
                   {
                   item.type=="percent" ? "%" : "" 
                   }

                  </span>
                </p>
              ) : (
                item.description
              )}
            </div>
            { item.type != "noDiscount" &&
            <div
              className="sd-option-badgeSection"
              style={{
                backgroundColor:
                  data.customization[0].volume.options.saveDiscount
                    .backgroundColor,
                color:
                  data.customization[0].volume.options.saveDiscount.color,
                borderRadius:
                  data.customization[0].volume.options.saveDiscount
                    .borderRadius + "px",
                fontSize:
                  data.customization[0].volume.options.saveDiscount.fontSize +
                  "px",
              }}
            >
              
              <span>
        
                Save {" "}
               
                {showAmountWithCurrency((sumData[index]-endPriceData[index]).toFixed(2),currency)}
                </span> 
            
              <span> 
                
             {
               item.type == "percent" ? "%"
               : item.type == "fixed"
                ? "Off"
            
                : item.type == "price"
                ? ""
                : ""
             }
            </span> 
            </div>
             }
          </div>
          </label>

          {selected == index && (
            <>
              <div className="sd-preview-data-section-common sd-volume-preview-data-section">
                <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
                  <div>
               
                        <img
                      src={data.bundleDetail.discountedProductType == "collection"  ? data.bundleDetail?.products[0]?.image?.originalSrc   :  data.bundleDetail.discountedProductType == "all_products" ?  pic  : data.bundleDetail.discountedProductType == "all_products" ?  pic  : data.bundleDetail.products[0].images ? data.bundleDetail.discountedProductType == "all_products" ?  pic  : data.bundleDetail?.products[0]?.images[0].originalSrc: pic  }
                      style={{
                        borderColor:
                          data.customization[0].volume.productDetails.image
                            .borderColor,
                        borderRadius:
                          data.customization[0].volume.productDetails.image
                            .borderRadius + "px",
                      }}
                    />
                  </div>
                  <div className="sd-bundle-title-price">
                    <div
                      style={{
                        color:
                          data.customization[0].volume.productDetails.title
                            .color,
                        fontSize:
                          data.customization[0].volume.productDetails.title
                            .fontSize + "px",
                      }}
                    >
                      {data.bundleDetail.discountedProductType =="all_products" || data.bundleDetail.discountedProductType=="collection" ?  "Sample Product" :data.bundleDetail.products[0]?.title}
                    </div>
                     
                    <div
                      style={{
                        color:
                          data.customization[0].volume.productDetails.price
                            .color,
                        fontSize:
                          data.customization[0].volume.productDetails.price
                            .fontSize + "px",
                      }}
                    >
                      {
                        data.bundleDetail.discountedProductType=="all_products" || data.bundleDetail.discountedProductType=="collection" ? showAmountWithCurrency(50,currency )
                      :
                      showPrice[index]
                  ? showAmountWithCurrency(showPrice[index],currency)
                  : showAmountWithCurrency(data.bundleDetail.products[0]?.variants[0] ?.price,currency)}
                     
                    </div>
                     {index==data.bundleDetail.discountOptions.length-1 && data.bundleDetail.allowDiscountOnIncrease ==true &&
                    
                    <Tooltip placement="topRight" title={"Disabled For Preview"}>
                    <div
                     className="sd-volume-quantity-selector"
                      style={{
                       color:
                          data.customization[0].volume.productDetails
                           .quantitiesSelector.color,
                       backgroundColor:
                        data.customization[0].volume.productDetails
                           .quantitiesSelector.backgroundColor,
                       }}
                  >
                       <button className="quantity-button" 
                     
                        style={{
                          color:
                            data.customization[0].volume.productDetails
                              .quantitiesSelector.plusMinusColor,
                        }}
                      >
                        <MinusOutlined />
                      </button>
                      {item.quantity}
                      <button className="quantity-button"
                     
                        style={{
                          color:
                            data.customization[0].volume.productDetails
                              .quantitiesSelector.plusMinusColor,
                        }}
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                  </Tooltip>
                    } 

                   
                  </div>
                </div>
                <div
                  className="sd-bundle-showQuantity"
                  style={{
                    color:
                      data.customization[0].volume.productDetails.quantities
                        .color,
                    backgroundColor:
                      data.customization[0].volume.productDetails.quantities
                        .backgroundColor,
                  }}
                >
                  {item.quantity}X
                </div>
              </div>


              {data.bundleDetail.products[0]?.variants?.length > 1 && (data.bundleDetail.discountedProductType=="specific_product")  ? 
            <>
            {Array.from({ length: item.quantity }).map((emptyItem, idx) => {
                return (
                (idx <=1 || showMore ) && <div className="sd-preview-variant-selection-common">
                    <p style={{color:data.customization[0].volume.productDetails.variantSelector.color}}>{idx + 1}</p>
                    <select
                   
                      onChange={(e, main) =>
                        
                         handleVariantChoice(e,index,idx)
                      }
                      style={{"backgroundColor":data.customization[0].volume.productDetails.variantSelector.backgroundColor,"color":data.customization[0].volume.productDetails.variantSelector.color }} 
                    
                    >
                      {/* <option
                        value={data.bundleDetail.products[0].variants[0].price}
                      >
                        {" "}
                        Select Variant{" "}
                      </option> */}

                      {data.bundleDetail.products[0].variants.map((sub, ind) => {
                        return (
                          <option
                            value={sub.price}
                            data-varindex="3"
                          >
                            {sub.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              } ) }
              
              { item.quantity > 2 && (
                <div>
                  
                  <Button
                    type="link"
                    className="sd-volume-showMoreLess"
                    onClick={() => setShowMore(!showMore)}
                  >
                    
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                </div>
              )}
              </>
              : ""
               
            }

            </>
          )}
        </div>
)}
   

        <div
          className="sd-bundle-total-common"
          style={{
            color: data.customization[0].volume.totalSection.color,
            backgroundColor:
              data.customization[0].volume.totalSection.backgroundColor,
            fontSize:
              data.customization[0].volume.totalSection.fontSize + "px",
          }}
        >
          {data.customization[0].volume.totalSection.text}
          <div>
            <span
              className="sd-bundle-mrp-price"
              style={{
                color:
                  data.customization[0].volume.totalSection.originalPrice
                    .color,
                fontSize:
                  data.customization[0].volume.totalSection.originalPrice
                    .fontSize + "px",
              }}
            >
      
              <del> {showAmountWithCurrency(sumData[selected],currency)}</del>
            </span>
            <span
              className="sd-bundle-real-price"
              style={{
                color:
                  data.customization[0].volume.totalSection.finalPrice.color,
                fontSize:
                  data.customization[0].volume.totalSection.finalPrice
                    .fontSize + "px",
              }}
            >
             
              {showAmountWithCurrency(endPriceData[selected],currency)}
            </span>
          </div>
        </div>

        {data.customization[0].volume.button.position == "bottom" && (
          <button
            type="button"
            className="sd-addToCart-button"
            style={{
              color: data.customization[0].volume.button.color,
              fontSize: data.customization[0].volume.button.fontSize + "px",
              backgroundColor:
                data.customization[0].volume.button.backgroundColor,
            }}
          >
            {data.customization[0].volume.button.text_others + " "}
            {"discount"}%{" "}
          </button>
        )}
      </div>
    </div>
  
:

   <EmptyPreview type={data.bundleDetail.discountedProductType}/>

          }
          </div>
</>
   
      
  )


}

export default VolumePreview;
