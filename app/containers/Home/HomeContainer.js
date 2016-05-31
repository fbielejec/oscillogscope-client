import React, {PropTypes} from 'react';
import { container } from './styles.css'

import LineChart from 'chart/LineChart'
import {WatchLog} from 'components';
import {rootURL, postDatabaseCreate, postDatabaseInsert, getDatabaseDataLastN} from 'helpers/server';
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

//---TEST---//////////////////

handleWatch2(event) {

  event.preventDefault();
  const file = event.target.files[0];
  if (!file) {
    return;
  }

 const reader = new FileReader();

    setInterval(() => {

     reader.onload = async function(e) {
         const content = e.target.result;

         const lines = content.split('\n').filter((line) => {
           return !line.beginsWith('#') && !(line === "");
         });
         const nLines = lines.length - 1;

   console.log("number of lines in file: " + nLines);

       } // onLoad
            reader.readAsText(file, 'UTF-8');

    }, 1500);

},

/////////////////////


handleWatch(event) {

  event.preventDefault();
  const file = event.target.files[0];
  if (!file) {
    return;
  }

// clear state
this.setState(this.getInitialState());

  const self = this;

  //  check for new file content every interval
  setInterval(() => {

     var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = async function(e) {
        const content = e.target.result;

console.log("ROLLING");

        // skip commented lines
        const lines = content.split('\n').filter((line) => {
          return !line.beginsWith('#') && !(line === "");
        });
        const nLines = lines.length - 1;


        if (!self.state.dbCreated) {

          // get the column names
          const colnames = scrapeColumnNames(lines[0]);

          // POST colnames (creates db), set state
          await postDatabaseCreate(colnames).then((response) => {
              console.log(response);
            })
            .catch((response) => {
              console.log(response);
            });

          self.setState({
            colnames: colnames,
            dbCreated: true,
          });
        } //END: dbCreated check

        // post all new lines
        if (nLines > self.state.linesSent ) {

        // console.log((nLines - self.state.linesSent ) + " new lines detected");

          const from = 1 + self.state.linesSent;
          const to = nLines + 1;
          const values = lines.slice(from, to);

          values.map((line, i) => {
            const row = line.split(/\s+/);
            const rowMap = makeRowMap(self.state.colnames, row);
              postDatabaseInsert(rowMap).then((response) => {
                console.log(response);
              })
              .catch((response) => {
                console.log(response);
              });
          });

          self.setState({
            linesSent: (self.state.linesSent + values.length),
          });

          // fetch server response with last n rows of data
          await getDatabaseDataLastN(values.length).then(function(response) {

            const json = response.data;
            self.setState({
              dataLoaded: true,
              data: json.data,
            });

          }).catch(function(response) {
            console.log(response);
          });

        } //END: nLines check
      } //END: onload

  }, 1500);
},

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
