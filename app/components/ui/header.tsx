import { NavLink, useLocation } from "@remix-run/react";
import { Home, Zap, BrickWall } from "lucide-react";
import { useMemo } from "react";

function useNavigation() {
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      {
        name: "Home",
        icon: Home,
        url: "/",
      },

      { name: "Grondplan", icon: BrickWall, url: "/grondplan" },

      {
        name: "Electriciteit",
        icon: Zap,
        url: "/electriciteit",
        subItems: [
          {
            name: "Inhoud zekeringkast",
            url: "/electriciteit/zekeringkast/inhoud",
          },
          {
            name: "Layout zekeringkast",
            url: "/electriciteit/zekeringkast/layout",
          },
          { name: "Eéndraadschema", url: "/electriciteit/eendraadschema" },
          { name: "Situatieschema", url: "/electriciteit/situatieschema" },
        ],
      },
    ],
    [],
  );

  const activeItem = useMemo(() => {
    const found = menuItems.find(
      (item) => item.url !== "/" && location.pathname.startsWith(item.url),
    );
    return found || menuItems[0];
  }, [location.pathname, menuItems]);

  return { menuItems, activeItem };
}

export function Header() {
  const { menuItems, activeItem } = useNavigation();

  return (
    <header>
      <nav className="border-b">
        <div className="container mx-auto flex h-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                `flex items-center border-b-2 px-4 py-2 ${
                  isActive ? "border-primary" : "border-transparent"
                }`
              }
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="container mx-auto flex">
          {activeItem?.subItems && (
            <div className="flex">
              {activeItem.subItems.map((subItem) => (
                <NavLink
                  key={subItem.url}
                  to={subItem.url}
                  className={({ isActive }) =>
                    `flex items-center border-b-2 px-4 py-2 ${
                      isActive ? "border-primary" : "border-transparent"
                    }`
                  }
                >
                  {subItem.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
