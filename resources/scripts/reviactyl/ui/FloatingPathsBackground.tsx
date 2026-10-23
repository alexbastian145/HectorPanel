import React, { useMemo } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface FloatingPathsBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

const PATH_COUNT = 36;

const PathsLayer = ({ position }: { position: number }) => {
    // Generated once so re-renders of the page don't restart the animations.
    const paths = useMemo(
        () =>
            Array.from({ length: PATH_COUNT }, (_, i) => ({
                id: i,
                d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                    380 - i * 5 * position
                } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                    152 - i * 5 * position
                } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                    684 - i * 5 * position
                } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
                width: 0.5 + i * 0.03,
                // Same opacity ramp as the login page paths.
                opacity: 0.05 + i * 0.015,
                duration: 20 + Math.random() * 10,
            })),
        [position],
    );

    return (
        <svg
            className='absolute inset-0 h-full w-full text-violet-300/90'
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
                    strokeOpacity={path.opacity}
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
    );
};

/**
 * Animated "floating paths" backdrop for the dashboard, styled to match the login page (navy and violet backdrop, violet paths, two
 * mirrored sets).
 *
 * The paths are drawn on a fixed, non-interactive layer that covers the viewport, and the children are
 * rendered above it. Based on the Bundui FloatingPaths background component.
 */
export const FloatingPathsBackground = ({ className, children }: FloatingPathsBackgroundProps) => {
    return (
        <div className={classNames('relative isolate w-full', className)}>
            <div aria-hidden className='pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040914]'>
                {/* Same navy + violet backdrop as the login page. */}
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.12),_transparent_40%),radial-gradient(circle_at_top,_rgba(168,85,247,0.09),_transparent_28%),linear-gradient(180deg,_#050b16_0%,_#040914_100%)]' />
                <PathsLayer position={1} />
                <PathsLayer position={-1} />
            </div>
            <div className='relative z-10'>{children}</div>
        </div>
    );
};

export default FloatingPathsBackground;
