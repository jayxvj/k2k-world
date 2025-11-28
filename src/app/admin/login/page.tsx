"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn, Loader2, Plane, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/firebase/auth-context";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, isConfigured } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    if (!isConfigured) {
      toast.error("Firebase is not configured. Please add your environment variables.");
      return;
    }

    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful!");
      router.push("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mx-auto">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-600">K to K World - Travel & Tourism</p>
          </CardHeader>
          <CardContent>
            {!isConfigured && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Firebase Not Configured</AlertTitle>
                <AlertDescription>
                  Please configure your Firebase environment variables to enable authentication.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="admin@ktokworld.com"
                  className={errors.email ? "border-red-500" : ""}
                  disabled={!isConfigured}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className={errors.password ? "border-red-500" : ""}
                  disabled={!isConfigured}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || !isConfigured}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                🔧 Setup Instructions:
              </p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Firebase Console</a></li>
                <li>Create a new project or select existing one</li>
                <li>Go to Project Settings → Your apps section</li>
                <li>Copy your Firebase configuration values</li>
                <li>Create <code className="bg-gray-200 px-1 rounded">.env.local</code> file in your project root</li>
                <li>Add all <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_FIREBASE_*</code> variables</li>
                <li>Enable Email/Password authentication in Firebase Console</li>
                <li>Create admin user: <strong>admin@ktokworld.com</strong></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white hover:underline"
          >
            ← Back to Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}