import fetch from "node-fetch";
import { parseCookies } from "nookies";
import chalk from 'chalk'
//next
import Router, { useRouter } from "next/router";
//my
import baseUrl from "../utils/baseUrl";
import protect from "../utils/protect";

const Comp = (props) => {
  console.log("COMP", props);
  // const { name } = props.data.user;

  // const { name } = data.user;
  // console.log("PROPS TEST ", data.user, data.authorized);
  // const router = useRouter();

  return (
    <>
      <h1>{"props.user.name"}</h1>
    </>
  );
};

class Test extends React.Component {
  static async getInitialProps(ctx) {
    // 1. GET COOKIE from CTX
    const token = parseCookies(ctx);
    let data = {};

    // 2.A if NO TOKEN -> REDIRECT
    if (!token) {
      // Router.push("/login");
      ctx.res.redirect("/");

      // 2.B if TOKEN -> GET USER -> ROLE
    } else {
      // 1. GET COOKIE from CTX
      data = await protect(token, ["user", "admin"]);
    }

    return { data };
  }

  render() {
    console.log("PROPS TEST");
    // const {name} = data.user;
    // const router = useRouter();

    return (
      <>
        <h1>{}</h1>
        <Comp />
      </>
    );
  }
}
// const Test = ({ data }) => {
//   const { name } = data.user;
//   console.log("PROPS TEST ", data.user, data.authorized);
//   const router = useRouter();

//   return (
//     <>
//       <h1>{name}</h1>
//       < Comp {...data} />
//     </>
//   );
// };

Test.getInitialProps = async (ctx) => {
  // 1. GET COOKIE from CTX
  const { token } = parseCookies(ctx);
  let data = {};
  // 2.A if NO TOKEN -> REDIRECT
  if (!token) {
    Router.push("/login");
    // 2.B if TOKEN -> GET USER -> ROLE
  } else {
    // 1. GET COOKIE from CTX
    data = await protect(token, ["user", "admin"]);
  }

  return { data };
};

export default Test;
