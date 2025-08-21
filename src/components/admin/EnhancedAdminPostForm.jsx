"use client"

import { addPost } from "@/library/actions"
import { useActionState, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Image, Link, Type, AlignLeft, Eye, EyeOff, RefreshCw } from "lucide-react"
import NextImage from "next/image"

const EnhancedAdminPostForm = ({ userId }) => {
    const [state, formAction] = useActionState(addPost, undefined)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showImagePreview, setShowImagePreview] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [autoSlug, setAutoSlug] = useState(true)

    // Auto-generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-')
    }

    const handleTitleChange = (e) => {
        const title = e.target.value
        if (autoSlug) {
            const slug = generateSlug(title)
            e.target.form.slug.value = slug
        }
    }

    const handleImageChange = (e) => {
        const url = e.target.value
        setImageUrl(url)
        if (url) {
            setShowImagePreview(true)
        }
    }

    const toggleAutoSlug = () => {
        setAutoSlug(!autoSlug)
        if (!autoSlug && imageUrl) {
            const title = document.getElementById('title').value
            const slug = generateSlug(title)
            document.getElementById('slug').value = slug
        }
    }

    const handleSubmit = async (formData) => {
        setIsSubmitting(true)
        await formAction(formData)
        setIsSubmitting(false)
        
        // Reset form on success
        if (state?.success) {
            document.getElementById('post-form').reset()
            setImageUrl("")
            setShowImagePreview(false)
        }
    }

    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border border-border">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                    Create New Post
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Add a new blog post to your website
                </p>
            </div>

            <form id="post-form" className="my-6" action={handleSubmit}>
                <input type="hidden" name="userId" value={userId} />
                
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="title" className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        Post Title
                    </Label>
                    <Input 
                        id="title" 
                        name="title"
                        placeholder="Enter post title" 
                        type="text"
                        required
                        onChange={handleTitleChange}
                        className="bg-background border-border focus:border-primary"
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="slug" className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            URL Slug
                        </Label>
                        <button
                            type="button"
                            onClick={toggleAutoSlug}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <RefreshCw className="h-3 w-3" />
                            {autoSlug ? 'Auto' : 'Manual'}
                        </button>
                    </div>
                    <Input 
                        id="slug" 
                        name="slug"
                        placeholder="post-url-slug" 
                        type="text"
                        required
                        disabled={autoSlug}
                        className={cn(
                            "bg-background border-border focus:border-primary",
                            autoSlug && "opacity-60 cursor-not-allowed"
                        )}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="img" className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Featured Image URL
                        </Label>
                        {imageUrl && (
                            <button
                                type="button"
                                onClick={() => setShowImagePreview(!showImagePreview)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showImagePreview ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                {showImagePreview ? 'Hide' : 'Preview'}
                            </button>
                        )}
                    </div>
                    <Input 
                        id="img" 
                        name="img"
                        placeholder="https://example.com/image.jpg" 
                        type="url"
                        value={imageUrl}
                        onChange={handleImageChange}
                        className="bg-background border-border focus:border-primary"
                    />
                    
                    {/* Image Preview */}
                    {showImagePreview && imageUrl && (
                        <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-border">
                            <NextImage 
                                src={imageUrl} 
                                alt="Preview" 
                                width={400}
                                height={128}
                                className="w-full h-32 object-cover rounded-md"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'block'
                                }}
                            />
                            <div className="hidden text-center text-sm text-muted-foreground py-8">
                                Invalid image URL
                            </div>
                        </div>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-6">
                    <Label htmlFor="description" className="flex items-center gap-2">
                        <AlignLeft className="h-4 w-4" />
                        Post Description
                        <span className="text-xs text-muted-foreground">(Max 160 characters)</span>
                    </Label>
                    <textarea 
                        id="description" 
                        name="description"
                        placeholder="Enter a brief description of your post..."
                        rows={4}
                        maxLength={160}
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {document.getElementById('description')?.value?.length || 0}/160
                    </div>
                </LabelInputContainer>

                <button
                    className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Creating Post...
                        </span>
                    ) : (
                        <>
                            Create Post &rarr;
                            <BottomGradient />
                        </>
                    )}
                </button>

                {/* Status Messages */}
                {state && (
                    <div className={`mt-4 p-3 rounded-md text-sm ${
                        state.error 
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' 
                            : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    }`}>
                        {state.error || state.success}
                    </div>
                )}
            </form>
        </div>
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    )
}

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    )
}

export default EnhancedAdminPostForm
