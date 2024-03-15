import { signIn } from '@/auth/auth';
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
    return (
      <div className="relative w-full">
      <form className="w-full">
        <Button className="w-full p-5 bg-foreground text-primary hover:text-foreground"
          formAction={async () => {
            "use server";
            await signIn('google')
          }}
        >
        <FcGoogle size={48} className="absolute -left-2 rounded-full bg-foreground" />
        Se connecter avec Google
      </Button>
      </form>
      </div>
        
    )   
}