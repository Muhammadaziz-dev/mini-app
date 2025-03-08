import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            
            <p>This website is in test mode</p>
            <div className="footer-social-icons">
            <a href="https://www.facebook.com/"><img src={assets.facebook_icon} alt="" /></a>
              <a href="https://x.com/"><img src={assets.twitter_icon} alt="" /></a>
              <a href="https://www.linkedin.com/"><img src={assets.linkedin_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+998-94-469-93-44</li>
              <li>contact@ev_lab.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2025 © EV lab - All rights reserved.</p>
    </div>
  )
}

export default Footer