
import { useTranslation } from "react-i18next";
import { RiRefreshLine, RiErrorWarningLine } from "react-icons/ri";
import Button from "~/shared/components/ui/Button";
import ViewCenter from "~/shared/components/layout/ViewCenter";
import Surface from "~/shared/components/ui/Surface";

export default function LoadError() {
    const { t } = useTranslation();

    return (
        <ViewCenter>
            <Surface className="p-6">
                <div className="flex flex-col items-center h-full gap-6">
                    <div className="mb-4 p-4 bg-orange-50 rounded-full">
                        <RiErrorWarningLine className="text-5xl text-orange-500" />
                    </div>

                    <p className="text-lg">{t('learning.loadError.message')}</p>

                    <Button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-primary hover:brightness-90"
                        icon={<RiRefreshLine />}
                    >
                        {t('learning.loadError.retryButton')}
                    </Button>
                </div>
            </Surface>
        </ViewCenter>
    );
}
