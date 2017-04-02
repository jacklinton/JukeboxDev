// Server entry point, imports all server code
import { Meteor } from 'meteor/meteor';
import FacebookOAuthInit from './imports/oauth-facebook';

import '/imports/api/items';
import '/imports/startup/server';
import '/imports/startup/both';

Meteor.startup(() => {
	FacebookOAuthInit();
  // code to run on server at startup
});
