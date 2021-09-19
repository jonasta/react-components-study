import React, { useEffect, useState } from "react";

type MyProps = {
  name: string;
  submit: (newName: string) => void;
};

const MyFunctionComponent = ({ name, submit }: MyProps): JSX.Element => {
  const [userName, setUserName] = useState("initial state user name");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    submit(userName);
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userNameStr = event.target.value;
    setUserName(userNameStr);
  };
  useEffect(() => {
    console.log("MyFunctionComponent useEffect - componentDidMount");
    return () => {
      console.log("MyFunctionComponent useEffect - componentWillUnmount");
    };
  }, []);

  useEffect(() => {
    console.log("MyFunctionComponent useEffect - getDerivedStateFromProps");
    console.log(`-- changing username to '${name}'`);
    setUserName(name);
  }, [name]);

  useEffect(() => {
    console.log(
      `MyFunctionComponent useEffect - componentDidUpdate, name is '${userName}'`
    );
    return () => {};
  }, [userName]);

  return (
    <>
      <h1>Function Component</h1>
      <fieldset>
        <legend>Props</legend>
        <p>{name}</p>
      </fieldset>
      <fieldset>
        <legend>State</legend>
        <p>{userName}</p>
      </fieldset>
      <fieldset>
        <legend>Change Data</legend>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={userName} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit (inverser flow)" />
        </form>
      </fieldset>
      {console.log("MyFunctionComponent render")}
    </>
  );
};
export default MyFunctionComponent;
