import React, { Suspense } from 'react';
import ErrorBoundary from '@/reviactyl/elements/ErrorBoundary';
import { InfinityLoop } from '@/components/loading-ui/infinity-loop';

export type SpinnerSize = 'small' | 'base' | 'large';

interface Props {
    size?: SpinnerSize;
    centered?: boolean;
    isBlue?: boolean;
    /** Cover the whole viewport with the auth-themed backdrop (use only for page-level loading). */
    fullScreen?: boolean;
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

const LoadingIndicator = () => (
    <div className='relative z-10 flex flex-col items-center justify-center gap-4'>
        <InfinityLoop className='size-24 text-violet-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]' />
        <p className='text-[0.7rem] font-medium uppercase tracking-[0.38em] text-violet-200/80'>Loading</p>
    </div>
);

const SpinnerFunc = ({ centered, className, fullScreen, ...props }: Props) => {
    if (centered && props.size === 'large') {
        if (fullScreen) {
            return (
                <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040914] text-slate-200'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.12),_transparent_40%),linear-gradient(180deg,_rgba(7,11,26,0.96),_rgba(3,6,16,0.98))]' />
                    <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,20,0.0),rgba(4,9,20,0.15),rgba(4,9,20,0.9))]' />
                    <LoadingIndicator />
                </main>
            );
        }

        // Inline: no backdrop, the page background already provides the theme.
        return (
            <div className='flex min-h-[60vh] w-full items-center justify-center'>
                <LoadingIndicator />
            </div>
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
