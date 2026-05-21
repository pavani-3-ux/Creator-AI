import React, { useState } from "react";
import { 
  Calendar, Clock, Grid, Plus, Trash2, Check, 
  Sparkles, Instagram, Youtube, Twitter, Linkedin, 
  MapPin, Bell, CloudLightning, BookmarkCheck 
} from "lucide-react";
import { PlannerPost } from "../types";

// Mock Core Initial Calendar Tasks
const INITIAL_PLANNER: PlannerPost[] = [
  {
    id: "p1",
    title: "Why AI Coding is the Career of 2026",
    type: "video",
    platform: "YouTube",
    scheduledDate: "2026-05-23",
    scheduledTime: "14:00",
    status: "scheduled",
    topic: "ai careers"
  },
  {
    id: "p2",
    title: "3 Unheard secrets of Chrome DevTools",
    type: "carousel",
    platform: "Instagram",
    scheduledDate: "2026-05-24",
    scheduledTime: "18:30",
    status: "scheduled",
    topic: "productivity"
  },
  {
    id: "p3",
    title: "Scale your Express servers to 10M requests",
    type: "caption",
    platform: "LinkedIn",
    scheduledDate: "2026-05-27",
    scheduledTime: "09:15",
    status: "draft",
    topic: "system design"
  },
  {
    id: "p4",
    title: "10 CSS Tricks that look like JavaScript magic",
    type: "image",
    platform: "TikTok",
    scheduledDate: "2026-05-22",
    scheduledTime: "11:00",
    status: "published",
    topic: "web dev"
  }
];

