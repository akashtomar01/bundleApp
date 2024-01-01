import {useState} from 'react'
import { FloatButton,Modal,Button,  Card, Form, Input,  } from 'antd';
import toastNotification from './commonSections/Toast';
import { CommentOutlined,SendOutlined,FileDoneOutlined } from '@ant-design/icons';
import { useAppBridge } from '@shopify/app-bridge-react';
import postApi from './postApi';
const ContactUs = () => {
  const app = useAppBridge();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
 const [send,setSend] = useState("on")
  async function handleSubmit(value){
    setSend("start")
    const data = {
      uname: value.user.name,
      umail: value.user.email,
      message: value.user.message,
      storePassword: value.user.storePassword,
    };
    console.log(data)
  const response = await postApi("/api/admin/contactUs",data,app)
  if(response.status == 201){
    setSend("done")
    form.resetFields();
    notification.success({
      message: res.data.msg,
      duration: 2,
      placement: "bottom",
    });
    toastNotification("success","successfully sent","bottom")
  }else{
  
    toastNotification("success","something went wrong ! Please try again","bottom")
    setSend("on")
  
  }
    }


  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setSend("on")
    form.resetFields();
  };

 

  return (
    <div className='sd-fixed-contactUs-btn'>
<FloatButton className='sd-fixed-float-btn' icon={<CommentOutlined />} tooltip='Contact us'  style={{ right: 80 }} onClick={showModal} />

<Modal
        title="Contact Us"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button  key="ok" type="primary"  htmlType="submit"  onClick={()=>form.submit()}>
          {send == "on" ? <SendOutlined /> : send == "start" ?  <SendOutlined spin />: <FileDoneOutlined />}
          </Button>
        ]}
      >
         <div className='sd-bundle-contact-main-container'>
    <Card
        className="sd-bundle-contact-box"
        title="For any query mail us"
        headStyle={{ textAlign: "center" }}
      >
        <Form
          name="nest-messages"
          onFinish={handleSubmit}
          
          layout="vertical"
          form={form}
        >
          <div className='sd-bundle-name-email'>
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please fill the Name field.'
              },
            ]}
          >
            <Input type="text" placeholder="Enter Your Name Here" />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: 'Invalid email.'

              },
            ]}
          >
            <Input type="email" placeholder="Enter Your Email Address" />
          </Form.Item>
          </div>
         
           <div className='sd-bundle-password-message'>
          <Form.Item
            name={["user", "storePassword"]}
            label="Store Password"
            extra="Please enter your store front password if your store is password protected"
            requiredMark="optional"
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name={["user", "message"]}
            label="Message"
            rules={[
              {
                required: true,
                message: 'Please fill the message field.'

              },
            ]}
          >
            <Input.TextArea placeholder="Enter Your Message Here" />
          </Form.Item>
          </div>
         
        </Form>
      </Card>
    </div>
      </Modal>
    </div>
  )
}

export default ContactUs