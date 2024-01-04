import { Button, Checkbox } from "antd";
import pic from "../../assets/image2.png";
import {
  PlusOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const CustomizationFBt = ({data}) =>{
  console.log('CustomizationFBt******************************************',data);
   
  return(
    <div>
    {data.frequentlyBoughtTogether.design === "classic"?
      <div>
        <div>
          <Title level={5}><u>Horizontal Preview</u></Title>
        </div>
        <div>
          <p>Frequently bought together</p>
        </div>
        <div>
          <div className="design">
            <div className="designChildDiv">
              <img src={pic} width={140}/>
            </div> 

            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
              <img src={pic} width={140}/>
            </div>

            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
              <img src={pic} width={140}/>
            </div>
            <div className="designChilDevPlusIcon">
              <PlusOutlined/> 
            </div>
            <div className="designChildDiv">
              <img src={pic} width={140}/>
            </div>

            <div className="designChildDiv">
              <p>Total <del>Rs.2000</del></p>
              <p>Rs. 1115</p>
              <Button disabled>Add selected to cart</Button>
            </div>

          </div>          
        </div>

        <div>
          <div className="designChildDiv">
            <input type="checkbox" checked/>
            <u>This item : Daisy Dress</u>
            <select disabled><option>Select Variant</option></select>
            <u>Rs.****</u>
          </div>
          <div className="designChildDiv">
            <input type="checkbox" checked/>
            <u>Adia Skirt</u>
            <select disabled><option>Select Variant</option></select>
            <u>Rs.****</u>
          </div>
          <div className="designChildDiv">
            <input type="checkbox" checked/>
            <u>Ekna Skirt</u>
            <select disabled><option>Select Variant</option></select>
            <u>Rs.****</u>
          </div>
          <div className="designChildDiv">
            <input type="checkbox" checked/>
            <u>Eysan Skirt</u>
            <select disabled><option>Select Variant</option></select>
            <u>Rs.****</u>
          </div>
        </div>
        <div>
          <Title level={5}><u>Vertical Preview</u></Title>
        </div>
        <div className="sd-preview-wrapper-common sd-productCustom-preview">
          <div className="design">
            <div className="designChildDiv">
              <img src={pic} width={50}/>
            </div> 

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
              <img src={pic} width={50}/>
            </div>

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
              <img src={pic} width={50}/>
            </div>

            <div className="iconDesign">
              <PlusOutlined/> 
            </div>

            <div className="designChildDiv">
              <img src={pic} width={50}/>
            </div>
          </div>

          <div>
            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
                <p>Rs.****</p>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
                <p>Rs.****</p>
              </div>
            </div>

          </div>
          <div className="designChildDiv">
            <p>Total: Rs. 1,055.00 <del>Rs. 2,110.00</del></p>
            <Button disabled>Add selected to cart</Button>
          </div>
        </div>
      </div>
      :
      <div>
        <div>
          <Title level={5}><u>Horizontal Preview</u></Title>
        </div>
        <div>
          <p>Frequently bought together</p>
        </div>
        <div className="design">
          <div className="designChildDiv">
            <img src={pic} width={140}/> 
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
            <img src={pic} width={140}/> 
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
            <img src={pic} width={140}/>
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
            <img src={pic} width={140}/>
            <input type="checkbox" checked/>
            <p>Eysan Skirt</p>
            <p>Rs.****</p>
            <select disabled>
              <option>Select Variant</option>
            </select>
          </div>
          
          <div className="designChildDiv">
            <p>Total <del>Rs.2000</del></p>
            <p>Rs. 1115</p>
            <Button disabled>Add selected to cart</Button>
          </div>
        </div>

        <div>
          <Title level={5}><u>Vertical Preview</u></Title>
        </div>
        <div className="sd-preview-wrapper-common sd-productCustom-preview">
          <p>Frequently bought together</p>
          <div>
            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>This item : Daisy Dress</p>
                <p>Rs.****</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Adia Skirt</p>
                <p>Rs.****</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Ekna Skirt</p>
                <p>Rs.****</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div>
            </div>

            <div className="design designChildDiv">
              <div className="designChildDiv">
                <input type="checkbox" checked/>
              </div>
              <div>
                <img src={pic} width={95}/>
              </div>
              <div>
                <p>Eysan Skirt</p>
                <p>Rs.****</p>
                <select disabled>
                  <option>Select Variant</option>
                </select>
              </div>
            </div>
            <div className="designChildDiv">
              <p>Total: Rs. 1,055.00 <del>Rs. 2,110.00</del></p>
              <Button disabled>Add selected to cart</Button>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}

export default CustomizationFBt;