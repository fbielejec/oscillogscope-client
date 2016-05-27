import React, {PropTypes} from 'react';
import { container } from './styles.css'

import {WatchLog} from 'components';
import {rootURL, postDatabaseCreate, postDatabaseInsert} from 'helpers/server';
import {scrapeColumnNames, makeRowMap} from 'helpers/utils';
/**
 * @fbielejec
 */

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

    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    const self = this;

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split('\n');

        // get the column names
        const colnames = scrapeColumnNames(lines);
        self.setState({
          colnames: colnames,
        });

        // POST colnames (creates db), set state
        postDatabaseCreate(colnames).then((response) => {
            // console.log(response);
          })
          .catch((response) => {
            console.log(response);
          });


        // POST content, line by line
        lines.filter((line) => {
            return !line.beginsWith('#');
          }) //
          .slice(1, lines.length) // skip line with colnames
          .map((line, i) => {
            const row = line.split(/\s+/);
            const rowMap = makeRowMap(self.state.colnames, row);

            postDatabaseInsert(rowMap).then((response) => {
                //  console.log(response);
              })
              .catch((response) => {
                console.log(response);
              });
          });



      } //END: onLoad
  },

  render() {
    return (
      <div className = {container}>
        <WatchLog handleClick = {this.handleWatch}/>
      </div>
    );
  }

});

export default HomeContainer;
