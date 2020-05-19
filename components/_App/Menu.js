import Link from "next/link";
import Router, { useRouter } from "next/router";
import cookie from "js-cookie";

import MenuLink from "./MenuLink";
import MenuLinkLogged from "./MenuLinkLogged";
import Logout from "./Logout";

export default function Menu(props) {
  const { pathname } = useRouter();

  let logged;
  let admin;
  if (props.user) {
    logged = true;
  } else logged = false;

  const isActive = (path) => {
    return path === pathname;
  };

  return (
    <>
      <nav>
        <ul className="menu">
          <MenuLinkLogged link="" title="home" logged={true} />
          <MenuLinkLogged link="cart" logged={logged} />
          <Logout logged={logged} />
          <MenuLinkLogged link="login" logged={!logged} />
          <MenuLinkLogged link="signup" logged={!logged} />

          {props.user && props.user.role === "admin" && (
            <MenuLinkLogged link="addProduct" title="add a product"
              logged={logged}
            />
          )}
        </ul>
      </nav>
    </>
  );
}
