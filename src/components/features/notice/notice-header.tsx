import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface NoticeHeaderProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function NoticeHeader({
  isModal = false,
  onClose,
}: NoticeHeaderProps) {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "relative flex justify-center overflow-none items-center rounded-t-[0.625rem] border-b border-black-200 bg-white",
        isModal ? "py-5" : "py-6",
      )}
    >
      {!isModal && (
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          aria-label="뒤로가기"
        >
          <img src="/chevron/calendar-left.svg" alt="" width={24} height={24} />
        </button>
      )}

      <span className="header-medium">알림</span>

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="닫기"
        >
          <img src="/x/black.svg" alt="" width={24} height={24} />
        </button>
      )}
    </div>
  );
}
