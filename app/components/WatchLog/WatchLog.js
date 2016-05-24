import React, {PropTypes} from 'react'
import { button, container } from './styles.css'

import { FileInput } from 'components'

/**
 * @fbielejec
 */
const WatchLog = React.createClass({

  PropTypes: {
    handleClick : PropTypes.func,
  },

  render: function() {
    return (

<div className={container}>

      <FileInput
        name="Trees file"
        accept=".*"
        placeholder="Select log file to watch"
        className={button}
        onChange={this.props.handleClick}/>

    </div>

    );
  }

});

export default WatchLog;
