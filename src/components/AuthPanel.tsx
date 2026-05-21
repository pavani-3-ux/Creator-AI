import React, { useState } from "react";
import { Mail, Lock, ShieldCheck, Cpu, ArrowRight, Instagram, Youtube, Sparkles } from "lucide-react";

interface AuthPanelProps {
  onAuthSuccess: (userObj: { name: string; email: string; tier: "Free" | "Pro" | "Enterprise" }) => void;
  onCancel: () => void;
}

export default function AuthPanel({ onAuthSuccess, onCancel }: AuthPanelProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedTier, setSelectedTier] = useState<"Free" | "Pro" | "Enterprise">("Pro");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate high-speed secure token processing
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        name: isLogin ? (email.split("@")[0] || "Creative Creator") : name,
        email: email || "creator@creatorai.io",
        tier: selectedTier,
      });
    }, 1200);
  };

  const triggerSocialLogin = (platform: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        name: `${platform} Creator VIP`,
        email: `vip_${platform.toLowerCase()}@creatorai.io`,
        tier: "Pro",
      });
    }, 900);
  };

  if (showReset) {
    return (
      <div className="max-w-md w-full glass-panel neon-border-glow p-8 rounded-2xl relative z-10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
        </div>
        <h3 className="font-heading text-2xl font-bold text-center text-white mb-2">Decrypt Password</h3>
        <p className="text-slate-400 text-sm text-center mb-6">Enter your credential sync email below. We'll broadcast a recovery link.</p>

        {resetSent ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center text-emerald-300 text-sm mb-6">
            ✨ Sync broadcast sent! Check your spam folder or creator workspace to complete state recovery.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setResetSent(true); }} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Workspace Email</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"><Mail className="w-4 h-4" /></span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., you@creatorhq.co"
                  required
                  className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-all"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Broadcast Override <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button 
            type="button"
            onClick={() => { setShowReset(false); setResetSent(false); }}
            className="text-xs text-purple-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Direct Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="auth-panel-container" className="max-w-md w-full glass-panel neon-border-glow p-8 rounded-2xl relative z-10 shadow-2xl transition-all">
      {/* Branding Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mb-3">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-center text-white">
          {isLogin ? "Creator Portal" : "Assemble Creator Space"}
        </h3>
        <p className="text-slate-400 text-xs text-center mt-1">
          {isLogin ? "Decrypt access to your dynamic AI engines" : "Initiate account and deploy modern SaaS features"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Creator Name</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"><Cpu className="w-4 h-4" /></span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex Carter"
                required
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Creator Email</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"><Mail className="w-4 h-4" /></span>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@creatorhq.co"
              required
              className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">Passkey Override</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"><Lock className="w-4 h-4" /></span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Operational Tier Selection</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Free", "Pro", "Enterprise"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTier(t)}
                  className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                    selectedTier === t 
                      ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-sm" 
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLogin && (
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={() => setShowReset(true)}
              className="text-xs text-purple-400 hover:text-white transition-colors cursor-pointer"
            >
              Forgot Operational Key?
            </button>
          </div>
        )}

        {/* Action Button */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:opacity-90 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Initializing Quantum Security...
            </span>
          ) : (
            <>
              {isLogin ? "Connect Security Vault" : "Provision New Space"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Logins */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <p className="text-center text-xs text-slate-500 mb-4 uppercase tracking-widest">Connect Creator Account</p>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => triggerSocialLogin("Instagram")}
            className="flex items-center justify-center p-3 rounded-xl bg-slate-900/65 border border-white/5 hover:border-pink-500/30 text-white transition-all cursor-pointer"
            title="Sign in with Instagram Network"
          >
            <Instagram className="w-5 h-5 text-pink-400" />
          </button>
          <button 
            onClick={() => triggerSocialLogin("YouTube")}
            className="flex items-center justify-center p-3 rounded-xl bg-slate-900/65 border border-white/5 hover:border-rose-500/30 text-white transition-all cursor-pointer"
            title="Sign in with YouTube Creators"
          >
            <Youtube className="w-5 h-5 text-rose-500" />
          </button>
          <button 
            onClick={() => triggerSocialLogin("Meta")}
            className="flex items-center justify-center p-3 rounded-xl bg-slate-900/65 border border-white/5 hover:border-cyan-500/30 text-white transition-all cursor-pointer"
            title="Sign in with System Central Key"
          >
            <Cpu className="w-5 h-5 text-cyan-400 animate-spin-slow" />
          </button>
        </div>
      </div>

      {/* Switch Form Type */}
      <div className="text-center mt-6">
        <p className="text-slate-400 text-xs">
          {isLogin ? "No active algorithmic node?" : "Already configured with an instance?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 font-medium ml-1.5 hover:underline cursor-pointer"
          >
            {isLogin ? "Register Node" : "Access direct gateway"}
          </button>
        </p>
        
        <button 
          onClick={onCancel}
          className="text-slate-500 text-[11px] hover:text-slate-300 mt-4 underline block mx-auto cursor-pointer"
        >
          Explore Sandbox Mode
        </button>
      </div>
    </div>
  );
}
