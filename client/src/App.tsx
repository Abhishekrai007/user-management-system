// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import EditUser from "./pages/EditUser";

const App: React.FC = () => {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/profile/:id",
          element: <UserProfile />,
        },
        {
          path: "/edit-user/:id",
          element: <EditUser />,
        },
      ],
    },
  ]);
  return (
    // <Router>
    //   <Navbar />
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/login" component={Login} />
    //     <Route path="/register" component={Register} />
    //     <Route path="/users" component={UserList} />
    //     <Route path="/profile/:id" component={UserProfile} />
    //   </Switch>
    // </Router>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
