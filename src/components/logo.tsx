import Link from "next/link";
import Image from "next/image";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center" aria-label="Goldenhair home">
      <div className="relative h-[54px] w-[154px] sm:h-[61px] sm:w-[184px]">
        <Image
          src="/images/Golden Hair Logo-1.png"
          alt="Goldenhair — Luxury Hair & Beauty"
          fill
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
