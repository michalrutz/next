import Link from "next/link";
import Router, { useRouter } from "next/router";
import cookie from "js-cookie";

export default function MenuLink(props) {
  const { pathname } = useRouter();

  const isActive = (path) => {
    return path === pathname;
  };

  return (
    <>
      <li className="item">
        <Link href={`/${props.link}`}>
          <a
            onClick={props.fun}
            className={isActive(`/${props.link}`) ? "link active" : ""}
          >
            {props.title || props.link}
          </a>
        </Link>
      </li>
    </>
  );
}
