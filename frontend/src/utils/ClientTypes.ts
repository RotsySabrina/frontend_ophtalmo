export type ClientType = "web" | "desktop" | "mobile";

function detectClientType(): ClientType {
  // ⚡ 1. Vérifier si on est dans Electron
  if (typeof window !== "undefined" && (window as any).process?.type) {
    return "desktop";
  }

  // ⚡ 2. Vérifier si on est sur mobile (simplifié via userAgent)
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
    return "mobile";
  }

  // ⚡ 3. Sinon, c'est le web
  return "web";
}

export const clientType: ClientType = detectClientType();
