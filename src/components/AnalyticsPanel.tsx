import React, { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { TrendingUp, Users, Video, Award, Star, ArrowUpRight, ArrowDownRight, RefreshCw, Zap, Flame, Crown } from "lucide-react";

// Mock High-Fidelity Creator Data
const CHANNELS_VIEWS_DATA = [
  { month: "Jan", YouTube: 120000, Instagram: 95000, TikTok: 230000 },
  { month: "Feb", YouTube: 155000, Instagram: 110000, TikTok: 290000 },
  { month: "Mar", YouTube: 180000, Instagram: 155000, TikTok: 420000 },
  { month: "Apr", YouTube: 240000, Instagram: 220000, TikTok: 610000 },
  { month: "May", YouTube: 310000, Instagram: 280005, TikTok: 780000 },
  { month: "Jun", YouTube: 450000, Instagram: 395000, TikTok: 1150000 },
];

const ENGAGEMENT_DATA = [
  { category: "Hooks Response", Rate: 12.4 },
  { category: "Link CTR", Rate: 8.9 },
  { category: "Comments Depth", Rate: 15.1 },
  { category: "Saves & Shares", Rate: 22.8 },
  { category: "Returning Watchers", Rate: 34.6 },
];

const AUDIENCE_PLATFORMS = [
  { name: "YouTube", value: 450000, color: "#ef4444" },
  { name: "Instagram", value: 395000, color: "#ec4899" },
  { name: "TikTok", value: 1150000, color: "#06b6d4" },
];

const RECOMMENDATIONS = [
  {
    icon: Flame,
    title: "Saturated Topic Warning",
    desc: "The topic 'AI Coding Bootcamp' is reaching peak saturation on YouTube. Pivot to 'AI Agent Devops Pipelines' which has 3.4x higher organic query indicators.",
    tier: "Pro",
    color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  },
  {
    icon: Zap,
    title: "Viral Hook Velocity Detected",
    desc: "Your recent TikTok script template achieved 78% retention in the first 5 seconds. Apply this 'Micro-Aggressive Pattern Interrupt' loop to all upcoming Instagram reels.",
    tier: "Free",
    color: "text-pink-400 border-pink-500/20 bg-pink-500/5",
  },
  {
    icon: Crown,
    title: "Audience Pipeline Goldmine",
    desc: "Spanish-speaking bloggers are indexing 12% higher comment rates on your topic. Deploy CreatorAI Multi-Language on upcoming Reels to claim local SEO spikes.",
    tier: "Enterprise",
    color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  },
];

export default function AnalyticsPanel() {
  const [selectedRange, setSelectedRange] = useState("6m");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 950);
  };

  return (
    <div id="analytics-master-panel" className="space-y-8 relative z-10">
      
      {/* Upper Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white">Quantum Analytics</h2>
          <p className="text-slate-400 text-sm">Real-time engagement telemetry mapped with dynamic predictive trends.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900/80 border border-white/5 p-1 rounded-xl">
            {(["1m", "3m", "6m"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-3 py-1.5 text-xs font-mono uppercase rounded-lg transition-all cursor-pointer ${
                  selectedRange === r 
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r === "1m" ? "30 Days" : r === "3m" ? "90 Days" : "6 Months"}
              </button>
            ))}
          </div>

          <button 
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer ${refreshing ? "animate-spin text-purple-400" : ""}`}
            title="Refresh Operational Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Stats Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest">Aggregate Velocity</h4>
            <p className="font-heading text-3.5xl font-bold text-white mt-1">1,995,005</p>
            <p className="text-slate-500 text-xs mt-1">Organic impressions across nodes</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.2%
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest">Combined Crew</h4>
            <p className="font-heading text-3.5xl font-bold text-white mt-1">112,450</p>
            <p className="text-slate-500 text-xs mt-1">Net subscribers added this cycle</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-colors" />
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center text-pink-400">
              <Video className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-pink-400 font-mono text-xs bg-pink-500/10 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3.5 h-3.5" /> -4.2%
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest">Interactive Index</h4>
            <p className="font-heading text-3.5xl font-bold text-white mt-1">19.45%</p>
            <p className="text-slate-500 text-xs mt-1">Comment-to-Impression efficiency</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5" /> top 0.2%
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest">Algorithmic Rank</h4>
            <p className="font-heading text-3.5xl font-bold text-white mt-1">S-Tier</p>
            <p className="text-slate-500 text-xs mt-1">Platform dominance indicator</p>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Combined Growth Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Cross-Platform Growth Waves</h3>
              <p className="text-slate-400 text-xs">Total video views compiled on active creator profiles</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> TikTok</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> YouTube</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Instagram</span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHANNELS_VIEWS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0d1527", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  itemStyle={{ fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="TikTok" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorTk)" />
                <Area type="monotone" dataKey="YouTube" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorYt)" />
                <Area type="monotone" dataKey="Instagram" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorIg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Platform Distribution Pie Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Platform Dominance</h3>
            <p className="text-slate-400 text-xs">Dynamic share of active viewer interactions</p>
          </div>

          <div className="h-[200px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={AUDIENCE_PLATFORMS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {AUDIENCE_PLATFORMS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0d1527", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Central Badge Overlay */}
            <div className="absolute text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Peak Pool</span>
              <p className="text-xl font-heading font-black text-white">1.69M</p>
            </div>
          </div>

          <div className="space-y-1.5 mt-2">
            {AUDIENCE_PLATFORMS.map((platform) => (
              <div key={platform.name} className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platform.color }} />
                  {platform.name}
                </span>
                <span className="font-mono text-slate-400">
                  {((platform.value / 1695000) * 100).toFixed(1)}% 
                  <span className="text-[10px] text-slate-600 ml-1">({(platform.value / 1000).toFixed(0)}k)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Engagement Metrics & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Engagement Depth Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-1">
          <h3 className="font-heading text-lg font-bold text-white mb-1">Impact Percentages</h3>
          <p className="text-slate-400 text-xs mb-6">Metrics score showing performance versus category average</p>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGAGEMENT_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0d1527", borderColor: "rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff" }}
                />
                <Bar dataKey="Rate" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                  {ENGAGEMENT_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index % 2 === 0 ? "rgba(139, 92, 246, 0.75)" : "rgba(6, 182, 212, 0.75)"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Pane */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-400 animate-pulse" />
                Audience Engine Recommendations
              </h3>
              <p className="text-slate-400 text-xs">Dynamic tips based on live category indexing</p>
            </div>
            <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
              AI Active Mode
            </span>
          </div>

          <div className="space-y-4">
            {RECOMMENDATIONS.map((rec, idx) => {
              const IconComp = rec.icon;
              return (
                <div 
                  key={idx}
                  className={`border p-4 rounded-xl flex items-start gap-4 transition-all hover:bg-white/5 ${rec.color}`}
                >
                  <div className="p-2 bg-slate-900/90 rounded-xl shrink-0 border border-white/5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-white">{rec.title}</h4>
                      <span className="text-[9px] font-mono bg-white/5 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-widest">
                        {rec.tier} Required
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
