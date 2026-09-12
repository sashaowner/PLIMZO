"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, ImagePlus, Menu, RefreshCw, Share2, Sparkles, X, Zap } from "lucide-react";

const themes = [
  { name: "Acid", colors: ["#d7ff21", "#59ee65", "#7a28e8"] },
  { name: "Laser", colors: ["#ff37c7", "#754cff", "#171022"] },
  { name: "Voltage", colors: ["#22e6ff", "#9bff18", "#241249"] },
  { name: "Sunburst", colors: ["#fff720", "#ff7a18", "#7b24ef"] },
];
const lines = ["MAKE SOME NOISE", "TOO LOUD TO IGNORE", "THE TIMELINE WOKE ME", "SMALL CREATURE. BIG ENERGY.", "PLIM. POST. REPEAT."];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headline, setHeadline] = useState(lines[0]);
  const [footer, setFooter] = useState("$PLIMZO • ROBINHOOD CHAIN");
  const [theme, setTheme] = useState(0);
  const [layout, setLayout] = useState<"poster" | "closeup">("poster");
  const [background, setBackground] = useState<string | null>(null);
  const [noise, setNoise] = useState(0);
  const [burst, setBurst] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = 1080;
    canvas.width = size; canvas.height = size;
    const paint = () => {
      const colors = themes[theme].colors;
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      colors.forEach((color, i) => gradient.addColorStop(i / (colors.length - 1), color));
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, size, size);
      ctx.globalAlpha = .16; ctx.fillStyle = "#0a0610";
      for (let x = -size; x < size * 2; x += 145) { ctx.save(); ctx.translate(x, 0); ctx.rotate(-.18); ctx.fillRect(0, -200, 38, size * 1.5); ctx.restore(); }
      ctx.globalAlpha = 1;
    };
    const drawCharacter = () => {
      const mascot = new window.Image();
      mascot.onload = () => {
        const targetW = layout === "poster" ? 700 : 930;
        const ratio = targetW / mascot.width;
        const w = mascot.width * ratio, h = mascot.height * ratio;
        const x = (size - w) / 2, y = layout === "poster" ? 285 : 245;
        ctx.shadowColor = "rgba(20,0,40,.55)"; ctx.shadowBlur = 38; ctx.shadowOffsetY = 25;
        ctx.drawImage(mascot, x, y, w, h); ctx.shadowColor = "transparent";
        ctx.textAlign = "center"; ctx.lineJoin = "round";
        const fontSize = headline.length > 24 ? 64 : 82;
        ctx.font = `900 ${fontSize}px Arial Black, Arial`; ctx.lineWidth = 20; ctx.strokeStyle = "rgba(11,6,18,.92)"; ctx.fillStyle = "#f4ffdd";
        ctx.strokeText(headline.toUpperCase(), size / 2, 125, 970); ctx.fillText(headline.toUpperCase(), size / 2, 125, 970);
        ctx.font = "800 29px Arial"; ctx.letterSpacing = "3px"; ctx.fillStyle = "#f5ffcc"; ctx.strokeStyle = "#160d25"; ctx.lineWidth = 10;
        ctx.strokeText(footer.toUpperCase(), size / 2, 1022, 930); ctx.fillText(footer.toUpperCase(), size / 2, 1022, 930);
      };
      mascot.src = "/assets/plimzo.webp";
    };
    if (background) {
      const bg = new window.Image();
      bg.onload = () => {
        const scale = Math.max(size / bg.width, size / bg.height);
        const w = bg.width * scale, h = bg.height * scale;
        ctx.drawImage(bg, (size - w) / 2, (size - h) / 2, w, h);
        const wash = ctx.createLinearGradient(0, 0, 0, size); wash.addColorStop(0, "rgba(20,6,30,.28)"); wash.addColorStop(1, "rgba(25,5,45,.56)"); ctx.fillStyle = wash; ctx.fillRect(0, 0, size, size);
        drawCharacter();
      };
      bg.src = background;
    } else { paint(); drawCharacter(); }
  }, [background, footer, headline, layout, theme]);

  useEffect(() => { drawMeme(); }, [drawMeme]);

  const uploadBackground = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader(); reader.onload = () => setBackground(String(reader.result)); reader.readAsDataURL(file);
  };
  const randomize = () => { setHeadline(lines[Math.floor(Math.random() * lines.length)]); setTheme((theme + 1) % themes.length); };
  const download = () => { drawMeme(); window.setTimeout(() => { const link = document.createElement("a"); link.download = "plimzo-meme.png"; link.href = canvasRef.current?.toDataURL("image/png") ?? ""; link.click(); }, 120); };
  const makeNoise = () => { setNoise((n) => n + 1); setBurst(true); navigator.vibrate?.(25); window.setTimeout(() => setBurst(false), 560); };
  const share = () => window.open(`https://x.com/intent/post?text=${encodeURIComponent(`${headline}\n\nMade in the PLIMZO Meme Studio. $PLIMZO`)}`, "_blank", "noopener,noreferrer");

  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top"><span>P</span>PLIMZO</a>
      <div className={`navlinks ${menuOpen ? "open" : ""}`}><a href="#studio">Meme Studio</a><a href="#story">Story</a><a href="#token">Token</a><button disabled>BUY SOON</button></div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </nav>

    <section id="top" className="hero shell">
      <div className="hero-copy"><div className="status"><i/> LIVE ON THE INTERNET</div><h1>Small<br/>creature.<br/><em>Big noise.</em></h1><p>Meet Plimzo—the neon spark turning every timeline into a playground. Create something loud and send it into the feed.</p><div className="actions"><a className="primary" href="#studio"><Sparkles/> CREATE A MEME</a><button className="secondary" onClick={makeNoise}><Zap/> PLIM! <b>{noise || ""}</b></button></div></div>
      <div className={`hero-art ${burst ? "burst" : ""}`}><div className="halo"/><div className="marquee a">PLIM! • PLIM! • PLIM! •</div><div className="marquee b">MAKE SOME NOISE •</div><Image priority src="/assets/plimzo.webp" width={900} height={974} alt="Plimzo, the electric lime meme creature"/><div className="spark one">✦</div><div className="spark two">✦</div><div className="spark three">✦</div></div>
    </section>

    <section id="studio" className="studio-wrap"><div className="shell studio-head"><div><span className="kicker">PLIMZO TOOL 01</span><h2>Meme Studio</h2></div><p>Create a ready-to-post 1080×1080 meme. Use a neon theme or drop in your own image—everything stays in your browser.</p></div>
      <div className="shell studio">
        <div className="canvas-wrap"><canvas ref={canvasRef} aria-label="Live meme preview"/><div className="canvas-badge">LIVE PREVIEW</div></div>
        <div className="controls">
          <div className="field"><label htmlFor="headline">HEADLINE</label><input id="headline" maxLength={38} value={headline} onChange={(e)=>setHeadline(e.target.value)} /></div>
          <div className="field"><label htmlFor="footer">FOOTER</label><input id="footer" maxLength={42} value={footer} onChange={(e)=>setFooter(e.target.value)} /></div>
          <div className="field"><label>NEON PALETTE</label><div className="themes">{themes.map((item,i)=><button key={item.name} className={theme===i?"selected":""} onClick={()=>{setTheme(i);setBackground(null)}} aria-label={item.name} style={{background:`linear-gradient(135deg,${item.colors.join(",")})`}}/>)}</div></div>
          <div className="row"><div className="field"><label>CHARACTER</label><div className="segmented"><button className={layout==="poster"?"active":""} onClick={()=>setLayout("poster")}>FULL</button><button className={layout==="closeup"?"active":""} onClick={()=>setLayout("closeup")}>CLOSE</button></div></div><div className="field"><label>CUSTOM BACKGROUND</label><label className="upload"><ImagePlus/> UPLOAD<input type="file" accept="image/*" onChange={uploadBackground}/></label></div></div>
          {background && <button className="remove-bg" onClick={()=>setBackground(null)}>Remove uploaded background</button>}
          <div className="tool-actions"><button onClick={randomize}><RefreshCw/> RANDOMIZE</button><button onClick={share}><Share2/> SHARE ON X</button><button className="download" onClick={download}><Download/> DOWNLOAD 1080 × 1080 PNG</button></div>
          <small>No sign-up. Your uploaded image never leaves your device.</small>
        </div>
      </div>
    </section>

    <section id="story" className="story shell"><span className="kicker">WHY COME BACK?</span><div><h2>Fresh memes.<br/>Zero friction.</h2><div><p>The site is Plimzo’s community content engine: anyone can turn the mascot—or their own background—into a polished post in seconds.</p><p><strong>Create → download → post → repeat.</strong></p><p>After launch, verified token data, community templates and weekly meme challenges can plug into the same studio.</p><a href="/assets/plimzo.webp" download>DOWNLOAD TRANSPARENT PLIMZO <Download/></a></div></div></section>
    <div className="tape"><span>CREATE IT ✦ DOWNLOAD IT ✦ POST IT ✦ MAKE SOME NOISE ✦ CREATE IT ✦ DOWNLOAD IT ✦ POST IT ✦ MAKE SOME NOISE ✦</span></div>
    <section id="token" className="token shell"><div><span className="kicker">THE TOKEN</span><h2>$PLIMZO</h2><p>Pure community energy on Robinhood Chain.</p></div><dl><div><dt>NETWORK</dt><dd>ROBINHOOD CHAIN</dd></div><div><dt>CONTRACT</dt><dd>COMING SOON</dd></div><div><dt>STATUS</dt><dd>WAKING UP</dd></div></dl></section>
    <footer className="shell"><a className="brand" href="#top"><span>P</span>PLIMZO</a><p>Independent meme project. Not affiliated with Robinhood Markets, Inc.</p><b>MAKE SOME NOISE.</b></footer>
  </main>;
}
