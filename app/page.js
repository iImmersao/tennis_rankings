import Image from "next/image";
import bg from "@/public/tennis_court.png";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="A grass tennis court"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to the Tennis Rankings Site
        </h1>
      </div>
    </main>
  );
}