export default function ContentPlanner() {
  const [posts, setPosts] = useState<PlannerPost[]>(INITIAL_PLANNER);
  const [filterPlatform, setFilterPlatform] = useState<string>("All");
  
  // Create New Post states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState<PlannerPost["platform"]>("Instagram");
  const [newType, setNewType] = useState<PlannerPost["type"]>("video");
  const [newDate, setNewDate] = useState("2026-05-25");
  const [newTime, setNewTime] = useState("12:00");
  const [newTopic, setNewTopic] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: PlannerPost = {
      id: "post_" + Date.now(),
      title: newTitle,
      type: newType,
      platform: newPlatform,
      scheduledDate: newDate,
      scheduledTime: newTime,
      status: "scheduled",
      topic: newTopic || "general"
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewTopic("");
    setShowAddForm(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          const nextStatus: PlannerPost["status"] = 
            p.status === "draft" 
              ? "scheduled" 
              : p.status === "scheduled" 
              ? "published" 
              : "draft";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case "YouTube":
        return <Youtube className="w-4 h-4 text-rose-500" />;
      case "Twitter":
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case "LinkedIn":
        return <Linkedin className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  const filteredPosts = filterPlatform === "All" 
    ? posts 
    : posts.filter((p) => p.platform === filterPlatform);

  return (
    <div id="content-planner-panel" className="space-y-8 relative z-10">
      
      {/* Upper Context Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-purple-400" />
            Dynamic Editorial Calendar
          </h2>
          <p className="text-slate-400 text-sm">Organize and deploy your multiple digital campaigns seamlessly.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-gradient-to-r from-purple-primary inside-border to-cyan-primary text-white rounded-xl text-xs font-heading font-semibold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Schedule New Campaign
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreatePost} className="glass-panel p-6 rounded-2xl space-y-4 border border-purple-500/20 max-w-2xl animate-fade-in">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <CloudLightning className="w-4 h-4 text-yellow-400" /> Assemble Scheduled Task Block
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Post Title / Content Hook</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Why Node.js is faster than you think..."
                required
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Social Platform Channel</label>
              <select 
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="w-full bg-slate-900/65 border border-white/5 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-purple-500/30 font-medium"
              >
                <option value="Instagram">Instagram Profiles</option>
                <option value="YouTube">YouTube Videos</option>
                <option value="TikTok">TikTok Feed</option>
                <option value="Twitter">Twitter Threads</option>
                <option value="LinkedIn">LinkedIn Business</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Campaign Media Format</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-slate-900/65 border border-white/5 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-purple-500/30 font-medium"
              >
                <option value="video">Vertical Short (Reel/Tik)</option>
                <option value="carousel">Multi-Image Carousel</option>
                <option value="caption">Text Caption Blog</option>
                <option value="image">Single Cinematic Thumbnail</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Deployment Date</label>
              <input 
                type="date" 
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2 px-4 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Deployment Hour</label>
              <input 
                type="time" 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2 px-4 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] font-mono text-slate-400 tracking-wider block mb-1">Creative Niche Category</label>
              <input 
                type="text" 
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g., nodejs, clean code, productivity"
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2 px-4 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-white/5 bg-slate-900/40 text-slate-400 rounded-lg text-xs hover:text-white transition-colors cursor-pointer"
            >
              Cancel Block
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-gradient-to-r from-purple-primary to-cyan-primary text-white font-medium rounded-lg text-xs shadow-md shadow-purple-500/10 cursor-pointer"
            >
              Assemble Task Block
            </button>
          </div>
        </form>
      )}

      {/* Main Structural Division */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Filters Side rail */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-5 rounded-2xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-bold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-purple-400" /> Segment Filter
            </h3>

            <div className="flex flex-col gap-1">
              {["All", "Instagram", "YouTube", "TikTok", "LinkedIn"].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setFilterPlatform(plat)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-heading font-medium transition-all flex items-center justify-between cursor-pointer ${
                    filterPlatform === plat 
                      ? "bg-purple-600/10 border border-purple-500/20 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {plat !== "All" && getPlatformIcon(plat)}
                    {plat === "All" ? "All Platform Workspaces" : plat}
                  </span>
                  <span className="font-mono text-[10px] bg-slate-950/40 text-slate-500 px-1.5 py-0.5 rounded">
                    {plat === "All" ? posts.length : posts.filter((p) => p.platform === plat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action alerts panel */}
          <div className="glass-panel p-4 rounded-xl border-t-2 border-t-yellow-400/50 space-y-3">
            <div className="flex items-center gap-2 text-yellow-400">
              <Bell className="w-4 h-4 animate-bounce" />
              <h4 className="font-heading font-bold text-xs">Dynamic Realtime Alert</h4>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Instagram algorithm updates suggest keeping video hooks short (under 7 seconds) for 30% higher share metrics. Use the **Retention Script writer** tool to verify hook lengths.
            </p>
          </div>

          {/* Quick task checklist indicators */}
          <div className="glass-panel p-5 rounded-xl space-y-3">
            <h4 className="font-heading text-xs font-bold text-white flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-cyan-400" /> Task Checklist
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-purple-500/20 border border-purple-500/40 rounded flex items-center justify-center text-purple-300 font-bold">✓</span>
                <span>Audit YouTube hook metadata</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-purple-500/20 border border-purple-500/40 rounded flex items-center justify-center text-purple-300 font-bold">✓</span>
                <span>Localize draft captions to French</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-slate-950/50 border border-white/5 rounded flex items-center justify-center text-slate-500">•</span>
                <span>Select custom Neon audio thumbnail</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Card Container Feed */}
        <div className="lg:col-span-3 space-y-4">
          
          {filteredPosts.length === 0 ? (
            <div className="glass-panel p-16 rounded-2xl flex flex-col items-center justify-center text-center">
              <Calendar className="w-12 h-12 text-slate-600 mb-4 animate-pulse" />
              <p className="text-slate-300 font-heading font-bold text-base">No scheduled posts found</p>
              <p className="text-slate-500 text-xs mt-1">Select another segment layout or compile a brand new editorial block.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    post.status === "published" 
                      ? "bg-emerald-500" 
                      : post.status === "scheduled" 
                      ? "bg-purple-500" 
                      : "bg-slate-500"
                  }`} />

                  {/* Top line with platforms */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                      {getPlatformIcon(post.platform)}
                      {post.platform}
                    </span>

                    <button
                      onClick={() => handleToggleStatus(post.id)}
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer ${
                        post.status === "published" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : post.status === "scheduled" 
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                          : "bg-slate-800/60 text-slate-400 border border-white/5"
                      }`}
                      title="Click to toggle operational status"
                    >
                      {post.status}
                    </button>
                  </div>

                  {/* Context of Card */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-sm text-white leading-snug group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-mono bg-slate-900 border border-white/5 text-slate-400 px-1.5 py-0.5 rounded">
                        #{post.topic}
                      </span>
                      <span className="text-[9px] font-mono bg-purple-500/5 text-purple-300 px-1.5 py-0.5 rounded uppercase">
                        {post.type}
                      </span>
                    </div>
                  </div>

                  {/* Scheduled timings metadata */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{post.scheduledDate} @ {post.scheduledTime}</span>
                    </div>

                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-slate-600 hover:text-red-400 transition-all p-1 cursor-pointer"
                      title="Delete Scheduled Post Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
