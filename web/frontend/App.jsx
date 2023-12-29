
import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "./components/responsive.css"
import "./components/style.css"
import ContextProvider from "./components/shop"
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
          <ContextProvider>
         
          <NavigationMenu
              navigationLinks={[
                {
                  label: "Bundles",
                  destination: "/bundle",

                },
                {
                  label: "Customization",
                  destination: "/customization",
                },
                {
                  label: "Analytics"  ,
                  destination: "/analytics",
                },
                {
                  label: "Settings"  ,
                  destination: "/settings",
                },
                {
                  label: "Plans"  ,
                  destination: "/plans",
                  
                }

              ]}

            />
            <Routes pages={pages} />
            </ContextProvider>
              
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

