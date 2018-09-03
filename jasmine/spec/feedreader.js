/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has non-empty urls', function () {
            allFeeds.forEach(element => {
                expect(element).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        })

        it('has non-empty names', function () {
            allFeeds.forEach(element => {
                expect(element).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        })

    });

    describe('The menu', function () {

        it('is hidden by default', function () {
            expect(document.getElementsByTagName("body")[0].classList.contains("menu-hidden")).toBe(true);
        });

        it('it shows menu on first click and hides menu on 2nd click', function () {
            $(".menu-icon-link").click();
            expect(document.getElementsByTagName("body")[0].classList.contains("menu-hidden")).toBe(false);
            $(".menu-icon-link").click();
            expect(document.getElementsByTagName("body")[0].classList.contains("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('should have at least one entry', function (done) {
            expect($(".feed .entry")).toBeDefined();
            expect($(".feed .entry h2").first().text().length).not.toBe(0);
            done();
        })


    });

    describe('New Feed Selection', function () {

        /*saves the text of first entry to compare that entries are changing*/
        var firstFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $(".feed .entry h2").first().text();
                loadFeed(1, function () {
                    done();
                });
            });
        });

        it('should have updated the feed list', function (done) {
            expect($(".feed .entry h2").first().text()).not.toBe(firstFeed);
            done();
        })
    });
}());
