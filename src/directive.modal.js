(function(window, angular, undefined) {

    'use strict';


    /**
     * Display modal.
     * @module directives.modal
     */
    angular
        .module('directives.modal', [])
        .directive('modal', [
            '$timeout',
            '$parse',
            function($timeout, $parse) {

                return {

                    restrict: 'AE',

                    replace: true,

                    transclude: true,

                    template: '<div>'+
                              '<div class="modal hide" aria-live="assertive" tabindex="-1" style="display:block;">'+
                              '<div class="modal-dialog">'+
                              '<div class="modal-content" ng-transclude></div>'+
                              '</div>'+
                              '</div>'+
                              '<div class="modal-backdrop fade in hide" tabindex="-1" style="display:block; position:fixed; top:0; left:0; right:0; bottom:0;"></div>'+
                              '</div>',

                    link: function (scope, element, attrs, ctrl, $transcludeFn) {


                        var modal       = angular.element(element[0].querySelector('.modal')),
                            dialog      = angular.element(element[0].querySelector('.modal-dialog')),
                            backdrop    = angular.element(element[0].querySelector('.modal-backdrop'));


                        /**
                         * Watch the binding through the "show-modal" attribute
                         */
                        scope.$watch(attrs.showModal, function (attrShowModal) {

                            if (attrShowModal) {

                                modal.removeClass('hide');
                                backdrop.removeClass('hide');

                                $timeout(function() {

                                    try {

                                        modal[0].focus();
                                    } catch (e) {}
                                });

                            } else {

                                modal.addClass('hide');
                                backdrop.addClass('hide');
                            }
                        });


                        /**
                         * Modal focus trap.
                         */
                        angular.element(window.document).on('focusin', function(event){

                            try {

                                if (!modal[0].contains(event.target)) {

                                    modal[0].focus();
                                }

                            } catch (e) {}
                        });


                        /**
                         * Modal key events
                         */
                        modal.on('keydown', function(event) {

                            switch (event.keyCode)
                            {
                                // escape and close the modal, per binding through "show-modal" attribute
                                case 27:

                                    scope.closeModal();
                                    break;
                            }
                        });


                        /**
                         * Modal click event
                         */
                        modal.on('click', function(event) {

                            if (!dialog[0].contains(event.target)) {

                                scope.closeModal();
                            }
                        });


                        /**
                         * Close modal
                         */
                        scope.closeModal = function() {

                            $parse(attrs.showModal).assign(scope, false);
                            scope.$digest();
                        };

                    }
                };
            }
        ]);

})(this, window.angular);