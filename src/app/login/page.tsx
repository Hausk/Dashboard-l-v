import { Button } from "@/components/ui/button"
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
import GoogleButton from "@/components/googleButon";

export default function Page() {
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>Connectez vous à votre compte.</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <form>
          <div className="grid w-full items-center">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="John@doe.com" type="email" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 mt-0">
        <GoogleButton/>
        <div className="flex justify-between w-full">
            <Button variant="outline" className="w-1/3">Reset</Button>
            <Button className="w-1/2">Se connecter</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
