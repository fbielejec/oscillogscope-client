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

  var reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  var self = this;

  reader.onload = function(e) {
      var content = e.target.result;
      // Entire file
      // console.log(content);

      // By lines
      var lines = content.split('\n');
  // console.log(lines[2]);
      for (var line = 0; line < lines.length; line++) {
        console.log(lines[line]);
      }

// TODO: read and send column names server-side (server created db)


    } //END: onLoad
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
