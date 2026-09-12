"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Copy, Download, Menu, Share2, Sparkles, X } from "lucide-react";
import Image from "next/image";

const milestones = [
  { at: 10, label: "Eyes open", face: "◉‿◉" },
  { at: 25, label: "Ears online", face: "ᕙ(⇀‸↼)ᕗ" },
  { at: 50, label: "Full voltage", face: "⚡ᴗ⚡" },
  { at: 100, label: "Maximum noise", face: "✦ᴗ✦" },
];

const memeLines = ["I HEARD A MEME.", "LOUDER, INTERNET.", "SMALL CREATURE. BIG NOISE.", "THE TIMELINE NEEDED THIS."];

export default function Home() {
  const [noise, setNoise] = useState(0);
  const [burst, setBurst] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [memeText, setMemeText] = useState(memeLines[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = Number(localStorage.getItem("plimzo-noise") || 0);
    const timer = window.setTimeout(() => setNoise(Number.isFinite(saved) ? saved : 0), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const makeNoise = () => {
    const next = Math.min(noise + 1, 100);
    setNoise(next);
    localStorage.setItem("plimzo-noise", String(next));
    setBurst(Array.from({ length: 8 }, (_, i) => Date.now() + i));
    navigator.vibrate?.(24);
    window.setTimeout(() => setBurst([]), 650);
  };

  const phase = milestones.find((item) => noise < item.at) ?? milestones[3];

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const mascot = new window.Image();
    mascot.onload = () => {
      const size = 1080;
      canvas.width = size; canvas.height = size;
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#ccff16"); gradient.addColorStop(.55, "#91e80b"); gradient.addColorStop(1, "#7428d9");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "rgba(20,9,35,.12)";
      for (let i = -200; i < size; i += 140) ctx.fillRect(i, 0, 44, size);
      const ratio = Math.min(680 / mascot.width, 700 / mascot.height);
      const w = mascot.width * ratio, h = mascot.height * ratio;
      ctx.drawImage(mascot, (size - w) / 2, 260, w, h);
      ctx.textAlign = "center"; ctx.fillStyle = "#160d25"; ctx.font = "900 82px Arial Black, Arial";
      ctx.lineWidth = 18; ctx.strokeStyle = "#eaff9a";
      ctx.strokeText(memeText.toUpperCase(), size / 2, 130); ctx.fillText(memeText.toUpperCase(), size / 2, 130);
      ctx.font = "800 34px Arial"; ctx.fillText("PLIMZO  •  $PLIMZO", size / 2, 1020);
      const link = document.createElement("a"); link.download = "plimzo-meme.png"; link.href = canvas.toDataURL("image/png"); link.click();
    };
    mascot.src = "/assets/plimzo.webp";
  };

  const share = () => {
    const text = encodeURIComponent(`I made ${noise}% noise and woke up Plimzo.\n\nSmall creature. Big noise. $PLIMZO`);
    window.open(`https://x.com/intent/post?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return <main>
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Plimzo home"><span className="brand-mark">P</span><span>PLIMZO</span></a>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#story" onClick={() => setMenuOpen(false)}>Story</a><a href="#lab" onClick={() => setMenuOpen(false)}>Meme Lab</a><a href="#token" onClick={() => setMenuOpen(false)}>Token</a><button className="pill ghost" type="button" disabled>Buy soon</button>
      </div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </nav>

    <section id="top" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> A NEW CREATURE ON ROBINHOOD CHAIN</p>
        <h1>MAKE<br /><i>SOME</i><br />NOISE.</h1>
        <p className="intro">Plimzo is a tiny creature powered by memes, laughter and community noise. Every post wakes him up.</p>
        <div className="hero-actions"><button className="noise-button" onClick={makeNoise} type="button"><span>MAKE SOME NOISE</span><Sparkles size={20} /></button><button className="round-button" onClick={share} aria-label="Share on X"><Share2 /></button></div>
        <p className="microcopy">Tap it. Plimzo remembers your noise.</p>
      </div>
      <div className="mascot-stage" aria-live="polite">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="sound-word word-one">PLIM!</div><div className="sound-word word-two">ZO!</div>
        {burst.map((id, i) => <i key={id} className="spark" style={{ "--i": i } as React.CSSProperties}>✦</i>)}
        <Image priority width={900} height={974} className={`mascot ${burst.length ? "bounce" : ""}`} src="/assets/plimzo.webp" alt="Plimzo, a joyful lime-green creature with huge ears and a lightning tuft" />
        <div className="level-card"><div><span>YOUR NOISE</span><strong>{noise}%</strong></div><div className="meter"><i style={{ width: `${noise}%` }} /></div><small>{phase.face} &nbsp; {phase.label}</small></div>
      </div>
      <a className="scroll-cue" href="#story"><ArrowDown size={18} /> Meet the creature</a>
    </section>

    <section id="story" className="story-section">
      <div className="shell story-grid"><div className="section-number">01 / ORIGIN</div><div><p className="eyebrow purple"><span /> THE FIRST SOUND</p><h2>Born from a<br />tiny <em>plim.</em></h2></div><div className="story-copy"><p>Plimzo lived in the quietest corner of the internet—until one strange meme made a tiny sound.</p><p>“Plim.”</p><p>He followed it, found the timeline, and discovered that every laugh, post and remix made his lightning tuft glow brighter.</p></div></div>
      <div className="ticker" aria-hidden="true"><div>POST IT ✦ REMIX IT ✦ PLIM IT ✦ POST IT ✦ REMIX IT ✦ PLIM IT ✦ POST IT ✦ REMIX IT ✦ PLIM IT ✦</div></div>
    </section>

    <section id="lab" className="lab-section shell">
      <div className="lab-heading"><div className="section-number">02 / MEME LAB</div><h2>Give Plimzo<br /><em>a voice.</em></h2><p>Pick a line, generate your square meme and drop it into the timeline.</p></div>
      <div className="meme-card"><div className="meme-preview"><div className="preview-text">{memeText}</div><Image width={900} height={974} src="/assets/plimzo.webp" alt="" /><span>PLIMZO • $PLIMZO</span></div><div className="meme-controls"><label>CHOOSE THE NOISE</label><div className="choices">{memeLines.map((line) => <button key={line} className={memeText === line ? "active" : ""} onClick={() => setMemeText(line)}>{line}</button>)}</div><button className="download-button" onClick={downloadMeme}><Download size={20} /> DOWNLOAD MEME</button></div><canvas ref={canvasRef} hidden /></div>
    </section>

    <section id="token" className="token-section"><div className="shell token-grid"><div><div className="section-number light">03 / THE TOKEN</div><h2>Small creature.<br /><em>Big noise.</em></h2></div><div className="token-panel"><div><span>NAME</span><strong>PLIMZO</strong></div><div><span>TICKER</span><strong>$PLIMZO</strong></div><div><span>NETWORK</span><strong>ROBINHOOD CHAIN</strong></div><div className="contract-row"><span>CONTRACT</span><strong>COMING SOON</strong><button disabled aria-label="Contract unavailable"><Copy size={18}/></button></div></div></div></section>
    <footer className="footer shell"><div className="footer-face">P</div><div><strong>PLIMZO</strong><p>A tiny creature powered by pure community noise.</p></div><div className="disclaimer">Independent meme project. Not affiliated with Robinhood Markets, Inc.<br />No promises. Just Plimzo.</div></footer>
  </main>;
}
