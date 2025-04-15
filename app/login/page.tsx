'use client'

import { loginUser } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export type LoginForm = {
    username: string;
    password: string;
}

export default function Login() {
    const router = useRouter()

    const [formData, setFormData] = useState<LoginForm>({
        username: '',
        password: '',
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
            const res = loginUser(formData)
            console.log(res)

        } catch(err){
            setError(typeof err === "string" ? err : "An unexpected error occurred")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input value={formData.username} onChange={handleChange} name="username" type="text" placeholder="Nombre de usuario"/>
            <input value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Contraseña"/>

            <button type="submit">Iniciar Sesión</button>

            {error && <p className="text-red-500" >{error}</p>}
        </form>
    )
}