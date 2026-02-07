
type RecentEntriesSkeletonProps = {
    count: number;
}

export default function RecentEntriesSkeleton({ count }: RecentEntriesSkeletonProps) {
    const entries = [...Array(count).keys()]

    return (
        <section className="space-y-4 animate-pulse">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
                </h3>
            </div>
            
            <div className="space-y-2">
                {entries.map((index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-sky-200 transition-colors cursor-default">
                        <div className="h-5 w-32 bg-slate-200 rounded-lg"></div>
                        <div className="h-3 w-20 bg-slate-100 rounded-md"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}