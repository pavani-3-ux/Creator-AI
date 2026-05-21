import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthPanel from "./components/AuthPanel";
import DashboardLayout from "./components/DashboardLayout";
import AnalyticsPanel from "./components/AnalyticsPanel";
import AITools from "./components/AITools";
import ContentPlanner from "./components/ContentPlanner";
import { CreatorAccount, SavedProject } from "./types";

// Standard Mock Active Account
const DEV_USER_ACCOUNT: CreatorAccount = {
  name: "Pavani Pachi",
  email: "pavanipachi3@gmail.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  role: "Lead Viral Marketing Content Strategist",
  tier: "Pro",
  apiTokensUsed: 14500,
  apiTokensLimit: 100000,
};

// Standard Mock Initial Projects to populate early-experience Saved tab beautifully!
const INITIAL_ARCHIVE: SavedProject[] = [
  {
    id: "ap1",
    title: "CAPTION // Why decentralized finance is breaking boundaries",
    type: "caption",
    platform: "All",
    content: `✨ **THE DEFI EDGE**
🚀 Local banks hate this simple decentralization trick! The secret is in high-yield liquidity indexing. 👇

💡 **Strategic Takeaways:**
1️⃣ Smart contracts replace legacy notary middlemen.
2️⃣ Yield gains average 12.8% on standard crypto assets.
3️⃣ Build the node portfolio before the 2026 cycle.

🏷️ #finance #cryptotrends #SaaS #CreatorEconomy #PassiveIncome`,
    timestamp: "2026-05-21T12:00:00Z"
  },
  {
    id: "ap2",
    title: "SCRIPT // The $10,000 TypeScript Checklist",
    type: "script",
    platform: "All",
    content: `🎬 **HIGH RETENTION SCRIPT BLUEPRINT**
⏱️ Target Length: 60s

⚡ **THE HOOK (0:00 - 0:05):**
[Visual: Screen zooming in with custom neon glow overlay]
🗣️ "TypeScript is dead. Or is it? Stop building standard typings."

📈 **THE PROBLEM (0:05 - 0:20):**
🗣️ "You're writing interfaces, importing third-party modules, and getting compile-time errors. But you're missing typing safety templates."`,
    timestamp: "2026-05-21T11:45:00Z"
  }
];

export default function App() {
  // Navigation canvas state: "landing" | "auth" | "dashboard"
  const [navState, setNavState] = useState<"landing" | "auth" | "dashboard">("landing");
  
  // Dashboard Sub-navigation tabs: "overview" | "tools" | "planner" | "saved"
  const [dashboardTab, setDashboardTab] = useState<string>("overview");

  // Authentication user credentials object
  const [currentUser, setCurrentUser] = useState<CreatorAccount | null>(null);

  // Creative generated projects lists database
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(INITIAL_ARCHIVE);

  // Quick persistent loading state checks
  useEffect(() => {
    const savedSession = localStorage.getItem("creatorai_sync_user");
    if (savedSession) {
      try {
        const parsedUser = JSON.parse(savedSession) as CreatorAccount;
        setCurrentUser(parsedUser);
        setNavState("dashboard");
      } catch (err) {
        console.error("Failed to recover creator sync workspace session:", err);
      }
    }
  }, []);

  const handleAuthSuccess = (userData: { name: string; email: string; tier: "Free" | "Pro" | "Enterprise" }) => {
    const fullyProvisioned: CreatorAccount = {
      ...DEV_USER_ACCOUNT,
      name: userData.name,
      email: userData.email,
      tier: userData.tier,
    };
    setCurrentUser(fullyProvisioned);
    localStorage.setItem("creatorai_sync_user", JSON.stringify(fullyProvisioned));
    setNavState("dashboard");
  };

  const handleDeProvisionSync = () => {
    localStorage.removeItem("creatorai_sync_user");
    setCurrentUser(null);
    setNavState("landing");
  };

  const handleAddProjectToArchive = (newProj: SavedProject) => {
    setSavedProjects((prev) => [newProj, ...prev]);
    // Notify user of positive compilation
    triggerInstantToastOverlay(`🚀 Project archived to category: ${newProj.type.toUpperCase()}`);
  };

  const handleDeleteProjectFromArchive = (id: string) => {
    setSavedProjects((prev) => prev.filter((p) => p.id !== id));
    triggerInstantToastOverlay("🗑️ Archived draft deleted!");
  };

  // Real-time notification toast overlay simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerInstantToastOverlay = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#090d16] text-white font-sans selection:bg-purple-500/40 select-none">
      
      {/* 1. RENDER CONDITIONAL CORE SCREEN VIEWS */}
      {navState === "landing" && (
        <LandingPage 
          onStartTesting={() => {
            // sandbox auto portal setup logic
            setCurrentUser(DEV_USER_ACCOUNT);
            setNavState("dashboard");
            setDashboardTab("tools");
            triggerInstantToastOverlay("⚡ Developer Sandbox Portal active. Credentials not stored.");
          }}
          onNavigateAuth={() => setNavState("auth")}
        />
      )}

      {navState === "auth" && (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-slate-950/20">
          <LandingPage 
            onStartTesting={() => {}} 
            onNavigateAuth={() => {}} 
          />
          {/* Blur interface and present elegant auth overlay pane */}
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-45" />

          <div className="fixed inset-0 flex items-center justify-center -translate-y-4 p-4 z-50">
            <AuthPanel 
              onAuthSuccess={handleAuthSuccess}
              onCancel={() => setNavState("landing")}
            />
          </div>
        </div>
      )}

      {navState === "dashboard" && currentUser && (
        <DashboardLayout
          user={currentUser}
          onLogout={handleDeProvisionSync}
          activeTab={dashboardTab}
          setActiveTab={setDashboardTab}
          savedProjects={savedProjects}
          onDeleteProject={handleDeleteProjectFromArchive}
        >
          {/* Inject correct inner page according to active tab routes selection */}
          {dashboardTab === "overview" && <AnalyticsPanel />}
          {dashboardTab === "tools" && (
            <AITools 
              savedProjects={savedProjects}
              onSaveProject={handleAddProjectToArchive}
            />
          )}
          {dashboardTab === "planner" && <ContentPlanner />}
        </DashboardLayout>
      )}

      {/* 2. LIVE INTEGRATED NOTIFICATION TOAST POPUP PANEL */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border border-purple-500/20 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in bg-slate-950/85">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-xs font-mono font-medium text-purple-200">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
