import { useSelector } from "react-redux";
import BaseProfile from "../BaseProfile";
import FormField from "../../shared/Forms/FormField";
import Button from "../../shared/Button/Button";
import useForm from "../../../../hooks/useForm";
import useFormError from "../../../../hooks/useFormError";
import { phoneNumberValidation } from "../../../../utils/validations/PhoneNumberValidation";
import ErrorDisplay from "../../../../utils/validations/ErrorDisplay";
import { updateProfileData } from "../../../../services/User/GenericUserService";
import { useEffect, useState } from "react";
import SuccessDisplay from "../../shared/Messages/SuccessDisplay";
import LevelRadar from "../../shared/Charts/LevelRadar";

type FormData = {
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
};

const initialFormData: FormData = {
    first_name: "",
    last_name: "",
    age: 0,
    phone_number: "",
};

export default function ProfileSettings() {
    const userData = useSelector((state) => state.auth.userInfo).user;
    const [formData, setFormData] = useState<FormData | null>(null);
    const { errors, setErrorHandler } = useFormError();
    const [isSuccessfull, setIsSuccessfull] = useState(false);

    const validateForm = () => {
        const errors: string[] = [];
        phoneNumberValidation(values.phone_number, errors);
        setErrorHandler(errors);
        return errors;
    };

    const submitFormHandler = async (values: FormData) => {
        const errors = validateForm();
        if (errors.length > 0) return;

        await updateProfileData(userData.id, values);
        setIsSuccessfull(true);
    };

    // Initialize formData when userData is available
    useEffect(() => {
        if (userData?.profile) {
            const updatedFormData = {
                first_name: userData.profile.first_name || "",
                last_name: userData.profile.last_name || "",
                age: userData.profile.age || 0,
                phone_number: userData.profile.phone_number || "",
            };
            setFormData(updatedFormData);
        }
    }, [userData]);

    // Initialize useForm only when formData is ready
    const { values, onChange, onSubmit } = useForm(
        submitFormHandler,
        formData || initialFormData // Use initialFormData as a fallback
    );


    return (
        <BaseProfile>
            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mb-10">
                <div className="pt-4">
                    <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                    <p className="font-text-slate-600">Change or review your account settings.</p>
                    <hr className="mt-4 mb-8" />
                </div>

                <div>
                    <div className="py-4 flex justify-between">
                        <p className="text-md">Completed Exercises: {userData?.profile.completed_exercises}</p>
                        <p className="text-md">Proficiency level: {userData?.profile.proficiency_level}</p>
                        <p className="text-md">Speaking time: {userData?.profile.speaking_time} s</p>

                    </div>
                    <hr className="mt-4 mb-8" />
                </div>

                <div className="my-10">
                    <LevelRadar

                    />
                </div>

                <form className="flex flex-col" onSubmit={onSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <FormField
                            title="First Name"
                            fieldValue={values.first_name}
                            inputName="first_name"
                            placeholder="Joe"
                            onChange={onChange}
                        />
                        <FormField
                            title="Last Name"
                            fieldValue={values.last_name}
                            inputName="last_name"
                            placeholder="Doe"
                            onChange={onChange}
                        />
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <FormField
                            title="Age"
                            fieldValue={values.age}
                            inputName="age"
                            inputType="number"
                            placeholder="23"
                            onChange={onChange}
                        />
                        <FormField
                            title="Phone Number"
                            fieldValue={values.phone_number}
                            inputName="phone_number"
                            placeholder="087458...."
                            onChange={onChange}
                        />
                    </div>

                    <ErrorDisplay errorProperty={errors} />

                    {!isSuccessfull ? (
                        <div className="flex justify-center py-5">
                            <Button label="Edit Info" className=""/>
                        </div>
                    ) : (
                        <div className="relative pb-20">
                            <SuccessDisplay
                                text="Profile Information is updated successfully"
                                isSended={isSuccessfull}
                            />
                        </div>
                    )}
                </form>
            </div>
        </BaseProfile>
    );
}
