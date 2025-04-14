const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(userData: {
    username: string;
    email: string;
    password: string;
}) {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al registrarse')
      }
    
      return res.json()    
}