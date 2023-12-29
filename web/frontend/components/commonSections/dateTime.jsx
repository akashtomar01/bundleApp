import React, { useState,useEffect } from "react";
import { InlineError } from "@shopify/polaris";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";


const DateTime=(props)=>{

    const [showEndTime,setShowEndTime]=useState(false)




    const handleToggleEndTime = (e) => {
        const { checked } = e.target;
        if (checked) {
          setShowEndTime(true);
        } else {
          setShowEndTime(false);
        }
      };


      const handleStartChange = (e)  => {
         if(e) {
           
            // setStartDateValue(e.$d)
               const updated =(new Date(e.$d)).toISOString();
                         props.setData({
                      ...(props.data),
                      startdate: updated,
                    });
         } else { 
            props.setData({
              ...(props.data),
              startdate:"",
            });
         }
      }

      const onOk = (e) => {
        if(e) {
         
             const updated =(new Date(e.$d)).toISOString();
                       props.setData({
                    ...(props.data),
                    startdate: updated,
                  });
       } else { 
          props.setData({
            ...(props.data),
            startdate:"",
          });
       }
      };
      const handleEndChange = (e)  => {
        if(e) {
         
     
              const updated =(new Date(e.$d)).toISOString();
                        props.setData({
                     ...(props.data),
                     endDate: updated,
                   });
        } else { 
           props.setData({
             ...(props.data),
             endDate:"",
           });
        }
     }
     const endOk = (e) => {
      if(e) {
    
           const updated =(new Date(e.$d)).toISOString();
                     props.setData({
                  ...(props.data),
                  endDate: updated,
                });
     } else { 
        props.setData({
          ...(props.data),
          endDate:"",
        });
     }
    };

      
return(
    <div className="sd-bundle-bundleSection-common sd-bundle-createBundleDateTimeSection">
            <div className="sd-bundle-bundleSection-heading-common">Active Dates </div>
            <div className="sd-bundle-sub-section">
              <Space direction="vertical">
                <DatePicker
                  placeholder="Select Start Date & Time"
                  onOk={onOk}
                  value={props.data.startdate == "" ? "": dayjs(props.data.startdate)}
                  // defaultPickerValue={props.data.startdate == "" ? dayjs(new Date()) : dayjs(props.data.startdate)}
                  onChange={handleStartChange}
                  showTime={{format:"HH:mm"}}
                  format="YYYY-MM-DD HH:mm"
                  picker="date"
                />
              </Space>
              {props.errorArray.includes("startdate") ? (
                <InlineError message=" Please select start date & time " />
              ) : (
                ""
              )}
            </div>
            <div className="sd-bundle-toggle-end-time">
              <input type="checkbox" value=""  id="selectEndTime" onChange={handleToggleEndTime} />
              <label htmlFor="selectEndTime">Set End Time (Optional)</label>
            </div>
            <div className="sd-bundle-sub-section">
              {showEndTime && (
                <Space direction="vertical">
                  <DatePicker                
                    onChange={handleEndChange}
                    value={props.data.endDate == "" ? "": dayjs(props.data.endDate)}
                    placeholder="Select End  Date & Time"
                    showTime={{format:"HH:mm"}}
                  format="YYYY-MM-DD HH:mm"
                    picker="date"
                    onOk={endOk}
                  />
                </Space>
              )}
            </div>
          </div>
)
}
export default DateTime;