import React from 'react';
import { Carousel as AntdCarousel } from 'antd';


const Carousel = () => {
    
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return ( 
  <AntdCarousel>
    <div>
      <h3 style={contentStyle}>Welcome to Contractor Keeper</h3>
    </div>
    <div>
      <h3 style={contentStyle}>We put your home's history on the blockchain</h3>
    </div>
    <div>
      <h3 style={contentStyle}>For Contractors</h3>
    </div>
    <div>
      <h3 style={contentStyle}>For Homeowners</h3>
    </div>
    <div>
      <h3 style={contentStyle}>For Homebuyers</h3>
    </div>
    <div>
      <h3 style={contentStyle}>For Insurers</h3>
    </div>
  </AntdCarousel> );
}
 
export default Carousel;