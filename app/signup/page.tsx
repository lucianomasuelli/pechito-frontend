'use client'

import { registerUser } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export type RegisterForm = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function SignUp() {
    const router = useRouter()

    const [formData, setFormData] = useState<RegisterForm>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })
    const [error, setError] = useState<string | null>(null);

    //Handle the change in the form's input fields.
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    //Handle the form submition.
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try{
            registerUser(formData)

            console.log("Usuario creado")
            router.push('/login');

        } catch(err){
            setError(typeof err === "string" ? err : "An unexpected error occurred")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input value={formData.username} onChange={handleChange} name="username" type="text" placeholder="Nombre de usuario"/>
            <input value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Contraseña"/>
            <input value={formData.firstName} onChange={handleChange} name="firstName" type="text" placeholder="Nombre"/>
            <input value={formData.lastName} onChange={handleChange} name="lastName" type="text" placeholder="Apellido"/>
            <input value={formData.email} onChange={handleChange} name="email" type="email" placeholder="Email"/>

            <button type="submit">Iniciar Sesión</button>

            {error && <p className="text-red-500" >{error}</p>}
        </form>
    )
}