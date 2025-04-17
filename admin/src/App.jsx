"use client"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import { Routes, Route } from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import NewsList from "./pages/News/NewsList"
import NewsForm from "./pages/News/NewsForm"
import { Toaster } from "./components/ui/toaster"
import { ToastProvider } from "./components/ui/use-toast"
import { useMediaQuery } from "./hooks/use-media-query"
import { useState } from "react"

const App = () => {
  const url = "https://capitalianceclub.com"
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  return (
      <ThemeProvider defaultTheme="dark" storageKey="food-del-theme">
        <ToastProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex">
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <main className="flex-1 p-4 md:p-6 pt-4">
                <Routes>
                  <Route path="/add" element={<Add url={url} />} />
                  <Route path="/list" element={<List url={url} />} />
                  <Route path="/orders" element={<Orders url={url} />} />
                  <Route path="/news" element={<NewsList url={url} />} />
                  <Route path="/news/add" element={<NewsForm url={url} />} />
                  <Route path="/news/edit/:id" element={<NewsForm url={url} />} />
                  <Route path="/" element={<Add url={url} />} />
                </Routes>
              </main>
            </div>
            <Toaster />
          </div>
        </ToastProvider>
      </ThemeProvider>
  )
}

export default App

