export const PRIMARY_NAV = [
  { label: "Overview", href: "/" },
  { label: "SIMs", href: "/sims" },
  { label: "eUICC", href: "#" },
  { label: "eUICC Profile", href: "#" },
  { label: "eUICC Management", href: "#" },
  { label: "Account", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Tenant Dashboard", href: "#" },
] as const;

export const SECONDARY_NAV = [
  { label: "Support", href: "#" },
  { label: "Log Out", href: "#" },
] as const;

export const SEARCH_CRITERIA = ["IMSI", "ICCID", "EID"] as const;

export const PROFILE_MENU = [
  "Change Password",
  "Change Email",
  "Change Settings",
] as const;
