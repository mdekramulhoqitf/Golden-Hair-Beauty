import { Phone } from "lucide-react";

export default function LandingContactBar() {
  return (
    <div className="bg-gradient-to-r from-[#0a2e2b] via-[#0f3b38] to-[#0a2e2b] text-white">
      <div className="container-premium flex flex-col items-center gap-3 py-7 text-left sm:flex-row sm:gap-5">
        <p className="text-base font-semibold text-white/90 sm:text-lg">অর্ডার/যোগাযোগ করুন</p>
        <a
          href="tel:+8801787478146"
          className="btn-focus inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-lg font-bold tracking-wide text-[#0f3b38] shadow-gold-glow transition-transform duration-300 hover:scale-105 sm:text-xl"
        >
          <Phone size={20} strokeWidth={2.5} />
          01787 478 146
        </a>
      </div>
    </div>
  );
}
