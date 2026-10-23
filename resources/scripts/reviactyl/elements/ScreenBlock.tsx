import PageContentBlock from '@/reviactyl/elements/PageContentBlock';
import Card from '@/reviactyl/ui/Card';
import { FaCircleExclamation, FaCompass, FaHouse } from 'react-icons/fa6';

interface ScreenBlockProps {
    title: string;
    message: string;
    onBack?: () => void;
    onRetry?: () => void;
}

const NotFoundScreen = ({ message, onBack }: Pick<ScreenBlockProps, 'message' | 'onBack'>) => (
    <PageContentBlock>
        <div className='relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden'>
            <div className='flex max-w-xl flex-col items-center gap-6 px-4 text-center'>
                <h1 className='bg-gradient-to-b from-violet-200 to-violet-500/60 bg-clip-text text-9xl font-extrabold leading-none text-transparent [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)]'>
                    404
                </h1>
                <p className='-mt-8 text-base text-slate-300'>{message}</p>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                    <a
                        href='/'
                        className='inline-flex items-center gap-2 rounded-ui bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-400'
                    >
                        <FaHouse className='h-4 w-4' aria-hidden='true' />
                        Go Home
                    </a>
                    <button
                        type='button'
                        onClick={() => (onBack ? onBack() : window.history.back())}
                        className='inline-flex cursor-pointer items-center gap-2 rounded-ui border border-violet-500/30 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-violet-500/10'
                    >
                        <FaCompass className='h-4 w-4' aria-hidden='true' />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </PageContentBlock>
);

const ScreenBlock = ({ title, message, onBack }: ScreenBlockProps) => {
    if (title === '404') {
        return <NotFoundScreen message={message} onBack={onBack} />;
    }

    const Icon = FaCircleExclamation;

    return (
        <PageContentBlock>
            <div className='flex items-center justify-center'>
                <Card className='relative w-full max-w-2xl p-6 sm:p-10'>
                    <div className='flex flex-col items-center gap-5 pt-8 text-center sm:flex-row sm:gap-6 sm:pt-4 sm:text-left'>
                        <div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-800/60 text-gray-300'>
                            <Icon className='h-9 w-9' aria-hidden='true' />
                        </div>

                        <div>
                            <h2 className='text-2xl font-bold text-gray-100 sm:text-3xl'>{title}</h2>
                            <p className='mt-2 text-sm leading-6 text-gray-400 sm:text-base'>{message}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </PageContentBlock>
    );
};

interface ServerErrorProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    onBack?: () => void;
}

const ServerError = ({ title = 'Something went wrong', message, onRetry, onBack }: ServerErrorProps) => (
    <ScreenBlock title={title} message={message} onRetry={onRetry} onBack={onBack} />
);

interface NotFoundProps {
    title?: string;
    message?: string;
    onBack?: () => void;
}

const NotFound = ({
    title = '404',
    message = "The page you're looking for might have been moved or doesn't exist.",
    onBack,
}: NotFoundProps) => <ScreenBlock title={title} message={message} onBack={onBack} />;

export { ServerError, NotFound };
export default ScreenBlock;
