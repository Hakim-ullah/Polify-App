// assets/dummyStyles.js

export const authLayoutStyles = {
  // Layout containers
  container: "min-h-screen lg:grid lg:grid-cols-[1fr_1.1fr] bg-zinc-950",
  leftPanel:
    "hidden lg:flex flex-col justify-between p-14 relative overflow-hidden bg-zinc-900 border-r border-zinc-800",
  rightPanel:
    "flex items-center justify-center px-5 py-10 sm:px-10 min-h-screen lg:min-h-0 bg-zinc-950",
  formContainer: "w-full max-w-105",

  // Background grid pattern (inline styles)
  gridPatternStyle: {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
  },

  // Glow blobs
  glowTop:
    "absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2",
  glowBottom:
    "absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl translate-x-1/3 translate-y-1/3",

  // Logo
  logoContainer: "relative flex items-center gap-3",
  logoImg: "w-10 h-10 rounded-xl shadow-lg shadow-emerald-500/25",
  logoText: "text-xl font-bold text-white tracking-tight",

  // Main copy
  mainCopyContainer: "relative space-y-6",
  mainCopyInner: "space-y-3",
  liveBadge:
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide",
  dot: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse",
  heading: "text-4xl font-extrabold text-white leading-[1.15] tracking-tight",
  emeraldText: "text-emerald-400",
  description: "text-zinc-400 text-base leading-relaxed max-w-xs",

  // Stats
  statsGrid: "grid grid-cols-3 gap-3 pt-2",
  statCard: "bg-zinc-800/60 border border-zinc-700/60 rounded-xl p-3 space-y-1.5",
  statValue: "text-white font-bold text-lg leading-none",
  statLabel: "text-zinc-500 text-[11px] leading-tight",

  // Footer
  footer: "relative text-zinc-600 text-xs",

  // Mobile logo
  mobileLogoContainer: "lg:hidden flex items-center gap-2.5 mb-10",
  mobileLogoImg: "w-9 h-9 rounded-xl shadow-md shadow-emerald-500/20",
  mobileLogoText: "text-xl font-bold text-white",

  // Heading
  headingWrapper: "mb-8",
  pageTitle: "text-[28px] font-bold text-white tracking-tight leading-tight",
  subtitle: "text-zinc-400 mt-2 text-sm leading-relaxed",
};

// assets/dummyStyles.js

export const commentsStyles = {
  // --- Comments container ---
  commentsContainer: "mt-4 pt-4 border-t border-zinc-800/60",

  // --- Input form (main) ---
  mainForm: "flex gap-2 mb-4",
  mainInput:
    "flex-1 rounded-xl bg-zinc-800/60 border border-zinc-800 px-3 py-2 text-xs text-zinc-300 placeholder:text-zinc-700 outline-none transition-colors focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15",
  mainSubmit:
    "w-8 h-8 grid place-items-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 disabled:opacity-40 hover:bg-emerald-500/20 transition-colors shrink-0",

  // --- Comment list ---
  commentList: "space-y-3",
  emptyText: "text-xs text-zinc-700 text-center py-3",

  // --- CommentItem (top-level) ---
  commentItem: "flex gap-2.5",
  avatarSmall: "w-6 h-6 text-[10px] shrink-0 mt-0.5",
  commentContent: "flex-1 min-w-0",
  commentBubble: "bg-zinc-800/40 rounded-xl px-3 py-2",
  commentHeader: "flex items-center gap-1.5 mb-0.5",
  usernameLink:
    "text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 transition-colors",
  timestamp: "text-zinc-700 text-[10px]",
  commentText: "text-xs text-zinc-300 leading-relaxed",

  // --- Comment actions ---
  commentActions: "flex items-center gap-2 mt-1 ml-2",
  replyButton:
    "text-[10px] font-medium text-zinc-700 hover:text-emerald-500 transition-colors",
  deleteButton:
    "text-[10px] font-medium text-zinc-700 hover:text-rose-400 transition-colors inline-flex items-center gap-0.5",

  // --- Reply form (inline) ---
  replyForm: "flex gap-2 mt-2",
  replyInput:
    "flex-1 rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-emerald-500/50",
  replySubmit:
    "w-7 h-7 grid place-items-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors shrink-0",

  // --- Nested replies container ---
  repliesContainer: "mt-2 space-y-2 border-l border-zinc-800 pl-3 ml-1",
  replyItem: "flex gap-2",
  replyIndent: "text-zinc-700 mt-0.5 shrink-0",
  avatarTiny: "w-5 h-5 text-[9px] shrink-0",
  replyBubble: "flex-1 min-w-0 bg-zinc-800/30 rounded-xl px-2.5 py-1.5",
  replyHeader: "flex items-center gap-1.5 mb-0.5",
  replyUsername:
    "text-[10px] font-semibold text-zinc-500 hover:text-zinc-300",
  replyTimestamp: "text-zinc-700 text-[9px]",
  replyText: "text-xs text-zinc-400",
  replyDelete:
    "text-[10px] font-medium text-zinc-700 hover:text-rose-400 transition-colors inline-flex items-center gap-0.5 mt-0.5",
};

