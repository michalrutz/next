import React, { useState, useEffect } from "react";
import axios from "axios";
import fetch from "node-fetch";
import Router, { useRouter } from "next/router";
import ProduktPrev from "../components/ProductPrev";
import baseUrl from "../utils/baseUrl";

function Home({ products }) {
  const [Products, setProducts] = React.useState(products);
  const [Loading, setLoading] = React.useState(false);
  const [Disable, setDisable] = React.useState(false);
  const [Disable2, setDis2] = React.useState(false);

  let order = "desc";
  let val = "price";

  const sortProducts = async (query) => {
    setLoading(true);
    if (Object.keys(query)[0] === "v") {
      setDisable(!Disable);
      console.log(Object.keys(query)[0]);
      val = query.v;
    } else {
      setDis2(!Disable2);
      order = query;
    }
    const data = await getFilteredPro();
    setProducts(data);
    setLoading(false);
  };

  const getFilteredPro = async () => {
    const url = `http://localhost:3000/api/productsfilter?val=${val}&order=${order}`;
    console.log(url);
    const res = await fetch(url, { method: "GET" });
    return await res.json();
  };

  return (
    <>
      <div>
        sort by
        <button disabled={Disable} onClick={() => sortProducts({ v: "name" })}>
          name
        </button>
        <button
          disabled={!Disable}
          onClick={() => sortProducts({ v: "price" })}
        >
          price
        </button>
        <button disabled={Disable2} onClick={() => sortProducts("asc")}>
          ascending
        </button>
        <button disabled={!Disable2} onClick={() => sortProducts("desc")}>
          descending
        </button>
        {Loading && "loading"}
        {Products.map((item) => (
          <ProduktPrev key={item._id} item={item} />
        ))}
      </div>
    </>
  );
}

Home.getInitialProps = async () => {
  const res = await axios.get(
    `http://localhost:3000/api/productsfilter?val=price&order=desc`
  );
  return { products: res.data };

  // const url2 = baseUrl+"/api/user";
  // const res2 = await fetch(url2,{ method: "GET" });
  // const data = await res2.json()
  // return { products: data };

  // return response data as an object
  // note: this object will be merged with existing props
};

export default Home;
