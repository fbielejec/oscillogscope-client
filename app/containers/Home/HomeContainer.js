import React, {PropTypes} from 'react';
import { container } from './styles.css'

import {WatchLog} from 'components';

/**
 * @fbielejec
 */
const HomeContainer = React.createClass({

  render() {
    return (
      <div className = {container}>

             <WatchLog/>

      </div>
    );
  }

});

export default HomeContainer;
