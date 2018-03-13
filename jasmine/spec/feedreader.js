/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    function checkAllfeeds(name) {
       // 将相似的代码都移入到该方法中，避免重复编写相同代码。
        allFeeds.forEach(function (feeds) {
            if(name === 'url'){
                var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
                expect(feeds.url).toMatch(regularExpressionUrl);
            }
            expect(feeds.url).toBeDefined();
            expect(feeds.url).not.toBe('');
        })

    }
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('url exist and not none', function () {
            checkAllfeeds('url');
        });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('name exist and not none', function () {
            checkAllfeeds('name');
        });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function() {
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
        /*
         * class 为 menu-hidden时菜单是隐藏的，因此只需要找到存在menu-hidden的class name
         * 就代表菜单是默认隐藏的。
         */
        it('menu hidden default', function () {
            var hiddenClass = document.getElementsByClassName('menu-hidden');
            expect(hiddenClass.length).not.toBe(0);
        });

        /* TODO:
         * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
         * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
         * 再次点击的时候是否隐藏。
         */

        it('menu state', function () {
            var hiddenClass = document.getElementsByClassName('menu-hidden');
            // 一个expect测试显示和隐藏逻辑
            expect(menuState).toBeDefined();
            expect(hiddenClass.length === 0).toBe(menuState);
        });
    });


    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function() {
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('after loadFeed function', function () {
            var entriesClass = document.getElementsByClassName('entry');
            expect(entriesClass.length).not.toBe(0);
        });
    });



    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function() {
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */
        var flag = false;
        beforeEach(function (done) {
            loadFeed(1, function () {
                flag = true;
                done();
            });
        });
        it('change feed selection', function () {
            expect(flag).toBe(true);
        });
    });

}());
