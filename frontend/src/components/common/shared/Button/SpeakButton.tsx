/*
I use this component for functionalities that will use record button
*/


export default function SpeakButton({
    buttonText,
    buttonHandler,
}:{
    buttonText: string;
    buttonHandler: () => void; // Correcting type to a function
}) {
    return(
        <div>
            <button className={`hover:cursor-pointer hover:bg-gray-600 max-md:text-sm max-md:p-3 bg-[#333] rounded-md font-semibold p-5 flex items-center gap-2 ${buttonText === "Pause" ? 'text-black bg-gray-300' : 'text-white'}`} onClick={buttonHandler}>
            <span className={`w-[15px] max-md:w-[10px] ${buttonText === 'Pause' ? "hidden" : ''}`}>
                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"/></svg>

            </span>
                {buttonText}
            </button>
        </div>

    );
}

