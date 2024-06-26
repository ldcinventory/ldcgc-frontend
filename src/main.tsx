import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import { store } from "./app/index"

import "./index.css"
import { BrowserRouter } from "react-router-dom"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
