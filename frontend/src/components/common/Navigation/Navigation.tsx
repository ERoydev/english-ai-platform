import Button from "../shared/Button";
import globus from '../../../assets/images/globus.png';
import Link from "../shared/Link";
import Logo from "../shared/Logo";


export default function Navigation() {
    return (
        <header className="flex max-container items-center justify-between padding-x py-5">
            <div>
                <Logo />
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