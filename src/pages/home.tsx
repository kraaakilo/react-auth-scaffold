import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function HomePage() {
   const searchParams = useSearchParams();

   useEffect(() => {
      if (searchParams[0].get("error") === "unauthenticated") {
         toast.error('Please login to continue.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   })

   return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-y-5">
         Login to your account
         <Link className={cn(buttonVariants({ variant: "default" }))} to="/auth/create">Login</Link>
      </div>
   );
}
