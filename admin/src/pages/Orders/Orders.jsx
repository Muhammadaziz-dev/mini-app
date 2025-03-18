"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "../../hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Package } from "lucide-react"
import { Badge } from "../../components/ui/badge"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch orders",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch orders",
      })
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      })
      if (response.data.success) {
        await fetchAllOrders()
        toast({
          title: "Success",
          description: "Order status updated successfully",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update order status",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      })
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
      case "Out for delivery":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
      case "Delivered":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No orders found.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4"
              >
                <div className="flex items-center justify-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} x {item.quantity}
                        {index !== order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium text-foreground">
                      {order.address.firstName} {order.address.lastName}
                    </div>
                    <div>
                      {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country},{" "}
                      {order.address.zipcode}
                    </div>
                    <div className="mt-1">Phone: {order.address.phone}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Items: {order.items.length}</Badge>
                    <Badge variant="outline">Total: ${order.amount}</Badge>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <Select defaultValue={order.status} onValueChange={(value) => statusHandler(value, order._id)}>
                    <SelectTrigger className={`w-[180px] ${getStatusColor(order.status)}`}>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food Processing">Food Processing</SelectItem>
                      <SelectItem value="Out for delivery">Out for delivery</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Orders

