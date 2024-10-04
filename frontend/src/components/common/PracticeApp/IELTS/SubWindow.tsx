
export default function SubWindow({
    img,
    text,
}:{
    img: string;
    text:string;
}) {
    return(
        <div className="mb-10 px-10 py-14 w-full subwindow">
            <div className="flex flex-col gap-8">
                <div>
                    <img className="w-20" src={img} alt="" />
                </div>

                <div>
                    <h1 className="font-semibold text-2xl">{text}</h1>
                </div>

            </div>

        </div>

    );
}