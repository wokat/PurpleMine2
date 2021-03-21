jQuery(function ($) {

  if (!window.jsToolBar) {
    return;
  }

  PurpleMine.hlLanguages = 'apache,conf,console,csharp,css,diff,html,ini,java,javascript,less,markdown,mustache,nginx,php,plaintext,python,ruby,scss,shell,smarty,sql,vb,xml,yaml'.split(',');

  var patchedBody = String(jsToolBar.prototype.precodeMenu).replace(/var\s+hlLanguages\s+=[^;]+/, 'var hlLanguages = window.PurpleMine.hlLanguages');
  patchedBody = patchedBody.replace(/^[\s\r\n]*function[^{]+\{|\}[\s\r\n]*$/g, '');

  jsToolBar.prototype.precodeMenu = new Function('fn', patchedBody);
});
