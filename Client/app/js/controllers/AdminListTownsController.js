adsApp.controller('AdminListTownsController', ['$scope', 'messaging', 'TownsResource',
    function ($scope, messaging, TownsResource) {
        $scope.requestParams = {startPage: 1, sortBy: 'Name'};
        $scope.categories = [];

        $scope.getListedItems = function (requestParams) {
            TownsResource.adminListTowns(requestParams)
                .then(
                function adminListTownsSuccess(adminListTownsData) {
                    $scope.towns = adminListTownsData.towns;
                    $scope.pagesArr = new Array(adminListTownsData.numPages);
                },
                function adminListTownsError(adminListTownsErr) {
                    console.log(adminListTownsErr);
                    messaging.errorMessage('Towns couldn\'t be loaded.');
                }
            )
        };

        $scope.getListedItems($scope.requestParams);

        $scope.sortBy = function sortBy(sortingParam) {
            var currentSort = $scope.requestParams.sortBy;
            if (currentSort) {
                if (currentSort.indexOf(sortingParam) > -1) {
                    if (currentSort[0] == '-') {
                        $scope.requestParams.sortBy = sortingParam;
                    } else {
                        $scope.requestParams.sortBy = '-' + sortingParam;
                    }
                } else {
                    $scope.requestParams.sortBy = sortingParam;
                }
            } else {
                $scope.requestParams.sortBy = sortingParam;
            }

            $scope.getListedItems($scope.requestParams);
        }

    }]);