/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    platform?: {
      type: "web" | "desktop";
    };
  }
}
