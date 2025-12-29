"use client"

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize

}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-black text-white hover:bg-neutral-800',
    secondary: 'bg-neutral-200 text-black hover:bg-neutral-300',
    ghost: 'bg-transparent hover:bg-neutral-100',
}

export default ({ variant = 'primary', size = 'md', onClick, className, ...props }: ButtonProps) => {
    return <button onClick={onClick} className={[
        variantClasses[variant],
        sizeClasses[size],
        className].filter(Boolean).join(' ')} {...props} />
}