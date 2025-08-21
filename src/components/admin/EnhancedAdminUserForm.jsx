"use client"

import { addUser } from "@/library/actions"
import { useState, useActionState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { User, Mail, Lock, Image, Shield, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import NextImage from "next/image"

const EnhancedAdminUserForm = () => {
    const [state, formAction] = useActionState(addUser, undefined)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [showImagePreview, setShowImagePreview] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    // Password strength checker
    const getPasswordStrength = (password) => {
        let score = 0
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
        
        score += checks.length ? 1 : 0
        score += checks.lowercase ? 1 : 0
        score += checks.uppercase ? 1 : 0
        score += checks.numbers ? 1 : 0
        score += checks.special ? 1 : 0
        
        if (score <= 2) return { level: 'weak', color: 'text-red-500', bg: 'bg-red-500/10' }
        if (score <= 3) return { level: 'fair', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
        if (score <= 4) return { level: 'good', color: 'text-blue-500', bg: 'bg-blue-500/10' }
        return { level: 'strong', color: 'text-green-500', bg: 'bg-green-500/10' }
    }

    const passwordStrength = getPasswordStrength(password)

    const handleImageChange = (e) => {
        const url = e.target.value
        setImageUrl(url)
        if (url) {
            setShowImagePreview(true)
        }
    }

    const handleSubmit = async (formData) => {
        setIsSubmitting(true)
        await formAction(formData)
        setIsSubmitting(false)
        
        // Reset form on success
        if (state?.success) {
            document.getElementById('user-form').reset()
            setPassword("")
            setImageUrl("")
            setShowImagePreview(false)
        }
    }

    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border border-border">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                    Create New User
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Add a new user to your system
                </p>
            </div>

            <form id="user-form" className="my-6" action={handleSubmit}>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer className="flex-1">
                        <Label htmlFor="username" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Username
                        </Label>
                        <Input 
                            id="username" 
                            name="username"
                            placeholder="johndoe" 
                            type="text"
                            required
                            minLength={3}
                            maxLength={20}
                            className="bg-background border-border focus:border-primary"
                        />
                        <div className="text-xs text-muted-foreground">
                            3-20 characters, letters and numbers only
                        </div>
                    </LabelInputContainer>
                </div>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                    </Label>
                    <Input 
                        id="email" 
                        name="email"
                        placeholder="john@example.com" 
                        type="email"
                        required
                        className="bg-background border-border focus:border-primary"
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                        </Label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <Input 
                        id="password" 
                        name="password"
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background border-border focus:border-primary"
                    />
                    
                    {/* Password Strength Indicator */}
                    {password && (
                        <div className={cn("mt-2 p-2 rounded-md text-xs", passwordStrength.bg)}>
                            <div className="flex items-center justify-between mb-1">
                                <span className={passwordStrength.color}>Password Strength: {passwordStrength.level}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "w-2 h-2 rounded-full",
                                                i <= (passwordStrength.level === 'weak' ? 2 : 
                                                      passwordStrength.level === 'fair' ? 3 : 
                                                      passwordStrength.level === 'good' ? 4 : 5)
                                                    ? passwordStrength.color.replace('text-', 'bg-')
                                                    : 'bg-muted'
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-muted-foreground">
                                {password.length < 6 && <span className="flex items-center gap-1"><XCircle className="h-3 w-3" />At least 6 characters</span>}
                                {password.length >= 6 && <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Minimum length met</span>}
                            </div>
                        </div>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="img" className="flex items-center gap-2">
                            <Image alt="Image" className="h-4 w-4" />
                            Profile Image URL
                        </Label>
                        {imageUrl && (
                            <button
                                type="button"
                                onClick={() => setShowImagePreview(!showImagePreview)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showImagePreview ? 'Hide' : 'Preview'}
                            </button>
                        )}
                    </div>
                    <Input 
                        id="img" 
                        name="img"
                        placeholder="https://example.com/avatar.jpg" 
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
                                height={96}
                                className="w-full h-24 object-cover rounded-md"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'block'
                                }}
                            />
                            <div className="hidden text-center text-sm text-muted-foreground py-6">
                                Invalid image URL
                            </div>
                        </div>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-6">
                    <Label htmlFor="isAdmin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        User Role
                    </Label>
                    <select 
                        id="isAdmin" 
                        name="isAdmin"
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="false">Regular User</option>
                        <option value="true">Administrator</option>
                    </select>
                    <div className="text-xs text-muted-foreground">
                        Administrators can access the admin dashboard
                    </div>
                </LabelInputContainer>

                <button
                    className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting || password.length < 6}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Creating User...
                        </span>
                    ) : (
                        <>
                            Create User &rarr;
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

export default EnhancedAdminUserForm
