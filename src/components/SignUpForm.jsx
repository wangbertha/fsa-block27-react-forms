import { useState } from "react"

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const API_URL = 'https://fsa-jwt-practice.herokuapp.com/signup';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password}),
            })
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            setError(error.message);
        }
    }

  return (
    <>
        <h2>Sign Up</h2>
        {error ?? <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor=''>
                Username: <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label htmlFor=''>
                Password: <input type="text" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button>Submit</button>
        </form>
    </>
  )
}
