jQuery(function ($) {
  var url = location.pathname + location.search;

  $('#sidebar, .js-sidebar').each(function (i, sidebar) {
    $(sidebar).find('ul a').filter('[href="' + url + '"]').removeClass('selected').filter(':eq(0)').addClass('selected');
  });
});

jQuery(function ($) {
  $('<span id="gotobottom">').appendTo('body');

  var toBottom = $('<a class="gotobottom" title="Nach unten" href="#gotobottom">Nach unten</a>');
  $('a.gototop').attr('title', 'Nach oben').after(toBottom);

});

jQuery(function ($) {

  var projectTitle = $.trim($('h1 .current-project').text());
  var pageTitle = $.trim(document.title).replace(new RegExp('- ' + projectTitle + '.*'), '');
  var breadcrumb = $('p.breadcrumb');

  $('<span class="page-title">').html(pageTitle).appendTo(breadcrumb);
  $('<span class="separator">').html('»').appendTo(breadcrumb);
});

jQuery(function ($) {

  var fetchToken = function (fn) {
    $.ajax({
      url: '/my/api_key',
      dataType: 'text',
      success: function (text) {
        var token = /<pre>(.*?)<\/pre>/.exec(text);

        if (!token) {
          console.log('Could not collect api key!');

          return;
        }

        fn(token[1]);
      }
    });
  };

  var useToken = function (fn) {
    var storageKey = 'redmine_api_token';
    var tokenData = sessionStorage.getItem(storageKey);
    var now = new Date().getTime();

    if (tokenData) {
      tokenData = JSON.parse(tokenData);
    }

    if (tokenData && tokenData.updatedAt + 10000 > now) {
      fn(tokenData.token);
    } else {
      sessionStorage.setItem(storageKey, null);

      fetchToken(function (token) {
        var json = JSON.stringify({
          token: token,
          updatedAt: now
        });

        sessionStorage.setItem(storageKey, json);

        fn(token);
      });
    }
  };

  var useApi = function (url, fn) {
    useToken(function (token) {
      $.ajax({
        url: url,
        dataType: 'json',
        beforeSend: function (xhr) {
          var auth = btoa(token + ':x');

          xhr.setRequestHeader('Authorization', 'Basic ' + auth);
        },
        success: function (data) {
          fn(data);
        }
      });
    });
  };

  var getCurrentIssueId = function () {
    var action = $('#issue-form.edit_issue').attr('action');

    if (!action) {
      return null;
    }

    return /\d+/.exec(action)[0];
  };

  var getCurrentWikiUrl = function () {
    var href = $('#main-menu, .js-project-menu').find('a.wiki').attr('href');

    if (!href) {
      return null;
    }

    return href;
  };

  var getCurrentIssueIdsForWiki = function () {
    var content = document.title + ' ' + $('h1, h2').text();
    var ids = {};

    content.replace(/#(\d+)/g, function (m, id) {
      ids[id] = id;
    });

    return Object.keys(ids);
  };

  var isOnWiki = function () {
    return $('#main-menu, .js-project-menu').find('a.wiki').is('.selected');
  };

  var issueId = getCurrentIssueId();
  var wikiUrl = getCurrentWikiUrl();
  var issueIdsForWiki = getCurrentIssueIdsForWiki();

  var crossLinks = null;

  var addCrossLink = function (page, baseUrl) {
    if (!crossLinks) {
      crossLinks = $('<nav class="cross-links">').appendTo('body');
    }

    var title = page.title.replace(/_/g, ' ');
    var prefix = page.labelPrefix ? '<strong class="label-prefix">' + page.labelPrefix + '</strong>' : '';

    $('<a class="cross-link">').html(prefix + page.label).attr({
      href: baseUrl + '/' + encodeURIComponent(page.id),
      title: title
    }).addClass('type-' + (page.type || 'book')).appendTo(crossLinks);
  };

  if (issueId && wikiUrl) {
    useApi(wikiUrl + '/index.json', function (data) {
      $.each(data.wiki_pages, function (i, page) {

        if (page.title.indexOf('#' + issueId) > -1) {

          var link = Object.assign({
            id: page.title,
            label: page.title.replace(/_/g, ' '),
            labelPrefix: 'Briefing '
          }, page);

          addCrossLink(link, wikiUrl);
        }
      });
    });
  }

  if (issueIdsForWiki.length && isOnWiki()) {
    $.each(issueIdsForWiki, function (i, id) {
      addCrossLink({
        title: 'Ticket #' + id,
        id: id,
        label: '#' + id,
        labelPrefix: 'Ticket ',
        type: 'ticket'
      }, '/issues');
    });
  }
});

jQuery(function ($) {
  $('.wiki-page + .collapsible.collapsed').removeClass('collapsed');
});

jQuery(function ($) {
  $('code:not(:has(*))').each(function (i, code) {
    code = $(code);

    code.attr({
      'data-label-copied': 'Inhalt wurde in die Zwischenablage kopiert!',
      'data-label-to-copy': 'In die Zwischenablage kopieren',
      'data-clipboard-action': 'copy',
    });
    code.addClass('has-clipboard-copy');

    code.one('mouseover.mtoCopy focus.mtoCopy', function () {
      code.off('.mtoCopy');
      code.attr({
        'data-clipboard-text': code.text(),
      });
      setClipboardJS(code.get(0));
      code.on('click', function () {
        code.addClass('was-copied');

        setTimeout(function () {
          code.removeClass('was-copied');
        }, 1000);
      });
    });
  });
});
