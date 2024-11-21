/*
    Component to display error message from property containing list with many errors inside
*/


export default function ErrorDisplay({
    errorProperty,
}:{
    errorProperty: string[]
}) {
    return(
        <div>
            {errorProperty && errorProperty.length > 0 && (
                    <ul>
                        {errorProperty.map((err, index) => (
                            <li key={index} className="error-text pt-1 py-[2px]">
                                {err}
                            </li>
                        ))}
                    </ul>
            )}
        </div>
    );
}