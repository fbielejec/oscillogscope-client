
function scrapeColumnNames(lines) {
  var colnames = lines.filter((line) => {
    return !line.beginsWith('#');
  })[0].split(/\s+/).map((name) => {
    return name.replace(ILLEGAL_CHARACTER, SUBSTITUTE_CHARACTER);
  });

return colnames;
}

export { scrapeColumnNames };
