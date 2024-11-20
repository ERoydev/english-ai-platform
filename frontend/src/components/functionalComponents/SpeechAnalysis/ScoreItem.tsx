export default function ScoreItem({
    title,
    main_text,
    info_text,
    description,
    percentage
}: {
    title: string;
    main_text: string;
    description?: string;
    info_text?: string;
    percentage?: boolean;
}) {
    return(
        <div className='flex flex-col gap-1 px-2'>
            <h1 className='text-base font-bold text-gray-500 max-xl:text-sm'>{title}</h1>
            <p className='text-3xl font-bold max-xl:text-sm'>{main_text}{percentage && '%'} <span className='text-sm max-lg:text-xs'>{info_text}</span></p>
            <p className="max-xl:text-xs font-light text-sm">{description}</p>
        </div>
    );
}