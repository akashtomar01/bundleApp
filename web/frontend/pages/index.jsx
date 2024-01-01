import React,{Suspense,lazy} from "react";

import { Spin } from "antd";

const Dashboard = lazy(() => import("../components/dashboard"));

const LogoHeader = lazy(() => import('../components/logoHeader'));

const ContactUs = lazy(() => import('../components/contactUs'));

export default function HomePage() {
 return (
<>

<Suspense fallback={<Spin className="sd-lazy-loader"  spinning/>}>
<LogoHeader/>
<div className="sd-margin-top">
<Dashboard/>
<ContactUs/>

</div>
</Suspense>

 </>
  );
}
