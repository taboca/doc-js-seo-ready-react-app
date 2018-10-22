import React, {Component} from 'react'
import { connect } from 'react-redux'
import { command_updateSection } from '../store/actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.dispatch(command_updateSection());
  }

  componentDidMount() {
  }

  render() {
    let uniqueKey=0;
    let sections = this.props.sections.map((nodeItem) => {
      return (

        <div className="contentSection" key={uniqueKey++}>

        {nodeItem.id}

        {nodeItem.content}

        </div>

      );
    });

    return (
       <div>
        {sections}

        <div onClick={this.onClick}>Update sections</div>
        
       </div>
    );
  }
}
 
function mapStateToProps(state) { 
  return {
    sections: state.sections
  }
}
 
export default connect(mapStateToProps)(App)
