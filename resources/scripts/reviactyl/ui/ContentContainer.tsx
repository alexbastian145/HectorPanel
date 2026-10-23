import React from 'react';
import { ApplicationStore } from '@/state';
import { useStoreState } from 'easy-peasy';
import { useSidebarCollapsed } from '@/reviactyl/ui/useSidebarCollapsed';

export const ContentContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const layoutType = useStoreState((state: ApplicationStore) => state.designify.data!.layoutType);
    const [collapsed] = useSidebarCollapsed();
    const offset = layoutType === 'modern' && collapsed ? 'lg:ps-20' : 'lg:ps-62.5';

    return (
        <div
            className={`flex pe-1 transition-[padding] duration-300 ease-in-out ${offset} ${layoutType !== 'modern' ? 'pt-16' : ''}`}
        >
            {children}
        </div>
    );
};
