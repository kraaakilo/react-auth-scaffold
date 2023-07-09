import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Contact from "./pages/contact";
import AuthLayout from "./layouts/auth-layout";
import CreateProject from "./pages/auth/create";
import UserPage from "./pages/auth/user";
import { loadUserData } from "./lib/auth";

export const router = createBrowserRouter(
   createRoutesFromElements([
      <Route path='/' element={<RegisterPage />} />,
      <Route path='login' element={<LoginPage />} />,
      <Route path='contact' element={<Contact />} />,
      <Route loader={loadUserData} element={<AuthLayout />}>
         <Route path='auth/create' element={<CreateProject />} />
         <Route path='auth/user' element={<UserPage />} />
      </Route>
   ])
)