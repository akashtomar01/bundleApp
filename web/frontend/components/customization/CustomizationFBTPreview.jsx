import { Button } from "antd";
import pic from "../../assets/image2.png";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Fragment } from "react";
const CustomizationFBt = ({ data }) => {
  let dummyProductsArray = [
    { name: "Blue Gem Stone", price: 500 },
    { name: "Fog Spray", price: 200 },
    { name: "Dark Chocolate", price: 100 },
    { name: "Denim Shirt", price: 400 },
  ];

  let dummyTotalCartHtml = (
    <div>
      <div className="fbt-bundle-total-common">
        <div>Total</div>
        <div className="fbt-bundle-customization-total-common">
          {" "}
          <del>Rs. 1200.00</del> <span> Rs. 1,055.00 </span>{" "}
        </div>
      </div>
      <Button className="sd_inputButton fbt-addto-cart-button">
        Add selected to cart
      </Button>
    </div>
  );

  return (
    <div className="sd_frequency_moderndesign_mainColumn">
      {data.frequentlyBoughtTogether.design === "classic" ? (
        <div>
          <div className="sd-preview-wrapper-common sd-productCustom-preview fbt-customization-specific">
            <p>Frequently bought together</p>
            <div className="design">
              {dummyProductsArray.map((item, index) => (
                 <Fragment key={index}>
                  <div
                    className="designChildDiv sd_bundle_thumbnailImg"
                    
                  >
                    <img src={pic} />
                  </div>

                  {index != dummyProductsArray.length - 1 && (
                    <div className="iconDesign">
                      <PlusOutlined />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <div className="sd-preview-wrapper-common sd-productBundle-preview-specific">
              {dummyProductsArray.map((item, index) => (
                <div
                  className="customization-fbt-classic-item-container"
                  key={index}
                >
                  <div className="customization-fbt-classic-item">
                    <div>
                      <input type="checkbox" checked readOnly />
                    </div>
                    <div className="customization-fbt-classic-item-titlePrice">
                      <p>{item?.name}</p>
                      <p>Rs. {item.price}</p>
                    </div>
                  </div>
                  <div className="sd_selectd_vertical">
                    <select disabled>
                      <option>Select Variant</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {dummyTotalCartHtml}
          </div>
        </div>
      ) : (
        <div>
          <div className="sd-preview-wrapper-common sd-productCustom-preview fbt-customization-specific">
            <p>Frequently bought together</p>
            <div>
              {dummyProductsArray.map((item, index) => (
                <Fragment key={index}>
                  <div className="design designChildDiv sd-productCustom-previewBottom">
                    <div className="designChildDiv">
                      <input type="checkbox" checked readOnly />
                    </div>
                    <div className="designChildDiv sd_bundle_thumbnailImg">
                      <img src={pic} width={95} />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>Rs.{item.price}</p>
                    </div>
                  </div>
                  <div className="sd_selectd_vertical">
                    <select disabled>
                      <option>Select Variant</option>
                    </select>
                  </div>
                </Fragment>
              ))}
              {dummyTotalCartHtml}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationFBt;
