import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui";
import { useAuth } from "@/context/auth-context";

function NewPassword() {
  const { login, isLoading } = useAuth();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.currentTarget[0] as HTMLInputElement).value;
    const confirme_password = (e.currentTarget[1] as HTMLInputElement).value;

    login(password, confirme_password);
  };

  return (
    <main className="w-full h-screen flex items-center justify-between">
      <section className="flex items-center justify-center py-12 w-[50%]">
        <div className="mx-auto grid w-[350px] gap-6">
          <article className="grid gap-2">
            <h1 className="text-3xl font-bold">New Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </article>

          <form className="space-y-2" onSubmit={handleForm}>
            <div className="space-y-1">
              <Label htmlFor="email">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Confirme Password</Label>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Submit
            </Button>
          </form>
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

export default NewPassword;
