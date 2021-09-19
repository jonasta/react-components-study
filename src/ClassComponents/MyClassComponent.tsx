import React from "react";

type TProps = {
  name: string;
  submit: (newName: string) => void;
};
type TState = {
  userName: string;
};

class MyClassComponent extends React.Component<TProps, TState> {
  state = {
    userName: "initial state user name",
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userNameStr = event.target.value;
    this.setState({ userName: userNameStr });
  };


  submit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.submit(this.state.userName);
    event.preventDefault();
  };

  static getDerivedStateFromProps(props: TProps, state: TState) {
    console.log("MyClassComponent getDerivedStateFromProps");
    if (state.userName === "initial state user name") {
      console.log(
        `-- changing state.username from '${state.userName}' to '${props.name}'`
      );
      return { userName: props.name };
    }
    return null;
  }

  render() {
    console.log("MyClassComponent render");
    return (
      <>
        <h1>Class Component</h1>
        <fieldset>
          <legend>Props</legend>
          <p>{JSON.stringify(this.props)}</p>
        </fieldset>
        <fieldset>
          <legend>State</legend>
          <p>{JSON.stringify(this.state)}</p>
        </fieldset>
        <fieldset>
          <legend>Change Data</legend>
          <form onSubmit={this.submit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.userName}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit (inverser flow)" />
          </form>
        </fieldset>
      </>
    );
  }

  componentDidMount() {
    console.log("MyClassComponent componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("MyClassComponent shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: TProps, prevState: TState) {
    console.log("MyClassComponent getSnapshotBeforeUpdate");
    console.log("-- prevProps", prevProps);
    console.log("-- prevState", prevState);
    return null;
  }

  componentDidUpdate() {
    console.log("MyClassComponent componentDidUpdate");
    console.log("-- props", this.props);
    console.log("-- state", this.state);
  }

  componentWillUnmount() {
    console.log("MyClassComponent componentWillUnmount");
  }
}

export default MyClassComponent;
