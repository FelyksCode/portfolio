"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./language-provider";
import { content } from "../content";

const EventBadge = dynamic(() => import("./event-badge"), {
  ssr: false,
  loading: () => <BadgeSkeleton />,
});

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return Boolean(ctx);
  } catch {
    return false;
  }
}

function BadgeSkeleton() {
  const { lang } = useLang();
  return <p className="badge-skeleton">{content[lang].badge.loading}</p>;
}

function FlatBadge() {
  const { lang } = useLang();
  const t = content[lang];
  const role = t.console.lines[1].value;
  const status = t.console.lines[3].value;
  return (
    <div className="flat-badge">
      <div className="flat-badge-top">
        <span className="flat-badge-mark">FI·26</span>
        <span className="flat-badge-year">UMN · JAKARTA, ID</span>
      </div>
      <div className="flat-badge-mid">
        <strong className="flat-badge-name">
          FELIX
          <br />
          IVANDER
        </strong>
        <p className="flat-badge-role">{role}</p>
        <p className="flat-badge-status">
          <i aria-hidden="true" />
          {status}
        </p>
      </div>
      <div className="flat-badge-top">
        <span className="flat-badge-year">JAKARTA TIMUR · ID</span>
        <span className="flat-badge-mark">EXP. 2026</span>
      </div>
    </div>
  );
}

export function EventBadgeSlot() {
  const { lang } = useLang();
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWebgl(supportsWebGL()));
    const node = frameRef.current;
    if (!node) return () => cancelAnimationFrame(frame);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="badge-slot" aria-label={content[lang].badge.aria}>
      <div className="badge-frame" ref={frameRef}>
        {inView && webgl ? <EventBadge /> : webgl === false ? <FlatBadge /> : <BadgeSkeleton />}
      </div>
      <p className="badge-hint">{content[lang].badge.hint}</p>
    </div>
  );
}
