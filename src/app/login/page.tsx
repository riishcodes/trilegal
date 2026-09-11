"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, Lock, Mail, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("arjun.mehra@trilegal.in");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/app");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#10182B]">
      {/* Left visual column */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-[#10182B] text-white border-r border-slate-800">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">TRILEGAL AI</div>
              <div className="text-xs text-blue-300 font-medium">Your AI Co-Counsel</div>
            </div>
          </div>

          <div className="max-w-md mt-16 lg:mt-24">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50 uppercase tracking-wider">
              ENTERPRISE LEGAL OS
            </span>
            <blockquote className="mt-6 text-3xl lg:text-4xl font-serif font-light leading-snug tracking-tight text-slate-100">
              &ldquo;Better Lawyers. <br />
              <span className="text-blue-400 font-normal">Build a Fairer Tomorrow.</span>&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Trilegal AI unifies precedent research, institutional knowledge, strategic case drafting, and the 
              <strong> OrbitX</strong> talent intelligence engine into one seamless co-counsel workspace.
            </p>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="relative z-10 pt-12 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>OrbitX Automated Case Risk &amp; Bench Talent Matching</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Unified Indian Legal Research: SCC, Manupatra, Westlaw connectors</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Contextual AI Judgment Summaries &amp; Article 226/32 Drafting Studio</span>
          </div>
        </div>

        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#173068_1px,transparent_1px),linear-gradient(to_bottom,#173068_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
              <Shield className="w-4 h-4" />
              <span>Enterprise Single Sign-On Ready</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs lg:text-sm text-slate-500 mt-1">
              Sign in with your law firm credentials to access confidential case dockets.
            </p>
          </div>

          {/* Demo Badge */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between">
            <div>
              <span className="font-semibold">Demo Identity:</span> Arjun Mehra (Senior Associate)
            </div>
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase">
              Pre-filled
            </span>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Firm Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              <span>{loading ? "Signing in..." : "SIGN IN"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => router.push("/app"), 300);
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors border border-slate-200"
            >
              SIGN IN WITH OKTA / AZURE SSO
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New to Trilegal AI?{" "}
              <a href="#" className="text-blue-600 font-semibold hover:underline">Request Access from Practice Lead</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
