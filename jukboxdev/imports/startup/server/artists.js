import request from 'request';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


const identifier = "gd1982-10-10.sbd.miller.110628.flac24";
const url = "https://archive.org/metadata/" + identifier;
const getShow = async () => {
  let show
  await request(url, (er, res, body) => {
    show = JSON.parse(body);
  });
  let metaD = await show.metadata;
  let files = await show.files;
  let mp3s = await files.filter( (i) => { return i.name.endsWith('mp3') });
  let images = await files.filter( (i) => { return i.name.endsWith('jpg' || 'jpeg') });

}
