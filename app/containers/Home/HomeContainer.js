import React, {PropTypes} from 'react';
import { container } from './styles.css'

import {WatchLog} from 'components';
import {rootURL, postColnames} from 'helpers/server';
import {scrapeColumnNames} from 'helpers/utils';

/**
 * @fbielejec
 */

const ILLEGAL_CHARACTER = ".";
const SUBSTITUTE_CHARACTER = "_";

 String.prototype.beginsWith = function(string) {
  return (this.indexOf(string) === 0);
};

const HomeContainer = React.createClass({

      PropTypes: {

      },

      getInitialState() {
        return {
          colnames: [],
        };
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
            var colnames = scrapeColumnNames(lines);

            // post colnames, set state
            var self = this;
            postColnames(colnames).then((response) => {
                console.log(response);
                self.setState({
                  colnames: colnames,
                });
              })
              .catch((response) => {
                console.log(response);
              });

          // post content, line by line
          lines.filter((line) => {
            return !line.beginsWith('#');
          }) //
          .slice(1, lines.length) // skip line with colnames
          .map((line, i) => {

          var row = line.split(/\s+/);

                console.log(row);

          });



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
