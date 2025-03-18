"use client"

import { useContext } from "react"
import { ToastContext } from "./use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"

export function Toaster() {
    const { toasts, removeToast } = useContext(ToastContext)

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, variant }) => (
                <Toast key={id} variant={variant} onOpenChange={() => removeToast(id)}>
                    <div className="grid gap-1">
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                    </div>
                    <ToastClose />
                </Toast>
            ))}
            <ToastViewport />
        </ToastProvider>
    )
}

