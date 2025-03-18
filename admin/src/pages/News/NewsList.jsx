"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "../../hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Pencil, Plus, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"

const NewsList = ({ url }) => {
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const navigate = useNavigate()

    const fetchNewsList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${url}/api/news`)
            if (response.data) {
                setNewsList(response.data)
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch news items",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch news items",
            })
        } finally {
            setLoading(false)
        }
    }

    const deleteNews = async (newsId) => {
        try {
            const response = await axios.delete(`${url}/api/news/${newsId}`)
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "News item deleted successfully",
                })
                fetchNewsList()
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete news item",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete news item",
            })
        }
    }

    useEffect(() => {
        fetchNewsList()
    }, [])

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy")
        } catch (error) {
            return "Invalid date"
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>News Management</CardTitle>
                <Button onClick={() => navigate("/news/add")} className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add News
                </Button>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : newsList.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No news items found. Add some news first.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className="w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsList.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>{item.author}</TableCell>
                                        <TableCell>{formatDate(item.publishedDate)}</TableCell>
                                        <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => navigate(`/news/edit/${item._id}`)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(item._id)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the news item.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => deleteNews(deleteId)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default NewsList

