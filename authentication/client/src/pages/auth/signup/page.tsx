import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, Separator } from "@/components/ui";
import { Link } from "react-router-dom";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/context/auth-context";

function Signup() {
  const { singup, isLoading } = useAuth();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const email = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    singup(username, email, password);
  };

  return (
    <main className="w-full h-screen flex items-center justify-between">
      <section className="flex items-center justify-center py-12 w-[50%]">
        <div className="mx-auto grid w-[350px] gap-6">
          <article className="grid gap-2">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </article>

          <form className="space-y-2" onSubmit={handleForm}>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input type="name" placeholder="Username" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Signup
            </Button>
          </form>

          <div className="flex items-center my-1 justify-between">
            <Separator className="w-[45%]" />
            <span>Or</span>
            <Separator className="w-[45%]" />
          </div>

          <Button
            icon={<GitHubLogoIcon />}
            className="w-full h-9"
            variant="outline"
            disabled={isLoading}
          >
            GiHub
          </Button>
        </div>
      </section>

      <section className="hidden bg-muted lg:block w-[50%] h-screen">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </section>
    </main>
  );
}

export default Signup;
