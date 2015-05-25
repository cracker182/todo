/**
 * Created by DEV on 25.05.2015.
 */
(function (exports) {
    'use strict';

    var STORAGE_KEY = 'todo_storage';

    exports.todosStorage = {
        fetch: function() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save: function (tasks) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }
})(window)