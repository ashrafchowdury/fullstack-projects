import { FormEvent } from "react";
import {
  Input,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

const Login = () => {
  const { singup, login, forget, isLoading } = useAuth();

  const handleForms = async (
    e: FormEvent<HTMLFormElement>,
    form: number[],
    authFunction: (...args: string[]) => void
  ) => {
    e.preventDefault();
    const value = form.map(
      (data) => (e.currentTarget[data] as HTMLInputElement | undefined)?.value
    );

    if (value.some((data) => !data)) {
      toast.error("Please fill up all the fildes");
    } else {
      authFunction(...(value as string[]));
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[95%] sm:w-[400px] border-none">
        <TabsList className="w-full h-auto">
          <TabsTrigger value="signup" className="w-full py-2">
            Sign Up
          </TabsTrigger>
          <TabsTrigger value="login" className="w-full py-2">
            Log In
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                ea!
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <form
                onSubmit={(e) => handleForms(e, [0, 1, 2], singup)}
                className="space-y-3"
              >
                <div className="space-y-1 relative">
                  <Label htmlFor="name">Name</Label>
                  <PersonIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                  <Input
                    type="text"
                    placeholder="Username"
                    className="px-8"
                    required
                  />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="email">Email</Label>
                  <EnvelopeClosedIcon className="w-4 h-4 absolute bottom-[10px] left-[11px]" />
                  <Input
                    type="email"
                    placeholder="Email Addrese"
                    className="px-9"
                  />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <LockClosedIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="px-8"
                  />
                </div>
                <Button className="!mt-8 w-full" load={isLoading}>
                  Create Account
                </Button>
              </form>

              <div className="flex items-center my-3 justify-between">
                <Separator className="w-[45%]" />
                <span>Or</span>
                <Separator className="w-[45%]" />
              </div>

              <Button
                icon={<GitHubLogoIcon />}
                className="w-full h-9"
                variant="outline"
              >
                GiHub
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate sunt vitae animi!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => handleForms(e, [0, 1], login)}
                className="space-y-3"
              >
                <div className="space-y-1 relative">
                  <Label htmlFor="email">Email</Label>
                  <EnvelopeClosedIcon className="w-4 h-4 absolute bottom-[10px] left-[11px]" />
                  <Input
                    type="email"
                    placeholder="Email Addrese"
                    className="px-9"
                  />
                </div>
                <div className="space-y-1 relative">
                  <Label htmlFor="password">Password</Label>
                  <LockClosedIcon className="w-4 h-4 absolute bottom-[11px] left-[10px]" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="px-8"
                  />
                </div>
                <TabsList className="w-auto h-auto bg-transparent">
                  <TabsTrigger value="forget" className="bg-transparent p-0">
                    Forget Password!
                  </TabsTrigger>
                </TabsList>
                <Button className="!mt-8 w-full" load={isLoading}>
                  Log In
                </Button>
              </form>

              <div className="flex items-center my-3 justify-between">
                <Separator className="w-[45%]" />
                <span>Or</span>
                <Separator className="w-[45%]" />
              </div>

              <Button
                icon={<GitHubLogoIcon />}
                className="w-full h-9"
                variant="outline"
              >
                GiHub
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forget">
          <Card>
            <CardHeader>
              <CardTitle>Forget Password</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate sunt vitae animi!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => handleForms(e, [0], forget)}
                className="space-y-1 relative"
              >
                <Label htmlFor="email">Email</Label>
                <EnvelopeClosedIcon className="w-4 h-4 absolute top-[34px] left-[11px]" />
                <Input
                  type="email"
                  placeholder="Email Addrese"
                  className="px-9"
                />
                <Button className="!mt-8 w-full" load={isLoading}>
                  Forget Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Login;
