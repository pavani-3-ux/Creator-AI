import React, { useState, useEffect } from "react";
import { 
  Sparkles, Cpu, TrendingUp, Video, Calendar, MessageSquare, 
  Image as ImageIcon, Volume2, Globe, ArrowRight, Star, 
  Check, ChevronDown, ShieldCheck, Activity, Users, Flame 
} from "lucide-react";
import GlowBlob from "./GlowBlob";

interface LandingPageProps {
  onStartTesting: () => void;
  onNavigateAuth: () => void;
}

export default function LandingPage({ onStartTesting, onNavigateAuth }: LandingPageProps) {
  // Demo interactive tab states
  const [activeTab, setActiveTab] = useState<"caption" | "script" | "viral-ideas">("caption");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Statistics state counters
  const [stats, setStats] = useState({ users: 14200, generations: 890450, growth: 124 });

  // Accordion database
  const faqDatabase = [
    {
      q: "How does CreatorAI guarantee better engagement than generic AI systems?",
      a: "Unlike generic LLMs, CreatorAI passes specialized system guidelines trained on top 1% Youtube retention curves, Instagram algorithmic distribution vectors, and TikTok keyword trends. It structurally crafts pattern interrupts and high-CTR hooks."
    },
    {
      q: "Can I use CreatorAI in languages other than English?",
      a: "Yes! The platform possesses full multi-language translations and cultural optimization modules that write high-engaging captions in Telugu, Hindi, Spanish, French, and German natively."
    },
    {
      q: "Is there a limit on standard text and image generations in the Pro plan?",
      a: "The Pro tier provides unlimited creative text generations equipped with 200 high-definition cyberpunk text-to-image tokens refreshed monthly."
    },
    {
      q: "How are the Google Gemini algorithms leveraged in CreatorAI?",
      a: "We integrate server-side Gemini 3.5 Flash engines, optimizing for hyper-fast creative content pipelines, micro-acoustic phonetic previews, and advanced content planners."
    }
  ];

  // Typing simulator effect for interactive hero demo
  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setTypedText("");
    
    const textOptions = {
      caption: "✨ THE FORMULA: Stop designing templates. Build immersive modular playgrounds that trigger instant community clicks. #SaaSRevolution #Growth #DevLife",
      script: "🎬 THE HOOK: 'Here is the $10,000 SaaS recipe they want to keep classified...' ↳ Problem: Creators assume beauty requires budget. ↳ Solution: It requires system logic. Comment 'SYSTEM' to replicate this cycle!",
      "viral-ideas": "💡 IDEA 1: 'Inside a $100M Silicon Dev Room' (Visual: Hyper-focused dark neon glow) \n💡 IDEA 2: 'The prohibited keyboard shortcuts I use daily to save hours' (Visual: Keyboards zooming)"
    };

    const targetText = textOptions[activeTab];
    const timer = setInterval(() => {
      if (index < targetText.length) {
        setTypedText((prev) => prev + targetText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="relative min-h-screen bg-bg-dark text-white overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Ambience */}
      <GlowBlob />

      {/* Hero Navbar */}
      <header className="relative z-20 border-b border-white/5 bg-bg-dark/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-purple-primary to-cyan-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-purple-500/10">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
              CreatorAI
            </span>
            <span className="text-[9px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              2026 Core
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#interactive-demo" className="hover:text-cyan-400 transition-colors">Live Simulation</a>
            <a href="#pricing" className="hover:text-pink-400 transition-colors">Tiers Matrix</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors border-l border-white/5 pl-8">Documentation</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={onStartTesting}
              className="text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-2 border border-white/5 rounded-xl bg-slate-900/40 hover:bg-slate-900/80"
            >
              Sandbox Portal
            </button>
            <button 
              onClick={onNavigateAuth}
              className="px-4 py-2 text-xs font-heading font-semibold rounded-xl bg-gradient-to-r from-purple-primary inside-border to-pink-primary text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Access Engine
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-16 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/20 border border-purple-500/20 rounded-full text-purple-300 text-xs font-mono tracking-wide mb-8 animate-fade-in">
          <Cpu className="w-3.5 h-3.5 text-purple-400" /> Powered by Gemini 3.5 & CreatorAI Models
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7.5xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto text-white">
          The Automated Agency For <br />
          <span className="bg-gradient-to-r from-purple-primary via-cyan-primary to-pink-primary bg-clip-text text-transparent drop-shadow-sm">
            Ultimate Scale Creators
          </span>
        </h1>

        <p className="mt-6 text-slate-400 text-base sm:text-xl max-w-2.5xl mx-auto leading-relaxed">
          Deploy quantum AI to generate hyper-retaining video scripts, high-CTR thumbnail blueprints, multi-language translations, and predictive audience metrics. Zero latency. Professional caliber.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={onNavigateAuth}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-primary via-cyan-primary to-pink-primary rounded-xl font-heading font-bold text-white shadow-xl shadow-purple-500/10 hover:shadow-cyan-500/10 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            Provision Dashboard Now <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onStartTesting}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 border border-white/5 hover:border-white/10 rounded-xl font-heading font-bold text-slate-300 hover:text-white transition-all cursor-pointer text-sm"
          >
            Launch Instant Sandbox →
          </button>
        </div>

        {/* Floating UI Hero Cards Illustration */}
        <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-white/5 bg-slate-950/20 p-2 backdrop-blur-sm shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-primary/10 to-cyan-primary/10 rounded-2xl filter blur-3xl opacity-30 pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=600&q=80" 
            alt="CreatorAI Master Dashboard" 
            className="rounded-xl border border-white/10 shadow-inner w-full hover:scale-[1.01] transition-all duration-700"
          />
        </div>
      </section>

      {/* 2. TRUSTED COMPANIES LOOP */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-slate-950/40 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-mono uppercase tracking-[0.25em] text-slate-500 mb-8">
            Empowering Modern Brands & Scaled Agencies
          </p>
          
          <div className="flex overflow-hidden relative w-full select-none">
            <div className="animate-scroll-logos flex gap-16 text-slate-400 font-heading font-bold text-base md:text-xl items-center whitespace-nowrap">
              <span>● YouTube Labs</span>
              <span>● Instagram Creators</span>
              <span>● TikTok Trend Inc.</span>
              <span>● Meta Systems</span>
              <span>● Spotify Creative</span>
              <span>● Netflix Interactive</span>
              <span>● Pinterest Studios</span>
              <span>● Canva Premium</span>
              <span>● Google Partners HQ</span>

              {/* Duplicate for infinite loop */}
              <span>● YouTube Labs</span>
              <span>● Instagram Creators</span>
              <span>● TikTok Trend Inc.</span>
              <span>● Meta Systems</span>
              <span>● Spotify Creative</span>
              <span>● Netflix Interactive</span>
              <span>● Pinterest Studios</span>
              <span>● Canva Premium</span>
              <span>● Google Partners HQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Algorithmic Modules</span>
          <h2 className="font-heading text-3xl sm:text-5.5xl font-bold tracking-tight text-white mt-1">
            Engineered For Organic Retention
          </h2>
          <p className="text-slate-400 mt-4">
            We bypass standard template outputs. Harness specialized strategic models designed to capture retention, shares, and audience fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">AI Caption Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Construct high-energy, custom localized captions built for specific platform algorithms like YouTube & Instagram.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Retention Script Writer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Export professional YouTube vertical scripts and short hooks structured into psychology retention markers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 mb-6">
              <Flame className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Viral Topic Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Map category waveforms and extract content models before other agencies saturating same trends.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Dynamic Calendar Planner</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Drag-and-drop posts scheduler complete with custom status indicators, reminders, and platform tag lists.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Visual Generator Panel</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transform simple visual keywords into premium 16:9 thumbnails and cinematic assets in high-definition quality.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel p-6 rounded-2xl glass-card-hover">
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 mb-6">
              <Globe className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Multi-lingual Localizer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Generate native-level tone translations across English, Spanish, Hindi, Telugu, French, and German databases.
            </p>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE DEMO */}
      <section id="interactive-demo" className="relative z-10 py-20 px-6 max-w-7xl mx-auto bg-slate-950/20 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Context */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400">Simulation Terminal</span>
            <h2 className="font-heading text-3.5xl sm:text-4.5xl font-bold text-white">
              Instant AI Generation Output Panel
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Query the system using specific interactive hooks. In our premium dashboard, this logic connects directly to Gemini's low-latency servers to export finalized materials instantly.
            </p>

            <div className="flex flex-col gap-2">
              {[
                { id: "caption", label: "✨ Caption Scripting Engine", desc: "For TikTok & Instagram SEO hooks" },
                { id: "script", label: "🎬 High-Retention Reel Hook", desc: "For vertical shorts with rapid cuts" },
                { id: "viral-ideas", label: "💡 Peak Opportunity Waveform", desc: "To extract niche topic options" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                    activeTab === t.id 
                      ? "bg-purple-600/10 border-purple-500 text-white" 
                      : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{t.label}</span>
                    <span className="text-xs text-slate-500">{t.desc}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Live Visual Simulation */}
          <div className="glass-panel p-6 rounded-2xl relative border-white/10 shadow-2xl">
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            </div>

            <span className="font-mono text-xs text-slate-500 block mb-4">// System generation stream: Gemini 3.5</span>
            
            <div className="bg-slate-950/85 border border-white/5 rounded-xl p-5 min-h-[220px] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap relative">
              {typedText}
              {isTyping && <span className="typing-cursor font-bold text-purpe-400" />}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>🚀 Operational Rank: S-Tier</span>
              <span>Processing complete</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. STATS SUMMARY SECTION */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="text-center p-8 bg-slate-900/20 border border-white/5 rounded-2xl">
            <p className="font-heading text-5xl font-black text-white bg-gradient-to-r from-purple-primary to-cyan-primary bg-clip-text text-transparent">14,200+</p>
            <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-mono">Creators Scaled</p>
          </div>

          <div className="text-center p-8 bg-slate-900/20 border border-white/5 rounded-2xl">
            <p className="font-heading text-5xl font-black text-white bg-gradient-to-r from-cyan-primary to-pink-primary bg-clip-text text-transparent">890,450</p>
            <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-mono">Generations Conducted</p>
          </div>

          <div className="text-center p-8 bg-slate-900/20 border border-white/5 rounded-2xl">
            <p className="font-heading text-5xl font-black text-white bg-gradient-to-r from-pink-primary to-purple-primary bg-clip-text text-transparent">124%</p>
            <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-mono">Average Views Boost</p>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-heading text-2.5xl sm:text-4.5xl font-bold text-center text-white mb-12">
          Lauded by the Premium Elite
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex text-amber-400 gap-1 mb-4"><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /></div>
            <p className="text-slate-300 text-sm italic">"CreatorAI saved our startup marketing team over 40 hours last week. The vertical video hook templates are incredibly engaging and translated directly to double-digit link clicks."</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full border border-purple-500/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=40&h=40&q=80" alt="Sarah Connor" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Sarah Connor</h4>
                <p className="text-slate-500 text-xs">Growth CMO, Horizon SaaS</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex text-amber-400 gap-1 mb-4"><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /></div>
            <p className="text-slate-300 text-sm italic">"The Telugu text localizer generates incredibly authentic voice accents. We launched our channel to two Spanish markets simultaneously. Outstanding modeling caliber!"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full border border-cyan-500/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=40&h=40&q=80" alt="Ram Charan" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Ram Charan</h4>
                <p className="text-slate-500 text-xs">Director, Velo Media Hub</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex text-amber-400 gap-1 mb-4"><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /></div>
            <p className="text-slate-300 text-sm italic">"I went from 40k subscribers to 180k in 30 days. The AI script writing templates analyze trend opportunities before they peak. Essential core gear for creators!"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-full border border-pink-500/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=40&h=40&q=80" alt="Jade Peterson" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Jade Peterson</h4>
                <p className="text-slate-500 text-xs text-pink-400 font-mono">Verified Influencer VIP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING SCHEDULER MATRIX */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Subscription Plans</span>
          <h2 className="font-heading text-3xl sm:text-5.5xl font-bold tracking-tight text-white mt-1">
            Predictable SaaS Pricing
          </h2>
          <p className="text-slate-400 mt-4">
            Pick the operational capacity aligned with your content production schedule. Zero lock-in terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="glass-panel p-8 rounded-2xl relative">
            <h3 className="font-heading text-xl font-bold text-white mb-2">Free Sandbox</h3>
            <p className="text-slate-400 text-xs mb-6">Test the algorithms live with zero credentials</p>
            
            <div className="mb-6">
              <span className="text-4xl font-heading font-black text-white">$0</span>
              <span className="text-slate-500 text-xs"> / forever</span>
            </div>

            <ul className="space-y-3 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Core AI Captions Generation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> 10 text prompts daily</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Interactive Planner Workspace</li>
              <li className="flex items-center gap-2 text-slate-500"><Check className="w-4 h-4 shrink-0" /> Image generators tool access</li>
            </ul>

            <button 
              onClick={onStartTesting}
              className="w-full py-3 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 text-white font-medium text-xs transition-all cursor-pointer"
            >
              Start Testing Now
            </button>
          </div>

          {/* Plan 2: Best Value (PRO) */}
          <div className="glass-panel p-8 rounded-2xl relative border-purple-500/40 bg-[#0d1527]/70 shadow-purple-500/5 shadow-2xl">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-purple-primary to-pink-primary px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-white uppercase">
              ★ Active Pick
            </div>
            
            <h3 className="font-heading text-xl font-bold text-white mb-2">Creator Pro</h3>
            <p className="text-slate-400 text-xs mb-6">For single creators tracking viral views</p>
            
            <div className="mb-6">
              <span className="text-4xl font-gradient text-white font-heading font-black">$29</span>
              <span className="text-slate-500 text-xs"> / monthly</span>
            </div>

            <ul className="space-y-3 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Unlimited Text Generations</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Ultra-HD Image Creator Panel</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Multi-lingual Localizer translation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Predictive Telemetry and Charts</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Priority Server Streaming Mode</li>
            </ul>

            <button 
              onClick={onNavigateAuth}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-primary inside-border to-pink-primary text-white font-medium text-xs shadow-lg shadow-purple-500/10 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Unlock Pro Portals
            </button>
          </div>

          {/* Plan 3 */}
          <div className="glass-panel p-8 rounded-2xl relative">
            <h3 className="font-heading text-xl font-bold text-white mb-2">Agency Premium</h3>
            <p className="text-slate-400 text-xs mb-6">For global publishing companies</p>
            
            <div className="mb-6">
              <span className="text-4xl font-heading font-black text-white">$149</span>
              <span className="text-slate-500 text-xs"> / monthly</span>
            </div>

            <ul className="space-y-3 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Full-Suite Enterprise Access</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Multi-Seat creator synchronization</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Instant dynamic Voice Over pre-renders</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> 24x7 Dedicated account developers</li>
            </ul>

            <button 
              onClick={onNavigateAuth}
              className="w-full py-3 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 text-white font-medium text-xs transition-all cursor-pointer"
            >
              Enterprise Deployment
            </button>
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section id="faq" className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-heading text-2.5xl sm:text-4xl font-bold text-center text-white mb-10">
          Algorithmic Documentation FAQ
        </h2>

        <div className="space-y-4">
          {faqDatabase.map((faq, index) => (
            <div 
              key={index}
              className="glass-panel rounded-xl overflow-hidden border border-white/5"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-5 flex justify-between items-center bg-slate-950/20 hover:bg-slate-950/40 transition-colors cursor-pointer"
                title="Toggle FAQ Accordion"
              >
                <span className="font-heading font-medium text-sm text-slate-200">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === index && (
                <div className="p-5 border-t border-white/5 bg-slate-900/20 text-xs text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-primary to-cyan-primary rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading text-lg font-bold">CreatorAI</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Billion-dollar SaaS design architecture equipped with low-temperature Gemini 3.5 content synthesis models for global makers.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-4">Engines API</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Captions Generator</a></li>
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Visuals Creator</a></li>
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Audio Voice Pre-renders</a></li>
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Multi-language translator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-4">Integrations</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#interactive-demo" className="hover:text-purple-400 transition-colors">YouTube Video Scripts</a></li>
              <li><a href="#interactive-demo" className="hover:text-purple-400 transition-colors">Instagram Carousel Hooks</a></li>
              <li><a href="#interactive-demo" className="hover:text-purple-400 transition-colors">TikTok Viral Opportunities</a></li>
              <li><a href="#interactive-demo" className="hover:text-purple-400 transition-colors">LinkedIn Organic Loops</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-4">Workspace</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><span className="text-slate-400">Pavanipachi Ltd.</span></li>
              <li><span className="text-slate-400">pavanipachi3@gmail.com</span></li>
              <li><span className="text-slate-500 font-mono text-[10px]">Secure UTC: 2026-05-21</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <span>© 2026 CreatorAI International. All Rights Reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 transition-colors">Terms of Operations</span>
            <span className="hover:text-slate-400 transition-colors">Privacy Crypt</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
