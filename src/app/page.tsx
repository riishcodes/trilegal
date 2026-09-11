import { redirect } from "next/navigation";

/**
 * The marketing landing page is removed for now.
 * Its original implementation is archived at .backup/landing-page.tsx.bak
 * — restore it to src/app/page.tsx to bring it back.
 */
export default function Home() {
  redirect("/login");
}
