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
    describe('RSS Feeds', () => {
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has non-empty urls', () => {
            allFeeds.forEach(element => {
                expect(element).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        })

        it('has non-empty names', () => {
            allFeeds.forEach(element => {
                expect(element).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        })

    });

    describe('The menu', () => {

        it('is hidden by default', () => {
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

        it('it shows menu on first click and hides menu on 2nd click', () => {
            $(".menu-icon-link").click();
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            $(".menu-icon-link").click();
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', () => {

        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('should have at least one entry', (done) => {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        })


    });

    describe('New Feed Selection', () => {

        /*saves the text of first entry to compare that entries are changing*/
        var firstFeed;
        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = $(".feed .entry").first().text();
                loadFeed(1, () => {
                    done();
                });
            });
        });

        it('should have updated the feed list', (done) => {
            expect($(".feed .entry h2").first().text()).not.toBe(firstFeed);
            done();
        })
    });
}());
