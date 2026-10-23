import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@/reviactyl/ui/Avatar';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import http from '@/api/http';
import SpinnerOverlay from '@/reviactyl/elements/SpinnerOverlay';
import Tooltip from '@/reviactyl/elements/tooltip/Tooltip';
import { FaArrowRightToBracket, FaEye } from 'react-icons/fa6';
import { LuPanelLeft } from 'react-icons/lu';
import { useSidebarCollapsed } from '@/reviactyl/ui/useSidebarCollapsed';
import { useSubuserPreview } from '@/context/SubuserPreviewContext';

interface SidebarProps {
    isOpen?: boolean;
    children?: React.ReactNode;
}

interface NavbarProps {
    children: React.ReactNode;
}

const NavbarContainer = ({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={`fixed top-(--subuser-preview-offset,0px) left-0 z-50 h-16 w-full transition duration-300 ${className}`}
    >
        {children}
    </div>
);

export const SideNavigation = ({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={`-mt-1 flex flex-col gap-1 pb-4 [&_.label]:mx-2 [&_.label]:flex [&_.label]:items-center [&_.label]:px-3 [&_.label]:pt-2 [&_.label]:pb-1 [&_.label]:text-sm [&_.label]:font-semibold [&_.label]:text-slate-400 [&_a]:mx-2 [&_a]:flex [&_a]:items-center [&_a]:rounded-ui [&_a]:px-5 [&_a]:py-2 [&_a]:text-sm [&_a]:font-medium [&_a]:text-slate-200 [&_a]:transition-colors [&_a:hover]:bg-violet-500/10 [&_a:focus]:bg-violet-500/10 [&_a:focus]:text-violet-300 [&_a.active]:bg-violet-500/15 [&_a.active]:text-violet-300 [&_a.active]:ring-1 [&_a.active]:ring-violet-500/20 ${className}`}
    >
        {children}
    </div>
);

export const SidebarModern = React.forwardRef<HTMLDivElement, SidebarProps>(({ children, isOpen = false }, ref) => {
    const { t } = useTranslation('dashboard/account');
    const { t: tUsers } = useTranslation('server/users');
    const { t: tAuth } = useTranslation('auth');
    const [collapsed, setCollapsed] = useSidebarCollapsed();
    const brandName = tAuth('brand.name');
    const nameFirst = useStoreState((state) => state.user.data?.name_first);
    const nameLast = useStoreState((state) => state.user.data?.name_last);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const adminAccess = useStoreState((state) => state.user.data!.adminAccess);
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const sidebarLogout = useStoreState((state) => state.designify.data?.sidebarLogout);
    const { session } = useSubuserPreview();

    const onLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            window.location.href = '/';
        });
    };

    return (
        <div
            ref={ref}
            className={`m-2 self-start flex-col rounded-ui border border-violet-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.16),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.10),_transparent_45%),linear-gradient(180deg,_#070b1a_0%,_#040914_100%)] text-slate-200 transition-[width] duration-300 ease-in-out ${
                collapsed ? 'w-56.25 lg:w-16' : 'w-56.25 2xl:w-64'
            } lg:fixed lg:top-(--subuser-preview-offset,0px) lg:left-0 lg:z-40 lg:flex lg:h-[calc(100dvh-15px-var(--subuser-preview-offset,0px))] lg:overflow-y-auto ${
                isOpen
                    ? 'fixed top-[calc(1rem+var(--subuser-preview-offset,0px))] left-0 z-40 flex h-[calc(100dvh-6rem-var(--subuser-preview-offset,0px))] overflow-y-auto'
                    : 'hidden'
            }`}
        >
            <SpinnerOverlay visible={isLoggingOut} />
            <div className='sticky top-0 z-10 border-b border-violet-500/20 bg-[#070b1a]/80 backdrop-blur'>
                <div
                    className={`flex items-center px-3 py-3 ${collapsed ? 'justify-between lg:justify-center lg:px-0' : 'justify-between'}`}
                >
                    {collapsed ? (
                        <>
                            <Link to='/' className='flex items-center gap-3 lg:hidden'>
                                <img
                                    src='/reviactyl/hector-cloud-logo.png'
                                    alt={brandName}
                                    className='size-9 shrink-0 rounded-xl'
                                />
                                <span className='truncate text-lg font-semibold text-slate-50'>{brandName}</span>
                            </Link>
                            <button
                                type='button'
                                onClick={() => setCollapsed(false)}
                                aria-label='Expand sidebar'
                                className='group/brand relative hidden size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl lg:flex'
                            >
                                <img
                                    src='/reviactyl/hector-cloud-logo.png'
                                    alt={brandName}
                                    className='size-9 rounded-xl transition-opacity duration-200 group-hover/brand:opacity-0'
                                />
                                <span className='absolute inset-0 flex items-center justify-center rounded-xl bg-violet-500/20 text-violet-200 opacity-0 transition-opacity duration-200 group-hover/brand:opacity-100'>
                                    <LuPanelLeft className='size-5' />
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/' className='flex min-w-0 items-center gap-3'>
                                <img
                                    src='/reviactyl/hector-cloud-logo.png'
                                    alt={brandName}
                                    className='size-9 shrink-0 rounded-xl'
                                />
                                <span className='truncate text-lg font-semibold text-slate-50'>{brandName}</span>
                            </Link>
                            <button
                                type='button'
                                onClick={() => setCollapsed(true)}
                                aria-label='Collapse sidebar'
                                className='hidden size-8 shrink-0 cursor-pointer items-center justify-center rounded-ui text-slate-400 transition-colors hover:bg-violet-500/15 hover:text-violet-200 lg:flex'
                            >
                                <LuPanelLeft className='size-5' />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className='flex flex-1 flex-col overflow-y-auto'>
                {children ? (
                    <SideNavigation
                        className={
                            collapsed
                                ? 'lg:[&_.label]:hidden lg:[&_a]:justify-center lg:[&_a]:px-0! lg:[&_a>span]:justify-center lg:[&_a>span]:text-[0px]! lg:[&_svg]:mr-0! lg:[&_svg]:size-5!'
                                : ''
                        }
                    >
                        {children}
                    </SideNavigation>
                ) : null}
            </div>

            <div
                className={`sticky bottom-0 z-10 border-t border-violet-500/20 bg-[#040914]/80 backdrop-blur p-3 ${collapsed ? 'lg:px-0' : ''}`}
            >
                {session ? (
                    <div className={`flex min-w-0 items-center gap-3 ${collapsed ? 'lg:justify-center' : ''}`}>
                        <span className='flex rounded-full items-center justify-center bg-amber-900/50 border-amber-800/50 h-10 w-10'>
                            <FaEye className='h-5 w-5 shrink-0 text-amber-400' />
                        </span>
                        <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
                            <p className='text-xs font-semibold text-gray-100'>{tUsers('preview.title')}</p>
                            <p className='truncate text-xs text-gray-400'>{session.subuserEmail}</p>
                        </div>
                    </div>
                ) : (
                    <div className={`flex items-center gap-3 ${collapsed ? 'lg:justify-center' : ''}`}>
                        <Link to='/account'>
                            <Avatar className='w-10' />
                        </Link>
                        <div className={`flex flex-col ${collapsed ? 'lg:hidden' : ''}`}>
                            <div className='flex items-center gap-x-1'>
                                <span className='text-xs tracking-widest uppercase text-slate-500'>
                                    {rootAdmin ? t('overview.administrator') : `${name} ${t('overview.user')}`}
                                </span>
                                {adminAccess && (
                                    // eslint-disable-next-line react/jsx-no-target-blank
                                    <a href={`/admin`} target={'_blank'} className='h-5 w-5 text-gray-400'>
                                        <ExternalLinkIcon />
                                    </a>
                                )}
                            </div>
                            <Link to='/account'>
                                <span className='text-sm font-semibold text-slate-300'>
                                    {nameFirst} {nameLast}
                                </span>
                            </Link>
                        </div>
                        {sidebarLogout && (
                            <div onClick={onLogout} className={collapsed ? 'lg:hidden' : ''}>
                                <Tooltip content={t('overview.logout')}>
                                    <FaArrowRightToBracket className='h-10 text-gray-600 hover:text-danger/80 cursor-pointer' />
                                </Tooltip>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export const NavbarModern = ({ children }: NavbarProps) => {
    const [blurred, setBlurred] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setBlurred(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        // intentionally kept hidden
        <NavbarContainer className={`${blurred ? 'shadow' : ''} hidden`}>
            <div className='w-full mt-1 flex items-center justify-between h-full px-4 sm:px-6 md:px-8 pr-2!'>
                <div className='flex items-center gap-4'></div>
                <div className='flex grow-0 shrink-0 items-center gap-3 order-last justify-end'>{children}</div>
            </div>
        </NavbarContainer>
    );
};
