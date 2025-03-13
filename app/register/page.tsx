import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center">
              Set up your account in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <Button
              variant="default"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-sm">
            <div className="text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
