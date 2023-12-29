import {useState,useEffect} from 'react'

import { Modal, Spin } from "antd";
import ProductVariantData from '../productVariantData';
import BxgyResourcePicker from './bxgyResourcePicker';
import XpickerData from './xPickerData';
import XproductVariantData from './BXGYproductVariantData';
import BXGYproductVariantData from './BXGYproductVariantData';

const BuyX = (props) => {
    const [myModal, setMyModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
  const [pid, setPid] = useState("");
  const [antModal, setAntModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [xPickerError, setXpickerError] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
    
    const handleSearchInput = (e) => {
        const { value } = e.target;
        if (value) {
          setMyModal(true);
          setSearchValue(value);
        } else {
          setSearchValue("");
        }
      };
      const handleBrowseProducts = async () => {
        setMyModal(true);
      };
      const xtemp = {
        setPid,
        setAntModal,
        setLoader,
        setCheckedIds,
        setVariantData,
      };
      const removeProductFromList = (item, index) => {
        let update = [...props.data.bundleDetail.xproducts];
        update.splice(update.indexOf(item), 1);
        let copy = [...props.data.bundleDetail.display.productPagesList];
    
        let copy2 = copy.filter((item2) => item2 != item.id);
    
        if (update.length > 0 && copy2.length == 0) {
            props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              xproducts: update,
              display: {
                ...props.data.bundleDetail.display,
                productPages: false,
                productPagesList: copy2,
              },
            },
          });
        } else if (update.length == 0) {
            props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              xproducts: update,
              display: {
                ...props.data.bundleDetail.display,
                productPages: true,
                productPagesList: copy2,
              },
            },
          });
        } else {
            props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              xproducts: update,
              display: { ...props.data.bundleDetail.display, productPagesList: copy2 },
            },
          });
        }
        let copyErrorArray = [...xPickerError];
        let copyArray = [];
        copyErrorArray.map((item2) => {
          if (item2 >= index) {
            copyArray.push(item2 - 1);
          }
        });
        setXpickerError(copyArray);
      };
      const setOk = () => {
        let getData = variantData.data.filter(
          (item) => checkedIds.indexOf(item.id) != -1
        );
        if (checkedIds.length > 0) {
          let update = [...props.data.bundleDetail.xproducts];
          let update2 = update.map((item) => {
            if (item.id == pid) {
              item.variants = getData;
            }
            return item;
          });
          props.setData({
            ...props.data,
            bundleDetail: {
              ...props.data.bundleDetail,
              xproducts: update2,
            },
          });
          setCheckedIds([]);
          setVariantData([]);
          setPid("");
          let copy = [...errorArray];
          copy.splice(copy.indexOf("uncheckedVariantModal"), 1);
          setErrorArray(copy);
    
          setAntModal(false);
        } else if (checkedIds.length == 0) {
          setErrorArray([...errorArray, "uncheckedVariantModal"]);
    
          return false;
        }
      };
      const setCancel = () => {
        setVariantData([]);
        setCheckedIds([]);
        setPid("");
        let copy = [...errorArray];
        copy.splice(copy.indexOf("uncheckedVariantModal"), 1);
        setErrorArray(copy);
        setAntModal(false);
      };
  return (
    <div className="sd-bundle-bundleSection-common sd-bundle-productBundleSearchSection">
        <div className="sd-bundle-bundleSection-heading-common">
        Products customer buys (Buy X)
              </div>
              <div className="sd-bundle-plainText-common">
              Choose products that customers buy.
              </div>
              <div className="sd-bundle-search">
                <input
                  type="text"
                  placeholder="search products"
                  onChange={handleSearchInput}
                  className="sd-bundle-search-box-common"
                  value={searchValue}
                />
                <button
                  type="button"
                  onClick={handleBrowseProducts}
                  className="sd-bundle-search-button-common"
                >
                  Browse
                </button>
              </div>

              <XpickerData
                page="xproduct"
                modalType=""
                data={props.data}
                setData={props.setData}
                temp={xtemp}
                errorArray={xPickerError}
                removeProductFromList={removeProductFromList}
              />
            
            {antModal && (
          <Modal
            title="Select Variant Options  for Bundle Modal"
            open={antModal}
            onOk={setOk}
            onCancel={setCancel}
            className="sd-bundle-modal sd-bundle-modal-variant"
            // width={1000}
          >
            <BXGYproductVariantData
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              variantData={variantData}
              loader={loader}
              errorArray={errorArray}
            />
          </Modal>
        )}

            {myModal && (
              <BxgyResourcePicker
                open={myModal}
                setOpen={setMyModal}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                page={"xproduct"}
                modalType="Product"
                setData={props.setData}
                data={props.data}
              />
            )}
           
    </div>
  )
}

export default BuyX