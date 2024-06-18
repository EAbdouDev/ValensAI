"use client";
import { FC, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  CircleUserRound,
  ClipboardPlus,
  Disc,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface MainNavProps {}

const MainNav: FC<MainNavProps> = ({}) => {
  const [scrolled, setScrolled] = useState(false);

  const { user } = useUser();
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const handleChangeTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname.includes("dashboard"),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Cases",
      href: "/cases",
      active: pathname.includes("case"),
      icon: <ClipboardPlus className="w-5 h-5" />,
    },
    {
      name: "Recordings",
      href: "/recordings",
      active: pathname.includes("recordings"),
      icon: <Disc className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full h-[60px] flex justify-between items-center px-4 py-9 lg:px-6 backdrop-blur-md border-b `}
    >
      <div className="Branding flex justify-center items-center gap-2">
        <span className="flex justify-center items-center gap-2">
          <h1 className="font-bold text-xl">MedSim AI</h1>
          <p className="border border-black dark:border-white font-semibold p-1 rounded-sm text-xs  ">
            Experimental
          </p>
        </span>

        <div className="flex justify-start items-center gap-4 ml-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`${link.href}`}
              className={`  ${
                link.active
                  ? "text-blue-600 dark:text-blue-400 opacity-100 "
                  : "  opacity-70"
              } font-medium flex justify-start items-center gap-2 w-full p-3  rounded-md transition-all ease-in-out`}
            >
              {" "}
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-6">
        <button onClick={handleChangeTheme}>
          {isDark ? <Sun /> : <Moon />}
        </button>
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-9 h-9 ">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={10}
            className="mr-4  flex flex-col justify-start overflow-hidden p-0 dark:bg-[#151515]"
          >
            <div className="flex justify-start items-center gap-4 max-w-full border-b p-4">
              <div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-start items-start gap-1 max-w-full">
                <h3 className="capitalize text-sm font-medium">
                  {user?.username}
                </h3>
                <p className=" max-w-full truncate text-xs opacity-50">
                  {user?.emailAddresses.map((email) => email.emailAddress)}
                </p>
              </div>
            </div>
            <div className="Menu p-4 w-full">
              <ul className="w-full">
                <li className="w-full  hover:bg-muted dark:hover:bg-[#232323] p-3 rounded-lg">
                  <Link
                    href={`/profile`}
                    className="flex justify-start items-center gap-2"
                  >
                    <CircleUserRound className="w-5 h-5" /> Profile
                  </Link>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MainNav;
