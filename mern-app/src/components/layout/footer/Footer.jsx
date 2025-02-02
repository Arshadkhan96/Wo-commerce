import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <ul>
        <li>
          <h2>AbeBooks</h2>
          Books, art collectibles
        </li>
        <br />
        <li>
          <h2>Shopbop</h2>
          Designer Fashion Brands
        </li>
      </ul>

      <ul>
        <li>
          <h2>Web Services</h2>
          Scalable Cloud Computing Services
        </li>
        <br />
        <li>
          <h2>Business</h2>
          Everything for your business
        </li>
      </ul>

      <ul>
        <li>
          <h2>Prime Now</h2>
          2-hour delivery on every item
        </li>
        <br />
        <li>
          <h2>Prime Music</h2>
          100 million songs, ad-free<br />
          Over 15 million podcast episodes
        </li>
      </ul>
      <ul className='social-icons'>
        <li><FaFacebook className='icon' /></li>
        <li><FaInstagram className='icon' /></li>
        <li><FaTwitter className='icon' /></li>
        <li><FaWhatsapp className='icon' /></li>
      </ul>
    </div>
  );
}

export default Footer;
