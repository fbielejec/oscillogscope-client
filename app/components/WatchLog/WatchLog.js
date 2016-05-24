import React, {PropTypes} from 'react'
import { button, container } from './styles.css'

/**
 * @fbielejec
 */
const WatchLog = React.createClass({

  // PropTypes: {
  //   isFetching : PropTypes.bool,
  //   handleClick : PropTypes.func,
  // },

  render: function() {
    return (
      <div className={container}>
      <button className={button}>
      {'Select log file to watch'}
    </button>
  </div>
    );
  }

});

export default WatchLog;
