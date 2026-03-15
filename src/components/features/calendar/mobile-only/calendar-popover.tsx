import MatchPredictionCalendar from "@/components/common/match-prediction-calendar";
import { useEffect, useRef } from "react";

interface CalendarPopoverProps {
  isCalendarOpen: boolean;
  onClose: () => void;
}
export default function CalendarPopover({
  isCalendarOpen,
  onClose,
}: CalendarPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isCalendarOpen || !popoverRef.current) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isDateTile = target.closest(".react-calendar__tile");
      const isInsidePopover = popoverRef.current?.contains(target);

      // 날짜 타일 클릭, 팝오버 외부 클릭 시 close, 그 외 클릭은 무시
      if (isDateTile || !isInsidePopover) {
        onClose();
      }
    };

    // setTimeout을 사용하여 팝오버를 여는 클릭 이벤트가 바로 닫기 이벤트를 트리거하지 않도록 함
    const timer = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isCalendarOpen, onClose]);

  return (
    <div
      ref={popoverRef}
      aria-hidden={!isCalendarOpen}
      className={`
                absolute bottom-full right-0 mb-3 w-[22rem]
                transition-all duration-200 ease-out
                ${isCalendarOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95 pointer-events-none"}
            `}
    >
      <MatchPredictionCalendar type="match" isPopover={true} />
      <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-black-200" />
    </div>
  );
}
