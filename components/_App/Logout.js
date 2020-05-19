import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function Logout(props) {

  return (
    <>
      {props.logged && (
        <li className="item">
          <Link href={`/login`}>
            <a onClick={() => cookie.remove("token")}>
              logout
            </a>
          </Link>
        </li>
      )}
    </>
  );
}
