"use client"
import { assets } from "../../assets/assets"
import { ModeToggle } from "../mode-toggle"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          {/*<img className="h-8 md:h-10" src={assets.logo || "/placeholder.svg"} alt="Food-Del Logo" />*/}
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Avatar className="h-8 w-8">
            <AvatarImage src={assets.profile_image} alt="Profile" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Navbar

