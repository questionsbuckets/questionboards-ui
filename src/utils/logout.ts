export const LogoutAll = () => {
  // ✅ Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
  });

  // ✅ Clear Local Storage & Session Storage
  localStorage.clear();
  sessionStorage.clear();

  // ✅ Clear Cache Storage
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }

  // ✅ Clear IndexedDB (Extra Safety)
  if (window.indexedDB) {
    indexedDB.databases().then((dbs) => {
      dbs.forEach((db) => indexedDB.deleteDatabase(db.name!));
    });
  }

  // ✅ Unregister all service workers (optional)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }

  // ✅ Reload or Redirect
  window.location.href = "/auth/login"; // Change to your login route
};
