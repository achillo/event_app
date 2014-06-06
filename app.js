var app = angular.module('eventApp', ['ngGrid']);

app.controller('MainCtrl', function ($scope, EventService, $filter) {

    /**
     *
     */
    var getAll = function () {
        $scope.busy = true;
        EventService.all().then(function (data) {
            $scope.myData = data;
            $scope.busy = false;
        }, function (err) {
            $scope.myData = null;
            $scope.busy = false;
        });
    };

    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '35%'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '120px'},
            {field: 'venue.name', displayName: 'Venue', width: '25%'},
            {field: 'venue.city', displayName: 'City', width: '150px'},
            {field: 'venue.state', displayName: 'State', width: '50px'},
            {field: 'venue.id', displayName: 'Action'}

        ]
    };

    $scope.tabs = [
        {
            title: 'All Events',
            url: 'all.html'
        },
        {
            title: 'Upcoming Events',
            url: 'upcoming.html'
        },
        {
            title: 'Local Events',
            url: 'local.html'
        }
    ];

    /** The active tab on load */
    $scope.currentTab = 'all.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;

        //If data no loaded for selected tab, get it now...
    };

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    };


    var initialize = function () {
        $scope.busy = false;
        getAll();
    };

    //Initialize the controller on app load:
    initialize();

});
