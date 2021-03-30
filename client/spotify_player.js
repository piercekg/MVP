        const token = 'BQCRrPekmeqfVMUgafj2nz2djfFSeAjFYOJDZnRgng7yYX3B8vXT0alwfyB8Yu2e1bjKy8J8iAgP35qlF_XXB8y-qxqT-OVz6H_aad27ybR343YQLJZonAoQ_Tt_xj5G0SnT8afndUFuuw-C_xh5ptruc4nV6x4c';
    const player = new Spotify.Player({
      name: 'Stevie Nicks Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.8,
      spotify_uri: 'spotify:track:5fprEY6WEN1wvFXkgfb22C'
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    })

    const play = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken,
          id
        }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };

    play({
      playerInstance: new Spotify.Player({
          name: 'Stevie Nicks Player',
          getOAuthToken: cb => { cb(token); },
          id: '870474d0e3e2461d8551a0fd2d8348f3d7225f6e',
          volume: 0.8,
        }), spotify_uri: 'spotify:track:5fprEY6WEN1wvFXkgfb22C',
    });

<iframe id="sc-widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true"></iframe>
  <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
  <script type="text/javascript">
    (function(){
      var widgetIframe = document.getElementById('sc-widget'),
          widget       = SC.Widget(widgetIframe),
          newSoundUrl = 'https://api.soundcloud.com/tracks/13692671';

      widget.bind(SC.Widget.Events.READY, function() {
        // load new widget
        widget.bind(SC.Widget.Events.FINISH, function() {
          widget.load(newSoundUrl, {
            show_artwork: false
          });
        });
      });

    }());
  </script>