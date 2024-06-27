import React, { useState,useEffect } from 'react'  ;
import { useAppBridge } from '@shopify/app-bridge-react';
import { useAPI } from '../../components/shop';
import CreateBundleModal from '../../components/createBundleModal';
import MoveToHomePage from '../../components/commonSections/MoveToHomePage';
import BundleNameTitle from '../../components/commonSections/bundleNameTitle';
import DiscountOptions from '../../components/commonSections/discountOptions';
import DateTime from '../../components/commonSections/dateTime';
import DeleteSave from '../../components/commonSections/deleteSave';
import BundleStatus from '../../components/commonSections/bundleStatus';
import DisplayOptions from '../../components/commonSections/displayOptions';
import BundlePickerData from '../../components/resourcePickerData/BundlePickerData';
import {TextField,InlineError,Thumbnail} from "@shopify/polaris";
import AlertSection from '../../components/commonSections/AlertSection';
import {  Button,Spin } from "antd";
import { alertCommon } from '../../components/helperFunctions';
import CollectionMixMatchPreview from '../../components/preview/collectionMixMatchPreview';
import defaultData from "../../components/customization/defaultData.json";
// import pic from "../../assets/image2.png";
import postApi from "../../components/postApi";
import { useNavigate,useParams } from "react-router-dom";
import toastNotification from "../../components/commonSections/Toast";
import BoatLoader from '../../components/BoatLoader';
import noImg from "../../assets/no-Image.png" 


