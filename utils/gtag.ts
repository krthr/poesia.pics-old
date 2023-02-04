declare global {
  interface Window {
    gtag: Function;
  }
}

export function logEvent(name: string, params: any = {}) {
  if (window.gtag) {
    window.gtag("event", name, params);
  }
}
