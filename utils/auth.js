import cookie from "js-cookie";
import Router from "next/router";

export function handleLogin(token) {
  cookie.set("token", token, { sameSite: "strict" });
  Router.push("/account");
}

export function redirectUser(ctx, location="/") {
  if (ctx.req) {
    console.log("REDIRECT CTX.RES");
    // ctx.res.redirect('/'); //You should only use "next/router" inside the client side of your app.
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    console.log("PUSH");

    Router.push(location);
  }
}

export function isAuthorized(
  user = { role: "user" },
  path = "",
  role = "admin",
  restrictedRoutes = [""]
) {
  if (user.role !== role) {
    const isRestrictedRoute = restrictedRoutes.some(
      (el) => path === el
    );
    if (isRestrictedRoute) {
      return false;
    } else return true;
  }
  return true;
}
