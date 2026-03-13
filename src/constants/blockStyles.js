export const BLOCK_STYLES = {
    hdr: `
        .hdr { font-family: 'Syne', sans-serif; background: #0a0a0f; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 1000; width: 100%; box-sizing: border-box; }
        .hdr-wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
        .hdr-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .hdr-logo-mark { width: 36px; height: 36px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #fff; flex-shrink: 0; }
        .hdr-logo-text { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .hdr-nav { display: flex; align-items: center; gap: 36px; list-style: none; margin: 0; padding: 0; }
        .hdr-nav a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .hdr-nav a:hover { color: #fff; }
        .hdr-right { display: flex; align-items: center; gap: 16px; }
        .hdr-btn { background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; border: none; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; font-family: 'Syne', sans-serif; letter-spacing: 0.01em; transition: opacity 0.2s, transform 0.2s; display: inline-block; }
        .hdr-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .hdr-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hdr-hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }
        .hdr-mobile-nav { display: none; flex-direction: column; background: #0f0f18; border-top: 1px solid rgba(255,255,255,0.08); padding: 16px 32px 24px; gap: 4px; }
        .hdr-mobile-nav a { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 15px; font-weight: 500; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Syne', sans-serif; transition: color 0.2s; }
        .hdr-mobile-nav a:hover { color: #fff; }
        .hdr-mobile-btn { margin-top: 12px; text-align: center; border-bottom: none !important; border-radius: 8px; }
        @media (max-width: 768px) { .hdr-nav-wrap { display: none; } .hdr-hamburger { display: flex; } .hdr-btn:not(.hdr-mobile-btn) { display: none; } }
    `,
    hero: `
        .hero { font-family: 'Syne', sans-serif; background: #0a0a0f; min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-sizing: border-box; padding: 80px 32px; }
        .hero-bg-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .hero-orb-1 { width: 600px; height: 600px; background: rgba(99,102,241,0.18); top: -200px; left: -100px; }
        .hero-orb-2 { width: 500px; height: 500px; background: rgba(168,85,247,0.14); bottom: -150px; right: -80px; }
        .hero-orb-3 { width: 300px; height: 300px; background: rgba(236,72,153,0.1); top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .hero-wrap { max-width: 760px; text-align: center; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; border-radius: 999px; padding: 6px 18px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 32px; }
        .hero-title { font-size: clamp(48px, 7vw, 88px); font-weight: 800; color: #fff; line-height: 1.05; letter-spacing: -0.03em; margin: 0 0 24px; }
        .hero-title-gradient { background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-desc { font-family: 'DM Sans', sans-serif; font-size: 18px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 520px; margin: 0 auto 40px; font-weight: 300; }
        .hero-actions { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 56px; }
        .hero-btn-primary { background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; text-decoration: none; border-radius: 10px; padding: 14px 32px; font-size: 15px; font-weight: 700; font-family: 'Syne', sans-serif; transition: transform 0.2s, opacity 0.2s; box-shadow: 0 8px 32px rgba(99,102,241,0.35); }
        .hero-btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
        .hero-btn-secondary { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 10px; padding: 14px 28px; font-size: 15px; font-weight: 600; font-family: 'Syne', sans-serif; border: 1px solid rgba(255,255,255,0.12); transition: border-color 0.2s, color 0.2s; }
        .hero-btn-secondary:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .hero-play { width: 28px; height: 28px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        .hero-stats { display: flex; align-items: center; justify-content: center; gap: 32px; }
        .hero-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .hero-stat-num { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
        .hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
        .hero-stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
        @media (max-width: 480px) { .hero-stats { gap: 20px; } .hero-stat-num { font-size: 22px; } }
    `,
    ftr: `
        .ftr { font-family: 'Syne', sans-serif; background: #0a0a0f; border-top: 1px solid rgba(255,255,255,0.08); width: 100%; box-sizing: border-box; }
        .ftr-wrap { max-width: 1200px; margin: 0 auto; padding: 64px 32px 32px; }
        .ftr-top { display: flex; justify-content: space-between; gap: 48px; margin-bottom: 56px; flex-wrap: wrap; }
        .ftr-brand { display: flex; flex-direction: column; gap: 16px; max-width: 240px; }
        .ftr-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .ftr-logo-mark { width: 34px; height: 34px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #fff; }
        .ftr-logo-text { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .ftr-tagline { font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.35); font-size: 14px; line-height: 1.7; margin: 0; }
        .ftr-socials { display: flex; gap: 10px; }
        .ftr-social { width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 12px; font-weight: 700; transition: border-color 0.2s, color 0.2s; }
        .ftr-social:hover { border-color: rgba(99,102,241,0.5); color: #a5b4fc; }
        .ftr-links { display: flex; gap: 56px; flex-wrap: wrap; }
        .ftr-col { display: flex; flex-direction: column; gap: 12px; }
        .ftr-col-title { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
        .ftr-col a { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 14px; font-family: 'DM Sans', sans-serif; transition: color 0.2s; }
        .ftr-col a:hover { color: rgba(255,255,255,0.85); }
        .ftr-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .ftr-copy { font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.25); font-size: 13px; }
        .ftr-made { font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.2); font-size: 13px; }
        @media (max-width: 768px) { .ftr-top { flex-direction: column; } .ftr-links { gap: 32px; } .ftr-brand { max-width: 100%; } }
    `,
    cntd: `
        .cntd { font-family: 'Syne', sans-serif; background: #0a0a0f; padding: 64px 32px; display: flex; flex-direction: column; align-items: center; gap: 20px; box-sizing: border-box; }
        .cntd-label { font-size: 13px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #a5b4fc; margin: 0; }
        .cntd-wrap { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .cntd-box { display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); border-radius: 16px; padding: 24px 28px; min-width: 100px; }
        .cntd-num { font-size: 52px; font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1; background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cntd-unit { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); font-family: 'DM Sans', sans-serif; }
        .cntd-sep { font-size: 40px; font-weight: 800; color: rgba(99,102,241,0.4); line-height: 1; margin-bottom: 24px; }
        @media (max-width: 480px) { .cntd-box { min-width: 72px; padding: 16px 18px; } .cntd-num { font-size: 36px; } .cntd-sep { font-size: 28px; } }
    `,
};
