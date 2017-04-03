import request from 'request';
import { Meteor } from 'meteor/meteor';
import { Artists } from '../../api/music/artists';
import { Shows } from '../../api/music/shows';
import { Songs } from '../../api/music/songs';

Meteor.startup(() => {
  if (Show.find().count() === 0) {
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
      getShow()
      console.time('DB_Seed');
      console.log('Seeding DB...');

      Artists.insert({ 'Grateful Dead' }, { 'GratefulDead' });
      Shows.insert({songs: mp3s},
                    ...metaD);
      mp3s.forEach( (i) => {
          Songs.insert({ src: "http://www.archive.org/download/" + identifier + "/" + i.name },
                      { images },
                        ...i);
  }
});
