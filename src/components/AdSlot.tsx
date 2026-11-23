"use client";

import { useEffect } from "react";
import { ADS, adsEnabled } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Renders nothing until AdSense is configured. When it is, the box reserves
 * a fixed height from the first paint so the ad never shifts the layout (CLS).
 */
export default function AdSlot({ position }: { position: "middle" | "bottom" }) {
  const slot = ADS.slots[position];
  const active = adsEnabled && slot !== "";

  useEffect(() => {
    if (!active) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or a double push can throw; ignore */
    }
  }, [active]);

  if (!active) return null;

  return (
    <aside className="ad" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <div className="ad-box">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADS.client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
