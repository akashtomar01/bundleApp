export const themeData=(data,setData,bundleOption,x)=>{

  if (bundleOption=="bundle") {
   if(x == "dark"){
      setData({
        ...data,
        [bundleOption]:{
          ...data[bundleOption],
        box:{...data[bundleOption]["box"],backgroundColor:"#000000"},
        button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
        title:{...data[bundleOption]["title"],color: "#FFFFFF"},
        productDetails:{...data[bundleOption]["productDetails"],title:{...data[bundleOption]["productDetails"]["title"],color:"#FFFFFF"},price:{...data[bundleOption]["price"],color:"#FFFFFF"},
        image:{borderColor:"#FFFFFF",borderRadius:0},quantities:{...data[bundleOption]["quantities"],color:"#000000",backgroundColor:"#FFFFFF"},variantSelector:{
          color:"#FFFFFF",
          backgroundColor:"#000000"
        },
        plusColor:"#FFFFFF",
     },
     totalSection:{...data[bundleOption]["totalSection"],backgroundColor:"#FFFFFF",color:"#000000"}
    }
    })

  }
    else if(x== "light"){

      setData({
        ...data,
        [bundleOption]:{
            ...data[bundleOption],
        box:{...data[bundleOption]["box"],backgroundColor:"#FFFFFF"},
        button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
        title:{...data[bundleOption]["title"],color: "#000000"},
        productDetails:{...data[bundleOption]["productDetails"],
        title:{...data[bundleOption]["productDetails"]["title"],color:"#000000"},
        price:{...data[bundleOption]["price"],color:"#000000"}, 
        image:{borderColor:"#FFFFFF",borderRadius:0}
        ,quantities:{...data[bundleOption]["quantities"],color:"#000000",backgroundColor:"#FFFFFF"},variantSelector:{
          color:"#000000",
          backgroundColor:"#FFFFFF"
        },
        plusColor:"#5e5e5e",
     },
     totalSection:{...data[bundleOption]["totalSection"],backgroundColor:"#FFFFFF",color:"#000000"}

    }
    })
    }
  }


  if(bundleOption=="volume"){


    if(x == "dark"){
      setData({
        ...data,
        [bundleOption]:{
          ...data[bundleOption],
        options: {
          ...data[bundleOption]["options"],
          iconColor: "#FFFFFF",
          color: "#FFFFFF",
         
          saveDiscount:{
            ...data[bundleOption]["options"]["saveDiscount"],
            color:"#FFFFFF",
           backgroundColor:"#2e2a2a"
          }
                
        },
        box:{...data[bundleOption]["box"],backgroundColor:"#000000"},
        button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
        title:{...data[bundleOption]["title"],color: "#FFFFFF"},
        productDetails:{...data[bundleOption]["productDetails"],title:{...data[bundleOption]["productDetails"]["title"],color:"#FFFFFF"},price:{...data[bundleOption]["price"],color:"#FFFFFF"},
        image:{borderColor:"#FFFFFF",borderRadius:0},quantities:{...data[bundleOption]["quantities"],color:"#000000",backgroundColor:"#FFFFFF"},
        quantitiesSelector:{color:"#000000",backgroundColor:"#FFFFFF",plusMinusColor:"#000000"},
        variantSelector:{
          color:"#FFFFFF",
          backgroundColor:"#000000"
        },
       
     },
     totalSection:{...data[bundleOption]["totalSection"],backgroundColor:"#FFFFFF",color:"#000000"}
    }
    })
  }
    else if(x== "light"){
      setData({
        ...data,
        [bundleOption]:{
          ...data[bundleOption],
        options: {
          ...data[bundleOption]["options"],
          iconColor: "#000000",
          color: "#000000",
         
          saveDiscount:{
            ...data[bundleOption]["options"]["saveDiscount"],
            color:"#FFFFFF",
           backgroundColor:"#ff0000"
          }
                
        },
        box:{...data[bundleOption]["box"],backgroundColor:"#FFFFFF"},
        button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
        title:{...data[bundleOption]["title"],color: "#000000"},
        productDetails:{...data[bundleOption]["productDetails"],title:{...data[bundleOption]["productDetails"]["title"],color:"#000000"},price:{...data[bundleOption]["price"],color:"#000000"}, image:{borderColor:"#FFFFFF",borderRadius:0},quantities:{...data[bundleOption]["quantities"],color:"#000000",backgroundColor:"#FFFFFF"},
        quantitiesSelector:{color:"#000000",backgroundColor:"#FFFFFF",plusMinusColor:"#000000"},
        
        variantSelector:{
          color:"#000000",
          backgroundColor:"#FFFFFF"
        },
       
     },
     totalSection:{...data[bundleOption]["totalSection"],backgroundColor:"#FFFFFF",color:"#000000"}
    }
    })
    }



    
  }
  

  if (bundleOption=="collection") {
    if(x == "dark"){
       setData({
         ...data,
         [bundleOption]:{
          ...data[bundleOption],
         box:{...data[bundleOption]["box"],backgroundColor:"#000000",borderColor: "#FFFFFF"},
         button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
         title:{...data[bundleOption]["title"],color: "#FFFFFF" ,description:{...data[bundleOption]["title"]["description"],color:"#ffffff"}},
         collectionDetails:{...data[bundleOption]["collectionDetails"],title:{...data[bundleOption]["collectionDetails"]["title"],color:"#FFFFFF"},
          plus:{color:"#5e5e5e",
           backgroundColor:"#FFFFFF"
         },
         
         description:{...data[bundleOption]["collectionDetails"]["description"],color:"#FFFFFF"},
      },
      saveDiscount:{
        ...data[bundleOption]["saveDiscount"],
        color:"#FFFFFF",
        backgroundColor:"#ff0000",
        
       }
      }
     })
   }
     else if(x == "light"){
      setData({
        ...data,
        [bundleOption]:{
          ...data[bundleOption],
        box:{...data[bundleOption]["box"],backgroundColor:"#FFFFFF",borderColor: "#e5e5e5"},
        button:{...data[bundleOption]["button"],backgroundColor:"#000000",color:"#FFFFFF"},
        title:{...data[bundleOption]["title"],color: "#000000",description:{...data[bundleOption]["title"]["description"],color:"#000000"}},
        collectionDetails:{...data[bundleOption]["collectionDetails"],title:{...data[bundleOption]["collectionDetails"]["title"],color:"#000000"},
         plus:{color:"#000000",
          backgroundColor:"#FFFFFF"
        },
      
        description:{...data[bundleOption]["collectionDetails"]["description"],color:"#000000"},
     },
     saveDiscount:{
       ...data[bundleOption]["saveDiscount"],
       color:"#FFFFFF",
       backgroundColor:"#ff0000",
      }

    }
    })
     }
   }



}