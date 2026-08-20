import Link from "next/link";

export default function LandingContactBar() {
  return (
    <div className="bg-[#0f3b38] text-white">
      <div className="container-premium flex items-center gap-2 overflow-x-auto whitespace-nowrap py-8 text-left">
        <p className="text-sm font-semibold sm:text-base">অর্ডার/যোগাযোগ করুন</p>
        <a
          href="tel:+8801787478146"
          className="btn-focus text-lg font-bold tracking-wide text-[#f6a623] transition-colors hover:text-white"
        >
          01787 478 146
        </a>
      </div>
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col items-center gap-3 py-5 text-center text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Goldenhair. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
