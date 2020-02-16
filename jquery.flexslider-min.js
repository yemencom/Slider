);
r.setProps(r.computedW, "setTotal")
}
}
}, smoothHeight: function(e) {
    if (!l || p) {
        var t = p ? r : r.viewport;
        e ? t.animate({
            height: r.slides.eq(r.animatingTo).height()
        }, e) : t.height(r.slides.eq(r.animatingTo).height())
    }
}, sync: function(t) {
    var n = e(r.vars.sync).data("flexslider"),
        i = r.animatingTo;
    switch (t) {
        case "animate":
            n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
            break;
        case "play":
            !n.playing && !n.asNav && n.play();
            break;
        case "pause":
            n.pause()
    }
}, uniqueID: function(t) {
    t.find("[id]").each(function() {
        var t = e(this);
        t.attr("id", t.attr("id") + "_clone")
    });
    return t
}, pauseInvisible: {
    visProp: null,
    init: function() {
        var e = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document) return "hidden";
        for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
        if (v.pauseInvisible.visProp) {
            var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(n, function() {
                v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
            })
        }
    },
    isHidden: function() {
        return document[v.pauseInvisible.visProp] || !1
    }
}, setToClearWatchedEvent: function() {
    clearTimeout(f);
    f = setTimeout(function() {
        a = ""
    }, 3e3)
}
};
r.flexAnimate = function(t, n, s, u, a) {
    !r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev");
    d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
    if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
        if (d && u) {
            var f = e(r.vars.asNavFor).data("flexslider");
            r.atEnd = t === 0 || t === r.count - 1;
            f.flexAnimate(t, !0, !1, !0, a);
            r.direction = r.currentItem < t ? "next" : "prev";
            f.direction = r.direction;
            if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) {
                r.currentItem = t;
                r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                return !1
            }
            r.currentItem = t;
            r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
            t = Math.floor(t / r.visible)
        }
        r.animating = !0;
        r.animatingTo = t;
        n && r.pause();
        r.vars.before(r);
        r.syncExists && !a && v.sync("animate");
        r.vars.controlNav && v.controlNav.active();
        h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
        r.atEnd = t === 0 || t === r.last;
        r.vars.directionNav && v.directionNav.update();
        if (t === r.last) {
            r.vars.end(r);
            r.vars.animationLoop || r.pause()
        }
        if (!p) {
            var m = l ? r.slides.filter(":first").height() : r.computedW,
                g, y, b;
            if (h) {
                g = r.vars.itemMargin;
                b = (r.itemW + g) * r.move * r.animatingTo;
                y = b > r.limit && r.visible !== 1 ? r.limit : b
            } else r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m;
            r.setProps(y, "", r.vars.animationSpeed);
            if (r.transitions) {
                if (!r.vars.animationLoop || !r.atEnd) {
                    r.animating = !1;
                    r.currentSlide = r.animatingTo
                }
                r.container.unbind("webkitTransitionEnd transitionend");
                r.container.bind("webkitTransitionEnd transitionend", function() {
                    r.wrapup(m)
                })
            } else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function() {
                r.wrapup(m)
            })
        } else if (!o) {
            r.slides.eq(r.currentSlide).css({
                zIndex: 1
            }).animate({
                opacity: 0
            }, r.vars.animationSpeed, r.vars.easing);
            r.slides.eq(t).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, r.vars.animationSpeed, r.vars.easing, r.wrapup)
        } else {
            r.slides.eq(r.currentSlide).css({
                opacity: 0,
                zIndex: 1
            });
            r.slides.eq(t).css({
                opacity: 1,
                zIndex: 2
            });
            r.wrapup(m)
        }
        r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
    }
};
r.wrapup = function(e) {
    !p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart"));
    r.animating = !1;
    r.currentSlide = r.animatingTo;
    r.vars.after(r)
};
r.animateSlides = function() {
    !r.animating && m && r.flexAnimate(r.getTarget("next"))
};
r.pause = function() {
    clearInterval(r.animatedSlides);
    r.animatedSlides = null;
    r.playing = !1;
    r.vars.pausePlay && v.pausePlay.update("play");
    r.syncExists && v.sync("pause")
};
r.play = function() {
    r.playing && clearInterval(r.animatedSlides);
    r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed);
    r.started = r.playing = !0;
    r.vars.pausePlay && v.pausePlay.update("pause");
    r.syncExists && v.sync("play")
};
r.stop = function() {
    r.pause();
    r.stopped = !0
};
r.canAdvance = function(e, t) {
    var n = d ? r.pagingCount - 1 : r.last;
    return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
};
r.getTarget = function(e) {
    r.direction = e;
    return e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
};
r.setProps = function(e, t, n) {
    var i = function() {
        var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
            i = function() {
                if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
                switch (t) {
                    case "setTotal":
                        return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                    case "setTouch":
                        return c ? e : e;
                    case "jumpEnd":
                        return c ? e : r.count * e;
                    case "jumpStart":
                        return c ? r.count * e : e;
                    default:
                        return e
                }
            }();
        return i * -1 + "px"
    }();
    if (r.transitions) {
        i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
        n = n !== undefined ? n / 1e3 + "s" : "0s";
        r.container.css("-" + r.pfx + "-transition-duration", n);
        r.container.css("transition-duration", n)
    }
    r.args[r.prop] = i;
    (r.transitions || n === undefined) && r.container.css(r.args);
    r.container.css("transform", i)
};
r.setup = function(t) {
    if (!p) {
        var n, s;
        if (t === "init") {
            r.viewport = e('<div class="' + i + 'viewport"></div>').css({
                overflow: "hidden",
                position: "relative"
            }).appendTo(r).append(r.container);
            r.cloneCount = 0;
            r.cloneOffset = 0;
            if (c) {
                s = e.makeArray(r.slides).reverse();
                r.slides = e(s);
                r.container.empty().append(r.slides)
            }
        }
        if (r.vars.animationLoop && !h) {
            r.cloneCount = 2;
            r.cloneOffset = 1;
            t !== "init" && r.container.find(".clone").remove();
            r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"));
            v.uniqueID(r.slides.first().clone().addClass("clone")).appendTo(r.container);
            v.uniqueID(r.slides.last().clone().addClass("clone")).prependTo(r.container)
        }
        r.newSlides = e(r.vars.selector, r);
        n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
        if (l && !h) {
            r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
            setTimeout(function() {
                r.newSlides.css({
                    display: "block"
                });
                r.doMath();
                r.viewport.height(r.h);
                r.setProps(n * r.h, "init")
            }, t === "init" ? 100 : 0)
        } else {
            r.container.width((r.count + r.cloneCount) * 200 + "%");
            r.setProps(n * r.computedW, "init");
            setTimeout(function() {
                r.doMath();
                r.newSlides.css({
                    width: r.computedW,
                    "float": "left",
                    display: "block"
                });
                r.vars.smoothHeight && v.smoothHeight()
            }, t === "init" ? 100 : 0)
        }
    } else {
        r.slides.css({
            width: "100%",
            "float": "left",
            marginRight: "-100%",
            position: "relative"
        });
        t === "init" && (o ? r.slides.css({
            opacity: 0,
            display: "block",
            webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
            zIndex: 1
        }).eq(r.currentSlide).css({
            opacity: 1,
            zIndex: 2
        }) : r.slides.css({
            opacity: 0,
            display: "block",
            zIndex: 1
        }).eq(r.currentSlide).css({
            zIndex: 2
        }).animate({
            opacity: 1
        }, r.vars.animationSpeed, r.vars.easing));
        r.vars.smoothHeight && v.smoothHeight()
    }
    h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide");
    r.vars.init(r)
};
r.doMath = function() {
    var e = r.slides.first(),
        t = r.vars.itemMargin,
        n = r.vars.minItems,
        i = r.vars.maxItems;
    r.w = r.viewport === undefined ? r.width() : r.viewport.width();
    r.h = e.height();
    r.boxPadding = e.outerWidth() - e.width();
    if (h) {
        r.itemT = r.vars.itemWidth + t;
        r.minW = n ? n * r.itemT : r.w;
        r.maxW = i ? i * r.itemT - t : r.w;
        r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth;
        r.visible = Math.floor(r.w / r.itemW);
        r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible;
        r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1);
        r.last = r.pagingCount - 1;
        r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t
    } else {
        r.itemW = r.w;
        r.pagingCount = r.count;
        r.last = r.count - 1
    }
    r.computedW = r.itemW - r.boxPadding
};
r.update = function(e, t) {
    r.doMath();
    if (!h) {
        e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1);
        r.animatingTo = r.currentSlide
    }
    if (r.vars.controlNav && !r.manualControls)
        if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
        else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) {
        if (h && r.currentSlide > r.last) {
            r.currentSlide -= 1;
            r.animatingTo -= 1
        }
        v.controlNav.update("remove", r.last)
    }
    r.vars.directionNav && v.directionNav.update()
};
r.addSlide = function(t, n) {
    var i = e(t);
    r.count += 1;
    r.last = r.count - 1;
    l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i);
    r.update(n, "add");
    r.slides = e(r.vars.selector + ":not(.clone)", r);
    r.setup();
    r.vars.added(r)
};
r.removeSlide = function(t) {
    var n = isNaN(t) ? r.slides.index(e(t)) : t;
    r.count -= 1;
    r.last = r.count - 1;
    isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
    r.doMath();
    r.update(n, "remove");
    r.slides = e(r.vars.selector + ":not(.clone)", r);
    r.setup();
    r.vars.removed(r)
};
v.init()
};
e(window).blur(function(e) {
    focused = !1
}).focus(function(e) {
    focused = !0
});
e.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "",
    nextText: "",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function() {},
    before: function() {},
    after: function() {},
    end: function() {},
    added: function() {},
    removed: function() {},
    init: function() {}
};
e.fn.flexslider = function(t) {
t === undefined && (t = {});
if (typeof t == "object") return this.each(function() {
    var n = e(this),
        r = t.selector ? t.selector : ".slides > li",
        i = n.find(r);
    if (i.length === 1 && t.allowOneSlide === !0 || i.length === 0) {
        i.fadeIn(400);
        t.start && t.start(n)
    } else n.data("flexslider") === undefined && new e.flexslider(this, t)
});
var n = e(this).data("flexslider");
switch (t) {
    case "play":
        n.play();
        break;
    case "pause":
        n.pause();
        break;
    case "stop":
        n.stop();
        break;
    case "next":
        n.flexAnimate(n.getTarget("next"), !0);
        break;
    case "prev":
    case "previous":
        n.flexAnimate(n.getTarget("prev"), !0);
        break;
    default:
        typeof t == "number" && n.flexAnimate(t, !0)
}
}
})(jQuery);
$(document).ready(function() {
    var a = "project.dimpost.com",
        b = "flexsliderdemo.blogspot.com",
        c = "",
        d = "",
        e = "flexslider",
        f = function() {
            window.location.hostname != a && window.location.hostname != b && ($("." + e).append('<a class="intro" href="' + c + '" rel="dofollow" target="_blank">' + d + "</a>"), $("a.intro").css({
                display: "block",
                color: "rgba(255, 255, 255, 0.3)",
                position: "absolute",
                right: "2px",
                bottom: "2px",
                "text-decoration": "none",
                "z-index": "999999",
                opacity: "1",
                "font-family": "monospace, sans-serif",
                "font-size": "12px"
            }))
        };
    setTimeout(f, 5e3)
});
