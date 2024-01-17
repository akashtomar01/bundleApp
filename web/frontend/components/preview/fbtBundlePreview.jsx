import { Button, Checkbox } from "antd";
import pic from "../../assets/image2.png";
import {
  PlusOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { showAmountWithCurrency } from "../showCurrencyFormat";
const FBTBundlePreview = ({data,customizeData,mrp,endPrice,currency}) =>{

  let [allProducts,setAllProducts] = useState([]);
  let designOption = customizeData.design;

  useEffect(()=>{
    setAllProducts([...data.bundleDetail.mainProducts,...data.bundleDetail.offeredProducts])
  },[data]);
  // console.log('preview data****',allProducts);

  return(
    <>
    {designOption === 'modern'?
        <div className="sd-bundle-bundleSection-common">
          <div className="sd-bundle-bundleSection-heading-common">Preview Modern</div>
          {allProducts.length>0?
            <div>
              <div>
                <p>Frequently bought together</p>
              </div>
              <div>
                <div className="design">
                  {allProducts.map((item,index)=>{
                    return(
                      <>
                        <div className="designChildDiv">
                          <img src={item?.images ? item?.images[0]?.originalSrc : pic} width={50}/>
                          <input type="checkbox" checked/>
                          <p>{item.title}</p>
                          <select disabled>
                            <option>Select Variant</option>
                          </select>
                          <p>{showAmountWithCurrency(item.variants[0]?.price,currency)}</p>
                        </div>
                        {index !== allProducts.length-1 ?
                          <div className="designPreviewPlusIcon">
                            <PlusOutlined/>
                          </div>:''
                        }
                      </>
                    )
                  })}
                  <div className="designChildDiv">
                    <p>Total</p>
                    {data.bundleDetail.discountType === "freeShipping" || data.bundleDetail.discountType === "noDiscount"?
                      <>                    
                        <p>{showAmountWithCurrency(endPrice,currency)}</p>
                        <Button disabled>Add selected to cart</Button>
                      </>
                      :
                      <>
                      {allProducts.length>1 && 
                        <del>{showAmountWithCurrency(mrp,currency)}</del>
                      }
                      <p>{showAmountWithCurrency(endPrice,currency)}</p>
                      <Button disabled>Add selected to cart</Button>
                      </>
                    }
                  </div>
                </div>          
              </div>
            </div>:
            <div>
              <h4>Please select product</h4>
            </div>
          }
        </div>
      : <div className="sd-bundle-bundleSection-common">
        <div className="sd-bundle-bundleSection-heading-common">Preview classic</div>
        {allProducts.length>0?
          <div>
            <div>
              <p>Frequently bought together</p>
            </div>
            <div>
              <div className="design">
                {allProducts.map((item,index)=>{
                  return(
                    <>
                      <div className="designChildDiv">
                        <img src={item?.images ? item?.images[0]?.originalSrc : pic} width={50}/>
                      </div>
                      {index !== allProducts.length-1 ?
                        <div className="designPreviewPlusIcon">
                          <PlusOutlined/>
                        </div>:''
                      }
                    </>
                  )
                })}
                <div className="designChildDiv">
                <p>Total</p>
                {data.bundleDetail.discountType === "freeShipping" || data.bundleDetail.discountType === "noDiscount"?
                    <>
                      <p>{showAmountWithCurrency(endPrice,currency)}</p>
                      <Button disabled>Add selected to cart</Button>
                    </>
                    :
                    <>
                    {allProducts.length>1 && 
                      <del>{showAmountWithCurrency(mrp,currency)}</del>
                    }
                    <p>{showAmountWithCurrency(endPrice,currency)}</p>
                    <Button disabled>Add selected to cart</Button>
                    </>

                  }
                </div>
              </div>          
            </div>

            <div>
            {allProducts.map((item,index)=>{
              return(
                <div className="design designChildDiv">
                  <div><input type="checkbox" checked/></div>
                  <div><u>{item.title}</u></div>
                  <div>
                    <select disabled>
                      <option>Select Variant</option>
                    </select>
                  </div>
                  <div><u>{showAmountWithCurrency(item.variants[0]?.price,currency)}</u></div>
                </div>
              )
            })}
            </div>
          </div>:
          <div>
            <h4>Please select product</h4>
          </div>
        }
        </div>
    }
     
    </>
    
  )
} 

export default FBTBundlePreview;