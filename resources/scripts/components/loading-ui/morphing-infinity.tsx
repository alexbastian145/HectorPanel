import type { CSSProperties } from 'react';

interface MorphingInfinityProps {
    className?: string;
    size?: number;
}

export function MorphingInfinity({ className = '', size = 120 }: MorphingInfinityProps) {
    const pathA =
        'M 24 58 C 24 36, 40 22, 60 22 C 85 22, 96 41, 100 58 C 104 75, 96 94, 60 94 C 40 94, 24 80, 24 58 C 24 36, 40 22, 60 22 C 85 22, 96 41, 100 58 C 104 75, 96 94, 60 94 C 40 94, 24 80, 24 58';
    const pathB =
        'M 18 60 C 18 38, 36 20, 58 20 C 82 20, 100 42, 100 60 C 100 78, 82 100, 58 100 C 36 100, 18 82, 18 60 C 18 38, 36 20, 58 20 C 82 20, 100 42, 100 60 C 100 78, 82 100, 58 100 C 36 100, 18 82, 18 60';
    const pathC =
        'M 22 60 C 22 34, 40 18, 60 18 C 90 18, 104 40, 104 60 C 104 80, 90 102, 60 102 C 40 102, 22 86, 22 60 C 22 34, 40 18, 60 18 C 90 18, 104 40, 104 60 C 104 80, 90 102, 60 102 C 40 102, 22 86, 22 60';

    const svgStyle = {
        width: size,
        height: size,
        '--morph-duration': '2.2s',
    } as CSSProperties;

    return (
        <svg
            viewBox='0 0 128 120'
            fill='none'
            aria-label='Loading'
            className={className}
            style={svgStyle}
        >
            <path
                d={pathA}
                stroke='currentColor'
                strokeWidth='4.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                pathLength='1'
                style={{ filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.75))' }}
            >
                <animate
                    attributeName='d'
                    dur='2.2s'
                    repeatCount='indefinite'
                    values={`${pathA};${pathB};${pathC};${pathA}`}
                />
                <animate
                    attributeName='stroke-width'
                    dur='2.2s'
                    repeatCount='indefinite'
                    values='4.4;4;4.4;4.4'
                />
            </path>
        </svg>
    );
}

export function MorphingInfinityLoadingScreen() {
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
