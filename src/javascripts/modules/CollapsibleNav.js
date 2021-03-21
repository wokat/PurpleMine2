jQuery(function ($) {

  var storage = localStorage;

  var loadSettings = function () {
    var settings = storage.getItem('collapsibleNav') || '{}';
    settings = JSON.parse(settings);

    return settings;
  };

  var saveSettings = function (settings) {
    storage.setItem('collapsibleNav', JSON.stringify(settings));
  }

  var isExpanded = function (el) {
    var settings = loadSettings();
    var key = getKey(el);

    return Boolean(settings[key]);
  };

  var getKey = function (el) {
    el = $(el);
    var link = el.closest('li').children('a:first');

    if (!link.length) {
      return null;
    }

    var idPrefix = el.closest('[id]').attr('id') || 'no_id';

    var key = link.attr('href');
    key = idPrefix + '_' + key;

    return key;
  };

  var toggleItemState = function (el) {
    el = $(el);
    var link = el.closest('li').children('a:first');

    if (!link.length) {
      return false;
    }

    var key = getKey(el);
    var settings = loadSettings();
    settings[key] = !settings[key];
    saveSettings(settings);

    return settings[key];
  };

  var toggleNav = function (button, nav) {
    var state = toggleItemState(button);
    button.toggleClass('is-expanded', state);
    button.blur();
  };

  $('.collapsible-nav .pages-hierarchy').each(function (i, nav) {
    nav = $(nav);

    var button = $('<button class="toggle-list">')
    button.insertBefore(nav);
    button.parent('li').addClass('is-toggling');

    if (isExpanded(button)) {
      button.addClass('is-expanded');
    }

    button.on('click', function () {
      toggleNav($(this), nav);
    });
  });
});
