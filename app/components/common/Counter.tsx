"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: string | number;
  duration?: number;
  className?: string;
};

const Counter = ({ value, duration = 2000, className = "" }: Props) => {
  const stringValue = String(value);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  // 👇 viewport trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 👇 extract number
  const parsed = useMemo(() => {
    const match = stringValue.match(/(\d+)/);
    if (!match) return null;

    const digits = match[0];
    const index = match.index || 0;

    return {
      number: Number(digits),
      prefix: stringValue.slice(0, index),
      suffix: stringValue.slice(index + digits.length),
    };
  }, [stringValue]);

  if (!parsed) {
    return <span className={className}>{stringValue}</span>;
  }

  const { number, prefix, suffix } = parsed;

  // 👇 animation
  useEffect(() => {
    if (!isVisible || hasStarted) return;

    setHasStarted(true);
    const startTime = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOut(progress);

      const value = Math.floor(eased * number);
      setCurrent(value);

      if (progress < 1) requestAnimationFrame(animate);
      else setCurrent(number);
    };

    requestAnimationFrame(animate);
  }, [isVisible, hasStarted, number, duration]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center ${className}`}
    >
      {prefix && <span>{prefix}</span>}

      <span
        className={`transition-all duration-700 ${
          hasStarted ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        }`}
      >
        {current}
      </span>

      {suffix && <span className="ml-[2px]">{suffix}</span>}
    </span>
  );
};

export default Counter;