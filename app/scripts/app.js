'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Website', ['ionic', 'config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}).controller('MainCtrl', function ($scope, $ionicModal, $state, $ionicLoading) {
  $scope.invite = {
        name:"",
        email:"",
        zipcode:""
  };
    $ionicModal.fromTemplateUrl('login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.getInvite = function () {
      var invite = $scope.invite;
      if(!invite.email || !invite.email.length){
        alert("invalid email");
      }
      else if(!invite.name || invite.name.trim().length<2){
        alert("invalid name");
      }
      else if(!/(^\d{5}$)/.test(invite.zipcode)){
        alert("invalid zipcode");
      }
      else{
        var InviteRequest = Parse.Object.extend("InviteRequest");
        var inviteReq = new InviteRequest();
        inviteReq.save(invite).then(function(object) {
          $ionicLoading.show({ template: 'We got your invite request! You will hear from us soon!', duration: 5000 });
          $scope.modal.hide();
        });
      }
    }
  });

Parse.initialize("LaxhuAA5aa4vMQ7SfNfDchfXgMETj2xVl3tGoMWC", "ajYR5N3u2d1G4f5bZ52HBJwFCZRyJ4S3CNLAk5Il");
