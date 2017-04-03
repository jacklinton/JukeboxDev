import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Songs = new Mongo.Collection('songs');

Meteor.methods({
  'Songs.addOne': ({ name },
  { title },
  { creator },
  { track },
  { album },
  { bitrate },
  { length },
  { src },
  { image }
  ) => {
    return Songs.insert({ name },
    { title },
    { creator },
    { track },
    { album },
    { bitrate },
    { length },
    { src },
    { image });
  },
});

Meteor.publish('songs', () => {
  return Songs.find();
});

var Schemas = {};

Schemas.Song = new SimpleSchema({
  name: {
    type: String,
    label: "Identifier"
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
    label: "Album",
    index: true
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
    label: "src",
    index: true
  },
  image: {
    type: Array,
    label: "Image",
    optional: true
  },
  "image.$": {
    type: String
  }
});
Songs.attachSchema(Schemas.Song);

export default Songs;
