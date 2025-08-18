import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  //console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/atp_singles"
            className="hover:text-accent-400 transition-colors"
          >
            ATP Singles
          </Link>
        </li>
        <li>
          <Link
            href="/atp_doubles"
            className="hover:text-accent-400 transition-colors"
          >
            ATP Doubles
          </Link>
        </li>
        <li>
          <Link
            href="/wta_singles"
            className="hover:text-accent-400 transition-colors"
          >
            WTA Singles
          </Link>
        </li>
        <li>
          <Link
            href="/wta_doubles"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            WTA Doubles
          </Link>
        </li>
      </ul>
    </nav>
  );
}
