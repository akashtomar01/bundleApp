import React from 'react'

const General = (props) => {
  return (
<div className="sd-bundle-bundleSection-common sd-bundle-createBundleNamingSection">
<div className="sd-bundle-bundleSection-heading-common">
      General
    </div>
    <div className="sd-bundle-nameBlock">
    <label className="sd-bundle-plainText-common">Name</label>
    <input
        type="text"
        className="sd-bundle-name"
        placeholder=""
        value={props.data.name}
        onChange={(e) =>
          props.setData({
            ...(props.data),
            name: e.target.value,
          })
        }
      />
      <p className="sd-bundle-createBundleSectionDisclaimer">
        *This name is used for you to identify this bundle.Your
        customers won’t see this name.
      </p>
    </div>
    <div className="sd-bundle-nameBlock">
    <label className="sd-bundle-plainText-common">Title</label>
    <input
        type="text"
        className="sd-bundle-name"
        placeholder=""
        value={props.data.title}
        onChange={(e) =>
          props.setData({
            ...(props.data),
            title: e.target.value,
          })
        }
      />
      <p className="sd-bundle-createBundleSectionDisclaimer">
      *Customers will see this as the name of the bundle displayed .
      </p>
    </div>
    {props.type !=='FrequentlyBoughtTogether' &&
      <div className="sd-bundle-nameBlock">
        <label className="sd-bundle-plainText-common">Bundle description</label>
        <input
            type="text"
            className="sd-bundle-name"
            placeholder=""
            value={props.data.description}
            onChange={(e) =>
              props.setData({
                ...(props.data),
                description: e.target.value,
              })
            }
          />
          <p className="sd-bundle-createBundleSectionDisclaimer">
            *Provide an explanation of the selection limit within this bundle to ensure user awareness..
          </p>
      </div>
    }
    

</div>
  )
}

export default General