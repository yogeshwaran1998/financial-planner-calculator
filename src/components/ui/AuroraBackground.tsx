"use client";

export function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Aurora blob 1 — top-left indigo */}
      <div
        className="aurora-blob absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.14] dark:opacity-[0.13] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #6474f8 0%, #8b5cf6 60%, transparent 100%)",
          animation: "aurora-1 18s ease-in-out infinite",
        }}
      />

      {/* Aurora blob 2 — bottom-right cyan/violet */}
      <div
        className="aurora-blob absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.12] dark:opacity-[0.11] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, #6474f8 55%, transparent 100%)",
          animation: "aurora-2 22s ease-in-out infinite",
        }}
      />

      {/* Aurora blob 3 — center accent */}
      <div
        className="aurora-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] dark:opacity-[0.08] blur-[80px]"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, #6474f8 50%, transparent 100%)",
          animation: "aurora-3 15s ease-in-out infinite",
        }}
      />
    </div>
  );
}
