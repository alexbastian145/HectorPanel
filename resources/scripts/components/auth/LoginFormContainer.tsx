import React, { forwardRef } from 'react';
import { Form } from 'formik';
import { useTranslation } from 'react-i18next';
import FlashMessageRender from '@/components/FlashMessageRender';
import Footer from '@/reviactyl/ui/Footer';
import { ExtensionSlot } from '@/extensions/ExtensionSlot';
import NavbarLanguageSwitcher from '@/reviactyl/ui/NavbarLanguageSwitcher';
import AuthLogo from '@/components/auth/split/AuthLogo';
import FloatingPaths from '@/components/auth/split/FloatingPaths';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
    subtitle?: string;
};

export default forwardRef<HTMLFormElement, Props>(({ title, subtitle, ...props }, ref) => {
    const { t } = useTranslation('auth');

    return (
        <main
            style={{ '--color-primary': '147 64 246' } as React.CSSProperties}
            className='relative min-h-screen w-full overflow-hidden bg-gray-950 text-gray-200 lg:grid lg:grid-cols-2'
        >
            <section className='relative hidden h-full flex-col border-r border-gray-800 bg-gray-900/40 p-10 lg:flex'>
                <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-gray-950' />
                <AuthLogo className='relative z-10 mr-auto' />
                <div className='z-10 mt-auto'>
                    <blockquote className='max-w-lg space-y-2'>
                        <p className='text-xl leading-relaxed text-gray-100'>{t('brand.tagline')}</p>
                        <footer className='font-mono text-sm font-semibold text-gray-400'>{t('brand.name')}</footer>
                    </blockquote>
                </div>
                <FloatingPaths />
            </section>

            <section className='relative flex min-h-screen flex-col justify-center px-6 py-16 lg:px-10'>
                <div className='absolute top-5 right-5'>
                    <NavbarLanguageSwitcher />
                </div>

                <ExtensionSlot name={'auth:form:above'} />
                <Form {...props} ref={ref}>
                    <div className='mx-auto w-full max-w-sm space-y-4'>
                        <AuthLogo className='lg:hidden' />
                        {(title || subtitle) && (
                            <div className='flex flex-col space-y-1'>
                                {title && <h1 className='text-2xl font-bold tracking-wide text-gray-50'>{title}</h1>}
                                {subtitle && <p className='text-base text-gray-400'>{subtitle}</p>}
                            </div>
                        )}
                        <FlashMessageRender />
                        <ExtensionSlot name={'auth:card:before'} />
                        {props.children}
                        <ExtensionSlot name={'auth:form:after'} />
                    </div>
                </Form>
                <ExtensionSlot name={'auth:form:below'} />
                <Footer />
            </section>
        </main>
    );
});
