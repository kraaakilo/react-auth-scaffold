import { AuthStatus, BackendGuestMessage, User } from "@/types/user";
import { redirect } from "react-router-dom";

export const getUser = async (): Promise<User | BackendGuestMessage> => {
   const token = localStorage.getItem("token");
   const auth = await fetch("http://localhost:8000/api/user", {
      headers: {
         "Accept": "application/json",
         "Authorization": `Bearer ${token!}`,
      }
   });
   return auth.json() as Promise<User | BackendGuestMessage>;
};

export const loadUserData = async (): Promise<unknown> => {
   try {
      const user = await getUser();
      if ("message" in user) {
         return redirect(`/login?error=${AuthStatus.unauthenticated}`);
      }
      return user;
   } catch (error) {
      return redirect(`/login?error=${AuthStatus.unauthenticated}`);
   }
};