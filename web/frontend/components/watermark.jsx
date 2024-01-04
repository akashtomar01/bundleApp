import React from 'react'

const Watermark = () => {
  // let currentYear = new Date().getFullYear();
  // console.log('check current year date',currentYear);
  return (
    <div className='sd-watermark'>
      <div className='sd-logo'>
        <a href="https://shinedezigninfonet.com/" target="_blank" rel="noopener noreferrer">

        <img className='sd-logo-img' src="https://cdn.shopify.com/s/files/1/0801/7264/6691/files/logo-1.png?v=1699250778" alt=""  />
        </a>
      </div>
      <span>Powered by</span>
      <div className='sd-logo-text'>SHINE DEZIGN INFONET</div>
      <p>Copyright © 2023 Shine Dezign infonet. All Rights Reserved</p>
      {/* <p>Copyright © {currentYear} Shine Dezign infonet. All Rights Reserved</p> */}
    </div>
  )
}

export default Watermark