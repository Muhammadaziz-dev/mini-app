"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "../../hooks/use-toast"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Upload } from "lucide-react"

const Add = ({ url }) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  })
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setData((data) => ({ ...data, category: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", Number(data.price))
      formData.append("category", data.category)
      formData.append("image", image)

      const response = await axios.post(`${url}api/food/add`, formData)

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        })
        setImage(false)
        toast({
          title: "Success",
          description: response.data.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.data.message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <div className="flex items-center justify-center">
              <Label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md hover:bg-accent transition-colors"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">Click to upload image</span>
                  </div>
                )}
              </Label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className="hidden" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Product Category</Label>
              <Select value={data.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salad">Salad</SelectItem>
                  <SelectItem value="Rolls">Rolls</SelectItem>
                  <SelectItem value="Deserts">Deserts</SelectItem>
                  <SelectItem value="Sandwich">Sandwich</SelectItem>
                  <SelectItem value="Cake">Cake</SelectItem>
                  <SelectItem value="Pure Veg">Pure Veg</SelectItem>
                  <SelectItem value="Pasta">Pasta</SelectItem>
                  <SelectItem value="Noodles">Noodles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Product Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={data.price}
                onChange={onChangeHandler}
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Add

