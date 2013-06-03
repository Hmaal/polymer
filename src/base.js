/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

/**
 * @module Polymer
 */

/**
 * Base methods for Polymer elements.
 * @class Base
 */

(function(scope) {

  // imports

  var log = window.logFlags || {};

  var base = {
    /**
     * When called in a method, invoke the method's super.
     * @method super
     * @param {Array} Array of arguments.
     */
    super: $super,
    /**
     * True if this object is a Polymer element.
     * @property isPolymerElement
     * @type boolean
     */
    isPolymerElement: true,
    /**
     * MDV bind.
     * @method bind
     */
    bind: function() {
      Polymer.bind.apply(this, arguments);
    },
    /**
     * MDV unbind.
     * @method unbind
     */
    unbind: function() {
      Polymer.unbind.apply(this, arguments);
    },
    /**
     * MDV unbindAll.
     * @method unbindAll
     */
    unbindAll: function() {
      Polymer.unbindAll.apply(this, arguments);
    },
    /**
     * Ensures MDV bindings remain active.
     * Typically, it's not necessary to call this method. Polymer
     * automatically manages binding state when elements are inserted
     * and removed from the document. 
     * 
     * However, if an element is created and not inserted into the document, 
     * windBindings should be called to ensure bindings remain active. 
     * Otherwise bindings will deactivate asynchronously so that the element 
     * may be garbage collected. Please note that if windBindings is called
     * manually and the element is never inserted into the document, then 
     * unwindBindings must be called to dispose of the element.
     * 
     * @method windBindings
     * @param {Boolean} [preventCascade] If true, windBindings will not cascade
     * to call windBindings on shadowRoot children. In the case described above,
     * and in general in application code, this should not be set to true.
     */
    windBindings: function(preventCascade) {
      Polymer.windBindings.apply(this, arguments);
    },
    /**
     * Schedules MDV bindings to asynchronously become inactive.
     *
     * Typically, it's not necessary to call this method. Polymer
     * automatically manages binding state when elements are inserted
     * and removed from the document. 
     * 
     * Only when an element is created and not inserted into the document
     * is it necessary to call windBindings so bindings are not removed. It's
     * only in this case that unwindBindings need be called so that the element
     * may be disposed of when its no longer needed.
     * @method unwindBindings
     */
    unwindBindings: function() {
      Polymer.unwindBindings.apply(this, arguments);
    },
    /**
     * Schedules an async job with timeout and returns a handle.
     * @method job
     * @param {Polymer.Job} [job] A job handle if re-registering.
     * @param {Function} callback Function to invoke.
     * @param {number} [wait] Timeout in milliseconds.
     * @return {Polymer.Job} A job handle which can be used to
     *     re-register, cancel or complete a job.
     */
    job: function() {
      return Polymer.job.apply(this, arguments);
    },
    /**
     * Invokes a function asynchronously. The context of the callback
     * function is bound to 'this' automatically.
     * @method asyncMethod
     * @param {Function} method
     * @param {Object|Array} args
     * @param {number} timeout
     */
    asyncMethod: function(inMethod, inArgs, inTimeout) {
      var args = (inArgs && inArgs.length) ? inArgs : [inArgs];
      var fn = function() {
        (this[inMethod] || inMethod).apply(this, args);
      }.bind(this);
      return inTimeout ? window.setTimeout(fn, inTimeout) :
        requestAnimationFrame(fn);
    },
    /**
     * Invoke a method.
     * @method dispatch
     * @param {string} methodName A method name.
     * @param {Array} arguments
     */
    dispatch: function(inMethodName, inArguments) {
      if (this[inMethodName]) {
        this[inMethodName].apply(this, inArguments);
      }
    },
    /**
     * Fire an event.
     * @method fire
     * @param {string} type An event name.
     * @param detail
     * @param {Node} toNode Target node.
     */
    fire: function(inType, inDetail, inToNode) {
      var node = inToNode || this;
      log.events && console.log('[%s]: sending [%s]', node.localName, inType);
      node.dispatchEvent(
          new CustomEvent(inType, {bubbles: true, detail: inDetail}));
      return inDetail;
    },
    /**
     * Fire an event asynchronously.
     * @method asyncFire
     * @param {string} type An event name.
     * @param detail
     * @param {Node} toNode Target node.
     */
    asyncFire: function(/*inType, inDetail*/) {
      this.asyncMethod("fire", arguments);
    },
    /**
     * Remove class from old, add class to anew, if they exist
     * @param classFollows
     * @param anew A node.
     * @param old A node
     * @param className
     */
    classFollows: function(anew, old, className) {
      if (old) {
        old.classList.remove(className);
      }
      if (anew) {
        anew.classList.add(className);
      }
    }
  };
 
  // TODO(sjmiles): backward-compat for deprecated syntax
  
  base.send = base.fire;
  base.asend = base.asyncFire;
  
  // exports
  
  scope.base = base;
  
})(window.Polymer);
