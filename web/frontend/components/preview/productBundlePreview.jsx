import React, { useEffect, useState } from "react";
// import { Icon } from "@shopify/polaris";
// import {ShipmentMajor,ChevronLeftMinor,ChevronRightMinor } from "@shopify/polaris-icons";
import {
  PlusOutlined,
  ShoppingCartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import EmptyPreview from "../commonSections/emptyPreview";
import { Button, Modal, Image } from "antd";
import pic from "../../assets/image2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Thumbnail } from "@shopify/polaris";
import { showAmountWithCurrency } from "../showCurrencyFormat";
const ProductBundlePreview = ({
  data,
  currency,
  mrp,
  endPrice,
  showPrice,
  handleVariantChoice,
  bundleType,
}) => {
  const [display, setDisplay] = useState("productPage");
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  const [showMore, setShowMore] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [popUpItem, setPopUpItem] = useState({});
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [seeMoreIndex, setSeeMoreIndex] = useState(0);
  const [Move, setMove] = useState("");

  const handlePopUp = (item, index) => {
    setPopUp(true);
    setPopUpItem({ ...item });
    setSelectedItemIndex(index);
  };

  const setOk = () => {
    setPopUpItem("");
    setSelectedItemIndex("");
    setPopUp(false);
  };

  const setCancel = () => {
    setPopUpItem("");
    setSelectedItemIndex("");
    setPopUp(false);
  };

  const handleLeftCarousel = () => {
    if (left > 0) {
      setLeft(left - 1);
      setRight(right - 1);
      setMove(Move + 100);
    }
  };
  const handleRightCarousel = () => {
    if (right < data.bundleDetail.products.length - 1) {
      setLeft(left + 1);
      setRight(right + 1);
      setMove(Move - 100);
    }
  };

  const handleSeeMore = (mainindex) => {
    // setSeeMoreIndex(mainindex)
    if(showMore == true && seeMoreIndex == mainindex){
      setShowMore(false);
      setSeeMoreIndex(mainindex);
    }else{
      setShowMore(true);
      setSeeMoreIndex(mainindex);
      
    }
 
  };

  return (
    <div className="sd-bundle-bundleSection-common sd-bundle-productBundle-preview first-previewCard">
      <div className="sd-bundle-bundleSection-heading-common">Preview</div>
      <div className="sd-preview-displaySelect">
        <select value={display} onChange={(e) => setDisplay(e.target.value)}>
          <option className="option" value="productPage">
            Product Page
          </option>
          {/* <option className="option"  value="popUp"  >Pop Up</option> */}
        </select>
      </div>

      {data.bundleDetail.products.length > 0 ? (
        display == "productPage" ? (
          <div
            className="sd-preview-wrapper-common sd-productBundle-preview-specific"
            style={{
              backgroundColor: data.customization[0].bundle.box.backgroundColor,
              borderColor: data.customization[0].bundle.box.borderColor,
              borderRadius:
                data.customization[0].bundle.box.borderRadius + "px",
            }}
          >
            {data.customization[0].bundle.button.position == "top" && (
              <button
                type="button"
                style={{
                  color: data.customization[0].bundle.button.color,
                  fontSize: data.customization[0].bundle.button.fontSize + "px",
                  backgroundColor:
                    data.customization[0].bundle.button.backgroundColor,
                }}
              >
                {data.customization[0].bundle.button.text_others + " "}
              </button>
            )}

            <div
              className="sd-preview-title-common"
              style={{
                color: data.customization[0].bundle.title.color,
                fontSize: data.customization[0].bundle.title.fontSize + "px",
                textAlign: data.customization[0].bundle.title.alignment,
              }}
            >
              {data.title}
            </div>

            {data.bundleDetail.products.map((item, mainindex) => {
              return (
                <div key={mainindex}>
                  <div className="sd-preview-data-section-common">
                    <div className="sd-bundle-custom-center-imgTitlePrice-wrapper">
                      <div className="sd-custom-image-container">
                        <img
                          src={
                            item?.images[0]?.originalSrc
                              ? item?.images[0]?.originalSrc
                              : pic
                          }
                          style={{
                            borderColor:
                              data.customization[0].bundle.productDetails.image
                                .borderColor,
                            borderRadius:
                              data.customization[0].bundle.productDetails.image
                                .borderRadius + "px",
                          }}
                        />
                        {/* <Thumbnail
      source={item?.images[0]?.originalSrc  ? item?.images[0]?.originalSrc :pic} style={{"borderColor":data.customization.productPage.productDetails.image.borderColor,"borderRadius":data.customization.productPage.productDetails.image.borderRadius+"px"}}
      size="large"
      alt="Black choker necklace"
    /> */}
                      </div>
                      <div className="sd-bundle-title-price">
                        <div
                          style={{
                            color:
                              data.customization[0].bundle.productDetails.title
                                .color,
                            fontSize:
                              data.customization[0].bundle.productDetails.title
                                .fontSize + "px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div>
                          {item.variants.length == 1 &&
                          item.hasOnlyDefaultVariant == false
                            ? item.variants[0].title
                            : ""}
                        </div>
                        <div
                          style={{
                            color:
                              data.customization[0].bundle.productDetails.price
                                .color,
                            fontSize:
                              data.customization[0].bundle.productDetails.price
                                .fontSize + "px",
                          }}
                        >
                          {/* {currency}{" "}
                          {showPrice[mainindex]
                            ? showPrice[mainindex]
                            : item.variants[0]?.price} */}
                            
                           {
                           showPrice[mainindex]?
                           showAmountWithCurrency(showPrice[mainindex],currency)
                           :
                           showAmountWithCurrency(item.variants[0]?.price,currency)
            }
                        </div>
                      </div>
                    </div>
                    <div
                      className="sd-bundle-showQuantity"
                      style={{
                        color:
                          data.customization[0].bundle.productDetails.quantities
                            .color,
                        backgroundColor:
                          data.customization[0].bundle.productDetails.quantities
                            .backgroundColor,
                      }}
                    >
                      {item.minimumOrder}X{" "}
                    </div>
                  </div>

                  {item.variants.length > 1 ? (
                    <>
                      {Array.from({ length: item.minimumOrder }).map(
                        (emptyItem, index) => {
                          return (
                            (
                              index <= 1 ||
                              (
                                showMore && 
                                mainindex == seeMoreIndex)) && (
                              <div
                                key={index}
                                className="sd-preview-variant-selection-common"
                              >
                                <p
                                  style={{
                                    color:
                                      data.customization[0].bundle
                                        .productDetails.variantSelector.color,
                                  }}
                                >
                                  {index + 1}
                                </p>
                                <select
                                  onChange={(e, main) =>
                                    handleVariantChoice(e, mainindex, index)
                                  }
                                  style={{
                                    backgroundColor:
                                      data.customization[0].bundle
                                        .productDetails.variantSelector
                                        .backgroundColor,
                                    color:
                                      data.customization[0].bundle
                                        .productDetails.variantSelector.color,
                                  }}
                                >
                                  <option value={item.variants[0].price}>
                                    {" "}
                                    Select Variant{" "}
                                  </option>

                                  {item?.variants.map((sub, ind) => {
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
                            )
                          );
                        }
                      )}

                      {item.minimumOrder > 2 && (
                        <div>
                          {" "}
                          <Button
                            type="link"
                            className="sd-volume-showMoreLess"
                            // onClick={() => setShowMore(!showMore)}
                            onClick={() => handleSeeMore(mainindex)}
                          >
                            {" "}
                            {showMore && mainindex == seeMoreIndex
                              ? "Show Less"
                              : "Show More"}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {data.bundleDetail.products.indexOf(item) !=
                  data.bundleDetail.products.length - 1 ? (
                    <div className="sd-bundle-svg-common" style={{background: data.customization[0].bundle.productDetails.plusBackgroundColor}}>
                      {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25px"
                fill={data.customization.productPage.productDetails.plusColor}
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z"></path>
              </svg> */}

                      <PlusOutlined
                        style={{
                          color:
                            data.customization[0].bundle.productDetails
                              .plusColor,
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            <>
              {data.bundleDetail.discountType == "freeShipping" ? (
                <div className="sd-bundle-freeShipping">
                  <div className="sd-bundle-freeShipping-icon">
                    {/* <Icon source={ShipmentMajor} color="primary" /> */}
                    <ShoppingCartOutlined />
                  </div>

                  <div className="sd-bundle-freeShipping-text">
                    Get Free Shipping
                  </div>
                </div>
              ) : (
                " "
              )}
              <div
                className="sd-bundle-total-common"
                style={{
                  color: data.customization[0].bundle.totalSection.color,
                  backgroundColor:
                    data.customization[0].bundle.totalSection.backgroundColor,
                  fontSize:
                    data.customization[0].bundle.totalSection.fontSize + "px",
                }}
              >
                <p>{data.customization[0].bundle.totalSection.text}</p>
                <div className="sd-bundle-customization-total-common">
                  {data.bundleDetail.products.length >= 2 && (
                    <span
                      className="sd-bundle-mrp-price"
                      style={{
                        color:
                          data.customization[0].bundle.totalSection
                            .originalPrice.color,
                        fontSize:
                          data.customization[0].bundle.totalSection
                            .originalPrice.fontSize + "px",
                      }}
                    >
                      <del>
                        {/* {currency} {mrp}{" "} */}
                        {showAmountWithCurrency(mrp,currency)}
                      </del>
                    </span>
                  )}
                  <span
                    className="sd-bundle-real-price"
                    style={{
                      color:
                        data.customization[0].bundle.totalSection.finalPrice
                          .color,
                      fontSize:
                        data.customization[0].bundle.totalSection.finalPrice
                          .fontSize + "px",
                    }}
                  >
                    {/* {currency} {endPrice} */}
                   { showAmountWithCurrency(endPrice,currency)}
                  </span>
                </div>
              </div>
              {/* {data.button.position=="bottom" &&  <button type="button"> Add To Cart {data.bundleDetail.discountType== "noDiscount" ? "" :data.bundleDetail.discountType=="percent" ? "  || Save " + data.bundleDetail.discountValue +" % " : (data.bundleDetail.discountType =="fixed" || data.bundleDetail.discountType=="price" ?"  || Save " +  (mrp-endPrice ) + currency : (data.bundleDetail.discountType =="freeShipping" ? "  || Save " + "Shipping Expenses" : ""   ) ) }</button>
} */}

              {data.customization[0].bundle.button.position == "bottom" && (
                <button
                  type="button"
                  className="sd-addToCart-button"
                  style={{
                    color: data.customization[0].bundle.button.color,
                    fontSize:
                      data.customization[0].bundle.button.fontSize + "px",
                    backgroundColor:
                      data.customization[0].bundle.button.backgroundColor,
                  }}
                >
                  {data.customization[0].bundle.button.text_others}
                </button>
              )}
            </>
          </div>
        ) : (
          <div
            className="sd-preview-wrapper-common sd-productBundle-preview-specific"
            style={{
              backgroundColor: data.customization[0].popUp.box.backgroundColor,
            }}
          >
            <p
              className="sd-popUp-customize-title"
              style={{
                color: data.customization[0].popUp.title.color,
                fontSize: data.customization[0].popUp.title.fontSize + "px",
                textAlign: data.customization[0].popUp.title.alignment,
              }}
            >
              {data.title}
            </p>

            <div className="sd-bundle-parent-carousel-div">
              {/* <div style={{transform:`translateX(${Move}px)`}} className="sd-bundle-carousel-box"> */}

              <Swiper
                slidesPerView={2}
                spaceBetween={25}
                className="mySwiper"
                centeredSlides={
                  data.bundleDetail.products.length == 1 ? true : false
                }
                navigation={true}
                modules={[Navigation]}
              >
                {data.bundleDetail.products.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="sd-bundle-popup-box">
                        <div className="sd-bundle-popup-item">
                          {/* <img src={item?.images[0]?.originalSrc ? item?.images[0]?.originalSrc :pic } width="100%" height="auto" alt="" /> */}
                          {/* <Thumbnail
      source={item?.images[0]?.originalSrc ? item?.images[0]?.originalSrc :pic }
      size="large"
      alt="Black choker necklace"
    /> */}
                          <div>
                            <Image
                              width={200}
                              preview={false}
                              src={
                                item?.images[0]?.originalSrc
                                  ? item?.images[0]?.originalSrc
                                  : pic
                              }
                            />
                          </div>

                          <p
                            className="sd-bundle-showQuantity sd-quantity-positioning"
                            style={{
                              color:
                                data.customization[0].popUp.productDetails
                                  .quantities.color,
                              backgroundColor:
                                data.customization[0].popUp.productDetails
                                  .quantities.backgroundColor,
                            }}
                          >
                            {item.minimumOrder}
                          </p>
                          <p>{item.title}</p>

                          <p>
                            {item.variants.length == 1 &&
                            item.hasOnlyDefaultVariant == false
                              ? item?.variants[0]?.title
                              : ""}
                          </p>

                          <p>
                            {" "}
                            {currency}{" "}
                            {showPrice[index]
                              ? showPrice[index]
                              : item.variants[0]?.price}
                          </p>
                          {item.variants.length > 1 ? (
                            item.minimumOrder == 1 ? (
                              <select
                                style={{
                                  backgroundColor:
                                    data.customization[0].popUp.productDetails
                                      .variantSelector.backgroundColor,
                                  color:
                                    data.customization[0].popUp.productDetails
                                      .variantSelector.color,
                                }}
                                onChange={(e, main) =>
                                  handleVariantChoice(e, index, 0)
                                }
                              >
                                <option value={item.variants[0].price}>
                                  {" "}
                                  Select Variant{""}
                                </option>

                                {item?.variants.map((sub, ind) => {
                                  return (
                                    <option value={sub.price} data-varindex="3">
                                      {sub.title}
                                    </option>
                                  );
                                })}
                              </select>
                            ) : (
                              <select
                                style={{
                                  backgroundColor:
                                    data.customization[0].popUp.productDetails
                                      .variantSelector.backgroundColor,
                                  color:
                                    data.customization[0].popUp.productDetails
                                      .variantSelector.color,
                                }}
                                onClick={() => handlePopUp(item, index)}
                              >
                                <option> Select Variant{""}</option>
                              </select>
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        {index != data.bundleDetail.products.length - 1 && (
                          <PlusOutlined
                            className="plusBtn"
                            style={{
                              color:
                                data.customization[0].popUp.productDetails
                                  .plusColor,
                            }}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* </div> */}
              {/* { <div className="sd-bundle-left-ctrl"><button onClick={handleLeftCarousel}>left</button></div>}
 {<div className="sd-bundle-right-ctrl"><button onClick={handleRightCarousel}>right</button></div>} */}

              <div
                className="sd-bundle-total-common"
                style={{
                  color: data.customization[0].popUp.totalSection.color,
                  fontSize:
                    data.customization[0].popUp.totalSection.fontSize + "px",
                  backgroundColor:
                    data.customization[0].popUp.totalSection.backgroundColor,
                }}
              >
                {data.customization[0].popUp.totalSection.text}
                <div className="sd-bundle-customization-total-common">
                  <span
                    className="sd-bundle-mrp-price"
                    style={{
                      color:
                        data.customization[0].popUp.totalSection.originalPrice
                          .color,
                      fontSize:
                        data.customization[0].popUp.totalSection.originalPrice
                          .fontSize + "px",
                    }}
                  >
                    <del>
                      {currency} {mrp}{" "}
                    </del>
                  </span>
                  <span
                    className="sd-bundle-real-price"
                    style={{
                      color:
                        data.customization[0].popUp.totalSection.finalPrice
                          .color,
                      fontSize:
                        data.customization[0].popUp.totalSection.finalPrice
                          .fontSize + "px",
                    }}
                  >
                    {currency} {endPrice}
                  </span>
                </div>
              </div>

              {data.customization[0].popUp.button.position == "bottom" && (
                <button
                  type="button"
                  className="sd-addToCart-button"
                  style={{
                    color: data.customization[0].popUp.button.color,
                    fontSize:
                      data.customization[0].popUp.button.fontSize + "px",
                    backgroundColor:
                      data.customization[0].popUp.button.backgroundColor,
                  }}
                >
                  {data.customization[0].popUp.button.text_others + " "}{" "}
                </button>
              )}

              {popUp && (
                <Modal
                  title={`Select Variants for ${popUpItem.title}`}
                  // centered
                  open={popUp}
                  onOk={setOk}
                  onCancel={setCancel}
                  className="sd-selectVariant-popUp-wrapper"
                  item={popUpItem}
                >
                  <div className="sd-popUpData-container">
                    <div className="sd-popUpitem-imageTitle">
                      <img
                        src={
                          popUpItem?.images[0]?.originalSrc
                            ? popUpItem?.images[0]?.originalSrc
                            : pic
                        }
                      />

                      <p className="sd-bundle-showQuantity sd-quantity-positioning">
                        {popUpItem.minimumOrder}X{" "}
                      </p>
                    </div>

                    <p>{popUpItem.title}</p>
                  </div>
                  <div className="sd-popup-variantSelection-List">
                    {Array.from({ length: popUpItem.minimumOrder }).map(
                      (emptyItem, index) => {
                        return (
                          <div
                            key={index}
                            className="sd-preview-variant-selection-common"
                          >
                            <p>{index + 1}</p>
                            <select
                              onChange={(e, main) =>
                                handleVariantChoice(e, selectedItemIndex, index)
                              }
                            >
                              <option value={popUpItem.variants[0].price}>
                                {" "}
                                Select Variant{" "}
                              </option>

                              {popUpItem?.variants.map((sub, ind) => {
                                return (
                                  <option value={sub.price} data-varindex="3">
                                    {sub.title}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        );
                      }
                    )}
                  </div>
                </Modal>
              )}
            </div>
          </div>
        )
      ) : (
        <EmptyPreview type={""} />
      )}
    </div>
  );
};
export default ProductBundlePreview;

{
  /* <div className="sd-preview-wrapper-common sd-productBundle-preview-specific" style={{backgroundColor:data.customization.popUp.box.backgroundColor}}>

    <p className="sd-popUp-customize-title" style={{color:data.customization.popUp.title.color,fontSize : data.customization.popUp.title.fontSize +"px",textAlign:data.customization.popUp.title.alignment}}>{data.title}</p>

<div className="sd-popUp-productData-wrapper">
{showData.map((item, mainindex)=>{
  return(
    <>
    
    <div className="sd-popUp-productData">

                     <div style={{position:"relative"}}>
                    <img
                      src={
                        item?.images[0]?.originalSrc ? item?.images[0]?.originalSrc :pic
                      }
                                          
                    />

<div className="sd-bundle-showQuantity   sd-quantity-positioning" style={{"color":data.customization.popUp.productDetails.quantities.color,"backgroundColor":data.customization.popUp.productDetails.quantities.backgroundColor}}>{item.minimumOrder}X </div>
{ (mainindex !=0 && right <= data.bundleDetail.products.length-1)    && <div className="sd-right-icon" onClick={handleRight}><DoubleRightOutlined/></div>}
{    mainindex != showData.length-1  && left >=1  && <div className="sd-left-icon" onClick={handleLeft}><DoubleLeftOutlined/></div>}


                    </div>
                    <p>{item.title}</p>
                    <p>
                {item.variants.length == 1 &&
                item.hasOnlyDefaultVariant == false
                  ? item?.variants[0]?.title
                  : ""}
              </p>
                  <p>
                {currency}{" "}
                {showPrice[mainindex]
                  ? showPrice[mainindex]
                  : item.variants[0]?.price}
              </p>
               
              { item.variants.length > 1 ? ( item.minimumOrder == 1 ?
              
              
         <select style={{"backgroundColor":data.customization.popUp.productDetails.variantSelector.backgroundColor,"color":data.customization.popUp.productDetails.variantSelector.color 
        
        }}     
        onClick={()=>handleSelectedItemIndex(item)}      
          onChange={(e, main) =>
            handleVariantChoice(e, selectedItemIndex,0)}
            >
                      <option
                        value={item.variants[0].price}
                      >
                        {" "}
                        Select Variant{""}
                      </option>

                      {item?.variants.map((sub, ind) => {
                        return (

                          <option
                            value={sub.price}
                            data-varindex="3"
                          >
                           {sub.title}
                          </option>
                        )})}
                     
                    </select>
                    :


                          
         <select style={{"backgroundColor":data.customization.popUp.productDetails.variantSelector.backgroundColor,"color":data.customization.popUp.productDetails.variantSelector.color }}     
                  
         onClick={() =>handlePopUp(item)
           }
           >
                     <option>
                       {" "}
                       Select Variant{""}
                     </option>
                   </select>

              )
                  
                    :
                    
                    ""
                    
              }


</div>
{showData.indexOf(item) !=
          showData.length - 1 ? (
<div className="sd-popUp-plus-svg">
       

<PlusOutlined style={{  color: data.customization.popUp.productDetails.plusColor }} />

            </div>

          ):""}      
</>)})}
       </div>         

       <div className="sd-bundle-total-common" style={{"color":data.customization.popUp.totalSection.color,"fontSize":data.customization.popUp.totalSection.fontSize+"px","backgroundColor":data.customization.popUp.totalSection.backgroundColor}}>
       {data.customization.popUp.totalSection.text}
        <div>
     
<span className="sd-bundle-mrp-price" style={{"color":data.customization.popUp.totalSection.originalPrice.color,"fontSize":data.customization.popUp.totalSection.originalPrice.fontSize+"px"}} >
<del>{currency}  {mrp} </del>
</span>
<span className="sd-bundle-real-price"  style={{"color":data.customization.popUp.totalSection.finalPrice.color,"fontSize":data.customization.popUp.totalSection.finalPrice.fontSize+"px"}}>{currency} {endPrice}</span>
</div>
      </div>

      {data.customization.popUp.button.position=="bottom" && <button type="button" className="sd-addToCart-button" style={{"color":data.customization.popUp.button.color,"fontSize":data.customization.popUp.button.fontSize+"px","backgroundColor":data.customization.popUp.button.backgroundColor}}>
        {data.customization.popUp.button.text_others +" "} </button>
        
}
 {popUp && (
                                <Modal
                                  title={`Select Variants for ${popUpItem.title}`}
                                  // centered
                                  open={popUp}
                                  onOk={setOk}
                                  onCancel={setCancel}
                                  className="sd-selectVariant-popUp-wrapper"
                                 
                                  item={popUpItem}
                                >
                                  <div className="sd-popUpData-container">

                                  <div className="sd-popUpitem-imageTitle">
                                  
                                  <img
                      src={
                        popUpItem?.images[0]?.originalSrc ? popUpItem?.images[0]?.originalSrc :pic
                      }
                       />
                                                            
                            <p className="sd-bundle-showQuantity sd-quantity-positioning" >{popUpItem.minimumOrder}X </p>                               
                                 
                                  </div>

                            <p>{popUpItem.title}</p>        
                                 

</div>
<div className="sd-popup-variantSelection-List"> 

{Array.from({ length: popUpItem.minimumOrder }).map((emptyItem, index) => {
                return (
                <div key={index} className="sd-preview-variant-selection-common">
                    <p>{index + 1}</p>
                    <select
                      onChange={(e, main) =>
                        handleVariantChoice(e, selectedItemIndex, index)
                      }
                     
                    >
                      <option
                        value={popUpItem.variants[0].price}
                      >
                        {" "}
                        Select Variant{" "}
                      </option>

                      {popUpItem?.variants.map((sub, ind) => {
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



</div>
                          

                                </Modal>
                              )}  
                              
                              
  
</div> */
}
