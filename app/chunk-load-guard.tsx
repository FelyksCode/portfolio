"use client";

import { useEffect } from "react";

const RELOAD_FLAG = "portfolio-chunk-reload";

function isChunkLoadFailure(error: unknown) {
  if (error instanceof Error) {
    return /ChunkLoadError|Loading chunk|failed to fetch/i.test(error.name + " " + error.message);
  }

  return typeof error === "string" && /ChunkLoadError|Loading chunk|failed to fetch/i.test(error);
}

async function clearBrowserState() {
  if (typeof caches !== "undefined") {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }

  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
}

export function ChunkLoadGuard() {
  useEffect(() => {
    // Production-only: stale chunk failures after a deploy are real; in dev the
    // Turbopack HMR client can emit transient chunk errors that must not
    // trigger a cache-wipe + reload loop.
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const handleFailure = (event: Event | PromiseRejectionEvent) => {
      const reason =
        "reason" in event ? event.reason : event instanceof ErrorEvent ? event.error : null;

      if (!isChunkLoadFailure(reason)) {
        return;
      }

      event.preventDefault();

      if (typeof window === "undefined") {
        return;
      }

      if (sessionStorage.getItem(RELOAD_FLAG) === "1") {
        return;
      }

      sessionStorage.setItem(RELOAD_FLAG, "1");

      void clearBrowserState().finally(() => {
        window.location.reload();
      });
    };

    window.addEventListener("error", handleFailure);
    window.addEventListener("unhandledrejection", handleFailure);

    return () => {
      window.removeEventListener("error", handleFailure);
      window.removeEventListener("unhandledrejection", handleFailure);
    };
  }, []);

  return null;
}