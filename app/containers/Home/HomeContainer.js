import React, {PropTypes} from 'react';
import { container } from './styles.css'

import {WatchLog} from 'components';
import {rootURL, postColnames} from 'helpers/server';

/**
 * @fbielejec
 */String.prototype.beginsWith = function(string) {
  return (this.indexOf(string) === 0);
};

const HomeContainer = React.createClass({

      PropTypes: {

      },

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
            var lines = content.split('\n');

            // get the column names
            var colnames = lines.filter((line) => {
            return !line.beginsWith('#');
            })[0].split(/\s+/);

            postColnames(colnames).then((response) => {
                console.log(response);
              })
              .catch((response) => {
                console.log(response);
              });

            // for (var line = 0; line < lines.length; line++) {
            //   console.log(lines[line]);
            // }




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
