"use client"

import { useState, useEffect } from "react"
import "./LocationPrompt.css"

const LocationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  // List of cities in Uzbekistan
  const uzbekistanCities = [
    "Tashkent",
    "Samarkand",
    "Namangan",
    "Andijan",
    "Nukus",
    "Bukhara",
    "Karshi",
    "Kokand",
    "Fergana",
    "Margilan",
    "Urgench",
    "Jizzakh",
    "Chirchiq",
    "Termez",
    "Navoiy",
    "Angren",
    "Olmaliq",
    "Bekobod",
  ]

  useEffect(() => {
    // Check if user has already selected a city
    const savedCity = localStorage.getItem("userCity")

    if (savedCity) {
      setSelectedCity(savedCity)
    } else {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleCitySelect = (e) => {
    const city = e.target.value
    setSelectedCity(city)

    if (city) {
      localStorage.setItem("userCity", city)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedCity) {
      localStorage.setItem("userCity", selectedCity)
      setShowPrompt(false)
    }
  }

  const handleClose = () => {
    if (selectedCity) {
      localStorage.setItem("userCity", selectedCity)
    }
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="location-prompt-overlay">
      <div className="location-prompt">
        <button className="location-prompt-close" onClick={handleClose}>
          ×
        </button>
        <h2>Welcome to Food Del!</h2>
        <p>Please select your city in Uzbekistan for better service and delivery options.</p>

        <form onSubmit={handleSubmit}>
          <select value={selectedCity} onChange={handleCitySelect} required>
            <option value="">Select your city</option>
            {uzbekistanCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <button type="submit" className="location-prompt-button">
            Confirm Location
          </button>
        </form>
      </div>
    </div>
  )
}

export default LocationPrompt

