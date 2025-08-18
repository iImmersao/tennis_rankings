import Image from "next/image";
import Link from "next/link";
import tennis_logo from "@/public/tennis_logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={tennis_logo}
        height="60"
        width="60"
        quality={100}
        alt="Tennis Rankings Logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        Tennis Rankings
      </span>
    </Link>
  );
}

export default Logo;
