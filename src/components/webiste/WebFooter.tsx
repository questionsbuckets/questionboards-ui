import React from "react";
import Link from "next/link";
import TwitterIcons from "../../../public/icons/TwitterIcons";
import InstagramIcon from "../../../public/icons/InstagramIcon";
import FacebookIcons from "../../../public/icons/FacebookIcons";
import YoutubeIcons from "../../../public/icons/YoutubeIcons";
import LinkedinIcons from "../../../public/icons/LinkedinIcons";
import TiktokIcon from "../../../public/icons/TiktokIcon";
import Image from "next/image";

function WebFooter() {
  const footerSections = [
    {
      title: "Who We Are",
      links: [
        { label: "About Us", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Membership", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Resources", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#" },
        { label: "User Guides", href: "#" },
        { label: "Blogs", href: "#" },
        { label: "Testimonials", href: "#" },
        { label: "Professional Learning", href: "#" },
      ],
    },
    {
      title: "What We Offer",
      links: [
        { label: "K-12", href: "#" },
        { label: "Families", href: "#" },
        { label: "Schools", href: "#" },
        { label: "Tutors", href: "#" },
      ],
    },
    {
      title: "Topics",
      links: [
        { label: "Math", href: "#" },
        { label: "Science", href: "#" },
        { label: "ELAR", href: "#" },
        { label: "Social Studies", href: "#" },
      ],
    },
    {
      title: "Others",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
    {
      title: "International",
      links: [
        { label: "🇺🇸 USA", href: "#" },
        { label: "🇮🇳 India", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: FacebookIcons, href: "#", label: "Facebook" },
    { icon: YoutubeIcons, href: "#", label: "YouTube" },
    { icon: TwitterIcons, href: "#", label: "Twitter" },
    { icon: LinkedinIcons, href: "#", label: "LinkedIn" },
    { icon: TiktokIcon, href: "#", label: "Tiktok" },
  ];

  return (
    <footer className="bg-secondary text-white w-full">
      <div className=" mx-auto max-w-screen-3xl px-4 xl:px-40 2xl:px-52 sm:px-6 lg:px-8 py-12">
        {/* Logo and Social Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <div>
              <Image src="/image/logo.png" alt="logo" width={40} height={40} />
            </div>
            <div>
              <div className="font-semibold text-lg">Question Boards</div>
              <div className="text-sm text-gray-300">Sharing Knowledge</div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 ">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:bg-white/10 rounded-full border border-background/50 p-3 transition-colors flex justify-center items-center w-12 h-12"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold  text-primary mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      // className="text-sm text-gray-300 hover:text-white transition-colors"
                       className="relative text-sm text-gray-300 hover:text-white transition-colors
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full pb-[2px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border border-background/30" />
        {/* Bottom Bar */}
        <div className="pt-8  border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div>
            Copyright © 2025{" "}
            <a href="#" className="text-primary ">
              Question Boards
            </a>
          </div>
          <div>
            Design By:{" "}
            <a href="#" className="text-primary ">
              Incipient Infotech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default WebFooter;
