import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const C = {
  bg:          "#060606",
  bgCard:      "#111",
  bgCardHover: "#161616",
  bgInput:     "#0e0e0e",
  border:      "#222",
  borderHover: "#333",
  borderFocus: "#555",
  text:        "#ffffff",
  textSub:     "#aaa",
  textDim:     "#666",
  logo:        "#f5c518",   // IMDb-ish yellow — bold, memorable
  danger:      "#ff4444",
  success:     "#22c55e",
  warning:     "#f59e0b",
  info:        "#60a5fa",
  purple:      "#a78bfa",
};

// dept icon colors — each department gets its own visible accent
const DEPT_COLORS = {
  IT:          "#60a5fa",  // blue
  Electrical:  "#facc15",  // yellow
  Plumbing:    "#38bdf8",  // sky
  Maintenance: "#4ade80",  // green
  Cleaning:    "#f472b6",  // pink
  Network:     "#a78bfa",  // purple
  Security:    "#fb923c",  // orange
  Mess:        "#f87171",  // red
};

const STATUS_COLORS = {
  New:           "#aaa",
  Pending:       "#f59e0b",
  "In Progress": "#60a5fa",
  Resolved:      "#22c55e",
  Closed:        "#555",
};

const PRIORITY_COLORS = {
  Low:    "#555",
  Medium: "#aaa",
  High:   "#ff4444",
};

