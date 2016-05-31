import React, {PropTypes} from 'react';

var LineChart = React.createClass({

PropTypes : {
name: PropTypes.string.isRequired,
values: PropTypes.object.isRequired,
},

  render() {
    return (
      <div>
        <h1> {this.props.name} </h1>
      {/*<pre> {JSON.stringify(this.props.values, 2, ' ')} </pre>*/}
      </div>
    );
  }

});

export default LineChart;
