"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils";
import { LoginFormData } from "@/lib/models";
import TextInput from "@/UI/TextInput";
import Button from "@/UI/Button";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema()),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push("/products");
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Email"
            type="email"
            placeholder="Email"
            ID="email"
            errors={errors}
            register={register}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Password"
            ID="password"
            errors={errors}
            register={register}
          />
          <Button
            text={isLoading ? "Signing in..." : "Sign In"}
            variant="default" 
            type="submit"
            containerStyle="bg-black hover:bg-gray-900"
            loading={isLoading}
            disabled={isLoading} 
          />
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
}