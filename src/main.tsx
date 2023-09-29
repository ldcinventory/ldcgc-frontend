import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import { store } from "./app/store"
import { getUsersList } from "./features/users/usersSlice"

import "./index.css"

store.dispatch(getUsersList())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
