import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export default function AuthLogo({ className }: { className?: string }) {
    const { t } = useTranslation('auth');
    const name = t('brand.name');

    return (
        <div className={classNames('flex items-center gap-3', className)}>
            <img src='/reviactyl/hector-cloud-logo.png' alt={name} className='size-10 rounded-xl' />
            <span className='text-xl font-semibold text-gray-50'>{name}</span>
        </div>
    );
}
