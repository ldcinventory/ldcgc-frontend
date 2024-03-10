const LOGIN_PATH = '/accounts/login'

export const ApiLogin = ({ email, password }) => {
  console.log(email, password)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "localhost:3000",
    },
    body: JSON.stringify({email, password}),
    cache: "no-cache",
  }

  const url = `${import.meta.env.VITE_API_URL}${LOGIN_PATH}`
  return fetch(url, options)
    .then(response => response.headers)
}