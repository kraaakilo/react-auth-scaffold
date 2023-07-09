/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toastError } from "@/lib/utilities";

type RegisterResponse = {
   token: string
}

const formSchema = z.object({
   email: z.string().min(2).max(50),
   password: z.string().min(8).max(12),
})
export default function LoginPage() {

   const searchParams = useSearchParams();

   useEffect(() => {
      if (searchParams[0].get("error") === "unauthenticated") {
         toastError('Please login to continue.');
      }
   }, []);

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(formSchema),
   });
   const navigate = useNavigate();

   const submit = (data: object) => {
      axios.post("http://localhost:8000/api/login", data,{
         headers :{
            "Accept" : "application/json"
         }
      })
         .then(response => {
            const { token } = response.data as RegisterResponse;
            localStorage.setItem("token", token);
            return navigate("/auth/create");
         })
         .catch(() => {
            toastError('It seems that your credentials not match with our records.');
         });
   }
   return (
      <div className="flex items-center justify-center min-h-screen">
         <Card className="w-[400px]">
            <CardHeader>
               <CardTitle>Login to your account</CardTitle>
               <CardDescription>Get access to your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
               <form>
                  <div className="grid items-center w-full gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} id="email" placeholder="Email" type="text" />
                        {errors.email && (
                           <p className="mt-2 text-xs italic text-red-500">
                              {errors.email!.message?.toString()}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} id="password" placeholder="Enter your password" type="password" />
                        {errors.password && (
                           <p className="mt-2 text-xs italic text-red-500">
                              {errors.password!.message?.toString()}
                           </p>
                        )}
                     </div>
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex justify-between">
               <Button onClick={handleSubmit(submit)} type="submit" className="w-full" size={"default"}>Login</Button>
            </CardFooter>
            <div className="px-6 mb-6 text-center">
               Need an account ? <span><Link to="/" className="font-bold">Create</Link></span>
            </div>
         </Card>
      </div>
   )
}
