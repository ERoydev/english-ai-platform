import { useState, ChangeEvent, FormEvent } from "react";

type FormValues = {
  [key: string]: any;
};

type SubmitHandler = (values: FormValues) => void;

export default function useForm(submitHandler: SubmitHandler, initialValues: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler(values);
  };

  return {
    values,
    onChange,
    onSubmit,
  };
}
