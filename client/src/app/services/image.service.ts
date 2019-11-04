export default class ImageService {

  constructor() { }

  compress(source_img_file, quality, output_format) {
    var img = document.createElement('img')
    img.src = source_img_file.image_source;

    var mime_type;
    if (output_format === "png") {
      mime_type = "image/png";
    } else if (output_format === "webp") {
      mime_type = "image/webp";
    } else {
      mime_type = "image/jpeg";
    }
  
    var cvs = document.createElement('canvas');
    // cvs.width = img.naturalWidth;
    // cvs.height = img.naturalHeight;
    var ctx = cvs.getContext("2d").drawImage(img, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality / 100);
    // var result_image_obj = new Image();
    // result_image_obj.src = newImageData;
    // return result_image_obj;
    var byteString = atob(newImageData.split(',')[1]);
    var mimeString = newImageData.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
    // return newImageData
  }

  upload(compressed_img_obj, upload_url, file_input_name, filename, successCallback, errorCallback, duringCallback, customHeaders) {
  
    if (XMLHttpRequest.prototype.sendAsBinary === undefined) {
      XMLHttpRequest.prototype.sendAsBinary = function (string) {
        var bytes = Array.prototype.map.call(string, function (c) {
          return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
      };
    }
  
    var type;
    if (filename.substr(-4).toLowerCase() === ".png") {
      type = "image/png";
    } else if (filename.substr(-5).toLowerCase() === ".webp") {
      type = "image/webp";
    } else {
      type = "image/jpeg";
    }
  
    var data = compressed_img_obj.src;
    data = data.replace('data:' + type + ';base64,', '');
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url, true);
    var boundary = 'someboundary';
  
    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
  
    // Set custom request headers if customHeaders parameter is provided
    if (customHeaders && typeof customHeaders === "object") {
      for (var headerKey in customHeaders) {
        xhr.setRequestHeader(headerKey, customHeaders[headerKey]);
      }
    }
  
    // If a duringCallback function is set as a parameter, call that to notify about the upload progress
    if (duringCallback && duringCallback instanceof Function) {
      xhr.upload.onprogress = function (evt) {
        if (evt.lengthComputable) {
          duringCallback((evt.loaded / evt.total) * 100);
        }
      };
    }
  
    xhr.sendAsBinary(['--' + boundary, 'Content-Disposition: form-data; name="' + file_input_name + '"; filename="' + filename + '"', 'Content-Type: ' + type, '', atob(data), '--' + boundary + '--'].join('\r\n'));
  
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          successCallback(this.responseText);
        } else if (this.status >= 400) {
          if (errorCallback && errorCallback instanceof Function) {
            errorCallback(this.responseText);
          }
        }
      }
    }
  }

  errorCallback() {
    console.log('Error during image upload')
  }

  successCallback() {
    console.log('Image Uploaded successfully!')
  }

  duringCallback() {
    console.log('Image being uploaded now.')
  }
}
