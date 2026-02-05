import { useTranslation } from "react-i18next";
import { RiCheckboxFill } from "react-icons/ri";
import LinkButton from "~/shared/components/ui/LinkButton";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import Surface from "~/shared/components/ui/Surface";

export default function NoWords() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <Surface className="flex flex-col text-center items-center justify-center gap-6 p-6">
                <div className="mb-2 relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-50" />
                    <RiCheckboxFill className="text-7xl text-green-500 relative animate-zoom-in duration-500" />
                </div>
                <h2 className="text-2xl font-extrabold">
                    {t('learning.noWords.title')}
                </h2>

                <p>
                    {t('learning.noWords.message')}
                </p>

                <LinkButton to="/sets" className="px-6 py-3 bg-primary text-white">
                    {t('learning.noWords.backAction')}
                </LinkButton>
            </Surface>
        </ViewCenter>
    );
}