import React, { useMemo } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface FloatingPathsBackgroundProps {
    position?: number;
    className?: string;
    children?: React.ReactNode;
}

/**
 * Animated "floating paths" backdrop.
 *
 * The paths are drawn on a fixed, non-interactive layer that covers the viewport, and the children are
 * rendered above it. Based on the Bundui FloatingPaths background component.
 */
export const FloatingPathsBackground = ({ position = 1, className, children }: FloatingPathsBackgroundProps) => {
    // Durations are generated once so re-renders of the page don't restart the animations.
    const paths = useMemo(
        () =>
            Array.from({ length: 36 }, (_, i) => ({
                id: i,
                d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                    380 - i * 5 * position
                } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                    152 - i * 5 * position
                } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                    684 - i * 5 * position
                } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
                width: 0.5 + i * 0.03,
                duration: 20 + Math.random() * 10,
            })),
        [position],
    );

    return (
        <div className={classNames('relative isolate w-full', className)}>
            <div aria-hidden className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
                <svg
                    className='h-full w-full text-slate-950 dark:text-white'
                    viewBox='0 0 696 316'
                    preserveAspectRatio='xMidYMid slice'
                    fill='none'
                >
                    {paths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke='currentColor'
                            strokeWidth={path.width}
                            strokeOpacity={0.1 + path.id * 0.03}
                            initial={{ pathLength: 0.3, opacity: 0.6 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0.3, 0.6, 0.3],
                                pathOffset: [0, 1, 0],
                            }}
                            transition={{
                                duration: path.duration,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </svg>
            </div>
            <div className='relative z-10'>{children}</div>
        </div>
    );
};

export default FloatingPathsBackground;
