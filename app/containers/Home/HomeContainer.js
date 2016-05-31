import React, {PropTypes} from 'react';
import { container } from './styles.css'

import LineChart from 'chart/LineChart'
import {WatchLog} from 'components';
import {rootURL, postDatabaseCreate, postDatabaseInsert, getDatabaseData} from 'helpers/server';
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
      dbCreated: false,
      linesSent: 0,
      dataLoaded: false,
      data : [],
    };
  },

handleWatch2(event) {
  event.preventDefault();
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const self = this;

  //  check for new file content every interval
  setInterval(() => {

    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = async function(e) {
        var content = e.target.result;

        // skip commented lines
        const lines = content.split('\n').filter((line) => {
          return !line.beginsWith('#');
        });

        if (!self.state.dbCreated) {

          // get the column names
          const colnames = scrapeColumnNames(lines[0]);

          // POST colnames (creates db), set state
          await postDatabaseCreate(colnames).then((response) => {
              // console.log(response);
            })
            .catch((response) => {
              // console.log(response);
            });

          self.setState({
            colnames: colnames,
            dbCreated: true,
          });
        } //END: dbCreated check

        // post all extra lines, skip column lines
        const nLines = lines.length - 1;
        if (nLines > self.state.linesSent) {

          const from = 1 + self.state.linesSent;
          const values = lines.slice(from, lines.length - 1);

          values.map((line, i) => {
            const row = line.split(/\s+/);
            const rowMap = makeRowMap(self.state.colnames, row);
            postDatabaseInsert(rowMap).then((response) => {
                //  console.log(response);
              })
              .catch((response) => {
                // console.log(response);
              });
          });

          self.setState({
            linesSent: (self.state.linesSent + values.length),
          });

        } //END: nLines check

        //TODO
        console.log("Lines in DB: " + self.state.linesSent);

      } //END: onload

  }, 1500);


},


//   handleWatch(event) {
//     event.preventDefault();
//
//     const file = event.target.files[0];
//     if (!file) {
//       return;
//     }
//
//     const reader = new FileReader();
//     reader.readAsText(file, 'UTF-8');
//     const self = this;
//
//     reader.onload = async function(e) {
//       const content = e.target.result;
//
//       // skip commented lines
//       const lines = content.split('\n').filter((line) => {
//         return !line.beginsWith('#');
//       });
//
//       // get the column names
//       const colnames = scrapeColumnNames(lines[0]);
//       self.setState({
//         colnames: colnames,
//       });
//
//       // get values
//       const values = lines
//         .slice(1, lines.length - 1);
//
//
//
//       // POST colnames (creates db), set state
//      await postDatabaseCreate(colnames).then((response) => {
//           // console.log(response);
//         })
//         .catch((response) => {
//           // console.log(response);
//         });
//
//       values.map((line, i) => {
//         const row = line.split(/\s+/);
//         const rowMap = makeRowMap(self.state.colnames, row);
//         postDatabaseInsert(rowMap).then((response) => {
//             //  console.log(response);
//           })
//           .catch((response) => {
//             // console.log(response);
//           });
//       });
//
//       // fetch server response with data
//       await getDatabaseData().then(function(response) {
//
//          const json = response.data;
//
//          self.setState({
//            dataLoaded: true,
//            linesSent: values.length,
//            data : json.data,
//          });
//
//      }).catch(function(response) {
//          console.log(response);
//      });
//
// //TODO
// console.log("Lines in DB: " + self.state.linesSent);
//
//       } //END: onLoad
//
//
//   },

makeLine(line) {
  return (
    <LineChart
      key={line.name}
      name={line.name}
      values={line.values}/>
 );
},

  render() {
    return (
      <div className = {container}>

        <WatchLog handleClick = {this.handleWatch2}/>

        {this.state.dataLoaded ?
          [this.state.data.map( this.makeLine ) ] : null
        }

    </div>
    );
  }

});

export default HomeContainer;
