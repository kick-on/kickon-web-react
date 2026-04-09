import { Suspense } from "react";
import LoginButton from "./login-button";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

interface RightButtonsProps {
  isMobile?: boolean;
  isTabletWidth?: boolean;
  onClickProfile?: () => void;
}

export default function RightButtons({
  isMobile = false,
  isTabletWidth = false,
  onClickProfile,
}: RightButtonsProps) {
  const pathname = useLocation().pathname;
  // const { currentUserInfo } = useCurrentUserInfoStore();

  return (
    <div
      className={clsx(
        "h-[2.375rem] grid grid-cols-[auto_auto] items-center justify-center",
        isMobile ? " gap-[18px] ml-auto" : "gap-6",
      )}
    >
      {/*{currentUserInfo && <NoticeButton />}*/}
      <Suspense>
        {isMobile ? (
          <LoginButton onClickProfile={onClickProfile} />
        ) : (
          (pathname === "/signup" || isTabletWidth) && <LoginButton />
        )}
      </Suspense>
    </div>
  );
}
