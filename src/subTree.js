/* 
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function() {
  
  function findAll(node, find, data) {
    var e = node.firstElementChild;
    if (!e) {
      e = node.firstChild;
      while (e && e.nodeType !== Node.ELEMENT_NODE) {
        e = e.nextSibling;
      }
    }
    while (e) {
      if (find(e, data) !== true) {
        findAll(e, find, data);
      }
      e = e.nextElementSibling;
    }
    return null;
  }

  // walk the subtree rooted at node, including descent into shadow-roots, 
  // applying 'cb' to each element
  function forSubtree(node, cb) {
    if (!node) {
      return;
    }
    //logFlags.dom && node.childNodes && node.childNodes.length && console.group('subTree: ', node);
    findAll(node, function(e) {
      if (cb(e)) {
        return true;
      }
      if (e.webkitShadowRoot) {
        forSubtree(e.webkitShadowRoot, cb);
      }
      if (e.olderShadowRoot) {
        forSubtree(e.olderShadowRoot, cb);
      }
    });
    if (node.webkitShadowRoot) {
      forSubtree(node.webkitShadowRoot, cb);
    }
    //logFlags.dom && node.childNodes && node.childNodes.length && console.groupEnd();
  }
  
  // exports
  Polymer.forSubtree = forSubtree;
})();

