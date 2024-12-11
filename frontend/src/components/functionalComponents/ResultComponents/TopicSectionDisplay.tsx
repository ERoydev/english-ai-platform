import Header from "../../common/shared/Header/Header";


export default function TopicSectionDisplay({
    headerText,
    children
}: {
    headerText: string,
    children: React.ReactNode
}) {
    return(
        <div className='bg-gray-100 border border-gray-300 px-10 py-20 mb-20 rounded-2xl'>
            <Header title={headerText} size="text-3xl" customClass="mb-8 font-extrabold text-slate-800 text-center" />

            <div className='flex justify-between max-lg:flex-col max-lg:gap-5 w-full'>
                {children}
            </div>
      </div>
    );
}