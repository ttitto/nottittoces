adsApp.controller('AdminListCategoriesController', ['$scope', 'messaging', 'CategoriesResource',
    function ($scope, messaging, CategoriesResource) {
        $scope.requestParams = {startPage: 1, sortBy: 'Name'};
        $scope.categories = [];

        $scope.getListedItems = function (requestParams) {
            CategoriesResource.adminListCategories(requestParams)
                .then(
                function adminListCategoriesSuccess(adminListCategoriesData) {
                    $scope.categories = adminListCategoriesData.categories;
                    $scope.pagesArr = new Array(adminListCategoriesData.numPages);
                },
                function adminListCategoriesError(adminListCategoriesErr) {
                    console.log(adminListCategoriesErr);
                    messaging.errorMessage('Categories couldn\'t be loaded.');
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