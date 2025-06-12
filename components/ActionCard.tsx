import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ActionCardProps {
  imageSrc: string;
  imageAlt: string;
  imagePriority?: boolean;
  buttonText: string;
  buttonIcon: ReactNode;
  href: string;
  aosEffect: string;
}

export function ActionCard({
  imageSrc,
  imageAlt,
  imagePriority = false,
  buttonText,
  buttonIcon,
  href,
  aosEffect,
}: ActionCardProps) {
  return (
    <div
      className="group flex flex-col bg-white/95 backdrop-blur-sm text-black rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl w-[350px]"
      data-aos={aosEffect}
    >
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={350}
          className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-110"
          priority={imagePriority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <Link href={href} legacyBehavior>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg flex justify-center items-center gap-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 hover:shadow-lg">
            {buttonIcon}
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
} 