// assets/dummyStyles.js

export const connectionsStyles = {
  container: "space-y-3",
  tabContainer:
    "inline-flex rounded-xl bg-zinc-800/60 border border-zinc-800 p-1 text-xs font-semibold",
  tabButtonBase: "px-3 py-1.5 rounded-lg transition-colors",
  tabButtonActive: "bg-zinc-700 text-white",
  tabButtonInactive: "text-zinc-500 hover:text-zinc-300",
  emptyText: "text-xs text-zinc-600 py-2",
  userList: "space-y-1",
  userLink:
    "flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-zinc-800/60 transition-colors",
  userAvatar: "w-8 h-8 text-xs",
  userInfo: "min-w-0",
  userName: "text-xs font-semibold text-zinc-300 truncate",
  userUsername: "text-[11px] text-zinc-600 truncate",
};

// assets/dummyStyles.js

export const filterBarStyles = {
  container: "flex flex-wrap items-center gap-1.5",
  filterButtonBase:
    "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
  filterButtonActive:
    "bg-zinc-800 text-zinc-200 border border-zinc-700",
  filterButtonInactive:
    "text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 border border-transparent",
  clearButton:
    "inline-flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-medium text-zinc-700 hover:text-zinc-500 transition-colors",
};

// assets/dummyStyles.js

export const layoutStyles = {
  // â”€â”€â”€ Containers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  container: "min-h-screen bg-zinc-950",
  header: "sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60",
  headerInner: "max-w-7xl mx-auto px-4 h-14 flex items-center gap-3",
  bodyContainer: "max-w-7xl mx-auto px-3 sm:px-4 flex gap-5 xl:gap-6",

  // â”€â”€â”€ Logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  logoLink: "flex items-center gap-2 shrink-0 group",
  logoImg: "w-8 h-8 rounded-lg shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-105",
  logoSpan: "hidden sm:block text-[15px] font-bold text-white tracking-tight",

  // â”€â”€â”€ Search (desktop) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  searchDesktop: "hidden md:flex flex-1 max-w-md mx-auto relative",
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none",
  searchInput:
    "w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-8 pr-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none transition-all hover:border-zinc-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20",

  // â”€â”€â”€ Right cluster â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  rightCluster: "flex items-center gap-1.5 ml-auto md:ml-0 shrink-0",
  mobileSearchToggle:
    "md:hidden w-9 h-9 grid place-items-center rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors",
  createButton:
    "hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 text-white px-3.5 py-2 text-sm font-semibold hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/25",
  avatarWrapper: "relative shrink-0",
  avatarClass: "w-7 h-7 text-xs ring-1 ring-zinc-700",

  // â”€â”€â”€ Mobile search (expanded) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  mobileSearchContainer: "md:hidden px-4 pb-3 border-t border-zinc-800/60",
  mobileSearchInner: "relative mt-3",
  mobileSearchInput:
    "w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-8 pr-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-emerald-500/50",

  // â”€â”€â”€ Left sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  leftSidebar:
    "hidden lg:flex flex-col w-52 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] py-6 pr-1",
  menuLabel: "px-3 mb-2 text-[10px] font-bold text-zinc-700 uppercase tracking-widest",
  navContainer: "space-y-0.5 flex-1",

  // Side link variants
  sideLinkBase:
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
  sideLinkActive:
    "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20",
  sideLinkInactive: "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60",

  // Sidebar bottom
  sidebarBottom: "pt-4 border-t border-zinc-800/60 space-y-0.5",
  logoutButton:
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/8 transition-colors",

  // â”€â”€â”€ Main content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  mainContent: "flex-1 min-w-0 max-w-2xl mx-auto py-5 pb-24 lg:pb-6",

  // â”€â”€â”€ Right rail â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  rightRail:
    "hidden xl:flex flex-col w-72 shrink-0 py-5 gap-3 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto",

  // â”€â”€â”€ Mobile bottom nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  bottomNav:
    "lg:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/60 flex justify-around px-2 py-1",

  // Bottom link variants
  bottomLinkBase:
    "flex flex-col items-center gap-1 py-2 px-3 text-[10px] font-semibold transition-colors",
  bottomLinkActive: "text-emerald-400",
  bottomLinkInactive: "text-zinc-600",
};

// assets/dummyStyles.js

