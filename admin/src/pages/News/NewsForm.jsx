"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "../../hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";

const NewsForm = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    // Initialize form state including a field for the file
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        author: "",
        slug: "",
        imageFile: null, // holds the file, if selected
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditMode);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            fetchNewsItem();
        }
    }, [id]);

    const fetchNewsItem = async () => {
        try {
            const response = await axios.get(`${url}/api/news/${id}`);
            if (response.data) {
                setFormData({
                    title: response.data.title || "",
                    content: response.data.content || "",
                    image: response.data.image || "",
                    author: response.data.author || "",
                    slug: response.data.slug || "",
                    imageFile: null,
                });
                // Set preview to the current image URL if available
                setPreviewUrl(response.data.image);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch news item",
            });
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors when field is edited
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        // Auto-generate slug from title if slug is empty
        if (name === "title" && (!formData.slug || formData.slug === "")) {
            const slug = value.toLowerCase().replace(/[^\w\s]/gi, "").replace(/\s+/g, "-");
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    // Handle file input change and set a preview URL
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, imageFile: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.content.trim()) newErrors.content = "Content is required";
        if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.slug.trim()) newErrors.slug = "Slug is required";
        // Optionally, validate file type and size here if needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("content", formData.content);
            formPayload.append("author", formData.author);
            formPayload.append("slug", formData.slug);
            // Append file if available, else fallback to an image URL if provided
            if (formData.imageFile) {
                formPayload.append("imageFile", formData.imageFile);
            } else if (formData.image) {
                formPayload.append("image", formData.image);
            }

            let response;
            if (isEditMode) {
                response = await axios.put(`${url}/api/news/${id}`, formPayload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${url}/api/news`, formPayload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.status === 200 || response.status === 201) {
                toast({
                    title: "Success",
                    description: `News ${isEditMode ? "updated" : "created"} successfully`,
                });
                navigate("/news");
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `Failed to ${isEditMode ? "update" : "create"} news item`,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    error.response?.data?.message ||
                    `Failed to ${isEditMode ? "update" : "create"} news item`,
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <Card>
                <CardContent className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate("/news")} className="mr-2">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle>{isEditMode ? "Edit News" : "Add News"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter news title"
                            className={errors.title ? "border-destructive" : ""}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter news content"
                            rows={6}
                            className={errors.content ? "border-destructive" : ""}
                        />
                        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageFile">Image</Label>
                        <Input
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            onChange={handleFileChange}
                            className={errors.image ? "border-destructive" : ""}
                        />
                        {previewUrl && (
                            <img src={previewUrl} alt="Preview" className="mt-2 h-32 rounded" />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                className={errors.author ? "border-destructive" : ""}
                            />
                            {errors.author && <p className="text-sm text-destructive">{errors.author}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="Enter URL slug"
                                className={errors.slug ? "border-destructive" : ""}
                            />
                            {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                            <p className="text-xs text-muted-foreground">
                                This will be used in the URL: /news/{formData.slug || "example-slug"}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => navigate("/news")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditMode ? "Update" : "Create"} News
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewsForm;
