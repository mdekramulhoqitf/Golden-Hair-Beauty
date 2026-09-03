"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DEFAULT_MAX_FONT_PX = 24;
const DEFAULT_MIN_FONT_PX = 10;
const MOBILE_BREAKPOINT_PX = 640;
const MOBILE_READABLE_FONT_PX = 17;

export default function FitOneLineText({
  text,
  className,
  maxFontPx = DEFAULT_MAX_FONT_PX,
  minFontPx = DEFAULT_MIN_FONT_PX,
  onFontSize,
}: {
  text: string;
  className?: string;
  maxFontPx?: number;
  minFontPx?: number;
  onFontSize?: (size: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontPx);
  const onFontSizeRef = useRef(onFontSize);
  onFontSizeRef.current = onFontSize;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const el = textRef.current;
    if (!container || !el) return;

    const fit = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT_PX) {
        const size = Math.min(maxFontPx, MOBILE_READABLE_FONT_PX);
        el.style.whiteSpace = "normal";
        el.style.fontSize = `${size}px`;
        el.style.display = "-webkit-box";
        el.style.setProperty("-webkit-line-clamp", "2");
        el.style.setProperty("-webkit-box-orient", "vertical");
        el.style.overflow = "hidden";
        setFontSize((prev) => (prev === size ? prev : size));
        onFontSizeRef.current?.(size);
        return;
      }

      let size = maxFontPx;
      el.style.whiteSpace = "nowrap";
      el.style.display = "inline-block";
      el.style.removeProperty("-webkit-line-clamp");
      el.style.removeProperty("-webkit-box-orient");
      el.style.overflow = "visible";
      el.style.fontSize = `${size}px`;
      const containerWidth = container.clientWidth;
      while (el.scrollWidth > containerWidth && size > minFontPx) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
      setFontSize((prev) => (prev === size ? prev : size));
      onFontSizeRef.current?.(size);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text, maxFontPx, minFontPx]);

  return (
    <div ref={containerRef} className="w-full min-w-0 overflow-hidden">
      <span
        ref={textRef}
        className={className}
        style={{ fontSize, display: "inline-block" }}
      >
        {text}
      </span>
    </div>
  );
}
