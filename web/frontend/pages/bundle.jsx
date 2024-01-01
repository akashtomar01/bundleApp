
import React,{Suspense,lazy} from "react";
const CreateBundle = lazy(() => import("../components/bundle/bundle"));
const Watermark = lazy(() => import("../components/watermark"));
const ContactUs = lazy(() => import("../components/contactUs"));
const LogoHeader = lazy(() => import("../components/logoHeader"));
import { Spin } from "antd";
const Bundle = () => {
  return (
    <div>
<Suspense fallback={<Spin className="sd-lazy-loader"  spinning/>}>
      <LogoHeader/>
      <div className='sd-margin-top'>
      <CreateBundle/>
     <Watermark/>
     <ContactUs/>
      </div>
</Suspense>
    </div>
  )
}

export default Bundle