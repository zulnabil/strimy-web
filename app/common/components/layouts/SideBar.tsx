"use client";

import Link from "next/link";
import "./styles/SideBar.scss";
import { LINKS } from "~/app/common/constants/LINKS";
import Image from "next/image";

export default function SideBar() {
  return (
    <aside className="side-bar">
      <nav>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <div className="link-content">
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <span className="link-label font-semibold">{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
