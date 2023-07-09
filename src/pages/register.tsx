/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
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
import { Link, useNavigate } from "react-router-dom";

type RegisterResponse = {
   token: string
}

const formSchema = z.object({
   name: z.string().min(2, "Min 2").max(25),
   email: z.string().min(2).max(50),
   password: z.string().min(8).max(12),
})
export default function RegisterPage() {

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(formSchema),
   });
   const navigate = useNavigate();

   const submit = (data: object) => {
      axios.post("http://localhost:8000/api/register", data)
         .then(response => {
            const { token } = response.data as RegisterResponse;
            localStorage.setItem("token", token);
            return navigate("/auth/create");
         })
         .catch((error: AxiosError) => {
            alert(JSON.stringify(error.response?.data));
         });
   }
   return (
      <div className="flex items-center justify-center min-h-screen">
         <Card className="w-[400px]">
            <CardHeader>
               <CardTitle>Create an account</CardTitle>
               <CardDescription>Get started by filling this form.</CardDescription>
            </CardHeader>
            <CardContent>
               <form>
                  <div className="grid items-center w-full gap-4">
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register("name")} id="name" placeholder="Enter your name" type="text" />
                        {errors.name && (
                           <p className="mt-2 text-xs italic text-red-500">
                              {errors.name!.message?.toString()}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} id="email" placeholder="Email for your account" type="text" />
                        {errors.email && (
                           <p className="mt-2 text-xs italic text-red-500">
                              {errors.email!.message?.toString()}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} id="password" placeholder="Create a password" type="password" />
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
               <Button onClick={handleSubmit(submit)} type="submit" className="w-full" size={"default"}>Create</Button>
            </CardFooter>
            <div className="px-6 mb-6 text-center">
               Already have an account ? <span><Link to="/login" className="font-bold">Login</Link></span>
            </div>
         </Card>
      </div>
   )
}
