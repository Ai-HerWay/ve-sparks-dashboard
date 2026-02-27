import { useState, useEffect, useCallback } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "./firebase";

const DB_PATH = "ve-skills-library";

const DEFAULT_DATA = {
  categories: [
    {
      id: "mkt",
      name: "Marketing & Content",
      icon: "📣",
      color: "#E85D75",
      priority: "high",
      phase: "Phase 1",
      skills: [
        { id: "mkt-1", name: "Instagram Content Writer", status: "prototype", demand: 69, tools: "Later, Canva, Meta Business Suite", notes: "Highest demand skill. Full worked example in roadmap.", demandSource: "client-analysis" },
        { id: "mkt-2", name: "LinkedIn Post Creator", status: "planned", demand: 45, tools: "LinkedIn, Canva", notes: "B2B clients especially requesting this", demandSource: "client-analysis" },
        { id: "mkt-3", name: "SEO Blog Writer", status: "planned", demand: 31, tools: "WordPress, Squarespace", notes: "Website mgmt roles requesting content updates", demandSource: "client-analysis" },
        { id: "mkt-4", name: "Email Sequence Builder", status: "planned", demand: 56, tools: "MailerLite, Klaviyo, HubSpot, ActiveCampaign", notes: "Newsletter creation + campaign scheduling", demandSource: "client-analysis" },
        { id: "mkt-5", name: "Ad Copy Generator", status: "idea", demand: 20, tools: "Meta Ads, Google Ads", notes: "Emerging — not yet high in JDs but adjacent to social", demandSource: "roadmap" },
        { id: "mkt-6", name: "Content Calendar Planner", status: "planned", demand: 69, tools: "Later, Buffer, Metricool", notes: "Bundled with social media management requests", demandSource: "client-analysis" },
        { id: "mkt-7", name: "Social Scheduling & Publishing", status: "idea", demand: 69, tools: "Later, Buffer, Metricool, Meta Business Suite", notes: "Operational layer of social media management", demandSource: "client-analysis" },
        { id: "mkt-8", name: "Short-Form Video Scripting", status: "idea", demand: 25, tools: "CapCut, Adobe Premiere Pro, DaVinci Resolve", notes: "25% now but accelerating fast — every social role mentions it", demandSource: "client-analysis" },
        { id: "mkt-9", name: "Multi-Platform Content Repurposer", status: "idea", demand: 40, tools: "Canva, CapCut, various", notes: "Key trend: one piece → many platforms", demandSource: "client-analysis" },
      ],
    },
    {
      id: "admin",
      name: "Admin & Operations",
      icon: "⚙️",
      color: "#4A90D9",
      priority: "high",
      phase: "Phase 1",
      skills: [
        { id: "adm-1", name: "Email Inbox Triage & Drafting", status: "prototype", demand: 56, tools: "Gmail, Outlook", notes: "Every exec VA role listed this. 5-10hrs/week savings.", demandSource: "client-analysis" },
        { id: "adm-2", name: "Calendar Coordination", status: "planned", demand: 56, tools: "Google Calendar, Calendly", notes: "Core admin skill — high frequency in JDs", demandSource: "client-analysis" },
        { id: "adm-3", name: "Meeting Notes & Action Items", status: "planned", demand: 40, tools: "Google Docs, Notion", notes: "Mentioned across exec VA roles", demandSource: "roadmap" },
        { id: "adm-4", name: "Document Formatting & Creation", status: "planned", demand: 56, tools: "Google Workspace, Microsoft 365", notes: "General admin bucket — consistent demand", demandSource: "client-analysis" },
        { id: "adm-5", name: "SOP Writer", status: "idea", demand: 56, tools: "Notion, Google Docs", notes: "Explicitly mentioned in general admin requests", demandSource: "client-analysis" },
        { id: "adm-6", name: "Data Entry & Cleanup", status: "idea", demand: 35, tools: "Google Sheets, Excel, Airtable", notes: "Common task pattern across roles", demandSource: "roadmap" },
        { id: "adm-7", name: "Task & Project Tracking", status: "idea", demand: 40, tools: "Monday.com, Trello, Asana, Notion", notes: "Platform management for task boards", demandSource: "client-analysis" },
      ],
    },
    {
      id: "sales",
      name: "Sales & CRM",
      icon: "🎯",
      color: "#F5A623",
      priority: "medium",
      phase: "Phase 2",
      skills: [
        { id: "sal-1", name: "CRM Automation Builder", status: "planned", demand: 63, tools: "HubSpot, GoHighLevel, Zoho, Pipedrive", notes: "63% demand. Clients want VAs who BUILD automations, not just enter data.", demandSource: "client-analysis" },
        { id: "sal-2", name: "Lead Follow-Up Sequences", status: "idea", demand: 31, tools: "HubSpot, GoHighLevel, Apollo.io", notes: "Personalised B2B email sequences", demandSource: "client-analysis" },
        { id: "sal-3", name: "Pipeline Reporting", status: "idea", demand: 30, tools: "HubSpot, Salesforce, Pipedrive", notes: "Reporting & analytics task pattern", demandSource: "roadmap" },
        { id: "sal-4", name: "Proposal & Quote Drafter", status: "idea", demand: 20, tools: "Google Docs, Canva", notes: "Adjacent to CRM — sales enablement", demandSource: "roadmap" },
        { id: "sal-5", name: "Client Onboarding Workflow", status: "idea", demand: 30, tools: "HubSpot, GoHighLevel, Notion", notes: "Pipeline management pattern", demandSource: "roadmap" },
        { id: "sal-6", name: "LinkedIn Prospecting & Outreach", status: "idea", demand: 31, tools: "LinkedIn Sales Navigator, Apollo.io", notes: "Database building + personalised sequences", demandSource: "client-analysis" },
      ],
    },
    {
      id: "fin",
      name: "Finance & Bookkeeping",
      icon: "💰",
      color: "#7ED321",
      priority: "medium",
      phase: "Phase 2",
      skills: [
        { id: "fin-1", name: "Invoice Preparation", status: "idea", demand: 31, tools: "Xero, MYOB, QuickBooks", notes: "31% demand — growing niche, near-universal in AU", demandSource: "client-analysis" },
        { id: "fin-2", name: "Bank Reconciliation", status: "idea", demand: 31, tools: "Xero, MYOB, QuickBooks", notes: "Core bookkeeping task", demandSource: "client-analysis" },
        { id: "fin-3", name: "Expense Categorisation", status: "idea", demand: 31, tools: "Xero, Stripe, Zoho Books", notes: "AI that auto-codes transactions has clear ROI", demandSource: "client-analysis" },
        { id: "fin-4", name: "BAS Preparation Support", status: "idea", demand: 31, tools: "Xero, MYOB", notes: "AU-specific — high value for AU clients", demandSource: "client-analysis" },
        { id: "fin-5", name: "Financial Report Generator", status: "idea", demand: 20, tools: "Xero, QuickBooks, Google Sheets", notes: "Report generation task pattern", demandSource: "roadmap" },
      ],
    },
    {
      id: "hr",
      name: "HR & Recruitment",
      icon: "👥",
      color: "#BD10E0",
      priority: "low",
      phase: "Phase 3",
      skills: [
        { id: "hr-1", name: "Job Description Generator", status: "idea", demand: 15, tools: "Google Docs, Monday.com", notes: "From roadmap categories", demandSource: "roadmap" },
        { id: "hr-2", name: "Candidate Screening & Scoring", status: "idea", demand: 15, tools: "ATS platforms, Google Sheets", notes: "Comparison frameworks + scoring rubrics", demandSource: "roadmap" },
        { id: "hr-3", name: "Onboarding Checklist Builder", status: "idea", demand: 10, tools: "Notion, Monday.com, Google Workspace", notes: "Training materials creation", demandSource: "roadmap" },
        { id: "hr-4", name: "Interview Question Bank", status: "idea", demand: 10, tools: "Google Docs", notes: "Reference file for recruitment skill", demandSource: "roadmap" },
      ],
    },
    {
      id: "web",
      name: "Web & E-Commerce",
      icon: "🌐",
      color: "#50E3C2",
      priority: "low",
      phase: "Phase 3",
      skills: [
        { id: "web-1", name: "Website Content Updater", status: "idea", demand: 31, tools: "Squarespace, WordPress, Kajabi, GHL", notes: "31% demand — content updates, basic SEO, landing pages", demandSource: "client-analysis" },
        { id: "web-2", name: "Product Description Writer", status: "idea", demand: 15, tools: "Shopify, WooCommerce", notes: "E-commerce niche", demandSource: "roadmap" },
        { id: "web-3", name: "SEO Audit & Optimiser", status: "idea", demand: 20, tools: "WordPress, Squarespace", notes: "Basic SEO mentioned in website roles", demandSource: "client-analysis" },
        { id: "web-4", name: "Landing Page Builder", status: "idea", demand: 31, tools: "Kajabi, GHL, WordPress", notes: "Landing page edits + course management", demandSource: "client-analysis" },
        { id: "web-5", name: "Chatbot Setup & Management", status: "idea", demand: 10, tools: "Various platforms", notes: "From roadmap categories", demandSource: "roadmap" },
      ],
    },
  ],
};

