
import Surface from "~/shared/components/ui/Surface";

type StatCardProps = {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description: string;
};

export default function StatCard({ label, value, description, color, icon }: StatCardProps) {
    return (
        <Surface className={`${color} border-none p-5 flex flex-col gap-1`}>
            <div className="flex justify-between items-start">
                <span className="text-2xl font-black text-slate-800">{value}</span>
                {icon}
            </div>
            <p className="font-bold text-slate-700 text-sm mt-1">{label}</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{description}</p>
        </Surface>
    );
}
