import React from "react";
import Hero from "../components/Hero";
import manpur from "../assets/images/hero/DSC07922.webp";
import girlpur from "../assets/images/hero/DSC07493-copy-mobile.webp";
import pur from "../assets/images/hero/purse.webp";
import yelo from "../assets/images/hero/yelo.webp";
import puur from "../assets/images/hero/puur.webp";
import lapgr from "../assets/images/hero/lapgr.webp";
import gift from "../assets/images/hero/gift.webp";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="about-us">
        <div className="text">
          <h3>ABOUT US</h3>
          <h1>Luxury, Legacy, Leather</h1>
          <h5>
            With a legacy dating back to 1880, Jafferjees is one of the oldest
            leather goods brand in the world.
          </h5>
        </div>
        <div className="showcase-grid">
          <div className="sigcol">
            <h1>Signature Collection</h1>
            <p>
              Our Signature Collections blend elegance with functionality,
              ensuring every product stands as a testament to timeless
              sophistication. From luxurious leather goods to meticulously
              crafted accessories, each piece embodies the essence of refined
              craftsmanship.
            </p>
            <button className="shopbutton">Shop Now</button>
            <div className="girlpur">
              <div>
                <img src={girlpur} alt="img" />
              </div>
              <div>
                <img src={pur} alt="img" />
              </div>
            </div>
          </div>
          <div className="manpur">
            <img src={manpur} alt="img" />
          </div>
          <div className="manpur">
            <img src={lapgr} alt="img" />
          </div>
          <div className="sigcol">
            <h1>Dinner & Dance</h1>
            <p>
              From sleek clutches to stylish shoulder bags, our Dinner & Dance
              range offers sophisticated accessories to elevate your evening
              ensemble. Discover the full collection today and find the perfect
              finishing touch to complete your look.
            </p>
            <button className="shopbutton">Shop Now</button>
            <div className="girlpur">
              <div>
                <img src={puur} alt="img" />
              </div>
              <div>
                <img src={yelo} alt="img" />
              </div>
            </div>
          </div>
        </div>
        <img src={gift} alt="gift" className="gift" />
      </div>
    </>
  );
};

export default Home;
