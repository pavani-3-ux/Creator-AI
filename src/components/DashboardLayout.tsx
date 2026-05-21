import React, { useState, useEffect } from "react";
import { 
  Sparkles, TrendingUp, Calendar, Cpu, LogOut, Search, 
  Bell, ChevronDown, Award, Trash2, Check, Copy, Flame,
  TrendingDown, Globe, Command, Sliders, Menu, X, ArrowUpRight
} from "lucide-react";
import { CreatorAccount, SavedProject } from "../types";

interface DashboardLayoutProps {
  user: CreatorAccount;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
  savedProjects: SavedProject[];
  onDeleteProject: (id: string) => void;
}

export default function DashboardLayout({ 
  user, onLogout, activeTab, setActiveTab, children, savedProjects, onDeleteProject
}: DashboardLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Notifications database stream
  const [notifications, setNotifications] = useState([
    { id: "n1", text: "Spanish translations index added successfully.", time: "10 mins ago", unread: true },
    { id: "n2", text: "TikTok core saturations peaking for 'Node vs Python'.", time: "2 hours ago", unread: true },
    { id: "n3", text: "Pro quota token limits auto-renewed for CreatorAI workspace.", time: "1 day ago", unread: false }
  ]);

  // Command palette keys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCmdPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const clearUnreadNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleCopyProject = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans flex relative overflow-hidden">
      
      {/* 1. FUTURISTIC BACKGROUND AND DECORATIVE DETAILS */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/20 via-transparent to-bg-dark/95 pointer-events-none z-0" />

      {/* 2. SIDEBAR - DESKTOP VIEW */}
      <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-white/5 bg-bg-dark/80 backdrop-blur-md relative z-20 h-screen py-6 px-4">
        <div className="space-y-8">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8.5 h-8.5 bg-gradient-to-tr from-purple-primary to-cyan-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-purple-500/15">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold tracking-tight text-white block">CreatorAI</span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Workspace Pro</span>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: "overview", label: "Overview Telemetry", icon: TrendingUp },
              { id: "tools", label: "Creative AI Tools", icon: Cpu },
              { id: "planner", label: "Editorial Planner", icon: Calendar },
              { id: "saved", label: "Saved Projects", icon: Award }
            ].map((item) => {
              const IconElem = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                    activeTab === item.id 
                      ? "bg-purple-600/15 border border-purple-500/20 text-white shadow-sm" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconElem className="w-4.5 h-4.5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* User profile section */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={user.avatar} alt="User Avatar" className="w-8.5 h-8.5 rounded-full border border-purple-500/35 object-cover" />
              <div>
                <span className="text-xs font-bold block text-white truncate max-w-[100px]">{user.name}</span>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{user.tier} Account</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/15 text-red-400 hover:text-white hover:bg-red-600/20 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> De-provision Sync
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR WRAPPER */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowMobileSidebar(false)} />
          <nav className="relative flex flex-col justify-between w-64 bg-bg-dark border-r border-white/5 p-6 h-full animate-fade-in">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="font-heading text-lg font-bold">CreatorAI</span>
                <button onClick={() => setShowMobileSidebar(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {[
                  { id: "overview", label: "Overview Telemetry", icon: TrendingUp },
                  { id: "tools", label: "Creative AI Tools", icon: Cpu },
                  { id: "planner", label: "Editorial Planner", icon: Calendar },
                  { id: "saved", label: "Saved Projects", icon: Award }
                ].map((item) => {
                  const IconElem = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setShowMobileSidebar(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                        activeTab === item.id 
                          ? "bg-purple-600/15 border border-purple-500/20 text-white" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <IconElem className="w-4.5 h-4.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/15 text-red-400 text-xs font-bold rounded-xl cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Clear Sync
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* 3. CORE MASTER CANVAS */}
      <div className="flex-1 flex flex-col overflow-y-auto h-screen relative z-10">
        
        {/* Top Header Navbar */}
        <header className="border-b border-white/5 bg-bg-dark/30 backdrop-blur-md sticky top-0 z-30 h-16 shrink-0">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowMobileSidebar(true)}
                className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-300 cursor-pointer"
                title="Toggle Mobile Sidebar Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative hidden sm:block w-72">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick lookup (Press ⌘K)"
                  className="w-full bg-slate-900/40 border border-white/5 focus:border-purple-500/50 rounded-xl py-2 pl-11 pr-4 text-xs text-white focus:outline-none focus:bg-slate-900/90 transition-all"
                />
              </div>
            </div>

            {/* Quota limit tracker + Alerts */}
            <div className="flex items-center gap-4">
              
              <div className="hidden md:flex items-center gap-2 pb-0.5">
                <div className="text-right">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Active API Tokens</span>
                  <span className="text-xs font-mono font-bold text-slate-300">{user.apiTokensUsed.toLocaleString()} / {user.apiTokensLimit.toLocaleString()}</span>
                </div>
                <div className="w-16 h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-primary to-cyan-primary" 
                    style={{ width: `${(user.apiTokensUsed / user.apiTokensLimit) * 100}%` }}
                  />
                </div>
              </div>

              {/* Live Alerts Bell */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) clearUnreadNotifications();
                  }}
                  className="p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer relative"
                  title="Open notification stream list"
                >
                  <Bell className="w-4 h-4" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2.5 w-80 bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-2xl z-40 animate-fade-in text-xs space-y-3.5">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h4 className="font-heading font-bold text-slate-200">Workspace Broadcast alerts</h4>
                      <button onClick={() => setNotifications([])} className="text-[10px] text-slate-500 hover:text-slate-300">Clear</button>
                    </div>
                    
                    {notifications.length === 0 ? (
                      <p className="text-slate-500 text-center py-4">No unread broadcasts</p>
                    ) : (
                      <div className="space-y-3.5 max-h-[220px] overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-2 rounded-lg bg-white/5 relative border-l-2 border-l-purple-500">
                            <p className="text-slate-200 font-medium leading-relaxed">{n.text}</p>
                            <span className="text-[9px] text-slate-500 mt-1 block">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile dropdown toggle widget */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                  title="Toggle custom profile sync menus"
                >
                  <img src={user.avatar} className="w-8 h-8 rounded-full border border-purple-500/20 object-cover" />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-950 border border-white/10 rounded-2xl p-3 shadow-2xl z-40 animate-fade-in text-xs space-y-2">
                    <div className="p-2 border-b border-white/5">
                      <span className="font-bold text-white block">{user.name}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{user.email}</span>
                    </div>

                    <button 
                      onClick={() => { setActiveTab("tools"); setShowProfileMenu(false); }}
                      className="w-full text-left p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                    >
                      Provision creative labs
                    </button>
                    <button 
                      onClick={() => { setActiveTab("overview"); setShowProfileMenu(false); }}
                      className="w-full text-left p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                    >
                      Audit billing indexes
                    </button>

                    <button 
                      onClick={() => { onLogout(); setShowProfileMenu(false); }}
                      className="w-full text-left p-2 hover:bg-red-500/10 hover:text-red-400 text-red-500 font-medium rounded-lg border-t border-white/5 mt-2 cursor-pointer"
                    >
                      Clear Sync session
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* Dynamic page content inject */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          
          {/* Conditionally render dynamic pages */}
          {activeTab === "saved" ? (
            <div id="project-saved-archive" className="space-y-6">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Award className="w-8 h-8 text-purple-400" />
                  Saved Project Archives
                </h2>
                <p className="text-slate-400 text-sm">Review, copy, and manage your custom generated creator templates safely.</p>
              </div>

              {savedProjects.length === 0 ? (
                <div className="glass-panel p-20 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Award className="w-12 h-12 text-slate-600 mb-4" />
                  <p className="text-slate-300 font-bold text-base">No archived projects found</p>
                  <p className="text-slate-500 text-xs mt-1">Open our **Creative AI Tools** menu and archive your generated drafts to build a list.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedProjects.map((p) => (
                    <div key={p.id} className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-purple-500/30 transition-all group">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/10">
                            {p.type}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {p.timestamp.split("T")[0] || "2026-05-21"}
                          </span>
                        </div>

                        <h4 className="font-heading font-medium text-sm text-white line-clamp-1 mb-3 group-hover:text-purple-300 transition-colors">
                          {p.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-4 font-mono leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-white/5 mb-4">
                          {p.content}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <button 
                          onClick={() => handleCopyProject(p.id, p.content)}
                          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy details"
                        >
                          {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedId === p.id ? "Copied" : "Copy to Clipboard"}
                        </button>

                        <button 
                          onClick={() => onDeleteProject(p.id)}
                          className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
                          title="Delete saved project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            children
          )}

        </main>
      </div>

      {/* 4. COMMAND PALETTE MODAL SCREEN */}
      {showCmdPalette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-xl w-full glass-panel-heavy p-6 rounded-2xl shadow-2xl space-y-4 border border-purple-500/30 animate-fade-in">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Command className="w-4 h-4 animate-pulse" />
              </span>
              <input 
                type="text" 
                placeholder="Search command palette tools..."
                className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowCmdPalette(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Suggested Action Modules</span>

              <div className="grid grid-cols-1 gap-1">
                {[
                  { label: "Switch to: Creative Tool Portal", route: "tools", desc: "Select and configure caption script engines" },
                  { label: "Switch to: Dynamic Analytics Graph", route: "overview", desc: "Verify organic view waves" },
                  { label: "Switch to: Scheduling Planner Calendar", route: "planner", desc: "Assemble calendar tasks list" },
                  { label: "Switch to: Saved Projects Archive", route: "saved", desc: "Copy past translated copies" }
                ].map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(cmd.route);
                      setShowCmdPalette(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-600/10 hover:border-purple-500/10 border border-transparent transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold block text-white">{cmd.label}</span>
                      <span className="text-[10px] text-slate-500">{cmd.desc}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-purple-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-mono pt-2 border-t border-white/5 flex justify-between">
              <span>Press [ESC] to abort</span>
              <span>CreatorAI Client Cmd Palette</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
