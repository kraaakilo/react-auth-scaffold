import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function Contact() {
   return (
      <div className="min-h-screen flex items-center justify-center gap-x-5">
         Reach me here.
         <Link className={cn(buttonVariants({ variant: "default" }))} to="/">Go to home</Link>
      </div>
   )
}
