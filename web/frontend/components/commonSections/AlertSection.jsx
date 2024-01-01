import React from "react"; 
import {Banner} from "@shopify/polaris";

const AlertSection=(props)=>{
    return(
       
       <Banner
          title="Alert !!"
          status={props.status}
          onDismiss={() => props.setAlert({ state: false, message:[],status:""})}
          // onDismiss={() => props.setAlert({ state: false, message:"",status:""})}
        >
          {
          props.message.map((item,index)=>
          <p key={index}> * {item}</p>
)}

        </Banner>

    )
}

export default AlertSection;