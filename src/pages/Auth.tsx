import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Ambulance, AlertCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

// Validation schemas
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0B80-\u0BFF]+$/, "Name can only contain letters and spaces"),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g., +911234567890)"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["user", "driver", "operator", "hospital", "doctor"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

type ValidationErrors = Record<string, string>;

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState<ValidationErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<ValidationErrors>({});

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignUpErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawData = {
      fullName: (formData.get("full-name") as string || "").trim(),
      phone: (formData.get("phone") as string || "").trim().replace(/[\s\-\(\)]/g, ""),
      email: (formData.get("signup-email") as string || "").trim().toLowerCase(),
      password: formData.get("signup-password") as string || "",
      role: formData.get("role") as string || "user",
    };

    // Validate input
    const validationResult = signUpSchema.safeParse(rawData);
    if (!validationResult.success) {
      const errors: ValidationErrors = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setSignUpErrors(errors);
      setLoading(false);
      return;
    }

    const { fullName, phone, email, password, role } = validationResult.data;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Explicitly set role in profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('user_id', data.user.id);

        if (profileError) console.error('Error setting role:', profileError);
      }

      toast({
        title: "Success!",
        description: "Account created successfully. You can now sign in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawData = {
      email: (formData.get("signin-email") as string || "").trim().toLowerCase(),
      password: formData.get("signin-password") as string || "",
    };

    // Validate input
    const validationResult = signInSchema.safeParse(rawData);
    if (!validationResult.success) {
      const errors: ValidationErrors = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setSignInErrors(errors);
      setLoading(false);
      return;
    }

    const { email, password } = validationResult.data;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Successfully signed in.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1 text-destructive text-sm mt-1">
        <AlertCircle className="h-3 w-3" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Premium Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden text-white bg-medical-blue-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-medical-blue-dark/90" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
              <Ambulance className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">RAPIDRESQ</h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 max-w-lg"
          >
            <h2 className="text-5xl font-extrabold leading-[1.1]">
              Life-saving care, <br />
              <span className="text-white/70">when seconds count.</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Join thousands of healthcare professionals and patients in our secure, ABDM-compliant emergency response network.
            </p>
          </motion.div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3 text-sm font-medium text-white/80 bg-white/5 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          <ShieldCheck className="w-5 h-5 text-trust-green" />
          ISO 27001 Certified & ABDM Compliant
        </div>
      </div>

      {/* Right side Auth Form */}
      <div className="flex items-center justify-center p-4 lg:p-12 relative bg-white dark:bg-zinc-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-blue/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center lg:text-left mb-8 block lg:hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Ambulance className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">RAPIDRESQ</h1>
            </div>
            <p className="text-muted-foreground font-medium">Emergency healthcare at your fingertips</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2 font-medium">Enter your details to access your account</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1.5 rounded-xl h-14">
              <TabsTrigger value="signin" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md text-base font-semibold transition-all">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md text-base font-semibold transition-all">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className={signInErrors.email ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signInErrors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className={signInErrors.password ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signInErrors.password} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

            <TabsContent value="signup" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      name="full-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className={signUpErrors.fullName ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signUpErrors.fullName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+911234567890"
                      required
                      className={signUpErrors.phone ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signUpErrors.phone} />
                    <p className="text-xs text-muted-foreground">Include country code (e.g., +91 for India)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className={signUpErrors.email ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signUpErrors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className={signUpErrors.password ? "border-destructive" : ""}
                    />
                    <ErrorMessage message={signUpErrors.password} />
                    <p className="text-xs text-muted-foreground">
                      Min 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <select
                      id="role"
                      name="role"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="user">User / Patient</option>
                      <option value="driver">Ambulance Driver</option>
                      <option value="operator">Dispatch Operator</option>
                      <option value="hospital">Hospital Administrator</option>
                      <option value="doctor">Medical Professional</option>
                    </select>
                    <ErrorMessage message={signUpErrors.role} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;