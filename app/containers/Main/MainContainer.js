import React, {PropTypes} from 'react';
import { container, innerContainer } from './styles.css'

/**
 * @fbielejec
 */
const MainContainer = React.createClass({

  render () {
    return (
      <div className={container}>
            MAIN NAVBAR
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default MainContainer
