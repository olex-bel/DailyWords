import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import type { ReactNode } from "react";

type ToastType = 'error' | 'success';

type ToastProps = {
    children: ReactNode;
    onClose: () => void;
    type?: ToastType;
};

export default function Toast({ children, onClose, type = 'error' }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600';

    return (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between min-w-[280px]`}>
            <div className="flex-grow text-sm font-medium">
                {children}
            </div>
            <button 
                onClick={onClose}
                className="ml-3 p-1 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Close"
            >
                <RiCloseFill size={18} />
            </button>
        </div>
    );
}
