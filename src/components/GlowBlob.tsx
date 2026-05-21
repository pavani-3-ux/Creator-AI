import React from "react";

export default function GlowBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft dynamic gradient backdrops */}
      <div 
        id="blob-purple"
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-purple-600/10 glow-blob-purple blur-[120px]"
      />
      <div 
        id="blob-cyan"
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 glow-blob-cyan blur-[130px]"
      />
      <div 
        id="blob-pink"
        className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/8 glow-blob-pink blur-[110px]"
      />
      {/* Cyberpunk Scanline overlays and grids */}
      <div className="absolute inset-0 cyber-grid opacity-75" />
      <div className="absolute inset-0 cyber-grid-dense opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16]/30 via-transparent to-[#090d16]/90" />
    </div>
  );
}
