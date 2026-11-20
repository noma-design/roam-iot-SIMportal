import Link from "next/link";

type TonalButtonProps = {
  href?: string;
  label: string;
  iconSrc: string;
  className?: string;
};

/** Teal outline action — default / hover / pressed (Figma 7:8160) */
export function TonalButton({ href = "#", label, iconSrc, className = "" }: TonalButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px]",
    "border-[#00ADBA] bg-transparent py-1.5 pl-3 pr-2 text-sm font-medium",
    "text-[#00ADBA] transition-colors",
    "hover:border-[#bfecef] hover:bg-[#d8f4f6] hover:text-[#00ADBA]",
    "active:border-[#8edce1] active:bg-[#c7eef1] active:text-[#007f89]",
    "active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]",
    className,
  ].join(" ");

  const content = (
    <>
      <span className="text-inherit">{label}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0 group-active:brightness-75 group-active:saturate-150"
        style={{ color: "#00ADBA" }}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={{ color: "#00ADBA" }}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} style={{ color: "#00ADBA" }}>
      {content}
    </button>
  );
}
