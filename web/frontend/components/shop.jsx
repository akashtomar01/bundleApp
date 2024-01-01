import React, { useContext, useState, createContext } from "react";
import postApi from "./postApi";
import { useAppBridge } from "@shopify/app-bridge-react";
const APIContext = createContext();

 function ContextProvider({ children }) {

   const [currency,setCurrency]=useState("") ;
   const [currencyCode,setCurrencyCode]=useState("") ;
   const [timeZone,setTimeZone] = useState("")
  const [themeId, setThemeId] = useState("");


   const app=useAppBridge();
  const [getShop, setGetShop] = useState(new URL(location).searchParams.get("shop"));

  async function getCurrencyCode(){
                 
  let data= await postApi("/api/admin/getCurrencyCode",{},app)

    let codeCurrency=data?.data?.data?.currencyFormats.moneyFormat;
    let shopTimeZone = data?.data?.data?.ianaTimezone;
    // let moneyFormat = codeCurrency.replace(/{{.*?}}/g, "");
  
    setCurrencyCode(codeCurrency)
    setTimeZone(shopTimeZone)
  }
 

    getCurrencyCode()

  async function getThemeId () {

  const response = await postApi('/api/admin/getThemeId',{},app)
  if(response.data.status == 200){
    setThemeId(response.data.response)
    

  }
  }
  getThemeId()
 
  return (

    <APIContext.Provider value={{ shop: getShop,timeZone:timeZone,app:app,currencyCode:currencyCode,themeId:themeId}}>

      {children}

    </APIContext.Provider>

 );

}


export default ContextProvider;


export function useAPI() {

  const context = useContext(APIContext);

  if (context === undefined) {

    throw new Error("Context must be used within a Provider");

  }

  return context;
}