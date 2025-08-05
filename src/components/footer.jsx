import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full  text-[#182147] font-sans"
      style={{
       backgroundImage: "url(https://www.artemerstudio.com/cdn/shop/files/footer-texture.jpg?v=1627477222)",
        transition: "background 0.5s",
      }}
    >
      {/* <hr className="max-w-[100rem] mx-auto text-[#d8d8d8]" /> */}
      {/* Top Info Bar */}
      <div className="w-full flex flex-wrap justify-center gap-y-6 px-2 py-8 border-b border-[#ececec]">
        <FooterInfoBar />
      </div>
      {/* Main Footer */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-center py-10 md:py-16 min-h-[200px] md:min-h-[320px]">
          <div className="flex flex-col items-center">
            {/* SVG or your logo image */}
            <svg
              width="90"
              height="44"
              viewBox="0 0 120 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[120px] sm:h-[60px]"
            >
              <circle cx="42" cy="31" r="16" stroke="#000" strokeWidth="3" />
              <circle cx="68" cy="31" r="16" stroke="#000" strokeWidth="3" />
            </svg>
            <span className="mt-4 sm:mt-6 text-2xl sm:text-3xl tracking-[0.3em] text-black font-light">
              INDIAN
            </span>
            <span className="mt-1 sm:mt-2 text-xs tracking-widest text-black/80">
              B2C
            </span>
          </div>
        </div>
        {/* Right: Links and Newsletter */}
        <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Social Links */}
            <div className="flex-1 min-w-[150px] sm:min-w-[170px]">
              <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-[#787e8c]">
                Follow us
              </div>
              <ul className="space-y-1">
                <FooterLink href="https://instagram.com/">
                  Instagram ↗
                </FooterLink>
                <FooterLink href="https://facebook.com/">
                  Facebook ↗
                </FooterLink>
                <FooterLink href="https://youtube.com/">
                  YouTube ↗
                </FooterLink>
                <FooterLink href="https://pinterest.com/">
                  Pinterest ↗
                </FooterLink>
                <FooterLink href="https://linkedin.com/">
                  Linkedin ↗
                </FooterLink>
              </ul>
            </div>
            {/* The Maison Links */}
            <div className="flex-1 min-w-[140px] sm:min-w-[180px]">
              <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-[#787e8c]">
                The Maison
              </div>
              <ul className="space-y-1">
                <FooterLink href="#">Make an appointment</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
                <FooterLink href="#">COURBET Journal</FooterLink>
                <FooterLink href="#">Lookbook</FooterLink>
                <FooterLink href="#">Services</FooterLink>
                <FooterLink href="#">Delivery and returns</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
                <FooterLink href="#">General terms and conditions</FooterLink>
              </ul>
            </div>
            {/* Newsletter */}
            <div className="flex-1 min-w-[160px] sm:min-w-[200px]">
              <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-[#787e8c]">
                Join the List
              </div>
              <form className="mb-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full border-b border-[#182147] bg-transparent py-1 mb-3 sm:mb-4 outline-none text-[#182147] placeholder:text-[#b3b8c2] text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#16254a] text-white py-2 rounded-none uppercase tracking-widest text-xs sm:text-sm font-semibold hover:bg-[#1e336c] transition"
                >
                  Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Info bar with vertical lines between sections
function FooterInfoBar() {
  const items = [
    {
      icon: <span className="text-2xl">&#8646;</span>,
      title: "Returns and exchanges",
      description: "Free returns and exchanges for a period of 30 days",
    },
    {
      icon: <span className="text-2xl">&#9993;</span>,
      title: "Any question ?",
      description: (
        <>
          Call us at{" "}
          <a href="tel:+33183757420" className="underline">
            +00 0 00 00 00 00
          </a>{" "}
          or by mail at{" "}
          <a href="/" className="underline">
            random@random.com
          </a>
        </>
      ),
    },
    {
      icon: <span className="text-2xl">&#128179;</span>,
      title: "Secure payment",
      description:
        "Visa, MasterCard, American Express, 3 or 4 instalments without charges with ALMA, Paypal, Cryptocurrency",
    },
    {
      icon: <span className="text-2xl">&#127873;</span>,
      title: "Free delivery",
      description: "Free delivery",
    },
  ];

  return (
    <div className="flex w-full max-w-7xl mx-auto justify-center flex-col sm:flex-row">
      {items.map((item, idx) => (
        <React.Fragment key={item.title}>
          <div className="flex flex-col items-center text-center flex-1 min-w-[170px] sm:min-w-[200px] px-2 mb-6 sm:mb-0">
            <div className="mb-2">{item.icon}</div>
            <div className="font-bold text-base sm:text-lg mb-1">{item.title}</div>
            <div className="text-sm text-[#858585]">{item.description}</div>
          </div>
          {/* Vertical Divider: Don't render after last item */}
          {idx < items.length - 1 && (
            <div className="hidden sm:flex items-center h-16 sm:h-20 mx-2">
              <div className="w-px h-full bg-[#d8d8d8]" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="text-base text-[#182147] hover:underline underline-offset-2 transition"
        target="_blank"
        rel="noopener"
      >
        {children}
      </a>
    </li>
  );
}