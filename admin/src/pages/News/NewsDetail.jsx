"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

const NewsDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL || "http://167.99.71.237:4000/"

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${API_URL}/api/news/${slug}`)
                setArticle(response.data)
                setError(null)
            } catch (err) {
                console.error("Error fetching article:", err)
                setError("Failed to load article. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchArticle()
        }
    }, [slug])

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
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <Link to="/news" className="inline-flex items-center text-primary hover:underline mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to News
                    </Link>

                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error || "Article not found"}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
                <Link to="/news" className="inline-flex items-center text-primary hover:underline mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to News
                </Link>

                <article>
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8">
                        <span>By {article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(article.publishedDate)}</span>
                    </div>

                    {article.image && (
                        <div className="mb-8">
                            <img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {article.content
                            .split("\n")
                            .map((paragraph, index) => (paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-4">Share this article</h3>
                        <div className="flex space-x-4">
                            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </button>
                            <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M18.42 6.94a.75.75 0 0 0-1.06-1.06l-6.48 6.48-3.24-3.24a.75.75 0 1 0-1.06 1.06l3.77 3.77a.75.75 0 0 0 1.06 0l7.01-7.01Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default NewsDetail

