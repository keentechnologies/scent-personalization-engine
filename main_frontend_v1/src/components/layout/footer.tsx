import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-[36px] bg-[#151311]">
      <div className="container footer-inner flex justify-between items-center flex-wrap gap-[12px]">
        <div className="footer-logo flex items-center gap-[10px]">
          <Image
            src="/assets/logo.png"
            alt="Crafted Sprays"
            width={26}
            height={26}
            className="h-[26px] w-auto"
          />
          <span className="heading-serif text-[16px]">Crafted Sprays</span>
        </div>
        <p className="text-text-secondary footer-copy text-[12.5px]">
          &copy; {currentYear} Crafted Sprays. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
