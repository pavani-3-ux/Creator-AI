import React, { useState } from "react";
import { 
  Sparkles, Video, Flame, Image as ImageIcon, MessageSquare, 
  Volume2, Globe, Sliders, Play, Copy, RefreshCw, Send, Check,
  Camera, Eye, ArrowUpRight, Award, Trash2, Cpu
} from "lucide-react";
import { SavedProject } from "../types";

interface AIToolsProps {
  onSaveProject: (project: SavedProject) => void;
  savedProjects: SavedProject[];
}

export default function AITools({ onSaveProject, savedProjects }: AIToolsProps) {
  const [activeTool, setActiveTool] = useState<"caption" | "script" | "ideas" | "thumbnail" | "chat" | "image" | "voice" | "translate">("caption");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Dynamic universal output text state
  const [generatedText, setGeneratedText] = useState(`✨ **THE SYSTEM READY**

Select one of our specialized creator engines from the side menu and configure your metadata to launch organic audience growth waveforms.`);

  // Chat conversation database
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Welcome to CreatorAI consultation cockpit! What strategy shall we analyze next?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Tool 1: Caption Generator states
  const [captionTopic, setCaptionTopic] = useState("");
  const [captionPlatform, setCaptionPlatform] = useState("Instagram");
  const [captionTone, setCaptionTone] = useState("magnetic");
  const [captionWordCount, setCaptionWordCount] = useState(150);

  // Tool 2: Script Writer states
  const [scriptTopic, setScriptTopic] = useState("");
  const [scriptDuration, setScriptDuration] = useState("60s");
  const [scriptTone, setScriptTone] = useState("engaging");

  // Tool 3: Ideas states
  const [ideasTopic, setIdeasTopic] = useState("");

  // Tool 4: Thumbnail states
  const [thumbnailTopic, setThumbnailTopic] = useState("");

  // Tool 6: Image Generator states
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("Futuristic Cinematic");
  const [imageRatio, setImageRatio] = useState("16:9");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  // Tool 7: Voice states
  const [voiceText, setVoiceText] = useState("");
  const [voiceActor, setVoiceActor] = useState("Aero Neon");
  const [voiceWaveform, setVoiceWaveform] = useState<number[]>([]);
  const [playingVoice, setPlayingVoice] = useState(false);

  // Tool 8: Translations states
  const [translateText, setTranslateText] = useState("");
  const [translateLang, setTranslateLang] = useState("Spanish");

  // General server fetch API proxy
  const triggerGeneration = async (type: string, payload: any) => {
    setLoading(true);
    setGeneratedText("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...payload })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedText(data.text);
      } else {
        setGeneratedText("❌ An algorithmic synchronization failure occurred. Please check network keys.");
      }
    } catch (err) {
      console.error(err);
      setGeneratedText("❌ Connection rejected. Simulator backing mode deployed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    const rawVal = generatedText || chatMessages[chatMessages.length - 1]?.text || "";
    navigator.clipboard.writeText(rawVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };

  const handleSaveCurrent = () => {
    const freshProj: SavedProject = {
      id: "saved_" + Date.now(),
      title: `${activeTool.toUpperCase()} // ${captionTopic || scriptTopic || ideasTopic || "Creative Prompt"}`,
      type: activeTool,
      platform: "All",
      content: generatedText,
      imageUrl: generatedImageUrl || undefined,
      timestamp: new Date().toISOString()
    };
    onSaveProject(freshProj);
  };

  // Chat submissions logic
  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user" as const, text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    const payloadQuery = chatInput;
    setChatInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "chat", customPrompt: payloadQuery })
      });
      const data = await response.json();
      if (data.success) {
        setChatMessages((prev) => [...prev, { sender: "ai", text: data.text }]);
      } else {
        setChatMessages((prev) => [...prev, { sender: "ai", text: "System consultation latency spike. Override mode deployed." }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Image Generators submission
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim()) return;
    setLoading(true);
    setGeneratedImageUrl("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt, style: imageStyle, aspectRatio: imageRatio })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedImageUrl(data.imageUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Voice submit trigger
  const handleVoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceText.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/generate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: voiceText, voice: voiceActor })
      });
      const data = await response.json();
      if (data.success) {
        setVoiceWaveform(data.waveform);
        setGeneratedText(`🎙️ **VOICEOVER PRESET RENDERED**\nVoice Profile: ${data.voice}\nTone: ${data.tone}\nPhonetic Duration: ${data.duration}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const playVoiceSimulation = () => {
    setPlayingVoice(true);
    setTimeout(() => {
      setPlayingVoice(false);
    }, 4800);
  };

  return (
    <div id="ai-creative-tools" className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
      
      {/* Side Menu Navigation */}
      <div className="lg:col-span-1 space-y-4">
        <div className="glass-panel p-4 rounded-2xl">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4 px-2 font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400 rotate-90" /> Creative Engines
          </h3>

          <div className="flex flex-col gap-1">
            {[
              { id: "caption", label: "Caption Generator", icon: Sparkles, color: "text-purple-400 bg-purple-500/5 hover:bg-purple-500/10" },
              { id: "script", label: "Retention Scripts", icon: Video, color: "text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10" },
              { id: "ideas", label: "Viral Topic Waves", icon: Flame, color: "text-pink-400 bg-pink-500/5 hover:bg-pink-500/10" },
              { id: "thumbnail", label: "Thumbnail Idea Matrix", icon: Camera, color: "text-purple-400 bg-purple-500/5 hover:bg-purple-500/10" },
              { id: "chat", label: "Strategy AI Chat", icon: MessageSquare, color: "text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10" },
              { id: "image", label: "Text-To-Image Lab", icon: ImageIcon, color: "text-pink-400 bg-pink-500/5 hover:bg-pink-500/10" },
              { id: "voice", label: "Voiceover Pre-renders", icon: Volume2, color: "text-purple-400 bg-purple-500/5 hover:bg-purple-500/10" },
              { id: "translate", label: "Multi-language Node", icon: Globe, color: "text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10" }
            ].map((tool) => {
              const IconElem = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id as any);
                    if (tool.id === "chat") {
                      // refresh generated Text
                      setGeneratedText("");
                    }
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                    activeTool === tool.id 
                      ? "bg-purple-600/15 border border-purple-500/20 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <IconElem className="w-4.5 h-4.5 shrink-0" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Configuration Input Panel */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Parameter form block */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/10">
                Configure Payload
              </span>
              <span className="text-xs font-mono text-slate-500">Node Speed: 4.8 GHz</span>
            </div>

            {/* Render form conditionally based on selected menu tool */}
            {activeTool === "caption" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Viral Capsule Topic</label>
                  <textarea 
                    value={captionTopic}
                    onChange={(e) => setCaptionTopic(e.target.value)}
                    placeholder="e.g., Why 90% of local creators fail in Web development..."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2 px-3.5 text-xs text-white focus:outline-none min-h-[90px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Algorithmic Platform</label>
                    <select 
                      value={captionPlatform}
                      onChange={(e) => setCaptionPlatform(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Instagram">Instagram Reel</option>
                      <option value="YouTube">YouTube Brief</option>
                      <option value="TikTok">TikTok Flow</option>
                      <option value="LinkedIn">LinkedIn Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Tone Delivery</label>
                    <select 
                      value={captionTone}
                      onChange={(e) => setCaptionTone(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="magnetic">Magnetic (Curious)</option>
                      <option value="authoritative">Expert (Instructional)</option>
                      <option value="unapologetic">Unapologetic (Spicy)</option>
                      <option value="humorous">Humorous (Meme Style)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Word Capacity ({captionWordCount})</label>
                  <input 
                    type="range" 
                    min={50} 
                    max={400} 
                    step={25}
                    value={captionWordCount}
                    onChange={(e) => setCaptionWordCount(Number(e.target.value))}
                    className="w-full accent-purple-500 mt-2"
                  />
                </div>
              </div>
            )}

            {activeTool === "script" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Script Objective</label>
                  <textarea 
                    value={scriptTopic}
                    onChange={(e) => setScriptTopic(e.target.value)}
                    placeholder="e.g., Explain how to earn $1k/mo in passive code assets..."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none min-h-[90px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Target Duration</label>
                    <select 
                      value={scriptDuration}
                      onChange={(e) => setScriptDuration(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="15s">15 Seconds (Hook Loop)</option>
                      <option value="60s">60 Seconds (Standard Vertical)</option>
                      <option value="3m">3 Minutes (In-Depth Topic)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Speaking Style</label>
                    <select 
                      value={scriptTone}
                      onChange={(e) => setScriptTone(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="engaging">Engaging & Upbeat</option>
                      <option value="mysterious">Mysterious & Cinematic</option>
                      <option value="technical">Highly Technical Code</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTool === "ideas" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Creator Niche / Core Category</label>
                  <input 
                    type="text"
                    value={ideasTopic}
                    onChange={(e) => setIdeasTopic(e.target.value)}
                    placeholder="e.g., decentralized finance, typescript, custom keyboards"
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 px-4 text-xs text-white focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Our viral prediction index runs a continuous web sweep to collect underrepresented hashtags, low-saturation search topics, and explosive trends.
                </p>
              </div>
            )}

            {activeTool === "thumbnail" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">YouTube Video Topic / Objective</label>
                  <input 
                    type="text"
                    value={thumbnailTopic}
                    onChange={(e) => setThumbnailTopic(e.target.value)}
                    placeholder="e.g., I built a full-stack SaaS in 24 hours"
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 px-4 text-xs text-white focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Outputs a comprehensive physical composition script specifying color contrast maps, optimal facial emotion profiles, click highlights, and arrow paths.
                </p>
              </div>
            )}

            {activeTool === "chat" && (
              <form onSubmit={handleChatSend} className="space-y-4">
                <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 h-[220px] overflow-y-auto space-y-3.5 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <span className="text-[9px] text-slate-500 font-mono mb-0.5 uppercase">
                        {msg.sender === "user" ? "You" : "CreatorAI Consultant"}
                      </span>
                      <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-purple-600/20 border border-purple-500/25 text-purple-100" 
                          : "bg-slate-900/80 border border-white/5 text-slate-200"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about marketing strategy..."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-3 pl-4 pr-12 text-xs text-white focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    title="Send chat message"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {activeTool === "image" && (
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Visual Prompt Description</label>
                  <textarea 
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="e.g., Cyberpunk workspace with holographic interfaces, low temperature dark mood, neon accents..."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none min-h-[85px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Cinematic Theme Style</label>
                    <select 
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2 text-[11px] text-white"
                    >
                      <option value="Futuristic Cinematic">Futuristic Cinematic</option>
                      <option value="Watercolor Abstract">Watercolor Abstract</option>
                      <option value="3D Vector Render">3D Vector Render</option>
                      <option value="Faux UI Wireframe">Faux UI Wireframe</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Aspect Ratio Code</label>
                    <select 
                      value={imageRatio}
                      onChange={(e) => setImageRatio(e.target.value)}
                      className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2 text-[11px] text-white"
                    >
                      <option value="16:9">Horizontal (16:9 Thumbnail)</option>
                      <option value="9:16">Vertical (9:16 Reel Asset)</option>
                      <option value="1:1">Square (1:1 Avatar)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !imagePrompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-primary inside-border to-pink-primary py-3 rounded-xl font-heading text-xs text-white font-bold tracking-wide shadow-md shadow-purple-500/10 cursor-pointer text-center"
                >
                  {loading ? "Synthesizing Pixel Array..." : "Execute Render"}
                </button>
              </form>
            )}

            {activeTool === "voice" && (
              <form onSubmit={handleVoiceSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Convert Text to Synthetic Speech</label>
                  <textarea 
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    placeholder="e.g., Welcome back to another high-retention coding capsule. Today, we scale Express."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none min-h-[90px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Synthetic Actor Profile</label>
                  <select 
                    value={voiceActor}
                    onChange={(e) => setVoiceActor(e.target.value)}
                    className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Aero Neon">Aero Neon (Crisp Male)</option>
                    <option value="Elysian Blush">Elysian Blush (Warm Female)</option>
                    <option value="Quantum Drone">Quantum Drone (Grave Artificial)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !voiceText.trim()}
                  className="w-full bg-gradient-to-r from-cyan-primary inside-border to-purple-primary py-3 rounded-xl font-heading text-xs text-white font-bold shadow-md shadow-cyan-500/10 cursor-pointer text-center"
                >
                  {loading ? "Generating Waves..." : "Pre-render Phonics"}
                </button>
              </form>
            )}

            {activeTool === "translate" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Original Script / Content</label>
                  <textarea 
                    value={translateText}
                    onChange={(e) => setTranslateText(e.target.value)}
                    placeholder="Paste the caption or video hook you want localized..."
                    className="w-full bg-slate-900/60 border border-white/5 focus:border-purple-500/50 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none min-h-[90px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Target Cultural Language Database</label>
                  <select 
                    value={translateLang}
                    onChange={(e) => setTranslateLang(e.target.value)}
                    className="w-full bg-slate-900/65 border border-white/5 rounded-xl p-2.5 text-xs text-white font-medium"
                  >
                    <option value="Spanish">Spanish Localizer (LATAM)</option>
                    <option value="Telugu">Telugu Content Node (South India)</option>
                    <option value="Hindi">Hindi Viral Accent (North India)</option>
                    <option value="French">French Cultured Tone (Europe)</option>
                    <option value="German">German Precise Flow (Europe)</option>
                  </select>
                </div>
              </div>
            )}

            {/* General submit button for non form modules */}
            {activeTool !== "image" && activeTool !== "voice" && activeTool !== "chat" && (
              <button 
                onClick={() => {
                  if (activeTool === "caption") triggerGeneration("caption", { topic: captionTopic, platform: captionPlatform, tone: captionTone, wordCount: captionWordCount });
                  else if (activeTool === "script") triggerGeneration("script", { topic: scriptTopic, duration: scriptDuration, tone: scriptTone });
                  else if (activeTool === "ideas") triggerGeneration("viral-ideas", { topic: ideasTopic });
                  else if (activeTool === "thumbnail") triggerGeneration("thumbnail", { topic: thumbnailTopic });
                  else if (activeTool === "translate") triggerGeneration("translate", { customPrompt: translateText, language: translateLang });
                }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-primary via-cyan-primary to-pink-primary py-3.5 rounded-xl font-heading text-xs text-white font-bold tracking-wide shadow-md shadow-purple-500/10 cursor-pointer text-center mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Synthesizing Waveform...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white hover:rotate-12 transition-transform" />
                    Launch Live Stream Generation
                  </>
                )}
              </button>
            )}

          </div>

          <p className="text-[10px] text-slate-600 mt-6 leading-relaxed">
            *Aistudio integration ensures active server safety parameters block unauthorized inputs.*
          </p>
        </div>

        {/* Right Output stream results */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border-white/10 relative overflow-hidden bg-[#0d1527]/40">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs font-heading font-medium text-slate-200 flex items-center gap-1.5ClassName">
                🚀 Quantum Streaming Result
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleCopyText}
                  className="p-1.5 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy content to workspace clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={handleSaveCurrent}
                  className="px-2 py-1.5 text-[10px] rounded bg-purple-600 hover:bg-purple-500 text-white font-mono font-medium transition-colors cursor-pointer"
                  title="Save current project to database"
                >
                  + Project Archive
                </button>
              </div>
            </div>

            {loading && !generatedImageUrl && !generatedText ? (
              <div className="space-y-3.5 py-4">
                <div className="h-4 bg-slate-900/60 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-slate-900/60 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-slate-900/60 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-slate-900/60 rounded animate-pulse w-2/3" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Text Generation Render */}
                {generatedText && (
                  <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-[290px] overflow-y-auto pr-2">
                    {generatedText}
                  </div>
                )}

                {/* Simulated Image Display render */}
                {activeTool === "image" && generatedImageUrl && (
                  <div className="space-y-3">
                    <div className="relative border border-white/10 rounded-xl overflow-hidden shadow-lg aspect-video w-full bg-slate-950">
                      <img src={generatedImageUrl} alt="AI synthesized thumbnail" className="object-cover w-full h-full" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ↳ Render Source: CreatorAI Unsplash Database Query Accents
                    </p>
                  </div>
                )}

                {/* Synthetic Voice Waveform Simulation */}
                {activeTool === "voice" && voiceWaveform.length > 0 && (
                  <div className="space-y-3 p-4 bg-slate-900/50 rounded-xl border border-white/5 mt-4">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest">Active Sound Frequency</span>
                    
                    <div className="h-12 flex gap-1 items-end pt-2 pb-1">
                      {voiceWaveform.map((ht, idx) => (
                        <div 
                          key={idx} 
                          className="bg-cyan-500/70 hover:bg-purple-500 transition-colors rounded-t-sm grow"
                          style={{ 
                            height: `${playingVoice ? Math.max(5, ht + (Math.sin(idx + Date.now()) * 18)) : ht}%`, 
                            transition: "height 0.1s ease" 
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button 
                        onClick={playVoiceSimulation}
                        disabled={playingVoice}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-primary to-purple-primary rounded-lg text-[11px] text-white font-bold flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] transition-transform"
                      >
                        <Play className={`w-3 h-3 ${playingVoice ? "animate-pulse text-yellow-300" : ""}`} />
                        {playingVoice ? "Playing wave..." : "Trigger Wave playback"}
                      </button>

                      <span className="text-[10px] text-slate-500 font-mono">Voice Code: Aero_2026_x</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>Security: SSL Encrypted</span>
            <span>Target Platform Mode: All Channels</span>
          </div>

        </div>

      </div>

    </div>
  );
}
