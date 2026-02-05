
type ViewCenterProps = {
    children: React.ReactNode;
    className?: string;
}

export default function ViewCenter({ className, children }: ViewCenterProps) {
    return (
        <div className={`h-full flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
}
