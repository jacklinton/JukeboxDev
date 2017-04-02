import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Songs = new Mongo.Collection('songs');

Meteor.methods({
  'Songs.addOne': ({ name }) => {
    return Songs.insert({ name });
  },
});

Meteor.publish('songs', () => {
  return Songs.find();
});

var Schemas = {};

Schemas.Songs = new SimpleSchema({
  name: {
    type: String,
    label: "Identifier",
    unique: true,
    index: true
  },
  title: {
    type: String,
    label: "Title",
    index: true
  },
  creator: {
    type: String,
    label: "Artist",
    index: true
  },
  track: {
    type: Number,
    label: "Track"
  },
  album: {
    type: String,
    label: "Album"
  },
  bitrate: {
    type: String,
    label: "Bitrate"
  },
  length: {
    type: String,
    label: "Length"
  },
  src: {
    type: String,
    label: "src"
  },
  
});

Meteor.artists.attachSchema(Schema.Artist);
export default Songs;
