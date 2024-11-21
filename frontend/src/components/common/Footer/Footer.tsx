import Logo from "../shared/Logo/Logo";


export default function Footer() {
    return(
        <footer className="bg-gray-800 text-white py-8 pt-14">
            <div className="max-container mx-auto px-8 flex flex-col max-lg:items-center">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* <!-- Company Info --> */}
                    <div className="items-center flex">
                        <Logo />
                    </div>
                    
                    {/* <!-- Navigation Links --> */}
                    <div className="">
                        <h4 className="max-xl:text-md text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                        <li><a href="#" className="hover:underline max-xl:text-sm">Home</a></li>
                        <li><a href="#features" className="hover:underline max-xl:text-sm">Features</a></li>
                        <li><a href="#pricing" className="hover:underline max-xl:text-sm">Pricing</a></li>
                        <li><a href="#about" className="hover:underline max-xl:text-sm">About Us</a></li>
                        <li><a href="#contact" className="hover:underline max-xl:text-sm">Contact Us</a></li>
                        </ul>
                    </div>
                    
                    {/* <!-- Contact Information --> */}
                    <div className="">
                        <h4 className="max-xl:text-md text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                        <li className="max-xl:text-sm"><span className="font-semibold max-xl:text-sm">Email:</span> lexilearn456@gmail.com</li>
                        <li className="max-xl:text-sm"><span className="font-semibold max-xl:text-sm">Address:</span> Ruse, Bulgaria</li>
                        </ul>
                    </div>
                    
                    {/* <!-- Social Media & Newsletter --> */}
                    <div className="">
                        <h4 className="max-xl:text-md text-lg font-semibold mb-4">Stay Connected</h4>

                        <div className="flex space-x-4 mb-4">
                            {/* <a href="https://www.facebook.com" className="hover:text-cyan-500"><i className="faFacebook"></i></a>
                            <a href="https://www.twitter.com" className="hover:text-cyan-500"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com" className="hover:text-cyan-500"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.linkedin.com" className="hover:text-cyan-500"><i className="fab fa-linkedin-in"></i></a> */}
                        </div>

                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <form action="#" method="POST" className="flex flex-col space-y-2">
                            <input type="email" className="px-4 py-2 rounded bg-gray-700 text-white" placeholder="Your email address" />
                            <button type="submit" className="max-xl:text-sm px-4 py-2 bg-cyan-500 rounded text-white hover:bg-cyan-600">Subscribe</button>
                        </form>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="text-center text-gray-400">
                        <p>&copy; 2024 LexiLearn. All rights reserved.</p>
                        <ul className="flex justify-center space-x-4 mt-2">
                            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}