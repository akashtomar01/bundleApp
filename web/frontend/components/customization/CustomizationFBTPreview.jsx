import { Button } from "antd";
import pic from "../../assets/image2.png";
import {
  PlusOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const CustomizationFBt = ({data}) =>{
   
  return(
    <div className="sd_frequency_moderndesign_mainColumn">
    {data.frequentlyBoughtTogether.design === "classic"?
      <div>
        <div className="sd_horizontal_preview_top">
          <Title level={5}>Horizontal Preview</Title>
          <p>Frequently bought together</p>
        </div>
        <div className="sd_frequency_moderndesign">
          <div className="design sd_frequency_mdesignInner">
            <div className="designChildDiv">
            <div className="designChildDivImg">
              <img src={pic} />
              </div>
            </div> 

            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
            <div className="designChildDivImg">
              <img src={pic} />
              </div>
            </div>

            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
            <div className="designChildDivImg">
              <img src={pic} />
              </div>
            </div>
            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>
            <div className="designChildDiv">
            <div className="designChildDivImg">
              <img src={pic} />
              </div>
            </div>

            <div className="designChildDiv designLastDiv">
              <p>Total <del>Rs.2000</del></p>
              <p>Rs. 1115</p>
              <Button disabled>Add selected to cart</Button>
            </div>

          </div>          
        </div>

        <div className="designChildDiv_main_row">
          <div className="designChildDiv designChildDiv_main">
            <div className="designChildDiv_mainInner_child">
            <input type="checkbox" checked/>
            <p>This item : Daisy Dress</p>
            </div>
            <select disabled><option>Select Variant</option></select>
            <span>Rs.****</span>
          </div>
          <div className="designChildDiv designChildDiv_main">
          <div className="designChildDiv_mainInner_child">
            <input type="checkbox" checked/>
            <p>This item : Daisy Dress</p>
            </div>
            <select disabled><option>Select Variant</option></select>
            <span>Rs.****</span>
          </div>
          <div className="designChildDiv designChildDiv_main">
          <div className="designChildDiv_mainInner_child">
            <input type="checkbox" checked/>
            <p>This item : Daisy Dress</p>
            </div>
            <select disabled><option>Select Variant</option></select>
            <span>Rs.****</span>
          </div>
          <div className="designChildDiv designChildDiv_main">
          <div className="designChildDiv_mainInner_child">
            <input type="checkbox" checked/>
            <p>This item : Daisy Dress</p>
            </div>
            <select disabled><option>Select Variant</option></select>
            <span>Rs.****</span>
          </div>
        </div>
        <div className="sd_horizontal_preview_top">
          <Title level={5}><u>Vertical Preview</u></Title>
        </div>
        <div className="sd-preview-wrapper-common sd-productCustom-preview">
          <div className="design">
            <div className="designChildDiv sd_bundle_thumbnailImg">
              
              <img src={pic}/>
            </div> 

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv sd_bundle_thumbnailImg">
              <img src={pic}/>
            </div>

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv sd_bundle_thumbnailImg">
              <img src={pic}/>
            </div>

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv sd_bundle_thumbnailImg">
              <img src={pic}/>
            </div>
          </div>

          <div>
            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div className="designChildDivInner">
                <p>Adia Skirt</p>
                <div class="sd_selectd_vertical">
                <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div className="designChildDivInner">
                <p>Adia Skirt</p>
                <div class="sd_selectd_vertical">
                <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div className="designChildDivInner">
                <p>Adia Skirt</p>
                <div class="sd_selectd_vertical">
                <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div className="designChildDivInner">
                <p>Adia Skirt</p>
                <div class="sd_selectd_vertical">
                <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
                <p>Rs.****</p>
              </div>
            </div>

          </div>
          <div className="designChildDiv">
          <div className="productMixMatchBGColor">
              <p>Total: Rs.
              <span>1,055.00 <del>Rs. 2,110.00</del> </span>
              </p>
              </div>
            <Button className="sd_inputButton" disabled>Add selected to cart</Button>
          </div>
        </div>
      </div>
      :
      <div>
          <div className="sd_horizontal_preview_top">
          <Title level={5}>Horizontal Preview</Title>
          <p>Frequently bought together</p>
        </div>
        <div className="sd_frequency_moderndesign">
        <div className="design sd_frequency_mdesignInner">
          <div className="designChildDiv">
          <div className="designChildDivImg">
            <img src={pic}/> 
            </div>
            <input type="checkbox" checked/>
            <p>This item:Daisy Dress</p>
            <p>Rs.****</p>
            <select disabled>
              <option>Select Variant</option>
            </select>
          </div> 

          <div className="designChilDevPlusIcon">
            <PlusOutlined />
          </div>

          <div className="designChildDiv">
          <div className="designChildDivImg">
            <img src={pic}/> 
            </div>
            <input type="checkbox" checked/>
            <p>Adia Skirt</p>
            <p>Rs.****</p>
            <select disabled>
              <option>Select Variant</option>
            </select>
          </div> 

          <div className="designChilDevPlusIcon">
            <PlusOutlined />
          </div>

          <div className="designChildDiv">
          <div className="designChildDivImg">
            <img src={pic}/>
            </div>
            <input type="checkbox" checked/>
            <p>Ekna Skirt</p>
            <p>Rs.****</p>
            <select disabled>
              <option>Select Variant</option>
            </select>
          </div> 

          <div className="designChilDevPlusIcon">
            <PlusOutlined />
          </div>

          <div className="designChildDiv">
          <div className="designChildDivImg">
            <img src={pic}/>
            </div>
            <input type="checkbox" checked/>
            <p>Eysan Skirt</p>
            <p>Rs.****</p>
            <select disabled>
              <option>Select Variant</option>
            </select>
          </div>
          
          <div className="designChildDiv designLastDiv">
            <p>Total <del>Rs.2000</del></p>
            <p>Rs. 1115</p>
            <Button className="sd_inputButton" disabled>Add selected to cart</Button>
          </div>
        </div>
        </div>
        <div class="sd_horizontal_preview_top">
          <Title level={5}><u>Vertical Preview</u></Title>
        </div>
        <div className="sd-preview-wrapper-common sd-productCustom-preview">
          <p>Frequently bought together</p>
          <div>
            <div className="design designChildDiv sd-productCustom-previewBottom">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div class="designChildDiv sd_bundle_thumbnailImg">
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>This item : Daisy Dress</p>
                <p>Rs.****</p>
              </div>
             </div>
             <div className="sd_selectd_vertical">
              <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
            <div className="design designChildDiv sd-productCustom-previewBottom">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div class="designChildDiv sd_bundle_thumbnailImg">
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <p>Rs.****</p>
             
              </div>
            </div>
            <div className="sd_selectd_vertical">
              <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>

            <div className="design designChildDiv sd-productCustom-previewBottom">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div class="designChildDiv sd_bundle_thumbnailImg">
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Ekna Skirt</p>
                <p>Rs.****</p>
               
              </div>
            </div>
            <div className="sd_selectd_vertical">
              <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>

            <div className="design designChildDiv sd-productCustom-previewBottom">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div class="designChildDiv sd_bundle_thumbnailImg">
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Eysan Skirt</p>
                <p>Rs.****</p>
              
              </div>
            </div>
            <div className="sd_selectd_vertical">
              <select disabled>
                  <option>Select Variant</option>
                </select>
                </div>
            <div className="designChildDiv">
              <div className="productMixMatchBGColor">
              <p>Total: Rs.
              <span>1,055.00 <del>Rs. 2,110.00</del> </span>
              </p>
              </div>
              <Button className="sd_inputButton" disabled>Add selected to cart</Button>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}

export default CustomizationFBt;