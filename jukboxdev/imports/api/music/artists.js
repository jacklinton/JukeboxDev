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

Schemas.Artists = new SimpleSchema({
  name: {
    type: String,
    label: "Artist",
    index: true,
    unique: true
  },
  collection: {
    type: String,
    label: "Collection"
  }
});

Meteor.artists.attachSchema(Schema.Artist);

export default Artists;
