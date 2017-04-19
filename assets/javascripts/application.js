(function() {
  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo_image  = document.querySelector('#photo'),
      preview      = document.querySelector('#preview'),
      startbutton  = document.querySelector('#shutter'),
      width = 320,
      height = 0;

  function base64ToBlob(base64, mime) {
      mime = mime || '';
      var sliceSize = 1024;
      var byteChars = window.atob(base64);
      var byteArrays = [];

      for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          var slice = byteChars.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, {type: mime});
  }

  if (video) {
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      { video: true, audio: false },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    $(document).on("click", '#cancel-link', function(e){
      e.preventDefault();
      $(video).show();
      $(canvas).hide();
    })

    function takePicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var image = canvas.toDataURL('image/png');

      var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
      var blob = base64ToBlob(base64ImageContent, 'image/png');
      var formData = new FormData();
      formData.append('image', blob);
      preview.setAttribute('src', image);
      $(video).hide();
      $(canvas).show();

      $.ajax({
          url: "/camera",
          type: "POST",
          cache: false,
          contentType: false,
          processData: false,
          data: formData })
              .done(function(e){
                  console.info('done');
              });
    }

    startbutton.addEventListener('click', function(ev){
        // takepicture();
        takePicture();
      ev.preventDefault();
    }, false);
  }
})();
