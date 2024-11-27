import { useSelector } from "react-redux";
import BaseProfile from "../BaseProfile";

export default function ProfileSettings() {
    const userData = useSelector(state => state.auth.userInfo).user;

    console.log(userData?.profile)

    return(
        <BaseProfile>
            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                <div className="pt-4">
                    <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                    <p className="font-text-slate-600">Change or review your account settings.</p>

                    <hr className="mt-4 mb-8" />
                </div>

                <div className="py-4 flex justify-between">
                    <p className="text-md">Completed Exercises: {userData?.profile.completed_exercises}</p>
                    <p className="text-md">Proficiency level: {userData?.profile.proficiency_level}</p>
                    <p className="text-md">Speaking time: {userData?.profile.speaking_time}</p>

                    <hr className="mt-4 mb-8" />
                </div>

            </div>
        </BaseProfile>
    );
}