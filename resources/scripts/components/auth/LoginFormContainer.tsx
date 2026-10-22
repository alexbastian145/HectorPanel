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
            style={{
                '--color-primary': '168 85 247',
                '--color-secondary': '139 92 246',
                '--color-muted-text': '148 163 184',
            } as React.CSSProperties}
            className='relative min-h-screen w-full overflow-hidden bg-[#040914] text-slate-200 lg:grid lg:grid-cols-[1.2fr_0.8fr]'
        >
            <section className='relative hidden h-full flex-col border-r border-violet-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.12),_transparent_40%),linear-gradient(180deg,_rgba(7,11,26,0.96),_rgba(3,6,16,0.98))] p-10 lg:flex'>
                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,20,0.0),rgba(4,9,20,0.15),rgba(4,9,20,0.9))]' />
                <AuthLogo className='relative z-10 mr-auto' />
                <div className='z-10 mt-auto'>
                    <blockquote className='max-w-lg space-y-2'>
                        <p className='text-xl leading-relaxed text-slate-100'>{t('brand.tagline')}</p>
                        <footer className='font-mono text-sm font-semibold text-violet-200/80'>{t('brand.name')}</footer>
                    </blockquote>
                </div>
                <FloatingPaths />
            </section>

            <section className='relative flex min-h-screen flex-col justify-center bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.09),_transparent_28%),linear-gradient(180deg,_#050b16_0%,_#040914_100%)] px-6 py-16 lg:px-10'>
                <div className='absolute top-5 right-5'>
                    <NavbarLanguageSwitcher />
                </div>

                <ExtensionSlot name={'auth:form:above'} />
                <Form {...props} ref={ref}>
                    <div className='mx-auto w-full max-w-sm space-y-4'>
                        <AuthLogo className='lg:hidden' />
                        {(title || subtitle) && (
                            <div className='flex flex-col space-y-1'>
                                {title && <h1 className='text-2xl font-bold tracking-wide text-white'>{title}</h1>}
                                {subtitle && <p className='text-base text-slate-300'>{subtitle}</p>}
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
