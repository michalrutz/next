const { useRouter } = require("next/router");

export default function Name() {
  const router = useRouter();
  const { name, city, age } = router.query;
  return (
     <>
      <h1>{name}</h1>
      {city ? city : <p>I don't know where {name} lives!</p>}
      {age ? <p>She's {age}</p> : <p>I don't know how old she is.</p>}
    </>
  );
}
