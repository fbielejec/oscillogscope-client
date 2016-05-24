import React, {PropTypes} from 'react';
import { container, innerContainer, header } from './styles.css'
import { Reset } from 'components'


/**
 * @fbielejec
 */
const MainContainer = React.createClass({

  render () {
    return (
      <div className={container}>

            <div className={header}>
              <h2 >
                {'Oscillogscope'}
              </h2>
              <Reset/>
            </div>


        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default MainContainer
