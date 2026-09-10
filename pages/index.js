import { useState, useEffect } from "react";
import Head from "next/head";

const LOGO =
  "data:image/png;base64,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";

export default function Home() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") || "home";
    const valid = ["home", "servicos", "sobre", "contato"];
    if (valid.includes(hash)) setPage(hash);
  }, []);

  function go(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "#" + p);
  }

  function enviar(e) {
    e.preventDefault();
    document.getElementById("fok").style.display = "block";
    e.target.reset();
  }

  return (
    <>
      <Head>
        <title>SurveillanceTech — Tecnologia para proteger e automatizar</title>
        <meta
          name="description"
          content="Engenharia de software, ciberseguranca, automacao com IA e investigacao digital."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
      </Head>

      <style>{`
        :root {
          --bg:#0D1117; --bg2:#0A0E14; --surface:#111822; --card:#0F1620;
          --navy:#1A3B5D; --blue:#2D7DBD; --blue-hi:#4FA3E0;
          --steel:#5B6775; --ice:#E6ECF1; --muted:#8A96A4;
          --border:rgba(91,103,117,0.2); --border-b:rgba(45,125,189,0.35);
          --max:1100px;
          --font:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;
          --mono:'Courier New',Courier,monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--ice);font-family:var(--font);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        a{color:inherit;text-decoration:none}
        ul{list-style:none}
        img{display:block;max-width:100%}
        button{cursor:pointer;font-family:inherit;border:none;background:none}
        .wrap{max-width:var(--max);margin:0 auto;padding:0 36px}
        section{padding:80px 0}
        .divider{height:1px;background:var(--border);border:none}
        h1{font-size:clamp(2.6rem,5.5vw,4.2rem);font-weight:800;line-height:1.08;letter-spacing:-0.03em;color:var(--ice)}
        h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;line-height:1.15;letter-spacing:-0.02em;color:var(--ice)}
        h3{font-size:1.2rem;font-weight:700;color:var(--ice)}
        h4{font-size:1rem;font-weight:600;color:var(--ice)}
        p{color:var(--muted);line-height:1.72}
        .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--blue-hi);display:flex;align-items:center;gap:10px;margin-bottom:20px}
        .eyebrow::before{content:'';display:block;width:20px;height:1px;background:var(--blue-hi);flex-shrink:0}
        .eyebrow.center{justify-content:center}
        .eyebrow.center::before{display:none}
        header{position:sticky;top:0;z-index:100;background:rgba(10,14,20,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
        nav{max-width:var(--max);margin:0 auto;padding:0 36px;height:64px;display:flex;align-items:center;justify-content:space-between}
        .brand{display:flex;align-items:center;gap:10px;cursor:pointer}
        .brand img{height:34px;width:34px;object-fit:contain}
        .brand-name{font-size:16px;font-weight:700;letter-spacing:-0.01em}
        .brand-name em{font-style:normal;color:var(--blue-hi)}
        .navlinks{display:flex;gap:32px}
        .navlinks a{font-size:14px;font-weight:500;color:var(--steel);cursor:pointer;padding:4px 0;position:relative;transition:color .2s}
        .navlinks a:hover,.navlinks a.active{color:var(--ice)}
        .navlinks a.active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:1px;background:var(--blue-hi)}
        .btn{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;padding:11px 22px;border-radius:7px;border:1px solid transparent;transition:all .18s;white-space:nowrap;cursor:pointer}
        .btn-primary{background:var(--blue);color:#fff;border-color:var(--blue)}
        .btn-primary:hover{background:var(--blue-hi);border-color:var(--blue-hi);transform:translateY(-1px);box-shadow:0 6px 20px rgba(45,125,189,0.35)}
        .btn-ghost{background:transparent;border-color:var(--border-b);color:var(--muted)}
        .btn-ghost:hover{border-color:var(--blue-hi);color:var(--ice)}
        .btn-full{width:100%;justify-content:center}
        .hero{min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:var(--max);margin:0 auto;padding:60px 36px}
        .hero h1{margin-bottom:20px}
        .hero h1 span{color:transparent;-webkit-text-stroke:1.5px var(--blue-hi)}
        .hero-sub{font-size:1.05rem;max-width:460px;margin-bottom:36px;line-height:1.75}
        .hero-btns{display:flex;gap:12px;margin-bottom:48px}
        .hero-line{height:1px;background:var(--border);margin-bottom:28px}
        .hero-stats{display:flex;gap:40px}
        .stat-n{font-size:1.7rem;font-weight:800;color:var(--ice);line-height:1;margin-bottom:4px}
        .stat-l{font-family:var(--mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--steel)}
        .hero-vis{position:relative;display:flex;align-items:center;justify-content:center;min-height:420px}
        .hero-vis::before{content:'';position:absolute;left:0;top:10%;bottom:10%;width:1px;background:linear-gradient(to bottom,transparent,var(--border-b),transparent)}
        .coord{position:absolute;font-family:var(--mono);font-size:10px;color:var(--steel);letter-spacing:.06em}
        .coord-tl{top:8%;left:4%}
        .coord-br{bottom:8%;right:4%}
        .orbit{position:relative;width:340px;height:340px;display:flex;align-items:center;justify-content:center}
        .ring{position:absolute;border-radius:50%;border:1px solid var(--border)}
        .r1{width:100%;height:100%}
        .r2{width:68%;height:68%;border-color:var(--border-b)}
        .r3{width:38%;height:38%}
        .sweep{position:absolute;width:100%;height:100%;border-radius:50%;background:conic-gradient(from 0deg,rgba(45,125,189,0) 0%,rgba(45,125,189,0.22) 18%,rgba(45,125,189,0) 28%);animation:sw 6s linear infinite}
        @keyframes sw{to{transform:rotate(360deg)}}
        .blip{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--blue-hi);box-shadow:0 0 8px 2px rgba(79,163,224,.65)}
        .b1{top:14%;right:22%}
        .b2{bottom:22%;left:16%}
        .b3{bottom:16%;right:30%}
        .orbit img{position:relative;z-index:5;width:160px;height:160px;object-fit:contain;filter:drop-shadow(0 0 28px rgba(45,125,189,.38))}
        .scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--blue-hi),transparent);opacity:0;animation:sl 4s ease-in-out infinite 1.5s;pointer-events:none}
        @keyframes sl{0%{top:10%;opacity:0}10%{opacity:.65}90%{opacity:.65}100%{top:90%;opacity:0}}
        @media(prefers-reduced-motion:reduce){.sweep,.scanline{animation:none}}
        .strip{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:24px 0}
        .strip-in{max-width:var(--max);margin:0 auto;padding:0 36px;display:flex;align-items:center;gap:40px;flex-wrap:wrap}
        .strip-item{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--steel);white-space:nowrap}
        .strip-item i{color:var(--blue-hi);font-size:14px}
        .strip-dot{color:var(--border-b);font-size:14px;flex-shrink:0}
        .sh{margin-bottom:56px}
        .sh h2{margin-bottom:14px}
        .sh p{font-size:1rem;max-width:520px}
        .sh.center{text-align:center}
        .sh.center p{margin:0 auto}
        .svc-list{display:flex;flex-direction:column}
        .svc-row{display:grid;grid-template-columns:52px 1fr 1.1fr auto;gap:32px;align-items:start;padding:36px 0;border-bottom:1px solid var(--border);transition:opacity .2s}
        .svc-row:first-child{border-top:1px solid var(--border)}
        .svc-row:hover .svc-n{color:var(--blue-hi)}
        .svc-idx{font-family:var(--mono);font-size:11.5px;color:var(--steel);letter-spacing:.08em;padding-top:3px}
        .svc-n{font-size:1.3rem;font-weight:700;color:var(--ice);transition:color .2s}
        .svc-d{font-size:14px;color:var(--muted);line-height:1.68}
        .tags{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
        .tag{font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--blue-hi);background:rgba(45,125,189,.09);border:1px solid rgba(45,125,189,.22);padding:3px 8px;border-radius:4px}
        .split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
        .split.top{align-items:start}
        .split-text h2{margin-bottom:20px}
        .split-text p{margin-bottom:14px}
        .split-text p:last-of-type{margin-bottom:28px}
        .terminal{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:32px;position:relative;overflow:hidden}
        .terminal::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--blue-hi),transparent)}
        .tline{font-family:var(--mono);font-size:13px;color:var(--steel);margin-bottom:9px;display:flex;gap:10px}
        .tline:last-child{margin-bottom:0}
        .tp{color:var(--blue-hi);flex-shrink:0}
        .tok{color:#4ADE80;flex-shrink:0}
        .twarn{color:#FACC15;flex-shrink:0}
        .tdim{color:#3A4858}
        .vals{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .val{background:var(--card);padding:32px 24px;transition:background .2s}
        .val:hover{background:var(--surface)}
        .val-ico{width:38px;height:38px;border:1px solid var(--border-b);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--blue-hi);font-size:17px;margin-bottom:18px}
        .val h4{margin-bottom:8px}
        .val p{font-size:13.5px}
        .proc-grid{display:grid;grid-template-columns:1fr 1fr}
        .proc-item{padding:36px;border-bottom:1px solid var(--border);border-right:1px solid var(--border)}
        .proc-item:nth-child(2n){border-right:none}
        .proc-item:nth-last-child(-n+2){border-bottom:none}
        .proc-n{font-size:3rem;font-weight:800;color:rgba(45,125,189,.11);line-height:1;margin-bottom:10px}
        .proc-item h4{margin-bottom:8px}
        .proc-item p{font-size:14px}
        .cta-wrap{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .cta-in{display:grid;grid-template-columns:1fr auto;gap:56px;align-items:center;padding:72px 0}
        .cta-in h2{margin-bottom:10px}
        .cta-in p{max-width:460px}
        .cta-btns{display:flex;flex-direction:column;gap:10px;flex-shrink:0}
        .page-top{padding:72px 0 56px;border-bottom:1px solid var(--border)}
        .page-top h1{font-size:clamp(2rem,4.5vw,3.4rem);margin-bottom:18px}
        .page-top p{font-size:1.05rem;max-width:520px}
        .svc-block{display:grid;grid-template-columns:260px 1fr;gap:72px;padding:64px 0;border-bottom:1px solid var(--border);align-items:start}
        .svc-block:last-child{border-bottom:none}
        .svc-side .svc-idx{display:block;margin-bottom:10px}
        .svc-side h3{font-size:1.5rem;margin-bottom:14px}
        .svc-side p{font-size:14px;margin-bottom:22px}
        .feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px}
        .feat{padding:22px;background:var(--surface);border:1px solid var(--border);border-radius:8px}
        .feat h4{font-size:.92rem;margin-bottom:7px}
        .feat p{font-size:13px}
        .tech{display:flex;flex-wrap:wrap;gap:7px}
        .price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .price-card{background:var(--card);padding:32px 26px;display:flex;flex-direction:column;position:relative}
        .price-card.featured{background:var(--surface)}
        .price-badge{position:absolute;top:18px;right:18px;font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--blue-hi);border:1px solid var(--border-b);padding:3px 8px;border-radius:4px}
        .price-card h3{margin-bottom:6px}
        .price-sub{font-size:13px;margin-bottom:24px}
        .price-val{font-size:1.8rem;font-weight:800;color:var(--ice);line-height:1;margin-bottom:3px}
        .price-val span{font-size:13px;font-weight:400;color:var(--steel)}
        .price-list{flex:1;margin:22px 0;display:flex;flex-direction:column;gap:11px}
        .price-list li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:var(--muted)}
        .price-list li i{color:var(--blue-hi);margin-top:3px;flex-shrink:0}
        .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .team-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:28px 20px;text-align:center}
        .avatar{width:68px;height:68px;border-radius:50%;border:1px solid var(--border-b);background:linear-gradient(135deg,var(--navy),var(--card));display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;margin:0 auto 14px}
        .team-card h4{font-size:.95rem;margin-bottom:3px}
        .team-role{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--blue-hi)}
        .timeline{padding-left:26px;border-left:1px solid var(--border)}
        .tl-item{padding-bottom:32px;position:relative}
        .tl-item:last-child{padding-bottom:0}
        .tl-item::before{content:'';position:absolute;left:-31px;top:4px;width:8px;height:8px;border-radius:50%;border:1.5px solid var(--blue-hi);background:var(--bg)}
        .tl-year{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;color:var(--blue-hi);margin-bottom:7px;display:block}
        .tl-item h4{margin-bottom:5px}
        .tl-item p{font-size:14px;max-width:440px}
        .contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:56px;align-items:start}
        .cinfo{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .cinfo-row{padding:22px 26px;border-bottom:1px solid var(--border)}
        .cinfo-row:last-child{border-bottom:none}
        .cinfo-row .eyebrow{margin-bottom:6px;font-size:10px}
        .cinfo-row h4{margin-bottom:3px}
        .cinfo-row p{font-size:13.5px}
        .cinfo-row a{color:var(--blue-hi)}
        .form-box{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:36px;position:relative;overflow:hidden}
        .form-box::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--blue-hi),transparent)}
        .form-box h3{margin-bottom:5px}
        .form-sub{font-size:14px;margin-bottom:26px}
        .fg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .fg .full{grid-column:1/-1}
        .field label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--steel);margin-bottom:7px}
        .field input,.field select,.field textarea{width:100%;background:var(--card);border:1px solid var(--border);border-radius:6px;padding:11px 13px;color:var(--ice);font-family:var(--font);font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;-webkit-appearance:none}
        .field textarea{min-height:110px;resize:vertical}
        .field input::placeholder,.field textarea::placeholder{color:#3A4858}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(45,125,189,.12)}
        .form-ok{display:none;margin-top:14px;font-family:var(--mono);font-size:13px;color:#4ADE80}
        footer{background:var(--bg2);border-top:1px solid var(--border);padding:64px 0 32px}
        .foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px}
        .foot-brand .brand{margin-bottom:14px}
        .foot-brand p{font-size:13.5px;max-width:250px;margin-bottom:20px}
        .social{display:flex;gap:8px}
        .social a{width:32px;height:32px;border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--steel);transition:border-color .2s,color .2s}
        .social a:hover{border-color:var(--blue-hi);color:var(--blue-hi)}
        .fcol h5{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--steel);margin-bottom:16px;font-weight:500}
        .fcol ul{display:flex;flex-direction:column;gap:11px}
        .fcol a{font-size:13.5px;color:var(--muted);transition:color .2s;cursor:pointer}
        .fcol a:hover{color:var(--ice)}
        .foot-bot{padding-top:24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
        .foot-bot span{font-family:var(--mono);font-size:11px;letter-spacing:.05em;color:var(--steel)}
        @media(max-width:900px){
          .hero{grid-template-columns:1fr;min-height:auto;padding:48px 24px}
          .hero-vis{display:none}
          .split{grid-template-columns:1fr;gap:40px}
          .vals{grid-template-columns:1fr 1fr}
          .svc-row{grid-template-columns:40px 1fr}
          .svc-d,.tags{display:none}
          .svc-block{grid-template-columns:1fr;gap:28px}
          .feat-grid{grid-template-columns:1fr}
          .price-grid{grid-template-columns:1fr}
          .team-grid{grid-template-columns:1fr 1fr}
          .foot-grid{grid-template-columns:1fr 1fr;gap:32px}
          .contact-grid{grid-template-columns:1fr}
          .cta-in{grid-template-columns:1fr;gap:28px}
          .proc-grid{grid-template-columns:1fr}
          .proc-item{border-right:none!important}
          .proc-item:nth-last-child(-n+2){border-bottom:1px solid var(--border)}
          .proc-item:last-child{border-bottom:none}
        }
        @media(max-width:580px){
          .wrap,nav{padding:0 18px}
          .navlinks{display:none}
          .vals{grid-template-columns:1fr}
          .team-grid{grid-template-columns:1fr}
          .foot-grid{grid-template-columns:1fr}
          .fg{grid-template-columns:1fr}
          .fg .full{grid-column:auto}
          .hero-btns{flex-direction:column}
          .hero-stats{gap:28px;flex-wrap:wrap}
        }
      `}</style>

      {/* HEADER */}
      <header>
        <nav>
          <div className="brand" onClick={() => go("home")}>
            <img src={LOGO} alt="SurveillanceTech" />
            <span className="brand-name">
              Surveillance<em>Tech</em>
            </span>
          </div>
          <div className="navlinks">
            <a
              className={page === "home" ? "active" : ""}
              onClick={() => go("home")}
            >
              Home
            </a>
            <a
              className={page === "servicos" ? "active" : ""}
              onClick={() => go("servicos")}
            >
              Servicos
            </a>
            <a
              className={page === "sobre" ? "active" : ""}
              onClick={() => go("sobre")}
            >
              Sobre
            </a>
            <a
              className={page === "contato" ? "active" : ""}
              onClick={() => go("contato")}
            >
              Contato
            </a>
          </div>
          <button className="btn btn-primary" onClick={() => go("contato")}>
            Falar com a equipe
          </button>
        </nav>
      </header>

      {/* HOME */}
      {page === "home" && (
        <div>
          <div className="hero">
            <div>
              <div className="eyebrow">SurveillanceTech</div>
              <h1>
                Vigilancia e<br />
                <span>tecnologia</span>
                <br />
                que protegem.
              </h1>
              <p className="hero-sub">
                Engenharia de software, ciberseguranca e automacao com IA.
                Sistemas construidos para resistir, nao apenas funcionar.
              </p>
              <div className="hero-btns">
                <button
                  className="btn btn-primary"
                  onClick={() => go("servicos")}
                >
                  <i className="ti ti-arrow-right" /> Ver servicos
                </button>
                <button className="btn btn-ghost" onClick={() => go("sobre")}>
                  Sobre nos
                </button>
              </div>
              <div className="hero-line" />
              <div className="hero-stats">
                <div>
                  <div className="stat-n">5</div>
                  <div className="stat-l">Frentes tecnicas</div>
                </div>
                <div>
                  <div className="stat-n">24/7</div>
                  <div className="stat-l">Monitoramento</div>
                </div>
                <div>
                  <div className="stat-n">BR</div>
                  <div className="stat-l">Nacional</div>
                </div>
              </div>
            </div>
            <div className="hero-vis" aria-hidden="true">
              <div className="coord coord-tl">LAT 21.17 S / LON 47.81 O</div>
              <div className="coord coord-br">SISTEMA ATIVO</div>
              <div className="orbit">
                <div className="ring r1" />
                <div className="ring r2" />
                <div className="ring r3" />
                <div className="sweep" />
                <div className="blip b1" />
                <div className="blip b2" />
                <div className="blip b3" />
                <img src={LOGO} alt="" />
              </div>
              <div className="scanline" />
            </div>
          </div>

          <div className="strip">
            <div className="strip-in">
              <div className="strip-item">
                <i className="ti ti-code" /> Engenharia de Software
              </div>
              <span className="strip-dot">·</span>
              <div className="strip-item">
                <i className="ti ti-shield-lock" /> Ciberseguranca
              </div>
              <span className="strip-dot">·</span>
              <div className="strip-item">
                <i className="ti ti-bug" /> Pentest
              </div>
              <span className="strip-dot">·</span>
              <div className="strip-item">
                <i className="ti ti-robot" /> Automacao IA
              </div>
              <span className="strip-dot">·</span>
              <div className="strip-item">
                <i className="ti ti-fingerprint" /> Investigacao Digital
              </div>
              <span className="strip-dot">·</span>
              <div className="strip-item">
                <i className="ti ti-layout-grid" /> Webdesign
              </div>
            </div>
          </div>

          <section>
            <div className="wrap">
              <div className="sh">
                <div className="eyebrow">O que fazemos</div>
                <h2>Cinco frentes. Uma operacao.</h2>
              </div>
              <div className="svc-list">
                <div className="svc-row">
                  <div className="svc-idx">01</div>
                  <div className="svc-n">Engenharia de Software</div>
                  <div className="svc-d">
                    Desenvolvimento full stack sob medida. Web, APIs e sistemas
                    internos com arquitetura solida e codigo limpo.
                  </div>
                  <div className="tags">
                    <span className="tag">Full Stack</span>
                    <span className="tag">APIs</span>
                    <span className="tag">Cloud</span>
                  </div>
                </div>
                <div className="svc-row">
                  <div className="svc-idx">02</div>
                  <div className="svc-n">Ciberseguranca e Pentest</div>
                  <div className="svc-d">
                    Testes de invasao controlados e auditoria de
                    vulnerabilidades. Encontramos a brecha antes de quem vai
                    explorar.
                  </div>
                  <div className="tags">
                    <span className="tag">OWASP</span>
                    <span className="tag">Red Team</span>
                  </div>
                </div>
                <div className="svc-row">
                  <div className="svc-idx">03</div>
                  <div className="svc-n">Automacao com IA</div>
                  <div className="svc-d">
                    Agentes, LLMs e RPA aplicados ao seu negocio. Processos que
                    rodam sozinhos com inteligencia real.
                  </div>
                  <div className="tags">
                    <span className="tag">LLMs</span>
                    <span className="tag">RPA</span>
                  </div>
                </div>
                <div className="svc-row">
                  <div className="svc-idx">04</div>
                  <div className="svc-n">Investigacao Digital</div>
                  <div className="svc-d">
                    Pericia forense computacional com cadeia de custodia
                    preservada. Do incidente ao laudo tecnico.
                  </div>
                  <div className="tags">
                    <span className="tag">Forense</span>
                  </div>
                </div>
                <div className="svc-row">
                  <div className="svc-idx">05</div>
                  <div className="svc-n">Webdesign</div>
                  <div className="svc-d">
                    Interfaces que comunicam credibilidade. Design orientado a
                    conversao com identidade visual consistente.
                  </div>
                  <div className="tags">
                    <span className="tag">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider" />

          <section>
            <div className="wrap">
              <div className="split">
                <div className="split-text">
                  <div className="eyebrow">Nossa filosofia</div>
                  <h2>Seguranca nao e etapa final. E o ponto de partida.</h2>
                  <p>
                    Todo sistema que construimos parte do principio de que ele
                    sera atacado. Conhecemos as tecnicas de quem ataca, entao
                    projetamos a defesa antes do primeiro deploy.
                  </p>
                  <p>
                    Essa visao dupla de engenheiro e adversario e o que
                    diferencia o nosso trabalho.
                  </p>
                  <button className="btn btn-ghost" onClick={() => go("sobre")}>
                    Conheca a empresa
                  </button>
                </div>
                <div className="terminal">
                  <div className="tline">
                    <span className="tp">$</span>
                    <span>threat_scan --target producao</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>firewall rules validadas</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>SSL/TLS A+ confirmado</span>
                  </div>
                  <div className="tline">
                    <span className="twarn">!!</span>
                    <span>/api/users sem rate limit</span>
                  </div>
                  <div className="tline">
                    <span className="tp">$</span>
                    <span>patch --fix CVE-2026-0417</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>publicado sem downtime</span>
                  </div>
                  <div className="tline tdim">
                    <span>proximo scan em 23h 58min</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider" />

          <section>
            <div className="wrap">
              <div className="sh center">
                <div className="eyebrow center">Valores</div>
                <h2>O que guia cada decisao tecnica</h2>
              </div>
              <div className="vals">
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-eye" />
                  </div>
                  <h4>Vigilancia proativa</h4>
                  <p>
                    Antecipamos riscos antes de virarem incidentes. Seguranca e
                    habito, nao etapa.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-code" />
                  </div>
                  <h4>Integridade tecnica</h4>
                  <p>
                    Codigo documentado, testado e auditavel. O que funciona na
                    demo funciona em producao.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-bolt" />
                  </div>
                  <h4>Automacao com proposito</h4>
                  <p>
                    Automatizamos o que libera tempo e reduz erro humano. Nao
                    tecnologia pela tecnologia.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-file-description" />
                  </div>
                  <h4>Comunicacao direta</h4>
                  <p>
                    Relatorios claros, sem jargao desnecessario. Voce sabe
                    exatamente o que foi entregue.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider" />

          <section>
            <div className="wrap">
              <div className="sh">
                <div className="eyebrow">Metodo</div>
                <h2>Como trabalhamos</h2>
              </div>
              <div className="proc-grid">
                <div className="proc-item">
                  <div className="proc-n">01</div>
                  <h4>Diagnostico</h4>
                  <p>
                    Mapeamos a operacao, identificamos riscos e oportunidades
                    antes de propor qualquer solucao.
                  </p>
                </div>
                <div className="proc-item">
                  <div className="proc-n">02</div>
                  <h4>Arquitetura</h4>
                  <p>
                    Definimos a stack e os controles de seguranca antes de
                    escrever a primeira linha de codigo.
                  </p>
                </div>
                <div className="proc-item">
                  <div className="proc-n">03</div>
                  <h4>Execucao</h4>
                  <p>
                    Build iterativo com testes de seguranca desde o primeiro
                    deploy, nao so no final.
                  </p>
                </div>
                <div className="proc-item">
                  <div className="proc-n">04</div>
                  <h4>Monitoramento</h4>
                  <p>
                    Acompanhamento pos-entrega. Quando o cenario muda, reagimos
                    antes que afete a operacao.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="cta-wrap">
            <div className="wrap">
              <div className="cta-in">
                <div>
                  <h2>Vamos conversar?</h2>
                  <p>
                    O primeiro contato e um diagnostico tecnico, nao um pitch
                    comercial.
                  </p>
                </div>
                <div className="cta-btns">
                  <button
                    className="btn btn-primary"
                    onClick={() => go("contato")}
                  >
                    <i className="ti ti-arrow-right" /> Falar com a equipe
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("servicos")}
                  >
                    Ver servicos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICOS */}
      {page === "servicos" && (
        <div>
          <div className="page-top">
            <div className="wrap">
              <div className="eyebrow">Servicos</div>
              <h1>O que construimos e como defendemos.</h1>
              <p>
                Cinco frentes integradas. Engenharia e seguranca nao sao areas
                separadas no nosso trabalho.
              </p>
            </div>
          </div>
          <section>
            <div className="wrap">
              <div className="svc-block">
                <div className="svc-side">
                  <span className="svc-idx">01</span>
                  <h3>Engenharia de Software</h3>
                  <p>Full stack com arquitetura que antecipa escala e falha.</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("contato")}
                    style={{ fontSize: "13px", padding: "9px 16px" }}
                  >
                    Solicitar proposta
                  </button>
                </div>
                <div>
                  <div className="feat-grid">
                    <div className="feat">
                      <h4>Desenvolvimento web</h4>
                      <p>
                        Front e back sob medida, focado em performance e
                        manutenibilidade.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>APIs e integracoes</h4>
                      <p>
                        REST, GraphQL e microsservicos com contratos definidos e
                        documentacao completa.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Sistemas internos</h4>
                      <p>
                        Ferramentas e dashboards que o time usa no dia a dia sem
                        atrito.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Migracao de legado</h4>
                      <p>
                        Modernizacao de sistemas antigos com risco controlado e
                        zero interrupcao.
                      </p>
                    </div>
                  </div>
                  <div className="tech">
                    <span className="tag">React</span>
                    <span className="tag">Next.js</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">Python</span>
                    <span className="tag">PostgreSQL</span>
                    <span className="tag">Docker</span>
                    <span className="tag">AWS/GCP</span>
                  </div>
                </div>
              </div>
              <div className="svc-block">
                <div className="svc-side">
                  <span className="svc-idx">02</span>
                  <h3>Ciberseguranca e Pentest</h3>
                  <p>Simulamos o ataque antes que ele aconteca de verdade.</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("contato")}
                    style={{ fontSize: "13px", padding: "9px 16px" }}
                  >
                    Solicitar auditoria
                  </button>
                </div>
                <div>
                  <div className="feat-grid">
                    <div className="feat">
                      <h4>Pentest web e API</h4>
                      <p>
                        Testes baseados em OWASP Top 10 e logica de negocio da
                        sua aplicacao.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Pentest de rede</h4>
                      <p>
                        Reconhecimento e exploracao controlada de perimetros
                        internos e externos.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Hardening</h4>
                      <p>
                        Plano de remediacao priorizado por criticidade,
                        acompanhado ate a resolucao.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Red Team</h4>
                      <p>
                        Simulacao de ataque avancado com multiplos vetores para
                        testar a resposta real.
                      </p>
                    </div>
                  </div>
                  <div className="tech">
                    <span className="tag">Burp Suite</span>
                    <span className="tag">Metasploit</span>
                    <span className="tag">Nmap</span>
                    <span className="tag">Wireshark</span>
                    <span className="tag">OWASP</span>
                  </div>
                </div>
              </div>
              <div className="svc-block">
                <div className="svc-side">
                  <span className="svc-idx">03</span>
                  <h3>Automacao com IA</h3>
                  <p>
                    Processos que rodam sozinhos com inteligencia real por tras.
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("contato")}
                    style={{ fontSize: "13px", padding: "9px 16px" }}
                  >
                    Explorar opcoes
                  </button>
                </div>
                <div>
                  <div className="feat-grid">
                    <div className="feat">
                      <h4>Agentes e LLMs</h4>
                      <p>
                        Agentes que executam tarefas complexas e tomam decisoes
                        de forma autonoma.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>RPA</h4>
                      <p>
                        Bots que operam sistemas legados, planilhas e fluxos
                        internos sem intervencao humana.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Pipelines de dados</h4>
                      <p>
                        ETL e analise automatica do dado bruto ao insight sem
                        passos manuais no meio.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Chatbots</h4>
                      <p>
                        Interfaces conversacionais treinadas no contexto da sua
                        empresa.
                      </p>
                    </div>
                  </div>
                  <div className="tech">
                    <span className="tag">Python</span>
                    <span className="tag">LangChain</span>
                    <span className="tag">OpenAI</span>
                    <span className="tag">Anthropic</span>
                    <span className="tag">n8n</span>
                  </div>
                </div>
              </div>
              <div className="svc-block">
                <div className="svc-side">
                  <span className="svc-idx">04</span>
                  <h3>Investigacao Digital</h3>
                  <p>
                    Do incidente ao laudo tecnico com cadeia de custodia
                    preservada.
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("contato")}
                    style={{ fontSize: "13px", padding: "9px 16px" }}
                  >
                    Abrir caso
                  </button>
                </div>
                <div>
                  <div className="feat-grid">
                    <div className="feat">
                      <h4>Forense computacional</h4>
                      <p>
                        Coleta e preservacao de evidencias com integridade
                        criptografica garantida.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Analise de incidentes</h4>
                      <p>
                        Reconstrucao da timeline do ataque e mapeamento do
                        impacto real.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Analise de logs</h4>
                      <p>
                        Correlacao de eventos e rastreamento de comportamento
                        anomalo em SIEMs.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Laudos tecnicos</h4>
                      <p>
                        Documentacao pericial compativel com uso juridico e
                        seguradoras.
                      </p>
                    </div>
                  </div>
                  <div className="tech">
                    <span className="tag">Autopsy</span>
                    <span className="tag">Volatility</span>
                    <span className="tag">Wireshark</span>
                    <span className="tag">Splunk</span>
                  </div>
                </div>
              </div>
              <div className="svc-block">
                <div className="svc-side">
                  <span className="svc-idx">05</span>
                  <h3>Webdesign</h3>
                  <p>
                    Interfaces que comunicam credibilidade antes de o usuario
                    ler qualquer texto.
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => go("contato")}
                    style={{ fontSize: "13px", padding: "9px 16px" }}
                  >
                    Iniciar projeto
                  </button>
                </div>
                <div>
                  <div className="feat-grid">
                    <div className="feat">
                      <h4>Sites institucionais</h4>
                      <p>
                        Presenca digital que representa a seriedade da sua marca
                        do primeiro ao ultimo pixel.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Design systems</h4>
                      <p>
                        Componentes reutilizaveis e documentados para produtos
                        em crescimento.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>Branding</h4>
                      <p>
                        Logo, paleta, tipografia e manual de identidade visual
                        completo.
                      </p>
                    </div>
                    <div className="feat">
                      <h4>UX e conversao</h4>
                      <p>
                        Arquitetura de informacao e fluxos orientados a
                        resultados reais.
                      </p>
                    </div>
                  </div>
                  <div className="tech">
                    <span className="tag">Figma</span>
                    <span className="tag">Tailwind</span>
                    <span className="tag">React</span>
                    <span className="tag">Framer</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <section>
            <div className="wrap">
              <div className="sh center">
                <div className="eyebrow center">Formatos</div>
                <h2>Como trabalhamos juntos</h2>
              </div>
              <div className="price-grid">
                <div className="price-card">
                  <h3>Projeto</h3>
                  <p className="price-sub">Escopo fechado, prazo definido.</p>
                  <div className="price-val">
                    Sob consulta<span> / escopo</span>
                  </div>
                  <ul className="price-list">
                    <li>
                      <i className="ti ti-check" />
                      Diagnostico inicial incluso
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Proposta tecnica detalhada
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Entrega com documentacao
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Suporte por 30 dias
                    </li>
                  </ul>
                  <button
                    className="btn btn-ghost btn-full"
                    onClick={() => go("contato")}
                  >
                    Solicitar proposta
                  </button>
                </div>
                <div className="price-card featured">
                  <div className="price-badge">Mais solicitado</div>
                  <h3>Recorrente</h3>
                  <p className="price-sub">Vigilancia e evolucao continuas.</p>
                  <div className="price-val">
                    Mensal<span> / sob consulta</span>
                  </div>
                  <ul className="price-list">
                    <li>
                      <i className="ti ti-check" />
                      Monitoramento de seguranca ativo
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Horas de desenvolvimento mensais
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Relatorios periodicos
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Prioridade no atendimento
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary btn-full"
                    onClick={() => go("contato")}
                  >
                    Falar com a equipe
                  </button>
                </div>
                <div className="price-card">
                  <h3>Enterprise</h3>
                  <p className="price-sub">
                    Multiplas frentes, equipe dedicada.
                  </p>
                  <div className="price-val">Customizado</div>
                  <ul className="price-list">
                    <li>
                      <i className="ti ti-check" />
                      Equipe dedicada
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      SLA personalizado
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      Integracao com time interno
                    </li>
                    <li>
                      <i className="ti ti-check" />
                      NDA e contrato sob medida
                    </li>
                  </ul>
                  <button
                    className="btn btn-ghost btn-full"
                    onClick={() => go("contato")}
                  >
                    Conversar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SOBRE */}
      {page === "sobre" && (
        <div>
          <div className="page-top">
            <div className="wrap">
              <div className="eyebrow">Sobre nos</div>
              <h1>Tecnologia que protege. Engenharia que dura.</h1>
              <p>
                A SurveillanceTech nasceu da convicção de que seguranca e
                desenvolvimento de software sao a mesma disciplina.
              </p>
            </div>
          </div>
          <section>
            <div className="wrap">
              <div className="split">
                <div className="split-text">
                  <div className="eyebrow">Por que o suricato</div>
                  <h2>Um principio operacional, nao um mascote.</h2>
                  <p>
                    O suricato mantem vigilancia ativa em grupo. Enquanto uns
                    trabalham, outros ficam de pe, atentos ao horizonte, prontos
                    pra alertar antes que qualquer ameaca chegue perto. Nao
                    reagem. Antecipam.
                  </p>
                  <p>
                    Esse e o modo de operar da SurveillanceTech. Todo sistema
                    que entregamos foi projetado partindo da pergunta: o que
                    acontece quando isso for atacado?
                  </p>
                </div>
                <div className="terminal">
                  <div className="tline">
                    <span className="tp">init</span>
                    <span>SurveillanceTech</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>missao: proteger e automatizar</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>frentes ativas: 5 de 6</span>
                  </div>
                  <div className="tline">
                    <span className="twarn">..</span>
                    <span>automacao residencial: em breve</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>sede: Ribeirao Preto, SP</span>
                  </div>
                  <div className="tline">
                    <span className="tok">OK</span>
                    <span>cobertura: nacional</span>
                  </div>
                  <div className="tline tdim">
                    <span>sentinela ativo</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <section>
            <div className="wrap">
              <div className="sh">
                <div className="eyebrow">Valores</div>
                <h2>O que orienta cada decisao.</h2>
              </div>
              <div className="vals">
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-eye" />
                  </div>
                  <h4>Vigilancia proativa</h4>
                  <p>
                    Identificamos riscos antes de virarem problema. Seguranca e
                    habito continuo, nao checklist final.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-shield-check" />
                  </div>
                  <h4>Integridade tecnica</h4>
                  <p>
                    Entregamos o que foi combinado, documentado e testado. Sem
                    atalhos que viram divida tecnica.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-bolt" />
                  </div>
                  <h4>Automacao real</h4>
                  <p>
                    So automatizamos o que libera tempo ou reduz erro.
                    Tecnologia com razao de existir.
                  </p>
                </div>
                <div className="val">
                  <div className="val-ico">
                    <i className="ti ti-file-description" />
                  </div>
                  <h4>Transparencia total</h4>
                  <p>
                    Voce sabe o que foi feito, o que nao foi e por que. Sem
                    relatorio de 50 paginas inuteis.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <section>
            <div className="wrap">
              <div className="split top">
                <div className="split-text">
                  <div className="eyebrow">Trajetoria</div>
                  <h2>Como chegamos ate aqui.</h2>
                  <p>
                    Cada frente foi aberta quando havia dominio real sobre ela.
                    Crescimento sem atropelar qualidade.
                  </p>
                </div>
                <div className="timeline">
                  <div className="tl-item">
                    <span className="tl-year">FUNDACAO 2026</span>
                    <h4>Nucleo inicial</h4>
                    <p>
                      SurveillanceTech comeca com engenharia de software e
                      ciberseguranca como base. As duas juntas, nao separadas.
                    </p>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">EXPANSAO</span>
                    <h4>Investigacao digital e pentest</h4>
                    <p>
                      Abertura formal da frente de forense e testes de invasao
                      com metodologia propria.
                    </p>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">CONSOLIDACAO</span>
                    <h4>Automacao com IA e Webdesign</h4>
                    <p>
                      Integracao de modelos de IA nos projetos de clientes e
                      abertura da frente de design.
                    </p>
                  </div>
                  <div className="tl-item">
                    <span className="tl-year">PROXIMO PASSO</span>
                    <h4>Automacao residencial</h4>
                    <p>
                      Expansao para IoT e automacao de ambientes residenciais
                      quando o dominio tecnico estiver maduro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <section>
            <div className="wrap">
              <div className="sh center">
                <div className="eyebrow center">Equipe</div>
                <h2>Quem esta de vigia.</h2>
              </div>
              <div className="team-grid">
                <div className="team-card">
                  <div className="avatar">SW</div>
                  <h4>Software e Arquitetura</h4>
                  <div className="team-role">Engenharia Full Stack</div>
                </div>
                <div className="team-card">
                  <div className="avatar">CS</div>
                  <h4>Ciberseguranca</h4>
                  <div className="team-role">Pentest · Red Team · Forense</div>
                </div>
                <div className="team-card">
                  <div className="avatar">AI</div>
                  <h4>Automacao e IA</h4>
                  <div className="team-role">Agentes · RPA · Dados</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTATO */}
      {page === "contato" && (
        <div>
          <div className="page-top">
            <div className="wrap">
              <div className="eyebrow">Contato</div>
              <h1>Conversa tecnica. Sem pressao.</h1>
              <p>
                Descreva o projeto ou o problema. O primeiro contato e um
                diagnostico, nao uma proposta comercial.
              </p>
            </div>
          </div>
          <section>
            <div className="wrap">
              <div className="contact-grid">
                <div>
                  <div className="cinfo">
                    <div className="cinfo-row">
                      <div className="eyebrow">Email</div>
                      <h4>Contato direto</h4>
                      <p>
                        <a href="mailto:contato@surveillancetech.com.br">
                          contato@surveillancetech.com.br
                        </a>
                      </p>
                    </div>
                    <div className="cinfo-row">
                      <div className="eyebrow">WhatsApp</div>
                      <h4>Para urgencias</h4>
                      <p>
                        <a href="tel:+5516999999999">+55 (16) 99999-9999</a>
                      </p>
                    </div>
                    <div className="cinfo-row">
                      <div className="eyebrow">Onde estamos</div>
                      <h4>Ribeirao Preto, SP</h4>
                      <p>
                        Presencial na regiao. Projetos remotos em todo o Brasil.
                      </p>
                    </div>
                    <div className="cinfo-row">
                      <div className="eyebrow">Horario</div>
                      <h4>Segunda a sexta, 9h as 18h</h4>
                      <p>Emergencia 24/7 para clientes com contrato ativo.</p>
                    </div>
                  </div>
                  <div className="terminal" style={{ marginTop: "20px" }}>
                    <div className="tline">
                      <span className="tp">$</span>
                      <span>tempo_resposta --leads</span>
                    </div>
                    <div className="tline">
                      <span className="tok">OK</span>
                      <span>retorno em ate 1 dia util</span>
                    </div>
                    <div className="tline">
                      <span className="tp">$</span>
                      <span>emergencia --seguranca</span>
                    </div>
                    <div className="tline">
                      <span className="twarn">..</span>
                      <span>WhatsApp tem prioridade</span>
                    </div>
                  </div>
                </div>
                <div className="form-box">
                  <h3>Iniciar conversa</h3>
                  <p className="form-sub">
                    Quanto mais contexto voce trouxer, mais util sera o
                    diagnostico inicial.
                  </p>
                  <form className="fg" onSubmit={enviar}>
                    <div className="field">
                      <label>Nome</label>
                      <input type="text" placeholder="Seu nome" required />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="email@empresa.com"
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Telefone</label>
                      <input type="tel" placeholder="(16) 99999-9999" />
                    </div>
                    <div className="field">
                      <label>Empresa</label>
                      <input type="text" placeholder="Nome da empresa" />
                    </div>
                    <div className="field full">
                      <label>Servico</label>
                      <select>
                        <option value="">Selecione...</option>
                        <option>Engenharia de Software</option>
                        <option>Ciberseguranca e Pentest</option>
                        <option>Automacao com IA</option>
                        <option>Investigacao Digital</option>
                        <option>Webdesign</option>
                        <option>Varios servicos</option>
                        <option>Ainda nao sei</option>
                      </select>
                    </div>
                    <div className="field full">
                      <label>Contexto</label>
                      <textarea
                        placeholder="Descreva o projeto, o problema ou o que voce quer proteger."
                        required
                      />
                    </div>
                    <div className="field full">
                      <button
                        type="submit"
                        className="btn btn-primary btn-full"
                      >
                        <i className="ti ti-arrow-right" /> Enviar
                      </button>
                    </div>
                  </form>
                  <p className="form-ok" id="fok">
                    Mensagem recebida. Retornamos em ate 1 dia util.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <section>
            <div className="wrap">
              <div className="sh">
                <div className="eyebrow">Duvidas frequentes</div>
                <h2>Antes de voce perguntar.</h2>
              </div>
              <div className="svc-list">
                <div
                  className="svc-row"
                  style={{ gridTemplateColumns: "1fr 1fr", cursor: "default" }}
                >
                  <div className="svc-n" style={{ fontSize: "1rem" }}>
                    Atendem fora de Sao Paulo?
                  </div>
                  <div className="svc-d" style={{ display: "block" }}>
                    Sim. A maioria dos projetos e remota, com atendimento em
                    todo o Brasil. Presencial na regiao de Ribeirao Preto.
                  </div>
                </div>
                <div
                  className="svc-row"
                  style={{ gridTemplateColumns: "1fr 1fr", cursor: "default" }}
                >
                  <div className="svc-n" style={{ fontSize: "1rem" }}>
                    Posso contratar so o pentest?
                  </div>
                  <div className="svc-d" style={{ display: "block" }}>
                    Pode. Cada servico funciona de forma independente. Nao
                    precisa contratar mais de um para trabalhar com a gente.
                  </div>
                </div>
                <div
                  className="svc-row"
                  style={{ gridTemplateColumns: "1fr 1fr", cursor: "default" }}
                >
                  <div className="svc-n" style={{ fontSize: "1rem" }}>
                    Quanto tempo leva um projeto?
                  </div>
                  <div className="svc-d" style={{ display: "block" }}>
                    Auditorias de 1 a 3 semanas. Desenvolvimento de 3 semanas a
                    alguns meses. Prazos definidos na proposta tecnica.
                  </div>
                </div>
                <div
                  className="svc-row"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    cursor: "default",
                    borderBottom: "none",
                  }}
                >
                  <div className="svc-n" style={{ fontSize: "1rem" }}>
                    Trabalham com startups pequenas?
                  </div>
                  <div className="svc-d" style={{ display: "block" }}>
                    Sim. Seguranca e engenharia bem feitas desde o inicio custam
                    menos do que corrigir depois.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand" onClick={() => go("home")}>
                <img src={LOGO} alt="SurveillanceTech" />
                <span className="brand-name">
                  Surveillance<em>Tech</em>
                </span>
              </div>
              <p>Tecnologia para proteger e automatizar operacoes reais.</p>
              <div className="social">
                <a href="#" aria-label="LinkedIn">
                  <i className="ti ti-brand-linkedin" />
                </a>
                <a href="#" aria-label="GitHub">
                  <i className="ti ti-brand-github" />
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="ti ti-brand-instagram" />
                </a>
              </div>
            </div>
            <div className="fcol">
              <h5>Servicos</h5>
              <ul>
                <li>
                  <a onClick={() => go("servicos")}>Engenharia de Software</a>
                </li>
                <li>
                  <a onClick={() => go("servicos")}>Ciberseguranca e Pentest</a>
                </li>
                <li>
                  <a onClick={() => go("servicos")}>Automacao com IA</a>
                </li>
                <li>
                  <a onClick={() => go("servicos")}>Investigacao Digital</a>
                </li>
                <li>
                  <a onClick={() => go("servicos")}>Webdesign</a>
                </li>
              </ul>
            </div>
            <div className="fcol">
              <h5>Empresa</h5>
              <ul>
                <li>
                  <a onClick={() => go("sobre")}>Sobre nos</a>
                </li>
                <li>
                  <a onClick={() => go("sobre")}>Valores</a>
                </li>
                <li>
                  <a onClick={() => go("sobre")}>Trajetoria</a>
                </li>
                <li>
                  <a onClick={() => go("contato")}>Contato</a>
                </li>
              </ul>
            </div>
            <div className="fcol">
              <h5>Contato</h5>
              <ul>
                <li>
                  <a href="mailto:contato@surveillancetech.com.br">
                    contato@surveillancetech.com.br
                  </a>
                </li>
                <li>
                  <a href="tel:+5516999999999">+55 (16) 99999-9999</a>
                </li>
                <li>
                  <a onClick={() => go("contato")}>Ribeirao Preto, SP</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot-bot">
            <span>2026 SurveillanceTech. Todos os direitos reservados.</span>
            <span>TECNOLOGIA PARA PROTEGER E AUTOMATIZAR</span>
          </div>
        </div>
      </footer>
    </>
  );
}
