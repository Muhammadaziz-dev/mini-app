"use client"

import { useState } from "react"
import "./Contact.css"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    })

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      })
    }, 5000)
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have questions about our services or need assistance? Contact us using the information below or fill out the
            form.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <MapPin className="contact-icon" />
              <div>
                <h3>Our Location</h3>
                <p>123 Food Street, Tashkent, Uzbekistan</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <Phone className="contact-icon" />
              <div>
                <h3>Phone Number</h3>
                <p>+998 71 123 4567</p>
                <p>+998 90 123 4567</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <Mail className="contact-icon" />
              <div>
                <h3>Email Address</h3>
                <p>info@fooddel.uz</p>
                <p>support@fooddel.uz</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <Clock className="contact-icon" />
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <img src="/facebook_icon.png" alt="Facebook" />
              </a>
              <a href="#" className="social-icon">
                <img src="/twitter_icon.png" alt="Twitter" />
              </a>
              <a href="#" className="social-icon">
                <img src="/linkedin_icon.png" alt="LinkedIn" />
              </a>
              <a href="#" className="social-icon">
                <img src="/instagram_icon.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>

          {formStatus.submitted && (
            <div className={`form-message ${formStatus.success ? "success" : "error"}`}>{formStatus.message}</div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              <Send className="send-icon" size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <h2>Find Us on the Map</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264037015!2d69.13928276729939!3d41.28251254485305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1647887052080!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact

