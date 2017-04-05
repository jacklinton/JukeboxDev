// Fill the DB with example data on startup
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import Artists from '../../api/music/artists';
import Shows from '../../api/music/shows';
import Songs from '../../api/music/songs';

Meteor.startup(() => {
  if (Shows.find().count() === 0) {
    const scrape = 'https://archive.org/services/search/v1/scrape?debug=false&xvar=production&total_only=false&count=10000&fields=identifier&q=';
    var collection = 'TeaLeafGreen';
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

              if (identifier.startsWith('tlg') || identifier.startsWith('TLG') || identifier.startsWith('TeaLeafGreen') ) {
                url = "https://archive.org/metadata/" + identifier;

              } else {
                return url='';
              }
            return url;
          });
        resolve(shows);
      });

    Shows.then((shows) => {
      console.log(shows);

          shows.forEach((url) => {

            var tune;

            HTTP.call('GET', url, async (error, res) => {
                  if(!error){
               tune = await res.data;
              // await  console.log(tune);
               var metaD = await tune['metadata'];
               console.log(tune);
                // var sbd = metaD.source.includes( 'SBD'||'sbd'||'soundboard'||'Soundboard' );
              var files = await tune.files;
              var mp3s = await files.filter( (i) => { return i.name.endsWith('mp3') });
              var images = await files.filter( (i) => { return i.name.endsWith('jpg' || 'jpeg') });

              await  mp3s.forEach( (song) => {
                    Songs.insert({ src: "http://www.archive.org/download/" + identifier + "/" + song.name,
                      name: song.name,
                      title: song.title,
                      creator: song.creator,
                      track: song.track,
                      album: song.album,
                      bitrate: song.bitrate,
                      length: song.length,
                      image: images,
                      metaD
                  })
                });
               };
            });
          });

      });
    });
  }});
