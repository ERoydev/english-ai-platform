import { useSelector } from "react-redux";
import BaseProfile from "../BaseProfile";
import FormField from "../../shared/Forms/FormField";
import Button from "../../shared/Button/Button";

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
                
                <div>
                    <div className="py-4 flex justify-between">
                        <p className="text-md">Completed Exercises: {userData?.profile.completed_exercises}</p>
                        <p className="text-md">Proficiency level: {userData?.profile.proficiency_level}</p>
                        <p className="text-md">Speaking time: {userData?.profile.speaking_time}</p>

                    </div>

                    <hr className="mt-4 mb-8" />
                </div>

                <div className="py-4 ">
                    <form className="flex flex-col">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <FormField 
                                title="First Name"
                                fieldValue=""
                                inputName="first_name"
                                placeholder="Joe"

                            />

                            <FormField 
                                title="Last Name"
                                fieldValue=""
                                inputName="last_name"
                                placeholder="Doe"

                            />
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <FormField 
                                title="Age"
                                fieldValue=""
                                inputName="age"
                                inputType="number"
                                placeholder="23"
                            />

                            <FormField 
                                title="Phone Number"
                                fieldValue=""
                                inputName="age"
                                placeholder="087458...."
                            />
                        </div>

                        <div className="flex justify-center py-5">
                            <Button label="Submit" className="" />
                        </div>

                    </form>
                </div>

            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                
            </div>

        </BaseProfile>
    );
}