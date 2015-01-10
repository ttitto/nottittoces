adsApp.controller('AdminListUsersController', ['$scope', 'messaging', 'UserResource',
    function ($scope, messaging, UserResource) {
        $scope.requestParams = {startPage: 1};
        $scope.users = [];

        $scope.getListedItems = function (requestParams) {
            UserResource.adminListUsers(requestParams)
                .then(
                function adminListUsersSuccess(adminListUsersData) {
                    $scope.users = adminListUsersData.users;
                    $scope.pagesArr = new Array(adminListUsersData.numPages);
                },
                function adminListUsersError(adminListUsersErr) {
                    console.log(adminListUsersErr);
                    messaging.errorMessage('Users couldn\'t be loaded.');
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