export const notificationStyles = {
  // Container
  container: "relative shrink-0",

  // Bell button
  bellButton:
    "relative grid place-items-center w-8 h-8 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors",
  badgeDot:
    "absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950",

  // Dropdown panel
  dropdown:
    "fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-14 sm:top-full mt-0 sm:mt-2 w-auto sm:w-80 max-h-[70vh] sm:max-h-95 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/40 z-50",
  header:
    "sticky top-0 bg-zinc-900 px-4 py-3 border-b border-zinc-800",
  headerText:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest",
  emptyText:
    "px-4 py-8 text-sm text-zinc-600 text-center",

  // Notification items
  notificationLink:
    "block px-4 py-3 text-xs hover:bg-zinc-800 transition-colors border-b border-zinc-800/60 last:border-0",
  notificationUnread: "bg-emerald-500/4",
  notificationText: "text-zinc-400",
  actorName: "font-semibold text-zinc-200",
  pollPreview: "text-zinc-600",
};

// assets/dummyStyles.js

export const otpStepStyles = {
  // â”€â”€â”€ Form container â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  form: "space-y-5",

  // â”€â”€â”€ Email badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  emailBadge: "flex items-center gap-3 rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3",
  emailIconWrapper: "w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 grid place-items-center shrink-0",
  emailLabel: "text-xs text-zinc-500 font-medium",
  emailValue: "text-sm font-semibold text-white",

  // â”€â”€â”€ Error message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  errorBox: "rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-rose-300 text-sm",

  // Fallback code (shown when the email could not be sent)
  fallbackBox:
    "rounded-xl bg-amber-500/10 border border-amber-500/25 px-4 py-3 text-amber-300 text-sm",
  fallbackCode:
    "mt-2 text-center text-2xl font-bold tracking-[0.5em] text-amber-200 select-all",

  // â”€â”€â”€ OTP input field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  otpLabel: "block text-xs font-semibold text-zinc-400 uppercase tracking-wider",
  otpInput:
    "w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-4 text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-center text-3xl tracking-[0.6em] font-bold",
  otpDotsContainer: "flex gap-1.5 justify-center pt-1",
  otpDot: "w-1.5 h-1.5 rounded-full transition-colors",
  otpDotFilled: "bg-emerald-400",
  otpDotEmpty: "bg-zinc-700",

  // â”€â”€â”€ Resend area â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  resendText: "text-sm text-zinc-500",
  resendTimer: "font-semibold text-zinc-300 tabular-nums",
  resendButton:
    "inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50",
  resendIcon: "animate-spin", // only for when resending

  // â”€â”€â”€ Spinner inside AuthButton â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  spinner: "animate-spin w-4 h-4",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
};

// assets/dummyStyles.js

export const pollCardStyles = {
  card: "bg-zinc-900/70 border border-zinc-800/80 rounded-2xl mb-3 overflow-hidden transition-all hover:border-zinc-700/80 hover:bg-zinc-900",
  header: "flex items-center gap-2 mb-3",
  avatar: "w-7 h-7 text-xs shrink-0",
  userInfo: "flex-1 min-w-0",
  userInfoInner: "flex items-center gap-1.5 flex-wrap",
  userNameLink: "text-xs font-semibold text-zinc-300 hover:text-white transition-colors",
  dot: "text-zinc-700 text-xs",
  username: "text-xs text-zinc-600",
  timestamp: "text-xs text-zinc-700",
  closedBadge: "inline-flex items-center gap-1 rounded-lg bg-rose-500/10 border border-rose-500/15 text-rose-500 px-2 py-0.5 text-[10px] font-semibold",
  categoryTagBase: "rounded-lg border px-2 py-0.5 text-[10px] font-semibold",
  ownerControls: "flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-zinc-800/60",
  ownerButton: "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors",
  ownerAnalytics: "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-emerald-500 hover:text-emerald-400 hover:border-zinc-600 transition-colors",
  ownerDelete: "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-rose-500/20 text-rose-500 hover:bg-rose-500/8 transition-colors",
  question: "text-[15px] font-semibold text-zinc-100 mb-3 leading-snug",
  editTextarea: "min-h-16 resize-y",
  footer: "flex items-center gap-0.5 mt-3 pt-3 border-t border-zinc-800/60",
  totalVotes: "inline-flex items-center gap-1 rounded-lg bg-emerald-500/8 text-emerald-500 px-2.5 py-1.5 text-xs font-semibold mr-1",
  action: "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors",
  actionActive: "text-emerald-400 bg-emerald-500/8",
  saveIconFill: "fill-emerald-400",
  editButton: "py-1.5 text-xs",
};


// assets/dummyStyles.js