const  CollectionMixMatch=()=>{
  let headerkey = "Create Collection Mix & Match" ;
  const param = useParams()
 const navigate = useNavigate()
 const app=useAppBridge();

const[myModal,setMyModal]=useState(false) 
const[error,setError]=useState("")
const[errorArray,setErrorArray]=useState([])
const[quantityError,setQuantityError]=useState([])
const[alert,setAlert]=useState(false)
const [spinner,setSpinner] = useState(false) 

const {shop,timeZone,currencyCode}=useAPI()


const [data, setData] = useState({
  name :"",
  title :"Create Your Bundle & Get Discount",
  shop : "",
  type:"collectionMixMatch",
  status:"active",
  startdate:new Date(),
  endDate:"",  
  bundleDetail :{
    description:"Buy products from below collections,Save {discount}",
    products:[],
   display:{productPages:true,bundle:true,productPagesList:[]},
   quantities:[],
   discountType:"percent",
   discountValue:5
  },
  customization: [defaultData] ,
  timeZone:timeZone

})



const temp={}       //don't delete it 


const getCollectionMixMatchData = async()=>{
  let body = {id :param.id}
  setSpinner(true)
const response = await postApi("/api/admin/editBundle",body,app)
if(response.status === 200){
  setData(response.data.response)
  setSpinner(false)
}
}

useEffect(() => {
if(param.id !== "create"){
  getCollectionMixMatchData()
}
}, [])






const removeProductFromList=
  (item) => {
   

    let update = [...data.bundleDetail.products];
    update.splice(update.indexOf(item),1);
    let copy =[...(data.bundleDetail.display.productPagesList)];
    let copy2= copy.filter(item2 => item2 != item.id)
  
    if (update.length > 0 && copy2.length==0){
      setData({...data,bundleDetail:{...data.bundleDetail,products:update,display:{...data.bundleDetail.display,productPages:false,productPagesList:copy2}}});
    }
    else if(update.length ==0){
      setData({...data,bundleDetail:{...data.bundleDetail,products:update,display:{...data.bundleDetail.display,productPages:true,productPagesList:copy2}}});
    }
    else
    {
      setData({...data,bundleDetail:{...data.bundleDetail,products:update,display:{...data.bundleDetail.display,productPagesList:copy2}}});
    }


    let copyErrorArray=[...quantityError];
    let copyArray=[];
  copyErrorArray.map((item2)=>
      {
    if( item2 >= index ) 
    {
      copyArray.push(item2 - 1)    
    }} 
   )
setQuantityError(copyArray)
 
 }



const handleDiscountType = (e) => {
    setData({
    ...data,
    bundleDetail:{
      ...(data.bundleDetail),
    discountType: e.target.value,
    }
  });
     };

  const handleDiscountValue = (newvalue) => {
    if (newvalue == "" || newvalue < 0) {
      setData({ ...data,
        bundleDetail:{
           ...(data.bundleDetail),
           discountValue: 0 
           }
          });
    } else {
      setError("");
      newvalue = String(newvalue);
      // if (String(newvalue).length > 1) {
      newvalue = newvalue.replace(/^0/, "");
      // }
      setData({
        ...data,
        bundleDetail:{
          ...(data.bundleDetail),
          discountValue:newvalue,
          }
      });
    }
  };


  const handleDisplayOptions = (e) => {
    if (e.target.checked) {
   
      if (e.target.name == "productPages") {
        let arr = [];
        data.bundleDetail.products.map((item) => {
          arr.push(item.id);
        });

        setData({
          ...data,
          bundleDetail:{
            ...(data.bundleDetail),
            display:{...(data.bundleDetail.display),productPages:true,productPagesList:[...arr]}
          }
        });
      } else {
        setData({
          ...data,
          bundleDetail:{
            ...(data.bundleDetail),
          display: {...(data.bundleDetail.display),[e.target.name]:true},
          }
        }); 
      }
    } else {
      
      if (e.target.name == "productPages") {
        setData({
          ...data,
          bundleDetail:{
           ...(data.bundleDetail),
          display:{
          ...data.bundleDetail.display,
          productPages:false,
          productPagesList : []     
          }
          }
        });
      } else {
        setData({ ...data, 
          bundleDetail:{
            ...(data.bundleDetail),
          display: {...data.bundleDetail.display,[e.target.name]:false} 
          }
        });
      
      }
    }
  };

  const handleDisplayPageOptions = (e) => {
    if (e.target.checked) {
    
      let update = { ...(data)};
      if (update.bundleDetail.display?.productPagesList.length < 1) {
        update.bundleDetail.display = {
          ...(update.bundleDetail.display),
          productPages:true,
          productPagesList : [e.target.value] ,
        };
        
        setData(update);
      } else {
        update.bundleDetail.display.productPagesList = [
          ...(update.bundleDetail.display.productPagesList),
          e.target.value,
        ];
        setData(update);
      }
    } else {
      let update = { ...data };
      let data2 = update.bundleDetail.display.productPagesList.filter((item) => {
        return item !== e.target.value;
      });

      if (data2.length > 0) {
        setData({
          ...data,
          bundleDetail:{
            ...(data.bundleDetail),
          display:{...(data.bundleDetail.display),productPagesList:data2}
          }
        });
      } else {
          
        setData({
          ...data,
          bundleDetail:{
            ...(data.bundleDetail),
          display:{...(update.bundleDetail.display),productPages :false , productPagesList : data2},
          }
        });
      }
    }
  }
  

  const handleSave=async()=>{
    let alertText=[]
    let flag=true;

  
    if(data.bundleDetail.products.length==0){
      if(!errorArray.includes("noCollection"))
      {
        setErrorArray((prev)=>[...prev,"noCollection"])
      }
     
      flag=false
      alertText.push("Please add atleast one collection")
     
    }
    if(data.bundleDetail.products.length == 1 && data.bundleDetail.products[0]?.quantity==1){
      setError("singleProduct")
      if(!errorArray.includes("singleProduct"))
      {
        setErrorArray((prev)=>[...prev,"singleProduct"])
      }
      flag=false
      alertText.push("Number of the required items should be more than 1 if single collection selected.");
    }
       let arr=[];
       data.bundleDetail.products.map((item,index)=>
        {
            if(item.quantity < 1){
              
             arr.push(index)
            } 
        })

   if(arr.length > 0){
    flag=false
    setQuantityError(arr)
    alertText.push(`Number of the required items can't be less than 1`);
        }      
 

  if (data.name == "") {
     
    if(!errorArray.includes("bundleName"))
    {
      setErrorArray((prev)=>[...prev,"bundleName"])
    }
   
    flag=false
    alertText.push("Please provide name of bundle")
}

if (data.title == "") {
  if(!errorArray.includes("bundleTitle")){
         setErrorArray((prev)=>[...prev,"bundleTitle"])
}
    flag=false
    alertText .push("Please provide title of bundle")    
}
// if (data.startdate == "") {
//   if(!errorArray.includes("startdate")){
//     setErrorArray((prev)=>[...prev,"startdate"])
//   }
//     flag=false
//     alertText.push("Please select start date & time")
  
// }
if(flag==false ){
  alertCommon(
      setAlert,
      alertText,
      "critical",
      false
    );
}
if(flag==true){

  if (param.id == "create") {
    setSpinner(true);
  const response  = await postApi("/api/admin/createBundle",data,app)
    if(response.data.status === 200){
      return (
        setSpinner(false),
        navigate('/bundle'),
        toastNotification("success","Saved","bottom")
      )
    }else{
      return alertCommon(setAlert, ["Something went wrong"],"warning",false)
    }
  }else{
    setSpinner(true);

    const response = await postApi("/api/admin/updateBundle", data, app);
   
    if (response.data.status === 200) {
      return (
        setSpinner(false),

        navigate("/bundle"),
        toastNotification("success", "Update successfully", "bottom")
      );
    } else {
      return alertCommon(
        setAlert,
        ["Something went wrong"],
        "warning",
        false
      );
    }
  }
}
  }

  const handleDelete=()=>{




  }

    return(
        <Spin spinning={spinner}
        indicator={<BoatLoader/>}
        size="large"> 
    <div className="Polaris-Page Polaris-Page--fullWidth">
    <MoveToHomePage data={headerkey}/>
    {alert.state == true && (<AlertSection  message={alert.message} setAlert={setAlert}  status={alert.status} />)}

    <div className="sd-bundle-wrapper-common">
    <div className="sd-bundle-left-section-common">
    <div className="sd-bundle-bundleSection-common sd-bundle-collectionMixMatchSearchSection">
    <div className="sd-bundle-bundleSection-heading-common">Product Bundle </div>
    <div className="sd-bundle-plainText-common">
    Add collections you want your customers to buy from
            </div>
            
            <Button className='sd-bundle-collectionMixMatch-searchButton' onClick={()=>setMyModal(true)} >
        Add Collection
      </Button>

      <BundlePickerData page="collectionMixMatch" modalType="Collection" data={data} setData={setData} temp={temp}  removeProductFromList={removeProductFromList} />


      {myModal && (
            <CreateBundleModal
               open={myModal}
               setOpen={setMyModal}
               type=""
               modalType="Collection"
               page="CollectionMixMatch"
               data={data}
               setData={setData}
                          />
          )}
    </div>
     

 <div  className="sd-bundle-bundleSection-common">
    <p className='sd-bundle-bundleSection-heading-common'>Quantities</p>
    <p className='sd-bundle-plainText-common'>Specify how many product your customers should add from each collection to their cart to get the discount</p>
    <div className="sd-bundle-collectionMixMatch-productList">
                 
                    {data.bundleDetail.products.map((item, index) => {
              return (
                <>
                
                  <div className="sd-bundle-selectedProductList" key ={index}>
                    <div className="sd-bundle-image-title">
                      <div>
                     
                           <Thumbnail source={item?.image ? item?.image?.originalSrc : noImg} size="small" alt="pic" />
                      
                      </div>

                      <div className="sd-bundle-title-section">
                        <div className="sd-bundle-title">{item.title}</div>
                     
                      </div>
                    </div>
                  
                  
                    <div className="sd-bundle-quantity">
                      <TextField
                        type="number"
                        label="Number of required items"
                        onChange={(newvalue) => {
                          if (newvalue == "" || newvalue < 0 ) {
                            let update = [...data.bundleDetail.products];
                          update[index].quantity =0;
                          setData({
                            ...data,
                            bundleDetail:{...data.bundleDetail,products:update}
                          })
                     
                          } else {
                          // setError("");
                          if(String(newvalue).includes(".")==false){
                          newvalue = String(newvalue);
                          // if (String(newvalue).length > 1) {
                          newvalue = newvalue.replace(/^0/, "");
                          // }
                          let update=[...data.bundleDetail.products];
                          update[index].quantity=newvalue;
                          setData({
                            ...data,
                            bundleDetail:{...data.bundleDetail,products:update}
                          })
                        }
                      }
                        }}
                        value={item.quantity}
                        autoComplete="off"
                        min="0"
                      />
                    </div>
                  </div>

                   <br/>
                  { quantityError.includes(index) && <InlineError message="Quantity required should  be more than 1 if single collection selected Only" />}
                </>
              );
            })} 
                 </div>
   </div>

 <BundleNameTitle 
 data={data}
 setData={setData}
 errorArray={errorArray}
type= "collectonMix&Match"
 /> 

<DiscountOptions page="collectionMixMatch" discountType={data.bundleDetail.discountType} discountValue={data.bundleDetail.discountValue}  handleDiscountType={handleDiscountType}  handleDiscountValue={handleDiscountValue}  errorArray={errorArray}  currency={currencyCode}/>

{/* <DateTime
            data={data}
            setData={setData}
            errorArray={errorArray}
          /> */}

<DeleteSave handleSave={handleSave} />
 
    </div>
    <div className="sd-bundle-productBundle-rightSection Polaris-Layout__Section Polaris-Layout__Section--secondary">
    
    <BundleStatus
            data={data}
            setData={setData}
          />

<DisplayOptions bundleType="collectionMixMatch"  display={data.bundleDetail.display}  handleDisplayOptions={handleDisplayOptions} displayPageOptions={data.bundleDetail.display.productPages}  handleDisplayPageOptions={handleDisplayPageOptions} products={data.bundleDetail.products} />
 
<CollectionMixMatchPreview  data={data}  currency={currencyCode}   />

    </div>

   </div>
   
   </div>
   </Spin>
)
}

export default CollectionMixMatch ;