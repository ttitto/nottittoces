adsApp.controller('AdminEditCategoryController', ['$scope', 'messaging', 'CategoriesResource', '$location', '$routeParams',
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

        $scope.editCategory = function editCategory(category, editCategoryForm) {
            if (editCategoryForm.$valid) {

                var categoryObj = {
                    id: category.id,
                    name: category.name
                };
                CategoriesResource.adminEditCategory(categoryObj)
                    .then(
                    function editCategorySuccess(editCategoryData) {
                        messaging.successMessage('New category was edited successfully.');
                        $location.path('/admin/categories/list');
                    },
                    function editCategoryError(editCategoryErr) {
                        messaging.errorMessage('The selected category couldn\'t be edited.');
                        console.log(editCategoryErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);