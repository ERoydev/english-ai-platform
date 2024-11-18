import Header from "../../common/shared/Header/Header";


export default function TopicSectionDisplay({
    headerText,
    children
}: {
    headerText: string,
    children: React.ReactNode
}) {
    return(
        <div className='bg-gray-200 px-14 py-14 mb-20 rounded-xl'>
            <Header title={headerText} size="text-2xl" customClass="mb-8 font-bold" />

            <div className='flex gap-28'>
                {children}
            </div>
      </div>
    );
}