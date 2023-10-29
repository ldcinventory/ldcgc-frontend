export const fetchUsers = () =>
  fetch(`${import.meta.env.VITE_API_URL}/api/users`)
