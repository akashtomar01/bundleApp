import postApi from "./postApi";
import toastNotification from "./commonSections/Toast";

export async function handleEditFurther(id,setPid,setAntModal,setLoader,products,setCheckedIds,setVariantData,app) {
  setPid(id)
  setAntModal(true);
  setLoader(true);

  let update = products
    ?.find((ele) => ele.id == id)
    ?.variants.map((e) => {
      return e.id;
    });

  setCheckedIds(update);

  let finalData = await getVariants(id,app);

  if (finalData?.data?.status == 200) {

    setVariantData(finalData.data.data);
    setLoader(false);
  }

  else if (finalData.message == "fail" || finalData?.data?.data?.status == 502) {
    setPid("")
    setLoader(false);
    setAntModal(false);

    toastNotification("info", "Something Went Wrong , Please Try Again !!", "bottom")

  }
}

 async function getVariants(id,app) {
    try {
      const data = await postApi("/api/admin/fetchVariants", {p_id:id},app);
      return {message:"success",data:data};
    } catch(err) {
       return {message:"fail",data:""}
    }
  }; 


 export  function alertCommon(setAlert,message,status,returnBool){

    setAlert({ state: true, message:message,status:status});
    window.scrollTo(0, 0);
    return returnBool;

  }


 export  const handleChangeCommon=(e,key1,key2,data,setData,bundleOption)=>{
       
    // setData({...data,[key1]:{...(data[key1]),[key2]:e.target.value}})   
  setData({...data,[bundleOption]:{...(data[bundleOption]),[key1]:{...(data[bundleOption][key1]),[key2]:e.target.value}}})   
 }


export const handleChangeValueCommon=(newvalue,key1,key2,data,setData,bundleOption)=>{
     console.log(newvalue)

 if (newvalue == "" || newvalue < 0) {
 setData({...data,[key1]:{...(data[key1]),[key2]:0}})  
 setData({...data,[bundleOption]:{...(data[bundleOption]) ,[key1]:{...(data[bundleOption][key1]),[key2]:0}}})  
 } 
 else {  
     newvalue = String(newvalue);
     {
     newvalue = newvalue.replace(/^0/, "");
 setData({...data,[bundleOption]:{...(data[bundleOption]),[key1]:{...(data[bundleOption][key1]),[key2]:newvalue}}})   
 }}
 }

export const handleChangeCommon2=(e,key1,key2,key3,data,setData,bundleOption)=>{

    setData({...data,[bundleOption]:{...(data[bundleOption]),[key1]:{...(data[bundleOption][key1]),[key2]:{...(data[bundleOption][key1][key2]),[key3]:e.target.value}}}})   
 }

 export const handleChangeValueCommon2=(newvalue,key1,key2,key3,data,setData,bundleOption)=>{
    
       if (newvalue == "" || newvalue < 0) {
        setData({...data,[bundleOption]:{...(data[bundleOption]),[key1]:{...(data[bundleOption][key1]),[key2]:{...(data[bundleOption][key1][key2]),[key3]:0}}}})    
       } 
       else {  
           newvalue = String(newvalue);
           {
           newvalue = newvalue.replace(/^0/, "");
           setData({...data,[bundleOption]:{...(data[bundleOption]),[key1]:{...(data[bundleOption][key1]),[key2]:{...(data[bundleOption][key1][key2]),[key3]:newvalue}}}})    
       }}
       }
   

