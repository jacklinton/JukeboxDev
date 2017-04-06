// Fill the DB with example data on startup
import { EJSON } from 'meteor/ejson';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import Artists from '../../api/music/artists';
import Shows from '../../api/music/shows';
import Songs from '../../api/music/songs';

Meteor.startup(() => {
  if (Shows.find().count() === 0) {
    const scrape = 'https://archive.org/services/search/v1/scrape?debug=false&xvar=production&total_only=false&count=10000&sorts=identifier%20desc&fields=identifier&q=';
    var collection = 'SoundTribeSector9';
    var scraper = scrape + collection;
    var identifier;
    var Item = new Promise((resolve, reject) => {
      HTTP.call('GET', scraper, {}, (er, res) => {
        resolve(res.data.items);
      });
    });

    Item.then((items) => {
      var Shows = new Promise((resolve, reject) => {
          var shows = items.map( (item) => {
            identifier = item.identifier;
            let url;

              if (identifier.startsWith('sts') || identifier.startsWith('SoundTribe') || identifier.startsWith('STS')/* || identifier.startsWith('tDB')|| identifier.startsWith('discob') || identifier.startsWith('discobiscuits')*/) {
                url = "https://archive.org/metadata/" + identifier;
                return url;
              } else {
                return "https://archive.org/metadata/";
              }

          });
        resolve(shows);
      });

    Shows.then((shows) => {
      console.log(shows);

      shows.forEach((url) => {

            var tune;
            HTTP.call('GET', url, async (error, res) => {
              tune = await res.data;
              show = await EJSON.fromJSONValue(tune)

              var metaD = await show.metadata;
              var sbd = await metaD.source.includes( 'SBD'||'sbd'||'soundboard'||'Soundboard' );
              var files = await tune.files;
              var mp3s = await files.filter( (i) => { return i.name.endsWith('mp3') });
              var images = await files.filter( (i) => { return i.name.endsWith('jpg') || i.name.endsWith('jpeg') });

              await mp3s.forEach((song) => {
                    Songs.insert({ src: "http://www.archive.org/download/" + identifier + "/" + song.name,
                      name: song.name,
                      title: song.title,
                      creator: song.creator,
                      track: song.track,
                      album: song.album,
                      bitrate: song.bitrate,
                      length: song.length,
                      image: images,
                      sbd: sbd,
                      metadata: metaD,
                  })
                });
          // HTTP.call('GET', url, async (error, res) => {
          //   tune = await res.data;
          //   show = await EJSON.fromJSONValue(tune)
          //   var metaD = await show.metadata;
          //   await Shows.insert({identifier: metaD.identifier,
          //        title: metaD.title,
          //        name: metaD.name,
          //        creator: metaD.creator,
          //        description: metaD.description,
          //        date: metaD.date,
          //        year: metaD.year,
          //        addeddate: metaD.addeddate,
          //        uploader: metaD.uploader,
          //        venue: metaD.venue,
          //        coverage: metaD.coverage,
          //        taper: metaD.taper,
          //        transferer: metaD.transferer,
          //        runtime: metaD.runtime,
          //        notes: metaD.notes,
          //        source: metaD.source,
          //        sbd: sbd,
          //        songs:[mp3s.forEach((mp3) => {
          //          mp3.name,
          //          mp3.title,
          //          mp3.track,
          //          mp3.album,
          //          mp3.length
          //        })],
          //        updateddate: metaD.updateddate,
          //     })
          //   });
          });
          console.log("DONE");
        });
      });
    });
}});
