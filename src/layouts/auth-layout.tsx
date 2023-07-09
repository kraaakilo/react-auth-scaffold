import { User } from "@/types/user";
import { Outlet, useLoaderData } from "react-router-dom";


export default function AuthLayout() {
  
  const user = useLoaderData() as User;
  
  return (
    <div>
      <Outlet context={{user}} />
    </div>
  );
}
