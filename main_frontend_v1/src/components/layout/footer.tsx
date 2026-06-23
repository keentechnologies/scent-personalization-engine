import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-[36px] bg-[#151311] hidden lg:block">
      <div className="container footer-inner flex justify-between items-center flex-wrap gap-[12px]">
        <div className="footer-logo flex items-center gap-[10px]">
          <Image
            src="/assets/logo.png"
            alt="Crafted Sprays"
            width={75}
            height={75}
            className="h-[5rem] w-auto"
          />
          <span className="heading-serif text-[20px] tracking-[.03em] lg:text-[1.5rem]">
            Crafted Sprays
          </span>
        </div>
        <p className="text-text-secondary footer-copy text-[12.5px]">
          &copy; {currentYear} Crafted Sprays. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
