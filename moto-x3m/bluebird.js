/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.3.4
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
 */
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Promise = t()
    }
}(function() {
    var t, e, n;
    return function r(t, e, n) {
        function i(s, a) {
            if (!e[s]) {
                if (!t[s]) {
                    var c = "function" == typeof _dereq_ && _dereq_;
                    if (!a && c) return c(s, !0);
                    if (o) return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = e[s] = {
                    exports: {}
                };
                t[s][0].call(u.exports, function(e) {
                    var n = t[s][1][e];
                    return i(n ? n : e)
                }, u, u.exports, r, t, e, n)
            }
            return e[s].exports
        }
        for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < n.length; s++) i(n[s]);
        return i
    }({
        1: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                function e(t) {
                    var e = new n(t),
                        r = e.promise();
                    return e.setHowMany(1), e.setUnwrap(), e.init(), r
                }
                var n = t._SomePromiseArray;
                t.any = function(t) {
                    return e(t)
                }, t.prototype.any = function() {
                    return e(this)
                }
            }
        }, {}],
        2: [function(t, e, n) {
            "use strict";

            function r() {
                this._isTickUsed = !1, this._lateQueue = new u(16), this._normalQueue = new u(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
                var t = this;
                this.drainQueues = function() {
                    t._drainQueues()
                }, this._schedule = l
            }

            function i(t, e, n) {
                this._lateQueue.push(t, e, n), this._queueTick()
            }

            function o(t, e, n) {
                this._normalQueue.push(t, e, n), this._queueTick()
            }

            function s(t) {
                this._normalQueue._pushOne(t), this._queueTick()
            }
            var a;
            try {
                throw new Error
            } catch (c) {
                a = c
            }
            var l = t("./schedule"),
                u = t("./queue"),
                p = t("./util");
            r.prototype.enableTrampoline = function() {
                this._trampolineEnabled = !0
            }, r.prototype.disableTrampolineIfNecessary = function() {
                p.hasDevTools && (this._trampolineEnabled = !1)
            }, r.prototype.haveItemsQueued = function() {
                return this._isTickUsed || this._haveDrainedQueues
            }, r.prototype.fatalError = function(t, e) {
                e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t)
            }, r.prototype.throwLater = function(t, e) {
                if (1 === arguments.length && (e = t, t = function() {
                        throw e
                    }), "undefined" != typeof setTimeout) setTimeout(function() {
                    t(e)
                }, 0);
                else try {
                    this._schedule(function() {
                        t(e)
                    })
                } catch (n) {
                    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                }
            }, p.hasDevTools ? (r.prototype.invokeLater = function(t, e, n) {
                this._trampolineEnabled ? i.call(this, t, e, n) : this._schedule(function() {
                    setTimeout(function() {
                        t.call(e, n)
                    }, 100)
                })
            }, r.prototype.invoke = function(t, e, n) {
                this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function() {
                    t.call(e, n)
                })
            }, r.prototype.settlePromises = function(t) {
                this._trampolineEnabled ? s.call(this, t) : this._schedule(function() {
                    t._settlePromises()
                })
            }) : (r.prototype.invokeLater = i, r.prototype.invoke = o, r.prototype.settlePromises = s), r.prototype.invokeFirst = function(t, e, n) {
                this._normalQueue.unshift(t, e, n), this._queueTick()
            }, r.prototype._drainQueue = function(t) {
                for (; t.length() > 0;) {
                    var e = t.shift();
                    if ("function" == typeof e) {
                        var n = t.shift(),
                            r = t.shift();
                        e.call(n, r)
                    } else e._settlePromises()
                }
            }, r.prototype._drainQueues = function() {
                this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue)
            }, r.prototype._queueTick = function() {
                this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
            }, r.prototype._reset = function() {
                this._isTickUsed = !1
            }, e.exports = r, e.exports.firstLineError = a
        }, {
            "./queue": 26,
            "./schedule": 29,
            "./util": 36
        }],
        3: [function(t, e, n) {
            "use strict";
            e.exports = function(t, e, n, r) {
                var i = !1,
                    o = function(t, e) {
                        this._reject(e)
                    },
                    s = function(t, e) {
                        e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t)
                    },
                    a = function(t, e) {
                        0 === (50397184 & this._bitField) && this._resolveCallback(e.target)
                    },
                    c = function(t, e) {
                        e.promiseRejectionQueued || this._reject(t)
                    };
                t.prototype.bind = function(o) {
                    i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
                    var l = n(o),
                        u = new t(e);
                    u._propagateFrom(this, 1);
                    var p = this._target();
                    if (u._setBoundTo(l), l instanceof t) {
                        var h = {
                            promiseRejectionQueued: !1,
                            promise: u,
                            target: p,
                            bindingPromise: l
                        };
                        p._then(e, s, void 0, u, h), l._then(a, c, void 0, u, h), u._setOnCancel(l)
                    } else u._resolveCallback(p);
                    return u
                }, t.prototype._setBoundTo = function(t) {
                    void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField
                }, t.prototype._isBound = function() {
                    return 2097152 === (2097152 & this._bitField)
                }, t.bind = function(e, n) {
                    return t.resolve(n).bind(e)
                }
            }
        }, {}],
        4: [function(t, e, n) {
            "use strict";

            function r() {
                try {
                    Promise === o && (Promise = i)
                } catch (t) {}
                return o
            }
            var i;
            "undefined" != typeof Promise && (i = Promise);
            var o = t("./promise")();
            o.noConflict = r, e.exports = o
        }, {
            "./promise": 22
        }],
        5: [function(t, e, n) {
            "use strict";
            var r = Object.create;
            if (r) {
                var i = r(null),
                    o = r(null);
                i[" size"] = o[" size"] = 0
            }
            e.exports = function(e) {
                function n(t, n) {
                    var r;
                    if (null != t && (r = t[n]), "function" != typeof r) {
                        var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";
                        throw new e.TypeError(i)
                    }
                    return r
                }

                function r(t) {
                    var e = this.pop(),
                        r = n(t, e);
                    return r.apply(t, this)
                }

                function i(t) {
                    return t[this]
                }

                function o(t) {
                    var e = +this;
                    return 0 > e && (e = Math.max(0, e + t.length)), t[e]
                }
                var s, a = t("./util"),
                    c = a.canEvaluate;
                a.isIdentifier;
                e.prototype.call = function(t) {
                    var e = [].slice.call(arguments, 1);
                    return e.push(t), this._then(r, void 0, void 0, e, void 0)
                }, e.prototype.get = function(t) {
                    var e, n = "number" == typeof t;
                    if (n) e = o;
                    else if (c) {
                        var r = s(t);
                        e = null !== r ? r : i
                    } else e = i;
                    return this._then(e, void 0, void 0, t, void 0)
                }
            }
        }, {
            "./util": 36
        }],
        6: [function(t, e, n) {
            "use strict";
            e.exports = function(e, n, r, i) {
                var o = t("./util"),
                    s = o.tryCatch,
                    a = o.errorObj,
                    c = e._async;
                e.prototype["break"] = e.prototype.cancel = function() {
                    if (!i.cancellation()) return this._warn("cancellation is disabled");
                    for (var t = this, e = t; t.isCancellable();) {
                        if (!t._cancelBy(e)) {
                            e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                            break
                        }
                        var n = t._cancellationParent;
                        if (null == n || !n.isCancellable()) {
                            t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                            break
                        }
                        t._isFollowing() && t._followee().cancel(), e = t, t = n
                    }
                }, e.prototype._branchHasCancelled = function() {
                    this._branchesRemainingToCancel--
                }, e.prototype._enoughBranchesHaveCancelled = function() {
                    return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0
                }, e.prototype._cancelBy = function(t) {
                    return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), !0) : !1)
                }, e.prototype._cancelBranched = function() {
                    this._enoughBranchesHaveCancelled() && this._cancel()
                }, e.prototype._cancel = function() {
                    this.isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0))
                }, e.prototype._cancelPromises = function() {
                    this._length() > 0 && this._settlePromises()
                }, e.prototype._unsetOnCancel = function() {
                    this._onCancelField = void 0
                }, e.prototype.isCancellable = function() {
                    return this.isPending() && !this.isCancelled()
                }, e.prototype._doInvokeOnCancel = function(t, e) {
                    if (o.isArray(t))
                        for (var n = 0; n < t.length; ++n) this._doInvokeOnCancel(t[n], e);
                    else if (void 0 !== t)
                        if ("function" == typeof t) {
                            if (!e) {
                                var r = s(t).call(this._boundValue());
                                r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e))
                            }
                        } else t._resultCancelled(this)
                }, e.prototype._invokeOnCancel = function() {
                    var t = this._onCancel();
                    this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t)
                }, e.prototype._invokeInternalOnCancel = function() {
                    this.isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel())
                }, e.prototype._resultCancelled = function() {
                    this.cancel()
                }
            }
        }, {
            "./util": 36
        }],
        7: [function(t, e, n) {
            "use strict";
            e.exports = function(e) {
                function n(t, n, a) {
                    return function(c) {
                        var l = a._boundValue();
                        t: for (var u = 0; u < t.length; ++u) {
                            var p = t[u];
                            if (p === Error || null != p && p.prototype instanceof Error) {
                                if (c instanceof p) return o(n).call(l, c)
                            } else if ("function" == typeof p) {
                                var h = o(p).call(l, c);
                                if (h === s) return h;
                                if (h) return o(n).call(l, c)
                            } else if (r.isObject(c)) {
                                for (var f = i(p), _ = 0; _ < f.length; ++_) {
                                    var d = f[_];
                                    if (p[d] != c[d]) continue t
                                }
                                return o(n).call(l, c)
                            }
                        }
                        return e
                    }
                }
                var r = t("./util"),
                    i = t("./es5").keys,
                    o = r.tryCatch,
                    s = r.errorObj;
                return n
            }
        }, {
            "./es5": 13,
            "./util": 36
        }],
        8: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                function e() {
                    this._trace = new e.CapturedTrace(r())
                }

                function n() {
                    return i ? new e : void 0
                }

                function r() {
                    var t = o.length - 1;
                    return t >= 0 ? o[t] : void 0
                }
                var i = !1,
                    o = [];
                return t.prototype._promiseCreated = function() {}, t.prototype._pushContext = function() {}, t.prototype._popContext = function() {
                    return null
                }, t._peekContext = t.prototype._peekContext = function() {}, e.prototype._pushContext = function() {
                    void 0 !== this._trace && (this._trace._promiseCreated = null, o.push(this._trace))
                }, e.prototype._popContext = function() {
                    if (void 0 !== this._trace) {
                        var t = o.pop(),
                            e = t._promiseCreated;
                        return t._promiseCreated = null, e
                    }
                    return null
                }, e.CapturedTrace = null, e.create = n, e.deactivateLongStackTraces = function() {}, e.activateLongStackTraces = function() {
                    var n = t.prototype._pushContext,
                        o = t.prototype._popContext,
                        s = t._peekContext,
                        a = t.prototype._peekContext,
                        c = t.prototype._promiseCreated;
                    e.deactivateLongStackTraces = function() {
                        t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = c, i = !1
                    }, i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function() {
                        var t = this._peekContext();
                        t && null == t._promiseCreated && (t._promiseCreated = this)
                    }
                }, e
            }
        }, {}],
        9: [function(t, e, n) {
            "use strict";
            e.exports = function(e, n) {
                function r(t, e) {
                    return {
                        promise: e
                    }
                }

                function i() {
                    return !1
                }

                function o(t, e, n) {
                    var r = this;
                    try {
                        t(e, n, function(t) {
                            if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + H.toString(t));
                            r._attachCancellationCallback(t)
                        })
                    } catch (i) {
                        return i
                    }
                }

                function s(t) {
                    if (!this.isCancellable()) return this;
                    var e = this._onCancel();
                    void 0 !== e ? H.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t)
                }

                function a() {
                    return this._onCancelField
                }

                function c(t) {
                    this._onCancelField = t
                }

                function l() {
                    this._cancellationParent = void 0, this._onCancelField = void 0
                }

                function u(t, e) {
                    i
