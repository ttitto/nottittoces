"use strict";

adsApp.directive('browse', [function () {
    return{
        restrict: 'A',
        templateUrl: './app/templates/directives/browse.html',
        link: function (scope, element, attrs) {
            scope.toDataUrl = function (inputEl) {
                var file = inputEl.files[0];
                if (file.type.match(/image\/.*/)) {
                    var reader = new FileReader();

                    reader.onload = function () {
                        var base64Str = reader.result;
                        $(attrs.preview).attr('src', base64Str);
                        $('#base64-string').val(base64Str);

                        scope.getBase64(base64Str, attrs);
                    };
                    reader.readAsDataURL(file);
                } else {
                    $(attrs.preview).attr('alt', 'File type not supported!');
                }
            }
        }
    }
}]);
