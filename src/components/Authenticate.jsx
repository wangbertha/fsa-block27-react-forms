import { useState } from "react"

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null)
    const [username, setUsername] = useState(null)
    const [error, setError] = useState(null)

    async function getAuthentication() {
        try {
            const API_URL = 'https://fsa-jwt-practice.herokuapp.com/authenticate';
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                },
            });
            const result = await response.json();
            setSuccessMessage(result.message)
            setUsername(result.data.username);
        }
        catch (error) {
            setError(error.message);
        }
    }

  return (
    <>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {username && <p>Username: {username}</p>}
        {error && <p>{error}</p>}
        <button onClick={getAuthentication}>Authenticate Token</button>
    </>
  )
}
