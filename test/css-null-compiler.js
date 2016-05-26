/**
* @fbielejec
*/

function noop() {
  return null;
}

// keep adding as neccessary
require.extensions['.css'] = noop;
