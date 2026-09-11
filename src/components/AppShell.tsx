"use client";

import { useState, type ReactNode } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteTransition from "@/components/RouteTransition";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * Everything that used to live only on the single scroll page and now needs
 * to persist across every route: the preloader (first load only), the nav,
 * the footer, and the route-change transition wrapping whatever page is
 * currently mounted. Living in the root layout (via this one client island)
 * means none of it remounts — and none of its animations replay — when the
 * visitor clicks between pages.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setLoading(false)} />
      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="flex flex-1 flex-col transition-opacity duration-700"
      >
        <Navbar />
        <RouteTransition>{children}</RouteTransition>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
