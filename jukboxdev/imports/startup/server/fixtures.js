// Fill the DB with example data on startup
import { EJSON } from 'meteor/ejson';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import Artists from '../../api/music/artists';
import Shows from '../../api/music/shows';
import Songs from '../../api/music/songs';

Meteor.startup(() => {
  console.log("Is there anything in the database?");
  if (Shows.find().count() === 0) {
    console.log("No, it doesn't look like there is.");
    const identifier = "gd1982-10-10.sbd.miller.110628.flac24";
    const url = "https://archive.org/metadata/" + identifier;
    console.log("Time to start seeding...");

      console.log("Here we go...");
      var show
    HTTP.call('GET', url, {}, (error, res) =>  {
      if(!error){
        show = res.data
        var metaD = show.metadata;
        var sbd;
        // var SBD = metaD.filter( (i) => {return i.source.contains('SBD'||'sbd'||'soundboard'||'Soundboard')})
        // if (!SBD) {
        // sbd = false;
        // }else{
        //   sbd = true;
        // }
        var files = show.files;
        var mp3s = files.filter( (i) => { return i.name.endsWith('mp3') });
        var images = files.filter( (i) => { return i.name.endsWith('jpg' || 'jpeg') })
        Artists.insert({ name: 'Grateful Dead', collection: 'GratefulDead', });
        mp3s.forEach( (song) => {
          Songs.insert({ src: "http://www.archive.org/download/" + identifier + "/" + song.name,
              name: song.name ,
              title: song.title,
              creator: song.creator,
              track: song.track,
              album: song.album,
              bitrate: song.bitrate,
              length: song.length,
              image: images,
          });
        });
        console.log(metaD.identifier);
        Shows.insert({ identifier: metaD.identifier,
         title: metaD.title,
         creator: metaD.creator,
         description: metaD.description,
         date: metaD.date,
         year: metaD.year,
         addeddate: metaD.addeddate,
         uplaoder: metaD.uplaoder,
         venue: metaD.venue,
         coverage: metaD.coverage,
         taper: metaD.taper,
         transferer: metaD.transferer,
         runtime: metaD.runtime,
         notes: metaD.notes,
         source: metaD.source,
         sbd: sbd,
         songs: mp3s,
         updateddate: metaD.updateddate,
      });
      return console.log(show);
    }});
  }

});
