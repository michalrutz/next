import Head from "next/head";
import Header from "./Header";
import Menu from "./Menu";
import NProgress from "nprogress";
import Router from "next/router";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Layout(props) {
  return (
    <>
      <Head>
        {/* Stylesheets */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/styles.css"
          key="global"
        />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />{" "}
        'nprogress'
        <title>ReactReserve</title>
      </Head>
      {props.user ? <p>{props.user.name}</p> : " "}
      <Menu user={props.user} />
      <div>{props.children}</div>
    </>
  );
}

export default Layout;
