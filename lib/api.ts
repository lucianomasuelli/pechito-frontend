import {RegisterForm} from '../app/signup/page'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(userData: RegisterForm) {
    console.log("registrando ususario en:" + API_URL)
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      })
    
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al registrarse')
      }
    
      return res.json()    
}

export async function loginUser(userData: {
    username: string;
    password: string;
}) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      })
    
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al iniciar sesión')
      }
    
      return res.json()    
}