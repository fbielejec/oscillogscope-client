function scrapeColumnNames(lines) {
  var colnames = lines.filter((line) => {
    return !line.beginsWith('#');
  })[0].split(/\s+/).map((name) => {
    return name.replace(ILLEGAL_CHARACTER, SUBSTITUTE_CHARACTER);
  });

  return colnames;
}

function makeRowMap(colnames, values) {
  const rowMap = colnames.reduce(function(previous, element, i, array) {
    previous[element] = values[i];
    return previous;
  }, {});

  return rowMap;
}

export {
  scrapeColumnNames,
  makeRowMap
};
