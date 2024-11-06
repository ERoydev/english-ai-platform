export default function ScoreItem({
    title,
    main_text,
    info_text,
    description,
    percentage
}: {
    title: string;
    main_text: string;
    description: string;
    info_text?: string;
    percentage?: boolean;
}) {
    return(
        <div className='flex flex-col gap-1'>
            <h1 className='text-sm font-bold text-gray-500'>{title}</h1>
            <p className='text-2xl font-bold'>{main_text}{percentage && '%'} <span className='text-sm'>{info_text}</span></p>
            <p>{description}</p>
        </div>
    );
}