import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Songs = new Mongo.Collection('songs');
Songs.allow({
  insert: function(){
    return true;
  }
});
Meteor.methods({
  'Songs.addOne': ({ name,
  title,
  creator,
  track,
  album,
  bitrate,
  length,
  src,
  image
}) => {
    return Songs.insert({ name,
    title,
    creator,
    track,
    album,
    bitrate,
    length,
    src,
    image
  });
  },



});



Meteor.publish('songs', () => {
  return Songs.find();
});

// var Schemas = {};
//
// Schemas.Song = new SimpleSchema({
//   name: {
//     type: String,
//     label: "Identifier",
//     required: false
//   },
//   title: {
//     type: String,
//     label: "Title",
//     index: true,
//     required: false,
//   },
//   creator: {
//     type: String,
//     label: "Artist",
//     index: true
//   },
//   track: {
//     type: Number,
//     label: "Track"
//   },
//   album: {
//     type: String,
//     label: "Album",
//     index: true,
//     required: false
//   },
//   bitrate: {
//     type: String,
//     label: "Bitrate",
//     required: false
//   },
//   length: {
//     type: String,
//     label: "Length",
//     required: false
//   },
//   src: {
//     type: String,
//     label: "src",
//     index: true,
//     required: false
//   },
//   image: {
//     type: Array,
//     label: "Image",
//     required: false
//   },
//   "image.$": {
//     type: String,
//     required: false
//   }
// });
// Songs.attachSchema(Schemas.Song);

export default Songs;
