// Server entry point, imports all server code
import { Meteor } from 'meteor/meteor';

import '/imports/api/items';
import '/imports/startup/server';
import '/imports/startup/both';

Meteor.startup(() => {
  // code to run on server at startup
});
