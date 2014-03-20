/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        console.log('Device is ready');
        $('#add-photo').on('touchend', app.addPhoto);
        console.log('Touch listener added.');
    },
    addPhoto: function () {
        console.log('Add photo triggered.');
        navigator.camera.getPicture(function cameraSuccess(fileURI) {
            console.log('getPicture success:', fileURI);
            $('#show-image').attr('src', fileURI);
            app.uploadPhotoToSeelio(fileURI);
        }, function cameraError(message) {
            console.log(message);
        }, { destinationType: navigator.camera.DestinationType.FILE_URI });
    },
    uploadPhotoToSeelio: function (fileURI) {
        var apiHost = 'http://10.0.2.2:7754';
        var apiKey = encodeURIComponent('l5GufyCpYPaRoQB4wzZXeP+jZj6sT83b');
        var workId = '5318ceebb61b818430000049';
        var requestUrl = apiHost + '/v1/works/' + workId + '/attachments?api_key=' + apiKey;
        console.log('Posting request to:', requestUrl);

        var win = function (r) {
            console.log('Response received:', r);
        };
        var fail = function (err) {
            console.error(err);
        };

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI(requestUrl), win, fail, options);
    }
    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};