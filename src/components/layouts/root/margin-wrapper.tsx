import { useLocation } from "react-router-dom";

const NO_MARGIN_PAGES = ["/notice"];

export default function MarginWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = useLocation().pathname;
  const hasMargin = !NO_MARGIN_PAGES.includes(pathname);

  // useEffect(() => {
  // 	setHasMargin(isMobileNavbar && !isFullScreen(pathname));
  // }, [pathname, isMobileNavbar]);

  return <div className={hasMargin ? "mt-16" : ""}>{children}</div>;
}
