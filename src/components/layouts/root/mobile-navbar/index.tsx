"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import Sidebar from "./sidebar";
import { default as SideProfile } from "../navbar/profile";
import { useCurrentUserInfoStore } from "@/lib/store/useCurrentUserInfoStore";
import { isFullScreen } from "@/lib/utils";
import RightButtons from "../navbar/right-buttons";
import useIsMobile from "@/lib/hooks/useIsMobile";
import { useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileBgVisible, setIsProfileBgVisible] = useState(false);

  const { currentUserInfo } = useCurrentUserInfoStore();

  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  const bgColor = isHome ? "bg-black-000" : "bg-black-800";

  const handleToggleProfile = useCallback(() => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
      setTimeout(() => setIsProfileBgVisible(false), 200);
    } else {
      setIsProfileBgVisible(true);
      setTimeout(() => setIsProfileOpen(true), 10);
    }
  }, [isProfileOpen]);

  // 모바일 화면에서만 내비게이션바 감춤
  const isMobile = useIsMobile();
  if (isMobile && isFullScreen(pathname)) {
    return null;
  }

  return (
    <>
      <header className="fixed w-full top-0 z-40 transition-colors ease-out">
        <div
          className={clsx(
            "relative h-16 px-4 grid grid-cols-3 justify-between items-center",
            bgColor,
          )}
        >
          <div />
          <a
            href="/"
            aria-label={"홈으로 이동"}
            className="w-auto h-full flex justify-center"
          >
            <img
              aria-hidden={true}
              src={"/logo/icon-red.svg"}
              alt=""
              width={45}
              height={36}
            />
          </a>
          <RightButtons isMobile={true} onClickProfile={handleToggleProfile} />
        </div>
      </header>

      {currentUserInfo && (
        <Sidebar
          side={"right"}
          isMenuOpen={isProfileOpen}
          isBgVisible={isProfileBgVisible}
          handleToggleMenu={handleToggleProfile}
        >
          <SideProfile onClickButton={handleToggleProfile} />
        </Sidebar>
      )}
    </>
  );
}
