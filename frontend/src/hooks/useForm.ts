import { useState, ChangeEvent, FormEvent } from "react";

// Thats my reusable component to handle basic controlled forms.

type FormValues = {
  [key: string]: any;
};

type SubmitHandler = (values: FormValues) => void;

export default function useForm(SubmitHandler: SubmitHandler, initialValues: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SubmitHandler(values);
  };

  const resetValues = () => {
    setValues(initialValues) // clean
  }

  return {
    values,
    onChange,
    onSubmit,
    resetValues,
  };
}
