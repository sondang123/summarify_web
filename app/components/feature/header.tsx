import { Link, useLocation } from "@remix-run/react";
import { menuHeader } from "~/const/app-data";
import { logo } from "~/const/app-resource";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        isSticky ? "shadow-lg duration-200 ease-in bg-main-background" : ""
      )}
    >
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:opacity-80"
          >
            <img
              src={logo}
              alt="summarify"
              className="w-[53px] me-2.5 h-full"
            />
            <p className="typo-s32-w700 bg-gradient-to-r from-[#5F1BFE]  to-[#8B66E1] inline-block text-transparent bg-clip-text">
              Summarify
            </p>
          </Link>
          <div className="flex">
            {menuHeader?.map((item, index) => (
              <Link
                to={item?.link}
                key={index}
                className={cn(
                  index === menuHeader?.length - 1 ? "mr-0" : "mr-10",
                  location?.pathname === item?.link
                    ? "typo-s16-w600 text-main-primary"
                    : "typo-s16-w500 text-neutral-0"
                )}
              >
                {item?.name}
              </Link>
            ))}
          </div>
          <div>
            <Button className="rounded-[30px] bg-transparent text-neutral-0 hover:bg-transparent hover:opacity-80">
              Sign in
            </Button>
            <Button className="typo-s16-w600 text-main-light_primary rounded-[30px] bg-gradient-to-r from-[#5F1BFE] to-[#8B66E1] hover:opacity-80">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
