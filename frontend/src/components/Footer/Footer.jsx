import "./Footer.css"
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="tomatologofooter" src={assets.logo || "/placeholder.svg"} alt="" />
          <p>Delivering happiness, one meal at a time. The best food delivery service in Uzbekistan.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon || "/placeholder.svg"} alt="" />
            <img src={assets.twitter_icon || "/placeholder.svg"} alt="" />
            <img src={assets.linkedin_icon || "/placeholder.svg"} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>QUICK LINKS</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/myorders">My Orders</Link>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+998 71 123 4567</li>
            <li>info@fooddel.uz</li>
            <li>123 Food Street, Tashkent, Uzbekistan</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Food Del - All rights reserved.</p>
    </div>
  )
}

export default Footer

