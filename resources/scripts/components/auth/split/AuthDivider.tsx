export default function AuthDivider({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative flex items-center py-1'>
            <div className='grow border-t border-gray-800' />
            <span className='mx-4 shrink text-xs text-gray-400'>{children}</span>
            <div className='grow border-t border-gray-800' />
        </div>
    );
}
