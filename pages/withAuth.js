import { parseCookies } from "nookies";
import chalk from "chalk";
import Router, { useRouter } from "next/router";

//my
import protect from "../utils/protect";
import { redirectUser } from "../utils/auth";

export default (C, restrictedTo = ["user"]) => {
  class AuthComponent extends React.Component {
    static async getInitialProps(ctx) {
      console.log(chalk.bgMagenta(ctx));
      console.log("withAuth");
      // ctx.res.redirect("https://wiadomosci.tvp.pl/");

      // 1. GET COOKIE from CTX
      const { token } = await parseCookies(ctx);
      let data = {};
      console.log(chalk.red(token));

      // 2.A if NO TOKEN -> REDIRECT
      if (!token) {
        console.log(chalk.red("NO TOKEN"))
        redirectUser(ctx, "/login");
      }
      // 2.B GET USER
      console.log("ROLE", chalk.red(restrictedTo));
      data = await protect(token, restrictedTo);
      // 3. if not authorized
      if (!data.authorized) {
        redirectUser(ctx, "/login");
      }

      // 3. Get component’s PROPS
      let componentProps = {};
      if (C.getInitialProps) {
        componentProps = await C.getInitialProps(ctx);
      }
      console.log("componentProps", componentProps);

      return { data, ...componentProps }; // <- this.props
    }
    render() {
      return <C {...this.props} />;
    }
  }
  return AuthComponent;
};
