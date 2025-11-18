"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";

const ConditionalNav = () => {
  const pathname = usePathname();

  // Don't show Nav on auth-related pages
  const hideNav = pathname?.startsWith('/auth') || false;

  if (hideNav) {
    return null;
  }

  return <Nav />;
};

export default ConditionalNav;
