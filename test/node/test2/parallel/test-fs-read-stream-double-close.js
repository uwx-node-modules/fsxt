'use strict';

const common = require('../common');
const fs = require('../../../../');

const s = fs.createReadStream(__filename);

s.close(common.mustCall());
s.close(common.mustCall());
