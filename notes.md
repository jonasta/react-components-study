# React
- Remember: React is all about one-way data flow down the component hierarchy
- https://reactjs.org/docs/hello-world.html

## Function and Class Components
- function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

- class Welcome extends React.Component {
  render {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

## props
- properties to be filled to the component. i.e "name"
  - < FunctionComponent name="jota"/>

## Lifecycle
### Class Component
- Mounting
  - constructor
  - getDerivedStateFromProps (can change parts of the state based on props)
  - render (update DOM)
  - componentDidMount (after DOM rendered)

- Updating
  - getDerivedStateFromProps
  - shouldComponentUpdate(return true/false if the component should update)
  - render
  - getSnapshotBeforeUpdate (can access old state/props)
  - componentDidUpdate (after DOM rendered)

- Unmounting
  - componentWillUnmount (when removed from DOM)

- source https://www.w3schools.com/react/react_lifecycle.asp

### Function component
- hooks
  - useState (similar to this.setState)
  - useEffect (similar to componentDidMount, componentDidUpdate, componentWillUnmount and getDerivedStateFromProps)
    - run your “effect” function after flushing changes to the DOM.
- rules
  - Don’t call Hooks inside loops, conditions, or nested functions.
  - Only call Hooks from React function components
  

## state
- dont update directly (use setState({}))
- updates may be async
- you can update variables independently with separate setState
- ClassComponent
  - updateName =  => {this.setState((oldState) => ({ userName: oldState.userName + "s" }));}
  - need to use this sintax otherwise the method with not be bounded to "this"
- FunctionComponent
  - useState hook

## handling events
- Class fields
  - <button onClick={this.handleClick}>
- Others
  - not recommended as creates the callback function at each rendering
    - <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
    - <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  - recommended
    - get the HTML event value
      - < button data-value="somevalue" onClick={this.updateName}>
      -  updateName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          const str = e.currentTarget.getAttribute('data-value');
          this.setState((oldState) => ({ userName: oldState.userName + str }));
        };
    - use bind in the class constructor
    - source https://reactjs.org/docs/faq-functions.html#example-passing-params-using-data-attributes

## componsition vs inheritance
- https://reactjs.org/docs/composition-vs-inheritance.html
- Composition
  - user props.children to render child components
  - example 1
    - < FancyBorder color="blue">
          ... this are children
          < h1 className="Dialog-title">
            Welcome
          < /h1>
    - function FancyBorder(props) {
        return (
          <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
          </div>
        );
      }

  - example 2        
    - <SplitPane left={<Contacts />} right={<Chat />} />  
    - <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
  
## thinking react
- Step 1: Break The UI Into A Component Hierarchy
  - draw the interface and identify repeatable components
- Step 2: Build A Static Version in React
  - write components without interaction
- Step 3: Identify The Minimal (but complete) Representation Of UI State
  - Is it passed in from a parent via props? If so, it probably isn’t state.
  - Does it remain unchanged over time? If so, it probably isn’t state.
  - Can you compute it based on any other state or props in your component? If so, it isn’t state.
- Step 4: Identify Where Your State Should Live
  - Identify every component that renders something based on that state.
  - Find a common owner component (a single component above all the components that need the state in the hierarchy)
  - Either the common owner or another component higher up in the hierarchy should own the state.
  - If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.
- Step 5: Add Inverse Data Flow
  - pass children some function to update the parent state