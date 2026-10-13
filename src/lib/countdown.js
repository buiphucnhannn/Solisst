"use client";

import { useSyncExternalStore } from "react";

/**
 * Đồng hồ flash sale "evergreen": luôn đếm về 23:59:59 hôm nay (giờ máy khách).
 * Dùng 1 ticker chung cho mọi Countdown trên trang.
 * Server snapshot = null → render "--" lúc SSR, tránh lệch hydration.
 */

let listeners = new Set();
let timer = null;

function subscribe(cb) {
  listeners.add(cb);
  if (!timer) {
    timer = setInterval(() => listeners.forEach((l) => l()), 1000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

export function useCountdown() {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (nowSec === null) return { ready: false, h: "--", m: "--", s: "--" };

  const end = new Date(nowSec * 1000);
  end.setHours(23, 59, 59, 999);
  const left = Math.max(0, Math.floor(end.getTime() / 1000) - nowSec);
  const pad = (n) => String(n).padStart(2, "0");

  return {
    ready: true,
    h: pad(Math.floor(left / 3600)),
    m: pad(Math.floor((left % 3600) / 60)),
    s: pad(left % 60),
  };
}
