import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import FormValues from "../types/Forms/FormValues";

// Thats my reusable component to handle basic controlled forms.



type SubmitHandler = (values: FormValues) => void;

export default function useForm(SubmitHandler: SubmitHandler, initialValues: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);


  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValues(values);
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
