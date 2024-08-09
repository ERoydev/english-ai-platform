import Button from "../../common/shared/Button/Button";
import Header from "../../common/shared/Header/Header";
import withScrollAnimation from "../../decoration/WithScrollAnimation";

function ContactContent() {
    return(
        <section className="max-container mt-24 flex flex-col items-center">

            <div className="text-center">
                <Header title='Feel Free To ' coloredText="Reach out" coloredClass="secondary-header-color" size="text-4xl" infoText="contacts"/>
            </div>

            <div className="w-[80%] max-md:w-full bg-slate-600/[.08] py-14 px-16 max-md:py-5 max-md:px-5 pb-32 rounded-lg relative mb-24">
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

                        <div className="w-[50%] px-3 mb06 md:mb-0">
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

                    <div className="w-full max-md:mb-24">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                            Your message here
                        </label>
                            
                        <textarea 
                            id="message" 
                            rows='6' 
                            className="input" 
                            placeholder="Write your thoughts here...">
                        </textarea>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-xl:text-sm">
                        <Button label="Submit" className=""/>
                    </div>
                </form>
            </div>
        </section>
    );
}

const Contact = withScrollAnimation(ContactContent);
export default Contact;