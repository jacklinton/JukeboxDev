import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Artists = new Mongo.Collection('artists');

Meteor.methods({
  'Artists.addOne': ({ name }, { collection }) => {
    return Artists.insert({ name }, { collection });
  },
});

Meteor.publish('artists', () => {
  return Artists.find();
});

var Schemas = {};

Schemas.Artist = new SimpleSchema({
  name: {
    type: String,
    label: "Artist"
  },
  collection: {
    type: String,
    label: "Collection"
  }
});

Artists.attachSchema(Schemas.Artist);

export default Artists;
