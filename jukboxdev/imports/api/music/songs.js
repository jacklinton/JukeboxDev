import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

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
  image: {
    type: [String],
    label: "Image"
  }
});

Songs.attachSchema(Schemas.Song);
export default Songs;
