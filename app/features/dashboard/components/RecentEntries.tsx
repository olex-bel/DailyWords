
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/date";
import type { RecentEntry } from "~/services/entryService";

type RecentEntriesProps = {
    entries: RecentEntry[];
}

export default function RecentEntries({ entries }: RecentEntriesProps) {
    const { t } = useTranslation();

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
                    {t('dashboard.lastAddedWords')}
                </h3>
            </div>
            
            <div className="space-y-2">
                {entries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-sky-200 transition-colors cursor-default">
                        <span className="font-bold text-slate-700">{entry.content}</span>
                        <span className="text-xs text-slate-400 italic">{entry.created_at && formatDate(entry.created_at)}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}