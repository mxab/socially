Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  angular.module('socially', ['angular-meteor', 'ngMaterial']);

  angular.module("socially").controller("PartiesListCtrl", ['$scope', "$mdBottomSheet", "$q",'$meteor',
    function ($scope, $mdBottomSheet, $q,$meteor) {

      this.toggleList = function () {
        var pending = $mdBottomSheet.hide() || $q.when(true);

        pending.then(function () {
          $mdSidenav('left').toggle();
        });
      };
      $scope.parties =   $scope.parties = $meteor.collection(Parties);

    }])
    .config(function ($mdThemingProvider, $mdIconProvider) {

      $mdIconProvider
        .defaultIconSet("/assets/svg/avatars.svg", 128)
        .icon("menu", "/assets/svg/menu.svg", 24)
        .icon("share", "/assets/svg/share.svg", 24)
        .icon("google_plus", "/assets/svg/google_plus.svg", 512)
        .icon("hangouts", "/assets/svg/hangouts.svg", 512)
        .icon("twitter", "/assets/svg/twitter.svg", 512)
        .icon("phone", "/assets/svg/phone.svg", 512);

      $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');

    });

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {

      var parties = [
        {
          'name': 'Dubstep-Free Zone',
          'description': 'Can we please just for an evening not listen to dubstep.'
        },
        {
          'name': 'All dubstep all the time',
          'description': 'Get it on!'
        },
        {
          'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'
        }
      ];

      for (var i = 0; i < parties.length; i++)
        Parties.insert({
          name: parties[i].name,
          description: parties[i].description
        });

    }
  });
}