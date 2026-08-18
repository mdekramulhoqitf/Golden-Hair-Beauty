import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center" aria-label="Goldenhair home">
      <div className="relative h-[54px] w-[154px] sm:h-[61px] sm:w-[184px]">
        <Image
          src="/images/lifestyle/logo-transparent.png"
          alt="Goldenhair — Luxury Hair & Beauty"
          fill
          className="object-contain object-left"
          style={{
            filter:
              "drop-shadow(2px 0 0 #000) drop-shadow(-2px 0 0 #000) drop-shadow(0 2px 0 #000) drop-shadow(0 -2px 0 #000)",
          }}
        />
      </div>
    </Link>
  );
}
