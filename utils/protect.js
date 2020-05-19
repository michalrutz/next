//npm
import chalk from "chalk";
import fetch from "node-fetch";
//utils
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/auth";

export default async (token, restrictTo = ["user"]) => {
  let data = {};

  // TOKEN -> GET USER
  try {
    const url = `${baseUrl}/api/account`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: token },
    });
    data.user = await res.json();
    // ROLE
    if (!restrictTo.some((e) => e === data.user.role)) {
      data.authorized = false;
      redirectUser(ctx, "/");
    }
    if (restrictTo.some((e) => e === data.user.role)) {
      data.authorized = true;
    }
    console.log("ROLE -> ", chalk.red(JSON.stringify(data.user.role)));
  } catch (error) {
    console.error(error);
  }
  return data;
};
