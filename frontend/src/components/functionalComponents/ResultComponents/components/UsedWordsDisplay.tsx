

export default function UsedWordsDisplay({
    classified_words
}) {

    return(
        <div className="border-window pl-12 h-[400px] max-lg:h-[500px] flex flex-col gap-5 justify-center">
            <h1 className="text-lg font-bold">Example for words</h1>
      
            {classified_words && (
                <table className="table-auto w-full text-left">
                    <thead className="">
                        <tr>
                            <th className="text-sm font-bold text-gray-500 px-4 py-2">
                                Level
                            </th>
                            <th className="text-sm font-bold text-gray-500 px-4 py-2">
                                Words
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(classified_words).map(([key, value]) => (
                            <tr
                                key={key}
                                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100"
                            >
                                <td className="px-4 py-2 text-md text-slate-800 max-xl:text-sm">
                                    {key}
                                </td>
                                <td className="px-4 py-2">
                                    {value.length > 0 ? (
                                        <ul className="flex gap-2 flex-wrap">
                                            {value.slice(0, 10).map((item, index) => (
                                                <li key={index} className="text-blue-500 max-xl:text-xs">
                                                    {item}
                                                    {index < value.slice(0, 10).length - 1 && ','}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            
            )}
        </div>
    )
}