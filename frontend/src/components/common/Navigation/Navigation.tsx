import Button from "../shared/Button";
import globus from '../../../assets/images/globus.png';
import Link from "../shared/Link";


export default function Navigation() {
    return (
        <header className="flex max-container items-center justify-between padding-x py-5">
            <div>
                <h1 className="font-bold text-2xl flex items-center gap-2 scale-95 hover:scale-100 hover:cursor-pointer hover:text-slate-700 transition">
                    <img src={globus} className="w-16 h-16 rounded-full " alt="Logo" />
                        LexiLearn
                </h1>
            </div>
            <nav>
                <ul className="flex gap-14 items-center">
                    <li>
                        <Link label='Courses' />
                    </li>
                    <li>
                        <Link label='Students' />
                    </li>

                    <li>
                        <Link label='Practice & Quizzes' />
                    </li>

                    <li>
                        <Link label='About us' />
                    </li>

                    <li>
                        <Button label='Sign-up'/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}