"use client"
import { NavLink } from "react-router-dom"
import { cn } from "../../lib/utils"
import { PlusCircle, ListOrdered, Package, Newspaper } from "lucide-react"

const Sidebar = ({ open, setOpen }) => {
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }

  return (
      <>
        {/* Backdrop for mobile */}
        {open && (
            <div
                className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden"
                onClick={() => setOpen(false)}
            />
        )}

        <div
            className={cn(
                "fixed inset-y-0 left-0 z-20 w-64 border-r bg-background transition-transform duration-300 md:relative md:translate-x-0",
                open ? "translate-x-0" : "-translate-x-full",
            )}
        >
          <div className="flex flex-col gap-4 py-6">
            <div className="px-4 py-2 font-semibold text-lg hidden md:block">Dashboard</div>
            <nav className="space-y-1 px-2">
              <NavLink
                  to="/add"
                  className={({ isActive }) =>
                      cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                      )
                  }
                  onClick={closeSidebarOnMobile}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Items</span>
              </NavLink>

              <NavLink
                  to="/list"
                  className={({ isActive }) =>
                      cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                      )
                  }
                  onClick={closeSidebarOnMobile}
              >
                <ListOrdered className="h-5 w-5" />
                <span>List Items</span>
              </NavLink>

              <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                      cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                      )
                  }
                  onClick={closeSidebarOnMobile}
              >
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </NavLink>

              <NavLink
                  to="/news"
                  className={({ isActive }) =>
                      cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent hover:text-accent-foreground",
                      )
                  }
                  onClick={closeSidebarOnMobile}
              >
                <Newspaper className="h-5 w-5" />
                <span>News</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </>
  )
}

export default Sidebar

