import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import { container, link} from './styles.css'

/**
 * @fbielejec
 */
const Reset = React.createClass({

  // PropTypes: {
  //   handleClick : PropTypes.func,
  // },

  render: function() {
    return (

      <div className={container}>
        <Link to='/'>
          <button type='button' className={link}>Reset</button>
        </Link>
    </div>

    );
  }

});

export default Reset;
