import { useStoreState } from 'easy-peasy';
import classNames from 'classnames';
import { ApplicationStore } from '@/state';

export default function AuthLogo({ className }: { className?: string }) {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);

    return (
        <div className={classNames('flex items-center gap-3', className)}>
            <img src='/reviactyl/hector-cloud-logo.png' alt={name} className='size-10 rounded-xl' />
            <span className='text-xl font-semibold text-gray-50'>{name}</span>
        </div>
    );
}