export const pollResultsStyles = {
  // â”€â”€â”€ ResultBar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  resultBarBase:
    "relative h-9 rounded-xl overflow-hidden border transition-all duration-200 group",
  resultBarHighlight:
    "border-emerald-500/30 bg-zinc-850 hover:border-rose-500/40 hover:bg-rose-500/5 hover:shadow-[0_0_10px_rgba(239,68,68,0.12)] cursor-pointer",
  resultBarDefault: "border-zinc-800 bg-zinc-800/50 cursor-default",
  resultBarFill:
    "absolute inset-y-0 left-0 transition-all duration-700 ease-out",
  resultBarFillHighlight: "bg-emerald-500/15 group-hover:bg-rose-500/10",
  resultBarFillWinner: "bg-emerald-500/10",
  resultBarFillDefault: "bg-zinc-700/25",
  resultBarContent:
    "relative h-full flex justify-between items-center px-3 text-xs select-none",
  resultBarLabelBase:
    "font-medium flex items-center gap-1.5 transition-colors",
  resultBarLabelHighlight: "text-emerald-400 group-hover:text-rose-400",
  resultBarLabelDefault: "text-zinc-400",
  resultBarPercentBase:
    "font-bold tabular-nums flex items-center gap-2 transition-colors",
  resultBarPercentHighlight: "text-emerald-400 group-hover:text-rose-400",
  resultBarPercentDefault: "text-zinc-500",
  resultBarUndoHint:
    "text-[10px] text-rose-400/70 font-normal hidden group-hover:inline",
  resultBarCheck: "shrink-0 group-hover:hidden",
  resultBarUndoIcon:
    "shrink-0 hidden group-hover:inline animate-[spin_2s_linear_infinite]",

  // â”€â”€â”€ VersusBar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  versusEmpty:
    "h-10 rounded-xl bg-zinc-800/50 border border-zinc-800 grid place-items-center text-xs text-zinc-600",
  versusBarContainer:
    "flex h-10 rounded-xl overflow-hidden border border-zinc-800 relative group",
  versusYesBase:
    "transition-all duration-700 ease-out bg-emerald-500/60 flex items-center px-3 text-white font-bold text-xs",
  versusYesHover:
    "hover:bg-emerald-500/50 cursor-pointer",
  versusNoBase:
    "flex-1 bg-rose-500/50 flex items-center justify-end px-3 text-white font-bold text-xs",
  versusNoHover:
    "hover:bg-rose-500/40 cursor-pointer",
  versusLabels: "flex justify-between mt-2 text-xs font-medium",
  versusLabelYesBase:
    "inline-flex items-center gap-1 transition-colors select-none",
  versusLabelYesActive:
    "text-emerald-400 hover:text-rose-400 cursor-pointer group-hover:text-rose-450",
  versusLabelYesInactive: "text-zinc-600",
  versusLabelNoBase:
    "inline-flex items-center gap-1 transition-colors select-none",
  versusLabelNoActive: "text-rose-400 hover:text-rose-300 cursor-pointer",
  versusLabelNoInactive: "text-zinc-600",
  versusVoteCount: "text-zinc-700 select-none",
  versusUndoHint: "text-[10px] font-normal text-zinc-500",

  // â”€â”€â”€ Open type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  openContainer: "space-y-2",
  openHeader: "text-[10px] font-bold text-zinc-700 uppercase tracking-widest",
  openResponse:
    "rounded-xl border border-zinc-800 bg-zinc-800/30 px-4 py-2.5 text-xs text-zinc-400",
  openEmpty: "text-xs text-zinc-700",

  // â”€â”€â”€ Image type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  imageGrid: "grid grid-cols-2 gap-2",
  imageItemBase:
    "relative rounded-xl overflow-hidden border-2 transition-all duration-250",
  imageItemActive:
    "border-emerald-500 cursor-pointer hover:border-rose-500/80 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)] group/img",
  imageItemInactive: "border-zinc-800",
  imageThumb: "w-full h-32 object-cover",
  imageBadge:
    "absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full bg-emerald-500 text-white group-hover/img:bg-rose-500 transition-colors",
  imageUndoText:
    "absolute bottom-0 inset-x-0 text-center py-1 text-[10px] text-rose-300/90 bg-black/60 backdrop-blur-xs hidden group-hover/img:inline select-none",

  // â”€â”€â”€ Rating summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ratingSummary:
    "flex items-center gap-2.5 mb-2 p-3 rounded-xl bg-zinc-800/40 border border-zinc-800",
  ratingAverage: "text-xl font-extrabold text-white select-none",
  ratingStars: "flex gap-0.5",
  starFilled: "text-amber-400 fill-amber-400",
  starEmpty: "text-zinc-700",
  ratingCount: "text-xs text-zinc-600 select-none",

  // â”€â”€â”€ Common â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  totalVotesText:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest pt-1 select-none",
};

// assets/dummyStyles.js

export const pollVoteStyles = {
  // â”€â”€â”€ Yes/No buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  yesNoGrid: "grid grid-cols-2 gap-2",
  yesNoButtonBase:
    "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all",
  yesNoButtonYesActive:
    "border-emerald-500/60 bg-emerald-500/15 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
  yesNoButtonYesInactive:
    "border-zinc-800 text-zinc-500 hover:border-emerald-500/40 hover:bg-emerald-500/8 hover:text-emerald-400",
  yesNoButtonNoActive:
    "border-rose-500/60 bg-rose-500/15 text-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
  yesNoButtonNoInactive:
    "border-zinc-800 text-zinc-500 hover:border-rose-500/40 hover:bg-rose-500/8 hover:text-rose-400",

  // â”€â”€â”€ Single choice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  singleContainer: "space-y-1.5",
  singleOptionBase:
    "group w-full flex items-center gap-3 text-left rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
  singleOptionActive:
    "border-emerald-500/50 bg-emerald-500/10 text-zinc-200 shadow-[0_0_8px_rgba(16,185,129,0.12)]",
  singleOptionInactive:
    "border-zinc-800 text-zinc-500 hover:border-emerald-500/30 hover:bg-emerald-500/6 hover:text-zinc-300",
  singleOptionCircleBase:
    "grid place-items-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-all",
  singleOptionCircleActive: "bg-emerald-500/25 text-emerald-400",
  singleOptionCircleInactive:
    "bg-zinc-800 text-zinc-600 group-hover:bg-emerald-500/15 group-hover:text-emerald-400",
  singleUndoHint: "ml-auto text-[10px] text-rose-400/70 font-normal",

  // â”€â”€â”€ Rating â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ratingContainer: "flex items-center gap-4 py-1",
  ratingStars: "flex gap-1",
  ratingStarButton:
    "transition-transform hover:scale-110 p-0.5",
  ratingStarFilled: "text-amber-400 fill-amber-400",
  ratingStarEmpty: "text-zinc-800",
  ratingSubmit:
    "rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500/20 transition-colors",
  ratingHint: "text-xs text-zinc-700",
  ratingUndoHint: "text-xs text-rose-400/60",

  // â”€â”€â”€ Image pick â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  imageGrid: "grid grid-cols-2 gap-2",
  imageItemBase:
    "group relative rounded-xl overflow-hidden border-2 transition-all",
  imageItemActive:
    "border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  imageItemSelected: "border-emerald-500/60",
  imageItemInactive: "border-zinc-800 hover:border-zinc-700",
  imageThumb:
    "w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105",
  imageCheck:
    "absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full bg-emerald-500 text-white",
  imageUndoText:
    "absolute bottom-0 inset-x-0 text-center py-1 text-[10px] text-rose-300/80 bg-black/50 backdrop-blur-sm",
  imageSubmit:
    "mt-3 w-full rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2.5 text-sm font-semibold hover:bg-emerald-500/20 transition-colors",

  // â”€â”€â”€ Open ended â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  openTextarea: "min-h-20 resize-y",
  openFooter: "flex justify-between items-center mt-2",
  openCharCount: "text-xs text-zinc-700 tabular-nums",
  openSubmit:
    "rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 text-xs font-semibold disabled:opacity-40 hover:bg-emerald-500/20 transition-colors",
};

// assets/dummyStyles.js

export const sidebarStyles = {
  // â”€â”€â”€ ProfileCard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  profileCard:
    "relative bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-5 overflow-hidden",
  glowBlob:
    "absolute -top-8 left-1/2 -translate-x-1/2 w-44 h-24 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none",
  profileInner: "relative flex flex-col items-center text-center",
  avatarWrapper: "relative",
  avatarGlow:
    "absolute -inset-1.5 rounded-full bg-emerald-500/25 blur-md",
  avatarClass: "relative w-16 h-16 text-lg ring-2 ring-zinc-800",
  userNameLink:
    "mt-3 text-sm font-semibold text-zinc-200 hover:text-white transition-colors",
  usernameText: "text-xs text-zinc-600 mt-0.5",
  statsContainer:
    "relative mt-5 pt-4 border-t border-zinc-800/80 grid grid-cols-3 divide-x divide-zinc-800/80",
  statBox: "text-center",
  statNumber: "text-base font-bold text-white tabular-nums",
  statLabel: "text-[10px] text-zinc-600 mt-0.5 uppercase tracking-wide",
  viewProfileLink:
    "relative mt-4 flex items-center justify-center rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-400 hover:text-white text-xs font-semibold py-2 transition-colors",

  // â”€â”€â”€ Trending â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  trendingCard:
    "bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4",
  trendingHeading:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-4 flex items-center gap-2",
  trendingIcon: "text-emerald-500",
  trendingList: "space-y-3",
  trendingItem: "",
  trendingItemRow:
    "flex justify-between items-center mb-1.5",
  trendingItemLabel:
    "text-xs text-zinc-500 flex items-center gap-1.5",
  trendingItemIcon: "text-zinc-700",
  trendingItemCount:
    "text-xs font-semibold text-zinc-600 tabular-nums",
  trendingBarTrack: "h-0.5 rounded-full bg-zinc-800",
  trendingBarFillBase:
    "h-0.5 rounded-full transition-all duration-700",
};

// assets/dummyStyles.js

export const toastStyles = {
  container: "fixed top-4 right-4 z-100 space-y-2",
  toastBase:
    "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-xl backdrop-blur border",
  toastSuccess:
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
  toastError:
    "bg-rose-500/15 border-rose-500/30 text-rose-300",
};

// assets/dummyStyles.js

export const uiElementStyles = {
  // Button variants
  btnBase:
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none",
  btnPrimary:
    "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20",
  btnGhost:
    "bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700",
  btnDanger:
    "bg-zinc-800 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10",

  // Input
  inputCls:
    "w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm",

  // AuthButton
  authButton:
    "w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-emerald-500/20",

  // Field
  fieldLabel: "block text-sm font-semibold text-zinc-300 mb-1.5",

  // Avatar
  avatarImg: "rounded-full object-cover",
  avatarPlaceholder:
    "rounded-full grid place-items-center bg-emerald-500 text-white font-bold",

  // PollSkeleton
  skeletonContainer: "space-y-3",
  skeletonCard:
    "bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-4 animate-pulse",
  skeletonAvatar: "w-7 h-7 rounded-full bg-zinc-800",
  skeletonName: "h-2.5 w-24 bg-zinc-800 rounded-lg",
  skeletonUsername: "h-2 w-16 bg-zinc-800/60 rounded-lg",
  skeletonCategory: "ml-auto h-5 w-14 bg-zinc-800 rounded-lg",
  skeletonQuestion: "h-4 w-3/4 bg-zinc-800 rounded-lg mb-4",
  skeletonOptions: "space-y-2",
  skeletonOption1: "h-9 bg-zinc-800/60 rounded-xl",
  skeletonOption2: "h-9 bg-zinc-800/40 rounded-xl",
  skeletonFooter: "flex gap-2 mt-4 pt-3 border-t border-zinc-800",
  skeletonAction1: "h-6 w-14 bg-zinc-800 rounded-lg",
  skeletonAction2: "h-6 w-20 bg-zinc-800 rounded-lg",
  skeletonAction3: "h-6 w-14 bg-zinc-800 rounded-lg",
};

// assets/dummyStyles.js

export const analyticsStyles = {
  container: "space-y-5",
  backButton:
    "inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-300 transition-colors",
  heading: "text-base font-bold text-zinc-200",
  subtitle: "text-xs text-zinc-600 mt-1 leading-relaxed",
  statsGrid: "grid grid-cols-2 sm:grid-cols-4 gap-3",
  statCard:
    "bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4",
  statIcon: "inline-grid place-items-center w-8 h-8 rounded-xl",
  statValue: "mt-3 text-2xl font-bold text-white tabular-nums",
  statLabel:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest mt-0.5",
  resultsContainer:
    "bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5",
  resultsHeading:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-4",
  errorContainer:
    "bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-12 text-center text-xs text-zinc-600",
};


// assets/dummyStyles.js

export const createPollStyles = {
  heading: "text-base font-bold text-zinc-200 mb-5",
  form: "bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 space-y-5",
  errorBox:
    "flex items-start gap-3 rounded-xl bg-rose-500/8 border border-rose-500/15 text-rose-400 px-4 py-3 text-xs font-medium",
  label: "block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2",
  textarea: "min-h-24 resize-y",
  typeButtonBase:
    "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
  typeButtonActive:
    "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400",
  typeButtonInactive:
    "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600",
  optionsContainer: "space-y-2",
  optionInputWrapper: "flex gap-2",
  optionDeleteButton: "shrink-0 px-3",
  addOptionButton: "text-xs py-2",
  imageGrid: "flex gap-2 flex-wrap",
  imageItem: "relative w-20 h-20",
  imageThumb: "w-20 h-20 object-cover rounded-xl border border-zinc-700",
  imageRemoveButton:
    "absolute -top-2 -right-2 grid place-items-center w-5 h-5 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-400 transition-colors",
  imageAddLabel:
    "grid place-items-center w-20 h-20 cursor-pointer bg-zinc-800/40 border border-dashed border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-xl transition-colors",
  imageAddContent: "flex flex-col items-center gap-0.5 text-zinc-600",
  imageHint: "text-[11px] text-zinc-600 mt-2",
  submitButton: "w-full py-3",
};

// assets/dummyStyles.js

export const dashboardStyles = {
  container: "space-y-4",
  greetingRow: "flex items-center justify-between",
  greetingHeading: "text-lg font-bold text-white",
  greetingSub: "text-sm text-zinc-600 mt-0.5",
  composer: "flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-3",
  composerAvatar: "w-9 h-9 text-sm shrink-0",
  composerInput:
    "flex-1 text-left text-sm text-zinc-600 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl px-4 py-2.5 transition-colors",
  composerButton:
    "grid place-items-center w-9 h-9 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 transition-all shrink-0 shadow-lg shadow-emerald-500/25",
  feedTabs: "flex items-center gap-2",
  tabBase:
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
  tabActive: "bg-zinc-800 text-white border border-zinc-700",
  tabInactive: "text-zinc-600 hover:text-zinc-400",
  emptyContainer:
    "bg-zinc-900 border border-zinc-800 rounded-2xl p-14 text-center",
  emptyIcon:
    "grid place-items-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-500 mx-auto mb-4",
  emptyTitle: "font-semibold text-zinc-300",
  emptyDesc: "text-sm text-zinc-600 mt-1",
  emptyButton:
    "mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 text-sm font-semibold hover:bg-emerald-500/20 transition-colors",
};

// assets/dummyStyles.js

export const forgotPasswordStyles = {
  // Step indicator
  stepContainer: "flex items-center gap-2 mb-7",
  stepItemWrapper: "flex items-center gap-2",
  stepCircleBase:
    "w-6 h-6 rounded-full grid place-items-center text-xs font-bold transition-all shrink-0",
  stepCircleDone: "bg-emerald-500 text-white",
  stepCircleActive: "bg-emerald-500/20 border border-emerald-500 text-emerald-400",
  stepCircleInactive: "bg-zinc-800 border border-zinc-700 text-zinc-600",
  stepLineBase: "flex-1 h-px transition-colors",
  stepLineDone: "bg-emerald-500",
  stepLineInactive: "bg-zinc-700",

  // Error box
  errorBox:
    "mb-5 flex items-start gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3",
  errorIcon: "text-rose-400 mt-0.5 shrink-0",
  errorText: "text-rose-300 text-sm",

  // Form labels
  label: "block text-xs font-semibold text-zinc-400 uppercase tracking-wider",

  // Step 1 form
  emailForm: "space-y-4",
  emailInputWrapper: "space-y-1.5",

  // Step 3 form
  newPasswordForm: "space-y-4",
  passwordInputWrapper: "space-y-1.5",
  passwordInputWithToggle: "relative",
  passwordInput: "pr-11",
  toggleButton:
    "absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors",
  confirmInputValid: "border-emerald-600 focus:border-emerald-500",
  confirmInputInvalid: "border-rose-600/60",
  confirmFeedback:
    "absolute right-4 top-1/2 -translate-y-1/2 text-sm",
  confirmFeedbackValid: "text-emerald-400",
  confirmFeedbackInvalid: "text-rose-400",

  // Footer link
  footerLink:
    "mt-7 text-sm text-center text-zinc-500",
  link: "font-semibold text-emerald-400 hover:text-emerald-300 transition-colors",
};

// assets/dummyStyles.js

export const loginStyles = {
  notice:
    "mb-5 flex items-start gap-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 px-3.5 py-3",
  error:
    "mb-5 flex items-start gap-2.5 rounded-xl bg-rose-500/8 border border-rose-500/20 px-3.5 py-3",
  noticeIcon: "text-emerald-400 mt-0.5 shrink-0",
  errorIcon: "text-rose-400 mt-0.5 shrink-0",
  noticeText: "text-emerald-300 text-xs font-medium",
  errorText: "text-rose-300 text-xs font-medium",
  form: "space-y-4",
  field: "space-y-1.5",
  label: "block text-[10px] font-bold text-zinc-500 uppercase tracking-widest",
  inputWrapper: "relative",
  input:
    "w-full rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition-all focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/12 text-sm",
  inputWithIcon: "pr-11",
  icon: "absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none",
  passwordRow: "flex items-center justify-between",
  forgotLink:
    "text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors",
  toggleButton:
    "absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors",
  submitButton:
    "w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all shadow-lg shadow-emerald-500/25",
  divider: "flex items-center gap-3 mt-5 mb-4",
  dividerLine: "flex-1 h-px bg-zinc-800",
  dividerText: "text-zinc-700 text-[11px]",
  signupLink:
    "flex items-center justify-center w-full rounded-xl border border-zinc-700/70 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white px-4 py-3 text-sm font-semibold transition-all",
};

// assets/dummyStyles.js

export const pollListPageStyles = {
  heading: "text-xl font-bold text-white mb-4",
  emptyContainer: "bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center",
  emptyIconWrapper:
    "grid place-items-center w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto mb-3",
  emptyTitle: "font-bold text-white",
  emptyText: "text-sm text-zinc-500 mt-1",
};

// assets/dummyStyles.js

export const signupStyles = {
  errorBox:
    "mb-5 flex items-start gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3",
  errorIcon: "text-rose-400 mt-0.5 shrink-0",
  errorText: "text-rose-300 text-sm",

  form: "space-y-4",

  // Avatar picker
  avatarContainer: "flex items-center gap-4",
  avatarLabel:
    "relative cursor-pointer group shrink-0",
  avatarCircle:
    "w-14 h-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors grid place-items-center",
  avatarImage: "w-full h-full object-cover",
  avatarPlaceholder:
    "text-zinc-500 group-hover:text-emerald-400 transition-colors",
  avatarCamera:
    "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-950 grid place-items-center",
  avatarCameraIcon: "text-white",
  avatarInfo: "",
  avatarInfoTitle: "text-sm font-semibold text-zinc-300",
  avatarInfoSub: "text-xs text-zinc-500 mt-0.5",

  // Form fields
  field: "space-y-1.5",
  label: "block text-xs font-semibold text-zinc-400 uppercase tracking-wider",
  inputWrapper: "relative",
  inputWithPrefix: "pl-8",
  inputWithSuffix: "pr-11",
  prefix: "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-medium select-none",
  toggleButton:
    "absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors",

  // Password strength
  strengthContainer: "flex gap-1 pt-1",
  strengthBarBase: "h-0.5 flex-1 rounded-full transition-colors",
  strengthWeak: "bg-rose-500",
  strengthMedium: "bg-amber-500",
  strengthStrong: "bg-emerald-500",
  strengthVeryStrong: "bg-emerald-400",
  strengthInactive: "bg-zinc-700",

  // Footer links
  footerText: "mt-6 text-center text-sm text-zinc-500",
  footerLink: "font-semibold text-emerald-400 hover:text-emerald-300 transition-colors",
  terms: "mt-4 text-center text-xs text-zinc-600",
};


// assets/dummyStyles.js (append this)

export const settingsStyles = {
  container: "space-y-4",
  heading: "text-base font-bold text-zinc-200",

  // Section
  section:
    "rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 space-y-4",
  sectionTitle: "text-sm font-semibold text-zinc-300",

  // Label
  label: "block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2",

  // PwField
  pwWrapper: "relative",
  pwInput: "pr-11",
  pwToggle:
    "absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors",

  // Profile avatar
  avatarRow: "flex items-center gap-4",
  avatarLabel: "relative cursor-pointer group",
  avatarWrapper: "relative",
  avatarImage:
    "w-14 h-14 rounded-full object-cover ring-2 ring-zinc-700",
  avatarPlaceholder: "w-14 h-14 ring-2 ring-zinc-700",
  avatarCameraBadge:
    "absolute -bottom-0.5 -right-0.5 grid place-items-center w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-900 text-white",
  avatarInfo: "",
  avatarInfoTitle: "text-xs font-semibold text-zinc-400",
  avatarInfoSub: "text-[11px] text-zinc-700 mt-0.5",

  // Profile fields
  fieldRow: "grid grid-cols-2 gap-3",
  fieldGroup: "",
  disabledInput: "opacity-40 cursor-not-allowed",
  disabledHint: "text-[11px] text-zinc-700 mt-1",

  // Bio
  bioRow: "flex justify-between items-center mb-2",
  bioCharCount: "text-[10px] text-zinc-700 tabular-nums",
  bioTextarea: "min-h-18 resize-y",

  // Buttons
  saveButton: "py-2.5",

  // Password section
  passwordForm: "space-y-3",
};

// assets/dummyStyles.js (append this)

export const singlePollPageStyles = {
  backButton:
    "inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-300 transition-colors mb-5",
  errorContainer:
    "bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-12 text-center text-xs text-zinc-600",
};

// assets/dummyStyles.js (append this)

export const userProfileStyles = {
  errorContainer:
    "bg-zinc-900/70 border border-zinc-800/60 rounded-2xl p-12 text-center text-xs text-zinc-600",

  // Profile card
  profileCard:
    "bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden mb-5",
  bannerContainer: "h-20 bg-zinc-800/30 relative overflow-hidden",
  bannerGlow:
    "absolute -top-12 left-8 w-48 h-32 bg-emerald-500/12 blur-3xl rounded-full pointer-events-none",

  profileBody: "px-5 pb-5 -mt-8",
  avatarRow: "flex items-end justify-between",
  avatarClass: "w-16 h-16 text-lg ring-4 ring-zinc-900",
  followButton: "py-1.5 text-xs",

  userInfo: "mt-3",
  userName: "text-base font-bold text-white",
  userUsername: "text-xs text-zinc-600 mt-0.5",
  userBio: "text-xs text-zinc-500 mt-2 leading-relaxed",

  statsRow: "flex gap-5 mt-4 pt-4 border-t border-zinc-800/60",
  statNumber: "text-sm font-bold text-white",
  statLabel: "text-xs text-zinc-600",
  statClickable:
    "hover:opacity-80 transition-opacity",
  statLabelHighlight: "text-emerald-400",

  connectionsWrapper: "mt-4 pt-4 border-t border-zinc-800/60",

  // Polls heading
  pollsHeading:
    "text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-4",
  emptyPolls: "text-xs text-zinc-700 text-center py-8",
};

// assets/dummyStyles.js (append this)

export const verifyOtpStyles = {
  footerText: "mt-6 text-sm text-center text-zinc-500",
  link: "font-semibold text-emerald-400 hover:text-emerald-300 transition-colors",
};

// assets/dummyStyles.js (append this)

export const appStyles = {
  root: "min-h-screen bg-zinc-950 text-zinc-300",
  rootStyle: { fontFamily: "Inter, sans-serif" },
  loadingContainer: "min-h-screen grid place-items-center text-emerald-600",
  loadingSpinner: "animate-spin",
};
