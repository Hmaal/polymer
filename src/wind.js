/* 
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function() {
  
  // imports
  
  var log = window.logFlags || {};
  
  function windBindings(preventCascade) {
    log.wind && console.log('windBindings', this.localName);
    if (this.__isUnbound) {
      console.warn(this.localName, 
        'has deactivated bindings, cannot windBindings');
      return;
    }
    if (this.unwindJob) {
      this.unwindJob.stop();
      this.unwindJob = null;
    }
    // wind our shadow tree iff we're not in the process of cascading
    // our tree (as we do, for example, when the element is inserted).
    if (!preventCascade) {
      Polymer.forSubtree(this.webkitShadowRoot, function(n) {
        if (n.windBindings) {
          n.windBindings();
          return true;
        }
      });
    }
  }
  
  function unwindBindings() {
    if (!this.__isUnbound) {
      log.wind && console.log('unwindBindings', this.localName);
      this.unwindJob = this.job(this.unwindJob, this.unbindAll);
    }
  }
  
  // exports
  Polymer.windBindings = windBindings;
  Polymer.unwindBindings = unwindBindings;
})();

