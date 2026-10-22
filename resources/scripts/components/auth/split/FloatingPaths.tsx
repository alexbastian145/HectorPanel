import type { CSSProperties } from 'react';

const PATH_COUNT = 36;

export function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: PATH_COUNT }, (_, i) => ({
        id: i,
        d: `M-${420 - i * 5 * position} -${220 + i * 6}C-${420 - i * 5 * position} -${220 + i * 6} -${
            300 - i * 5 * position
        } ${220 - i * 6} ${130 - i * 5 * position} ${360 - i * 6}C${700 - i * 5 * position} ${500 - i * 6} ${
            760 - i * 5 * position
        } ${900 - i * 6} ${760 - i * 5 * position} ${900 - i * 6}`,
        width: 0.55 + i * 0.04,
        opacity: (0.05 + i * 0.015).toFixed(3),
        duration: 22 + (i % 6) * 2,
        delay: -(i * 0.75),
    }));

    return (
        <div className='pointer-events-none absolute inset-0 isolate contain-strict overflow-visible'>
            <style>{`
                @keyframes floating-path {
                    0% { stroke-dashoffset: 1; stroke-opacity: 0; }
                    15%, 85% { stroke-opacity: var(--stroke-opacity); }
                    100% { stroke-dashoffset: -1; stroke-opacity: 0; }
                }
            `}</style>

            <svg
                className='h-[118%] w-[118%] -translate-x-[8%] -translate-y-[4%] text-violet-300/90'
                fill='none'
                viewBox='0 0 820 420'
                aria-hidden='true'
            >
                {paths.map((path) => (
                    <path
                        key={path.id}
                        d={path.d}
                        pathLength={1}
                        stroke='currentColor'
                        strokeDasharray='1 1'
                        strokeOpacity={path.opacity}
                        strokeWidth={path.width}
                        className='motion-safe:animate-[floating-path_var(--duration)_linear_infinite]'
                        style={
                            {
                                '--duration': `${path.duration}s`,
                                '--stroke-opacity': path.opacity,
                                animationDelay: `${path.delay}s`,
                            } as CSSProperties
                        }
                    />
                ))}
            </svg>
        </div>
    );
}

export default function FloatingPathsRoot() {
    return (
        <>
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </>
    );
}
