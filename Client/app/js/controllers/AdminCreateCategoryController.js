adsApp.controller('AdminCreateCategoryController', ['$scope', 'messaging', 'CategoriesResource', '$location',
    function ($scope, messaging, CategoriesResource, $location) {
        $scope.createCategory = function createCategory(category, createCategoryForm) {
            if (createCategoryForm.$valid) {
                CategoriesResource.adminCreateCategory(category)
                    .then(
                    function createCategorySuccess(createCategoryData) {
                        messaging.successMessage('New category was created successfully.')
                        $location.path('/admin/categories/list');
                    },
                    function createCategoryError(createCategoryErr) {
                        messaging.errorMessage(' The new category couldn\'t be created.');
                        console.log(createCategoryErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);