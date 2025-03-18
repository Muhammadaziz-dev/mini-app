"use client"

import { useEffect, useState } from "react"
import "./Banner.css"
import axios from "axios"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Banner = () => {
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { url } = useContext(StoreContext)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${url}/api/news`)
        setBanner(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching banner:", err)
        setError("Failed to load banner content")
        setLoading(false)
      }
    }

    fetchBanner()
  }, [url])

  if (loading) {
    return (
      <div className="banner banner-loading">
        <div className="banner-loading-animation"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="banner banner-error">
        <p>{error}</p>
      </div>
    )
  }

  // Fallback banner if API fails
  const fallbackBanner = {
    title: "Special Offer",
    content: "Get 20% off on your first order with code WELCOME20",
    image: "/placeholder.svg",
  }

  const displayBanner = banner || fallbackBanner

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h2>{displayBanner.title}</h2>
          <p>{displayBanner.content}</p>
          <button className="banner-button">Learn More</button>
        </div>
        <div className="banner-image">
          {displayBanner.image && (
            <img
              src={
                displayBanner.image.startsWith("http") ? displayBanner.image : `${url}/images/${displayBanner.image}`
              }
              alt={displayBanner.title}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner

