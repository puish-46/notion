// src/styles/common.js
// Theme: Google Light — soft gray background, clean white surfaces, #1a73e8 accent
// Inspired by Google products — subtle elevation, rounded corners, simple typography

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "min-h-screen bg-[#f8f9fa] font-sans text-[#202124] antialiased";
export const pageWrapper = "max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-10 md:py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white rounded-[20px] p-5 md:p-7 shadow-[0_1px_3px_rgba(60,64,67,0.16)] ring-1 ring-[#dadce0] hover:shadow-[0_4px_12px_rgba(60,64,67,0.18)] transition-all duration-200 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-3xl sm:text-4xl md:text-5xl font-medium text-[#202124] tracking-tight leading-none mb-2";
export const headingClass = "text-lg sm:text-xl md:text-2xl font-medium text-[#202124] tracking-tight";
export const subHeadingClass = "text-base md:text-lg font-medium text-[#202124] tracking-tight";
export const bodyText = "text-[#5f6368] leading-relaxed text-sm md:text-base";
export const mutedText = "text-xs md:text-sm text-[#80868b]";
export const linkClass = "text-[#1a73e8] hover:text-[#1558b0] transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[#1a73e8] text-white font-medium px-5 py-2.5 rounded-full hover:bg-[#1558b0] transition-colors cursor-pointer text-sm tracking-tight inline-block text-center shadow-[0_1px_2px_rgba(60,64,67,0.18)]";
export const secondaryBtn =
  "border border-[#dadce0] text-[#202124] font-medium px-5 py-2.5 rounded-full hover:bg-[#f1f3f4] transition-colors cursor-pointer text-sm inline-block text-center";
export const ghostBtn = "text-[#1a73e8] font-medium hover:text-[#1558b0] transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white rounded-[24px] p-4 sm:p-6 md:p-10 max-w-4xl mx-auto shadow-[0_1px_3px_rgba(60,64,67,0.16)] ring-1 ring-[#dadce0]";
export const formTitle = "text-xl sm:text-2xl md:text-3xl font-medium text-[#202124] tracking-tight text-center mb-7";
export const labelClass = "text-xs font-medium text-[#5f6368] mb-1.5 block";
export const inputClass =
  "w-full bg-white border border-[#dadce0] rounded-xl px-4 py-2.5 text-[#202124] text-sm placeholder:text-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/15 transition-colors";
export const formGroup = "mb-4";
export const submitBtn =
  "w-full bg-[#1a73e8] text-white font-medium py-2.5 rounded-full hover:bg-[#1558b0] transition-colors cursor-pointer mt-2 text-sm tracking-tight shadow-[0_1px_2px_rgba(60,64,67,0.18)]";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/90 backdrop-blur-md border-b border-[#dadce0] px-3 sm:px-4 md:px-8 h-[56px] flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-6xl mx-auto w-full flex items-center justify-between relative";
export const navBrandClass = "text-sm sm:text-base font-medium text-[#202124] tracking-normal z-50";
export const navLinksClass = "hidden md:flex items-center gap-7";
export const navMobileLinksClass = "flex flex-col gap-4 p-6 bg-white border-b border-[#dadce0] absolute top-[56px] left-[-16px] right-[-16px] z-40 md:hidden animate-in fade-in slide-in-from-top-2 shadow-[0_4px_12px_rgba(60,64,67,0.12)]";
export const navLinkClass = "text-[0.8rem] text-[#5f6368] hover:text-[#202124] transition-colors font-medium";
export const navLinkActiveClass = "text-[0.8rem] text-[#1a73e8] font-medium";

// ─── Article / Blog ───────────────────────────────────
//export const articleGrid        = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e8ed] border border-[#e8e8ed] rounded-2xl overflow-hidden"
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6";
export const articleCardClass =
  "bg-white rounded-[20px] p-5 md:p-7 shadow-[0_1px_3px_rgba(60,64,67,0.16)] ring-1 ring-[#dadce0] hover:shadow-[0_4px_12px_rgba(60,64,67,0.18)] transition-all duration-200 flex flex-col gap-2.5 cursor-pointer";
export const articleTitle = "text-base font-medium text-[#202124] leading-snug tracking-tight";
export const articleExcerpt = "text-sm text-[#5f6368] leading-relaxed";
export const articleMeta = "text-xs text-[#80868b]";
export const articleBody = "text-[#3c4043] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[#80868b] flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-semibold text-[#1a73e8] uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14";

export const articleHeader = "mb-10 flex flex-col gap-4";

export const articleCategory = "text-[0.7rem] font-semibold uppercase tracking-widest text-[#1a73e8]";

export const articleMainTitle = "text-2xl md:text-4xl font-medium text-[#202124] leading-tight tracking-tight";

export const articleAuthorRow =
  "flex flex-col sm:flex-row sm:items-center justify-between border-t border-b border-[#dadce0] py-4 gap-2 text-sm text-[#5f6368]";

export const authorInfo = "flex items-center gap-2 font-medium text-[#202124]";

export const articleContent = "text-[#3c4043] leading-[1.9] text-[1rem] whitespace-pre-line mt-8";

export const articleFooter = "border-t border-[#dadce0] mt-12 pt-6 text-sm text-[#80868b]";
// ─── Article Actions ─────────────────────────────
export const articleActions = "flex flex-wrap gap-3 mt-6";

export const editBtn = "bg-[#1a73e8] text-white text-sm px-4 py-2 rounded-full hover:bg-[#1558b0] transition shadow-[0_1px_2px_rgba(60,64,67,0.18)]";

export const deleteBtn = "bg-[#ff3b30] text-white text-sm px-4 py-2 rounded-full hover:bg-[#d62c23] transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#34a853]/15 text-[#137333]";

export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#ff3b30]/20 text-[#cc2f26]";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#ff3b30]/[0.06] text-[#cc2f26] border border-[#ff3b30]/[0.18] rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-[#34a853]/[0.08] text-[#137333] border border-[#34a853]/20 rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-[#1a73e8]/80 text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[#80868b] py-16 text-sm";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper = "mt-12 flex flex-col gap-6";

export const commentCard = "bg-white rounded-[20px] p-5 transition shadow-[0_1px_3px_rgba(60,64,67,0.16)] ring-1 ring-[#dadce0] hover:shadow-[0_4px_12px_rgba(60,64,67,0.18)]";

export const commentHeader = "flex items-center justify-between mb-2";

export const commentUser = "text-sm font-medium text-[#202124]";

export const commentTime = "text-xs text-[#80868b]";

export const commentText = "text-[#3c4043] text-sm leading-relaxed mt-1";

export const avatar =
  "w-9 h-9 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center text-sm font-semibold";

export const commentUserRow = "flex items-center gap-3";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-[#dadce0] my-10";
