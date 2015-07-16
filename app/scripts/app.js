'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Website', ['ionic', 'config'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }).controller('MainCtrl', function ($scope, $ionicModal, $state, $ionicLoading) {
    $scope.isPhone = window.ionic.Platform.isIOS() || window.ionic.Platform.isAndroid() || window.ionic.Platform.isWindowsPhone();
    $scope.invite = {
      name: '',
      email: '',
      zipcode: '',
      chef: false
    };
    $ionicModal.fromTemplateUrl('login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.getInvite = function () {
      var invite = $scope.invite;
      $ionicLoading.show({
        template: 'Sending invite...'
      });
      var InviteRequest = window.Parse.Object.extend('InviteRequest');
      var inviteReq = new InviteRequest();
      var fnSuccess = function () {
        $ionicLoading.show({template: 'We got your invite request! You will hear from us soon!', duration: 4000});
        $scope.modal.hide();
      };
      var fnFail = function () {
        $ionicLoading.show({template: 'Oups! Something went wrong...please try again', duration: 3000});
      };
      inviteReq.save(invite).then(fnSuccess, function (error) {
        try {
          var er = JSON.parse(error.message);
          if (er.status === 200) {
            fnSuccess();
          }
          else {
            fnFail();
          }
        }
        catch (e) {
          fnFail();
        }
      });
    };
  });

window.Parse.initialize('LaxhuAA5aa4vMQ7SfNfDchfXgMETj2xVl3tGoMWC', 'ajYR5N3u2d1G4f5bZ52HBJwFCZRyJ4S3CNLAk5Il');
