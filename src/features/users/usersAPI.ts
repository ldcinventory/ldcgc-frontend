export const fetchUsers = () => fetch(`${import.meta.env.VITE_API_URL}/users`, 
{ headers: { "skip-eula": "true" }})
