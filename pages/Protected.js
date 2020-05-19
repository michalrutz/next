import fetch from "node-fetch";
import chalk from "chalk";

import { parseCookies } from "nookies";

//next
import Router, { useRouter } from "next/router";
//my
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/auth";
import withAuth from "./withAuth";

const Comp = (props) => {
  console.log(props);
  const {
    user: { name, email, role },
  } = props.data;

  return (
    <>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>role: {role}</p>
    </>
  );
};

Comp.getInitialProps = async (ctx) => {
  // 1. GET COOKIE from CTX
  console.log(chalk.green(3))
  const { token } = parseCookies(ctx);
  const Test = { test: "test" };
  // let data = {};
  // // 2.A if NO TOKEN -> REDIRECT
  if (token) {
    console.log(chalk.bgMagenta(ctx.res))
      }
  //   // 2.B if TOKEN -> GET USER -> ROLE
  // } else {
  //   // 1. GET COOKIE from CTX
  //   data = await protect(token, ["user", "admin"]);
  // }

  return { token, Test };
};

export default withAuth(Comp, ["user"]);
