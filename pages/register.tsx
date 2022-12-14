import { NextPage } from "next";
import React, { useState } from "react";
import AuthLayout from "../Components/Auth/Layout";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { RegisterFormData } from "../Types/Auth/RegisterFormData";
import axios from "axios";
import { Toast } from "../Components/Toast";

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [toastType, setToastType] = useState<"success" | "danger">("danger");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { redirectToNextURL, setToken } = useAuth();

  const onFormSubmit = async (formData: RegisterFormData) => {
    try {
      setFormIsLoading(true);

      const { data } = await axios.post("/api/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        admin: Number(formData.admin),
      });
      setToken(data.token);
      redirectToNextURL();
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setFormIsLoading(false);
    }
  };

  const showErrorToast = (message: string) => {
    setError(message);
    setToastType("danger");
    setToastIsOpen(true);

    setTimeout(() => {
      setToastIsOpen(false);
    }, 5000);
  };

  return (
    <AuthLayout>
      <form
        id="form-register"
        onSubmit={handleSubmit<RegisterFormData>(onFormSubmit)}
      >
        <input type="text" placeholder="Nome" required {...register("name")} />
        <input
          type="email"
          placeholder="E-mail"
          required
          {...register("email")}
        />
        <input
          type="tel"
          placeholder="Telefone"
          required
          {...register("phone")}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          {...register("password")}
        />
        <select id="" {...register("admin", { required: "Select one Option" })}>
          <option value="0" selected>
            User
          </option>
          <option value="1">Admin</option>
        </select>

        <footer>
          <button type="submit" disabled={formIsLoading}>
            {formIsLoading ? "Enviando" : "Enviar"}
          </button>
        </footer>
        <Toast type={toastType} open={toastIsOpen}>
          <p>{error}</p>
        </Toast>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
