import { User } from "@/types/user";
import { useOutletContext } from "react-router-dom";

export default function UserPage() {
  const { user }: { user: User } = useOutletContext();

  return (
    <div>
      I'm {user.email}
    </div>
  );
}
