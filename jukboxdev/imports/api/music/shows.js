import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Shows = new Mongo.Collection('shows');

Meteor.methods({
  'Shows.addOne': ({ identifier },
     { title },
     { artist },
     { description },
     { date },
     { year },
     { addedDate },
     { uplaoder },
     { venue },
     { coverage },
     { taper },
     { transferer },
     { runtime },
     { notes },
     { source },
     { sbd },
     { songs },
     { updateddate }
   ) => {
    return Shows.insert({ identifier },
       { title },
       { artist },
       { description },
       { date },
       { year },
       { addedDate },
       { uplaoder },
       { venue },
       { coverage },
       { taper },
       { transferer },
       { runtime },
       { notes },
       { source },
       { sbd },
       { songs },
       { updateddate }
     );
  },
});

Meteor.publish('shows', () => {
  return Shows.find();
});

var Schemas = {};

Schemas.Show = new SimpleSchema({
  identifier: {
    type: String,
    label: "Identifier",
    unique: true
  },
  title: {
    type: String,
    label: "Title"
  },
  creator: {
    type: String,
    label: "Artist",
    index: true
  },
  description: {
    type: String,
    label: "Description"
  },
  date: {
    type: String,
    label: "Date"
  },
  year: {
    type: String,
    label: "Year",
    index: true
  },
  addeddate: {
    type: String,
    label: "Date Added",
    index: true
  },
  uploader: {
    type: String,
    label: "Uploader"
  },
  venue: {
    type: String,
    label: "Venue",
    index: true
  },
  coverage: {
    type: String,
    label: "Location"
  },
  taper: {
    type: String,
    label: "Taper"
  },
  transferer: {
    type: String,
    label: "Transferer"
  },
  runtime: {
    type: String,
    label: "Runtime"
  },
  notes: {
    type: String,
    label: "Show Notes"
  },
  source: {
    type: String
    label: "Source"
  }
  sbd: {
    type: Boolean,
    label: "SBD"
    index: true
  },
  songs: {
    type: [Object],
    label: "Songs"
  },
  updateddate: {
    type: String,
    label: "Updated Date",
    index: true
  }
});

Shows.attachSchema(Schemas.Show);

export default Shows;
