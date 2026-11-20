export function MaskIcon({
  src,
  size = 20,
  className = "",
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** Ghost button styles shared by Manage SIM + Export Report */
export const GHOST_BTN =
  "inline-flex h-[44px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#e5e7eb] bg-[#f9fafb] pl-3 pr-2 text-sm font-medium text-[#878e9f] transition-colors hover:border-[#bfecef] hover:bg-[#d8f4f6] hover:text-roam-teal active:border-[#8edce1] active:bg-[#c7eef1] active:text-[#007f89] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]";
