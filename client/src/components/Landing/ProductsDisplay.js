import React from 'react';
import './Landing.css';

class ProductDisplay extends React.Component{
  render(){
    return(
      <div>
        <div className="products-section" style={{margin: "20px", height: "20vh"}}>
          <h2>Trending Products</h2>
          <div className="product">
            <h3>Samsung Galaxy M30 (Gradient Blue, 4+64GB)</h3>
            <a href="https://amzn.to/2LgHzrS">Checkout</a>
          </div>
          <div className="product">
            <h3>Horlicks Protein+ Health and Nutrition Drink - 400 g Pet Jar (Chocolate)</h3>
            <a href="https://amzn.to/2GPUw6h">Checkout</a>
          </div>
          <div className="product">
            <h3>Berg Mini Cast Iron Electric Tandoor</h3>
            <a href="https://amzn.to/2GSjFNF">Checkout</a>
          </div>
          <div className="product">
            <h3>Orico 2.5 inch SSD Sata Hard disk enclosure</h3>
            <a href="https://amzn.to/2J5Unyp">Checkout</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDisplay;