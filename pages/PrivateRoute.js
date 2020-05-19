import React, { useState } from "react";

function withCountState(Wrapped) {
  return function (props) {
    console.log("PROPS", props);
    const [count, setCount] = useState(0);
    const Props = { ...props };

    Props["count"] = count;
    Props["setCount"] = setCount;
    console.log("PROPS", Props);

    return <Wrapped {...Props} />;
  };
}

function Wrapped(props) {
  const { count, setCount } = props;
  return (
    <div>
      <h1>Counter Functional Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
    </div>
  );
}

withCountState.getInitialProps = async (ctx) => {
  console.log("CTX", ctx);
};

const EnhancedWrapped = withCountState(Wrapped);

export default EnhancedWrapped;
