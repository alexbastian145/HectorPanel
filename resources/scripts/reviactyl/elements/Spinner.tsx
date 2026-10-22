import React, { Suspense } from 'react';
import ErrorBoundary from '@/reviactyl/elements/ErrorBoundary';
import { MorphingInfinity } from '@/components/loading-ui/morphing-infinity';

export type SpinnerSize = 'small' | 'base' | 'large';

interface Props {
    size?: SpinnerSize;
    centered?: boolean;
    isBlue?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const SpinnerElement = ({ size = 'base', isBlue, className }: Pick<Props, 'size' | 'isBlue' | 'className'>) => (
    <div
        className={[
            'animate-spin rounded-full',
            size === 'small'
                ? 'h-4 w-4 border-2'
                : size === 'large'
                  ? 'h-16 w-16 border-[6px]'
                  : 'h-8 w-8 border-[3px]',
            isBlue ? 'border-blue-200/50 border-t-blue-600' : 'border-gray-200/50 border-t-gray-300',
            className,
        ]
            .filter(Boolean)
            .join(' ')}
        style={{
            animationTimingFunction: 'cubic-bezier(0.55, 0.25, 0.25, 0.7)',
        }}
    />
);

const SpinnerFunc = ({ centered, className, ...props }: Props) => {
    if (centered && props.size === 'large') {
        return (
            <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040914] text-slate-200'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.12),_transparent_40%),linear-gradient(180deg,_rgba(7,11,26,0.96),_rgba(3,6,16,0.98))]' />
                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,20,0.0),rgba(4,9,20,0.15),rgba(4,9,20,0.9))]' />

                <div className='relative z-10 flex flex-col items-center justify-center gap-5'>
                    <MorphingInfinity className='h-28 w-28 text-violet-300' size={112} />
                    <div className='text-center'>
                        <p className='text-[0.7rem] font-medium uppercase tracking-[0.38em] text-violet-200/80'>Loading</p>
                    </div>
                </div>
            </main>
        );
    }

    return centered ? (
        <div className={`flex items-center justify-center ${props.size === 'large' ? 'm-20' : 'm-6'}`}>
            <SpinnerElement {...props} className={className} />
        </div>
    ) : (
        <SpinnerElement {...props} className={className} />
    );
};

const SuspenseSpinner = ({ children, centered = true, size, ...props }: Props) => (
    <Suspense fallback={<SpinnerFunc centered={centered} size={size || 'large'} {...props} />}>
        <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
);

SuspenseSpinner.displayName = 'Spinner.Suspense';

const Spinner = Object.assign(SpinnerFunc, {
    displayName: 'Spinner',
    Size: {
        SMALL: 'small' as const,
        BASE: 'base' as const,
        LARGE: 'large' as const,
    },
    Suspense: SuspenseSpinner,
});

export default Spinner;
