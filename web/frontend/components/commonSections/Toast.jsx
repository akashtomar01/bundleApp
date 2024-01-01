import { notification} from 'antd';
// let  type =  'success' | 'info' | 'warning' | 'error' ;
  
const toastNotification = (type,res,placement) => {
 return( 

    notification[type]({
      // message: `${type}`,
      description: `${res}`,
      className: 'sd-bundle-universal-toast',
      placement:`${placement}`,
      //  duration:500,
    })

  
 
 )

}
export default toastNotification;