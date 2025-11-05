"use client";

import { ArrowRight, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/custom/useAuth";
import HeaderProfile from "../DashboardShell/HeaderProfile";
import { Country, CountryDropdown } from "../ui/common/CountryDropdown";

const WebHeader = () => {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const navItems = [
    { name: "Learners", href: "/learners" },
    { name: "Parents", href: "/parents" },
    { name: "Homework", href: "/homework" },
    { name: "Tutors", href: "/tutors" },
    { name: "Schools", href: "/schools" },
    { name: "Membership", href: "/membership" },
  ];

  // ✅ onChange handler
  const handleCountryChange = (country: Country) => {
    console.log("🌍 Selected country:", country.name);
    console.log("📞 Dial code:", country.countryCallingCodes[0]);
    console.log("🇨🇴 Code:", country.alpha2);
    setSelectedCountry(country);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
      <section className="flex items-center justify-between h-20 mx-auto max-w-[1440px]">
        <div className="w-full">
          <nav className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 min-w-0 cursor-pointer"
              onClick={() => {
                router.push("/home");
              }}
            >
              <Image
                src="/image/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <div className="flex flex-col leading-none min-w-0">
                <span className="font-bold text-base sm:text-lg truncate">
                  Question Boards
                </span>
                <span className="text-xs sm:text-sm truncate">
                  Practice • Analyze • Improve
                </span>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-9 font-medium">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group relative text-sm sm:text-lg text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right: Buttons + Country selector */}
            <div className="hidden xl:flex items-center gap-3">
              {user ? (
                <HeaderProfile />
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="cursor-pointer flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => {
                      router.push("/auth/signup");
                    }}
                  >
                    Sign Up <ArrowRight size={16} />
                  </Button>
                </div>
              )}

              {/* ✅ Country Selector with controlled value */}
              <div className="flex items-center gap-1 cursor-pointer">
                <CountryDropdown
                  placeholder="Select country"
                  value={selectedCountry} // 👈 Pass the state value for controlled behavior
                  defaultValue="USA" // 👈 This sets initial value only
                  slim
                  onChange={handleCountryChange}
                />
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild className="xl:hidden mx-2">
                <Button variant="outline" className="bg-accent" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="max-h-screen overflow-auto bg-white"
              >
                <SheetHeader>
                  <SheetTitle>
                    <div
                      className="flex items-center gap-2 min-w-0 cursor-pointer"
                      onClick={() => {
                        router.push("/home");
                      }}
                    >
                      <Image
                        src="/image/logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="flex-shrink-0"
                      />
                      <div className="flex flex-col leading-none min-w-0">
                        <span className="font-bold text-base sm:text-lg truncate">
                          Question Boards
                        </span>
                        <span className="text-xs sm:text-sm truncate">
                          Practice • Analyze • Improve
                        </span>
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  <div className="flex flex-col gap-5">
                    {navItems.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          className="font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    <Button variant="outline">Sign in</Button>
                    <Button>Sign Up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default WebHeader;

// "use client";

// import { ArrowRight, MenuIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Dropdown } from "../ui/common/Dropdown";
// import { getCountryOptions } from "@/utils/country";
// import { useState } from "react";
// import { DropdownOption } from "../interfaces/common.interface";
// import { useAuth } from "@/hooks/custom/useAuth";
// import HeaderProfile from "../DashboardShell/HeaderProfile";
// import { Country, CountryDropdown } from "../ui/common/CountryDropdown";
// // import usePushNotifications from '@/hooks/usePushNotifications'

// const WebHeader = () => {
//   const router = useRouter();
//   const [countryName, setCountryName] = useState<null | DropdownOption>(null);
//   const { user, logout, isLoading } = useAuth();
//   const navItems = [
//     { name: "Learners", href: "/learners" },
//     { name: "Parents", href: "/parents" },
//     { name: "Homework", href: "/homework" },
//     { name: "Tutors", href: "/tutors" },
//     { name: "Schools", href: "/schools" },
//     { name: "Membership", href: "/membership" },
//   ];

//     const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);


//     // ✅ onChange handler
//   const handleCountryChange = (country: Country) => {
//     console.log("🌍 Selected country:", country.name);
//     console.log("📞 Dial code:", country.countryCallingCodes[0]);
//     console.log("🇨🇴 Code:", country.alpha2);
//     setSelectedCountry(country);
//   };

//   return (
//     <div className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
//       <section className="flex items-center justify-between h-20 mx-auto max-w-[1440px]">
//         <div className="w-full">
//           <nav className="flex items-center justify-between">
//             <div
//               className="flex items-center gap-2 min-w-0 cursor-pointer"
//               onClick={() => {
//                 router.push("/home");
//               }}
//             >
//               <Image
//                 src="/image/logo.png"
//                 alt="logo"
//                 width={40}
//                 height={40}
//                 className="flex-shrink-0"
//               />
//               <div className="flex flex-col leading-none min-w-0">
//                 <span className="font-bold text-base sm:text-lg  truncate">
//                   Question Boards
//                 </span>
//                 <span className="text-xs sm:text-sm  truncate">
//                   Practice • Analyze • Improve
//                 </span>
//               </div>
//             </div>
//             <div className="hidden xl:flex items-center gap-9 font-medium">
//               {navItems.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.href}
//                   className="group relative text-sm sm:text-lg text-foreground hover:text-primary transition-colors"
//                 >
//                   {item.name}
//                   <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full" />
//                 </Link>
//               ))}
//             </div>

//             {/* Right: Buttons + Country selector (hidden partially on small) */}
//             <div className="hidden xl:flex items-center gap-3">
//               {user ? (
//                 <HeaderProfile />
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     className=" cursor-pointer bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground"
//                     onClick={() => {
//                       router.push("/auth/login");
//                     }}
//                   >
//                     Login
//                   </Button>
//                   <Button
//                     className=" cursor-pointer flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
//                     onClick={() => {
//                       router.push("/auth/signup");
//                     }}
//                   >
//                     Sign Up <ArrowRight size={16} />
//                   </Button>
//                 </div>
//               )}

//               <div className="flex items-center gap-1 cursor-pointer">
//                 {/* <Dropdown
//                   options={getCountryOptions()}
//                   optionLabel="name"
//                   value={countryName}
//                   placeholder="Select Country"
//                   onChange={(selected: any) => {
//                     if (selected) {
//                       setCountryName(selected);
//                     } else {
//                       setCountryName(null);
//                     }
//                   }}
//                   filter={true}
//                   className="bg-transparent truncate w-40 hover:bg-transparent"
//                 /> */}

                

//   {/* ✅ Country Selector */}
//               {/* <div className="flex items-center gap-1 cursor-pointer"> */}
//                 <CountryDropdown
//                   placeholder="Select country"
                  
//                   defaultValue="USA"
//                   slim
//                   onChange={handleCountryChange} // 👈 onChange connected here
//                 />


//               </div>
//             </div>
//             <Sheet>
//               <SheetTrigger asChild className="xl:hidden mx-2">
//                 <Button variant="outline" className="bg-accent" size="icon">
//                   <MenuIcon className="h-4 w-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="top"
//                 className="max-h-screen overflow-auto bg-white"
//               >
//                 <SheetHeader>
//                   <SheetTitle>
//                     <div
//                       className="flex items-center gap-2 min-w-0 cursor-pointer"
//                       onClick={() => {
//                         router.push("/home");
//                       }}
//                     >
//                       <Image
//                         src="/image/logo.png"
//                         alt="logo"
//                         width={40}
//                         height={40}
//                         className="flex-shrink-0"
//                       />
//                       <div className="flex flex-col leading-none min-w-0">
//                         <span className="font-bold text-base sm:text-lg  truncate">
//                           Question Boards
//                         </span>
//                         <span className="text-xs sm:text-sm  truncate">
//                           Practice • Analyze • Improve
//                         </span>
//                       </div>
//                     </div>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col p-4">
//                   <div className="flex flex-col gap-5">
//                     {navItems.map((item, index) => {
//                       return (
//                         <Link
//                           key={index}
//                           href={item.href}
//                           className=" font-medium hover:text-primary"
//                         >
//                           {item.name}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                   <div className="mt-6 flex flex-col gap-4">
//                     <Button variant="outline">Sign in</Button>
//                     <Button>Sign Up</Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </nav>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WebHeader;
