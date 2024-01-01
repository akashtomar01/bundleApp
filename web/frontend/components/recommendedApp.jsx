import React from "react";
import { Card, Avatar} from "antd";
import { MediaCard } from "@shopify/polaris";

const { Meta } = Card;

const RecommendedApp = () => {

  return (
    <Card
      title="Recommended apps & themes "
      className="sd-bundle-contact-box recommended-app-section"
      extra={<a    onClick={() => {
        window.open(
          "https://apps.shopify.com/partners/shine-dezign-infonet"
        );
      
      }} >More apps</a>}
    >
      <div className="sd-bundle-meta-card-main">
        <div className="sd-bundle-meta-card">
          <a
            onClick={() => {
              window.open(
                "https://apps.shopify.com/advanced-pre-order"
              );
             
               
            }}
          >
            <Meta
              avatar={
                <Avatar
                  shape="square"
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 75, xxl: 75 }}
                  src="https://cdn.shopify.com/app-store/listing_images/23cac5f53ef84a1a64710d72ac393f76/icon/CODB0en_v_QCEAE=.png"
                />
              }
              title="Advanced PreOrder‑Partial Pay"
              description="Enhance customer experience with Pre-Order and Partial Payment"
            />
          </a>
        </div>
        <div className="sd-bundle-meta-card">
          <a
            onClick={() => {
              window.open(
                "https://apps.shopify.com/advanced-subscription-pro"
              );
           
            }}
          >
            <Meta
              avatar={
                <Avatar
                  shape="square"
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 75, xxl: 75 }}
                  src="https://cdn.shopify.com/app-store/listing_images/afd435f009f75672cc511615763db00d/icon/CMvYtb_vpfsCEAE=.png"
                />
              }
              title="Advanced Subscriptions App"
              description="Offers seamless experience for recurring payments and Orders"
            />
          </a>
        </div>
        <div className="sd-bundle-meta-card">
          <a
            onClick={() => {
              window.open(
                "https://apps.shopify.com/genie-product-options"
              );
            }}
          >
            <Meta
              avatar={
                <Avatar
                  shape="square"
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 75, xxl: 75 }}
                  src="https://cdn.shopify.com/app-store/listing_images/20cd9a3891f8f4e0ccc45ef261a9a23c/icon/COj9t7ba8fwCEAE=.png"
                />
              }
              title="Genie Product Options"
              description="Unlimited number of Product Infinite Options & Variant options"
            />
          </a>
        </div>
        <div className="sd-bundle-meta-card">
          <a
            onClick={() => {
              window.open(
                "https://apps.shopify.com/advanced-gst"
              );
            }}
          >
            <Meta
              avatar={
                <Avatar
                  shape="square"
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 75, xxl: 75 }}
                  src="https://cdn.shopify.com/app-store/listing_images/0cba46a9647ff20ff1c50ecbcd693787/icon/CJGJ1r-oivACEAE=.png"
                />
              }
              title="Advanced Invoices/GST App"
              description="Easy app designed for your businesses all across the globe to automatically generate invoices."
            />
          </a>
        </div>
      
      </div>
      <div className="sd-bundle-meta-card-theme">
          <MediaCard
            title="Yuva"
            primaryAction={{
              content: "Learn about getting started",
              onAction: () => {
                window.open(
                  "https://themes.shopify.com/themes/yuva/styles/amaze"
                );
            },
            }}
            description="Modern yet elegant theme to best showcase your product catalog."
          >
            <img
            loading="lazy"
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "top center",
              }}
              src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/yuva-image.webp?v=1699336765"
            />
          </MediaCard>
       
        </div>
        <div className="sd-bundle-meta-card-theme">
          <MediaCard
            title="Fame"
            primaryAction={{
              content: "Learn about getting started",
              onAction: () => {
                window.open(
                  "https://themes.shopify.com/themes/fame/styles/dark"
                );
            },
            }}
            description="Powerfully evoking emotion through creativity."
          >
            <img
            loading="lazy"
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "top center",
              }}
              src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/fame-image.webp?v=1699336744"
            />
          </MediaCard>
         
        </div>
    </Card>
  );
};

export default RecommendedApp;
