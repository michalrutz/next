const { useRouter } = require("next/router");
import axios from "axios";
import fetch from "node-fetch";
import baseUrl from "../utils/baseUrl";

function UserDashboard({ user: { name, _id } }) {
  // const router = useRouter();
  //   const { name, city, age } = router.query;

  // const delelteProduct = async () => {
  //   const url = baseUrl + "/api/product?_id=" + _id;
  //   await fetch(url, {
  //     method: "DELETE"
  //   });
  //   router.push("/");
  // };

  return (
    <>
      <h1>{name}</h1>
      <p>{_id}</p>
    </>
  );
}

// Product.getInitialProps = async ({ query: { _id } }) => {
//   const url = baseUrl + "/api/product?_id=" + _id;
//   console.log(url);
//   // const payload = { params: {_id} }
//   //   const res = await axios.get(url, payload);
//   //   console.log(res.data);
//   //   return { product: res.data };

//   //   const url = baseUrl+"/api/product";
//   const res2 = await fetch(url, {
//     method: "GET"
//   });
//   const data = await res2.json();
//   console.log(data);
//   return { product: data };
//   // return response data as an object
//   // note: this object will be merged with existing props
// };

export default UserDashboard;
