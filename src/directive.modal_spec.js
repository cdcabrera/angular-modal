
describe('Directive, Modal', function () {


    var sampleDirective = '<div data-modal="" data-show-modal="showmodal">Sample Modal</div>';


    var sampleScopeData = {

        showmodal: null
    };


    var injected = {

        element:        undefined,
        $compile:       undefined,
        $rootScope:     undefined,
        $document:      undefined
    };


    /**
     * load the modules
     */
    beforeEach(module('directives.modal'));


    /**
     * parse angular directive with sample scope data
     */
    beforeEach(testDirective.call(injected, sampleDirective, sampleScopeData));


    /**
     * check the HTML render
     */
    it('should render', function () {

        expect(injected.element.text()).toContain('Sample Modal');
    });


    /**
     * check to see if the CSS class "hide" has being added
     */
    it('should add a CSS class "hide"', function () {

        injected.$rootScope.showmodal = false;
        injected.$rootScope.$digest();

        expect(injected.element[0].querySelector('div.modal').className).toContain('hide');
    });


    /**
     * Generic compile and append for Angular Directive. Returns the injected properties and methods within an Object.
     * @param testHtml {String} The directive's HTML, not the template.
     * @param testData {Object} To be applied to the rootScope.
     * @returns {*}
     */
    function testDirective (testHtml, testData) {

        var injected = this;

        return inject(applyInjection);

        function applyInjection($injector) {

            var rootScope   = $injector.get('$rootScope'),
                compile     = $injector.get('$compile'),
                document    = $injector.get('$document'),
                element;

            rootScope = rootScope.$new();

            element = compile(testHtml)(rootScope);

            angular.extend(rootScope, testData);

            rootScope.$digest();

            document.find('body').append(injected.element);

            injected.$rootScope = rootScope;
            injected.$compile   = compile;
            injected.$document  = document;
            injected.element    = element;
        }
    }

});