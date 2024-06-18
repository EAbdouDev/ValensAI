"use client";
import useSidebar from "@/zuztand/Sidebar";
import { useUser } from "@clerk/nextjs";
import { ClipboardPlus, Disc, LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { isOpen, setIsOpen } = useSidebar();

  const handleExpand = () => {
    setIsOpen(!isOpen);
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
      active: pathname.includes("cases"),
      icon: <ClipboardPlus className="w-5 h-5" />,
    },
    {
      name: "Recordings",
      href: "/recordings",
      active: pathname.includes("recordings"),
      icon: <Disc className="w-5 h-5" />,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-6  ">
      <div className="mt-6 space-y-6">
        {links.map((link) => (
          <Link
            key={link.name}
            href={`${link.href}`}
            className={`  ${
              link.active
                ? "bg-pink-200 dark:bg-[#232323] opacity-100"
                : " hover:bg-pink-100 dark:hover:bg-[#242424] opacity-70"
            } font-medium flex justify-start items-center gap-2 w-full p-3  rounded-md transition-all ease-in-out`}
          >
            {isOpen ? (
              <>
                {" "}
                {link.icon}
                {link.name}
              </>
            ) : (
              <>{link.icon}</>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
