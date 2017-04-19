(function() {
  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#capture'),
      photo_image  = document.querySelector('#photo'),
      image        = document.querySelector('#image'),
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

    function takeBlob() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var image = canvas.toDataURL('image/png');

      var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
      var blob = base64ToBlob(base64ImageContent, 'image/png');
      var formData = new FormData();
      formData.append('image', blob);
      photo_image.setAttribute('src', image);

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

    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      console.info('snap4')
      photo.setAttribute('value', data);

      //Prepare data to be sent
      var data = canvas.toDataURL('image/png');
      var params = "image=" + data;

      //Initiate the request
      var httpRequest = new XMLHttpRequest();
      httpRequest.open('POST', '/camera', true);

      //Send proper headers
      httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      httpRequest.setRequestHeader("Content-length", params.length);
      httpRequest.setRequestHeader("Connection", "close");

      //Send your data
      httpRequest.send(params);
    }

    startbutton.addEventListener('click', function(ev){
        // takepicture();
        takeBlob();
      ev.preventDefault();
    }, false);
  }
})();