// ─────────────────────────────────────────────────────────────
// INLINE SVG ICONS — NO EMOJI, NO EXTERNAL LIB
// ─────────────────────────────────────────────────────────────
function Ico({ name, size = 16, color = C.textSub, sw = 1.5 }) {
  const p = {
    monitor:     ["M2 3h20v13H2z","M8 21h8","M12 16v5"],
    zap:         ["M13 2 3 14h9l-1 8 10-12h-9z"],
    wrench:      ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
    settings:    ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
    wind:        ["M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2","M9.6 4.6A2 2 0 1 1 11 8H2","M12.6 19.4A2 2 0 1 0 14 16H2"],
    wifi:        ["M5 12.55a11 11 0 0 1 14.08 0","M1.42 9a16 16 0 0 1 21.16 0","M8.53 16.11a6 6 0 0 1 6.95 0","M12 20h.01"],
    shield:      ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
    utensils:    ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2","M7 2v20","M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
    home:        ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"],
    file:        ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
    plus:        ["M12 5v14","M5 12h14"],
    user:        ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
    logout:      ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
    search:      ["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z","M16 16l4.5 4.5"],
    check:       ["M20 6 9 17l-5-5"],
    clock:       ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z","M12 6v6l4 2"],
    alert:       ["M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
    checkCircle: ["M22 11.08V12a10 10 0 1 1-5.93-9.14","M22 4 12 14.01l-3-3"],
    xCircle:     ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z","M15 9l-6 6","M9 9l6 6"],
    circle:      ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"],
    star:        ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
    arrowRight:  ["M5 12h14","M12 5l7 7-7 7"],
    chevDown:    ["M6 9l6 6 6-6"],
    x:           ["M18 6 6 18","M6 6l12 12"],
    inbox:       ["M22 12h-6l-2 3H10l-2-3H2","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"],
    edit:        ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
    trendUp:     ["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"],
    barChart:    ["M12 20V10","M18 20V4","M6 20v-4"],
    filter:      ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
    upload:      ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
    menu:        ["M3 12h18","M3 6h18","M3 18h18"],
  };
  const d = p[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block" }}>
      {d.map((path, i) => <path key={i} d={path} />)}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS  (all unchanged)
// ─────────────────────────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEPARTMENTS = [
  { id: "IT",          label: "IT Support",      icon: "monitor",  desc: "Software, hardware & network" },
  { id: "Electrical",  label: "Electrical",       icon: "zap",      desc: "Power, wiring & equipment" },
  { id: "Plumbing",    label: "Plumbing",         icon: "wrench",   desc: "Leaks, drainage & water supply" },
  { id: "Maintenance", label: "Maintenance",      icon: "settings", desc: "General repairs & upkeep" },
  { id: "Cleaning",    label: "Cleaning",         icon: "wind",     desc: "Housekeeping & sanitation" },
  { id: "Network",     label: "Network",          icon: "wifi",     desc: "Internet, Wi-Fi & connectivity" },
  { id: "Security",    label: "Security",         icon: "shield",   desc: "Access control & surveillance" },
  { id: "Mess",        label: "Mess / Cafeteria", icon: "utensils", desc: "Food quality & hygiene" },
];

const STATUSES   = ["New", "Pending", "In Progress", "Resolved", "Closed"];
const PRIORITIES = ["Low", "Medium", "High"];

// ─────────────────────────────────────────────────────────────
// HELPERS  (all unchanged)
// ─────────────────────────────────────────────────────────────
const getToken  = () => localStorage.getItem("resolvex_token");
const getId     = (doc) => doc?._id || doc?.id || "";
const normalize = (c)  => ({
  ...c,
  id: getId(c),
  // Keep userId as the full populated object { _id, name, email } if available
  // Only flatten to string if it's already a plain string (old complaints)
  userId: (c.userId && typeof c.userId === "object") ? c.userId : { _id: c.userId || "", name: "", email: "" },
});
const fmt       = (d)  => { if (!d) return ""; return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); };

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────
function Badge({ status, type = "status" }) {
  const color = type === "status" ? STATUS_COLORS[status] : PRIORITY_COLORS[status];
  if (!color) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 4, border: `1px solid ${color}33`, fontSize: 14, fontWeight: 500, color, letterSpacing: 0.2, whiteSpace: "nowrap" }}>
      {type === "status" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />}
      {status}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled, style = {}, type = "button" }) {
  const sz = { sm: { padding: "6px 13px", fontSize: 15 }, md: { padding: "9px 18px", fontSize: 16 }, lg: { padding: "12px 26px", fontSize: 17 } };
  const v  = {
    primary: { background: C.text, color: "#000", border: "none" },
    ghost:   { background: "transparent", color: C.textSub, border: `1px solid ${C.border}` },
    danger:  { background: "transparent", color: C.danger,  border: `1px solid ${C.border}` },
    subtle:  { background: C.bgCard,      color: C.textSub, border: `1px solid ${C.border}` },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...sz[size], ...v[variant], borderRadius: 7, fontWeight: 500, fontFamily: "inherit", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center", gap: 7, transition: "opacity 0.15s, transform 0.12s", letterSpacing: 0.1, ...style }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
    >{children}</button>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, required, options, rows }) {
  const base = { width: "100%", padding: "10px 13px", borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 16, fontFamily: "inherit", background: C.bgInput, outline: "none", color: C.text, boxSizing: "border-box", transition: "border-color 0.15s" };
  const lbl  = label ? <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: C.textSub, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}{required && <span style={{ color: C.danger }}> *</span>}</label> : null;
  const focus = e => { e.target.style.borderColor = C.borderFocus; };
  const blur  = e => { e.target.style.borderColor = C.border; };
  return (
    <div style={{ marginBottom: 15 }}>{lbl}
      {type === "select" ? (
        <select value={value} onChange={onChange} onFocus={focus} onBlur={blur} style={{ ...base, cursor: "pointer" }}>
          <option value="" style={{ background: "#111" }}>Select…</option>
          {options.map(o => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows || 4} onFocus={focus} onBlur={blur} style={{ ...base, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={focus} onBlur={blur} style={base} />
      )}
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 500 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.borderHover}`, borderRadius: 12, width: "100%", maxWidth: width, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.95)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: C.text }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 3 }}>
            <Ico name="x" size={17} color={C.textSub} />
          </button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ message, type = "success" }) {
  if (!message) return null;
  const col = { success: C.success, error: C.danger, info: C.textSub };
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, background: C.bgCard, color: col[type], padding: "12px 18px", borderRadius: 8, fontSize: 15, fontWeight: 500, border: `1px solid ${C.borderHover}`, zIndex: 9999, animation: "fadeUp 0.22s ease", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }}>
      <Ico name={type === "success" ? "check" : "x"} size={14} color={col[type]} sw={2.2} />
      {message}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NAVBAR  — top only, no sidebar
// ─────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = user
    ? user.role === "admin"
      ? [{ k: "home", label: "Home" }, { k: "admin", label: "Dashboard" }]
      : [{ k: "home", label: "Home" }, { k: "dashboard", label: "My Complaints" }, { k: "submit", label: "New Complaint" }]
    : [{ k: "home", label: "Home" }];

  return (
    <nav className="rx-nav-pad" style={{ height: 64, background: C.bg, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 500 }}>
      {/* Left side: logo + nav links — SEPARATED so clicks don't bubble */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

        {/* Logo — only this navigates to home */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, cursor: "pointer", marginRight: 14 }} onClick={() => setPage("home")}>
          <img
            src="/logo.svg"
            alt="ResolveX"
            width="36"
            height="36"
            style={{ display: "block", flexShrink: 0 }}
          />
          <span style={{ fontSize: 19, fontWeight: 700, color: C.logo, letterSpacing: 0.2, userSelect: "none" }}>ResolveX</span>
        </div>

        {/* Nav links */}
        <div className="rx-nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navLinks.map(link => (
            <button key={link.k}
              onClick={e => { e.stopPropagation(); setPage(link.k); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 6, fontSize: 16, fontWeight: 400, color: page === link.k ? C.text : C.textSub, fontFamily: "inherit", transition: "color 0.12s" }}
              onMouseEnter={e => { if (page !== link.k) e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { if (page !== link.k) e.currentTarget.style.color = C.textSub; }}>
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            {user.role !== "admin" && (
              <Btn size="sm" variant="primary" onClick={() => setPage("submit")} style={{ gap: 5 }}>
                <Ico name="plus" size={13} color="#000" sw={2} />New
              </Btn>
            )}
            <div style={{ position: "relative" }}>
              <div onClick={() => setMenuOpen(!menuOpen)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", border: `1px solid ${C.border}`, borderRadius: 7, cursor: "pointer", transition: "border-color 0.12s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{ width: 26, height: 26, borderRadius: 5, background: C.bgCardHover, border: `1px solid ${C.borderHover}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.logo }}>{user.name?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="rx-user-name" style={{ fontSize: 15, color: C.textSub }}>{user.name}</span>
                <Ico name="chevDown" size={13} color={C.textDim} />
              </div>
              {menuOpen && (
                <div style={{ position: "absolute", right: 0, top: 46, background: C.bgCard, border: `1px solid ${C.borderHover}`, borderRadius: 9, minWidth: 180, zIndex: 999, boxShadow: "0 12px 40px rgba(0,0,0,0.8)", overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{user.name}</div>
                    <div style={{ fontSize: 14, color: C.textSub, marginTop: 2 }}>{user.email}</div>
                  </div>
                  <div onClick={() => { setPage("profile"); setMenuOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 16px", cursor: "pointer", fontSize: 16, color: C.textSub, transition: "background 0.1s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.bgCardHover; e.currentTarget.style.color = C.text; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSub; }}>
                    <Ico name="user" size={14} color="currentColor" />Profile
                  </div>
                  <div onClick={() => { onLogout(); setMenuOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 16px", cursor: "pointer", fontSize: 16, color: C.textSub, transition: "background 0.1s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1a0a0a"; e.currentTarget.style.color = C.danger; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textSub; }}>
                    <Ico name="logout" size={14} color="currentColor" />Sign Out
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" variant="ghost" onClick={() => setPage("login")}>Sign In</Btn>
            <Btn size="sm" variant="primary" onClick={() => setPage("register")}>Get Started</Btn>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedDept, user }) {
  return (
    <>
      {/* SEO-friendly semantic HTML */}
      <main className="rx-hero" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 32px 96px" }}>

        {/* Hero */}
        <header style={{ marginBottom: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, border: `1px solid ${C.border}`, borderRadius: 5, padding: "4px 12px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success }} />
            <span style={{ fontSize: 13, color: C.textSub, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>⚡ Now Live — Smart Complaint Management</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 700, color: C.text, margin: "0 0 22px", letterSpacing: -3, lineHeight: 1.05, maxWidth: 740 }}>
            Resolve every issue.<br />
            <span style={{ color: C.textSub }}> Faster than ever.</span>
          </h1>
          <p style={{ fontSize: 19, color: C.textSub, maxWidth: 560, margin: "0 0 40px", lineHeight: 1.9, fontWeight: 400 }}>
            Submit complaints to the right department instantly. Track progress, get notified, and close issues fast.
          </p>
          {!user && (
            <div className="rx-hero-btns" style={{ display: "flex", gap: 12 }}>
              <Btn size="lg" variant="primary" onClick={() => setPage("register")} style={{ gap: 8 }}>
                Get started free <Ico name="arrowRight" size={15} color="#000" />
              </Btn>
              <Btn size="lg" variant="ghost" onClick={() => setPage("login")}>Sign in</Btn>
            </div>
          )}
        </header>

        {/* Stats */}
        <section aria-label="Platform statistics" className="rx-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginBottom: 140, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          {[
            { v: "1,284",    l: "Complaints resolved", color: "#38bdf8" },
            { v: "2.4 days", l: "Avg resolution time",  color: "#ff617e" },
            { v: "8",        l: "Active departments",    color: "#ff9900" },
            { v: "94%",      l: "Satisfaction rate",     color: "#4ade80" },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "26px 28px", borderRight: i < 3 ? `1px solid ${C.border}` : "none", background: C.bgCard }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color, letterSpacing: -1.2, marginBottom: 5 }}>{s.v}</div>
              <div style={{ fontSize: 15, color: C.textSub }}>{s.l}</div>
            </div>
          ))}
        </section>

        {/* Departments */}
        <section aria-label="Departments">
          <h2 style={{ fontSize: 14, fontWeight: 600, color: C.textSub, letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 18px" }}>Departments</h2>
          <div className="rx-dept" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 1, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            {DEPARTMENTS.map((dept, i) => {
              const dColor = DEPT_COLORS[dept.id];
              return (
                <div key={dept.id} onClick={() => { setSelectedDept(dept.id); setPage(user ? "submit" : "login"); }}
                  style={{ padding: "22px 20px", background: C.bgCard, cursor: "pointer", transition: "background 0.12s", borderRight: i % 4 !== 3 ? `1px solid ${C.border}` : "none", borderBottom: i < 4 ? `1px solid ${C.border}` : "none", display: "flex", flexDirection: "column", gap: 14 }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bgCardHover}
                  onMouseLeave={e => e.currentTarget.style.background = C.bgCard}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Colored icon in a subtle chip */}
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${dColor}14`, border: `1px solid ${dColor}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ico name={dept.icon} size={18} color={dColor} sw={1.8} />
                    </div>
                    <Ico name="arrowRight" size={14} color={C.textDim} sw={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 5 }}>{dept.label}</div>
                    <div style={{ fontSize: 15, color: C.textSub, lineHeight: 1.5 }}>{dept.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// AUTH PAGE  — logic unchanged
// ─────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage, onLogin }) {
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  const handleSubmit = async () => {
    if (!form.email || !form.password) return setError("All fields are required.");
    if (!isLogin && !form.name)        return setError("Name is required.");
    if (form.password.length < 6)      return setError("Password must be at least 6 characters.");
    setError(""); setLoading(true);
    try {
      const res  = await fetch(`${API}${isLogin ? "/auth/login" : "/auth/register"}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isLogin ? { email: form.email, password: form.password } : { name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Something went wrong.");
      localStorage.setItem("resolvex_token", data.token);
      const user = { id: data.user._id || data.user.id, name: data.user.name, email: data.user.email, role: data.user.role };
      onLogin(user);
      setPage(user.role === "admin" ? "admin" : "dashboard");
    } catch { setError("Cannot connect to server. Make sure the backend is running on port 5000."); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 8px", letterSpacing: -0.8 }}>
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p style={{ fontSize: 16, color: C.textSub, margin: 0 }}>
            {isLogin ? "Sign in to continue to ResolveX" : "Join ResolveX — it's free"}
          </p>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 26 }}>
          {!isLogin && <Field label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />}
          <Field label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
          <Field label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters" required />
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.danger, fontSize: 15, marginBottom: 14, padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 7 }}>
              <Ico name="alert" size={14} color={C.danger} />{error}
            </div>
          )}
          <Btn variant="primary" size="md" style={{ width: "100%", justifyContent: "center", marginTop: 6 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
          </Btn>
        </div>
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 15, color: C.textSub }}>
          {isLogin ? "No account? " : "Have an account? "}
          <span style={{ color: C.text, cursor: "pointer", textDecoration: "underline", textDecorationColor: C.border }} onClick={() => setPage(isLogin ? "register" : "login")}>
            {isLogin ? "Register" : "Sign in"}
          </span>
        </p>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBMIT COMPLAINT  — logic unchanged
// ─────────────────────────────────────────────────────────────
function SubmitComplaintPage({ user, selectedDept, setPage, showToast }) {
  const [form,      setForm]      = useState({ title: "", description: "", department: selectedDept || "", priority: "Medium", roomNo: "", block: "", contactNumber: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  // ── image upload state ──
  const [imageUrl,    setImageUrl]    = useState("");       // Cloudinary URL after upload
  const [imageFile,   setImageFile]   = useState(null);    // local File object for preview
  const [preview,     setPreview]     = useState("");       // local blob URL for preview
  const [uploading,   setUploading]   = useState(false);   // upload in progress
  const [uploadError, setUploadError] = useState("");
  const [dragOver,    setDragOver]    = useState(false);
  const fileInputRef = { current: null };

  // ── handle file selected (from input or drop) ──
  const handleFile = async (file) => {
    if (!file) return;
    if (!["image/jpeg","image/jpg","image/png","image/webp","image/gif"].includes(file.type)) {
      setUploadError("Only JPG, PNG, WEBP or GIF images allowed."); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File must be under 5 MB."); return;
    }
    setUploadError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));  // instant local preview
    setImageUrl("");                         // reset previous CDN url

    // Upload to Cloudinary via backend
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch(`${API}/upload`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body:    fd,
        // ⚠️ DO NOT set Content-Type header — browser sets multipart boundary automatically
      });
      const data = await res.json();
      if (!res.ok) { setUploadError(data.message || "Upload failed."); setPreview(""); setImageFile(null); return; }
      setImageUrl(data.url);   // Cloudinary CDN URL — saved with complaint
    } catch {
      setUploadError("Could not reach server. Is the backend running?");
      setPreview(""); setImageFile(null);
    } finally { setUploading(false); }
  };

  const removeImage = () => { setImageUrl(""); setImageFile(null); setPreview(""); setUploadError(""); };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.department || !form.priority) {
      showToast("Please fill all required fields.", "error"); return;
    }
    if (!form.roomNo.trim()) {
      showToast("Please enter your room/location number.", "error"); return;
    }
    if (uploading) { showToast("Please wait — image is still uploading.", "error"); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API}/complaints`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body:    JSON.stringify({ ...form, imageUrl }),   // attach CDN url
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.message || "Submission failed.", "error"); return; }
      setSubmitted(true);
      showToast("Complaint submitted successfully.", "success");
    } catch { showToast("Server error. Is the backend running?", "error"); }
    finally   { setLoading(false); }
  };

  if (submitted) return (
    <main style={{ maxWidth: 460, margin: "80px auto", padding: 24, textAlign: "center" }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 52 }}>
        <div style={{ width: 48, height: 48, border: `1px solid ${C.borderHover}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
          <Ico name="check" size={22} color={C.success} sw={2} />
        </div>
        <h2 style={{ color: C.text, margin: "0 0 10px", fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>Complaint submitted</h2>
        <p style={{ color: C.textSub, margin: "0 0 30px", fontSize: 16, lineHeight: 1.7 }}>Your complaint has been registered. You'll be notified on status updates.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Btn variant="primary" onClick={() => setPage("dashboard")}>View dashboard</Btn>
          <Btn variant="ghost" onClick={() => { setSubmitted(false); setForm({ title: "", description: "", department: "", priority: "Medium", roomNo: "", block: "", contactNumber: "" }); setImageUrl(""); setPreview(""); }}>Submit another</Btn>
        </div>
      </div>
    </main>
  );

  return (
    <main className="rx-page" style={{ maxWidth: 620, margin: "0 auto", padding: "48px 32px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 6px", letterSpacing: -0.5 }}>New complaint</h1>
        <p style={{ color: C.textSub, margin: 0, fontSize: 16 }}>Describe the issue and we'll route it to the right team.</p>
      </div>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 26 }}>
        <Field label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Brief title of the issue" required />
        <Field label="Description" type="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail…" required rows={5} />
        <div className="rx-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Department" type="select" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} options={DEPARTMENTS.map(d => d.id)} required />
          <Field label="Priority"   type="select" value={form.priority}   onChange={e => setForm({ ...form, priority: e.target.value })} options={PRIORITIES} required />
        </div>

        {/* ── Location & Contact (helps admin identify & reach user) ── */}
        <div style={{ marginBottom: 6, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textDim, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>
            Your Location & Contact
            <span style={{ color: C.textDim, fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 6, fontSize: 12 }}>— helps admin reach you faster</span>
          </div>
          <div className="rx-form-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field
              label="Room / Flat No"
              value={form.roomNo}
              onChange={e => setForm({ ...form, roomNo: e.target.value })}
              placeholder="e.g. 204, A-12"
              required
            />
            <Field
              label="Block / Floor"
              value={form.block}
              onChange={e => setForm({ ...form, block: e.target.value })}
              placeholder="e.g. Block B, 3rd Floor"
            />
            <Field
              label="Contact Number"
              value={form.contactNumber}
              onChange={e => setForm({ ...form, contactNumber: e.target.value })}
              placeholder="e.g. 9876543210"
            />
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500, color: C.textSub, letterSpacing: 0.4, textTransform: "uppercase" }}>
            Attachment <span style={{ color: C.textDim, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(optional)</span>
          </label>

        {/* ── Image Upload Section ── */}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            style={{ display: "none" }}
            ref={el => fileInputRef.current = el}
            onChange={e => handleFile(e.target.files[0])}
          />

          {/* Show dropzone only if no image selected yet */}
          {!preview && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              style={{
                border: `2px dashed ${dragOver ? C.logo : C.border}`,
                borderRadius: 10,
                padding: "32px 20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.15s",
                background: dragOver ? `${C.logo}08` : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.borderFocus}
              onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = C.border; }}
            >
              <Ico name="upload" size={28} color={dragOver ? C.logo : C.textDim} />
              <div style={{ fontSize: 15, color: C.textSub, marginTop: 10, fontWeight: 500 }}>
                Click to upload or drag & drop
              </div>
              <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>
                JPG, PNG, WEBP, GIF — max 5 MB
              </div>
            </div>
          )}

          {/* Preview + upload status */}
          {preview && (
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block" }} />

              {/* Uploading overlay */}
              {uploading && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, border: `3px solid ${C.logo}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ color: C.logo, fontSize: 14, fontWeight: 500 }}>Uploading…</span>
                </div>
              )}

              {/* Uploaded success bar */}
              {imageUrl && !uploading && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(34,197,94,0.15)", borderTop: `1px solid ${C.success}30`, padding: "7px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                  <Ico name="check" size={14} color={C.success} sw={2.2} />
                  <span style={{ fontSize: 13, color: C.success, fontWeight: 500 }}>Uploaded successfully</span>
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={removeImage}
                style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,68,68,0.8)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
              >
                <Ico name="x" size={14} color="#fff" sw={2} />
              </button>
            </div>
          )}

          {/* Error message */}
          {uploadError && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8, fontSize: 13, color: C.danger }}>
              <Ico name="alert" size={13} color={C.danger} />{uploadError}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="ghost" onClick={() => setPage("home")}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit} disabled={loading || uploading}>
            {loading ? "Submitting…" : uploading ? "Uploading image…" : "Submit complaint"}
          </Btn>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// USER DASHBOARD  — logic unchanged
// ─────────────────────────────────────────────────────────────
function UserDashboard({ user, setPage, showToast }) {
  const [complaints,   setComplaints]   = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search,       setSearch]       = useState("");
  const [ratingModal,  setRatingModal]  = useState(null);
  const [rating,       setRating]       = useState(5);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/complaints`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setComplaints((d.complaints || []).map(normalize)))
      .catch(() => showToast("Failed to load complaints.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = complaints.filter(c =>
    (statusFilter === "All" || c.status === statusFilter) &&
    (c.title?.toLowerCase().includes(search.toLowerCase()) || c.department?.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total:    complaints.length,
    resolved: complaints.filter(c => c.status === "Resolved").length,
    pending:  complaints.filter(c => ["New", "Pending", "In Progress"].includes(c.status)).length,
  };

  const submitRating = async () => {
    const c = complaints.find(x => x.id === ratingModal);
    if (!c) return;
    try {
      await fetch(`${API}/complaints/${c.id}/rate`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` }, body: JSON.stringify({ rating }) });
      setComplaints(prev => prev.map(x => x.id === ratingModal ? { ...x, rating } : x));
      setRatingModal(null);
      showToast("Rating submitted.", "success");
    } catch { showToast("Failed.", "error"); }
  };

  return (
    <main className="rx-page" style={{ maxWidth: 960, margin: "0 auto", padding: "48px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 5px", letterSpacing: -0.5 }}>My Complaints</h1>
          <p style={{ fontSize: 16, color: C.textSub, margin: 0 }}>Track and manage your submitted issues</p>
        </div>
        <Btn variant="primary" size="sm" onClick={() => setPage("submit")} style={{ gap: 6 }}>
          <Ico name="plus" size={13} color="#000" sw={2} />New complaint
        </Btn>
      </div>

      {/* Stats */}
      <div className="rx-user-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 32 }}>
        {[{ l: "Total", v: stats.total }, { l: "Resolved", v: stats.resolved }, { l: "Active", v: stats.pending }].map((s, i) => (
          <div key={s.l} style={{ padding: "20px 24px", borderRight: i < 2 ? `1px solid ${C.border}` : "none", background: C.bgCard }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.text, letterSpacing: -0.8 }}>{s.v}</div>
            <div style={{ fontSize: 15, color: C.textSub, marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rx-filter-row" style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 13px" }}>
          <Ico name="search" size={14} color={C.textDim} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search complaints…"
            style={{ background: "none", border: "none", outline: "none", fontSize: 15, color: C.text, fontFamily: "inherit", width: 180 }} />
        </div>
        {["All", ...STATUSES].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: "6px 13px", borderRadius: 6, border: `1px solid ${statusFilter === s ? C.borderFocus : C.border}`, background: statusFilter === s ? C.bgCardHover : "transparent", color: statusFilter === s ? C.text : C.textSub, fontSize: 15, cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s" }}>{s}</button>
        ))}
      </div>

      {/* Complaint list */}
      {loading ? (
        <div style={{ padding: 56, textAlign: "center", color: C.textSub, fontSize: 16 }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: 64, textAlign: "center", border: `1px solid ${C.border}`, borderRadius: 10 }}>
          <Ico name="inbox" size={28} color={C.textDim} />
          <div style={{ color: C.textSub, fontSize: 16, marginTop: 12 }}>No complaints found. Submit one to get started.</div>
        </div>
      ) : (
        <div className="rx-table-wrap" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          {filtered.map((c, i) => {
            const dept   = DEPARTMENTS.find(d => d.id === c.department);
            const dColor = DEPT_COLORS[c.department] || C.textSub;
            return (
              <div key={c.id} style={{ padding: "18px 22px", borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bgCardHover}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                      <Ico name={dept?.icon || "file"} size={15} color={dColor} sw={1.8} />
                      <span style={{ fontWeight: 600, fontSize: 17, color: C.text }}>{c.title}</span>
                      <span style={{ fontSize: 14, color: C.textDim, fontFamily: "monospace" }}>#{String(c.id).slice(-6)}</span>
                    </div>
                    <p style={{ margin: "0 0 10px", fontSize: 15, color: C.textSub, lineHeight: 1.65 }}>{c.description}</p>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
                      <Badge status={c.status}   type="status" />
                      <Badge status={c.priority} type="priority" />
                      <span style={{ fontSize: 14, color: C.textDim }}>{dept?.label} · {fmt(c.createdAt)}</span>
                    </div>
                    {c.resolutionNotes && (
                      <div style={{ marginTop: 10, fontSize: 15, color: C.textSub, padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 6, borderLeft: `2px solid ${C.success}` }}>
                        {c.resolutionNotes}
                      </div>
                    )}
                    {c.imageUrl && (
                      <div style={{ marginTop: 10 }}>
                        <img src={c.imageUrl} alt="Attachment"
                          onClick={() => window.open(c.imageUrl, "_blank")}
                          style={{ maxWidth: "100%", maxHeight: 180, borderRadius: 8, border: `1px solid ${C.border}`, objectFit: "cover", display: "block", cursor: "pointer" }} />
                        <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>Click to view full size</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {c.status === "Resolved" && !c.rating && (
                      <Btn size="sm" variant="ghost" onClick={() => setRatingModal(c.id)} style={{ gap: 5 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>Rate
                      </Btn>
                    )}
                    {c.rating && (
                      <div style={{ display: "flex", gap: 2 }}>
                        {[1,2,3,4,5].map(n => (
                          <svg key={n} width="15" height="15" viewBox="0 0 24 24"
                            fill={n <= c.rating ? "#f5c518" : "none"}
                            stroke={n <= c.rating ? "#f5c518" : "#555"}
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!ratingModal} onClose={() => setRatingModal(null)} title="Rate this resolution" width={340}>
        <p style={{ color: C.textSub, fontSize: 16, marginBottom: 22 }}>How satisfied are you with how this was resolved?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 26 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setRating(n)} style={{ background: "none", border: "none", cursor: "pointer", transition: "transform 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <svg width="32" height="32" viewBox="0 0 24 24"
                fill={n <= rating ? "#f5c518" : "none"}
                stroke={n <= rating ? "#f5c518" : "#555"}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: n <= rating ? "drop-shadow(0 0 4px #f5c51855)" : "none", transition: "all 0.15s" }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          ))}
        </div>
        <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={submitRating}>Submit rating</Btn>
      </Modal>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// ADMIN DASHBOARD  — logic unchanged
// ─────────────────────────────────────────────────────────────
function AdminDashboard({ showToast }) {
  const [complaints, setComplaints] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [filters,    setFilters]    = useState({ dept: "All", status: "All", priority: "All" });
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);
  const [noteInput,  setNoteInput]  = useState("");
  const [newStatus,  setNewStatus]  = useState("");
  const [saving,     setSaving]     = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/complaints`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setComplaints((d.complaints || []).map(normalize)))
      .catch(() => showToast("Failed to load complaints.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = complaints.filter(c =>
    (filters.dept     === "All" || c.department === filters.dept) &&
    (filters.status   === "All" || c.status     === filters.status) &&
    (filters.priority === "All" || c.priority   === filters.priority) &&
    (c.title?.toLowerCase().includes(search.toLowerCase()) || c.department?.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total:      complaints.length,
    new:        complaints.filter(c => c.status === "New").length,
    inProgress: complaints.filter(c => c.status === "In Progress").length,
    resolved:   complaints.filter(c => c.status === "Resolved").length,
  };

  const deptCounts = DEPARTMENTS.map(d => ({ ...d, count: complaints.filter(c => c.department === d.id).length })).sort((a, b) => b.count - a.count);

  const updateComplaint = async () => {
    if (!selected?.id) { showToast("No complaint selected.", "error"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`${API}/complaints/${selected.id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` }, body: JSON.stringify({ status: newStatus || selected.status, resolutionNotes: noteInput }) });
      const data = await res.json();
      if (!res.ok) { showToast(data.message || "Update failed.", "error"); return; }
      setComplaints(prev => prev.map(c => c.id === selected.id ? { ...c, status: newStatus || c.status, resolutionNotes: noteInput } : c));
      showToast("Updated successfully.", "success");
      setSelected(null); setNoteInput(""); setNewStatus("");
    } catch { showToast("Server error.", "error"); }
    finally { setSaving(false); }
  };

  const openManage = (c) => { setSelected(c); setNoteInput(c.resolutionNotes || ""); setNewStatus(c.status || "New"); };
  const selStyle   = { padding: "7px 11px", borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", background: C.bgCard, color: C.text, outline: "none", cursor: "pointer" };

  return (
    <main className="rx-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px" }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 5px", letterSpacing: -0.5 }}>Admin Dashboard</h1>
        <p style={{ fontSize: 16, color: C.textSub, margin: 0 }}>All complaints across every department</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="rx-admin-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { l: "Total",       v: stats.total,      color: "#fff",     bg: "#111",    border: C.border },
          { l: "New",         v: stats.new,        color: "#60a5fa",  bg: "#0a1020", border: "#60a5fa33" },
          { l: "In Progress", v: stats.inProgress, color: "#f59e0b",  bg: "#1a1200", border: "#f59e0b33" },
          { l: "Resolved",    v: stats.resolved,   color: "#22c55e",  bg: "#0a1a0a", border: "#22c55e33" },
        ].map(s => (
          <div key={s.l} style={{ padding: "22px 24px", borderRadius: 10, background: s.bg, border: `1px solid ${s.border}` }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color, letterSpacing: -1, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 13, color: C.textSub, marginTop: 8, letterSpacing: 0.2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Pie Charts ── */}
      <div className="rx-charts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>

        {/* Status Pie */}
        {(() => {
          const [hoveredStatus, setHoveredStatus] = useState(null);
          const slices = STATUSES.map(s => ({ label: s, count: complaints.filter(c => c.status === s).length, color: STATUS_COLORS[s] }));
          const total  = slices.reduce((a,b) => a + b.count, 0) || 1;
          const cx = 110, cy = 110, r = 88, inner = 54;
          let angle = -Math.PI / 2;
          const segments = slices.filter(s => s.count > 0).map(s => {
            const sweep = (s.count / total) * 2 * Math.PI;
            const x1  = cx + r     * Math.cos(angle),       y1  = cy + r     * Math.sin(angle);
            const x2  = cx + r     * Math.cos(angle+sweep), y2  = cy + r     * Math.sin(angle+sweep);
            const ix1 = cx + inner * Math.cos(angle),       iy1 = cy + inner * Math.sin(angle);
            const ix2 = cx + inner * Math.cos(angle+sweep), iy2 = cy + inner * Math.sin(angle+sweep);
            const large = sweep > Math.PI ? 1 : 0;
            // expanded slice for hover
            const mid   = angle + sweep / 2;
            const push  = 8;
            const ox = push * Math.cos(mid), oy = push * Math.sin(mid);
            const d = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${inner},${inner} 0 ${large} 0 ${ix1},${iy1} Z`;
            const dHov = `M${x1+ox},${y1+oy} A${r},${r} 0 ${large} 1 ${x2+ox},${y2+oy} L${ix2+ox},${iy2+oy} A${inner},${inner} 0 ${large} 0 ${ix1+ox},${iy1+oy} Z`;
            const seg = { ...s, d, dHov, mid };
            angle += sweep;
            return seg;
          });
          const hov = hoveredStatus ? slices.find(s => s.label === hoveredStatus) : null;
          return (
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 20px" }}>By Status</p>
              <div className="rx-pie" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ flexShrink: 0 }}>
                  <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
                    {segments.map(seg => (
                      <path key={seg.label} d={hoveredStatus === seg.label ? seg.dHov : seg.d}
                        fill={seg.color}
                        opacity={hoveredStatus && hoveredStatus !== seg.label ? 0.35 : 1}
                        style={{ cursor: "pointer", transition: "all 0.2s ease", filter: hoveredStatus === seg.label ? `drop-shadow(0 0 8px ${seg.color}88)` : "none" }}
                        onMouseEnter={() => setHoveredStatus(seg.label)}
                        onMouseLeave={() => setHoveredStatus(null)}
                      />
                    ))}
                    <circle cx={cx} cy={cy} r={inner - 2} fill={C.bgCard} />
                    {hov ? (
                      <>
                        <text x={cx} y={cy - 10} textAnchor="middle" fill={hov.color} fontSize="22" fontWeight="700" style={{ pointerEvents: "none" }}>{hov.count}</text>
                        <text x={cx} y={cy + 10} textAnchor="middle" fill={hov.color} fontSize="13" style={{ pointerEvents: "none" }}>{Math.round((hov.count/total)*100)}%</text>
                        <text x={cx} y={cy + 28} textAnchor="middle" fill={C.textDim} fontSize="11" style={{ pointerEvents: "none" }}>{hov.label}</text>
                      </>
                    ) : (
                      <>
                        <text x={cx} y={cy - 6} textAnchor="middle" fill={C.text} fontSize="26" fontWeight="700" style={{ pointerEvents: "none" }}>{total}</text>
                        <text x={cx} y={cy + 16} textAnchor="middle" fill={C.textDim} fontSize="12" style={{ pointerEvents: "none" }}>total</text>
                      </>
                    )}
                  </svg>
                </div>
                {/* Legend */}
                <div style={{ flex: 1 }}>
                  {slices.map(s => {
                    const pct = Math.round((s.count / total) * 100);
                    const isHov = hoveredStatus === s.label;
                    return (
                      <div key={s.label}
                        onMouseEnter={() => setHoveredStatus(s.label)}
                        onMouseLeave={() => setHoveredStatus(null)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: 7, marginBottom: 4, cursor: "pointer", background: isHov ? `${s.color}12` : "transparent", border: `1px solid ${isHov ? s.color + "44" : "transparent"}`, transition: "all 0.15s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: isHov ? C.text : C.textSub, fontWeight: isHov ? 600 : 400 }}>{s.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 14, color: s.color, fontWeight: 700 }}>{s.count}</span>
                          <span style={{ fontSize: 12, color: C.textDim, minWidth: 32, textAlign: "right" }}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Department Pie */}
        {(() => {
          const [hoveredDept, setHoveredDept] = useState(null);
          const slices = deptCounts.map(d => ({ label: d.label, id: d.id, count: d.count, color: DEPT_COLORS[d.id] }));
          const total  = slices.reduce((a,b) => a + b.count, 0) || 1;
          const cx = 110, cy = 110, r = 88, inner = 54;
          let angle = -Math.PI / 2;
          const segments = slices.filter(s => s.count > 0).map(s => {
            const sweep = (s.count / total) * 2 * Math.PI;
            const x1  = cx + r     * Math.cos(angle),       y1  = cy + r     * Math.sin(angle);
            const x2  = cx + r     * Math.cos(angle+sweep), y2  = cy + r     * Math.sin(angle+sweep);
            const ix1 = cx + inner * Math.cos(angle),       iy1 = cy + inner * Math.sin(angle);
            const ix2 = cx + inner * Math.cos(angle+sweep), iy2 = cy + inner * Math.sin(angle+sweep);
            const large = sweep > Math.PI ? 1 : 0;
            const mid  = angle + sweep / 2;
            const push = 8;
            const ox = push * Math.cos(mid), oy = push * Math.sin(mid);
            const d    = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${inner},${inner} 0 ${large} 0 ${ix1},${iy1} Z`;
            const dHov = `M${x1+ox},${y1+oy} A${r},${r} 0 ${large} 1 ${x2+ox},${y2+oy} L${ix2+ox},${iy2+oy} A${inner},${inner} 0 ${large} 0 ${ix1+ox},${iy1+oy} Z`;
            angle += sweep;
            return { ...s, d, dHov };
          });
          const hov = hoveredDept ? slices.find(s => s.label === hoveredDept) : null;
          return (
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.textSub, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 20px" }}>By Department</p>
              <div className="rx-pie" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ flexShrink: 0 }}>
                  <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
                    {segments.map(seg => (
                      <path key={seg.label} d={hoveredDept === seg.label ? seg.dHov : seg.d}
                        fill={seg.color}
                        opacity={hoveredDept && hoveredDept !== seg.label ? 0.35 : 1}
                        style={{ cursor: "pointer", transition: "all 0.2s ease", filter: hoveredDept === seg.label ? `drop-shadow(0 0 8px ${seg.color}88)` : "none" }}
                        onMouseEnter={() => setHoveredDept(seg.label)}
                        onMouseLeave={() => setHoveredDept(null)}
                      />
                    ))}
                    <circle cx={cx} cy={cy} r={inner - 2} fill={C.bgCard} />
                    {hov ? (
                      <>
                        <text x={cx} y={cy - 10} textAnchor="middle" fill={hov.color} fontSize="22" fontWeight="700" style={{ pointerEvents: "none" }}>{hov.count}</text>
                        <text x={cx} y={cy + 10} textAnchor="middle" fill={hov.color} fontSize="13" style={{ pointerEvents: "none" }}>{Math.round((hov.count/total)*100)}%</text>
                        <text x={cx} y={cy + 28} textAnchor="middle" fill={C.textDim} fontSize="11" style={{ pointerEvents: "none" }}>{hov.label}</text>
                      </>
                    ) : (
                      <>
                        <text x={cx} y={cy - 6} textAnchor="middle" fill={C.text} fontSize="26" fontWeight="700" style={{ pointerEvents: "none" }}>{total}</text>
                        <text x={cx} y={cy + 16} textAnchor="middle" fill={C.textDim} fontSize="12" style={{ pointerEvents: "none" }}>total</text>
                      </>
                    )}
                  </svg>
                </div>
                {/* Legend */}
                <div style={{ flex: 1 }}>
                  {slices.map(d => {
                    const pct   = Math.round((d.count / total) * 100);
                    const isHov = hoveredDept === d.label;
                    return (
                      <div key={d.label}
                        onMouseEnter={() => setHoveredDept(d.label)}
                        onMouseLeave={() => setHoveredDept(null)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: 7, marginBottom: 4, cursor: "pointer", background: isHov ? `${d.color}12` : "transparent", border: `1px solid ${isHov ? d.color + "44" : "transparent"}`, transition: "all 0.15s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: isHov ? C.text : C.textSub, fontWeight: isHov ? 600 : 400 }}>{d.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 14, color: d.color, fontWeight: 700 }}>{d.count}</span>
                          <span style={{ fontSize: 12, color: C.textDim, minWidth: 32, textAlign: "right" }}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      {/* Filters */}
      <div className="rx-filter-row" style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 13px" }}>
          <Ico name="search" size={14} color={C.textDim} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search complaints…"
            style={{ background: "none", border: "none", outline: "none", fontSize: 15, color: C.text, fontFamily: "inherit", width: 180 }} />
        </div>
        <select value={filters.dept}     onChange={e => setFilters({ ...filters, dept:     e.target.value })} style={selStyle}>
          <option value="All">All departments</option>{DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
        </select>
        <select value={filters.status}   onChange={e => setFilters({ ...filters, status:   e.target.value })} style={selStyle}>
          <option value="All">All statuses</option>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filters.priority} onChange={e => setFilters({ ...filters, priority: e.target.value })} style={selStyle}>
          <option value="All">All priorities</option>{PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 56, textAlign: "center", color: C.textSub, fontSize: 16 }}>Loading…</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.bgCard }}>
                {["ID", "Submitted By", "Title", "Dept", "Priority", "Status", "Date", ""].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 14, fontWeight: 600, color: C.textSub, letterSpacing: 0.4, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const dept   = DEPARTMENTS.find(d => d.id === c.department);
                const dColor = DEPT_COLORS[c.department] || C.textSub;
                // userId populated by backend as { _id, name, email } — fallback gracefully
                const uName  = c.userId?.name  || c.userId?.email?.split("@")[0] || "Unknown User";
                const uEmail = c.userId?.email || "";
                const uInitial = uName.charAt(0).toUpperCase();
                return (
                  <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bgCardHover}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "13px 16px", color: C.textDim, fontSize: 13, fontFamily: "monospace" }}>{String(c.id).slice(-6)}</td>

                    {/* ── Submitted By cell ── */}
                    <td style={{ padding: "13px 16px", minWidth: 180 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        {/* Avatar circle */}
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1e1e00", border: `1px solid ${C.logo}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.logo }}>{uInitial}</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: C.text, lineHeight: 1.3 }}>{uName}</div>
                          {uEmail && <div style={{ fontSize: 12, color: C.textSub, marginTop: 2 }}>{uEmail}</div>}
                          {/* Room + Block */}
                          {c.roomNo && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                              </svg>
                              <span style={{ fontSize: 12, color: C.logo, fontWeight: 500 }}>
                                Room {c.roomNo}{c.block ? `, ${c.block}` : ""}
                              </span>
                            </div>
                          )}
                          {/* Contact number */}
                          {c.contactNumber && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                              </svg>
                              <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 500 }}>{c.contactNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px", fontWeight: 500, color: C.text, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Ico name={dept?.icon || "file"} size={13} color={dColor} sw={1.8} />
                        <span style={{ color: C.textSub, fontSize: 13 }}>{dept?.label}</span>
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}><Badge status={c.priority} type="priority" /></td>
                    <td style={{ padding: "13px 16px" }}><Badge status={c.status}   type="status" /></td>
                    <td style={{ padding: "13px 16px", color: C.textSub, fontSize: 13 }}>{fmt(c.createdAt)}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <button onClick={() => openManage(c)}
                        style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: C.textSub, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderFocus; e.currentTarget.style.color = C.text; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSub; }}>
                        <Ico name="edit" size={12} color="currentColor" />Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{ padding: 56, textAlign: "center", color: C.textSub, fontSize: 16 }}>
            <Ico name="inbox" size={26} color={C.textDim} /><div style={{ marginTop: 10 }}>No complaints found</div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit complaint" width={500}>
        {selected && (
          <>
            {/* ── Submitter info panel ── */}
            <div className="rx-modal-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16, padding: "16px", background: "#0a0a0a", borderRadius: 10, border: `1px solid ${C.border}` }}>
              {/* Left: User */}
              <div>
                <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Submitted By</div>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1e1e00", border: `1px solid ${C.logo}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.logo }}>
                      {(selected.userId?.name || selected.userId?.email || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
                      {selected.userId?.name || selected.userId?.email?.split("@")[0] || "Unknown User"}
                    </div>
                    {selected.userId?.email && (
                      <div style={{ fontSize: 12, color: C.textSub, marginTop: 2 }}>{selected.userId.email}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Location & Contact */}
              <div>
                <div style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Location & Contact</div>
                {selected.roomNo ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.logo }}>
                      Room {selected.roomNo}{selected.block ? `, ${selected.block}` : ""}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: C.textDim, marginBottom: 7 }}>No location provided</div>
                )}
                {selected.contactNumber ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#4ade80" }}>{selected.contactNumber}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: C.textDim }}>No contact provided</div>
                )}
              </div>
            </div>

            {/* Complaint details */}
            <div style={{ padding: "13px 16px", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 16, borderLeft: `2px solid ${C.borderHover}` }}>
              <div style={{ fontWeight: 600, color: C.text, fontSize: 16, marginBottom: 4 }}>{selected.title}</div>
              <div style={{ fontSize: 15, color: C.textSub, lineHeight: 1.65 }}>{selected.description}</div>
            </div>
            {selected.imageUrl && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: C.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>Attached Image</div>
                <img src={selected.imageUrl} alt="Complaint attachment"
                  onClick={() => window.open(selected.imageUrl, "_blank")}
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, border: `1px solid ${C.border}`, cursor: "pointer", display: "block" }} />
                <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>Click to view full size</div>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, color: C.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>Department</div>
                <span style={{ fontSize: 16, color: C.textSub }}>{selected.department}</span>
              </div>
              <div>
                <div style={{ fontSize: 14, color: C.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>Current Priority</div>
                <Badge status={selected.priority} type="priority" />
              </div>
            </div>
            <div style={{ height: 14 }} />
            <Field label="Update Status" type="select" value={newStatus} onChange={e => setNewStatus(e.target.value)} options={STATUSES} />
            <Field label="Resolution Notes" type="textarea" value={noteInput} onChange={e => setNoteInput(e.target.value)} placeholder="Describe how this was resolved…" rows={3} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
              <Btn variant="ghost" onClick={() => setSelected(null)}>Cancel</Btn>
              <Btn variant="primary" onClick={updateComplaint} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Btn>
            </div>
          </>
        )}
      </Modal>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE PAGE  — logic unchanged
// ─────────────────────────────────────────────────────────────
function ProfilePage({ user, setUser, setPage, showToast }) {
  // ✅ FIX: read phone/org from user state so they persist across visits
  const [form, setForm] = useState({
    name:  user.name  || "",
    email: user.email || "",
    phone: user.phone || "",
    org:   user.org   || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name.trim()) { showToast("Name cannot be empty.", "error"); return; }
    setSaving(true);
    try {
      const token = getToken();
      if (!token) { showToast("Not logged in. Please sign in again.", "error"); return; }

      const res = await fetch(`${API}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: form.name, phone: form.phone, organization: form.org }),
      });

      let data = {};
      try { data = await res.json(); } catch (_) {}

      if (!res.ok) {
        showToast(data.message || `Error ${res.status}: Update failed.`, "error");
        return;
      }

      // ✅ FIX: store phone/org in user state so they persist when profile is opened again
      setUser({
        ...user,
        name:  form.name,
        phone: form.phone,
        org:   form.org,
      });

      showToast("Profile updated successfully.", "success");

      // ✅ FIX: close profile page and go back to dashboard after save
      setTimeout(() => setPage(user.role === "admin" ? "admin" : "dashboard"), 800);

    } catch (err) {
      showToast("Cannot reach server. Is the backend running?", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="rx-page" style={{ maxWidth: 520, margin: "0 auto", padding: "48px 32px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 28px", letterSpacing: -0.5 }}>Profile</h1>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26, paddingBottom: 22, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 46, height: 46, borderRadius: 10, background: C.bgCardHover, border: `1px solid ${C.borderHover}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: C.logo }}>{user.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 17, color: C.text }}>{user.name}</div>
            <div style={{ fontSize: 15, color: C.textSub, marginTop: 3 }}>{user.email}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ fontSize: 14, padding: "3px 9px", border: `1px solid ${C.border}`, borderRadius: 5, color: C.textSub, textTransform: "capitalize" }}>{user.role}</span>
          </div>
        </div>
        <Field label="Full Name"    value={form.name}  onChange={e => setForm({ ...form, name:  e.target.value })} />
        <Field label="Email"        type="email" value={form.email}  onChange={e => setForm({ ...form, email: e.target.value })} />
        <Field label="Phone"        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <Field label="Organization" value={form.org}   onChange={e => setForm({ ...form, org:   e.target.value })} />
        <Btn variant="primary" onClick={handleSave} disabled={saving} style={{ gap: 6 }}>
          <Ico name="check" size={14} color="#000" sw={2} />{saving ? "Saving…" : "Save changes"}
        </Btn>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP  — no sidebar
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [page,         setPage]         = useState("home");
  const [user,         setUser]         = useState(null);
  const [selectedDept, setSelectedDept] = useState("");
  const [toast,        setToast]        = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3200);
  };

  const handleLogout = () => {
    localStorage.removeItem("resolvex_token");
    setUser(null); setPage("home");
  };

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage               setPage={setPage} setSelectedDept={setSelectedDept} user={user} />;
      case "login":     return <AuthPage               mode="login"    setPage={setPage} onLogin={setUser} />;
      case "register":  return <AuthPage               mode="register" setPage={setPage} onLogin={setUser} />;
      case "submit":    return user ? <SubmitComplaintPage user={user} selectedDept={selectedDept} setPage={setPage} showToast={showToast} /> : <AuthPage mode="login" setPage={setPage} onLogin={setUser} />;
      case "dashboard": return user ? <UserDashboard   user={user} setPage={setPage} showToast={showToast} />                                  : <AuthPage mode="login" setPage={setPage} onLogin={setUser} />;
      case "admin":     return user?.role === "admin"  ? <AdminDashboard showToast={showToast} />                                              : <HomePage setPage={setPage} setSelectedDept={setSelectedDept} user={user} />;
      case "profile":   return user ? <ProfilePage     user={user} setUser={setUser} setPage={setPage} showToast={showToast} />                                  : <AuthPage mode="login" setPage={setPage} onLogin={setUser} />;
      default:          return <HomePage               setPage={setPage} setSelectedDept={setSelectedDept} user={user} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter','SF Pro Display','Segoe UI',-apple-system,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { font-size: 16px; }
        body { margin: 0; background: ${C.bg}; line-height: 1.6; overflow-x: hidden; }
        ::placeholder { color: ${C.textDim}; }
        select, input, textarea, button { font-family: 'Inter','SF Pro Display','Segoe UI',-apple-system,sans-serif; font-size: inherit; }
        select option { background: #111; color: ${C.text}; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.borderHover}; }
        @keyframes fadeUp { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 640px) {
          .rx-nav-links   { display: none !important; }
          .rx-user-name   { display: none !important; }
          .rx-nav-pad     { padding: 0 16px !important; }
          .rx-hero-btns   { flex-direction: column; }
          .rx-hero-btns > * { width: 100% !important; justify-content: center !important; }
          .rx-stats       { grid-template-columns: repeat(2,1fr) !important; }
          .rx-stats > div:nth-child(2) { border-right: none !important; }
          .rx-stats > div:nth-child(3) { border-top: 1px solid ${C.border} !important; }
          .rx-stats > div:nth-child(4) { border-top: 1px solid ${C.border} !important; border-right: none !important; }
          .rx-dept        { grid-template-columns: repeat(2,1fr) !important; }
          .rx-form-2col   { grid-template-columns: 1fr !important; }
          .rx-form-3col   { grid-template-columns: 1fr !important; }
          .rx-pie         { flex-direction: column !important; align-items: center !important; }
          .rx-charts      { grid-template-columns: 1fr !important; }
          .rx-admin-stats { grid-template-columns: repeat(2,1fr) !important; }
          .rx-admin-stats > div:nth-child(2) { border-right: none !important; }
          .rx-admin-stats > div:nth-child(3) { border-top: 1px solid ${C.border} !important; }
          .rx-admin-stats > div:nth-child(4) { border-top: 1px solid ${C.border} !important; border-right: none !important; }
          .rx-table-wrap  { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          .rx-filter-row  { flex-wrap: wrap !important; }
          .rx-filter-row select { flex: 1 1 140px !important; }
          .rx-modal-2col  { grid-template-columns: 1fr !important; }
          .rx-page        { padding: 28px 16px !important; }
          .rx-hero        { padding: 36px 16px 56px !important; }
          .rx-user-stats  { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 400px) {
          .rx-dept        { grid-template-columns: 1fr !important; }
          .rx-user-stats  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      <div style={{ minHeight: "calc(100vh - 60px)" }}>{renderPage()}</div>
      <Toast message={toast.msg} type={toast.type} />
    </div>
  );
}
