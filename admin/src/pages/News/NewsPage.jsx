"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { format } from "date-fns"

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/news`)
        setNews(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to load news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()

    // Set up polling for updates every 30 seconds
    const intervalId = setInterval(fetchNews, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>

      {news.length === 0 ? (
        <p className="text-center text-gray-500">No news articles available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link key={item._id} to={`/news/${item.slug}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                {item.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">No image</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.publishedDate)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">By {item.author}</span>
                  </div>

                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{item.content}</p>

                  <div className="mt-4">
                    <span className="inline-block text-primary font-medium group-hover:underline">Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewsPage

