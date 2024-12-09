

export default function SuccessDisplay({
    children,
    isSended,
    text,
}: {
    children?: React.ReactNode,
    isSended: boolean,
    text: string,
}) {
    return(
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-xl:text-sm">
            {isSended ? (
                <div className="flex items-center gap-2 animate-bounce">
                    <svg className="w-7 h-7 max-lg:w-5 max-lg:h-5 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
                    <h1 className='text-green-600 font-semibold text-md max-lg:text-xs'>
                        {text}
                    </h1>
                </div>
            ) : (
                children
            )}
        </div>
    );
}