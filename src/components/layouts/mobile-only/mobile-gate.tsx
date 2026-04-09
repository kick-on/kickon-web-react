"use client";

import { useEffect, useRef } from "react";
import useIsMobile from "@/lib/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

export default function MobileGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (isMobile === null) return; // 모바일 여부 판별 전이면 대기

    if (!isMobile && !hasAlerted.current) {
      alert("모바일에서만 접근 가능합니다.");
      hasAlerted.current = true;
      navigate("/");
    }
  }, [isMobile, navigate]);

  // 모바일 여부가 확인되기 전에는 렌더 차단
  if (!isMobile) return null;

  return <>{children}</>;
}
