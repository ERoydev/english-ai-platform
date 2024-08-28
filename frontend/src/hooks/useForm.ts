import { useState, ChangeEvent, FormEvent } from "react";

// Thats my reusable component to handle basic controlled forms.

type FormValues = {
  [key: string]: any;
};

type SubmitHandler = (values: FormValues) => void;

export default function useForm(SubmitHandler: SubmitHandler, initialValues: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SubmitHandler(values);
  };

  return {
    values,
    onChange,
    onSubmit,
  };
}