const STATUS_CONFIG = {
  prototype: { label: "Prototype", color: "#E85D75", bg: "#FFF0F2", order: 0 },
  planned: { label: "Planned", color: "#F5A623", bg: "#FFF8EC", order: 1 },
  idea: { label: "Idea", color: "#4A90D9", bg: "#EDF4FC", order: 2 },
  "in-progress": { label: "In Progress", color: "#7ED321", bg: "#F2FCE8", order: 3 },
  deployed: { label: "Deployed", color: "#50E3C2", bg: "#EDFCF8", order: 4 },
};

const PRIORITY_CONFIG = {
  high: { label: "High Priority", color: "#E85D75", icon: "🔴" },
  medium: { label: "Medium Priority", color: "#F5A623", icon: "🟡" },
  low: { label: "Low Priority", color: "#4A90D9", icon: "🔵" },
};

const PHASE_OPTIONS = ["Phase 1", "Phase 2", "Phase 3"];

export default function VESkillsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPhase, setFilterPhase] = useState("all");
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [newSkill, setNewSkill] = useState({ name: "", status: "idea", demand: 0, tools: "", notes: "", demandSource: "internal" });
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📌", color: "#4A90D9", priority: "medium", phase: "Phase 2" });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const dbRef = ref(db, DB_PATH);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setData(val);
      } else {
        set(dbRef, DEFAULT_DATA);
        setData(DEFAULT_DATA);
      }
      setLoading(false);
    }, () => {
      setData(DEFAULT_DATA);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveData = (newData) => {
    setData(newData);
    set(ref(db, DB_PATH), newData)
      .then(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 2000);
      })
      .catch(() => {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 3000);
      });
  };

  const addSkill = () => {
    if (!newSkill.name.trim() || !activeCategory) return;
    const updated = { ...data };
    const cat = updated.categories.find((c) => c.id === activeCategory);
    if (!cat) return;
    const id = `${cat.id}-${Date.now()}`;
    cat.skills.push({ ...newSkill, id, demand: parseInt(newSkill.demand) || 0 });
    saveData(updated);
    setNewSkill({ name: "", status: "idea", demand: 0, tools: "", notes: "", demandSource: "internal" });
    setShowAddSkill(false);
  };

  const addCategory = () => {
    if (!newCategory.name.trim()) return;
    const updated = { ...data };
    const id = `cat-${Date.now()}`;
    updated.categories.push({ ...newCategory, id, skills: [] });
    saveData(updated);
    setNewCategory({ name: "", icon: "📌", color: "#4A90D9", priority: "medium", phase: "Phase 2" });
    setShowAddCategory(false);
  };

  const updateSkillStatus = (catId, skillId, newStatus) => {
    const updated = { ...data };
    const cat = updated.categories.find((c) => c.id === catId);
    const skill = cat?.skills.find((s) => s.id === skillId);
    if (skill) {
      skill.status = newStatus;
      saveData(updated);
    }
  };

  const deleteSkill = (catId, skillId) => {
    const updated = { ...data };
    const cat = updated.categories.find((c) => c.id === catId);
    if (cat) {
      cat.skills = cat.skills.filter((s) => s.id !== skillId);
      saveData(updated);
    }
  };

  const resetData = () => {
    if (confirm("Reset all data to defaults? This will remove any custom skills you've added.")) {
      saveData(DEFAULT_DATA);
      setActiveCategory(null);
    }
  };

  if (loading || !data) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0D0D12", color: "#F0EDE6" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16, animation: "pulse 1.5s infinite" }}>⚡</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, letterSpacing: 2, textTransform: "uppercase" }}>Loading Skills Library...</div>
        </div>
      </div>
    );
  }

  // Compute stats
  const totalSkills = data.categories.reduce((acc, c) => acc + c.skills.length, 0);
  const statusCounts = {};
  Object.keys(STATUS_CONFIG).forEach((s) => (statusCounts[s] = 0));
  data.categories.forEach((c) => c.skills.forEach((s) => { statusCounts[s.status] = (statusCounts[s.status] || 0) + 1; }));

  const filteredCategories = data.categories
    .filter((c) => filterPhase === "all" || c.phase === filterPhase)
    .map((c) => ({
      ...c,
      skills: c.skills.filter((s) => {
        const matchesStatus = filterStatus === "all" || s.status === filterStatus;
        const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tools.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    }))
    .filter((c) => c.skills.length > 0 || filterStatus === "all");

  const activeCat = activeCategory ? data.categories.find((c) => c.id === activeCategory) : null;

  const highDemandSkills = data.categories
    .flatMap((c) => c.skills.map((s) => ({ ...s, categoryName: c.name, categoryColor: c.color })))
    .filter((s) => s.demand >= 50)
    .sort((a, b) => b.demand - a.demand);

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D12", color: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card { transition: all 0.2s ease; cursor: pointer; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .skill-row { transition: all 0.15s ease; }
        .skill-row:hover { background: rgba(255,255,255,0.04) !important; }
        .btn { cursor: pointer; transition: all 0.15s ease; border: none; outline: none; font-family: 'DM Sans', sans-serif; }
        .btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
        .btn:active { transform: translateY(0); }
        input, select, textarea { font-family: 'DM Sans', sans-serif; }
        .demand-bar { transition: width 0.6s ease; }
        .tag { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        .filter-btn { padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #999; transition: all 0.15s ease; }
        .filter-btn.active { background: rgba(255,255,255,0.1); color: #F0EDE6; border-color: rgba(255,255,255,0.2); }
        .filter-btn:hover { border-color: rgba(255,255,255,0.2); color: #F0EDE6; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 100; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; backdrop-filter: blur(4px); }
        .modal { background: #1A1A24; border-radius: 16px; padding: 32px; width: 90%; max-width: 500px; animation: slideUp 0.3s ease; border: 1px solid rgba(255,255,255,0.08); }
        .input-field { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #F0EDE6; font-size: 14px; outline: none; }
        .input-field:focus { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); }
        .input-field::placeholder { color: #555; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Virtual Elves AI Skills Library</h1>
            </div>
            <p style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
              Product suite dashboard · {totalSkills} skills across {data.categories.length} categories
              {saveStatus === "saved" && <span style={{ color: "#7ED321", marginLeft: 12 }}>✓ Saved</span>}
              {saveStatus === "error" && <span style={{ color: "#E85D75", marginLeft: 12 }}>Save failed</span>}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => setShowAddCategory(true)} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "#AAA", fontSize: 13, border: "1px solid rgba(255,255,255,0.08)" }}>+ Category</button>
            <button className="btn" onClick={resetData} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#666", fontSize: 13, border: "1px solid rgba(255,255,255,0.06)" }}>Reset</button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <div key={key} style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", minWidth: 90 }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Mono', monospace", color: cfg.color }}>{statusCounts[key] || 0}</div>
              <div style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5 }}>{cfg.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text" placeholder="Search skills or tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "7px 14px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0EDE6", fontSize: 12, width: 200, outline: "none" }}
          />
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 4px" }} />
          <button className={`filter-btn ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>All</button>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button key={key} className={`filter-btn ${filterStatus === key ? "active" : ""}`} onClick={() => setFilterStatus(key)} style={filterStatus === key ? { borderColor: cfg.color + "44", color: cfg.color } : {}}>
              {cfg.label}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 4px" }} />
          {PHASE_OPTIONS.map((p) => (
            <button key={p} className={`filter-btn ${filterPhase === p ? "active" : ""}`} onClick={() => setFilterPhase(filterPhase === p ? "all" : p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 200px)" }}>
        {/* Sidebar: Categories */}
        <div style={{ width: 260, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "0 16px 12px", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>Categories</div>

          <div
            className="card" onClick={() => setActiveCategory(null)}
            style={{ padding: "12px 16px", margin: "0 8px 2px", borderRadius: 10, background: !activeCategory ? "rgba(255,255,255,0.06)" : "transparent", display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ fontSize: 16 }}>📊</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Overview</div>
              <div style={{ fontSize: 11, color: "#666" }}>All categories</div>
            </div>
          </div>

          {data.categories.map((cat) => {
            const catSkillCount = cat.skills.length;
            const protoCount = cat.skills.filter((s) => s.status === "prototype" || s.status === "in-progress").length;
            return (
              <div
                key={cat.id} className="card"
                onClick={() => { setActiveCategory(cat.id); setShowAddSkill(false); }}
                style={{
                  padding: "12px 16px", margin: "2px 8px", borderRadius: 10,
                  background: activeCategory === cat.id ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: activeCategory === cat.id ? `3px solid ${cat.color}` : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{cat.name}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: "#666" }}>{catSkillCount} skills</span>
                      {protoCount > 0 && <span style={{ fontSize: 11, color: "#7ED321" }}>{protoCount} active</span>}
                    </div>
                  </div>
                  <span className="tag" style={{ background: PRIORITY_CONFIG[cat.priority].color + "18", color: PRIORITY_CONFIG[cat.priority].color, fontSize: 9 }}>
                    {cat.phase}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
          {!activeCategory ? (
            /* OVERVIEW VIEW */
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Product Suite Overview</h2>
              <p style={{ fontSize: 13, color: "#777", marginBottom: 24 }}>
                Demand signals from 16 client job descriptions · Skills mapped from CEO Roadmap + Client Analysis
              </p>

              {/* High demand skills */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 13, color: "#999", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 14 }}>
                  🔥 High-Demand Skills (50%+ client requests)
                </h3>
                <div style={{ display: "grid", gap: 6 }}>
                  {highDemandSkills.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ width: 36, fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: s.demand >= 60 ? "#E85D75" : "#F5A623" }}>{s.demand}%</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "#666" }}>{s.categoryName}</div>
                      </div>
                      <span className="tag" style={{ background: STATUS_CONFIG[s.status]?.color + "18", color: STATUS_CONFIG[s.status]?.color }}>{STATUS_CONFIG[s.status]?.label}</span>
                      <div style={{ width: 100, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                        <div className="demand-bar" style={{ width: `${s.demand}%`, height: "100%", background: s.demand >= 60 ? "#E85D75" : "#F5A623", borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category grid */}
              <h3 style={{ fontSize: 13, color: "#999", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 14 }}>All Categories</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {filteredCategories.map((cat) => {
                  const avgDemand = cat.skills.length ? Math.round(cat.skills.reduce((a, s) => a + s.demand, 0) / cat.skills.length) : 0;
                  return (
                    <div
                      key={cat.id} className="card"
                      onClick={() => setActiveCategory(cat.id)}
                      style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", animation: "slideUp 0.3s ease" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 24 }}>{cat.icon}</span>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 600 }}>{cat.name}</div>
                            <div style={{ fontSize: 11, color: "#666" }}>{cat.phase} · {PRIORITY_CONFIG[cat.priority].label}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Space Mono', monospace", color: cat.color }}>{cat.skills.length}</div>
                          <div style={{ fontSize: 10, color: "#666" }}>SKILLS</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                          const count = cat.skills.filter((s) => s.status === key).length;
                          if (!count) return null;
                          return <span key={key} className="tag" style={{ background: cfg.color + "15", color: cfg.color }}>{count} {cfg.label}</span>;
                        })}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontSize: 11, color: "#666", width: 70 }}>Avg demand</div>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                          <div className="demand-bar" style={{ width: `${avgDemand}%`, height: "100%", background: `linear-gradient(90deg, ${cat.color}88, ${cat.color})`, borderRadius: 3 }} />
                        </div>
                        <div style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: cat.color, width: 35, textAlign: "right" }}>{avgDemand}%</div>
                      </div>
                      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {cat.skills.slice(0, 4).map((s) => (
                          <span key={s.id} style={{ fontSize: 11, color: "#777", padding: "2px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 4 }}>{s.name}</span>
                        ))}
                        {cat.skills.length > 4 && <span style={{ fontSize: 11, color: "#555", padding: "2px 8px" }}>+{cat.skills.length - 4} more</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CATEGORY DETAIL VIEW */
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 24 }}>{activeCat?.icon}</span>
                    <h2 style={{ fontSize: 20, fontWeight: 600 }}>{activeCat?.name}</h2>
                    <span className="tag" style={{ background: PRIORITY_CONFIG[activeCat?.priority]?.color + "18", color: PRIORITY_CONFIG[activeCat?.priority]?.color }}>{activeCat?.phase}</span>
                    <span className="tag" style={{ background: "rgba(255,255,255,0.06)", color: "#999" }}>{PRIORITY_CONFIG[activeCat?.priority]?.label}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#777" }}>{activeCat?.skills.length} skills in this category</p>
                </div>
                <button className="btn" onClick={() => setShowAddSkill(true)} style={{ padding: "10px 20px", borderRadius: 10, background: activeCat?.color || "#4A90D9", color: "#fff", fontSize: 13, fontWeight: 600 }}>
                  + Add Skill
                </button>
              </div>

              {/* Skills list */}
              <div style={{ display: "grid", gap: 4 }}>
                {activeCat?.skills
                  .filter((s) => filterStatus === "all" || s.status === filterStatus)
                  .filter((s) => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tools.toLowerCase().includes(searchQuery.toLowerCase()))
                  .sort((a, b) => b.demand - a.demand)
                  .map((skill) => (
                    <div key={skill.id} className="skill-row" style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                      <div
                        onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                        style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
                      >
                        {/* Demand */}
                        <div style={{ width: 44, textAlign: "center" }}>
                          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Mono', monospace", color: skill.demand >= 60 ? "#E85D75" : skill.demand >= 40 ? "#F5A623" : "#4A90D9" }}>
                            {skill.demand}%
                          </div>
                        </div>

                        {/* Name + tools */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{skill.name}</div>
                          <div style={{ fontSize: 11, color: "#666" }}>{skill.tools}</div>
                        </div>

                        {/* Source tag */}
                        <span className="tag" style={{
                          background: skill.demandSource === "client-analysis" ? "rgba(126,211,33,0.12)" : "rgba(74,144,217,0.12)",
                          color: skill.demandSource === "client-analysis" ? "#7ED321" : "#4A90D9",
                          fontSize: 9,
                        }}>
                          {skill.demandSource === "client-analysis" ? "Client Data" : skill.demandSource === "roadmap" ? "Roadmap" : "Internal"}
                        </span>

                        {/* Status dropdown */}
                        <select
                          value={skill.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateSkillStatus(activeCategory, skill.id, e.target.value)}
                          style={{
                            padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                            background: STATUS_CONFIG[skill.status]?.color + "18",
                            color: STATUS_CONFIG[skill.status]?.color,
                            border: `1px solid ${STATUS_CONFIG[skill.status]?.color}33`,
                            cursor: "pointer", outline: "none",
                          }}
                        >
                          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <option key={key} value={key}>{cfg.label}</option>
                          ))}
                        </select>

                        {/* Demand bar */}
                        <div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                          <div className="demand-bar" style={{
                            width: `${skill.demand}%`, height: "100%", borderRadius: 3,
                            background: skill.demand >= 60 ? "#E85D75" : skill.demand >= 40 ? "#F5A623" : "#4A90D9",
                          }} />
                        </div>

                        <span style={{ fontSize: 12, color: "#555", transition: "transform 0.2s", transform: expandedSkill === skill.id ? "rotate(180deg)" : "none" }}>▼</span>
                      </div>

                      {/* Expanded detail */}
                      {expandedSkill === skill.id && (
                        <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14, animation: "slideUp 0.2s ease" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                            <div>
                              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Tools</div>
                              <div style={{ fontSize: 13, color: "#CCC" }}>{skill.tools || "—"}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Data Source</div>
                              <div style={{ fontSize: 13, color: "#CCC" }}>{skill.demandSource === "client-analysis" ? "Client Job Description Analysis (16 JDs)" : skill.demandSource === "roadmap" ? "CEO Strategic Roadmap" : "Internal idea"}</div>
                            </div>
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Notes</div>
                            <div style={{ fontSize: 13, color: "#CCC", lineHeight: 1.6 }}>{skill.notes || "—"}</div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: 11, color: "#555" }}>
                              Skill components: Skill File (md) · Reference Files · Knowledge Base Suggestions · VA Deployment Instructions
                            </div>
                            <button className="btn" onClick={() => deleteSkill(activeCategory, skill.id)} style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(232,93,117,0.1)", color: "#E85D75", fontSize: 11 }}>
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkill && (
        <div className="modal-overlay" onClick={() => setShowAddSkill(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Add Skill to {activeCat?.name}</h3>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Skill Name *</label>
                <input className="input-field" placeholder="e.g. Instagram Reels Creator" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Status</label>
                  <select className="input-field" value={newSkill.status} onChange={(e) => setNewSkill({ ...newSkill, status: e.target.value })}>
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => <option key={key} value={key}>{cfg.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Demand Signal (%)</label>
                  <input className="input-field" type="number" min="0" max="100" placeholder="0-100" value={newSkill.demand} onChange={(e) => setNewSkill({ ...newSkill, demand: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Tools / Platforms</label>
                <input className="input-field" placeholder="e.g. Canva, Later, Meta Business Suite" value={newSkill.tools} onChange={(e) => setNewSkill({ ...newSkill, tools: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Notes</label>
                <textarea className="input-field" rows={3} placeholder="Context, demand rationale, build notes..." value={newSkill.notes} onChange={(e) => setNewSkill({ ...newSkill, notes: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Data Source</label>
                <select className="input-field" value={newSkill.demandSource} onChange={(e) => setNewSkill({ ...newSkill, demandSource: e.target.value })}>
                  <option value="internal">Internal Idea</option>
                  <option value="client-analysis">Client Data</option>
                  <option value="roadmap">CEO Roadmap</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => setShowAddSkill(false)} style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#999", fontSize: 13 }}>Cancel</button>
              <button className="btn" onClick={addSkill} disabled={!newSkill.name.trim()} style={{ padding: "10px 24px", borderRadius: 10, background: activeCat?.color || "#4A90D9", color: "#fff", fontSize: 13, fontWeight: 600, opacity: newSkill.name.trim() ? 1 : 0.4 }}>Add Skill</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="modal-overlay" onClick={() => setShowAddCategory(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Add New Category</h3>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Category Name *</label>
                <input className="input-field" placeholder="e.g. Customer Support" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Icon (emoji)</label>
                  <input className="input-field" value={newCategory.icon} onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Priority</label>
                  <select className="input-field" value={newCategory.priority} onChange={(e) => setNewCategory({ ...newCategory, priority: e.target.value })}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Phase</label>
                  <select className="input-field" value={newCategory.phase} onChange={(e) => setNewCategory({ ...newCategory, phase: e.target.value })}>
                    {PHASE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Colour</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["#E85D75", "#4A90D9", "#F5A623", "#7ED321", "#BD10E0", "#50E3C2", "#FF6B35", "#9B59B6"].map((c) => (
                    <div key={c} onClick={() => setNewCategory({ ...newCategory, color: c })} style={{ width: 32, height: 32, borderRadius: 8, background: c, cursor: "pointer", border: newCategory.color === c ? "3px solid #F0EDE6" : "3px solid transparent", transition: "all 0.15s" }} />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => setShowAddCategory(false)} style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#999", fontSize: 13 }}>Cancel</button>
              <button className="btn" onClick={addCategory} disabled={!newCategory.name.trim()} style={{ padding: "10px 24px", borderRadius: 10, background: newCategory.color, color: "#fff", fontSize: 13, fontWeight: 600, opacity: newCategory.name.trim() ? 1 : 0.4 }}>Add Category</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
