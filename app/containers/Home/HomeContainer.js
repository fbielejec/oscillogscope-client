import React, {PropTypes} from 'react';
import { container } from './styles.css'

import {WatchLog} from 'components';

/**
 * @fbielejec
 */
const HomeContainer = React.createClass({

handleWatch(event) {

  event.preventDefault();

  var file = event.target.files[0];
  if (!file) {
    return;
  }

console.log(file);


},

  render() {
    return (
      <div className = {container}>

             <WatchLog handleClick={this.handleWatch}/>

      </div>
    );
  }

});

export default HomeContainer;
