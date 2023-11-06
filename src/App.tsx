import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Users from "./Components/Users";
import Header from "./Components/Header";
import { Provider } from "react-redux/es/exports";
import { store } from "./Store/Index.ts";
import NewUser from "./Components/NewUser.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/newUser",
        element: <NewUser />,
      },
      {
        path: "/editUser/:id",
        element: <NewUser />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
