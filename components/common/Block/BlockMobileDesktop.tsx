import useResponsiveBreakpoint from "@customhook/useResponsiveBreakpoint";
import React from "react";

export default function BlockMobileDesktop({ children }: { children: any }) {
  const { isMobile } = useResponsiveBreakpoint();

  if (isMobile) return React.Children.toArray(children)[0];
  return React.Children.toArray(children)[1];
}
