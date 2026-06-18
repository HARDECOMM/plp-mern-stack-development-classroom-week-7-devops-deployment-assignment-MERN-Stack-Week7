import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, ShieldAlert, ArrowRight } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { login, message } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(form);
      if (success) {
        navigate("/dashboard");
      } else {
        setError(message || "Login failed. Check credentials");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50/20 via-slate-50 to-transparent p-4">
      <div className="w-full max-w-md">
        
        {/* Hub Brand Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 mb-3">
            <span className="font-extrabold text-xl">3</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1">Connect with 3MTT graduates and projects</p>
        </div>

        {/* Card wrapper */}
        <Card className="w-full border border-slate-100 shadow-xl shadow-slate-100/60 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-slate-800">Login to Account</CardTitle>
            <CardDescription className="text-slate-400">Enter your credentials below</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl border border-red-100">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <p>{error}</p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-600 font-semibold text-xs">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 focus:border-primary/50 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-600 font-semibold text-xs">Password</Label>
                  <Link to="/forgot-password" className="text-primary hover:underline text-xs font-semibold">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 focus:border-primary/50 outline-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold h-11 rounded-xl shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="bg-slate-50/50 border-t border-slate-100/60 py-4 flex justify-center text-xs text-slate-500 font-medium">
            Don’t have an account?&nbsp;
            <Link to="/register" className="text-primary hover:underline font-bold">
              Create Account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
