import Button from "../../common/shared/Button";
import Header from "../../common/shared/Header";


export default function Contact() {
    return(
        <section className="max-container mt-24 flex flex-col items-center">

            <div className="text-center">
                <Header title='Feel Free To ' coloredText="Reach out" coloredClass="secondary-header-color" size="text-4xl" infoText="contacts"/>
            </div>

            <div className="w-[80%] bg-slate-600/[.08] py-14 px-16 pb-32 rounded-lg relative mb-24">
                <form className="flex flex-col z-20">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="px-3 w-[50%] mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            
                            <input 
                                className="input" 
                                id="grid-first-name" 
                                type="text" 
                                placeholder="Jane" 
                            />
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>

                        <div className=" w-[50%] px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input 
                                className="input" 
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="px-3 w-[50%] mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Email
                            </label>
                            
                            <input 
                                className="input" 
                                id="grid-first-name" 
                                type="text" 
                                placeholder="Jane@gmail.com" 
                            />
                        </div>

                        <div className=" w-[50%] px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Phone
                            </label>
                            <input 
                                className="input"
                                id="grid-last-name"
                                type="text" 
                                placeholder="08754...." 
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="message" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your message
                        </label>
                        <textarea 
                            id="message" 
                            rows='6' 
                            className="input" 
                            placeholder="Write your thoughts here...">
                        </textarea>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <Button label="Submit" className=""/>
                    </div>
                </form>
            </div>
        </section>
    );
}