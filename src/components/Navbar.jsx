// components/Navbar.jsx

import { useRouter } from "next/router";
import { Link as ScrollLink, scroller } from "react-scroll";
import navbar from "../data/navbar.json";
import { checkExternalLink } from "../utils/checkExternalLink";

const Navbar = ({ className }) => {
  const router = useRouter();

  const handleNavigation = (href) => {
    if (router.pathname === "/") {
      // Scroll directly if on the homepage
      scroller.scrollTo(href, {
        smooth: true,
        duration: 500,
        offset: -70, // Adjust offset if there's a fixed header
      });
    } else {
      // Navigate to the homepage and scroll
      router.push(`/#${href}`);
    }
  };

  return (
    <nav className={`navbar hidden sm:block ${className ?? ""}`}>
      <ul className="nav flex space-x-10">
        {navbar.map((item) => (
          <li key={item.id}>
            {checkExternalLink(item.href) ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover={item.name.toLowerCase()}
                className={`block text-white font-medium text-sm relative cursor-pointer after:duration-300 ${navItemHoverStyle}`}
              >
                <span className="block duration-300">{item.name}</span>
              </a>
            ) : (
              <button
                onClick={() => handleNavigation(item.href)}
                data-hover={item.name.toLowerCase()}
                className={`block text-white font-medium text-sm relative cursor-pointer after:duration-300 ${navItemHoverStyle}`}
              >
                <span className="block duration-300">{item.name}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navItemHoverStyle =
  "after:content-[attr(data-hover)] after:absolute after:left-1/2 after:top-3/4 after:opacity-0 after:-translate-x-1/2 hover:after:top-1/2 hover:after:opacity-100 hover:after:-translate-y-1/2";
const navItemActiveStyle =
  "before:absolute before:h-[6px] before:w-[6px] before:rounded-full before:bg-white before:left-1/2 before:-translate-x-1/2 before:-bottom-3";

export default Navbar;
