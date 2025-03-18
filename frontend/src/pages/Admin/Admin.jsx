"use client"

import { useState, useEffect } from "react"
import "./Admin.css"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { Trash2, Edit, Plus, Save, X } from "lucide-react"

const Admin = () => {
  const { url, token } = useContext(StoreContext)
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [currentBanner, setCurrentBanner] = useState({
    title: "",
    content: "",
    image: "",
    slug: "",
  })

  useEffect(() => {
    fetchBanners()
  }, [url])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/news`)
      setBanners(Array.isArray(response.data) ? response.data : [response.data])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching banners:", err)
      setError("Failed to load banners")
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentBanner({
      ...currentBanner,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    // In a real app, this would handle file uploadss
    const imageUrl = e.target.value
    setCurrentBanner({
      ...currentBanner,
      image: imageUrl,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editMode) {
        // Update existing banner
        await axios.put(`${url}/api/news/${currentBanner._id}`, currentBanner, {
          headers: { token },
        })
      } else {
        // Create new banner
        await axios.post(`${url}/api/news`, currentBanner, {
          headers: { token },
        })
      }

      // Reset form and refresh banners
      resetForm()
      fetchBanners()
    } catch (err) {
      console.error("Error saving banner:", err)
      setError("Failed to save banner")
    }
  }

  const handleEdit = (banner) => {
    setCurrentBanner(banner)
    setEditMode(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`${url}/api/news/${id}`, {
          headers: { token },
        })
        fetchBanners()
      } catch (err) {
        console.error("Error deleting banner:", err)
        setError("Failed to delete banner")
      }
    }
  }

  const resetForm = () => {
    setCurrentBanner({
      title: "",
      content: "",
      image: "",
      slug: "",
    })
    setEditMode(false)
  }

  if (!token) {
    return (
      <div className="admin-page">
        <div className="admin-auth-message">
          <h2>Admin Access Required</h2>
          <p>Please log in with admin credentials to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your website content</p>
      </div>

      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Navigation</h2>
          <ul className="admin-nav">
            <li className="active">Banner Management</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </div>

        <div className="admin-content">
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>{editMode ? "Edit Banner" : "Create New Banner"}</h2>
              {editMode && (
                <button className="cancel-button" onClick={resetForm}>
                  <X size={16} />
                  Cancel
                </button>
              )}
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Banner Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentBanner.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Banner Content</label>
                <textarea
                  id="content"
                  name="content"
                  rows="4"
                  value={currentBanner.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Banner Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={currentBanner.image}
                  onChange={handleImageChange}
                  placeholder="Enter image URL or upload"
                />
                <div className="image-upload-container">
                  <button type="button" className="upload-button">
                    Choose File
                  </button>
                  <span className="upload-filename">No file chosen</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug (URL-friendly name)</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={currentBanner.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                {editMode ? (
                  <>
                    <Save size={16} />
                    Update Banner
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Banner
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="admin-section">
            <h2>Existing Banners</h2>

            {loading ? (
              <div className="loading-spinner"></div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="banner-list">
                {banners.length === 0 ? (
                  <p className="no-banners">No banners found. Create your first banner above.</p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((banner) => (
                        <tr key={banner._id}>
                          <td>{banner.title}</td>
                          <td className="content-cell">{banner.content}</td>
                          <td>
                            {banner.image && (
                              <img
                                src={banner.image.startsWith("http") ? banner.image : `${url}/images/${banner.image}`}
                                alt={banner.title}
                                className="banner-thumbnail"
                              />
                            )}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="edit-button" onClick={() => handleEdit(banner)}>
                                <Edit size={16} />
                              </button>
                              <button className="delete-button" onClick={() => handleDelete(banner._id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

