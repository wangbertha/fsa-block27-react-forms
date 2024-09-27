import { useState } from "react"

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertInputReq, setAlertInputReq] = useState(null);
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
            setToken(result.token);
        }
        catch (error) {
            setError(error.message);
        }
    }

    function updateUsernameInput(e) {
        const newUsername = e.target.value;
        if (newUsername.length < 8) {
            setAlertInputReq('Username must be at least 8 characters long.');
        }
        else {
            setAlertInputReq(null)
        }
        setUsername(newUsername);
    }

  return (
    <>
        <h2>Sign Up</h2>
        {error ?? <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" onChange={updateUsernameInput} />
            </label>
            <label>
                Password: <input type="text" onChange={(e) => setPassword(e.target.value)} />
            </label>
            {alertInputReq && <p className="alert">{alertInputReq}</p>}
            <button>Submit</button>
        </form>
    </>
  )
}
