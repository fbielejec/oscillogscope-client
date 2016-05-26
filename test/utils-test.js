/**
 * @fbielejec
 */

"use strict";

import {
  assert
} from 'chai';
import {
  makeRowMap
} from '../app/helpers/utils';

describe('utils tests', function() {

  it("tests make map utility f-tion", function() {

    const colnames = ["name1", "name2", "name3"];
    const values = [0.1, 0.2, 0.3];
    const expected = {
      name1: 0.1,
      name2: 0.2,
      name3: 0.3,
    }

    const actual = makeRowMap(colnames, values);
    assert.deepEqual(expected , actual);
  });

});
