adsApp.controller('AdminDeleteCategoryController', ['$scope', 'messaging', 'CategoriesResource', '$location', '$routeParams',
    function ($scope, messaging, CategoriesResource, $location, $routeParams) {
        $scope.category = {};

        CategoriesResource.getById($routeParams.id)
            .then(
            function getCategoryByIdSuccess(getCategoryByIdData) {
                $scope.category = getCategoryByIdData;
            },
            function getCategoryByIdError(getCategoryByIdErr) {
                console.log(getCategoryByIdErr);
                messaging.errorMessage('The selected category couldn\'t be downloaded from the server.');
            }
        );

        $scope.deleteCategory = function deleteCategory(category, deleteCategoryForm) {
            if (deleteCategoryForm.$valid) {
                CategoriesResource.adminDeleteCategory(category)
                    .then(
                    function deleteCategorySuccess(deleteCategoryData) {
                        messaging.successMessage('The category was deleted successfully.');
                        $location.path('/admin/categories/list');
                    },
                    function deleteCategoryError(deleteCategoryErr) {
                        messaging.errorMessage('The selected category couldn\'t be deleted.');
                        console.log(deleteCategoryErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);