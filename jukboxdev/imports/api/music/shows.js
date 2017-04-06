import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


const Shows = new Mongo.Collection('shows');

Shows.allow({
  insert: function(){
    return true;
  }
});

Meteor.methods({
  'Shows.addOne': ({ identifier,
     title,
     name,
     creator,
     description,
     date,
     year,
     addeddate,
     uplaoder,
     venue,
     coverage,
     taper,
     transferer,
     runtime,
     notes,
     source,
     sbd,
     songs,
     updateddate
}) => {
    return Shows.insert({ identifier,
       title,
       name,
       creator,
       description,
       date,
       year,
       addedDate,
       uplaoder,
       venue,
       coverage,
       taper,
       transferer,
       runtime,
       notes,
       source,
       sbd,
       songs,
       updateddate
     });
},


});



Meteor.publish('shows', () => {
  return Shows.find();
});

// var Schemas = {};
//
// Schemas.Show = new SimpleSchema({
//   identifier: {
//     type: String,
//     label: "Identifier",
//     index: true,
//     unique: true
//   },
//   title: {
//     type: String,
//     label: "Title",
//     index: true,
//     required: false
//   },
//   name: {
//     type: String,
//     label: "Name",
//     index: true,
//     required: false
//   },
//   creator: {
//     type: String,
//     label: "Artist"
//   },
//   description: {
//     type: String,
//     label: "Description",
//     required: false
//   },
//   date: {
//     type: String,
//     label: "Date",
//     required: false
//   },
//   year: {
//     type: String,
//     label: "Year",
//     index: true
//   },
//   addeddate: {
//     type: String,
//     label: "Date Added",
//     index: true
//   },
//   uploader: {
//     type: String,
//     label: "Uploader",
//     required: false
//   },
//   venue: {
//     type: String,
//     label: "Venue",
//     index: true,
//     required: false
//   },
//   coverage: {
//     type: String,
//     label: "Location",
//     required: false
//   },
//   taper: {
//     type: String,
//     label: "Taper",
//     required: false
//   },
//   transferer: {
//     type: String,
//     label: "Transferer",
//     required: false
//   },
//   runtime: {
//     type: String,
//     label: "Runtime"
//   },
//   notes: {
//     type: String,
//     label: "Show Notes",
//     required: false
//   },
//   source: {
//     type: String,
//     label: "Source",
//     required: false
//   },
//   sbd: {
//     type: Boolean,
//     label: "SBD",
//     index:true,
//     required: false
//   },
//   updateddate: {
//     type: String,
//     label: "Updated Date",
//     required: false
//   }
// });
//
// Shows.attachSchema(Schemas.Show);


export default Shows;
