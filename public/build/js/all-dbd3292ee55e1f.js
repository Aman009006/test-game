function scrollbarWidth() {
    var min = parseInt(document.documentElement.clientWidth), max = parseInt(window.innerWidth);
    return max - min;
}

function numberTo(el, title) {
    $(el).numerator({
        easing: "swing",
        duration: 2e3,
        toValue: title
    });
}

if (function(l, doc) {
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
            return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild);
        }
        function getElements() {
            var elements = e.elements;
            return "string" == typeof elements ? elements.split(" ") : elements;
        }
        function timestamp(str, G) {
            var value = e.elements;
            "string" != typeof value && (value = value.join(" ")), "string" != typeof str && (str = str.join(" ")),
                e.elements = value + " " + str, q(G);
        }
        function transform(attrs) {
            var fn = attrHandle[attrs[k]];
            return fn || (fn = {}, v++, attrs[k] = v, attrHandle[v] = fn), fn;
        }
        function p(a, d, data) {
            if (d || (d = doc), h) return d.createElement(a);
            data || (data = transform(d));
            var b;
            return b = data.cache[a] ? data.cache[a].cloneNode() : i.test(a) ? (data.cache[a] = data.createElem(a)).cloneNode() : data.createElem(a),
                !b.canHaveChildren || o.test(a) || b.tagUrn ? b : data.frag.appendChild(b);
        }
        function createDocumentFragment(ownerDocument, data) {
            if (ownerDocument || (ownerDocument = doc), h) return ownerDocument.createDocumentFragment();
            data = data || transform(ownerDocument);
            for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
            return clone;
        }
        function shivMethods(ownerDocument, data) {
            data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment,
                data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                return e.shivMethods ? p(nodeName, ownerDocument, data) : data.createElem(nodeName);
            }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                    return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")';
                }) + ");return n}")(e, data.frag);
        }
        function q(t) {
            t || (t = doc);
            var a = transform(t);
            return !e.shivCSS || c || a.hasCSS || (a.hasCSS = !!addStyleSheet(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
            h || shivMethods(t, a), t;
        }
        var c, h, len = "3.7.3", r = l.html5 || {}, o = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, i = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, k = "_html5shiv", v = 0, attrHandle = {};
        !function() {
            try {
                var a = doc.createElement("a");
                a.innerHTML = "<xyz></xyz>", c = "hidden" in a, h = 1 == a.childNodes.length || function() {
                        doc.createElement("a");
                        var frag = doc.createDocumentFragment();
                        return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement;
                    }();
            } catch (i) {
                c = !0, h = !0;
            }
        }();
        var e = {
            elements: r.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
            version: len,
            shivCSS: r.shivCSS !== !1,
            supportsUnknownElements: h,
            shivMethods: r.shivMethods !== !1,
            type: "default",
            shivDocument: q,
            createElement: p,
            createDocumentFragment: createDocumentFragment,
            addElements: timestamp
        };
        l.html5 = e, q(doc), "object" == typeof module && module.exports && (module.exports = e);
    }("undefined" != typeof window ? window : this, document), function(w) {
        "use strict";
        function callMedia() {
            applyMedia(!0);
        }
        var respond = {};
        w.respond = respond, respond.update = function() {};
        var requestQueue = [], xmlHttp = function() {
            var xmlhttpmethod = !1;
            try {
                xmlhttpmethod = new w.XMLHttpRequest();
            } catch (i) {
                xmlhttpmethod = new w.ActiveXObject("Microsoft.XMLHTTP");
            }
            return function() {
                return xmlhttpmethod;
            };
        }(), ajax = function(url, callback) {
            var req = xmlHttp();
            req && (req.open("GET", url, !0), req.onreadystatechange = function() {
                4 !== req.readyState || 200 !== req.status && 304 !== req.status || callback(req.responseText);
            }, 4 !== req.readyState && req.send(null));
        };
        if (respond.ajax = ajax, respond.queue = requestQueue, respond.regex = {
                media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
                keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
                urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
                findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
                only: /(only\s+)?([a-zA-Z]+)\s?/,
                minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
                maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
            }, respond.mediaQueriesSupported = w.matchMedia && null !== w.matchMedia("only all") && w.matchMedia("only all").matches,
                !respond.mediaQueriesSupported) {
            var doc, a, l, d = w.document, docElem = d.documentElement, mediastyles = [], rules = [], appendedEls = [], parsedSheets = {}, resizeThrottle = 30, head = d.getElementsByTagName("head")[0] || docElem, resizeDefer = d.getElementsByTagName("base")[0], links = head.getElementsByTagName("link"), getEmValue = function() {
                var ret, div = d.createElement("div"), body = d.body, originalHTMLFontSize = docElem.style.fontSize, originalBodyFontSize = body && body.style.fontSize, fakeUsed = !1;
                return div.style.cssText = "position:absolute;font-size:1em;width:1em", body || (body = fakeUsed = d.createElement("body"),
                    body.style.background = "none"), docElem.style.fontSize = "100%", body.style.fontSize = "100%",
                    body.appendChild(div), fakeUsed && docElem.insertBefore(body, docElem.firstChild),
                    ret = div.offsetWidth, fakeUsed ? docElem.removeChild(body) : body.removeChild(div),
                    docElem.style.fontSize = originalHTMLFontSize, originalBodyFontSize && (body.style.fontSize = originalBodyFontSize),
                    ret = l = parseFloat(ret);
            }, applyMedia = function(fromResize) {
                var name = "clientWidth", docElemProp = docElem[name], currWidth = "CSS1Compat" === d.compatMode && docElemProp || d.body[name] || docElemProp, styleBlocks = {}, lastLink = links[links.length - 1], now = new Date().getTime();
                if (fromResize && doc && now - doc < resizeThrottle) return w.clearTimeout(a), void (a = w.setTimeout(applyMedia, resizeThrottle));
                doc = now;
                for (var i in mediastyles) if (mediastyles.hasOwnProperty(i)) {
                    var thisstyle = mediastyles[i], min = thisstyle.minw, max = thisstyle.maxw, minnull = null === min, maxnull = null === max, em = "em";
                    min && (min = parseFloat(min) * (min.indexOf(em) > -1 ? l || getEmValue() : 1)),
                    max && (max = parseFloat(max) * (max.indexOf(em) > -1 ? l || getEmValue() : 1)),
                    thisstyle.hasquery && (minnull && maxnull || !(minnull || currWidth >= min) || !(maxnull || currWidth <= max)) || (styleBlocks[thisstyle.media] || (styleBlocks[thisstyle.media] = []),
                        styleBlocks[thisstyle.media].push(rules[thisstyle.rules]));
                }
                for (var j in appendedEls) appendedEls.hasOwnProperty(j) && appendedEls[j] && appendedEls[j].parentNode === head && head.removeChild(appendedEls[j]);
                appendedEls.length = 0;
                for (var k in styleBlocks) if (styleBlocks.hasOwnProperty(k)) {
                    var ss = d.createElement("style"), css = styleBlocks[k].join("\n");
                    ss.type = "text/css", ss.media = k, head.insertBefore(ss, lastLink.nextSibling),
                        ss.styleSheet ? ss.styleSheet.cssText = css : ss.appendChild(d.createTextNode(css)),
                        appendedEls.push(ss);
                }
            }, translate = function(styles, href, media) {
                var qs = styles.replace(respond.regex.keyframes, "").match(respond.regex.media), ql = qs && qs.length || 0;
                href = href.substring(0, href.lastIndexOf("/"));
                var repUrls = function(css) {
                    return css.replace(respond.regex.urls, "$1" + href + "$2$3");
                }, useMedia = !ql && media;
                href.length && (href += "/"), useMedia && (ql = 1);
                for (var i = 0; i < ql; i++) {
                    var left, value, keys, len;
                    useMedia ? (left = media, rules.push(repUrls(styles))) : (left = qs[i].match(respond.regex.findStyles) && RegExp.$1,
                            rules.push(RegExp.$2 && repUrls(RegExp.$2))), keys = left.split(","), len = keys.length;
                    for (var n = 0; n < len; n++) value = keys[n], mediastyles.push({
                        media: value.split("(")[0].match(respond.regex.only) && RegExp.$2 || "all",
                        rules: rules.length - 1,
                        hasquery: value.indexOf("(") > -1,
                        minw: value.match(respond.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: value.match(respond.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    });
                }
                applyMedia();
            }, makeRequests = function() {
                if (requestQueue.length) {
                    var thisRequest = requestQueue.shift();
                    ajax(thisRequest.href, function(styles) {
                        translate(styles, thisRequest.href, thisRequest.media), parsedSheets[thisRequest.href] = !0,
                            w.setTimeout(function() {
                                makeRequests();
                            }, 0);
                    });
                }
            }, ripCSS = function() {
                for (var i = 0; i < links.length; i++) {
                    var sheet = links[i], href = sheet.href, media = sheet.media, isCSS = sheet.rel && "stylesheet" === sheet.rel.toLowerCase();
                    href && isCSS && !parsedSheets[href] && (sheet.styleSheet && sheet.styleSheet.rawCssText ? (translate(sheet.styleSheet.rawCssText, href, media),
                            parsedSheets[href] = !0) : (/^([a-zA-Z:]*\/\/)/.test(href) || resizeDefer) && href.replace(RegExp.$1, "").split("/")[0] !== w.location.host || ("//" === href.substring(0, 2) && (href = w.location.protocol + href),
                            requestQueue.push({
                                href: href,
                                media: media
                            })));
                }
                makeRequests();
            };
            ripCSS(), respond.update = ripCSS, respond.getEmValue = getEmValue, w.addEventListener ? w.addEventListener("resize", callMedia, !1) : w.attachEvent && w.attachEvent("onresize", callMedia);
        }
    }(this), function(root, factory) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = root.document ? factory(root, !0) : function(root) {
                    if (!root.document) throw new Error("jQuery requires a window with a document");
                    return factory(root);
                } : factory(root);
    }("undefined" != typeof window ? window : this, function(global, b) {
        "use strict";
        function next(script_src, d) {
            d = d || doc;
            var script = d.createElement("script");
            script.text = script_src, d.head.appendChild(script).parentNode.removeChild(script);
        }
        function isArraylike(obj) {
            var length = !!obj && "length" in obj && obj.length, type = self.type(obj);
            return "function" !== type && !self.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
        }
        function winnow(context, selector, callback) {
            return self.isFunction(selector) ? self.grep(context, function(o, i) {
                    return !!selector.call(o, i, o) !== callback;
                }) : selector.nodeType ? self.grep(context, function(node) {
                        return node === selector !== callback;
                    }) : "string" != typeof selector ? self.grep(context, function(target) {
                            return indexOf.call(selector, target) > -1 !== callback;
                        }) : scope.test(selector) ? self.filter(selector, context, callback) : (selector = self.filter(selector, context),
                                self.grep(context, function(node) {
                                    return indexOf.call(selector, node) > -1 !== callback && 1 === node.nodeType;
                                }));
        }
        function _singleSibling(node, prop) {
            for (;(node = node[prop]) && 1 !== node.nodeType; ) ;
            return node;
        }
        function createOptions(options) {
            var domElements = {};
            return self.each(options.match(core_rnotwhite) || [], function(i, el) {
                domElements[el] = !0;
            }), domElements;
        }
        function data(d) {
            return d;
        }
        function params(fn) {
            throw fn;
        }
        function resolve(value, err, args) {
            var callback;
            try {
                value && self.isFunction(callback = value.promise) ? callback.call(value).done(err).fail(args) : value && self.isFunction(callback = value.then) ? callback.call(value, err, args) : err.call(void 0, value);
            } catch (value) {
                args.call(void 0, value);
            }
        }
        function completed() {
            doc.removeEventListener("DOMContentLoaded", completed), global.removeEventListener("load", completed),
                self.ready();
        }
        function Data() {
            this.expando = self.expando + Data.uid++;
        }
        function parse(data) {
            return "true" === data || "false" !== data && ("null" === data ? null : data === +data + "" ? +data : rbrace.test(data) ? JSON.parse(data) : data);
        }
        function attr(elem, name, val) {
            var attribute;
            if (void 0 === val && 1 === elem.nodeType) if (attribute = "data-" + name.replace(rmultiDash, "-$&").toLowerCase(),
                    val = elem.getAttribute(attribute), "string" == typeof val) {
                try {
                    val = parse(val);
                } catch (s) {}
                data_priv.set(elem, name, val);
            } else val = void 0;
            return val;
        }
        function transform(el, prop, parts, fx) {
            var end, i = 1, j = 20, src = fx ? function() {
                    return fx.cur();
                } : function() {
                    return self.css(el, prop, "");
                }, options = src(), unit = parts && parts[3] || (self.cssNumber[prop] ? "" : "px"), start = (self.cssNumber[prop] || "px" !== unit && +options) && re.exec(self.css(el, prop));
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +options || 1;
                do i = i || ".5", start /= i, self.style(el, prop, start + unit); while (i !== (i = src() / options) && 1 !== i && --j);
            }
            return parts && (start = +start || +options || 0, end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2],
            fx && (fx.unit = unit, fx.start = start, fx.end = end)), end;
        }
        function create(elem) {
            var n, d = elem.ownerDocument, tag = elem.nodeName, display = _elm_display[tag];
            return display ? display : (n = d.body.appendChild(d.createElement(tag)), display = self.css(n, "display"),
                    n.parentNode.removeChild(n), "none" === display && (display = "block"), _elm_display[tag] = display,
                    display);
        }
        function update(nodes, elapsed) {
            for (var value, node, options = [], i = 0, l = nodes.length; i < l; i++) node = nodes[i],
            node.style && (value = node.style.display, elapsed ? ("none" === value && (options[i] = data_user.get(node, "display") || null,
                options[i] || (node.style.display = "")), "" === node.style.display && isHidden(node) && (options[i] = create(node))) : "none" !== value && (options[i] = "none",
                    data_user.set(node, "display", value)));
            for (i = 0; i < l; i++) null != options[i] && (nodes[i].style.display = options[i]);
            return nodes;
        }
        function getAll(context, tag) {
            var ret;
            return ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [],
                void 0 === tag || tag && self.nodeName(context, tag) ? self.merge([ context ], ret) : ret;
        }
        function setGlobalEval(elems, refElements) {
            for (var i = 0, l = elems.length; i < l; i++) data_user.set(elems[i], "globalEval", !refElements || data_user.get(refElements[i], "globalEval"));
        }
        function add(second, doc, _elements, arr, str) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = doc.createDocumentFragment(), nodes = [], i = 0, l = second.length; i < l; i++) if (elem = second[i],
                elem || 0 === elem) if ("object" === self.type(elem)) self.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(doc.createElement("div")), tag = (strings.exec(elem) || [ "", "" ])[1].toLowerCase(),
                         wrap = tagHooks[tag] || tagHooks._default, tmp.innerHTML = wrap[1] + self.htmlPrefilter(elem) + wrap[2],
                         j = wrap[0]; j--; ) tmp = tmp.lastChild;
                self.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(doc.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if (arr && self.inArray(elem, arr) > -1) str && str.push(elem); else if (contains = self.contains(elem.ownerDocument, elem),
                    tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp),
                    _elements) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && _elements.push(elem);
            return fragment;
        }
        function returnTrue() {
            return !0;
        }
        function returnFalse() {
            return !1;
        }
        function safeActiveElement() {
            try {
                return doc.activeElement;
            } catch (err) {}
        }
        function call(t, value, type, data, fn, index) {
            var origFn, i;
            if ("object" == typeof value) {
                "string" != typeof type && (data = data || type, type = void 0);
                for (i in value) call(t, i, type, data, value[i], index);
                return t;
            }
            if (null == data && null == fn ? (fn = type, data = type = void 0) : null == fn && ("string" == typeof type ? (fn = data,
                            data = void 0) : (fn = data, data = type, type = void 0)), fn === !1) fn = returnFalse; else if (!fn) return t;
            return 1 === index && (origFn = fn, fn = function(r) {
                return self().off(r), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = self.guid++)), t.each(function() {
                self.event.add(this, value, fn, data, type);
            });
        }
        function manipulationTarget(elem, content) {
            return self.nodeName(elem, "table") && self.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem : elem;
        }
        function disableScript(elem) {
            return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
        }
        function restoreScript(elem) {
            var match = regex.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (1 === dest.nodeType) {
                if (data_user.hasData(src) && (pdataOld = data_user.access(src), pdataCur = data_user.set(dest, pdataOld),
                        events = pdataOld.events)) {
                    delete pdataCur.handle, pdataCur.events = {};
                    for (type in events) for (i = 0, l = events[type].length; i < l; i++) self.event.add(dest, type, events[type][i]);
                }
                data_priv.hasData(src) && (udataOld = data_priv.access(src), udataCur = self.extend({}, udataOld),
                    data_priv.set(dest, udataCur));
            }
        }
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            "input" === nodeName && mime.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue);
        }
        function on(nodes, args, fn, capture) {
            args = mod.apply([], args);
            var n, r, items, l, node, value, x = 0, len = nodes.length, y = len - 1, callback = args[0], i = self.isFunction(callback);
            if (i || len > 1 && "string" == typeof callback && !support.checkClone && object.test(callback)) return nodes.each(function(index) {
                var el = nodes.eq(index);
                i && (args[0] = callback.call(this, index, el.html())), on(el, args, fn, capture);
            });
            if (len && (n = add(args, nodes[0].ownerDocument, !1, nodes, capture), r = n.firstChild,
                1 === n.childNodes.length && (n = r), r || capture)) {
                for (items = self.map(getAll(n, "script"), disableScript), l = items.length; x < len; x++) node = n,
                x !== y && (node = self.clone(node, !0, !0), l && self.merge(items, getAll(node, "script"))),
                    fn.call(nodes[x], node, x);
                if (l) for (value = items[items.length - 1].ownerDocument, self.map(items, restoreScript),
                                x = 0; x < l; x++) node = items[x], rscriptType.test(node.type || "") && !data_user.access(node, "globalEval") && self.contains(value, node) && (node.src ? self._evalUrl && self._evalUrl(node.src) : next(node.textContent.replace(event, ""), value));
            }
            return nodes;
        }
        function check(data, test, s) {
            for (var node, ctx = test ? self.filter(test, data) : data, i = 0; null != (node = ctx[i]); i++) s || 1 !== node.nodeType || self.cleanData(getAll(node)),
            node.parentNode && (s && self.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")),
                node.parentNode.removeChild(node));
            return data;
        }
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name],
            "" !== ret || self.contains(elem.ownerDocument, elem) || (ret = self.style(elem, name)),
            !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width,
                minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret,
                ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)),
                void 0 !== ret ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        function vendor(prop) {
            if (prop in style) return prop;
            for (var capName = prop[0].toUpperCase() + prop.slice(1), i = prefixes.length; i--; ) if (prop = prefixes[i] + capName,
                prop in style) return prop;
        }
        function setPositiveNumber(elem, value, subtract) {
            var matches = re.exec(value);
            return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
        }
        function augmentWidthOrHeight(elem, j, extra, isBorderBox, styles) {
            var i, val = 0;
            for (i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === j ? 1 : 0; i < 4; i += 2) "margin" === extra && (val += self.css(elem, extra + cssExpand[i], !0, styles)),
                isBorderBox ? ("content" === extra && (val -= self.css(elem, "padding" + cssExpand[i], !0, styles)),
                    "margin" !== extra && (val -= self.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += self.css(elem, "padding" + cssExpand[i], !0, styles),
                    "padding" !== extra && (val += self.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val;
        }
        function getWidthOrHeight(elem, name, extra) {
            var val, valueIsBorderBox = !0, styles = getStyles(elem), isBorderBox = "border-box" === self.css(elem, "boxSizing", !1, styles);
            if (elem.getClientRects().length && (val = elem.getBoundingClientRect()[name]),
                val <= 0 || null == val) {
                if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]),
                        rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]),
                    val = parseFloat(val) || 0;
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
        }
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        function raf() {
            target && (global.requestAnimationFrame(raf), self.fx.tick());
        }
        function push() {
            return global.setTimeout(function() {
                i = void 0;
            }), i = self.now();
        }
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = {
                height: type
            };
            for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i],
                attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs;
        }
        function fn(match, e, self) {
            for (var a, events = (Animation.tweeners[e] || []).concat(Animation.tweeners["*"]), i = 0, l = events.length; i < l; i++) if (a = events[i].call(self, e, match)) return a;
        }
        function defaultPrefilter(elem, attributes, opts) {
            var prop, attr, isOption, matchedRule, options, rule, value, _i, _len = "width" in attributes || "height" in attributes, _len2 = this, _ref = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_user.get(elem, "fxshow");
            opts.queue || (matchedRule = self._queueHooks(elem, "fx"), null == matchedRule.unqueued && (matchedRule.unqueued = 0,
                options = matchedRule.empty.fire, matchedRule.empty.fire = function() {
                matchedRule.unqueued || options();
            }), matchedRule.unqueued++, _len2.always(function() {
                _len2.always(function() {
                    matchedRule.unqueued--, self.queue(elem, "fx").length || matchedRule.empty.fire();
                });
            }));
            for (prop in attributes) if (attr = attributes[prop], item.test(attr)) {
                if (delete attributes[prop], isOption = isOption || "toggle" === attr, attr === (hidden ? "hide" : "show")) {
                    if ("show" !== attr || !dataShow || void 0 === dataShow[prop]) continue;
                    hidden = !0;
                }
                _ref[prop] = dataShow && dataShow[prop] || self.style(elem, prop);
            }
            if (rule = !self.isEmptyObject(attributes), rule || !self.isEmptyObject(_ref)) {
                _len && 1 === elem.nodeType && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ],
                    value = dataShow && dataShow.display, null == value && (value = data_user.get(elem, "display")),
                    _i = self.css(elem, "display"), "none" === _i && (value ? _i = value : (update([ elem ], !0),
                        value = elem.style.display || value, _i = self.css(elem, "display"), update([ elem ]))),
                ("inline" === _i || "inline-block" === _i && null != value) && "none" === self.css(elem, "float") && (rule || (_len2.done(function() {
                    style.display = value;
                }), null == value && (_i = style.display, value = "none" === _i ? "" : _i)), style.display = "inline-block")),
                opts.overflow && (style.overflow = "hidden", _len2.always(function() {
                    style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
                })), rule = !1;
                for (prop in _ref) rule || (dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_user.access(elem, "fxshow", {
                        display: value
                    }), isOption && (dataShow.hidden = !hidden), hidden && update([ elem ], !0), _len2.done(function() {
                    hidden || update([ elem ]), data_user.remove(elem, "fxshow");
                    for (prop in _ref) self.style(elem, prop, _ref[prop]);
                })), rule = fn(hidden ? dataShow[prop] : 0, prop, _len2), prop in dataShow || (dataShow[prop] = rule.start,
                hidden && (rule.end = rule.start, rule.start = 0));
            }
        }
        function propFilter(data, props) {
            var key, name, value, result, hooks;
            for (key in data) if (name = self.camelCase(key), value = props[name], result = data[key],
                self.isArray(result) && (value = result[1], result = data[key] = result[0]), key !== name && (data[name] = result,
                    delete data[key]), hooks = self.cssHooks[name], hooks && "expand" in hooks) {
                result = hooks.expand(result), delete data[name];
                for (key in result) key in data || (data[key] = result[key], props[key] = value);
            } else props[name] = value;
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = self.Deferred().always(function() {
                delete tick.elem;
            }), tick = function() {
                if (stopped) return !1;
                for (var currentTime = i || push(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
                return deferred.notifyWith(elem, [ animation, percent, remaining ]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [ animation ]),
                        !1);
            }, animation = deferred.promise({
                elem: elem,
                props: self.extend({}, properties),
                opts: self.extend(!0, {
                    specialEasing: {},
                    easing: self.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: i || push(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = self.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    return animation.tweens.push(tween), tween;
                },
                stop: function(gotoEnd) {
                    var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) return this;
                    for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                    return gotoEnd ? (deferred.notifyWith(elem, [ animation, 1, 0 ]), deferred.resolveWith(elem, [ animation, gotoEnd ])) : deferred.rejectWith(elem, [ animation, gotoEnd ]),
                        this;
                }
            }), props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return self.isFunction(result.stop) && (self._queueHooks(animation.elem, animation.opts.queue).stop = self.proxy(result.stop, result)),
                result;
            return self.map(props, fn, animation), self.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation),
                self.fx.timer(self.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        }
        function trim(value) {
            var str = value.match(core_rnotwhite) || [];
            return str.join(" ");
        }
        function getData(el) {
            return el.getAttribute && el.getAttribute("class") || "";
        }
        function serialize(name, value, property, params) {
            var i;
            if (self.isArray(value)) self.each(value, function(index, value) {
                property || excludeNames.test(name) ? params(name, value) : serialize(name + "[" + ("object" == typeof value && null != value ? index : "") + "]", value, property, params);
            }); else if (property || "object" !== self.type(value)) params(name, value); else for (i in value) serialize(name + "[" + i + "]", value[i], property, params);
        }
        function emit(row) {
            return function(conditions, callback) {
                "string" != typeof conditions && (callback = conditions, conditions = "*");
                var x, i = 0, o = conditions.toLowerCase().match(core_rnotwhite) || [];
                if (self.isFunction(callback)) for (;x = o[i++]; ) "+" === x[0] ? (x = x.slice(1) || "*",
                        (row[x] = row[x] || []).unshift(callback)) : (row[x] = row[x] || []).push(callback);
            };
        }
        function reset(val, b, i, width) {
            function merge(y) {
                var def;
                return map[y] = !0, self.each(val[y] || [], function(o, cb) {
                    var a = cb(b, i, width);
                    return "string" != typeof a || list || map[a] ? list ? !(def = a) : void 0 : (b.dataTypes.unshift(a),
                            merge(a), !1);
                }), def;
            }
            var map = {}, list = val === n;
            return merge(b.dataTypes[0]) || !map["*"] && merge("*");
        }
        function ajaxExtend(g, src) {
            var k, b, attr = self.ajaxSettings.flatOptions || {};
            for (k in src) void 0 !== src[k] && ((attr[k] ? g : b || (b = {}))[k] = src[k]);
            return b && self.extend(!0, g, b), g;
        }
        function ajaxHandleResponses(s, xhr, responses) {
            for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(),
            void 0 === ct && (ct = s.mimeType || xhr.getResponseHeader("Content-Type"));
            if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
            }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    firstDataType || (firstDataType = type);
                }
                finalDataType = finalDataType || firstDataType;
            }
            if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType),
                responses[finalDataType];
        }
        function ajaxConvert(options, response, jqXHR, isSuccess) {
            var k, s, key, m, w, h = {}, tokens = options.dataTypes.slice();
            if (tokens[1]) for (key in options.converters) h[key.toLowerCase()] = options.converters[key];
            for (s = tokens.shift(); s; ) if (options.responseFields[s] && (jqXHR[options.responseFields[s]] = response),
                !w && isSuccess && options.dataFilter && (response = options.dataFilter(response, options.dataType)),
                    w = s, s = tokens.shift()) if ("*" === s) s = w; else if ("*" !== w && w !== s) {
                if (key = h[w + " " + s] || h["* " + s], !key) for (k in h) if (m = k.split(" "),
                    m[1] === s && (key = h[w + " " + m[0]] || h["* " + m[0]])) {
                    key === !0 ? key = h[k] : h[k] !== !0 && (s = m[0], tokens.unshift(m[1]));
                    break;
                }
                if (key !== !0) if (key && options["throws"]) response = key(response); else try {
                    response = key(response);
                } catch (now) {
                    return {
                        state: "parsererror",
                        error: key ? now : "No conversion from " + w + " to " + s
                    };
                }
            }
            return {
                state: "success",
                data: response
            };
        }
        function getWindow(elem) {
            return self.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
        }
        var version = [], doc = global.document, enableClasses = Object.getPrototypeOf, docElement = version.slice, mod = version.concat, modElem = version.push, indexOf = version.indexOf, class2type = {}, toString = class2type.toString, tests = class2type.hasOwnProperty, inputs = tests.toString, attrs = inputs.call(Object), support = {}, slice = "3.1.1", self = function(url, data) {
            return new self.fn.init(url, data);
        }, featureName = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, _hasOwnProperty = /^-ms-/, hasOwnProp = /-([a-z])/g, matchTag = function(node, tag) {
            return tag.toUpperCase();
        };
        self.fn = self.prototype = {
            jquery: slice,
            constructor: self,
            length: 0,
            toArray: function() {
                return docElement.call(this);
            },
            get: function(num) {
                return null == num ? docElement.call(this) : num < 0 ? this[num + this.length] : this[num];
            },
            pushStack: function(elems) {
                var ret = self.merge(this.constructor(), elems);
                return ret.prevObject = this, ret;
            },
            each: function(fn) {
                return self.each(this, fn);
            },
            map: function(fn) {
                return this.pushStack(self.map(this, function(val, i) {
                    return fn.call(val, i, val);
                }));
            },
            slice: function() {
                return this.pushStack(docElement.apply(this, arguments));
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            eq: function(i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
            },
            end: function() {
                return this.prevObject || this.constructor();
            },
            push: modElem,
            sort: version.sort,
            splice: version.splice
        }, self.extend = self.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {},
                i++), "object" == typeof target || self.isFunction(target) || (target = {}), i === length && (target = this,
                i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name],
                copy = options[name], target !== copy && (deep && copy && (self.isPlainObject(copy) || (copyIsArray = self.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1,
                        clone = src && self.isArray(src) ? src : []) : clone = src && self.isPlainObject(src) ? src : {},
                    target[name] = self.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target;
        }, self.extend({
            expando: "jQuery" + (slice + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(msg) {
                throw new Error(msg);
            },
            noop: function() {},
            isFunction: function(obj) {
                return "function" === self.type(obj);
            },
            isArray: Array.isArray,
            isWindow: function(obj) {
                return null != obj && obj === obj.window;
            },
            isNumeric: function(obj) {
                var type = self.type(obj);
                return ("number" === type || "string" === type) && !isNaN(obj - parseFloat(obj));
            },
            isPlainObject: function(value) {
                var key, result;
                return !(!value || "[object Object]" !== toString.call(value)) && (!(key = enableClasses(value)) || (result = tests.call(key, "constructor") && key.constructor,
                    "function" == typeof result && inputs.call(result) === attrs));
            },
            isEmptyObject: function(config) {
                var i;
                for (i in config) return !1;
                return !0;
            },
            type: function(obj) {
                return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
            },
            globalEval: function(code) {
                next(code);
            },
            camelCase: function(string) {
                return string.replace(_hasOwnProperty, "ms-").replace(hasOwnProp, matchTag);
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
            },
            each: function(obj, callback) {
                var l, i = 0;
                if (isArraylike(obj)) for (l = obj.length; i < l && callback.call(obj[i], i, obj[i]) !== !1; i++) ; else for (i in obj) if (callback.call(obj[i], i, obj[i]) === !1) break;
                return obj;
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(featureName, "");
            },
            makeArray: function(result, error) {
                var err = error || [];
                return null != result && (isArraylike(Object(result)) ? self.merge(err, "string" == typeof result ? [ result ] : result) : modElem.call(err, result)),
                    err;
            },
            inArray: function(elem, array, i) {
                return null == array ? -1 : indexOf.call(array, elem, i);
            },
            merge: function(a, b) {
                for (var i = +b.length, j = 0, l = a.length; j < i; j++) a[l++] = b[j];
                return a.length = l, a;
            },
            grep: function(elems, callback, invert) {
                for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i),
                callbackInverse !== callbackExpect && matches.push(elems[i]);
                return matches;
            },
            map: function(elems, callback, arg) {
                var len, value, i = 0, ret = [];
                if (isArraylike(elems)) for (len = elems.length; i < len; i++) value = callback(elems[i], i, arg),
                null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg),
                null != value && ret.push(value);
                return mod.apply([], ret);
            },
            guid: 1,
            proxy: function(f, c) {
                var d, args, bound;
                if ("string" == typeof c && (d = f[c], c = f, f = d), self.isFunction(f)) return args = docElement.call(arguments, 2),
                    bound = function() {
                        return f.apply(c || this, args.concat(docElement.call(arguments)));
                    }, bound.guid = f.guid = f.guid || self.guid++, bound;
            },
            now: Date.now,
            support: support
        }), "function" == typeof Symbol && (self.fn[Symbol.iterator] = version[Symbol.iterator]),
            self.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
                class2type["[object " + name + "]"] = name.toLowerCase();
            });
        var Sizzle = function(global) {
            function Sizzle(selector, elem, results, seed) {
                var name, length, field, id, match, s, list, i = elem && elem.ownerDocument, x = elem ? elem.nodeType : 9;
                if (results = results || [], "string" != typeof selector || !selector || 1 !== x && 9 !== x && 11 !== x) return results;
                if (!seed && ((elem ? elem.ownerDocument || elem : done) !== documentIsHTML && docElem(elem),
                        elem = elem || documentIsHTML, rbuggyMatches)) {
                    if (11 !== x && (match = rquickExpr.exec(selector))) if (name = match[1]) {
                        if (9 === x) {
                            if (!(field = elem.getElementById(name))) return results;
                            if (field.id === name) return results.push(field), results;
                        } else if (i && (field = i.getElementById(name)) && preferredDoc(elem, field) && field.id === name) return results.push(field),
                            results;
                    } else {
                        if (match[2]) return push.apply(results, elem.getElementsByTagName(selector)), results;
                        if ((name = match[3]) && support.getElementsByClassName && elem.getElementsByClassName) return push.apply(results, elem.getElementsByClassName(name)),
                            results;
                    }
                    if (support.qsa && !strundefined[selector + " "] && (!matches || !matches.test(selector))) {
                        if (1 !== x) i = elem, list = selector; else if ("object" !== elem.nodeName.toLowerCase()) {
                            for ((id = elem.getAttribute("id")) ? id = id.replace(funescape, fn) : elem.setAttribute("id", id = dirruns),
                                     s = isXML(selector), length = s.length; length--; ) s[length] = "#" + id + " " + toSelector(s[length]);
                            list = s.join(","), i = rsibling.test(selector) && testContext(elem.parentNode) || elem;
                        }
                        if (list) try {
                            return push.apply(results, i.querySelectorAll(list)), results;
                        } catch (g) {} finally {
                            id === dirruns && elem.removeAttribute("id");
                        }
                    }
                }
                return sortInput(selector.replace(rtrim, "$1"), elem, results, seed);
            }
            function createCache() {
                function cache(key, value) {
                    return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
                }
                var keys = [];
                return cache;
            }
            function forEach($seenScript$$) {
                return $seenScript$$[dirruns] = !0, $seenScript$$;
            }
            function assert(fn) {
                var a = documentIsHTML.createElement("fieldset");
                try {
                    return !!fn(a);
                } catch (i) {
                    return !1;
                } finally {
                    a.parentNode && a.parentNode.removeChild(a), a = null;
                }
            }
            function addHandle(attrs, handler) {
                for (var arr = attrs.split("|"), i = arr.length; i--; ) Expr.attrHandle[arr[i]] = handler;
            }
            function siblingCheck(a, b) {
                var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (diff) return diff;
                if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
                return a ? 1 : -1;
            }
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && elem.type === type;
                };
            }
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return ("input" === name || "button" === name) && elem.type === type;
                };
            }
            function onClick(CatchClause) {
                return function(node) {
                    return "form" in node ? node.parentNode && node.disabled === !1 ? "label" in node ? "label" in node.parentNode ? node.parentNode.disabled === CatchClause : node.disabled === CatchClause : node.isDisabled === CatchClause || node.isDisabled !== !CatchClause && del(node) === CatchClause : node.disabled === CatchClause : "label" in node && node.disabled === CatchClause;
                };
            }
            function filter(callback) {
                return forEach(function(x) {
                    return x = +x, forEach(function(b, a) {
                        for (var prop, props = callback([], b.length, x), index = props.length; index--; ) b[prop = props[index]] && (b[prop] = !(a[prop] = b[prop]));
                    });
                });
            }
            function testContext(context) {
                return context && "undefined" != typeof context.getElementsByTagName && context;
            }
            function setFilters() {}
            function toSelector(tokens) {
                for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
                return selector;
            }
            function f(map, x, prev) {
                var i = x.dir, l = x.next, key = l || i, c = prev && "parentNode" === key, y = tokenCache++;
                return x.first ? function(a, fn, scope) {
                        for (;a = a[i]; ) if (1 === a.nodeType || c) return map(a, fn, scope);
                        return !1;
                    } : function(a, fn, scope) {
                        var args, o, node, result = [ classCache, y ];
                        if (scope) {
                            for (;a = a[i]; ) if ((1 === a.nodeType || c) && map(a, fn, scope)) return !0;
                        } else for (;a = a[i]; ) if (1 === a.nodeType || c) if (node = a[dirruns] || (a[dirruns] = {}),
                                o = node[a.uniqueID] || (node[a.uniqueID] = {}), l && l === a.nodeName.toLowerCase()) a = a[i] || a; else {
                            if ((args = o[key]) && args[0] === classCache && args[1] === y) return result[2] = args[2];
                            if (o[key] = result, result[2] = map(a, fn, scope)) return !0;
                        }
                        return !1;
                    };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                        for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                        return !0;
                    } : matchers[0];
            }
            function merge(o, varArgs, a) {
                for (var i = 0, l = varArgs.length; i < l; i++) Sizzle(o, varArgs[i], a);
                return a;
            }
            function add(operators, other, defineProperty, name, desc) {
                for (var o, u = [], i = 0, l = operators.length, c = null != other; i < l; i++) (o = operators[i]) && (defineProperty && !defineProperty(o, name, desc) || (u.push(o),
                c && other.push(i)));
                return u;
            }
            function bind(fn, selector, cb, func, callback, thisArg) {
                return func && !func[dirruns] && (func = bind(func)), callback && !callback[dirruns] && (callback = bind(callback, thisArg)),
                    forEach(function(v, data, o, options) {
                        var a, b, c, d = [], e = [], f = data.length, i = v || merge(selector || "*", o.nodeType ? [ o ] : o, []), g = !fn || !v && selector ? i : add(i, d, fn, o, options), s = cb ? callback || (v ? fn : f || func) ? [] : data : g;
                        if (cb && cb(g, s, o, options), func) for (a = add(s, e), func(a, [], o, options),
                                                                       b = a.length; b--; ) (c = a[b]) && (s[e[b]] = !(g[e[b]] = c));
                        if (v) {
                            if (callback || fn) {
                                if (callback) {
                                    for (a = [], b = s.length; b--; ) (c = s[b]) && a.push(g[b] = c);
                                    callback(null, s = [], a, options);
                                }
                                for (b = s.length; b--; ) (c = s[b]) && (a = callback ? indexOf(v, c) : d[b]) > -1 && (v[a] = !(data[a] = c));
                            }
                        } else s = add(s === data ? s.splice(f, s.length) : s), callback ? callback(null, data, s, options) : push.apply(data, s);
                    });
            }
            function matcherFromTokens(tokens) {
                for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = f(function(err) {
                    return err === checkContext;
                }, implicitRelative, !0), matchAnyContext = f(function(val) {
                    return indexOf(checkContext, val) > -1;
                }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                    var t = !leadingRelative && (xml || context !== hasDuplicate) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                    return checkContext = null, t;
                } ]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ f(elementMatcher(matchers), matcher) ]; else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[dirruns]) {
                        for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                        return bind(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: " " === tokens[i - 2].type ? "*" : ""
                            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
                return elementMatcher(matchers);
            }
            function animate(deps, elements) {
                var m = elements.length > 0, b = deps.length > 0, f = function(element, start, end, a, fn) {
                    var c, i, d, n = 0, k = "0", j = element && [], o = [], p = hasDuplicate, r = element || b && Expr.find.TAG("*", fn), v = classCache += null == p ? 1 : Math.random() || .1, el = r.length;
                    for (fn && (hasDuplicate = start === documentIsHTML || start || fn); k !== el && null != (c = r[k]); k++) {
                        if (b && c) {
                            for (i = 0, start || c.ownerDocument === documentIsHTML || (docElem(c), end = !rbuggyMatches); d = deps[i++]; ) if (d(c, start || documentIsHTML, end)) {
                                a.push(c);
                                break;
                            }
                            fn && (classCache = v);
                        }
                        m && ((c = !d && c) && n--, element && j.push(c));
                    }
                    if (n += k, m && k !== n) {
                        for (i = 0; d = elements[i++]; ) d(j, o, start, end);
                        if (element) {
                            if (n > 0) for (;k--; ) j[k] || o[k] || (o[k] = pop.call(a));
                            o = add(o);
                        }
                        push.apply(a, o), fn && !element && o.length > 0 && n + elements.length > 1 && Sizzle.uniqueSort(a);
                    }
                    return fn && (classCache = v, hasDuplicate = p), j;
                };
                return m ? forEach(f) : f;
            }
            var i, support, Expr, matcher, getText, isXML, outermostContext, sortInput, hasDuplicate, input, documentIsXML, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando, preferredDoc, dirruns = "sizzle" + 1 * new Date(), done = global.document, classCache = 0, tokenCache = 0, compilerCache = createCache(), sortOrder = createCache(), strundefined = createCache(), MAX_NEGATIVE = function(item1, item2) {
                return item1 === item2 && (documentIsXML = !0), 0;
            }, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(array, item) {
                for (var i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
                return -1;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\x00-\\xa0])+", identifier = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + characterEncoding + "))|)" + whitespace + "*\\]", attributes = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + identifier + ")*)|.*)\\)|)", pseudos = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(attributes), ridentifier = new RegExp("^" + characterEncoding + "$"), matchExpr = {
                ID: new RegExp("^#(" + characterEncoding + ")"),
                CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                TAG: new RegExp("^(" + characterEncoding + "|[*])"),
                ATTR: new RegExp("^" + identifier),
                PSEUDO: new RegExp("^" + attributes),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), runescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
            }, funescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fn = function(x, y) {
                return y ? "\x00" === x ? " �" : x.slice(0, -1) + "\\" + x.charCodeAt(x.length - 1).toString(16) + " " : "\\" + x;
            }, handler = function() {
                docElem();
            }, del = f(function(err) {
                return err.disabled === !0 && ("form" in err || "label" in err);
            }, {
                dir: "parentNode",
                next: "legend"
            });
            try {
                push.apply(arr = slice.call(done.childNodes), done.childNodes), arr[done.childNodes.length].nodeType;
            } catch (Tt) {
                push = {
                    apply: arr.length ? function(target, els) {
                            push_native.apply(target, slice.call(els));
                        } : function(target, els) {
                            for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                            target.length = j - 1;
                        }
                };
            }
            support = Sizzle.support = {}, getText = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return !!documentElement && "HTML" !== documentElement.nodeName;
            }, docElem = Sizzle.setDocument = function(doc) {
                var hasCompare, parent, node = doc ? doc.ownerDocument || doc : done;
                return node !== documentIsHTML && 9 === node.nodeType && node.documentElement ? (documentIsHTML = node,
                        rbuggyQSA = documentIsHTML.documentElement, rbuggyMatches = !getText(documentIsHTML),
                    done !== documentIsHTML && (parent = documentIsHTML.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", handler, !1) : parent.attachEvent && parent.attachEvent("onunload", handler)),
                        support.attributes = assert(function(div) {
                            return div.className = "i", !div.getAttribute("className");
                        }), support.getElementsByTagName = assert(function(div) {
                        return div.appendChild(documentIsHTML.createComment("")), !div.getElementsByTagName("*").length;
                    }), support.getElementsByClassName = rnative.test(documentIsHTML.getElementsByClassName),
                        support.getById = assert(function(div) {
                            return rbuggyQSA.appendChild(div).id = dirruns, !documentIsHTML.getElementsByName || !documentIsHTML.getElementsByName(dirruns).length;
                        }), support.getById ? (Expr.filter.ID = function(elem) {
                            var attrId = elem.replace(rescape, runescape);
                            return function(elem) {
                                return elem.getAttribute("id") === attrId;
                            };
                        }, Expr.find.ID = function(id, context) {
                            if ("undefined" != typeof context.getElementById && rbuggyMatches) {
                                var m = context.getElementById(id);
                                return m ? [ m ] : [];
                            }
                        }) : (Expr.filter.ID = function(elem) {
                            var attrId = elem.replace(rescape, runescape);
                            return function(elem) {
                                var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                                return node && node.value === attrId;
                            };
                        }, Expr.find.ID = function(id, context) {
                            if ("undefined" != typeof context.getElementById && rbuggyMatches) {
                                var node, i, m, n = context.getElementById(id);
                                if (n) {
                                    if (node = n.getAttributeNode("id"), node && node.value === id) return [ n ];
                                    for (m = context.getElementsByName(id), i = 0; n = m[i++]; ) if (node = n.getAttributeNode("id"),
                                        node && node.value === id) return [ n ];
                                }
                                return [];
                            }
                        }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                            return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
                        } : function(tag, context) {
                            var i, ret = [], t = 0, tmp = context.getElementsByTagName(tag);
                            if ("*" === tag) {
                                for (;i = tmp[t++]; ) 1 === i.nodeType && ret.push(i);
                                return ret;
                            }
                            return tmp;
                        }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                            if ("undefined" != typeof context.getElementsByClassName && rbuggyMatches) return context.getElementsByClassName(className);
                        }, contains = [], matches = [], (support.qsa = rnative.test(documentIsHTML.querySelectorAll)) && (assert(function(div) {
                        rbuggyQSA.appendChild(div).innerHTML = "<a id='" + dirruns + "'></a><select id='" + dirruns + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                        div.querySelectorAll("[msallowcapture^='']").length && matches.push("[*^$]=" + whitespace + "*(?:''|\"\")"),
                        div.querySelectorAll("[selected]").length || matches.push("\\[" + whitespace + "*(?:value|" + booleans + ")"),
                        div.querySelectorAll("[id~=" + dirruns + "-]").length || matches.push("~="), div.querySelectorAll(":checked").length || matches.push(":checked"),
                        div.querySelectorAll("a#" + dirruns + "+*").length || matches.push(".#.+[+~]");
                    }), assert(function(div) {
                        div.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var input = documentIsHTML.createElement("input");
                        input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"),
                        div.querySelectorAll("[name=d]").length && matches.push("name" + whitespace + "*[*^$|!~]?="),
                        2 !== div.querySelectorAll(":enabled").length && matches.push(":enabled", ":disabled"),
                            rbuggyQSA.appendChild(div).disabled = !0, 2 !== div.querySelectorAll(":disabled").length && matches.push(":enabled", ":disabled"),
                            div.querySelectorAll("*,:x"), matches.push(",.*:");
                    })), (support.matchesSelector = rnative.test(expando = rbuggyQSA.matches || rbuggyQSA.webkitMatchesSelector || rbuggyQSA.mozMatchesSelector || rbuggyQSA.oMatchesSelector || rbuggyQSA.msMatchesSelector)) && assert(function(div) {
                        support.disconnectedMatch = expando.call(div, "*"), expando.call(div, "[s!='']:x"),
                            contains.push("!=", attributes);
                    }), matches = matches.length && new RegExp(matches.join("|")), contains = contains.length && new RegExp(contains.join("|")),
                        hasCompare = rnative.test(rbuggyQSA.compareDocumentPosition), preferredDoc = hasCompare || rnative.test(rbuggyQSA.contains) ? function(a, b) {
                            var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                            return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
                        } : function(a, b) {
                            if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                            return !1;
                        }, MAX_NEGATIVE = hasCompare ? function(a, b) {
                            if (a === b) return documentIsXML = !0, 0;
                            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                            return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                                    1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === documentIsHTML || a.ownerDocument === done && preferredDoc(done, a) ? -1 : b === documentIsHTML || b.ownerDocument === done && preferredDoc(done, b) ? 1 : input ? indexOf(input, a) - indexOf(input, b) : 0 : 4 & compare ? -1 : 1);
                        } : function(a, b) {
                            if (a === b) return documentIsXML = !0, 0;
                            var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                            if (!aup || !bup) return a === documentIsHTML ? -1 : b === documentIsHTML ? 1 : aup ? -1 : bup ? 1 : input ? indexOf(input, a) - indexOf(input, b) : 0;
                            if (aup === bup) return siblingCheck(a, b);
                            for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                            for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                            for (;ap[i] === bp[i]; ) i++;
                            return i ? siblingCheck(ap[i], bp[i]) : ap[i] === done ? -1 : bp[i] === done ? 1 : 0;
                        }, documentIsHTML) : documentIsHTML;
            }, Sizzle.matches = function(expr, set) {
                return Sizzle(expr, null, null, set);
            }, Sizzle.matchesSelector = function(context, expr) {
                if ((context.ownerDocument || context) !== documentIsHTML && docElem(context), expr = expr.replace(rattributeQuotes, "='$1']"),
                    support.matchesSelector && rbuggyMatches && !strundefined[expr + " "] && (!contains || !contains.test(expr)) && (!matches || !matches.test(expr))) try {
                    var ret = expando.call(context, expr);
                    if (ret || support.disconnectedMatch || context.document && 11 !== context.document.nodeType) return ret;
                } catch (s) {}
                return Sizzle(expr, documentIsHTML, null, [ context ]).length > 0;
            }, Sizzle.contains = function(elem, expr) {
                return (elem.ownerDocument || elem) !== documentIsHTML && docElem(elem), preferredDoc(elem, expr);
            }, Sizzle.attr = function(elem, name) {
                (elem.ownerDocument || elem) !== documentIsHTML && docElem(elem);
                var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !rbuggyMatches) : void 0;
                return void 0 !== val ? val : support.attributes || !rbuggyMatches ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            }, Sizzle.escape = function(val) {
                return (val + "").replace(funescape, fn);
            }, Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            }, Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [], i = 0, key = 0;
                if (documentIsXML = !support.detectDuplicates, input = !support.sortStable && results.slice(0),
                        results.sort(MAX_NEGATIVE), documentIsXML) {
                    for (;elem = results[key++]; ) elem === results[key] && (i = duplicates.push(key));
                    for (;i--; ) results.splice(duplicates[i], 1);
                }
                return input = null, results;
            }, matcher = Sizzle.getText = function(elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (nodeType) {
                    if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                        if ("string" == typeof elem.textContent) return elem.textContent;
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += matcher(elem);
                    } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
                } else for (;node = elem[i++]; ) ret += matcher(node);
                return ret;
            }, Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: forEach,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(result) {
                        return result[1] = result[1].replace(rescape, runescape), result[3] = (result[3] || result[4] || result[5] || "").replace(rescape, runescape),
                        "~=" === result[2] && (result[3] = " " + result[3] + " "), result.slice(0, 4);
                    },
                    CHILD: function(match) {
                        return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]),
                                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])),
                                match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]),
                            match;
                    },
                    PSEUDO: function(match) {
                        var excess, unquoted = !match[6] && match[2];
                        return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = isXML(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess),
                                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                    }
                },
                filter: {
                    TAG: function(elem) {
                        var nodeName = elem.replace(rescape, runescape).toLowerCase();
                        return "*" === elem ? function() {
                                return !0;
                            } : function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },
                    CLASS: function(className) {
                        var pattern = compilerCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && compilerCache(className, function(elem) {
                                return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                            });
                    },
                    ATTR: function(data, name, value) {
                        return function(items) {
                            var str = Sizzle.attr(items, data);
                            return null == str ? "!=" === name : !name || (str += "", "=" === name ? str === value : "!=" === name ? str !== value : "^=" === name ? value && 0 === str.indexOf(value) : "*=" === name ? value && str.indexOf(value) > -1 : "$=" === name ? value && str.slice(-value.length) === value : "~=" === name ? (" " + str.replace(pseudos, " ") + " ").indexOf(value) > -1 : "|=" === name && (str === value || str.slice(0, value.length + 1) === value + "-"));
                        };
                    },
                    CHILD: function(type, what, argument, first, last) {
                        var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                        return 1 === first && 0 === last ? function(elem) {
                                return !!elem.parentNode;
                            } : function(elem, context, xml) {
                                var cache, outerCache, node, cur, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                                if (parent) {
                                    if (simple) {
                                        for (;dir; ) {
                                            for (cur = elem; cur = cur[dir]; ) if (ofType ? cur.nodeName.toLowerCase() === name : 1 === cur.nodeType) return !1;
                                            start = dir = "only" === type && !start && "nextSibling";
                                        }
                                        return !0;
                                    }
                                    if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                        for (cur = parent, node = cur[dirruns] || (cur[dirruns] = {}), outerCache = node[cur.uniqueID] || (node[cur.uniqueID] = {}),
                                                 cache = outerCache[type] || [], nodeIndex = cache[0] === classCache && cache[1],
                                                 diff = nodeIndex && cache[2], cur = nodeIndex && parent.childNodes[nodeIndex]; cur = ++nodeIndex && cur && cur[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === cur.nodeType && ++diff && cur === elem) {
                                            outerCache[type] = [ classCache, nodeIndex, diff ];
                                            break;
                                        }
                                    } else if (useCache && (cur = elem, node = cur[dirruns] || (cur[dirruns] = {}),
                                            outerCache = node[cur.uniqueID] || (node[cur.uniqueID] = {}), cache = outerCache[type] || [],
                                            nodeIndex = cache[0] === classCache && cache[1], diff = nodeIndex), diff === !1) for (;(cur = ++nodeIndex && cur && cur[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? cur.nodeName.toLowerCase() !== name : 1 !== cur.nodeType) || !++diff || (useCache && (node = cur[dirruns] || (cur[dirruns] = {}),
                                        outerCache = node[cur.uniqueID] || (node[cur.uniqueID] = {}), outerCache[type] = [ classCache, diff ]),
                                    cur !== elem)); ) ;
                                    return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                                }
                            };
                    },
                    PSEUDO: function(pseudo, argument) {
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        return fn[dirruns] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ],
                                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? forEach(function(path, cs) {
                                            for (var i, s = fn(path, argument), n = s.length; n--; ) i = indexOf(path, s[n]),
                                                path[i] = !(cs[i] = s[n]);
                                        }) : function(elem) {
                                            return fn(elem, 0, args);
                                        }) : fn;
                    }
                },
                pseudos: {
                    not: forEach(function(selector) {
                        var node = [], args = [], func = outermostContext(selector.replace(rtrim, "$1"));
                        return func[dirruns] ? forEach(function(v, indexes, array, type) {
                                for (var o, t = func(v, null, type, []), i = v.length; i--; ) (o = t[i]) && (v[i] = !(indexes[i] = o));
                            }) : function(type, match, options) {
                                return node[0] = type, func(node, null, options, args), node[0] = null, !args.pop();
                            };
                    }),
                    has: forEach(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),
                    contains: forEach(function(protocol) {
                        return protocol = protocol.replace(rescape, runescape), function(elem) {
                            return (elem.textContent || elem.innerText || matcher(elem)).indexOf(protocol) > -1;
                        };
                    }),
                    lang: forEach(function(lang) {
                        return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang),
                            lang = lang.replace(rescape, runescape).toLowerCase(), function(elem) {
                            var elemLang;
                            do if (elemLang = rbuggyMatches ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(),
                            elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                            return !1;
                        };
                    }),
                    target: function(elem) {
                        var hash = global.location && global.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    root: function(elem) {
                        return elem === rbuggyQSA;
                    },
                    focus: function(elem) {
                        return elem === documentIsHTML.activeElement && (!documentIsHTML.hasFocus || documentIsHTML.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    enabled: onClick(!1),
                    disabled: onClick(!0),
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                    },
                    selected: function(el) {
                        return el.parentNode && el.parentNode.selectedIndex, el.selected === !0;
                    },
                    empty: function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function(elem) {
                        return !Expr.pseudos.empty(elem);
                    },
                    header: function(elem) {
                        return rheader.test(elem.nodeName);
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && "button" === elem.type || "button" === name;
                    },
                    text: function(elem) {
                        var attr;
                        return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                    },
                    first: filter(function() {
                        return [ 0 ];
                    }),
                    last: filter(function(d, i) {
                        return [ i - 1 ];
                    }),
                    eq: filter(function(callSite, y, t) {
                        return [ t < 0 ? t + y : t ];
                    }),
                    even: filter(function(s, len) {
                        for (var i = 0; i < len; i += 2) s.push(i);
                        return s;
                    }),
                    odd: filter(function(s, len) {
                        for (var i = 1; i < len; i += 2) s.push(i);
                        return s;
                    }),
                    lt: filter(function(a, b, t) {
                        for (var i = t < 0 ? t + b : t; --i >= 0; ) a.push(i);
                        return a;
                    }),
                    gt: filter(function(a, b, t) {
                        for (var prop = t < 0 ? t + b : t; ++prop < b; ) a.push(prop);
                        return a;
                    })
                }
            }, Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) Expr.pseudos[i] = createButtonPseudo(i);
            for (i in {
                submit: !0,
                reset: !0
            }) Expr.pseudos[i] = createInputPseudo(i);
            return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(),
                isXML = Sizzle.tokenize = function(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = sortOrder[selector + " "];
                    if (cached) return parseOnly ? 0 : cached.slice(0);
                    for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                        matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar),
                            groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(),
                            tokens.push({
                                value: matched,
                                type: match[0].replace(rtrim, " ")
                            }), soFar = soFar.slice(matched.length));
                        for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(),
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            }), soFar = soFar.slice(matched.length));
                        if (!matched) break;
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : sortOrder(selector, groups).slice(0);
                }, outermostContext = Sizzle.compile = function(context, group) {
                var i, options = [], p = [], r = strundefined[context + " "];
                if (!r) {
                    for (group || (group = isXML(context)), i = group.length; i--; ) r = matcherFromTokens(group[i]),
                        r[dirruns] ? options.push(r) : p.push(r);
                    r = strundefined(context, animate(p, options)), r.selector = context;
                }
                return r;
            }, sortInput = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && isXML(selector = compiled.selector || selector);
                if (results = results || [], 1 === match.length) {
                    if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && rbuggyMatches && Expr.relative[tokens[1].type]) {
                        if (context = (Expr.find.ID(token.matches[0].replace(rescape, runescape), context) || [])[0],
                                !context) return results;
                        compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                    }
                    for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i],
                        !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(rescape, runescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed),
                            results;
                        break;
                    }
                }
                return (compiled || outermostContext(selector, match))(seed, context, !rbuggyMatches, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context),
                    results;
            }, support.sortStable = dirruns.split("").sort(MAX_NEGATIVE).join("") === dirruns,
                support.detectDuplicates = !!documentIsXML, docElem(), support.sortDetached = assert(function(div1) {
                return 1 & div1.compareDocumentPosition(documentIsHTML.createElement("fieldset"));
            }), assert(function(div) {
                return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
            }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
            }), support.attributes && assert(function(div) {
                return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
            }) || addHandle("value", function(elem, name, isXML) {
                if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
            }), assert(function(div) {
                return null == div.getAttribute("disabled");
            }) || addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            }), Sizzle;
        }(global);
        self.find = Sizzle, self.expr = Sizzle.selectors, self.expr[":"] = self.expr.pseudos,
            self.uniqueSort = self.unique = Sizzle.uniqueSort, self.text = Sizzle.getText, self.isXMLDoc = Sizzle.isXML,
            self.contains = Sizzle.contains, self.escapeSelector = Sizzle.escape;
        var dir = function(node, key, value) {
            for (var el = [], input = void 0 !== value; (node = node[key]) && 9 !== node.nodeType; ) if (1 === node.nodeType) {
                if (input && self(node).is(value)) break;
                el.push(node);
            }
            return el;
        }, _sibling = function(node, event) {
            for (var result = []; node; node = node.nextSibling) 1 === node.nodeType && node !== event && result.push(node);
            return result;
        }, node = self.expr.match.needsContext, result = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, scope = /^.[^:#\[\.,]*$/;
        self.filter = function(selector, array, filepath) {
            var elem = array[0];
            return filepath && (selector = ":not(" + selector + ")"), 1 === array.length && 1 === elem.nodeType ? self.find.matchesSelector(elem, selector) ? [ elem ] : [] : self.find.matches(selector, self.grep(array, function(obj) {
                    return 1 === obj.nodeType;
                }));
        }, self.fn.extend({
            find: function(selector) {
                var i, ret, len = this.length, data = this;
                if ("string" != typeof selector) return this.pushStack(self(selector).filter(function() {
                    for (i = 0; i < len; i++) if (self.contains(data[i], this)) return !0;
                }));
                for (ret = this.pushStack([]), i = 0; i < len; i++) self.find(selector, data[i], ret);
                return len > 1 ? self.uniqueSort(ret) : ret;
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1));
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0));
            },
            is: function(a) {
                return !!winnow(this, "string" == typeof a && node.test(a) ? self(a) : a || [], !1).length;
            }
        });
        var hop, key = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, value = self.fn.init = function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if (rootjQuery = rootjQuery || hop, "string" == typeof selector) {
                if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : key.exec(selector),
                    !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof self ? context[0] : context, self.merge(this, self.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : doc, !0)),
                        result.test(match[1]) && self.isPlainObject(context)) for (match in context) self.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this;
                }
                return elem = doc.getElementById(match[2]), elem && (this[0] = elem, this.length = 1),
                    this;
            }
            return selector.nodeType ? (this[0] = selector, this.length = 1, this) : self.isFunction(selector) ? void 0 !== rootjQuery.ready ? rootjQuery.ready(selector) : selector(self) : self.makeArray(selector, this);
        };
        value.prototype = self.fn, hop = self(doc);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        self.fn.extend({
            has: function(target) {
                var targets = self(target, this), l = targets.length;
                return this.filter(function() {
                    for (var i = 0; i < l; i++) if (self.contains(this, targets[i])) return !0;
                });
            },
            closest: function(selector, context) {
                var cur, i = 0, l = this.length, matched = [], pos = "string" != typeof selector && self(selector);
                if (!node.test(selector)) for (;i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && self.find.matchesSelector(cur, selector))) {
                    matched.push(cur);
                    break;
                }
                return this.pushStack(matched.length > 1 ? self.uniqueSort(matched) : matched);
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? indexOf.call(self(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function(key, value) {
                return this.pushStack(self.uniqueSort(self.merge(this.get(), self(key, value))));
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
            }
        }), self.each({
            parent: function(elem) {
                var attr = elem.parentNode;
                return attr && 11 !== attr.nodeType ? attr : null;
            },
            parents: function(elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function(node, until, i) {
                return dir(node, "parentNode", i);
            },
            next: function(elem) {
                return _singleSibling(elem, "nextSibling");
            },
            prev: function(elem) {
                return _singleSibling(elem, "previousSibling");
            },
            nextAll: function(elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function(elem) {
                return dir(elem,
                    "previousSibling");
            },
            nextUntil: function(elem, i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function(elem, i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function(elem) {
                return _sibling((elem.parentNode || {}).firstChild, elem);
            },
            children: function(elem) {
                return _sibling(elem.firstChild);
            },
            contents: function(elem) {
                return elem.contentDocument || self.merge([], elem.childNodes);
            }
        }, function(name, method) {
            self.fn[name] = function(item, data) {
                var result = self.map(this, method, item);
                return "Until" !== name.slice(-5) && (data = item), data && "string" == typeof data && (result = self.filter(data, result)),
                this.length > 1 && (guaranteedUnique[name] || self.uniqueSort(result), rparentsprev.test(name) && result.reverse()),
                    this.pushStack(result);
            };
        });
        var core_rnotwhite = /[^\x20\t\r\n\f]+/g;
        self.Callbacks = function(options) {
            options = "string" == typeof options ? createOptions(options) : self.extend({}, options);
            var name, callback, i, j, array = [], list = [], l = -1, fire = function() {
                for (j = options.once, i = name = !0; list.length; l = -1) for (callback = list.shift(); ++l < array.length; ) array[l].apply(callback[0], callback[1]) === !1 && options.stopOnFalse && (l = array.length,
                    callback = !1);
                options.memory || (callback = !1), name = !1, j && (array = callback ? [] : "");
            }, item = {
                add: function() {
                    return array && (callback && !name && (l = array.length - 1, list.push(callback)),
                        function add(args) {
                            self.each(args, function(node, obj) {
                                self.isFunction(obj) ? options.unique && item.has(obj) || array.push(obj) : obj && obj.length && "string" !== self.type(obj) && add(obj);
                            });
                        }(arguments), callback && !name && fire()), this;
                },
                remove: function() {
                    return self.each(arguments, function(a, value) {
                        for (var index; (index = self.inArray(value, array, index)) > -1; ) array.splice(index, 1),
                        index <= l && l--;
                    }), this;
                },
                has: function(property) {
                    return property ? self.inArray(property, array) > -1 : array.length > 0;
                },
                empty: function() {
                    return array && (array = []), this;
                },
                disable: function() {
                    return j = list = [], array = callback = "", this;
                },
                disabled: function() {
                    return !array;
                },
                lock: function() {
                    return j = list = [], callback || name || (array = callback = ""), this;
                },
                locked: function() {
                    return !!j;
                },
                fireWith: function(context, args) {
                    return j || (args = args || [], args = [ context, args.slice ? args.slice() : args ],
                        list.push(args), name || fire()), this;
                },
                fire: function() {
                    return item.fireWith(this, arguments), this;
                },
                fired: function() {
                    return !!i;
                }
            };
            return item;
        }, self.extend({
            Deferred: function(func) {
                var tuples = [ [ "notify", "progress", self.Callbacks("memory"), self.Callbacks("memory"), 2 ], [ "resolve", "done", self.Callbacks("once memory"), self.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", self.Callbacks("once memory"), self.Callbacks("once memory"), 1, "rejected" ] ], result = "pending", a = {
                    state: function() {
                        return result;
                    },
                    always: function() {
                        return deferred.done(arguments).fail(arguments), this;
                    },
                    "catch": function(no) {
                        return a.then(null, no);
                    },
                    pipe: function() {
                        var fns = arguments;
                        return self.Deferred(function(newDefer) {
                            self.each(tuples, function(i, tuple) {
                                var fn = self.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    returned && self.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this, fn ? [ returned ] : arguments);
                                });
                            }), fns = null;
                        }).promise();
                    },
                    then: function(f, callback, predicate) {
                        function test(t, options, func, callback) {
                            return function() {
                                var context = this, args = arguments, complete = function() {
                                    var fn, next;
                                    if (!(t < key)) {
                                        if (fn = func.apply(context, args), fn === options.promise()) throw new TypeError("Thenable self-resolution");
                                        next = fn && ("object" == typeof fn || "function" == typeof fn) && fn.then, self.isFunction(next) ? callback ? next.call(fn, test(key, options, data, callback), test(key, options, params, callback)) : (key++,
                                                    next.call(fn, test(key, options, data, callback), test(key, options, params, callback), test(key, options, data, options.notifyWith))) : (func !== data && (context = void 0,
                                                args = [ fn ]), (callback || options.resolveWith)(context, args));
                                    }
                                }, value = callback ? complete : function() {
                                        try {
                                            complete();
                                        } catch (data) {
                                            self.Deferred.exceptionHook && self.Deferred.exceptionHook(data, value.stackTrace),
                                            t + 1 >= key && (func !== params && (context = void 0, args = [ data ]), options.rejectWith(context, args));
                                        }
                                    };
                                t ? value() : (self.Deferred.getStackHook && (value.stackTrace = self.Deferred.getStackHook()),
                                        global.setTimeout(value));
                            };
                        }
                        var key = 0;
                        return self.Deferred(function(item) {
                            tuples[0][3].add(test(0, item, self.isFunction(predicate) ? predicate : data, item.notifyWith)),
                                tuples[1][3].add(test(0, item, self.isFunction(f) ? f : data)), tuples[2][3].add(test(0, item, self.isFunction(callback) ? callback : params));
                        }).promise();
                    },
                    promise: function(obj) {
                        return null != obj ? self.extend(obj, a) : a;
                    }
                }, deferred = {};
                return self.each(tuples, function(i, tuple) {
                    var list = tuple[2], stateString = tuple[5];
                    a[tuple[1]] = list.add, stateString && list.add(function() {
                        result = stateString;
                    }, tuples[3 - i][2].disable, tuples[0][2].lock), list.add(tuple[3].fire), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments),
                            this;
                    }, deferred[tuple[0] + "With"] = list.fireWith;
                }), a.promise(deferred), func && func.call(deferred, deferred), deferred;
            },
            when: function(value) {
                var l = arguments.length, i = l, j = Array(i), args = docElement.call(arguments), obj = self.Deferred(), updateFn = function(i) {
                    return function(value) {
                        j[i] = this, args[i] = arguments.length > 1 ? docElement.call(arguments) : value,
                        --l || obj.resolveWith(j, args);
                    };
                };
                if (l <= 1 && (resolve(value, obj.done(updateFn(i)).resolve, obj.reject), "pending" === obj.state() || self.isFunction(args[i] && args[i].then))) return obj.then();
                for (;i--; ) resolve(args[i], updateFn(i), obj.reject);
                return obj.promise();
            }
        });
        var fillAttr = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        self.Deferred.exceptionHook = function(e, style) {
            global.console && global.console.warn && e && fillAttr.test(e.name) && global.console.warn("jQuery.Deferred exception: " + e.message, e.stack, style);
        }, self.readyException = function(live) {
            global.setTimeout(function() {
                throw live;
            });
        };
        var promise = self.Deferred();
        self.fn.ready = function(fn) {
            return promise.then(fn)["catch"](function(error) {
                self.readyException(error);
            }), this;
        }, self.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(hold) {
                hold ? self.readyWait++ : self.ready(!0);
            },
            ready: function(wait) {
                (wait === !0 ? --self.readyWait : self.isReady) || (self.isReady = !0, wait !== !0 && --self.readyWait > 0 || promise.resolveWith(doc, [ self ]));
            }
        }), self.ready.then = promise.then, "complete" === doc.readyState || "loading" !== doc.readyState && !doc.documentElement.doScroll ? global.setTimeout(self.ready) : (doc.addEventListener("DOMContentLoaded", completed),
                global.addEventListener("load", completed));
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, length = elems.length, bulk = null == key;
            if ("object" === self.type(key)) {
                chainable = !0;
                for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw);
            } else if (void 0 !== value && (chainable = !0, self.isFunction(value) || (raw = !0),
                bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                        return bulk.call(self(elem), value);
                    })), fn)) for (;i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        }, isNode = function(obj) {
            return 1 === obj.nodeType || 9 === obj.nodeType || !+obj.nodeType;
        };
        Data.uid = 1, Data.prototype = {
            cache: function(obj) {
                var val = obj[this.expando];
                return val || (val = {}, isNode(obj) && (obj.nodeType ? obj[this.expando] = val : Object.defineProperty(obj, this.expando, {
                        value: val,
                        configurable: !0
                    }))), val;
            },
            set: function(node, property, value) {
                var key, style = this.cache(node);
                if ("string" == typeof property) style[self.camelCase(property)] = value; else for (key in property) style[self.camelCase(key)] = property[key];
                return style;
            },
            get: function(options, style) {
                return void 0 === style ? this.cache(options) : options[this.expando] && options[this.expando][self.camelCase(style)];
            },
            access: function(key, value, seconds) {
                return void 0 === value || value && "string" == typeof value && void 0 === seconds ? this.get(key, value) : (this.set(key, value, seconds),
                        void 0 !== seconds ? seconds : value);
            },
            remove: function(element, name) {
                var i, obj = element[this.expando];
                if (void 0 !== obj) {
                    if (void 0 !== name) {
                        self.isArray(name) ? name = name.map(self.camelCase) : (name = self.camelCase(name),
                                name = name in obj ? [ name ] : name.match(core_rnotwhite) || []), i = name.length;
                        for (;i--; ) delete obj[name[i]];
                    }
                    (void 0 === name || self.isEmptyObject(obj)) && (element.nodeType ? element[this.expando] = void 0 : delete element[this.expando]);
                }
            },
            hasData: function(element) {
                var e = element[this.expando];
                return void 0 !== e && !self.isEmptyObject(e);
            }
        };
        var data_user = new Data(), data_priv = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        self.extend({
            hasData: function(elem) {
                return data_priv.hasData(elem) || data_user.hasData(elem);
            },
            data: function(elem, name, value) {
                return data_priv.access(elem, name, value);
            },
            removeData: function(elem, name) {
                data_priv.remove(elem, name);
            },
            _data: function(elem, name, data) {
                return data_user.access(elem, name, data);
            },
            _removeData: function(elem, name) {
                data_user.remove(elem, name);
            }
        }), self.fn.extend({
            data: function(value, context) {
                var i, name, val, elem = this[0], attrs = elem && elem.attributes;
                if (void 0 === value) {
                    if (this.length && (val = data_priv.get(elem), 1 === elem.nodeType && !data_user.get(elem, "hasDataAttrs"))) {
                        for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = self.camelCase(name.slice(5)),
                            attr(elem, name, val[name])));
                        data_user.set(elem, "hasDataAttrs", !0);
                    }
                    return val;
                }
                return "object" == typeof value ? this.each(function() {
                        data_priv.set(this, value);
                    }) : access(this, function(obj) {
                        var data;
                        if (elem && void 0 === obj) {
                            if (data = data_priv.get(elem, value), void 0 !== data) return data;
                            if (data = attr(elem, value), void 0 !== data) return data;
                        } else this.each(function() {
                            data_priv.set(this, value, obj);
                        });
                    }, null, context, arguments.length > 1, null, !0);
            },
            removeData: function(name) {
                return this.each(function() {
                    data_priv.remove(this, name);
                });
            }
        }), self.extend({
            queue: function(elem, type, data) {
                var q;
                if (elem) return type = (type || "fx") + "queue", q = data_user.get(elem, type),
                data && (!q || self.isArray(data) ? q = data_user.access(elem, type, self.makeArray(data)) : q.push(data)),
                q || [];
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = self.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = self._queueHooks(elem, type), next = function() {
                    self.dequeue(elem, type);
                };
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"),
                    delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return data_user.get(elem, key) || data_user.access(elem, key, {
                        empty: self.Callbacks("once memory").add(function() {
                            data_user.remove(elem, [ type + "queue", key ]);
                        })
                    });
            }
        }), self.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? self.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                            var queue = self.queue(this, type, data);
                            self._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && self.dequeue(this, type);
                        });
            },
            dequeue: function(type) {
                return this.each(function() {
                    self.dequeue(this, type);
                });
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", []);
            },
            promise: function(type, obj) {
                var tmp, count = 1, defer = self.Deferred(), elements = this, i = this.length, resolve = function() {
                    --count || defer.resolveWith(elements, [ elements ]);
                };
                for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_user.get(elements[i], type + "queueHooks"),
                tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj);
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, re = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(el, element) {
            return el = element || el, "none" === el.style.display || "" === el.style.display && self.contains(el.ownerDocument, el) && "none" === self.css(el, "display");
        }, swap = function(element, css, callback, args) {
            var ret, prop, old = {};
            for (prop in css) old[prop] = element.style[prop], element.style[prop] = css[prop];
            ret = callback.apply(element, args || []);
            for (prop in css) element.style[prop] = old[prop];
            return ret;
        }, _elm_display = {};
        self.fn.extend({
            show: function() {
                return update(this, !0);
            },
            hide: function() {
                return update(this);
            },
            toggle: function(state) {
                return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                        isHidden(this) ? self(this).show() : self(this).hide();
                    });
            }
        });
        var mime = /^(?:checkbox|radio)$/i, strings = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, rscriptType = /^$|\/(?:java|ecma)script/i, tagHooks = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            thead: [ 1, "<table>", "</table>" ],
            col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            _default: [ 0, "", "" ]
        };
        tagHooks.optgroup = tagHooks.option, tagHooks.tbody = tagHooks.tfoot = tagHooks.colgroup = tagHooks.caption = tagHooks.thead,
            tagHooks.th = tagHooks.td;
        var rhtml = /<|&#?\w+;/;
        !function() {
            var fragment = doc.createDocumentFragment(), div = fragment.appendChild(doc.createElement("div")), input = doc.createElement("input");
            input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"),
                div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked,
                div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
        }();
        var elem = doc.documentElement, rkeyEvent = /^key/, source = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        self.event = {
            global: {},
            add: function(obj, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_user.get(obj);
                if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler,
                    selector = handleObjIn.selector), selector && self.find.matchesSelector(elem, selector),
                                   handler.guid || (handler.guid = self.guid++), (events = elemData.events) || (events = elemData.events = {}),
                                   (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                                       return "undefined" != typeof self && self.event.triggered !== e.type ? self.event.dispatch.apply(obj, arguments) : void 0;
                                   }), types = (types || "").match(core_rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [],
                    type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = self.event.special[type] || {},
                    type = (selector ? special.delegateType : special.bindType) || type, special = self.event.special[type] || {},
                    handleObj = self.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && self.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0,
                special.setup && special.setup.call(obj, data, namespaces, eventHandle) !== !1 || obj.addEventListener && obj.addEventListener(type, eventHandle)),
                special.add && (special.add.call(obj, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)),
                    selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj),
                    self.event.global[type] = !0);
            },
            remove: function(elem, types, fn, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_user.hasData(elem) && data_user.get(elem);
                if (elemData && (events = elemData.events)) {
                    for (types = (types || "").match(core_rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [],
                            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                        for (special = self.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type,
                                 handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                 origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || fn && fn.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1),
                        handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || self.removeEvent(elem, type, elemData.handle),
                            delete events[type]);
                    } else for (type in events) self.event.remove(elem, type + types[t], fn, selector, !0);
                    self.isEmptyObject(events) && data_user.remove(elem, "handle events");
                }
            },
            dispatch: function(eventName) {
                var j, i, ret, matched, handleObj, nodes, event = self.event.fix(eventName), args = new Array(arguments.length), handler = (data_user.get(this, "events") || {})[event.type] || [], special = self.event.special[event.type] || {};
                for (args[0] = event, j = 1; j < arguments.length; j++) args[j] = arguments[j];
                if (event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                    for (nodes = self.event.handlers.call(this, event, handler), j = 0; (matched = nodes[j++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem,
                                                                                                                                                            i = 0; (handleObj = matched.handlers[i++]) && !event.isImmediatePropagationStopped(); ) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj,
                        event.data = handleObj.data, ret = ((self.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args),
                    void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                    return special.postDispatch && special.postDispatch.call(this, event), event.result;
                }
            },
            handlers: function(event, name) {
                var i, n, sel, value, matches, j = [], l = name.delegateCount, cur = event.target;
                if (l && cur.nodeType && !("click" === event.type && event.button >= 1)) for (;cur !== this; cur = cur.parentNode || this) if (1 === cur.nodeType && ("click" !== event.type || cur.disabled !== !0)) {
                    for (value = [], matches = {}, i = 0; i < l; i++) n = name[i], sel = n.selector + " ",
                    void 0 === matches[sel] && (matches[sel] = n.needsContext ? self(sel, this).index(cur) > -1 : self.find(sel, this, null, [ cur ]).length),
                    matches[sel] && value.push(n);
                    value.length && j.push({
                        elem: cur,
                        handlers: value
                    });
                }
                return cur = this, l < name.length && j.push({
                    elem: cur,
                    handlers: name.slice(l)
                }), j;
            },
            addProp: function(prop, f) {
                Object.defineProperty(self.Event.prototype, prop, {
                    enumerable: !0,
                    configurable: !0,
                    get: self.isFunction(f) ? function() {
                            if (this.originalEvent) return f(this.originalEvent);
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[prop];
                        },
                    set: function(value) {
                        Object.defineProperty(this, prop, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: value
                        });
                    }
                });
            },
            fix: function(event) {
                return event[self.expando] ? event : new self.Event(event);
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) return this.focus(), !1;
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) return this.blur(), !1;
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && self.nodeName(this, "input")) return this.click(),
                            !1;
                    },
                    _default: function(event) {
                        return self.nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                    }
                }
            }
        }, self.removeEvent = function(element, event, callback) {
            element.removeEventListener && element.removeEventListener(event, callback);
        }, self.Event = function(event, options) {
            return this instanceof self.Event ? (event && event.type ? (this.originalEvent = event,
                        this.type = event.type, this.isDefaultPrevented = event.defaultPrevented || void 0 === event.defaultPrevented && event.returnValue === !1 ? returnTrue : returnFalse,
                        this.target = event.target && 3 === event.target.nodeType ? event.target.parentNode : event.target,
                        this.currentTarget = event.currentTarget, this.relatedTarget = event.relatedTarget) : this.type = event,
                options && self.extend(this, options), this.timeStamp = event && event.timeStamp || self.now(),
                    void (this[self.expando] = !0)) : new self.Event(event, options);
        }, self.Event.prototype = {
            constructor: self.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault();
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation();
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(),
                    this.stopPropagation();
            }
        }, self.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var i = e.button;
                return null == e.which && rkeyEvent.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== i && source.test(e.type) ? 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0 : e.which;
            }
        }, self.event.addProp), self.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(val, type) {
            self.event.special[val] = {
                delegateType: type,
                bindType: type,
                handle: function(event) {
                    var ret, node = this, child = event.relatedTarget, handleObj = event.handleObj;
                    return child && (child === node || self.contains(node, child)) || (event.type = handleObj.origType,
                        ret = handleObj.handler.apply(this, arguments), event.type = type), ret;
                }
            };
        }), self.fn.extend({
            on: function(type, fn, capture, scope) {
                return call(this, type, fn, capture, scope);
            },
            one: function(type, handler, opt_capture, opt_handlerScope) {
                return call(this, type, handler, opt_capture, opt_handlerScope, 1);
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj,
                    self(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler),
                    this;
                if ("object" == typeof types) {
                    for (type in types) this.off(type, selector, types[type]);
                    return this;
                }
                return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0),
                fn === !1 && (fn = returnFalse), this.each(function() {
                    self.event.remove(this, types, fn, selector);
                });
            }
        });
        var args = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, ln = /<script|<style|<link/i, object = /checked\s*(?:[^=]|=\s*.checked.)/i, regex = /^true\/(.*)/, event = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        self.extend({
            htmlPrefilter: function(s) {
                return s.replace(args, "<$1></$2>");
            },
            clone: function(node, id, options) {
                var i, l, srcElements, destElements, child = node.cloneNode(!0), inPage = self.contains(node.ownerDocument, node);
                if (!(support.noCloneChecked || 1 !== node.nodeType && 11 !== node.nodeType || self.isXMLDoc(node))) for (destElements = getAll(child),
                                                                                                                              srcElements = getAll(node), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
                if (id) if (options) for (srcElements = srcElements || getAll(node), destElements = destElements || getAll(child),
                                              i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(node, child);
                return destElements = getAll(child, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(node, "script")),
                    child;
            },
            cleanData: function(elems) {
                for (var data, elem, type, l = self.event.special, i = 0; void 0 !== (elem = elems[i]); i++) if (isNode(elem)) {
                    if (data = elem[data_user.expando]) {
                        if (data.events) for (type in data.events) l[type] ? self.event.remove(elem, type) : self.removeEvent(elem, type, data.handle);
                        elem[data_user.expando] = void 0;
                    }
                    elem[data_priv.expando] && (elem[data_priv.expando] = void 0);
                }
            }
        }), self.fn.extend({
            detach: function(options) {
                return check(this, options, !0);
            },
            remove: function(options) {
                return check(this, options);
            },
            text: function(value) {
                return access(this, function(value) {
                    return void 0 === value ? self.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value);
                        });
                }, null, value, arguments.length);
            },
            append: function() {
                return on(this, arguments, function(path) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var cb = manipulationTarget(this, path);
                        cb.appendChild(path);
                    }
                });
            },
            prepend: function() {
                return on(this, arguments, function(node) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, node);
                        target.insertBefore(node, target.firstChild);
                    }
                });
            },
            before: function() {
                return on(this, arguments, function(node) {
                    this.parentNode && this.parentNode.insertBefore(node, this);
                });
            },
            after: function() {
                return on(this, arguments, function(node) {
                    this.parentNode && this.parentNode.insertBefore(node, this.nextSibling);
                });
            },
            empty: function() {
                for (var node, k = 0; null != (node = this[k]); k++) 1 === node.nodeType && (self.cleanData(getAll(node, !1)),
                    node.textContent = "");
                return this;
            },
            clone: function(x, y) {
                return x = null != x && x, y = null == y ? x : y, this.map(function() {
                    return self.clone(this, x, y);
                });
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                    if ("string" == typeof value && !ln.test(value) && !tagHooks[(strings.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                        value = self.htmlPrefilter(value);
                        try {
                            for (;i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (self.cleanData(getAll(elem, !1)),
                                elem.innerHTML = value);
                            elem = 0;
                        } catch (s) {}
                    }
                    elem && this.empty().append(value);
                }, null, value, arguments.length);
            },
            replaceWith: function() {
                var data = [];
                return on(this, arguments, function(node) {
                    var parent = this.parentNode;
                    self.inArray(this, data) < 0 && (self.cleanData(getAll(this)), parent && parent.replaceChild(node, this));
                }, data);
            }
        }), self.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, method) {
            self.fn[name] = function(name) {
                for (var r, v = [], b = self(name), l = b.length - 1, c = 0; c <= l; c++) r = c === l ? this : this.clone(!0),
                    self(b[c])[method](r), modElem.apply(v, r.get());
                return this.pushStack(v);
            };
        });
        var rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(element) {
            var win = element.ownerDocument.defaultView;
            return win && win.opener || (win = global), win.getComputedStyle(element);
        };
        !function() {
            function computePixelPositionAndBoxSizingReliable() {
                if (div) {
                    div.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                        div.innerHTML = "", elem.appendChild(e);
                    var style = global.getComputedStyle(div);
                    ids = "1%" !== style.top, len = "2px" === style.marginLeft, dataItems = "4px" === style.width,
                        div.style.marginRight = "50%", i = "4px" === style.marginRight, elem.removeChild(e),
                        div = null;
                }
            }
            var ids, dataItems, i, len, e = doc.createElement("div"), div = doc.createElement("div");
            div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "",
                support.clearCloneStyle = "content-box" === div.style.backgroundClip, e.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
                e.appendChild(div), self.extend(support, {
                pixelPosition: function() {
                    return computePixelPositionAndBoxSizingReliable(), ids;
                },
                boxSizingReliable: function() {
                    return computePixelPositionAndBoxSizingReliable(), dataItems;
                },
                pixelMarginRight: function() {
                    return computePixelPositionAndBoxSizingReliable(), i;
                },
                reliableMarginLeft: function() {
                    return computePixelPositionAndBoxSizingReliable(), len;
                }
            }));
        }();
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, type = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, controls = {
            letterSpacing: "0",
            fontWeight: "400"
        }, prefixes = [ "Webkit", "Moz", "ms" ], style = doc.createElement("div").style;
        self.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret;
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = self.camelCase(name), attr = elem.style;
                    return name = self.cssProps[origName] || (self.cssProps[origName] = vendor(origName) || origName),
                        hooks = self.cssHooks[name] || self.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : attr[name] : (type = typeof value,
                        "string" === type && (ret = re.exec(value)) && ret[1] && (value = transform(elem, name, ret),
                            type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (self.cssNumber[origName] ? "" : "px")),
                        support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (attr[name] = "inherit"),
                        hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (attr[name] = value)),
                            void 0);
                }
            },
            css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = self.camelCase(name);
                return name = self.cssProps[origName] || (self.cssProps[origName] = vendor(origName) || origName),
                    hooks = self.cssHooks[name] || self.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)),
                void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in controls && (val = controls[name]),
                    "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val;
            }
        }), self.each([ "height", "width" ], function(i, name) {
            self.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) return !rdisplayswap.test(self.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? getWidthOrHeight(elem, name, extra) : swap(elem, type, function() {
                            return getWidthOrHeight(elem, name, extra);
                        });
                },
                set: function(elem, value, extra) {
                    var match, styles = extra && getStyles(elem), id = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === self.css(elem, "boxSizing", !1, styles), styles);
                    return id && (match = re.exec(value)) && "px" !== (match[3] || "px") && (elem.style[name] = value,
                        value = self.css(elem, name)), setPositiveNumber(elem, value, id);
                }
            };
        }), self.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
            if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                    marginLeft: 0
                }, function() {
                    return elem.getBoundingClientRect().left;
                })) + "px";
        }), self.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            self.cssHooks[prefix + suffix] = {
                expand: function(line) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof line ? line.split(" ") : [ line ]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded;
                }
            }, rmargin.test(prefix) || (self.cssHooks[prefix + suffix].set = setPositiveNumber);
        }), self.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (self.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = self.css(elem, name[i], !1, styles);
                        return map;
                    }
                    return void 0 !== value ? self.style(elem, name, value) : self.css(elem, name);
                }, name, value, arguments.length > 1);
            }
        }), self.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || self.easing._default,
                    this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (self.cssNumber[prop] ? "" : "px");
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = eased = self.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent,
                    this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this),
                    hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = self.css(tween.elem, tween.prop, ""),
                            result && "auto" !== result ? result : 0);
                },
                set: function(tween) {
                    self.fx.step[tween.prop] ? self.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[self.cssProps[tween.prop]] && !self.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : self.style(tween.elem, tween.prop, tween.now + tween.unit);
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
            }
        }, self.easing = {
            linear: function(pos) {
                return pos;
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        }, self.fx = Tween.prototype.init, self.fx.step = {};
        var i, target, item = /^(?:toggle|show|hide)$/, action = /queueHooks$/;
        self.Animation = self.extend(Animation, {
            tweeners: {
                "*": [ function(type, data) {
                    var evt = this.createTween(type, data);
                    return transform(evt.elem, type, re.exec(data), evt), evt;
                } ]
            },
            tweener: function(props, callback) {
                self.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.match(core_rnotwhite);
                for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index],
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback);
            },
            prefilters: [ defaultPrefilter ],
            prefilter: function(text, prepend) {
                prepend ? Animation.prefilters.unshift(text) : Animation.prefilters.push(text);
            }
        }), self.speed = function(data, attr, value) {
            var opt = data && "object" == typeof data ? self.extend({}, data) : {
                    complete: value || !value && attr || self.isFunction(data) && data,
                    duration: data,
                    easing: value && attr || attr && !self.isFunction(attr) && attr
                };
            return self.fx.off || doc.hidden ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in self.fx.speeds ? opt.duration = self.fx.speeds[opt.duration] : opt.duration = self.fx.speeds._default),
            null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete,
                opt.complete = function() {
                    self.isFunction(opt.old) && opt.old.call(this), opt.queue && self.dequeue(this, opt.queue);
                }, opt;
        }, self.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback);
            },
            animate: function(prop, speed, easing, callback) {
                var empty = self.isEmptyObject(prop), optall = self.speed(speed, easing, callback), doAnimation = function() {
                    var anim = Animation(this, self.extend({}, prop), optall);
                    (empty || data_user.get(this, "finish")) && anim.stop(!0);
                };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd);
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0),
                clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0, index = null != type && type + "queueHooks", timers = self.timers, data = data_user.get(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && action.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd),
                        dequeue = !1, timers.splice(index, 1));
                    !dequeue && gotoEnd || self.dequeue(this, type);
                });
            },
            finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                    var index, data = data_user.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = self.timers, length = queue ? queue.length : 0;
                    for (data.finish = !0, self.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0),
                             index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0),
                        timers.splice(index, 1));
                    for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish;
                });
            }
        }), self.each([ "toggle", "show", "hide" ], function(i, name) {
            var cssFn = self.fn[name];
            self.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
            };
        }), self.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(method, description) {
            self.fn[method] = function(callback, data, t) {
                return this.animate(description, callback, data, t);
            };
        }), self.timers = [], self.fx.tick = function() {
            var handler, j = 0, handlers = self.timers;
            for (i = self.now(); j < handlers.length; j++) handler = handlers[j], handler() || handlers[j] !== handler || handlers.splice(j--, 1);
            handlers.length || self.fx.stop(), i = void 0;
        }, self.fx.timer = function(callback) {
            self.timers.push(callback), callback() ? self.fx.start() : self.timers.pop();
        }, self.fx.interval = 13, self.fx.start = function() {
            target || (target = global.requestAnimationFrame ? global.requestAnimationFrame(raf) : global.setInterval(self.fx.tick, self.fx.interval));
        }, self.fx.stop = function() {
            global.cancelAnimationFrame ? global.cancelAnimationFrame(target) : global.clearInterval(target),
                target = null;
        }, self.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, self.fn.delay = function(time, type) {
            return time = self.fx ? self.fx.speeds[time] || time : time, type = type || "fx",
                this.queue(type, function(next, hooks) {
                    var timeout = global.setTimeout(next, time);
                    hooks.stop = function() {
                        global.clearTimeout(timeout);
                    };
                });
        }, function() {
            var input = doc.createElement("input"), select = doc.createElement("select"), opt = select.appendChild(doc.createElement("option"));
            input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected,
                input = doc.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
        }();
        var boolHook, options = self.expr.attrHandle;
        self.fn.extend({
            attr: function(name, value) {
                return access(this, self.attr, name, value, arguments.length > 1);
            },
            removeAttr: function(name) {
                return this.each(function() {
                    self.removeAttr(this, name);
                });
            }
        }), self.extend({
            attr: function(elem, name, value) {
                var val, hooks, nodeType = elem.nodeType;
                if (3 !== nodeType && 8 !== nodeType && 2 !== nodeType) return "undefined" == typeof elem.getAttribute ? self.prop(elem, name, value) : (1 === nodeType && self.isXMLDoc(elem) || (hooks = self.attrHooks[name.toLowerCase()] || (self.expr.match.bool.test(name) ? boolHook : void 0)),
                        void 0 !== value ? null === value ? void self.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (val = hooks.set(elem, value, name)) ? val : (elem.setAttribute(name, value + ""),
                                        value) : hooks && "get" in hooks && null !== (val = hooks.get(elem, name)) ? val : (val = self.find.attr(elem, name),
                                    null == val ? void 0 : val));
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && "radio" === value && self.nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value;
                        }
                    }
                }
            },
            removeAttr: function(form, value) {
                var n, index = 0, nodes = value && value.match(core_rnotwhite);
                if (nodes && 1 === form.nodeType) for (;n = nodes[index++]; ) form.removeAttribute(n);
            }
        }), boolHook = {
            set: function(node, val, name) {
                return val === !1 ? self.removeAttr(node, name) : node.setAttribute(name, name),
                    name;
            }
        }, self.each(self.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var bind = options[name] || self.find.attr;
            options[name] = function(event, ui, callback) {
                var value, option, key = ui.toLowerCase();
                return callback || (option = options[key], options[key] = value, value = null != bind(event, ui, callback) ? key : null,
                    options[key] = option), value;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rformElems = /^(?:a|area)$/i;
        self.fn.extend({
            prop: function(name, value) {
                return access(this, self.prop, name, value, arguments.length > 1);
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[self.propFix[name] || name];
                });
            }
        }), self.extend({
            prop: function(elem, name, value) {
                var ret, hooks, nodeType = elem.nodeType;
                if (3 !== nodeType && 8 !== nodeType && 2 !== nodeType) return 1 === nodeType && self.isXMLDoc(elem) || (name = self.propFix[name] || name,
                    hooks = self.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var tabindex = self.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rformElems.test(elem.nodeName) && elem.href ? 0 : -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), support.optSelected || (self.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
            },
            set: function(upel) {
                var el = upel.parentNode;
                el && (el.selectedIndex, el.parentNode && el.parentNode.selectedIndex);
            }
        }), self.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
            self.propFix[this.toLowerCase()] = this;
        }), self.fn.extend({
            addClass: function(value) {
                var names, a, p, len, name, i, c, index = 0;
                if (self.isFunction(value)) return this.each(function(idx) {
                    self(this).addClass(value.call(this, idx, getData(this)));
                });
                if ("string" == typeof value && value) for (names = value.match(core_rnotwhite) || []; a = this[index++]; ) if (len = getData(a),
                        p = 1 === a.nodeType && " " + trim(len) + " ") {
                    for (i = 0; name = names[i++]; ) p.indexOf(" " + name + " ") < 0 && (p += name + " ");
                    c = trim(p), len !== c && a.setAttribute("class", c);
                }
                return this;
            },
            removeClass: function(callback) {
                var names, node, text, len, name, i, value, index = 0;
                if (self.isFunction(callback)) return this.each(function(idx) {
                    self(this).removeClass(callback.call(this, idx, getData(this)));
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof callback && callback) for (names = callback.match(core_rnotwhite) || []; node = this[index++]; ) if (len = getData(node),
                        text = 1 === node.nodeType && " " + trim(len) + " ") {
                    for (i = 0; name = names[i++]; ) for (;text.indexOf(" " + name + " ") > -1; ) text = text.replace(" " + name + " ", " ");
                    value = trim(text), len !== value && node.setAttribute("class", value);
                }
                return this;
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : self.isFunction(value) ? this.each(function(i) {
                            self(this).toggleClass(value.call(this, i, getData(this), stateVal), stateVal);
                        }) : this.each(function() {
                            var className, i, el, classNames;
                            if ("string" === type) for (i = 0, el = self(this), classNames = value.match(core_rnotwhite) || []; className = classNames[i++]; ) el.hasClass(className) ? el.removeClass(className) : el.addClass(className); else void 0 !== value && "boolean" !== type || (className = getData(this),
                            className && data_user.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : data_user.get(this, "__className__") || ""));
                        });
            },
            hasClass: function(selector) {
                var code, node, i = 0;
                for (code = " " + selector + " "; node = this[i++]; ) if (1 === node.nodeType && (" " + trim(getData(node)) + " ").indexOf(code) > -1) return !0;
                return !1;
            }
        });
        var rreturn = /\r/g;
        self.fn.extend({
            val: function(value) {
                var hooks, ret, isFunction, elem = this[0];
                {
                    if (arguments.length) return isFunction = self.isFunction(value), this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, self(this).val()) : value,
                            null == val ? val = "" : "number" == typeof val ? val += "" : self.isArray(val) && (val = self.map(val, function(val) {
                                        return null == val ? "" : val + "";
                                    })), hooks = self.valHooks[this.type] || self.valHooks[this.nodeName.toLowerCase()],
                        hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                    });
                    if (elem) return hooks = self.valHooks[elem.type] || self.valHooks[elem.nodeName.toLowerCase()],
                        hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value,
                                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
                }
            }
        }), self.extend({
            valHooks: {
                option: {
                    get: function(key) {
                        var value = self.find.attr(key, "value");
                        return null != value ? value : trim(self.text(key));
                    }
                },
                select: {
                    get: function(elem) {
                        var value, option, i, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type, result = one ? null : [], max = one ? index + 1 : options.length;
                        for (i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i],
                            (option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !self.nodeName(option.parentNode, "optgroup"))) {
                            if (value = self(option).val(), one) return value;
                            result.push(value);
                        }
                        return result;
                    },
                    set: function(elem, value) {
                        for (var optionSet, option, options = elem.options, values = self.makeArray(value), i = options.length; i--; ) option = options[i],
                        (option.selected = self.inArray(self.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                        return optionSet || (elem.selectedIndex = -1), values;
                    }
                }
            }
        }), self.each([ "radio", "checkbox" ], function() {
            self.valHooks[this] = {
                set: function(name, value) {
                    if (self.isArray(value)) return name.checked = self.inArray(self(name).val(), value) > -1;
                }
            }, support.checkOn || (self.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value;
            });
        });
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        self.extend(self.event, {
            trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || doc ], type = tests.call(event, "type") ? event.type : event, namespaces = tests.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || doc, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + self.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."),
                        type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type,
                        event = event[self.expando] ? event : new self.Event(type, "object" == typeof event && event),
                        event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."),
                        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                        event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : self.makeArray(data, [ event ]),
                        special = self.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                    if (!onlyHandlers && !special.noBubble && !self.isWindow(elem)) {
                        for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur),
                            tmp = cur;
                        tmp === (elem.ownerDocument || doc) && eventPath.push(tmp.defaultView || tmp.parentWindow || global);
                    }
                    for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type,
                        handle = (data_user.get(cur, "events") || {})[event.type] && data_user.get(cur, "handle"),
                    handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && isNode(cur) && (event.result = handle.apply(cur, data),
                    event.result === !1 && event.preventDefault());
                    return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !isNode(elem) || ontype && self.isFunction(elem[type]) && !self.isWindow(elem) && (tmp = elem[ontype],
                    tmp && (elem[ontype] = null), self.event.triggered = type, elem[type](), self.event.triggered = void 0,
                    tmp && (elem[ontype] = tmp)), event.result;
                }
            },
            simulate: function(elem, el, event) {
                var e = self.extend(new self.Event(), event, {
                    type: elem,
                    isSimulated: !0
                });
                self.event.trigger(e, null, el);
            }
        }), self.fn.extend({
            trigger: function(type, data) {
                return this.each(function() {
                    self.event.trigger(type, data, this);
                });
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                if (elem) return self.event.trigger(type, data, elem, !0);
            }
        }), self.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(i, name) {
            self.fn[name] = function(data, callback) {
                return arguments.length > 0 ? this.on(name, null, data, callback) : this.trigger(name);
            };
        }), self.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
        }), support.focusin = "onfocusin" in global, support.focusin || self.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                self.event.simulate(fix, event.target, self.event.fix(event));
            };
            self.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = data_user.access(doc, fix);
                    attaches || doc.addEventListener(orig, handler, !0), data_user.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = data_user.access(doc, fix) - 1;
                    attaches ? data_user.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0),
                            data_user.remove(doc, fix));
                }
            };
        });
        var loc = global.location, jsc = self.now(), rquery = /\?/;
        self.parseXML = function(data) {
            var xml;
            if (!data || "string" != typeof data) return null;
            try {
                xml = new global.DOMParser().parseFromString(data, "text/xml");
            } catch (n) {
                xml = void 0;
            }
            return xml && !xml.getElementsByTagName("parsererror").length || self.error("Invalid XML: " + data),
                xml;
        };
        var excludeNames = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        self.param = function(obj, traditional) {
            var name, s = [], add = function(key, value) {
                var item = self.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(null == item ? "" : item);
            };
            if (self.isArray(obj) || obj.jquery && !self.isPlainObject(obj)) self.each(obj, function() {
                add(this.name, this.value);
            }); else for (name in obj) serialize(name, obj[name], traditional, add);
            return s.join("&");
        }, self.fn.extend({
            serialize: function() {
                return self.param(this.serializeArray());
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = self.prop(this, "elements");
                    return elements ? self.makeArray(elements) : this;
                }).filter(function() {
                    var type = this.type;
                    return this.name && !self(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !mime.test(type));
                }).map(function(i, elem) {
                    var val = self(this).val();
                    return null == val ? null : self.isArray(val) ? self.map(val, function(val) {
                                return {
                                    name: elem.name,
                                    value: val.replace(rCRLF, "\r\n")
                                };
                            }) : {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                }).get();
            }
        });
        var r = /%20/g, f = /#.*$/, l = /([?&])_=[^&]*/, j = /^(.*?):[ \t]*([^\r\n]*)$/gm, k = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, els = /^(?:GET|HEAD)$/, path = /^\/\//, p = {}, n = {}, allTypes = "*/".concat("*"), uri = doc.createElement("a");
        uri.href = loc.href, self.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: loc.href,
                type: "GET",
                isLocal: k.test(loc.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": self.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, self.ajaxSettings), settings) : ajaxExtend(self.ajaxSettings, target);
            },
            ajaxPrefilter: emit(p),
            ajaxTransport: emit(n),
            ajax: function(o, options) {
                function done(status, nativeStatusText, responses, nameOrUrl) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    i || (i = !0, id && global.clearTimeout(id), data = void 0, url = nameOrUrl || "",
                        jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && status < 300 || 304 === status,
                    responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess),
                        isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"),
                            modified && (self.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"),
                            modified && (self.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state,
                                        success = response.data, error = response.error, isSuccess = !error)) : (error = statusText,
                            !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status,
                        jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]),
                        jqXHR.statusCode(keys), keys = void 0, y && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]),
                        completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), y && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]),
                    --self.active || self.event.trigger("ajaxStop")));
                }
                "object" == typeof o && (options = o, o = void 0), options = options || {};
                var data, cacheURL, url, responseHeaders, id, a, i, y, key, k, s = self.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? self(callbackContext) : self.event, deferred = self.Deferred(), completeDeferred = self.Callbacks("once memory"), keys = s.statusCode || {}, v = {}, requestHeadersNames = {}, propertyName = "canceled", jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(prop) {
                        var match;
                        if (i) {
                            if (!responseHeaders) for (responseHeaders = {}; match = j.exec(url); ) responseHeaders[match[1].toLowerCase()] = match[2];
                            match = responseHeaders[prop.toLowerCase()];
                        }
                        return null == match ? null : match;
                    },
                    getAllResponseHeaders: function() {
                        return i ? url : null;
                    },
                    setRequestHeader: function(name, value) {
                        return null == i && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name,
                            v[name] = value), this;
                    },
                    overrideMimeType: function(type) {
                        return null == i && (s.mimeType = type), this;
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) if (i) jqXHR.always(map[jqXHR.status]); else for (code in map) keys[code] = [ keys[code], map[code] ];
                        return this;
                    },
                    abort: function(opt_attrName) {
                        var name = opt_attrName || propertyName;
                        return data && data.abort(name), done(0, name), this;
                    }
                };
                if (deferred.promise(jqXHR), s.url = ((o || s.url || loc.href) + "").replace(path, loc.protocol + "//"),
                        s.type = options.method || options.type || s.method || s.type, s.dataTypes = (s.dataType || "*").toLowerCase().match(core_rnotwhite) || [ "" ],
                    null == s.crossDomain) {
                    a = doc.createElement("a");
                    try {
                        a.href = s.url, a.href = a.href, s.crossDomain = uri.protocol + "//" + uri.host != a.protocol + "//" + a.host;
                    } catch (e) {
                        s.crossDomain = !0;
                    }
                }
                if (s.data && s.processData && "string" != typeof s.data && (s.data = self.param(s.data, s.traditional)),
                        reset(p, s, options, jqXHR), i) return jqXHR;
                y = self.event && s.global, y && 0 === self.active++ && self.event.trigger("ajaxStart"),
                    s.type = s.type.toUpperCase(), s.hasContent = !els.test(s.type), cacheURL = s.url.replace(f, ""),
                    s.hasContent ? s.data && s.processData && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (s.data = s.data.replace(r, "+")) : (k = s.url.slice(cacheURL.length),
                        s.data && (cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data),
                        s.cache === !1 && (cacheURL = cacheURL.replace(l, "$1"), k = (rquery.test(cacheURL) ? "&" : "?") + "_=" + jsc++ + k),
                            s.url = cacheURL + k), s.ifModified && (self.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", self.lastModified[cacheURL]),
                self.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", self.etag[cacheURL])),
                (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
                    jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (key in s.headers) jqXHR.setRequestHeader(key, s.headers[key]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || i)) return jqXHR.abort();
                if (propertyName = "abort", completeDeferred.add(s.complete), jqXHR.done(s.success),
                        jqXHR.fail(s.error), data = reset(n, s, options, jqXHR)) {
                    if (jqXHR.readyState = 1, y && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]),
                            i) return jqXHR;
                    s.async && s.timeout > 0 && (id = global.setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout));
                    try {
                        i = !1, data.send(v, done);
                    } catch (e) {
                        if (i) throw e;
                        done(-1, e);
                    }
                } else done(-1, "No Transport");
                return jqXHR;
            },
            getJSON: function(url, callback, errorCallback) {
                return self.get(url, callback, errorCallback, "json");
            },
            getScript: function(key, callback) {
                return self.get(key, void 0, callback, "script");
            }
        }), self.each([ "get", "post" ], function(i, method) {
            self[method] = function(url, data, callback, type) {
                return self.isFunction(data) && (type = type || callback, callback = data, data = void 0),
                    self.ajax(self.extend({
                        url: url,
                        type: method,
                        dataType: type,
                        data: data,
                        success: callback
                    }, self.isPlainObject(url) && url));
            };
        }), self._evalUrl = function(url) {
            return self.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            });
        }, self.fn.extend({
            wrapAll: function(html) {
                var wrap;
                return this[0] && (self.isFunction(html) && (html = html.call(this[0])), wrap = self(html, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                    return elem;
                }).append(this)), this;
            },
            wrapInner: function(newContent) {
                return self.isFunction(newContent) ? this.each(function(i) {
                        self(this).wrapInner(newContent.call(this, i));
                    }) : this.each(function() {
                        var prev = self(this), contents = prev.contents();
                        contents.length ? contents.wrapAll(newContent) : prev.append(newContent);
                    });
            },
            wrap: function(html) {
                var isFunction = self.isFunction(html);
                return this.each(function(i) {
                    self(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function(node) {
                return this.parent(node).not("body").each(function() {
                    self(this).replaceWith(this.childNodes);
                }), this;
            }
        }), self.expr.pseudos.hidden = function(elem) {
            return !self.expr.pseudos.visible(elem);
        }, self.expr.pseudos.visible = function(el) {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        }, self.ajaxSettings.xhr = function() {
            try {
                return new global.XMLHttpRequest();
            } catch (e) {}
        };
        var xhrSuccessStatus = {
            0: 200,
            1223: 204
        }, xhrSupported = self.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported,
            self.ajaxTransport(function(options) {
                var callback, next;
                if (support.cors || xhrSupported && !options.crossDomain) return {
                    send: function(headers, complete) {
                        var i, xhr = options.xhr();
                        if (xhr.open(options.type, options.url, options.async, options.username, options.password),
                                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                        options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType),
                        options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                        callback = function(form) {
                            return function() {
                                callback && (callback = next = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null,
                                    "abort" === form ? xhr.abort() : "error" === form ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                                                    binary: xhr.response
                                                } : {
                                                    text: xhr.responseText
                                                }, xhr.getAllResponseHeaders()));
                            };
                        }, xhr.onload = callback(), next = xhr.onerror = callback("error"), void 0 !== xhr.onabort ? xhr.onabort = next : xhr.onreadystatechange = function() {
                                4 === xhr.readyState && global.setTimeout(function() {
                                    callback && next();
                                });
                            }, callback = callback("abort");
                        try {
                            xhr.send(options.hasContent && options.data || null);
                        } catch (errstr) {
                            if (callback) throw errstr;
                        }
                    },
                    abort: function() {
                        callback && callback();
                    }
                };
            }), self.ajaxPrefilter(function(options) {
            options.crossDomain && (options.contents.script = !1);
        }), self.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(text) {
                    return self.globalEval(text), text;
                }
            }
        }), self.ajaxPrefilter("script", function(s) {
            void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
        }), self.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function(_, complete) {
                        script = self("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                        }), doc.head.appendChild(script[0]);
                    },
                    abort: function() {
                        callback && callback();
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        self.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || self.expando + "_" + jsc++;
                return this[callback] = !0, callback;
            }
        }), self.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, handler, listener, i = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (i || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = self.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
                i ? s[i] = s[i].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
                s.converters["script json"] = function() {
                    return listener || self.error(callbackName + " was not called"), listener[0];
                }, s.dataTypes[0] = "json", handler = global[callbackName], global[callbackName] = function() {
                listener = arguments;
            }, jqXHR.always(function() {
                void 0 === handler ? self(global).removeProp(callbackName) : global[callbackName] = handler,
                s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)),
                listener && self.isFunction(handler) && handler(listener[0]), listener = handler = void 0;
            }), "script";
        }), support.createHTMLDocument = function() {
            var elem = doc.implementation.createHTMLDocument("").body;
            return elem.innerHTML = "<form></form><form></form>", 2 === elem.childNodes.length;
        }(), self.parseHTML = function(data, context, keepScripts) {
            if ("string" != typeof data) return [];
            "boolean" == typeof context && (keepScripts = context, context = !1);
            var dom, match, options;
            return context || (support.createHTMLDocument ? (context = doc.implementation.createHTMLDocument(""),
                    dom = context.createElement("base"), dom.href = doc.location.href, context.head.appendChild(dom)) : context = doc),
                match = result.exec(data), options = !keepScripts && [], match ? [ context.createElement(match[1]) ] : (match = add([ data ], context, options),
                options && options.length && self(options).remove(), self.merge([], match.childNodes));
        }, self.fn.load = function(id, selector, callback) {
            var str, type, response, collection = this, index = id.indexOf(" ");
            return index > -1 && (str = trim(id.slice(index)), id = id.slice(0, index)), self.isFunction(selector) ? (callback = selector,
                    selector = void 0) : selector && "object" == typeof selector && (type = "POST"),
            collection.length > 0 && self.ajax({
                url: id,
                type: type || "GET",
                dataType: "html",
                data: selector
            }).done(function(msg) {
                response = arguments, collection.html(str ? self("<div>").append(self.parseHTML(msg)).find(str) : msg);
            }).always(callback && function(jqXHR, status) {
                    collection.each(function() {
                        callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
                    });
                }), this;
        }, self.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
            self.fn[type] = function(callback) {
                return this.on(type, callback);
            };
        }), self.expr.pseudos.animated = function(el) {
            return self.grep(self.timers, function(node) {
                return el === node.elem;
            }).length;
        }, self.offset = {
            setOffset: function(elem, options, value) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = self.css(elem, "position"), curElem = self(elem), props = {};
                "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(),
                    curCSSTop = self.css(elem, "top"), curCSSLeft = self.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1,
                    calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top,
                            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0),
                self.isFunction(options) && (options = options.call(elem, value, self.extend({}, curOffset))),
                null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft),
                    "using" in options ? options.using.call(elem, props) : curElem.css(props);
            }
        }, self.fn.extend({
            offset: function(options) {
                if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                        self.offset.setOffset(this, options, i);
                    });
                var doc, obj, pos, i, x = this[0];
                if (x) return x.getClientRects().length ? (pos = x.getBoundingClientRect(), pos.width || pos.height ? (i = x.ownerDocument,
                            obj = getWindow(i), doc = i.documentElement, {
                            top: pos.top + obj.pageYOffset - doc.clientTop,
                            left: pos.left + obj.pageXOffset - doc.clientLeft
                        }) : pos) : {
                        top: 0,
                        left: 0
                    };
            },
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, elem = this[0], parentOffset = {
                        top: 0,
                        left: 0
                    };
                    return "fixed" === self.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(),
                            offset = this.offset(), self.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()),
                            parentOffset = {
                                top: parentOffset.top + self.css(offsetParent[0], "borderTopWidth", !0),
                                left: parentOffset.left + self.css(offsetParent[0], "borderLeftWidth", !0)
                            }), {
                        top: offset.top - parentOffset.top - self.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - self.css(elem, "marginLeft", !0)
                    };
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var el = this.offsetParent; el && "static" === self.css(el, "position"); ) el = el.offsetParent;
                    return el || elem;
                });
            }
        }), self.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            self.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val);
                }, method, val, arguments.length);
            };
        }), self.each([ "top", "left" ], function(i, prop) {
            self.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? self(elem).position()[prop] + "px" : computed;
            });
        }), self.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            self.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                self.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        return self.isWindow(elem) ? 0 === funcName.indexOf("outer") ? elem["inner" + name] : elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement,
                                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? self.css(elem, type, extra) : self.style(elem, type, value, extra);
                    }, type, chainable ? margin : void 0, chainable);
                };
            });
        }), self.fn.extend({
            bind: function(event, data, callback) {
                return this.on(event, null, data, callback);
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function(selector, types, fn) {
                return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
            }
        }), self.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
            return self;
        });
        var _oldJQuery = global.jQuery, _old$ = global.$;
        return self.noConflict = function(newName) {
            return global.$ === self && (global.$ = _old$), newName && global.jQuery === self && (global.jQuery = _oldJQuery),
                self;
        }, b || (global.jQuery = global.$ = self), self;
    }), function(factory) {
        "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory(jQuery);
    }(function(test) {
        function callback(target) {
            for (var visibility = target.css("visibility"); "inherit" === visibility; ) target = target.parent(),
                visibility = target.css("visibility");
            return "hidden" !== visibility;
        }
        function datepicker_getZindex(elem) {
            for (var position, value; elem.length && elem[0] !== document; ) {
                if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10),
                    !isNaN(value) && 0 !== value)) return value;
                elem = elem.parent();
            }
            return 0;
        }
        function Datepicker() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1,
                this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline",
                this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger",
                this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled",
                this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day",
                this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, test.extend(this._defaults, this.regional[""]), this.regional.en = test.extend(!0, {}, this.regional[""]),
                this.regional["en-US"] = test.extend(!0, {}, this.regional.en), this.dpDiv = bindHover(test("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
        }
        function bindHover(s) {
            var callback = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return s.on("mouseout", callback, function() {
                test(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && test(this).removeClass("ui-datepicker-prev-hover"),
                this.className.indexOf("ui-datepicker-next") !== -1 && test(this).removeClass("ui-datepicker-next-hover");
            }).on("mouseover", callback, f);
        }
        function f() {
            test.datepicker._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0]) || (test(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                test(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && test(this).addClass("ui-datepicker-prev-hover"),
            this.className.indexOf("ui-datepicker-next") !== -1 && test(this).addClass("ui-datepicker-next-hover"));
        }
        function extendRemove(a, b) {
            test.extend(a, b);
            for (var key in b) null == b[key] && (a[key] = b[key]);
            return a;
        }
        function modifier(fn) {
            return function() {
                var previous = this.element.val();
                fn.apply(this, arguments), this._refresh(), previous !== this.element.val() && this._trigger("change");
            };
        }
        test.ui = test.ui || {};
        var widget_uuid = (test.ui.version = "1.12.1", 0), slice = Array.prototype.slice;
        test.cleanData = function(handleJSON) {
            return function(data) {
                var options, d, i;
                for (i = 0; null != (d = data[i]); i++) try {
                    options = test._data(d, "events"), options && options.remove && test(d).triggerHandler("remove");
                } catch (r) {}
                handleJSON(data);
            };
        }(test.cleanData), test.widget = function(name, base, options) {
            var existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split(".")[0];
            name = name.split(".")[1];
            var fullName = namespace + "-" + name;
            return options || (options = base, base = test.Widget), test.isArray(options) && (options = test.extend.apply(null, [ {} ].concat(options))),
                test.expr[":"][fullName.toLowerCase()] = function(elem) {
                    return !!test.data(elem, fullName);
                }, test[namespace] = test[namespace] || {}, existingConstructor = test[namespace][name],
                constructor = test[namespace][name] = function(options, element) {
                    return this._createWidget ? void (arguments.length && this._createWidget(options, element)) : new constructor(options, element);
                }, test.extend(constructor, existingConstructor, {
                version: options.version,
                _proto: test.extend({}, options),
                _childConstructors: []
            }), basePrototype = new base(), basePrototype.options = test.widget.extend({}, basePrototype.options),
                test.each(options, function(prop, value) {
                    return test.isFunction(value) ? void (proxiedPrototype[prop] = function() {
                            function superMethod() {
                                return base.prototype[prop].apply(this, arguments);
                            }
                            function _superApply(args) {
                                return base.prototype[prop].apply(this, args);
                            }
                            return function() {
                                var o, _super = this._super, a = this._superApply;
                                return this._super = superMethod, this._superApply = _superApply, o = value.apply(this, arguments),
                                    this._super = _super, this._superApply = a, o;
                            };
                        }()) : void (proxiedPrototype[prop] = value);
                }), constructor.prototype = test.widget.extend(basePrototype, {
                widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
            }, proxiedPrototype, {
                constructor: constructor,
                namespace: namespace,
                widgetName: name,
                widgetFullName: fullName
            }), existingConstructor ? (test.each(existingConstructor._childConstructors, function(i, child) {
                    var childPrototype = child.prototype;
                    test.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
                }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor),
                test.widget.bridge(name, constructor), constructor;
        }, test.widget.extend = function(target) {
            for (var key, value, buffer = slice.call(arguments, 1), i = 0, l = buffer.length; i < l; i++) for (key in buffer[i]) value = buffer[i][key],
            buffer[i].hasOwnProperty(key) && void 0 !== value && (test.isPlainObject(value) ? target[key] = test.isPlainObject(target[key]) ? test.widget.extend({}, target[key], value) : test.widget.extend({}, value) : target[key] = value);
            return target;
        }, test.widget.bridge = function(name, object) {
            var fullName = object.prototype.widgetFullName || name;
            test.fn[name] = function(options) {
                var isMethodCall = "string" == typeof options, args = slice.call(arguments, 1), returnValue = this;
                return isMethodCall ? this.length || "instance" !== options ? this.each(function() {
                            var methodValue, instance = test.data(this, fullName);
                            return "instance" === options ? (returnValue = instance, !1) : instance ? test.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args),
                                            methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue,
                                                    !1) : void 0) : test.error("no such method '" + options + "' for " + name + " widget instance") : test.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'");
                        }) : returnValue = void 0 : (args.length && (options = test.widget.extend.apply(null, [ options ].concat(args))),
                        this.each(function() {
                            var instance = test.data(this, fullName);
                            instance ? (instance.option(options || {}), instance._init && instance._init()) : test.data(this, fullName, new object(options, this));
                        })), returnValue;
            };
        }, test.Widget = function() {}, test.Widget._childConstructors = [], test.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(options, element) {
                element = test(element || this.defaultElement || this)[0], this.element = test(element),
                    this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid,
                    this.bindings = test(), this.hoverable = test(), this.focusable = test(), this.classesElementLookup = {},
                element !== this && (test.data(element, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(event) {
                        event.target === element && this.destroy();
                    }
                }), this.document = test(element.style ? element.ownerDocument : element.document || element),
                    this.window = test(this.document[0].defaultView || this.document[0].parentWindow)),
                    this.options = test.widget.extend({}, this.options, this._getCreateOptions(), options),
                    this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled),
                    this._trigger("create", null, this._getCreateEventData()), this._init();
            },
            _getCreateOptions: function() {
                return {};
            },
            _getCreateEventData: test.noop,
            _create: test.noop,
            _init: test.noop,
            destroy: function() {
                var self = this;
                this._destroy(), test.each(this.classesElementLookup, function(msg, elem) {
                    self._removeClass(elem, msg);
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
                    this.bindings.off(this.eventNamespace);
            },
            _destroy: test.noop,
            widget: function() {
                return this.element;
            },
            option: function(key, value) {
                var arr, obj, i, options = key;
                if (0 === arguments.length) return test.widget.extend({}, this.options);
                if ("string" == typeof key) if (options = {}, arr = key.split("."), key = arr.shift(),
                        arr.length) {
                    for (obj = options[key] = test.widget.extend({}, this.options[key]), i = 0; i < arr.length - 1; i++) obj[arr[i]] = obj[arr[i]] || {},
                        obj = obj[arr[i]];
                    if (key = arr.pop(), 1 === arguments.length) return void 0 === obj[key] ? null : obj[key];
                    obj[key] = value;
                } else {
                    if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
                    options[key] = value;
                }
                return this._setOptions(options), this;
            },
            _setOptions: function(options) {
                var key;
                for (key in options) this._setOption(key, options[key]);
                return this;
            },
            _setOption: function(key, value) {
                return "classes" === key && this._setOptionClasses(value), this.options[key] = value,
                "disabled" === key && this._setOptionDisabled(value), this;
            },
            _setOptionClasses: function(attr) {
                var name, m, s;
                for (name in attr) s = this.classesElementLookup[name], attr[name] !== this.options.classes[name] && s && s.length && (m = test(s.get()),
                    this._removeClass(s, name), m.addClass(this._classes({
                    element: m,
                    keys: name,
                    classes: attr,
                    add: !0
                })));
            },
            _setOptionDisabled: function(t) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t),
                t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                });
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                });
            },
            _classes: function(params) {
                function init(keys, item) {
                    var source, i;
                    for (i = 0; i < keys.length; i++) source = d.classesElementLookup[keys[i]] || test(),
                        source = test(params.add ? test.unique(source.get().concat(params.element.get())) : source.not(params.element).get()),
                        d.classesElementLookup[keys[i]] = source, results.push(keys[i]), item && params.classes[keys[i]] && results.push(params.classes[keys[i]]);
                }
                var results = [], d = this;
                return params = test.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, params), this._on(params.element, {
                    remove: "_untrackClassesElement"
                }), params.keys && init(params.keys.match(/\S+/g) || [], !0), params.extra && init(params.extra.match(/\S+/g) || []),
                    results.join(" ");
            },
            _untrackClassesElement: function(config) {
                var self = this;
                test.each(self.classesElementLookup, function(callback, x) {
                    test.inArray(config.target, x) !== -1 && (self.classesElementLookup[callback] = test(x.not(config.target).get()));
                });
            },
            _removeClass: function(elem, className, condition) {
                return this._toggleClass(elem, className, condition, !1);
            },
            _addClass: function(elem, className, condition) {
                return this._toggleClass(elem, className, condition, !0);
            },
            _toggleClass: function(tp_inst, obj, unit, val) {
                val = "boolean" == typeof val ? val : unit;
                var json = "string" == typeof tp_inst || null === tp_inst, panel = {
                    extra: json ? obj : unit,
                    keys: json ? tp_inst : obj,
                    element: json ? this.element : tp_inst,
                    add: val
                };
                return panel.element.toggleClass(this._classes(panel), val), this;
            },
            _on: function(suppressDisabledCheck, element, handlers) {
                var delegateElement, instance = this;
                "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck,
                    suppressDisabledCheck = !1), handlers ? (element = delegateElement = test(element),
                        this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element,
                        delegateElement = this.widget()), test.each(handlers, function(commandName, handler) {
                    function handlerProxy() {
                        if (suppressDisabledCheck || instance.options.disabled !== !0 && !test(this).hasClass("ui-state-disabled")) return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments);
                    }
                    "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || test.guid++);
                    var match = commandName.match(/^([\w:-]*)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
                    selector ? delegateElement.on(eventName, selector, handlerProxy) : element.on(eventName, handlerProxy);
                });
            },
            _off: function(element, eventName) {
                eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
                    element.off(eventName).off(eventName), this.bindings = test(this.bindings.not(element).get()),
                    this.focusable = test(this.focusable.not(element).get()), this.hoverable = test(this.hoverable.not(element).get());
            },
            _delay: function(handler, delay) {
                function handlerProxy() {
                    return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments);
                }
                var instance = this;
                return setTimeout(handlerProxy, delay || 0);
            },
            _hoverable: function(element) {
                this.hoverable = this.hoverable.add(element), this._on(element, {
                    mouseenter: function(e) {
                        this._addClass(test(e.currentTarget), null, "ui-state-hover");
                    },
                    mouseleave: function(e) {
                        this._removeClass(test(e.currentTarget), null, "ui-state-hover");
                    }
                });
            },
            _focusable: function(element) {
                this.focusable = this.focusable.add(element), this._on(element, {
                    focusin: function(event) {
                        this._addClass(test(event.currentTarget), null, "ui-state-focus");
                    },
                    focusout: function(event) {
                        this._removeClass(test(event.currentTarget), null, "ui-state-focus");
                    }
                });
            },
            _trigger: function(type, e, data) {
                var i, options, fn = this.options[type];
                if (data = data || {}, e = test.Event(e), e.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(),
                        e.target = this.element[0], options = e.originalEvent) for (i in options) i in e || (e[i] = options[i]);
                return this.element.trigger(e, data), !(test.isFunction(fn) && fn.apply(this.element[0], [ e ].concat(data)) === !1 || e.isDefaultPrevented());
            }
        }, test.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(method, defaultEffect) {
            test.Widget.prototype["_" + method] = function(element, options, callback) {
                "string" == typeof options && (options = {
                    effect: options
                });
                var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
                options = options || {}, "number" == typeof options && (options = {
                    duration: options
                }), hasOptions = !test.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay),
                    hasOptions && test.effects && test.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                                test(this)[method](), callback && callback.call(element[0]), next();
                            });
            };
        });
        test.widget;
        !function() {
            function getOffsets(offsets, width, height) {
                return [ parseFloat(offsets[0]) * (rposition.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rposition.test(offsets[1]) ? height / 100 : 1) ];
            }
            function parseCss(element, property) {
                return parseInt(test.css(element, property), 10) || 0;
            }
            function getDimensions(elem) {
                var raw = elem[0];
                return 9 === raw.nodeType ? {
                        width: elem.width(),
                        height: elem.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : test.isWindow(raw) ? {
                            width: elem.width(),
                            height: elem.height(),
                            offset: {
                                top: elem.scrollTop(),
                                left: elem.scrollLeft()
                            }
                        } : raw.preventDefault ? {
                                width: 0,
                                height: 0,
                                offset: {
                                    top: raw.pageY,
                                    left: raw.pageX
                                }
                            } : {
                                width: elem.outerWidth(),
                                height: elem.outerHeight(),
                                offset: elem.offset()
                            };
            }
            var cachedScrollbarWidth, max = Math.max, abs = Math.abs, round = /left|center|right/, rhorizontal = /top|center|bottom/, rvertical = /[\+\-]\d+(\.[\d]+)?%?/, roffset = /^\w+/, rposition = /%$/, rpercent = test.fn.position;
            test.position = {
                scrollbarWidth: function() {
                    if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
                    var m, n, outer = test("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = outer.children()[0];
                    return test("body").append(outer), m = o.offsetWidth, outer.css("overflow", "scroll"),
                        n = o.offsetWidth, m === n && (n = outer[0].clientWidth), outer.remove(), cachedScrollbarWidth = m - n;
                },
                getScrollInfo: function(within) {
                    var s = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"), d = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"), count = "scroll" === s || "auto" === s && within.width < within.element[0].scrollWidth, q = "scroll" === d || "auto" === d && within.height < within.element[0].scrollHeight;
                    return {
                        width: q ? test.position.scrollbarWidth() : 0,
                        height: count ? test.position.scrollbarWidth() : 0
                    };
                },
                getWithinInfo: function(element) {
                    var node = test(element || window), n = test.isWindow(node[0]), data = !!node[0] && 9 === node[0].nodeType, v = !n && !data;
                    return {
                        element: node,
                        isWindow: n,
                        isDocument: data,
                        offset: v ? test(element).offset() : {
                                left: 0,
                                top: 0
                            },
                        scrollLeft: node.scrollLeft(),
                        scrollTop: node.scrollTop(),
                        width: node.outerWidth(),
                        height: node.outerHeight()
                    };
                }
            }, test.fn.position = function(options) {
                if (!options || !options.of) return rpercent.apply(this, arguments);
                options = test.extend({}, options);
                var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = test(options.of), within = test.position.getWithinInfo(options.within), scrollInfo = test.position.getScrollInfo(within), collision = (options.collision || "flip").split(" "), offsets = {};
                return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"),
                    targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset,
                    basePosition = test.extend({}, targetOffset), test.each([ "my", "at" ], function() {
                    var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
                    1 === pos.length && (pos = round.test(pos[0]) ? pos.concat([ "center" ]) : rhorizontal.test(pos[0]) ? [ "center" ].concat(pos) : [ "center", "center" ]),
                        pos[0] = round.test(pos[0]) ? pos[0] : "center", pos[1] = rhorizontal.test(pos[1]) ? pos[1] : "center",
                        horizontalOffset = rvertical.exec(pos[0]), verticalOffset = rvertical.exec(pos[1]),
                        offsets[this] = [ horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0 ],
                        options[this] = [ roffset.exec(pos[0])[0], roffset.exec(pos[1])[0] ];
                }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2),
                    "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2),
                    atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0],
                    basePosition.top += atOffset[1], this.each(function() {
                    var collisionPosition, using, elem = test(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseCss(this, "marginLeft"), marginTop = parseCss(this, "marginTop"), collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width, collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height, position = test.extend({}, basePosition), myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
                    "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2),
                        "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2),
                        position.left += myOffset[0], position.top += myOffset[1], collisionPosition = {
                        marginLeft: marginLeft,
                        marginTop: marginTop
                    }, test.each([ "left", "top" ], function(i, dir) {
                        test.ui.position[collision[i]] && test.ui.position[collision[i]][dir](position, {
                            targetWidth: targetWidth,
                            targetHeight: targetHeight,
                            elemWidth: elemWidth,
                            elemHeight: elemHeight,
                            collisionPosition: collisionPosition,
                            collisionWidth: collisionWidth,
                            collisionHeight: collisionHeight,
                            offset: [ atOffset[0] + myOffset[0], atOffset[1] + myOffset[1] ],
                            my: options.my,
                            at: options.at,
                            within: within,
                            elem: elem
                        });
                    }), options.using && (using = function(props) {
                        var left = targetOffset.left - position.left, right = left + targetWidth - elemWidth, top = targetOffset.top - position.top, bottom = top + targetHeight - elemHeight, feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: elem,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                            vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                        };
                        targetWidth < elemWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"),
                        targetHeight < elemHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"),
                            max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? feedback.important = "horizontal" : feedback.important = "vertical",
                            options.using.call(this, props, feedback);
                    }), elem.offset(test.extend(position, {
                        using: using
                    }));
                });
            }, test.ui.position = {
                fit: {
                    left: function(position, data) {
                        var newOverRight, within = data.within, withinOffset = within.isWindow ? within.scrollLeft : within.offset.left, outerWidth = within.width, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = withinOffset - collisionPosLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                        data.collisionWidth > outerWidth ? overLeft > 0 && overRight <= 0 ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset,
                                    position.left += overLeft - newOverRight) : overRight > 0 && overLeft <= 0 ? position.left = withinOffset : overLeft > overRight ? position.left = withinOffset + outerWidth - data.collisionWidth : position.left = withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left);
                    },
                    top: function(position, data) {
                        var newOverBottom, within = data.within, withinOffset = within.isWindow ? within.scrollTop : within.offset.top, outerHeight = data.within.height, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = withinOffset - collisionPosTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                        data.collisionHeight > outerHeight ? overTop > 0 && overBottom <= 0 ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset,
                                    position.top += overTop - newOverBottom) : overBottom > 0 && overTop <= 0 ? position.top = withinOffset : overTop > overBottom ? position.top = withinOffset + outerHeight - data.collisionHeight : position.top = withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top);
                    }
                },
                flip: {
                    left: function(position, data) {
                        var r, g, within = data.within, a = within.offset.left + within.scrollLeft, idx = within.width, n = within.isWindow ? within.scrollLeft : within.offset.left, x = position.left - data.collisionPosition.marginLeft, y = x - n, i = x + data.collisionWidth - idx - n, j = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0, inx = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0, iny = -2 * data.offset[0];
                        y < 0 ? (r = position.left + j + inx + iny + data.collisionWidth - idx - a, (r < 0 || r < abs(y)) && (position.left += j + inx + iny)) : i > 0 && (g = position.left - data.collisionPosition.marginLeft + j + inx + iny - n,
                            (g > 0 || abs(g) < i) && (position.left += j + inx + iny));
                    },
                    top: function(position, data) {
                        var r, i, within = data.within, j = within.offset.top + within.scrollTop, k = within.height, els = within.isWindow ? within.scrollTop : within.offset.top, length = position.top - data.collisionPosition.marginTop, len = length - els, points = length + data.collisionHeight - k - els, ps = "top" === data.my[1], x = ps ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0, y = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0, offset = -2 * data.offset[1];
                        len < 0 ? (i = position.top + x + y + offset + data.collisionHeight - k - j, (i < 0 || i < abs(len)) && (position.top += x + y + offset)) : points > 0 && (r = position.top - data.collisionPosition.marginTop + x + y + offset - els,
                            (r > 0 || abs(r) < points) && (position.top += x + y + offset));
                    }
                },
                flipfit: {
                    left: function() {
                        test.ui.position.flip.left.apply(this, arguments), test.ui.position.fit.left.apply(this, arguments);
                    },
                    top: function() {
                        test.ui.position.flip.top.apply(this, arguments), test.ui.position.fit.top.apply(this, arguments);
                    }
                }
            };
        }();
        var dataSpace = (test.ui.position, test.extend(test.expr[":"], {
            data: test.expr.createPseudo ? test.expr.createPseudo(function(dataName) {
                    return function(elem) {
                        return !!test.data(elem, dataName);
                    };
                }) : function(elem, i, match) {
                    return !!test.data(elem, match[3]);
                }
        }), test.fn.extend({
            disableSelection: function() {
                var type = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.on(type + ".ui-disableSelection", function(event) {
                        event.preventDefault();
                    });
                };
            }(),
            enableSelection: function() {
                return this.off(".ui-disableSelection");
            }
        }), "ui-effects-"), node = "ui-effects-style", text = "ui-effects-animated", child = test;
        test.effects = {
            effect: {}
        }, function(dojo, newName) {
            function clamp(value, e, allowEmpty) {
                var type = state[e.type] || {};
                return null == value ? allowEmpty || !e.def ? null : e.def : (value = type.floor ? ~~value : parseFloat(value),
                        isNaN(value) ? e.def : type.mod ? (value + type.mod) % type.mod : 0 > value ? 0 : type.max < value ? type.max : value);
            }
            function stringParse(name) {
                var inst = color(), rgba = inst._rgba = [];
                return name = name.toLowerCase(), each(a, function(i, parser) {
                    var parsed, match = parser.re.exec(name), values = match && parser.parse(match), spaceName = parser.space || "rgba";
                    if (values) return parsed = inst[spaceName](values), inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache],
                        rgba = inst._rgba = parsed._rgba, !1;
                }), rgba.length ? ("0,0,0,0" === rgba.join() && dojo.extend(rgba, self.transparent),
                        inst) : self[name];
            }
            function hue2rgb(m1, m2, hue) {
                return hue = (hue + 1) % 1, 6 * hue < 1 ? m1 + (m2 - m1) * hue * 6 : 2 * hue < 1 ? m2 : 3 * hue < 2 ? m1 + (m2 - m1) * (2 / 3 - hue) * 6 : m1;
            }
            var self, i = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", l = /^([\-+])=\s*(\d+\.?\d*)/, a = [ {
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(execResult) {
                    return [ execResult[1], execResult[2], execResult[3], execResult[4] ];
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(execResult) {
                    return [ 2.55 * execResult[1], 2.55 * execResult[2], 2.55 * execResult[3], execResult[4] ];
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(execResult) {
                    return [ parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16) ];
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(execResult) {
                    return [ parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16) ];
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(execResult) {
                    return [ execResult[1], execResult[2] / 100, execResult[3] / 100, execResult[4] ];
                }
            } ], color = dojo.Color = function(r, g, b, a) {
                return new dojo.Color.fn.parse(r, g, b, a);
            }, spaces = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            }, state = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            }, h = color.support = {}, len = dojo("<p>")[0], each = dojo.each;
            len.style.cssText = "background-color:rgba(1,1,1,.5)", h.rgba = len.style.backgroundColor.indexOf("rgba") > -1,
                each(spaces, function(spaceName, space) {
                    space.cache = "_" + spaceName, space.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    };
                }), color.fn = dojo.extend(color.prototype, {
                parse: function(red, name, args, body) {
                    if (red === newName) return this._rgba = [ null, null, null, null ], this;
                    (red.jquery || red.nodeType) && (red = dojo(red).css(name), name = newName);
                    var inst = this, type = dojo.type(red), rgba = this._rgba = [];
                    return name !== newName && (red = [ red, name, args, body ], type = "array"), "string" === type ? this.parse(stringParse(red) || self._default) : "array" === type ? (each(spaces.rgba.props, function(key, prop) {
                                rgba[prop.idx] = clamp(red[prop.idx], prop);
                            }), this) : "object" === type ? (red instanceof color ? each(spaces, function(spaceName, space) {
                                        red[space.cache] && (inst[space.cache] = red[space.cache].slice());
                                    }) : each(spaces, function(spaceName, space) {
                                        var cache = space.cache;
                                        each(space.props, function(key, prop) {
                                            if (!inst[cache] && space.to) {
                                                if ("alpha" === key || null == red[key]) return;
                                                inst[cache] = space.to(inst._rgba);
                                            }
                                            inst[cache][prop.idx] = clamp(red[key], prop, !0);
                                        }), inst[cache] && dojo.inArray(null, inst[cache].slice(0, 3)) < 0 && (inst[cache][3] = 1,
                                        space.from && (inst._rgba = space.from(inst[cache])));
                                    }), this) : void 0;
                },
                is: function(s) {
                    var end = color(s), same = !0, inst = this;
                    return each(spaces, function(spaceName, space) {
                        var localCache, isCache = end[space.cache];
                        return isCache && (localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [],
                            each(space.props, function(key, prop) {
                                if (null != isCache[prop.idx]) return same = isCache[prop.idx] === localCache[prop.idx];
                            })), same;
                    }), same;
                },
                _space: function() {
                    var r = [], all = this;
                    return each(spaces, function(i, x) {
                        all[x.cache] && r.push(i);
                    }), r.pop();
                },
                transition: function(other, distance) {
                    var end = color(other), spaceName = end._space(), space = spaces[spaceName], startColor = 0 === this.alpha() ? color("transparent") : this, start = startColor[space.cache] || space.to(startColor._rgba), result = start.slice();
                    return end = end[space.cache], each(space.props, function(key, prop) {
                        var index = prop.idx, startValue = start[index], endValue = end[index], type = state[prop.type] || {};
                        null !== endValue && (null === startValue ? result[index] = endValue : (type.mod && (endValue - startValue > type.mod / 2 ? startValue += type.mod : startValue - endValue > type.mod / 2 && (startValue -= type.mod)),
                                result[index] = clamp((endValue - startValue) * distance + startValue, prop)));
                    }), this[spaceName](result);
                },
                blend: function(opaque) {
                    if (1 === this._rgba[3]) return this;
                    var r = this._rgba.slice(), t = r.pop(), a = color(opaque)._rgba;
                    return color(dojo.map(r, function(v, i) {
                        return (1 - t) * a[i] + t * v;
                    }));
                },
                toRgbaString: function() {
                    var prefix = "rgba(", rgba = dojo.map(this._rgba, function(v, i) {
                        return null == v ? i > 2 ? 1 : 0 : v;
                    });
                    return 1 === rgba[3] && (rgba.pop(), prefix = "rgb("), prefix + rgba.join() + ")";
                },
                toHslaString: function() {
                    var prefix = "hsla(", hsla = dojo.map(this.hsla(), function(n, i) {
                        return null == n && (n = i > 2 ? 1 : 0), i && i < 3 && (n = Math.round(100 * n) + "%"),
                            n;
                    });
                    return 1 === hsla[3] && (hsla.pop(), prefix = "hsl("), prefix + hsla.join() + ")";
                },
                toHexString: function(str) {
                    var rgba = this._rgba.slice(), alpha = rgba.pop();
                    return str && rgba.push(~~(255 * alpha)), "#" + dojo.map(rgba, function(v) {
                        return v = (v || 0).toString(16), 1 === v.length ? "0" + v : v;
                    }).join("");
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
                }
            }), color.fn.parse.prototype = color.fn, spaces.hsla.to = function(rgba) {
                if (null == rgba[0] || null == rgba[1] || null == rgba[2]) return [ null, null, null, rgba[3] ];
                var c, s, a = rgba[0] / 255, r = rgba[1] / 255, b = rgba[2] / 255, y = rgba[3], max = Math.max(a, r, b), min = Math.min(a, r, b), delta = max - min, i = max + min, l = .5 * i;
                return c = min === max ? 0 : a === max ? 60 * (r - b) / delta + 360 : r === max ? 60 * (b - a) / delta + 120 : 60 * (a - r) / delta + 240,
                    s = 0 === delta ? 0 : l <= .5 ? delta / i : delta / (2 - i), [ Math.round(c) % 360, s, l, null == y ? 1 : y ];
            }, spaces.hsla.from = function(hsla) {
                if (null == hsla[0] || null == hsla[1] || null == hsla[2]) return [ null, null, null, hsla[3] ];
                var h = hsla[0] / 360, s = hsla[1], l = hsla[2], a = hsla[3], q = l <= .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
                return [ Math.round(255 * hue2rgb(p, q, h + 1 / 3)), Math.round(255 * hue2rgb(p, q, h)), Math.round(255 * hue2rgb(p, q, h - 1 / 3)), a ];
            }, each(spaces, function(spaceName, space) {
                var props = space.props, cache = space.cache, to = space.to, from = space.from;
                color.fn[spaceName] = function(value) {
                    if (to && !this[cache] && (this[cache] = to(this._rgba)), value === newName) return this[cache].slice();
                    var ret, type = dojo.type(value), arr = "array" === type || "object" === type ? value : arguments, local = this[cache].slice();
                    return each(props, function(key, prop) {
                        var val = arr["object" === type ? key : prop.idx];
                        null == val && (val = local[prop.idx]), local[prop.idx] = clamp(val, prop);
                    }), from ? (ret = color(from(local)), ret[cache] = local, ret) : color(local);
                }, each(props, function(name, info) {
                    color.fn[name] || (color.fn[name] = function(value) {
                        var target, type = dojo.type(value), length = "alpha" === name ? this._hsla ? "hsla" : "rgba" : spaceName, data = this[length](), options = data[info.idx];
                        return "undefined" === type ? options : ("function" === type && (value = value.call(this, options),
                                type = dojo.type(value)), null == value && info.empty ? this : ("string" === type && (target = l.exec(value),
                                target && (value = options + parseFloat(target[2]) * ("+" === target[1] ? 1 : -1))),
                                    data[info.idx] = value, this[length](data)));
                    });
                });
            }), color.hook = function(str) {
                var hooks = str.split(" ");
                each(hooks, function(i, hook) {
                    dojo.cssHooks[hook] = {
                        set: function(elem, value) {
                            var parsed, curElem, backgroundColor = "";
                            if ("transparent" !== value && ("string" !== dojo.type(value) || (parsed = stringParse(value)))) {
                                if (value = color(parsed || value), !h.rgba && 1 !== value._rgba[3]) {
                                    for (curElem = "backgroundColor" === hook ? elem.parentNode : elem; ("" === backgroundColor || "transparent" === backgroundColor) && curElem && curElem.style; ) try {
                                        backgroundColor = dojo.css(curElem, "backgroundColor"), curElem = curElem.parentNode;
                                    } catch (l) {}
                                    value = value.blend(backgroundColor && "transparent" !== backgroundColor ? backgroundColor : "_default");
                                }
                                value = value.toRgbaString();
                            }
                            try {
                                elem.style[hook] = value;
                            } catch (l) {}
                        }
                    }, dojo.fx.step[hook] = function(fx) {
                        fx.colorInit || (fx.start = color(fx.elem, hook), fx.end = color(fx.end), fx.colorInit = !0),
                            dojo.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos));
                    };
                });
            }, color.hook(i), dojo.cssHooks.borderColor = {
                expand: function(value) {
                    var expanded = {};
                    return each([ "Top", "Right", "Bottom", "Left" ], function(i, part) {
                        expanded["border" + part + "Color"] = value;
                    }), expanded;
                }
            }, self = dojo.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [ null, null, null, 0 ],
                _default: "#ffffff"
            };
        }(child), function() {
            function getElementStyles(elem) {
                var key, len, style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle, styles = {};
                if (style && style.length && style[0] && style[style[0]]) for (len = style.length; len--; ) key = style[len],
                "string" == typeof style[key] && (styles[test.camelCase(key)] = style[key]); else for (key in style) "string" == typeof style[key] && (styles[key] = style[key]);
                return styles;
            }
            function styleDifference(node, css) {
                var key, val, obj = {};
                for (key in css) val = css[key], node[key] !== val && (modifiedItem[key] || !test.fx.step[key] && isNaN(parseFloat(val)) || (obj[key] = val));
                return obj;
            }
            var classAnimationActions = [ "add", "remove", "toggle" ], modifiedItem = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
            test.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function(_, prop) {
                test.fx.step[prop] = function(fx) {
                    ("none" !== fx.end && !fx.setAttr || 1 === fx.pos && !fx.setAttr) && (child.style(fx.elem, prop, fx.end),
                        fx.setAttr = !0);
                };
            }), test.fn.addBack || (test.fn.addBack = function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
            }), test.effects.animateClass = function(value, duration, easing, callback) {
                var o = test.speed(duration, easing, callback);
                return this.queue(function() {
                    var applyClassChange, animated = test(this), baseClass = animated.attr("class") || "", allAnimations = o.children ? animated.find("*").addBack() : animated;
                    allAnimations = allAnimations.map(function() {
                        var el = test(this);
                        return {
                            el: el,
                            start: getElementStyles(this)
                        };
                    }), applyClassChange = function() {
                        test.each(classAnimationActions, function(i, action) {
                            value[action] && animated[action + "Class"](value[action]);
                        });
                    }, applyClassChange(), allAnimations = allAnimations.map(function() {
                        return this.end = getElementStyles(this.el[0]), this.diff = styleDifference(this.start, this.end),
                            this;
                    }), animated.attr("class", baseClass), allAnimations = allAnimations.map(function() {
                        var styleInfo = this, dfd = test.Deferred(), opts = test.extend({}, o, {
                            queue: !1,
                            complete: function() {
                                dfd.resolve(styleInfo);
                            }
                        });
                        return this.el.animate(this.diff, opts), dfd.promise();
                    }), test.when.apply(test, allAnimations.get()).done(function() {
                        applyClassChange(), test.each(arguments, function() {
                            var el = this.el;
                            test.each(this.diff, function(key) {
                                el.css(key, "");
                            });
                        }), o.complete.call(animated[0]);
                    });
                });
            }, test.fn.extend({
                addClass: function(orig) {
                    return function(classNames, speed, easing, callback) {
                        return speed ? test.effects.animateClass.call(this, {
                                add: classNames
                            }, speed, easing, callback) : orig.apply(this, arguments);
                    };
                }(test.fn.addClass),
                removeClass: function(orig) {
                    return function(classNames, speed, easing, callback) {
                        return arguments.length > 1 ? test.effects.animateClass.call(this, {
                                remove: classNames
                            }, speed, easing, callback) : orig.apply(this, arguments);
                    };
                }(test.fn.removeClass),
                toggleClass: function(orig) {
                    return function(classNames, force, speed, easing, callback) {
                        return "boolean" == typeof force || void 0 === force ? speed ? test.effects.animateClass.call(this, force ? {
                                        add: classNames
                                    } : {
                                        remove: classNames
                                    }, speed, easing, callback) : orig.apply(this, arguments) : test.effects.animateClass.call(this, {
                                toggle: classNames
                            }, force, speed, easing);
                    };
                }(test.fn.toggleClass),
                switchClass: function(remove, add, speed, easing, callback) {
                    return test.effects.animateClass.call(this, {
                        add: add,
                        remove: remove
                    }, speed, easing, callback);
                }
            });
        }(), function() {
            function _normalizeArguments(effect, options, speed, callback) {
                return test.isPlainObject(effect) && (options = effect, effect = effect.effect),
                    effect = {
                        effect: effect
                    }, null == options && (options = {}), test.isFunction(options) && (callback = options,
                    speed = null, options = {}), ("number" == typeof options || test.fx.speeds[options]) && (callback = speed,
                    speed = options, options = {}), test.isFunction(speed) && (callback = speed, speed = null),
                options && test.extend(effect, options), speed = speed || options.duration, effect.duration = test.fx.off ? 0 : "number" == typeof speed ? speed : speed in test.fx.speeds ? test.fx.speeds[speed] : test.fx.speeds._default,
                    effect.complete = callback || options.complete, effect;
            }
            function standardAnimationOption(option) {
                return !(option && "number" != typeof option && !test.fx.speeds[option]) || ("string" == typeof option && !test.effects.effect[option] || (!!test.isFunction(option) || "object" == typeof option && !option.effect));
            }
            function parse(str, input) {
                var width = input.outerWidth(), height = input.outerHeight(), regex = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/, value = regex.exec(str) || [ "", 0, width, height, 0 ];
                return {
                    top: parseFloat(value[1]) || 0,
                    right: "auto" === value[2] ? width : parseFloat(value[2]),
                    bottom: "auto" === value[3] ? height : parseFloat(value[3]),
                    left: parseFloat(value[4]) || 0
                };
            }
            test.expr && test.expr.filters && test.expr.filters.animated && (test.expr.filters.animated = function(itemtemplate) {
                return function(item) {
                    return !!test(item).data(text) || itemtemplate(item);
                };
            }(test.expr.filters.animated)), test.uiBackCompat !== !1 && test.extend(test.effects, {
                save: function(element, set) {
                    for (var i = 0, l = set.length; i < l; i++) null !== set[i] && element.data(dataSpace + set[i], element[0].style[set[i]]);
                },
                restore: function(element, set) {
                    for (var i, j = 0, l = set.length; j < l; j++) null !== set[j] && (i = element.data(dataSpace + set[j]),
                        element.css(set[j], i));
                },
                setMode: function(el, mode) {
                    return "toggle" === mode && (mode = el.is(":hidden") ? "show" : "hide"), mode;
                },
                createWrapper: function(element) {
                    if (element.parent().is(".ui-effects-wrapper")) return element.parent();
                    var props = {
                        width: element.outerWidth(!0),
                        height: element.outerHeight(!0),
                        "float": element.css("float")
                    }, wrapper = test("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }), size = {
                        width: element.width(),
                        height: element.height()
                    }, active = document.activeElement;
                    try {
                        active.id;
                    } catch (e) {
                        active = document.body;
                    }
                    return element.wrap(wrapper), (element[0] === active || test.contains(element[0], active)) && test(active).trigger("focus"),
                        wrapper = element.parent(), "static" === element.css("position") ? (wrapper.css({
                            position: "relative"
                        }), element.css({
                            position: "relative"
                        })) : (test.extend(props, {
                            position: element.css("position"),
                            zIndex: element.css("z-index")
                        }), test.each([ "top", "left", "bottom", "right" ], function(i, pos) {
                            props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto");
                        }), element.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), element.css(size), wrapper.css(props).show();
                },
                removeWrapper: function(element) {
                    var active = document.activeElement;
                    return element.parent().is(".ui-effects-wrapper") && (element.parent().replaceWith(element),
                    (element[0] === active || test.contains(element[0], active)) && test(active).trigger("focus")),
                        element;
                }
            }), test.extend(test.effects, {
                version: "1.12.1",
                define: function(name, v, k) {
                    return k || (k = v, v = "effect"), test.effects.effect[name] = k, test.effects.effect[name].mode = v,
                        k;
                },
                scaledDimensions: function(elem, max, unit) {
                    if (0 === max) return {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    };
                    var p = "horizontal" !== unit ? (max || 100) / 100 : 1, scale = "vertical" !== unit ? (max || 100) / 100 : 1;
                    return {
                        height: elem.height() * scale,
                        width: elem.width() * p,
                        outerHeight: elem.outerHeight() * scale,
                        outerWidth: elem.outerWidth() * p
                    };
                },
                clipToBox: function(el) {
                    return {
                        width: el.clip.right - el.clip.left,
                        height: el.clip.bottom - el.clip.top,
                        left: el.clip.left,
                        top: el.clip.top
                    };
                },
                unshift: function(target, s, args) {
                    var object = target.queue();
                    s > 1 && object.splice.apply(object, [ 1, 0 ].concat(object.splice(s, args))), target.dequeue();
                },
                saveStyle: function(el) {
                    el.data(node, el[0].style.cssText);
                },
                restoreStyle: function(element) {
                    element[0].style.cssText = element.data(node) || "", element.removeData(node);
                },
                mode: function(x, val) {
                    var hidden = x.is(":hidden");
                    return "toggle" === val && (val = hidden ? "show" : "hide"), (hidden ? "hide" === val : "show" === val) && (val = "none"),
                        val;
                },
                getBaseline: function(origin, original) {
                    var y, x;
                    switch (origin[0]) {
                        case "top":
                            y = 0;
                            break;

                        case "middle":
                            y = .5;
                            break;

                        case "bottom":
                            y = 1;
                            break;

                        default:
                            y = origin[0] / original.height;
                    }
                    switch (origin[1]) {
                        case "left":
                            x = 0;
                            break;

                        case "center":
                            x = .5;
                            break;

                        case "right":
                            x = 1;
                            break;

                        default:
                            x = origin[1] / original.width;
                    }
                    return {
                        x: x,
                        y: y
                    };
                },
                createPlaceholder: function(el) {
                    var text, type = el.css("position"), pos = el.position();
                    return el.css({
                        marginTop: el.css("marginTop"),
                        marginBottom: el.css("marginBottom"),
                        marginLeft: el.css("marginLeft"),
                        marginRight: el.css("marginRight")
                    }).outerWidth(el.outerWidth()).outerHeight(el.outerHeight()), /^(static|relative)/.test(type) && (type = "absolute",
                        text = test("<" + el[0].nodeName + ">").insertAfter(el).css({
                            display: /^(inline|ruby)/.test(el.css("display")) ? "inline-block" : "block",
                            visibility: "hidden",
                            marginTop: el.css("marginTop"),
                            marginBottom: el.css("marginBottom"),
                            marginLeft: el.css("marginLeft"),
                            marginRight: el.css("marginRight"),
                            "float": el.css("float")
                        }).outerWidth(el.outerWidth()).outerHeight(el.outerHeight()).addClass("ui-effects-placeholder"),
                        el.data(dataSpace + "placeholder", text)), el.css({
                        position: type,
                        left: pos.left,
                        top: pos.top
                    }), text;
                },
                removePlaceholder: function(div) {
                    var elem = dataSpace + "placeholder", form = div.data(elem);
                    form && (form.remove(), div.removeData(elem));
                },
                cleanUp: function(i) {
                    test.effects.restoreStyle(i), test.effects.removePlaceholder(i);
                },
                setTransition: function(element, list, factor, value) {
                    return value = value || {}, test.each(list, function(node, x) {
                        var unit = element.cssUnit(x);
                        unit[0] > 0 && (value[x] = unit[0] * factor + unit[1]);
                    }), value;
                }
            }), test.fn.extend({
                effect: function() {
                    function hide(callback) {
                        function cb() {
                            elem.removeData(text), test.effects.cleanUp(elem), "hide" === args.mode && elem.hide(),
                                done();
                        }
                        function done() {
                            test.isFunction(fn) && fn.call(elem[0]), test.isFunction(callback) && callback();
                        }
                        var elem = test(this);
                        args.mode = ret.shift(), test.uiBackCompat === !1 || i ? "none" === args.mode ? (elem[mode](),
                                    done()) : effectMethod.call(elem[0], args, cb) : (elem.is(":hidden") ? "hide" === mode : "show" === mode) ? (elem[mode](),
                                    done()) : effectMethod.call(elem[0], args, done);
                    }
                    var args = _normalizeArguments.apply(this, arguments), effectMethod = test.effects.effect[args.effect], i = effectMethod.mode, type = args.queue, path = type || "fx", fn = args.complete, mode = args.mode, ret = [], run = function(done) {
                        var e = test(this), key = test.effects.mode(e, mode) || i;
                        e.data(text, !0), ret.push(key), i && ("show" === key || key === i && "hide" === key) && e.show(),
                        i && "none" === key || test.effects.saveStyle(e), test.isFunction(done) && done();
                    };
                    return test.fx.off || !effectMethod ? mode ? this[mode](args.duration, fn) : this.each(function() {
                                fn && fn.call(this);
                            }) : type === !1 ? this.each(run).each(hide) : this.queue(path, run).queue(path, hide);
                },
                show: function(orig) {
                    return function(option) {
                        if (standardAnimationOption(option)) return orig.apply(this, arguments);
                        var args = _normalizeArguments.apply(this, arguments);
                        return args.mode = "show", this.effect.call(this, args);
                    };
                }(test.fn.show),
                hide: function(orig) {
                    return function(option) {
                        if (standardAnimationOption(option)) return orig.apply(this, arguments);
                        var args = _normalizeArguments.apply(this, arguments);
                        return args.mode = "hide", this.effect.call(this, args);
                    };
                }(test.fn.hide),
                toggle: function(orig) {
                    return function(option) {
                        if (standardAnimationOption(option) || "boolean" == typeof option) return orig.apply(this, arguments);
                        var args = _normalizeArguments.apply(this, arguments);
                        return args.mode = "toggle", this.effect.call(this, args);
                    };
                }(test.fn.toggle),
                cssUnit: function(key) {
                    var style = this.css(key), val = [];
                    return test.each([ "em", "px", "%", "pt" ], function(i, unit) {
                        style.indexOf(unit) > 0 && (val = [ parseFloat(style), unit ]);
                    }), val;
                },
                cssClip: function(label) {
                    return label ? this.css("clip", "rect(" + label.top + "px " + label.right + "px " + label.bottom + "px " + label.left + "px)") : parse(this.css("clip"), this);
                },
                transfer: function(o, done) {
                    var i = test(this), l = test(o.to), component = "fixed" === l.css("position"), node = test("body"), len = component ? node.scrollTop() : 0, height = component ? node.scrollLeft() : 0, pos = l.offset(), css = {
                        top: pos.top - len,
                        left: pos.left - height,
                        height: l.innerHeight(),
                        width: l.innerWidth()
                    }, offset = i.offset(), _i = test("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(o.className).css({
                        top: offset.top - len,
                        left: offset.left - height,
                        height: i.innerHeight(),
                        width: i.innerWidth(),
                        position: component ? "fixed" : "absolute"
                    }).animate(css, o.duration, o.easing, function() {
                        _i.remove(), test.isFunction(done) && done();
                    });
                }
            }), test.fx.step.clip = function(item) {
                item.clipInit || (item.start = test(item.elem).cssClip(), "string" == typeof item.end && (item.end = parse(item.end, item.elem)),
                    item.clipInit = !0), test(item.elem).cssClip({
                    top: item.pos * (item.end.top - item.start.top) + item.start.top,
                    right: item.pos * (item.end.right - item.start.right) + item.start.right,
                    bottom: item.pos * (item.end.bottom - item.start.bottom) + item.start.bottom,
                    left: item.pos * (item.end.left - item.start.left) + item.start.left
                });
            };
        }(), function() {
            var colors = {};
            test.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(elem, i) {
                colors[i] = function(s) {
                    return Math.pow(s, elem + 2);
                };
            }), test.extend(colors, {
                Sine: function(p) {
                    return 1 - Math.cos(p * Math.PI / 2);
                },
                Circ: function(p) {
                    return 1 - Math.sqrt(1 - p * p);
                },
                Elastic: function(p) {
                    return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15);
                },
                Back: function(p) {
                    return p * p * (3 * p - 2);
                },
                Bounce: function(p) {
                    for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11; ) ;
                    return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2);
                }
            }), test.each(colors, function(name, easeIn) {
                test.easing["easeIn" + name] = easeIn, test.easing["easeOut" + name] = function(p) {
                    return 1 - easeIn(1 - p);
                }, test.easing["easeInOut" + name] = function(p) {
                    return p < .5 ? easeIn(2 * p) / 2 : 1 - easeIn(p * -2 + 2) / 2;
                };
            });
        }();
        var args, args = test.effects;
        test.effects.define("blind", "hide", function(opts, types) {
            var coordinates = {
                up: [ "bottom", "top" ],
                vertical: [ "bottom", "top" ],
                down: [ "top", "bottom" ],
                left: [ "right", "left" ],
                horizontal: [ "right", "left" ],
                right: [ "left", "right" ]
            }, b = test(this), n = opts.direction || "up", c = b.cssClip(), a = {
                clip: test.extend({}, c)
            }, e = test.effects.createPlaceholder(b);
            a.clip[coordinates[n][0]] = a.clip[coordinates[n][1]], "show" === opts.mode && (b.cssClip(a.clip),
            e && e.css(test.effects.clipToBox(a)), a.clip = c), e && e.animate(test.effects.clipToBox(a), opts.duration, opts.easing),
                b.animate(a, {
                    queue: !1,
                    duration: opts.duration,
                    easing: opts.easing,
                    complete: types
                });
        }), test.effects.define("bounce", function(opts, callback) {
            var r, t, g, u = test(this), j = opts.mode, F = "hide" === j, v = "show" === j, l = opts.direction || "up", w = opts.distance, x = opts.times || 5, k = 2 * x + (v || F ? 1 : 0), d = opts.duration / k, a = opts.easing, m = "up" === l || "down" === l ? "top" : "left", y = "up" === l || "left" === l, n = 0, z = u.queue().length;
            for (test.effects.createPlaceholder(u), g = u.css(m), w || (w = u["top" === m ? "outerHeight" : "outerWidth"]() / 3),
                 v && (t = {
                     opacity: 1
                 }, t[m] = g, u.css("opacity", 0).css(m, y ? 2 * -w : 2 * w).animate(t, d, a)), F && (w /= Math.pow(2, x - 1)),
                     t = {}, t[m] = g; n < x; n++) r = {}, r[m] = (y ? "-=" : "+=") + w, u.animate(r, d, a).animate(t, d, a),
                w = F ? 2 * w : w / 2;
            F && (r = {
                opacity: 0
            }, r[m] = (y ? "-=" : "+=") + w, u.animate(r, d, a)), u.queue(callback), test.effects.unshift(u, z, k + 1);
        }), test.effects.define("clip", "hide", function(timing, event) {
            var o, p = {}, n = test(this), a = timing.direction || "vertical", l = "both" === a, v = l || "horizontal" === a, x = l || "vertical" === a;
            o = n.cssClip(), p.clip = {
                top: x ? (o.bottom - o.top) / 2 : o.top,
                right: v ? (o.right - o.left) / 2 : o.right,
                bottom: x ? (o.bottom - o.top) / 2 : o.bottom,
                left: v ? (o.right - o.left) / 2 : o.left
            }, test.effects.createPlaceholder(n), "show" === timing.mode && (n.cssClip(p.clip),
                p.clip = o), n.animate(p, {
                queue: !1,
                duration: timing.duration,
                easing: timing.easing,
                complete: event
            });
        }), test.effects.define("drop", "hide", function(options, func) {
            var i, el = test(this), index = options.mode, len = "show" === index, result = options.direction || "left", key = "up" === result || "down" === result ? "top" : "left", v = "up" === result || "left" === result ? "-=" : "+=", pos = "+=" === v ? "-=" : "+=", properties = {
                opacity: 0
            };
            test.effects.createPlaceholder(el), i = options.distance || el["top" === key ? "outerHeight" : "outerWidth"](!0) / 2,
                properties[key] = v + i, len && (el.css(properties), properties[key] = pos + i,
                properties.opacity = 1), el.animate(properties, {
                queue: !1,
                duration: options.duration,
                easing: options.easing,
                complete: func
            });
        }), test.effects.define("explode", "hide", function(o, picker) {
            function childComplete() {
                _ref6.push(this), _ref6.length === _len * _len1 && animComplete();
            }
            function animComplete() {
                _ref.css({
                    visibility: "visible"
                }), test(_ref6).remove(), picker();
            }
            var i, c, n, nodes, _i, _j, _len = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3, _len1 = _len, _ref = test(this), _ref1 = o.mode, show = "show" === _ref1, offset = _ref.show().css("visibility", "hidden").offset(), height = Math.ceil(_ref.outerWidth() / _len1), width = Math.ceil(_ref.outerHeight() / _len), _ref6 = [];
            for (i = 0; i < _len; i++) for (nodes = offset.top + i * width, _j = i - (_len - 1) / 2,
                                                c = 0; c < _len1; c++) n = offset.left + c * height, _i = c - (_len1 - 1) / 2, _ref.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -c * height,
                top: -i * width
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: height,
                height: width,
                left: n + (show ? _i * height : 0),
                top: nodes + (show ? _j * width : 0),
                opacity: show ? 0 : 1
            }).animate({
                left: n + (show ? 0 : _i * height),
                top: nodes + (show ? 0 : _j * width),
                opacity: show ? 1 : 0
            }, o.duration || 500, o.easing, childComplete);
        }), test.effects.define("fade", "toggle", function(timing, event) {
            var state = "show" === timing.mode;
            test(this).css("opacity", state ? 0 : 1).animate({
                opacity: state ? 1 : 0
            }, {
                queue: !1,
                duration: timing.duration,
                easing: timing.easing,
                complete: event
            });
        }), test.effects.define("fold", "hide", function(a, msg) {
            var n = test(this), t = a.mode, r = "show" === t, e = "hide" === t, u = a.size || 15, i = /([0-9]+)%/.exec(u), type = !!a.horizFirst, uv = type ? [ "right", "bottom" ] : [ "bottom", "right" ], c = a.duration / 2, l = test.effects.createPlaceholder(n), data = n.cssClip(), s = {
                clip: test.extend({}, data)
            }, p = {
                clip: test.extend({}, data)
            }, h = [ data[uv[0]], data[uv[1]] ], v = n.queue().length;
            i && (u = parseInt(i[1], 10) / 100 * h[e ? 0 : 1]), s.clip[uv[0]] = u, p.clip[uv[0]] = u,
                p.clip[uv[1]] = 0, r && (n.cssClip(p.clip), l && l.css(test.effects.clipToBox(p)),
                p.clip = data), n.queue(function(next) {
                l && l.animate(test.effects.clipToBox(s), c, a.easing).animate(test.effects.clipToBox(p), c, a.easing),
                    next();
            }).animate(s, c, a.easing).animate(p, c, a.easing).queue(msg), test.effects.unshift(n, v, 4);
        }), test.effects.define("highlight", "show", function(options, func) {
            var node = test(this), prop = {
                backgroundColor: node.css("backgroundColor")
            };
            "hide" === options.mode && (prop.opacity = 0), test.effects.saveStyle(node), node.css({
                backgroundImage: "none",
                backgroundColor: options.color || "#ffff99"
            }).animate(prop, {
                queue: !1,
                duration: options.duration,
                easing: options.easing,
                complete: func
            });
        }), test.effects.define("size", function(settings, callback) {
            var el, props, props1, child = test(this), cProps = [ "fontSize" ], vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], mode = settings.mode, restore = "effect" !== mode, scale = settings.scale || "both", origin = settings.origin || [ "middle", "center" ], pos = child.css("position"), baseline = child.position(), original = test.effects.scaledDimensions(child), to = settings.from || original, from = settings.to || test.effects.scaledDimensions(child, 0);
            test.effects.createPlaceholder(child), "show" === mode && (props1 = to, to = from,
                from = props1), props = {
                from: {
                    y: to.height / original.height,
                    x: to.width / original.width
                },
                to: {
                    y: from.height / original.height,
                    x: from.width / original.width
                }
            }, "box" !== scale && "both" !== scale || (props.from.y !== props.to.y && (to = test.effects.setTransition(child, vProps, props.from.y, to),
                from = test.effects.setTransition(child, vProps, props.to.y, from)), props.from.x !== props.to.x && (to = test.effects.setTransition(child, hProps, props.from.x, to),
                from = test.effects.setTransition(child, hProps, props.to.x, from))), "content" !== scale && "both" !== scale || props.from.y !== props.to.y && (to = test.effects.setTransition(child, cProps, props.from.y, to),
                from = test.effects.setTransition(child, cProps, props.to.y, from)), origin && (el = test.effects.getBaseline(origin, original),
                to.top = (original.outerHeight - to.outerHeight) * el.y + baseline.top, to.left = (original.outerWidth - to.outerWidth) * el.x + baseline.left,
                from.top = (original.outerHeight - from.outerHeight) * el.y + baseline.top, from.left = (original.outerWidth - from.outerWidth) * el.x + baseline.left),
                child.css(to), "content" !== scale && "both" !== scale || (vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps),
                hProps = hProps.concat([ "marginLeft", "marginRight" ]), child.find("*[width]").each(function() {
                var el = test(this), size = test.effects.scaledDimensions(el), from = {
                    height: size.height * props.from.y,
                    width: size.width * props.from.x,
                    outerHeight: size.outerHeight * props.from.y,
                    outerWidth: size.outerWidth * props.from.x
                }, css = {
                    height: size.height * props.to.y,
                    width: size.width * props.to.x,
                    outerHeight: size.height * props.to.y,
                    outerWidth: size.width * props.to.x
                };
                props.from.y !== props.to.y && (from = test.effects.setTransition(el, vProps, props.from.y, from),
                    css = test.effects.setTransition(el, vProps, props.to.y, css)), props.from.x !== props.to.x && (from = test.effects.setTransition(el, hProps, props.from.x, from),
                    css = test.effects.setTransition(el, hProps, props.to.x, css)), restore && test.effects.saveStyle(el),
                    el.css(from), el.animate(css, settings.duration, settings.easing, function() {
                    restore && test.effects.restoreStyle(el);
                });
            })), child.animate(from, {
                queue: !1,
                duration: settings.duration,
                easing: settings.easing,
                complete: function() {
                    var offset = child.offset();
                    0 === from.opacity && child.css("opacity", to.opacity), restore || (child.css("position", "static" === pos ? "relative" : pos).offset(offset),
                        test.effects.saveStyle(child)), callback();
                }
            });
        }), test.effects.define("scale", function(o, res) {
            var i = test(this), f = o.mode, img = parseInt(o.percent, 10) || (0 === parseInt(o.percent, 10) ? 0 : "effect" !== f ? 0 : 100), options = test.extend(!0, {
                from: test.effects.scaledDimensions(i),
                to: test.effects.scaledDimensions(i, img, o.direction || "both"),
                origin: o.origin || [ "middle", "center" ]
            }, o);
            o.fade && (options.from.opacity = 1, options.to.opacity = 0), test.effects.effect.size.call(this, options, res);
        }), test.effects.define("puff", "hide", function(b, m) {
            var n = test.extend(!0, {}, b, {
                fade: !0,
                percent: parseInt(b.percent, 10) || 150
            });
            test.effects.effect.scale.call(this, n, m);
        }), test.effects.define("pulsate", "show", function(opts, msg) {
            var self = test(this), options = opts.mode, data = "show" === options, items = "hide" === options, index = data || items, j = 2 * (opts.times || 5) + (index ? 1 : 0), value = opts.duration / j, type = 0, i = 1, n = self.queue().length;
            for (!data && self.is(":visible") || (self.css("opacity", 0).show(), type = 1); i < j; i++) self.animate({
                opacity: type
            }, value, opts.easing), type = 1 - type;
            self.animate({
                opacity: type
            }, value, opts.easing), self.queue(msg), test.effects.unshift(self, n, j + 1);
        }), test.effects.define("shake", function(options, callback) {
            var i = 1, key = test(this), index = options.direction || "left", name = options.distance || 20, min = options.times || 3, max = 2 * min + 1, speed = Math.round(options.duration / max), _i = "up" === index || "down" === index ? "top" : "left", _len = "up" === index || "left" === index, _len2 = {}, _ref = {}, _ref1 = {}, _ref2 = key.queue().length;
            for (test.effects.createPlaceholder(key), _len2[_i] = (_len ? "-=" : "+=") + name,
                     _ref[_i] = (_len ? "+=" : "-=") + 2 * name, _ref1[_i] = (_len ? "-=" : "+=") + 2 * name,
                     key.animate(_len2, speed, options.easing); i < min; i++) key.animate(_ref, speed, options.easing).animate(_ref1, speed, options.easing);
            key.animate(_ref, speed, options.easing).animate(_len2, speed / 2, options.easing).queue(callback),
                test.effects.unshift(key, _ref2, max + 1);
        }), test.effects.define("slide", "show", function(options, func) {
            var type, x, el = test(this), key = {
                up: [ "bottom", "top" ],
                down: [ "top", "bottom" ],
                left: [ "right", "left" ],
                right: [ "left", "right" ]
            }, value = options.mode, r = options.direction || "left", i = "up" === r || "down" === r ? "top" : "left", _i = "up" === r || "left" === r, _len = options.distance || el["top" === i ? "outerHeight" : "outerWidth"](!0), p = {};
            test.effects.createPlaceholder(el), type = el.cssClip(), x = el.position()[i], p[i] = (_i ? -1 : 1) * _len + x,
                p.clip = el.cssClip(), p.clip[key[r][1]] = p.clip[key[r][0]], "show" === value && (el.cssClip(p.clip),
                el.css(i, p[i]), p.clip = type, p[i] = x), el.animate(p, {
                queue: !1,
                duration: options.duration,
                easing: options.easing,
                complete: func
            });
        });
        test.uiBackCompat !== !1 && (args = test.effects.define("transfer", function(color, size) {
            test(this).transfer(color, size);
        }));
        test.ui.focusable = function(element, isTabIndexNotNaN) {
            var el, id, result, input, obj, nodeName = element.nodeName.toLowerCase();
            return "area" === nodeName ? (el = element.parentNode, id = el.name, !(!element.href || !id || "map" !== el.nodeName.toLowerCase()) && (result = test("img[usemap='#" + id + "']"),
                result.length > 0 && result.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? (input = !element.disabled,
                    input && (obj = test(element).closest("fieldset")[0], obj && (input = !obj.disabled))) : input = "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN,
                input && test(element).is(":visible") && callback(test(element)));
        }, test.extend(test.expr[":"], {
            focusable: function(element) {
                return test.ui.focusable(element, null != test.attr(element, "tabindex"));
            }
        });
        test.ui.focusable, test.fn.form = function() {
            return "string" == typeof this[0].form ? this.closest("form") : test(this[0].form);
        }, test.ui.formResetMixin = {
            _formResetHandler: function() {
                var res = test(this);
                setTimeout(function() {
                    var fn = res.data("ui-form-reset-instances");
                    test.each(fn, function() {
                        this.refresh();
                    });
                });
            },
            _bindFormResetHandler: function() {
                if (this.form = this.element.form(), this.form.length) {
                    var cache = this.form.data("ui-form-reset-instances") || [];
                    cache.length || this.form.on("reset.ui-form-reset", this._formResetHandler), cache.push(this),
                        this.form.data("ui-form-reset-instances", cache);
                }
            },
            _unbindFormResetHandler: function() {
                if (this.form.length) {
                    var array = this.form.data("ui-form-reset-instances");
                    array.splice(test.inArray(this, array), 1), array.length ? this.form.data("ui-form-reset-instances", array) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
                }
            }
        };
        "1.7" === test.fn.jquery.substring(0, 3) && (test.each([ "Width", "Height" ], function(i, name) {
            function reduce(elem, size, initial, margin) {
                return test.each(side, function() {
                    size -= parseFloat(test.css(elem, "padding" + this)) || 0, initial && (size -= parseFloat(test.css(elem, "border" + this + "Width")) || 0),
                    margin && (size -= parseFloat(test.css(elem, "margin" + this)) || 0);
                }), size;
            }
            var side = "Width" === name ? [ "Left", "Right" ] : [ "Top", "Bottom" ], type = name.toLowerCase(), orig = {
                innerWidth: test.fn.innerWidth,
                innerHeight: test.fn.innerHeight,
                outerWidth: test.fn.outerWidth,
                outerHeight: test.fn.outerHeight
            };
            test.fn["inner" + name] = function(size) {
                return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                        test(this).css(type, reduce(this, size) + "px");
                    });
            }, test.fn["outer" + name] = function(size, margin) {
                return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                        test(this).css(type, reduce(this, size, !0, margin) + "px");
                    });
            };
        }), test.fn.addBack = function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        });
        test.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }, test.ui.escapeSelector = function() {
            var s = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;
            return function(string) {
                return string.replace(s, "\\$1");
            };
        }(), test.fn.labels = function() {
            var p, name, menu, result, parent;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (result = this.eq(0).parents("label"),
                    menu = this.attr("id"), menu && (p = this.eq(0).parents().last(), parent = p.add(p.length ? p.siblings() : this.siblings()),
                    name = "label[for='" + test.ui.escapeSelector(menu) + "']", result = result.add(parent.find(name).addBack(name))),
                    this.pushStack(result));
        }, test.fn.scrollParent = function(selector) {
            var pos = this.css("position"), inList = "absolute" === pos, match = selector ? /(auto|scroll|hidden)/ : /(auto|scroll)/, name = this.parents().filter(function() {
                var element = test(this);
                return (!inList || "static" !== element.css("position")) && match.test(element.css("overflow") + element.css("overflow-y") + element.css("overflow-x"));
            }).eq(0);
            return "fixed" !== pos && name.length ? name : test(this[0].ownerDocument || document);
        }, test.extend(test.expr[":"], {
            tabbable: function(element) {
                var tabIndex = test.attr(element, "tabindex"), toggle = null != tabIndex;
                return (!toggle || tabIndex >= 0) && test.ui.focusable(element, toggle);
            }
        }), test.fn.extend({
            uniqueId: function() {
                var uuid = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++uuid);
                    });
                };
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && test(this).removeAttr("id");
                });
            }
        }), test.widget("ui.accordion", {
            version: "1.12.1",
            options: {
                active: 0,
                animate: {},
                classes: {
                    "ui-accordion-header": "ui-corner-top",
                    "ui-accordion-header-collapsed": "ui-corner-all",
                    "ui-accordion-content": "ui-corner-bottom"
                },
                collapsible: !1,
                event: "click",
                header: "> li > :first-child, > :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function() {
                var options = this.options;
                this.prevShow = this.prevHide = test(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
                    this.element.attr("role", "tablist"), options.collapsible || options.active !== !1 && null != options.active || (options.active = 0),
                    this._processPanels(), options.active < 0 && (options.active += this.headers.length),
                    this._refresh();
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : test()
                };
            },
            _createIcons: function() {
                var c, elem, options = this.options.icons;
                options && (c = test("<span>"), this._addClass(c, "ui-accordion-header-icon", "ui-icon " + options.header),
                    c.prependTo(this.headers), elem = this.active.children(".ui-accordion-header-icon"),
                    this._removeClass(elem, options.header)._addClass(elem, null, options.activeHeader)._addClass(this.headers, "ui-accordion-icons"));
            },
            _destroyIcons: function() {
                this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove();
            },
            _destroy: function() {
                var contents;
                this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),
                    this._destroyIcons(), contents = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),
                "content" !== this.options.heightStyle && contents.css("height", "");
            },
            _setOption: function(key, value) {
                return "active" === key ? void this._activate(value) : ("event" === key && (this.options.event && this._off(this.headers, this.options.event),
                        this._setupEvents(value)), this._super(key, value), "collapsible" !== key || value || this.options.active !== !1 || this._activate(0),
                        void ("icons" === key && (this._destroyIcons(), value && this._createIcons())));
            },
            _setOptionDisabled: function(value) {
                this._super(value), this.element.attr("aria-disabled", value), this._toggleClass(null, "ui-state-disabled", !!value),
                    this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!value);
            },
            _keydown: function(event) {
                if (!event.altKey && !event.ctrlKey) {
                    var keyCode = test.ui.keyCode, length = this.headers.length, currentIndex = this.headers.index(event.target), toFocus = !1;
                    switch (event.keyCode) {
                        case keyCode.RIGHT:
                        case keyCode.DOWN:
                            toFocus = this.headers[(currentIndex + 1) % length];
                            break;

                        case keyCode.LEFT:
                        case keyCode.UP:
                            toFocus = this.headers[(currentIndex - 1 + length) % length];
                            break;

                        case keyCode.SPACE:
                        case keyCode.ENTER:
                            this._eventHandler(event);
                            break;

                        case keyCode.HOME:
                            toFocus = this.headers[0];
                            break;

                        case keyCode.END:
                            toFocus = this.headers[length - 1];
                    }
                    toFocus && (test(event.target).attr("tabIndex", -1), test(toFocus).attr("tabIndex", 0),
                        test(toFocus).trigger("focus"), event.preventDefault());
                }
            },
            _panelKeyDown: function(event) {
                event.keyCode === test.ui.keyCode.UP && event.ctrlKey && test(event.currentTarget).prev().trigger("focus");
            },
            refresh: function() {
                var options = this.options;
                this._processPanels(), options.active === !1 && options.collapsible === !0 || !this.headers.length ? (options.active = !1,
                        this.active = test()) : options.active === !1 ? this._activate(0) : this.active.length && !test.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (options.active = !1,
                                    this.active = test()) : this._activate(Math.max(0, options.active - 1)) : options.active = this.headers.index(this.active),
                    this._destroyIcons(), this._refresh();
            },
            _processPanels: function() {
                var headers = this.headers, body = this.panels;
                this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"),
                    this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),
                    this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"),
                body && (this._off(headers.not(this.headers)), this._off(body.not(this.panels)));
            },
            _refresh: function() {
                var maxHeight, options = this.options, heightStyle = options.heightStyle, parent = this.element.parent();
                this.active = this._findActive(options.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"),
                    this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(),
                    this.headers.attr("role", "tab").each(function() {
                        var header = test(this), headerId = header.uniqueId().attr("id"), panel = header.next(), panelId = panel.uniqueId().attr("id");
                        header.attr("aria-controls", panelId), panel.attr("aria-labelledby", headerId);
                    }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    }).next().attr({
                        "aria-hidden": "false"
                    }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(options.event),
                    "fill" === heightStyle ? (maxHeight = parent.height(), this.element.siblings(":visible").each(function() {
                            var elem = test(this), position = elem.css("position");
                            "absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0));
                        }), this.headers.each(function() {
                            maxHeight -= test(this).outerHeight(!0);
                        }), this.headers.next().each(function() {
                            test(this).height(Math.max(0, maxHeight - test(this).innerHeight() + test(this).height()));
                        }).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0, this.headers.next().each(function() {
                            var visible = test(this).is(":visible");
                            visible || test(this).show(), maxHeight = Math.max(maxHeight, test(this).css("height", "").height()),
                            visible || test(this).hide();
                        }).height(maxHeight));
            },
            _activate: function(index) {
                var active = this._findActive(index)[0];
                active !== this.active[0] && (active = active || this.active[0], this._eventHandler({
                    target: active,
                    currentTarget: active,
                    preventDefault: test.noop
                }));
            },
            _findActive: function(index) {
                return "number" == typeof index ? this.headers.eq(index) : test();
            },
            _setupEvents: function(classes) {
                var events = {
                    keydown: "_keydown"
                };
                classes && test.each(classes.split(" "), function(index, eventName) {
                    events[eventName] = "_eventHandler";
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, events),
                    this._on(this.headers.next(), {
                        keydown: "_panelKeyDown"
                    }), this._hoverable(this.headers), this._focusable(this.headers);
            },
            _eventHandler: function(event) {
                var self, o, options = this.options, button = this.active, element = test(event.currentTarget), length = element[0] === button[0], i = length && options.collapsible, value = i ? test() : element.next(), y = button.next(), eventData = {
                    oldHeader: button,
                    oldPanel: y,
                    newHeader: i ? test() : element,
                    newPanel: value
                };
                event.preventDefault(), length && !options.collapsible || this._trigger("beforeActivate", event, eventData) === !1 || (options.active = !i && this.headers.index(element),
                    this.active = length ? test() : element, this._toggle(eventData), this._removeClass(button, "ui-accordion-header-active", "ui-state-active"),
                options.icons && (self = button.children(".ui-accordion-header-icon"), this._removeClass(self, null, options.icons.activeHeader)._addClass(self, null, options.icons.header)),
                length || (this._removeClass(element, "ui-accordion-header-collapsed")._addClass(element, "ui-accordion-header-active", "ui-state-active"),
                options.icons && (o = element.children(".ui-accordion-header-icon"), this._removeClass(o, null, options.icons.header)._addClass(o, null, options.icons.activeHeader)),
                    this._addClass(element.next(), "ui-accordion-content-active")));
            },
            _toggle: function(data) {
                var toShow = data.newPanel, toHide = this.prevShow.length ? this.prevShow : data.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = toShow, this.prevHide = toHide,
                    this.options.animate ? this._animate(toShow, toHide, data) : (toHide.hide(), toShow.show(),
                            this._toggleComplete(data)), toHide.attr({
                    "aria-hidden": "true"
                }), toHide.prev().attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), toShow.length && toHide.length ? toHide.prev().attr({
                        tabIndex: -1,
                        "aria-expanded": "false"
                    }) : toShow.length && this.headers.filter(function() {
                        return 0 === parseInt(test(this).attr("tabIndex"), 10);
                    }).attr("tabIndex", -1), toShow.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                });
            },
            _animate: function(toShow, toHide, data) {
                var total, easing, duration, that = this, adjust = 0, down = toShow.css("box-sizing"), animate = toShow.length && (!toHide.length || toShow.index() < toHide.index()), options = this.options.animate || {}, complete = animate && options.down || options, callback = function() {
                    that._toggleComplete(data);
                };
                return "number" == typeof complete && (duration = complete), "string" == typeof complete && (easing = complete),
                    easing = easing || complete.easing || options.easing, duration = duration || complete.duration || options.duration,
                    toHide.length ? toShow.length ? (total = toShow.show().outerHeight(), toHide.animate(this.hideProps, {
                                duration: duration,
                                easing: easing,
                                step: function(now, fx) {
                                    fx.now = Math.round(now);
                                }
                            }), void toShow.hide().animate(this.showProps, {
                                duration: duration,
                                easing: easing,
                                complete: callback,
                                step: function(now, fx) {
                                    fx.now = Math.round(now), "height" !== fx.prop ? "content-box" === down && (adjust += fx.now) : "content" !== that.options.heightStyle && (fx.now = Math.round(total - toHide.outerHeight() - adjust),
                                            adjust = 0);
                                }
                            })) : toHide.animate(this.hideProps, duration, easing, callback) : toShow.animate(this.showProps, duration, easing, callback);
            },
            _toggleComplete: function(data) {
                var toHide = data.oldPanel, elem = toHide.prev();
                this._removeClass(toHide, "ui-accordion-content-active"), this._removeClass(elem, "ui-accordion-header-active")._addClass(elem, "ui-accordion-header-collapsed"),
                toHide.length && (toHide.parent()[0].className = toHide.parent()[0].className),
                    this._trigger("activate", null, data);
            }
        }), test.ui.safeActiveElement = function(node) {
            var nodes;
            try {
                nodes = node.activeElement;
            } catch (i) {
                nodes = node.body;
            }
            return nodes || (nodes = node.body), nodes.nodeName || (nodes = node.body), nodes;
        }, test.widget("ui.menu", {
            version: "1.12.1",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-caret-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
                    "mousedown .ui-menu-item": function(event) {
                        event.preventDefault();
                    },
                    "click .ui-menu-item": function(event) {
                        var target = test(event.target), item = test(test.ui.safeActiveElement(this.document[0]));
                        !this.mouseHandled && target.not(".ui-state-disabled").length && (this.select(event),
                        event.isPropagationStopped() || (this.mouseHandled = !0), target.has(".ui-menu").length ? this.expand(event) : !this.element.is(":focus") && item.closest(".ui-menu").length && (this.element.trigger("focus", [ !0 ]),
                            this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                    },
                    "mouseenter .ui-menu-item": function(event) {
                        if (!this.previousFilter) {
                            var target = test(event.target).closest(".ui-menu-item"), elm = test(event.currentTarget);
                            target[0] === elm[0] && (this._removeClass(elm.siblings().children(".ui-state-active"), null, "ui-state-active"),
                                this.focus(event, elm));
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(inRowIndex, inNode) {
                        var item = this.active || this.element.find(this.options.items).eq(0);
                        inNode || this.focus(inRowIndex, item);
                    },
                    blur: function(event) {
                        this._delay(function() {
                            var that = !test.contains(this.element[0], test.ui.safeActiveElement(this.document[0]));
                            that && this.collapseAll(event);
                        });
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(event) {
                        this._closeOnDocumentClick(event) && this.collapseAll(event), this.mouseHandled = !1;
                    }
                });
            },
            _destroy: function() {
                var wrapper = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"), attribs = wrapper.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),
                    attribs.children().each(function() {
                        var t = test(this);
                        t.data("ui-menu-submenu-caret") && t.remove();
                    });
            },
            _keydown: function(event) {
                var match, h, x, y, k = !0;
                switch (event.keyCode) {
                    case test.ui.keyCode.PAGE_UP:
                        this.previousPage(event);
                        break;

                    case test.ui.keyCode.PAGE_DOWN:
                        this.nextPage(event);
                        break;

                    case test.ui.keyCode.HOME:
                        this._move("first", "first", event);
                        break;

                    case test.ui.keyCode.END:
                        this._move("last", "last", event);
                        break;

                    case test.ui.keyCode.UP:
                        this.previous(event);
                        break;

                    case test.ui.keyCode.DOWN:
                        this.next(event);
                        break;

                    case test.ui.keyCode.LEFT:
                        this.collapse(event);
                        break;

                    case test.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(event);
                        break;

                    case test.ui.keyCode.ENTER:
                    case test.ui.keyCode.SPACE:
                        this._activate(event);
                        break;

                    case test.ui.keyCode.ESCAPE:
                        this.collapse(event);
                        break;

                    default:
                        k = !1, h = this.previousFilter || "", y = !1, x = event.keyCode >= 96 && event.keyCode <= 105 ? (event.keyCode - 96).toString() : String.fromCharCode(event.keyCode),
                            clearTimeout(this.filterTimer), x === h ? y = !0 : x = h + x, match = this._filterMenuItems(x),
                            match = y && match.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : match,
                        match.length || (x = String.fromCharCode(event.keyCode), match = this._filterMenuItems(x)),
                            match.length ? (this.focus(event, match), this.previousFilter = x, this.filterTimer = this._delay(function() {
                                    delete this.previousFilter;
                                }, 1e3)) : delete this.previousFilter;
                }
                k && event.preventDefault();
            },
            _activate: function(event) {
                this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(event) : this.select(event));
            },
            refresh: function() {
                var menus, items, n, o, m, self = this, len = this.options.icons.submenu, submenus = this.element.find(this.options.menus);
                this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length),
                    n = submenus.filter(":not(.ui-menu)").hide().attr({
                        role: this.options.role,
                        "aria-hidden": "true",
                        "aria-expanded": "false"
                    }).each(function() {
                        var menu = test(this), item = menu.prev(), submenuCarat = test("<span>").data("ui-menu-submenu-caret", !0);
                        self._addClass(submenuCarat, "ui-menu-icon", "ui-icon " + len), item.attr("aria-haspopup", "true").prepend(submenuCarat),
                            menu.attr("aria-labelledby", item.attr("id"));
                    }), this._addClass(n, "ui-menu", "ui-widget ui-widget-content ui-front"), menus = submenus.add(this.element),
                    items = menus.find(this.options.items), items.not(".ui-menu-item").each(function() {
                    var elem = test(this);
                    self._isDivider(elem) && self._addClass(elem, "ui-menu-divider", "ui-widget-content");
                }), o = items.not(".ui-menu-item, .ui-menu-divider"), m = o.children().not(".ui-menu").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), this._addClass(o, "ui-menu-item")._addClass(m, "ui-menu-item-wrapper"), items.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                this.active && !test.contains(this.element[0], this.active[0]) && this.blur();
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role];
            },
            _setOption: function(key, value) {
                if ("icons" === key) {
                    var elem = this.element.find(".ui-menu-icon");
                    this._removeClass(elem, null, this.options.icons.submenu)._addClass(elem, null, value.submenu);
                }
                this._super(key, value);
            },
            _setOptionDisabled: function(value) {
                this._super(value), this.element.attr("aria-disabled", String(value)), this._toggleClass(null, "ui-state-disabled", !!value);
            },
            focus: function(event, item) {
                var nested, elem, pos;
                this.blur(event, event && "focus" === event.type), this._scrollIntoView(item), this.active = item.first(),
                    elem = this.active.children(".ui-menu-item-wrapper"), this._addClass(elem, null, "ui-state-active"),
                this.options.role && this.element.attr("aria-activedescendant", elem.attr("id")),
                    pos = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),
                    this._addClass(pos, null, "ui-state-active"), event && "keydown" === event.type ? this._close() : this.timer = this._delay(function() {
                        this._close();
                    }, this.delay), nested = item.children(".ui-menu"), nested.length && event && /^mouse/.test(event.type) && this._startOpening(nested),
                    this.activeMenu = item.parent(), this._trigger("focus", event, {
                    item: item
                });
            },
            _scrollIntoView: function(item) {
                var offset, height, top, pos, y, h;
                this._hasScroll() && (offset = parseFloat(test.css(this.activeMenu[0], "borderTopWidth")) || 0,
                    height = parseFloat(test.css(this.activeMenu[0], "paddingTop")) || 0, top = item.offset().top - this.activeMenu.offset().top - offset - height,
                    pos = this.activeMenu.scrollTop(), y = this.activeMenu.height(), h = item.outerHeight(),
                    top < 0 ? this.activeMenu.scrollTop(pos + top) : top + h > y && this.activeMenu.scrollTop(pos + top - y + h));
            },
            blur: function(event, fromFocus) {
                fromFocus || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"),
                    this._trigger("blur", event, {
                        item: this.active
                    }), this.active = null);
            },
            _startOpening: function(submenu) {
                clearTimeout(this.timer), "true" === submenu.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(submenu);
                }, this.delay));
            },
            _open: function(submenu) {
                var position = test.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
                    submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position);
            },
            collapseAll: function(event, all) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var currentMenu = all ? this.element : test(event && event.target).closest(this.element.find(".ui-menu"));
                    currentMenu.length || (currentMenu = this.element), this._close(currentMenu), this.blur(event),
                        this._removeClass(currentMenu.find(".ui-state-active"), null, "ui-state-active"),
                        this.activeMenu = currentMenu;
                }, this.delay);
            },
            _close: function(startMenu) {
                startMenu || (startMenu = this.active ? this.active.parent() : this.element), startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
            },
            _closeOnDocumentClick: function(event) {
                return !test(event.target).closest(".ui-menu").length;
            },
            _isDivider: function(elm) {
                return !/[^\-\u2014\u2013\s]/.test(elm.text());
            },
            collapse: function(event) {
                var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                newItem && newItem.length && (this._close(), this.focus(event, newItem));
            },
            expand: function(event) {
                var newItem = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                newItem && newItem.length && (this._open(newItem.parent()), this._delay(function() {
                    this.focus(event, newItem);
                }));
            },
            next: function(event) {
                this._move("next", "first", event);
            },
            previous: function(event) {
                this._move("prev", "last", event);
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length;
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length;
            },
            _move: function(direction, filter, event) {
                var newItem;
                this.active && (newItem = "first" === direction || "last" === direction ? this.active["first" === direction ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[direction + "All"](".ui-menu-item").eq(0)),
                newItem && newItem.length && this.active || (newItem = this.activeMenu.find(this.options.items)[filter]()),
                    this.focus(event, newItem);
            },
            nextPage: function(event) {
                var item, base, height;
                return this.active ? void (this.isLastItem() || (this._hasScroll() ? (base = this.active.offset().top,
                            height = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                            return item = test(this), item.offset().top - base - height < 0;
                        }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(event);
            },
            previousPage: function(event) {
                var item, base, height;
                return this.active ? void (this.isFirstItem() || (this._hasScroll() ? (base = this.active.offset().top,
                            height = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                            return item = test(this), item.offset().top - base + height > 0;
                        }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items).first()))) : void this.next(event);
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight");
            },
            select: function(event) {
                this.active = this.active || test(event.target).closest(".ui-menu-item");
                var ui = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(event, !0), this._trigger("select", event, ui);
            },
            _filterMenuItems: function(value) {
                var query = value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), expression = new RegExp("^" + query, "i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                    return expression.test(test.trim(test(this).children(".ui-menu-item-wrapper").text()));
                });
            }
        });
        test.widget("ui.autocomplete", {
            version: "1.12.1",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var pos, i, j, name = this.element[0].nodeName.toLowerCase(), options = "textarea" === name, t = "input" === name;
                this.isMultiLine = options || !t && this._isContentEditable(this.element), this.valueMethod = this.element[options || t ? "val" : "text"],
                    this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"),
                    this._on(this.element, {
                        keydown: function(event) {
                            if (this.element.prop("readOnly")) return pos = !0, j = !0, void (i = !0);
                            pos = !1, j = !1, i = !1;
                            var keyCode = test.ui.keyCode;
                            switch (event.keyCode) {
                                case keyCode.PAGE_UP:
                                    pos = !0, this._move("previousPage", event);
                                    break;

                                case keyCode.PAGE_DOWN:
                                    pos = !0, this._move("nextPage", event);
                                    break;

                                case keyCode.UP:
                                    pos = !0, this._keyEvent("previous", event);
                                    break;

                                case keyCode.DOWN:
                                    pos = !0, this._keyEvent("next", event);
                                    break;

                                case keyCode.ENTER:
                                    this.menu.active && (pos = !0, event.preventDefault(), this.menu.select(event));
                                    break;

                                case keyCode.TAB:
                                    this.menu.active && this.menu.select(event);
                                    break;

                                case keyCode.ESCAPE:
                                    this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term),
                                        this.close(event), event.preventDefault());
                                    break;

                                default:
                                    i = !0, this._searchTimeout(event);
                            }
                        },
                        keypress: function(event) {
                            if (pos) return pos = !1, void (this.isMultiLine && !this.menu.element.is(":visible") || event.preventDefault());
                            if (!i) {
                                var keyCode = test.ui.keyCode;
                                switch (event.keyCode) {
                                    case keyCode.PAGE_UP:
                                        this._move("previousPage", event);
                                        break;

                                    case keyCode.PAGE_DOWN:
                                        this._move("nextPage", event);
                                        break;

                                    case keyCode.UP:
                                        this._keyEvent("previous", event);
                                        break;

                                    case keyCode.DOWN:
                                        this._keyEvent("next", event);
                                }
                            }
                        },
                        input: function(event) {
                            return j ? (j = !1, void event.preventDefault()) : void this._searchTimeout(event);
                        },
                        focus: function() {
                            this.selectedItem = null, this.previous = this._value();
                        },
                        blur: function(event) {
                            return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching),
                                    this.close(event), void this._change(event));
                        }
                    }), this._initSource(), this.menu = test("<ul>").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
                    this._on(this.menu.element, {
                        mousedown: function(event) {
                            event.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                                delete this.cancelBlur, this.element[0] !== test.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus");
                            });
                        },
                        menufocus: function(event, ui) {
                            var item, panel;
                            return this.isNewMenu && (this.isNewMenu = !1, event.originalEvent && /^mouse/.test(event.originalEvent.type)) ? (this.menu.blur(),
                                    void this.document.one("mousemove", function() {
                                        test(event.target).trigger(event.originalEvent);
                                    })) : (panel = ui.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", event, {
                                    item: panel
                                }) && event.originalEvent && /^key/.test(event.originalEvent.type) && this._value(panel.value),
                                    item = ui.item.attr("aria-label") || panel.value, void (item && test.trim(item).length && (this.liveRegion.children().hide(),
                                    test("<div>").text(item).appendTo(this.liveRegion))));
                        },
                        menuselect: function(event, ui) {
                            var item = ui.item.data("ui-autocomplete-item"), previous = this.previous;
                            this.element[0] !== test.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"),
                                this.previous = previous, this._delay(function() {
                                this.previous = previous, this.selectedItem = item;
                            })), !1 !== this._trigger("select", event, {
                                item: item
                            }) && this._value(item.value), this.term = this._value(), this.close(event), this.selectedItem = item;
                        }
                    }), this.liveRegion = test("<div>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                    this._on(this.window, {
                        beforeunload: function() {
                            this.element.removeAttr("autocomplete");
                        }
                    });
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(),
                    this.liveRegion.remove();
            },
            _setOption: function(key, value) {
                this._super(key, value), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo(this._appendTo()),
                "disabled" === key && value && this.xhr && this.xhr.abort();
            },
            _isEventTargetInWidget: function(evt) {
                var input = this.menu.element[0];
                return evt.target === this.element[0] || evt.target === input || test.contains(input, evt.target);
            },
            _closeOnClickOutside: function(service) {
                this._isEventTargetInWidget(service) || this.close();
            },
            _appendTo: function() {
                var element = this.options.appendTo;
                return element && (element = element.jquery || element.nodeType ? test(element) : this.document.find(element).eq(0)),
                element && element[0] || (element = this.element.closest(".ui-front, dialog")),
                element.length || (element = this.document[0].body), element;
            },
            _initSource: function() {
                var array, url, that = this;
                test.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
                        response(test.ui.autocomplete.filter(array, request.term));
                    }) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
                            that.xhr && that.xhr.abort(), that.xhr = test.ajax({
                                url: url,
                                data: request,
                                dataType: "json",
                                success: function(data) {
                                    response(data);
                                },
                                error: function() {
                                    response([]);
                                }
                            });
                        }) : this.source = this.options.source;
            },
            _searchTimeout: function(event) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    var a = this.term === this._value(), b = this.menu.element.is(":visible"), c = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
                    a && (!a || b || c) || (this.selectedItem = null, this.search(null, event));
                }, this.options.delay);
            },
            search: function(value, event) {
                return value = null != value ? value : this._value(), this.term = this._value(),
                    value.length < this.options.minLength ? this.close(event) : this._trigger("search", event) !== !1 ? this._search(value) : void 0;
            },
            _search: function(value) {
                this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1,
                    this.source({
                        term: value
                    }, this._response());
            },
            _response: function() {
                var index = ++this.requestIndex;
                return test.proxy(function(content) {
                    index === this.requestIndex && this.__response(content), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading");
                }, this);
            },
            __response: function(content) {
                content && (content = this._normalize(content)), this._trigger("response", null, {
                    content: content
                }), !this.options.disabled && content && content.length && !this.cancelSearch ? (this._suggest(content),
                        this._trigger("open")) : this._close();
            },
            close: function(event) {
                this.cancelSearch = !0, this._close(event);
            },
            _close: function(event) {
                this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(),
                    this.menu.blur(), this.isNewMenu = !0, this._trigger("close", event));
            },
            _change: function(event) {
                this.previous !== this._value() && this._trigger("change", event, {
                    item: this.selectedItem
                });
            },
            _normalize: function(items) {
                return items.length && items[0].label && items[0].value ? items : test.map(items, function(item) {
                        return "string" == typeof item ? {
                                label: item,
                                value: item
                            } : test.extend({}, item, {
                                label: item.label || item.value,
                                value: item.value || item.label
                            });
                    });
            },
            _suggest: function(items) {
                var ul = this.menu.element.empty();
                this._renderMenu(ul, items), this.isNewMenu = !0, this.menu.refresh(), ul.show(),
                    this._resizeMenu(), ul.position(test.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {
                    mousedown: "_closeOnClickOutside"
                });
            },
            _resizeMenu: function() {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
            },
            _renderMenu: function(ul, items) {
                var that = this;
                test.each(items, function(groupItem, item) {
                    that._renderItemData(ul, item);
                });
            },
            _renderItemData: function(item, index) {
                return this._renderItem(item, index).data("ui-autocomplete-item", index);
            },
            _renderItem: function(item, option) {
                return test("<li>").append(test("<div>").text(option.label)).appendTo(item);
            },
            _move: function(direction, event) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) ? (this.isMultiLine || this._value(this.term),
                            void this.menu.blur()) : void this.menu[direction](event) : void this.search(null, event);
            },
            widget: function() {
                return this.menu.element;
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments);
            },
            _keyEvent: function(keyEvent, event) {
                this.isMultiLine && !this.menu.element.is(":visible") || (this._move(keyEvent, event),
                    event.preventDefault());
            },
            _isContentEditable: function(element) {
                if (!element.length) return !1;
                var src = element.prop("contentEditable");
                return "inherit" === src ? this._isContentEditable(element.parent()) : "true" === src;
            }
        }), test.extend(test.ui.autocomplete, {
            escapeRegex: function(value) {
                return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            },
            filter: function(array, term) {
                var matcher = new RegExp(test.ui.autocomplete.escapeRegex(term), "i");
                return test.grep(array, function(value) {
                    return matcher.test(value.label || value.value || value);
                });
            }
        }), test.widget("ui.autocomplete", test.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(amount) {
                        return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                    }
                }
            },
            __response: function(content) {
                var text;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (text = content && content.length ? this.options.messages.results(content.length) : this.options.messages.noResults,
                    this.liveRegion.children().hide(), test("<div>").text(text).appendTo(this.liveRegion));
            }
        });
        var re = (test.ui.autocomplete, /ui-corner-([a-z]){2,6}/g);
        test.widget("ui.controlgroup", {
            version: "1.12.1",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input"
                }
            },
            _create: function() {
                this._enhance();
            },
            _enhance: function() {
                this.element.attr("role", "toolbar"), this.refresh();
            },
            _destroy: function() {
                this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"),
                    this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
            },
            _initWidgets: function() {
                var self = this, h = [];
                test.each(this.options.items, function(name, value) {
                    var target, settings = {};
                    if (value) return "controlgroupLabel" === name ? (target = self.element.find(value),
                            target.each(function() {
                                var element = test(this);
                                element.children(".ui-controlgroup-label-contents").length || element.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
                            }), self._addClass(target, null, "ui-widget ui-widget-content ui-state-default"),
                            void (h = h.concat(target.get()))) : void (test.fn[name] && (settings = self["_" + name + "Options"] ? self["_" + name + "Options"]("middle") : {
                                classes: {}
                            }, self.element.find(value).each(function() {
                            var element = test(this), fn = element[name]("instance"), selector = test.widget.extend({}, settings);
                            if ("button" !== name || !element.parent(".ui-spinner").length) {
                                fn || (fn = element[name]()[name]("instance")), fn && (selector.classes = self._resolveClassesValues(selector.classes, fn)),
                                    element[name](selector);
                                var elem = element[name]("widget");
                                test.data(elem[0], "ui-controlgroup-data", fn ? fn : element[name]("instance")),
                                    h.push(elem[0]);
                            }
                        })));
                }), this.childWidgets = test(test.unique(h)), this._addClass(this.childWidgets, "ui-controlgroup-item");
            },
            _callChildMethod: function($1) {
                this.childWidgets.each(function() {
                    var t = test(this), data = t.data("ui-controlgroup-data");
                    data && data[$1] && data[$1]();
                });
            },
            _updateCornerClass: function(elem, options) {
                var m = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all", i = this._buildSimpleOptions(options, "label").classes.label;
                this._removeClass(elem, null, m), this._addClass(elem, null, i);
            },
            _buildSimpleOptions: function(i, j) {
                var isVertical = "vertical" === this.options.direction, w = {
                    classes: {}
                };
                return w.classes[j] = {
                    middle: "",
                    first: "ui-corner-" + (isVertical ? "top" : "left"),
                    last: "ui-corner-" + (isVertical ? "bottom" : "right"),
                    only: "ui-corner-all"
                }[i], w;
            },
            _spinnerOptions: function(parameters) {
                var options = this._buildSimpleOptions(parameters, "ui-spinner");
                return options.classes["ui-spinner-up"] = "", options.classes["ui-spinner-down"] = "",
                    options;
            },
            _buttonOptions: function(service) {
                return this._buildSimpleOptions(service, "ui-button");
            },
            _checkboxradioOptions: function(service) {
                return this._buildSimpleOptions(service, "ui-checkboxradio-label");
            },
            _selectmenuOptions: function(t) {
                var isVertical = "vertical" === this.options.direction;
                return {
                    width: !!isVertical && "auto",
                    classes: {
                        middle: {
                            "ui-selectmenu-button-open": "",
                            "ui-selectmenu-button-closed": ""
                        },
                        first: {
                            "ui-selectmenu-button-open": "ui-corner-" + (isVertical ? "top" : "tl"),
                            "ui-selectmenu-button-closed": "ui-corner-" + (isVertical ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu-button-open": isVertical ? "" : "ui-corner-tr",
                            "ui-selectmenu-button-closed": "ui-corner-" + (isVertical ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu-button-open": "ui-corner-top",
                            "ui-selectmenu-button-closed": "ui-corner-all"
                        }
                    }[t]
                };
            },
            _resolveClassesValues: function(obj, plugin) {
                var doc = {};
                return test.each(obj, function(key) {
                    var s = plugin.options.classes[key] || "";
                    s = test.trim(s.replace(re, "")), doc[key] = (s + " " + obj[key]).replace(/\s+/g, " ");
                }), doc;
            },
            _setOption: function(key, value) {
                return "direction" === key && this._removeClass("ui-controlgroup-" + this.options.direction),
                    this._super(key, value), "disabled" === key ? void this._callChildMethod(value ? "disable" : "enable") : void this.refresh();
            },
            refresh: function() {
                var container, f = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"),
                    this._initWidgets(), container = this.childWidgets, this.options.onlyVisible && (container = container.filter(":visible")),
                container.length && (test.each([ "first", "last" ], function(name, value) {
                    var a = container[value]().data("ui-controlgroup-data");
                    if (a && f["_" + a.widgetName + "Options"]) {
                        var selector = f["_" + a.widgetName + "Options"](1 === container.length ? "only" : value);
                        selector.classes = f._resolveClassesValues(selector.classes, a), a.element[a.widgetName](selector);
                    } else f._updateCornerClass(container[value](), value);
                }), this._callChildMethod("refresh"));
            }
        });
        test.widget("ui.checkboxradio", [ test.ui.formResetMixin, {
            version: "1.12.1",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all"
                }
            },
            _getCreateOptions: function() {
                var options, name, self = this, o = this._super() || {};
                return this._readType(), name = this.element.labels(), this.label = test(name[name.length - 1]),
                this.label.length || test.error("No label found for checkboxradio widget"), this.originalLabel = "",
                    this.label.contents().not(this.element[0]).each(function() {
                        self.originalLabel += 3 === this.nodeType ? test(this).text() : this.outerHTML;
                    }), this.originalLabel && (o.label = this.originalLabel), options = this.element[0].disabled,
                null != options && (o.disabled = options), o;
            },
            _create: function() {
                var tag = this.element[0].checked;
                this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled),
                    this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
                    this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"),
                    this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel),
                    this._enhance(), tag && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"),
                this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
                    },
                    blur: function() {
                        this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
                    }
                });
            },
            _readType: function() {
                var name = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type, "input" === name && /radio|checkbox/.test(this.type) || test.error("Can't create checkboxradio on element.nodeName=" + name + " and element.type=" + this.type);
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked);
            },
            widget: function() {
                return this.label;
            },
            _getRadioGroup: function() {
                var i, tag = this.element[0].name, selector = "input[name='" + test.ui.escapeSelector(tag) + "']";
                return tag ? (i = this.form.length ? test(this.form[0].elements).filter(selector) : test(selector).filter(function() {
                            return 0 === test(this).form().length;
                        }), i.not(this.element)) : test([]);
            },
            _toggleClasses: function() {
                var html_message = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", html_message),
                this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", html_message)._toggleClass(this.icon, null, "ui-icon-blank", !html_message),
                "radio" === this.type && this._getRadioGroup().each(function() {
                    var obj = test(this).checkboxradio("instance");
                    obj && obj._removeClass(obj.label, "ui-checkboxradio-checked", "ui-state-active");
                });
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove());
            },
            _setOption: function(key, value) {
                if ("label" !== key || value) return this._super(key, value), "disabled" === key ? (this._toggleClass(this.label, null, "ui-state-disabled", value),
                        void (this.element[0].disabled = value)) : void this.refresh();
            },
            _updateIcon: function(reverseBackwards) {
                var fn = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = test("<span>"), this.iconSpace = test("<span> </span>"),
                        this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (fn += reverseBackwards ? "ui-icon-check ui-state-checked" : "ui-icon-blank",
                            this._removeClass(this.icon, null, reverseBackwards ? "ui-icon-blank" : "ui-icon-check")) : fn += "ui-icon-blank",
                        this._addClass(this.icon, "ui-checkboxradio-icon", fn), reverseBackwards || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"),
                        this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(),
                        this.iconSpace.remove(), delete this.icon);
            },
            _updateLabel: function() {
                var elems = this.label.contents().not(this.element[0]);
                this.icon && (elems = elems.not(this.icon[0])), this.iconSpace && (elems = elems.not(this.iconSpace[0])),
                    elems.remove(), this.label.append(this.options.label);
            },
            refresh: function() {
                var evt = this.element[0].checked, isDisabled = this.element[0].disabled;
                this._updateIcon(evt), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", evt),
                null !== this.options.label && this._updateLabel(), isDisabled !== this.options.disabled && this._setOptions({
                    disabled: isDisabled
                });
            }
        } ]);
        test.ui.checkboxradio;
        test.widget("ui.button", {
            version: "1.12.1",
            defaultElement: "<button>",
            options: {
                classes: {
                    "ui-button": "ui-corner-all"
                },
                disabled: null,
                icon: null,
                iconPosition: "beginning",
                label: null,
                showLabel: !0
            },
            _getCreateOptions: function() {
                var options, element = this._super() || {};
                return this.isInput = this.element.is("input"), options = this.element[0].disabled,
                null != options && (element.disabled = options), this.originalLabel = this.isInput ? this.element.val() : this.element.html(),
                this.originalLabel && (element.label = this.originalLabel), element;
            },
            _create: function() {
                !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1),
                    this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)),
                    this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled),
                    this._enhance(), this.element.is("a") && this._on({
                    keyup: function(event) {
                        event.keyCode === test.ui.keyCode.SPACE && (event.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"));
                    }
                });
            },
            _enhance: function() {
                this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon),
                    this._updateTooltip());
            },
            _updateTooltip: function() {
                this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label);
            },
            _updateIcon: function(propagateMessageEvent, context) {
                var callback = "iconPosition" !== propagateMessageEvent, b = callback ? this.options.iconPosition : context, c = "top" === b || "bottom" === b;
                this.icon ? callback && this._removeClass(this.icon, null, this.options.icon) : (this.icon = test("<span>"),
                        this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")),
                callback && this._addClass(this.icon, null, context), this._attachIcon(b), c ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
                    this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = test("<span> </span>"),
                        this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                        this._attachIconSpace(b));
            },
            _destroy: function() {
                this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(),
                this.hasTitle || this.element.removeAttr("title");
            },
            _attachIconSpace: function(element) {
                this.icon[/^(?:end|bottom)/.test(element) ? "before" : "after"](this.iconSpace);
            },
            _attachIcon: function(names) {
                this.element[/^(?:end|bottom)/.test(names) ? "append" : "prepend"](this.icon);
            },
            _setOptions: function(options) {
                var self = void 0 === options.showLabel ? this.options.showLabel : options.showLabel, value = void 0 === options.icon ? this.options.icon : options.icon;
                self || value || (options.showLabel = !0), this._super(options);
            },
            _setOption: function(key, value) {
                "icon" === key && (value ? this._updateIcon(key, value) : this.icon && (this.icon.remove(),
                    this.iconSpace && this.iconSpace.remove())), "iconPosition" === key && this._updateIcon(key, value),
                "showLabel" === key && (this._toggleClass("ui-button-icon-only", null, !value),
                    this._updateTooltip()), "label" === key && (this.isInput ? this.element.val(value) : (this.element.html(value),
                    this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))),
                    this._super(key, value), "disabled" === key && (this._toggleClass(null, "ui-state-disabled", value),
                    this.element[0].disabled = value, value && this.element.blur());
            },
            refresh: function() {
                var isDisabled = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                isDisabled !== this.options.disabled && this._setOptions({
                    disabled: isDisabled
                }), this._updateTooltip();
            }
        }), test.uiBackCompat !== !1 && (test.widget("ui.button", test.ui.button, {
            options: {
                text: !0,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text),
                !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel),
                    this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary,
                                this.options.iconPosition = "end"), this._super();
            },
            _setOption: function(key, value) {
                return "text" === key ? void this._super("showLabel", value) : ("showLabel" === key && (this.options.text = value),
                    "icon" === key && (this.options.icons.primary = value), "icons" === key && (value.primary ? (this._super("icon", value.primary),
                            this._super("iconPosition", "beginning")) : value.secondary && (this._super("icon", value.secondary),
                            this._super("iconPosition", "end"))), void this._superApply(arguments));
            }
        }), test.fn.button = function(orig) {
            return function() {
                return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? orig.apply(this, arguments) : (test.ui.checkboxradio || test.error("Checkboxradio widget missing"),
                        0 === arguments.length ? this.checkboxradio({
                                icon: !1
                            }) : this.checkboxradio.apply(this, arguments));
            };
        }(test.fn.button), test.fn.buttonset = function() {
            return test.ui.controlgroup || test.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [ arguments[0], "items.button", arguments[2] ]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [ arguments[0], "items.button" ]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
                        button: arguments[0].items
                    }), this.controlgroup.apply(this, arguments));
        });
        test.ui.button;
        test.extend(test.ui, {
            datepicker: {
                version: "1.12.1"
            }
        });
        var inst;
        test.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv;
            },
            setDefaults: function(settings) {
                return extendRemove(this._defaults, settings || {}), this;
            },
            _attachDatepicker: function(target, settings) {
                var nodeName, inline, inst;
                nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName,
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst(test(target), inline),
                    inst.settings = test.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
            },
            _newInst: function(target, inline) {
                var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: id,
                    input: target,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: inline,
                    dpDiv: inline ? bindHover(test("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                };
            },
            _connectDatepicker: function(target, inst) {
                var input = test(target);
                inst.append = test([]), inst.trigger = test([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst),
                    input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp),
                    this._autoSize(inst), test.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target));
            },
            _attachments: function(input, inst) {
                var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
                inst.append && inst.append.remove(), appendText && (inst.append = test("<span class='" + this._appendClass + "'>" + appendText + "</span>"),
                    input[isRTL ? "before" : "after"](inst.append)), input.off("focus", this._showDatepicker),
                inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), "focus" !== showOn && "both" !== showOn || input.on("focus", this._showDatepicker),
                "button" !== showOn && "both" !== showOn || (buttonText = this._get(inst, "buttonText"),
                    buttonImage = this._get(inst, "buttonImage"), inst.trigger = test(this._get(inst, "buttonImageOnly") ? test("<img/>").addClass(this._triggerClass).attr({
                        src: buttonImage,
                        alt: buttonText,
                        title: buttonText
                    }) : test("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? test("<img/>").attr({
                            src: buttonImage,
                            alt: buttonText,
                            title: buttonText
                        }) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.on("click", function() {
                    return test.datepicker._datepickerShowing && test.datepicker._lastInput === input[0] ? test.datepicker._hideDatepicker() : test.datepicker._datepickerShowing && test.datepicker._lastInput !== input[0] ? (test.datepicker._hideDatepicker(),
                                test.datepicker._showDatepicker(input[0])) : test.datepicker._showDatepicker(input[0]),
                        !1;
                }));
            },
            _autoSize: function(inst) {
                if (this._get(inst, "autoSize") && !inst.inline) {
                    var findMax, max, maxI, i, date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
                    dateFormat.match(/[DM]/) && (findMax = function(names) {
                        for (max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length,
                            maxI = i);
                        return maxI;
                    }, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                        date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())),
                        inst.input.attr("size", this._formatDate(inst, date).length);
                }
            },
            _inlineDatepicker: function(target, inst) {
                var divSpan = test(target);
                divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv),
                    test.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0),
                    this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target),
                    inst.dpDiv.css("display", "block"));
            },
            _dialogDatepicker: function(input, date, onSelect, settings, pos) {
                var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
                return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = test("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"),
                    this._dialogInput.on("keydown", this._doKeyDown), test("body").append(this._dialogInput),
                    inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {},
                    test.data(this._dialogInput[0], "datepicker", inst)), extendRemove(inst.settings, settings || {}),
                    date = date && date.constructor === Date ? this._formatDate(inst, date) : date,
                    this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [ pos.pageX, pos.pageY ] : null,
                this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight,
                    scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop,
                    this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ]),
                    this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                    inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass),
                    this._showDatepicker(this._dialogInput[0]), test.blockUI && test.blockUI(this.dpDiv),
                    test.data(this._dialogInput[0], "datepicker", inst), this;
            },
            _destroyDatepicker: function(target) {
                var nodeName, $target = test(target), parent = test.data(target, "datepicker");
                $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(),
                    test.removeData(target, "datepicker"), "input" === nodeName ? (parent.append.remove(),
                        parent.trigger.remove(), $target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty(),
                inst === parent && (inst = null));
            },
            _enableDatepicker: function(target) {
                var nodeName, inline, $target = test(target), inst = test.data(target, "datepicker");
                $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(),
                    "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function() {
                            this.disabled = !1;
                        }).end().filter("img").css({
                            opacity: "1.0",
                            cursor: ""
                        })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass),
                            inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                    this._disabledInputs = test.map(this._disabledInputs, function(value) {
                        return value === target ? null : value;
                    }));
            },
            _disableDatepicker: function(target) {
                var nodeName, inline, $target = test(target), inst = test.data(target, "datepicker");
                $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(),
                    "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function() {
                            this.disabled = !0;
                        }).end().filter("img").css({
                            opacity: "0.5",
                            cursor: "default"
                        })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass),
                            inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                    this._disabledInputs = test.map(this._disabledInputs, function(value) {
                        return value === target ? null : value;
                    }), this._disabledInputs[this._disabledInputs.length] = target);
            },
            _isDisabledDatepicker: function(target) {
                if (!target) return !1;
                for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] === target) return !0;
                return !1;
            },
            _getInst: function(target) {
                try {
                    return test.data(target, "datepicker");
                } catch (err) {
                    throw "Missing instance data for this datepicker";
                }
            },
            _optionDatepicker: function(target, key, value) {
                var settings, date, minDate, maxDate, inst = this._getInst(target);
                return 2 === arguments.length && "string" == typeof key ? "defaults" === key ? test.extend({}, test.datepicker._defaults) : inst ? "all" === key ? test.extend({}, inst.settings) : this._get(inst, key) : null : (settings = key || {},
                    "string" == typeof key && (settings = {}, settings[key] = value), void (inst && (this._curInst === inst && this._hideDatepicker(),
                        date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"),
                        maxDate = this._getMinMaxDate(inst, "max"), extendRemove(inst.settings, settings),
                    null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)),
                    null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)),
                    "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)),
                        this._attachments(test(target), inst), this._autoSize(inst), this._setDate(inst, date),
                        this._updateAlternate(inst), this._updateDatepicker(inst))));
            },
            _changeDatepicker: function(target, name, value) {
                this._optionDatepicker(target, name, value);
            },
            _refreshDatepicker: function(target) {
                var inst = this._getInst(target);
                inst && this._updateDatepicker(inst);
            },
            _setDateDatepicker: function(target, date) {
                var inst = this._getInst(target);
                inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst));
            },
            _getDateDatepicker: function(target, noDefault) {
                var inst = this._getInst(target);
                return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null;
            },
            _doKeyDown: function(event) {
                var onSelect, dateStr, sel, inst = test.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
                if (inst._keyEvent = !0, test.datepicker._datepickerShowing) switch (event.keyCode) {
                    case 9:
                        test.datepicker._hideDatepicker(), handled = !1;
                        break;

                    case 13:
                        return sel = test("td." + test.datepicker._dayOverClass + ":not(." + test.datepicker._currentClass + ")", inst.dpDiv),
                        sel[0] && test.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]),
                            onSelect = test.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = test.datepicker._formatDate(inst),
                                onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ])) : test.datepicker._hideDatepicker(),
                            !1;

                    case 27:
                        test.datepicker._hideDatepicker();
                        break;

                    case 33:
                        test.datepicker._adjustDate(event.target, event.ctrlKey ? -test.datepicker._get(inst, "stepBigMonths") : -test.datepicker._get(inst, "stepMonths"), "M");
                        break;

                    case 34:
                        test.datepicker._adjustDate(event.target, event.ctrlKey ? +test.datepicker._get(inst, "stepBigMonths") : +test.datepicker._get(inst, "stepMonths"), "M");
                        break;

                    case 35:
                        (event.ctrlKey || event.metaKey) && test.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                        break;

                    case 36:
                        (event.ctrlKey || event.metaKey) && test.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                        break;

                    case 37:
                        (event.ctrlKey || event.metaKey) && test.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"),
                            handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && test.datepicker._adjustDate(event.target, event.ctrlKey ? -test.datepicker._get(inst, "stepBigMonths") : -test.datepicker._get(inst, "stepMonths"), "M");
                        break;

                    case 38:
                        (event.ctrlKey || event.metaKey) && test.datepicker._adjustDate(event.target, -7, "D"),
                            handled = event.ctrlKey || event.metaKey;
                        break;

                    case 39:
                        (event.ctrlKey || event.metaKey) && test.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"),
                            handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && test.datepicker._adjustDate(event.target, event.ctrlKey ? +test.datepicker._get(inst, "stepBigMonths") : +test.datepicker._get(inst, "stepMonths"), "M");
                        break;

                    case 40:
                        (event.ctrlKey || event.metaKey) && test.datepicker._adjustDate(event.target, 7, "D"),
                            handled = event.ctrlKey || event.metaKey;
                        break;

                    default:
                        handled = !1;
                } else 36 === event.keyCode && event.ctrlKey ? test.datepicker._showDatepicker(this) : handled = !1;
                handled && (event.preventDefault(), event.stopPropagation());
            },
            _doKeyPress: function(event) {
                var chars, chr, inst = test.datepicker._getInst(event.target);
                if (test.datepicker._get(inst, "constrainInput")) return chars = test.datepicker._possibleChars(test.datepicker._get(inst, "dateFormat")),
                    chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode),
                event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
            },
            _doKeyUp: function(event) {
                var date, inst = test.datepicker._getInst(event.target);
                if (inst.input.val() !== inst.lastVal) try {
                    date = test.datepicker.parseDate(test.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, test.datepicker._getFormatConfig(inst)),
                    date && (test.datepicker._setDateFromField(inst), test.datepicker._updateAlternate(inst),
                        test.datepicker._updateDatepicker(inst));
                } catch (s) {}
                return !0;
            },
            _showDatepicker: function(input) {
                if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = test("input", input.parentNode)[0]),
                    !test.datepicker._isDisabledDatepicker(input) && test.datepicker._lastInput !== input) {
                    var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                    inst = test.datepicker._getInst(input), test.datepicker._curInst && test.datepicker._curInst !== inst && (test.datepicker._curInst.dpDiv.stop(!0, !0),
                    inst && test.datepicker._datepickerShowing && test.datepicker._hideDatepicker(test.datepicker._curInst.input[0])),
                        beforeShow = test.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) : {},
                    beforeShowSettings !== !1 && (extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null,
                        test.datepicker._lastInput = input, test.datepicker._setDateFromField(inst), test.datepicker._inDialog && (input.value = ""),
                    test.datepicker._pos || (test.datepicker._pos = test.datepicker._findPos(input),
                        test.datepicker._pos[1] += input.offsetHeight), isFixed = !1, test(input).parents().each(function() {
                        return isFixed |= "fixed" === test(this).css("position"), !isFixed;
                    }), offset = {
                        left: test.datepicker._pos[0],
                        top: test.datepicker._pos[1]
                    }, test.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), test.datepicker._updateDatepicker(inst), offset = test.datepicker._checkOffset(inst, offset, isFixed),
                        inst.dpDiv.css({
                            position: test.datepicker._inDialog && test.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                            display: "none",
                            left: offset.left + "px",
                            top: offset.top + "px"
                        }), inst.inline || (showAnim = test.datepicker._get(inst, "showAnim"), duration = test.datepicker._get(inst, "duration"),
                        inst.dpDiv.css("z-index", datepicker_getZindex(test(input)) + 1), test.datepicker._datepickerShowing = !0,
                        test.effects && test.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, test.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null),
                    test.datepicker._shouldFocusInput(inst) && inst.input.trigger("focus"), test.datepicker._curInst = inst));
                }
            },
            _updateDatepicker: function(data) {
                this.maxRows = 4, inst = data, data.dpDiv.empty().append(this._generateHTML(data)),
                    this._attachHandlers(data);
                var origyearshtml, numMonths = this._getNumberOfMonths(data), cols = numMonths[1], width = 17, records = data.dpDiv.find("." + this._dayOverClass + " a");
                records.length > 0 && f.apply(records.get(0)), data.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                cols > 1 && data.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"),
                    data.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                    data.dpDiv[(this._get(data, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                data === test.datepicker._curInst && test.datepicker._datepickerShowing && test.datepicker._shouldFocusInput(data) && data.input.trigger("focus"),
                data.yearshtml && (origyearshtml = data.yearshtml, setTimeout(function() {
                    origyearshtml === data.yearshtml && data.yearshtml && data.dpDiv.find("select.ui-datepicker-year:first").replaceWith(data.yearshtml),
                        origyearshtml = data.yearshtml = null;
                }, 0));
            },
            _shouldFocusInput: function(inst) {
                return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
            },
            _checkOffset: function(inst, offset, isFixed) {
                var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : test(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : test(document).scrollTop());
                return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? test(document).scrollLeft() : 0,
                    offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? test(document).scrollTop() : 0,
                    offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0),
                    offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0),
                    offset;
            },
            _findPos: function(obj) {
                for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || test.expr.filters.hidden(obj)); ) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
                return position = test(obj).offset(), [ position.left, position.top ];
            },
            _hideDatepicker: function(input) {
                var showAnim, duration, postProcess, onClose, inst = this._curInst;
                !inst || input && inst !== test.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"),
                    duration = this._get(inst, "duration"), postProcess = function() {
                    test.datepicker._tidyDialog(inst);
                }, test.effects && (test.effects.effect[showAnim] || test.effects[showAnim]) ? inst.dpDiv.hide(showAnim, test.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess),
                showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"),
                onClose && onClose.apply(inst.input ? inst.input[0] : null, [ inst.input ? inst.input.val() : "", inst ]),
                    this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), test.blockUI && (test.unblockUI(), test("body").append(this.dpDiv))), this._inDialog = !1);
            },
            _tidyDialog: function(inst) {
                inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
            },
            _checkExternalClick: function(event) {
                if (test.datepicker._curInst) {
                    var $target = test(event.target), inst = test.datepicker._getInst($target[0]);
                    ($target[0].id === test.datepicker._mainDivId || 0 !== $target.parents("#" + test.datepicker._mainDivId).length || $target.hasClass(test.datepicker.markerClassName) || $target.closest("." + test.datepicker._triggerClass).length || !test.datepicker._datepickerShowing || test.datepicker._inDialog && test.blockUI) && (!$target.hasClass(test.datepicker.markerClassName) || test.datepicker._curInst === inst) || test.datepicker._hideDatepicker();
                }
            },
            _adjustDate: function(id, offset, period) {
                var target = test(id), inst = this._getInst(target[0]);
                this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period),
                    this._updateDatepicker(inst));
            },
            _gotoToday: function(id) {
                var date, target = test(id), inst = this._getInst(target[0]);
                this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay,
                        inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date(),
                        inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(),
                        inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst),
                    this._adjustDate(target);
            },
            _selectMonthYear: function(id, select, period) {
                var target = test(id), inst = this._getInst(target[0]);
                inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10),
                    this._notifyChange(inst), this._adjustDate(target);
            },
            _selectDay: function(id, month, year, td) {
                var inst, target = test(id);
                test(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]),
                    inst.selectedDay = inst.currentDay = test("a", td).html(), inst.selectedMonth = inst.currentMonth = month,
                    inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)));
            },
            _clearDate: function(id) {
                var target = test(id);
                this._selectDate(target, "");
            },
            _selectDate: function(id, dateStr) {
                var onSelect, target = test(id), inst = this._getInst(target[0]);
                dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr),
                    this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ]) : inst.input && inst.input.trigger("change"),
                    inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0],
                        "object" != typeof inst.input[0] && inst.input.trigger("focus"), this._lastInput = null);
            },
            _updateAlternate: function(inst) {
                var altFormat, date, dateStr, altField = this._get(inst, "altField");
                altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"),
                    date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)),
                    test(altField).val(dateStr));
            },
            noWeekends: function(date) {
                var day = date.getDay();
                return [ day > 0 && day < 6, "" ];
            },
            iso8601Week: function(date) {
                var time, checkDate = new Date(date.getTime());
                return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(),
                    checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
            },
            parseDate: function(format, value, settings) {
                if (null == format || null == value) throw "Invalid arguments";
                if (value = "object" == typeof value ? value.toString() : value + "", "" === value) return null;
                var iFormat, dim, extra, def, iValue = 0, shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, dayNamesShort = "string" != typeof shortYearCutoff ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10), dayNames = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, monthNamesShort = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNames = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, seconds = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, literal = -1, date = !1, lookAhead = function(match) {
                    var i = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return i && iFormat++, i;
                }, getNumber = function(match) {
                    var isDoubled = lookAhead(match), size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2, m = "y" === match ? size : 1, digits = new RegExp("^\\d{" + m + "," + size + "}"), num = value.substring(iValue).match(digits);
                    if (!num) throw "Missing number at position " + iValue;
                    return iValue += num[0].length, parseInt(num[0], 10);
                }, getName = function(match, shortNames, longNames) {
                    var index = -1, names = test.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                        return [ [ k, v ] ];
                    }).sort(function(a, b) {
                        return -(a[1].length - b[1].length);
                    });
                    if (test.each(names, function(i, pair) {
                            var name = pair[1];
                            if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) return index = pair[0],
                                iValue += name.length, !1;
                        }), index !== -1) return index + 1;
                    throw "Unknown name at position " + iValue;
                }, checkLiteral = function() {
                    if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                    iValue++;
                };
                for (iFormat = 0; iFormat < format.length; iFormat++) if (date) "'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : date = !1; else switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;

                    case "D":
                        getName("D", dayNames, monthNamesShort);
                        break;

                    case "o":
                        literal = getNumber("o");
                        break;

                    case "m":
                        month = getNumber("m");
                        break;

                    case "M":
                        month = getName("M", monthNames, seconds);
                        break;

                    case "y":
                        year = getNumber("y");
                        break;

                    case "@":
                        def = new Date(getNumber("@")), year = def.getFullYear(), month = def.getMonth() + 1,
                            day = def.getDate();
                        break;

                    case "!":
                        def = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = def.getFullYear(),
                            month = def.getMonth() + 1, day = def.getDate();
                        break;

                    case "'":
                        lookAhead("'") ? checkLiteral() : date = !0;
                        break;

                    default:
                        checkLiteral();
                }
                if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra))) throw "Extra/unparsed characters found in date: " + extra;
                if (year === -1 ? year = new Date().getFullYear() : year < 100 && (year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= dayNamesShort ? 0 : -100)),
                    literal > -1) for (month = 1, day = literal; ;) {
                    if (dim = this._getDaysInMonth(year, month - 1), day <= dim) break;
                    month++, day -= dim;
                }
                if (def = this._daylightSavingAdjust(new Date(year, month - 1, day)), def.getFullYear() !== year || def.getMonth() + 1 !== month || def.getDate() !== day) throw "Invalid date";
                return def;
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(format, date, settings) {
                if (!date) return "";
                var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return matches && iFormat++, matches;
                }, formatNumber = function(match, value, len) {
                    var num = "" + value;
                    if (lookAhead(match)) for (;num.length < len; ) num = "0" + num;
                    return num;
                }, formatName = function(match, value, shortNames, longNames) {
                    return lookAhead(match) ? longNames[value] : shortNames[value];
                }, output = "", literal = !1;
                if (date) for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
                    case "d":
                        output += formatNumber("d", date.getDate(), 2);
                        break;

                    case "D":
                        output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                        break;

                    case "o":
                        output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                        break;

                    case "m":
                        output += formatNumber("m", date.getMonth() + 1, 2);
                        break;

                    case "M":
                        output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                        break;

                    case "y":
                        output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                        break;

                    case "@":
                        output += date.getTime();
                        break;

                    case "!":
                        output += 1e4 * date.getTime() + this._ticksTo1970;
                        break;

                    case "'":
                        lookAhead("'") ? output += "'" : literal = !0;
                        break;

                    default:
                        output += format.charAt(iFormat);
                }
                return output;
            },
            _possibleChars: function(format) {
                var iFormat, chars = "", literal = !1, lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                    return matches && iFormat++, matches;
                };
                for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;

                    case "D":
                    case "M":
                        return null;

                    case "'":
                        lookAhead("'") ? chars += "'" : literal = !0;
                        break;

                    default:
                        chars += format.charAt(iFormat);
                }
                return chars;
            },
            _get: function(inst, name) {
                return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name];
            },
            _setDateFromField: function(inst, noDefault) {
                if (inst.input.val() !== inst.lastVal) {
                    var dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
                    try {
                        date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                    } catch (a) {
                        dates = noDefault ? "" : dates;
                    }
                    inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(),
                        inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0,
                        inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0,
                        this._adjustInstDate(inst);
                }
            },
            _getDefaultDate: function(inst) {
                return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
            },
            _determineDate: function(inst, date, defaultDate) {
                var offsetNumeric = function(offset) {
                    var date = new Date();
                    return date.setDate(date.getDate() + offset), date;
                }, offsetString = function(offset) {
                    try {
                        return test.datepicker.parseDate(test.datepicker._get(inst, "dateFormat"), offset, test.datepicker._getFormatConfig(inst));
                    } catch (n) {}
                    for (var date = (offset.toLowerCase().match(/^c/) ? test.datepicker._getDate(inst) : null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
                        switch (matches[2] || "d") {
                            case "d":
                            case "D":
                                day += parseInt(matches[1], 10);
                                break;

                            case "w":
                            case "W":
                                day += 7 * parseInt(matches[1], 10);
                                break;

                            case "m":
                            case "M":
                                month += parseInt(matches[1], 10), day = Math.min(day, test.datepicker._getDaysInMonth(year, month));
                                break;

                            case "y":
                            case "Y":
                                year += parseInt(matches[1], 10), day = Math.min(day, test.datepicker._getDaysInMonth(year, month));
                        }
                        matches = pattern.exec(offset);
                    }
                    return new Date(year, month, day);
                }, newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
                return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate,
                newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)),
                    this._daylightSavingAdjust(newDate);
            },
            _daylightSavingAdjust: function(date) {
                return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null;
            },
            _setDate: function(inst, date, noChange) {
                var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
                inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(),
                    inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst),
                    this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst));
            },
            _getDate: function(inst) {
                var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                return startDate;
            },
            _attachHandlers: function(inst) {
                var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
                inst.dpDiv.find("[data-handler]").map(function() {
                    var handler = {
                        prev: function() {
                            test.datepicker._adjustDate(id, -stepMonths, "M");
                        },
                        next: function() {
                            test.datepicker._adjustDate(id, +stepMonths, "M");
                        },
                        hide: function() {
                            test.datepicker._hideDatepicker();
                        },
                        today: function() {
                            test.datepicker._gotoToday(id);
                        },
                        selectDay: function() {
                            return test.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                                !1;
                        },
                        selectMonth: function() {
                            return test.datepicker._selectMonthYear(id, this, "M"), !1;
                        },
                        selectYear: function() {
                            return test.datepicker._selectMonthYear(id, this, "Y"), !1;
                        }
                    };
                    test(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
                });
            },
            _generateHTML: function(inst) {
                var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(), today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
                if (drawMonth < 0 && (drawMonth += 12, drawYear--), maxDate) for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())),
                                                                                      maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw; ) drawMonth--,
                drawMonth < 0 && (drawMonth = 11, drawYear--);
                for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"),
                         prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText,
                         prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>",
                         nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText,
                         next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>",
                         currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today,
                         currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText,
                         controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>",
                         buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "",
                         firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay,
                         showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"),
                         dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"),
                         monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"),
                         showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"),
                         defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
                    for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
                        if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)),
                                cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
                            if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1) switch (col) {
                                case 0:
                                    calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                    break;

                                case numMonths[1] - 1:
                                    calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                    break;

                                default:
                                    calender += " ui-datepicker-group-middle", cornerClass = "";
                            }
                            calender += "'>";
                        }
                        for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>",
                                 thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "",
                                 dow = 0; dow < 7; dow++) day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                        for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth),
                             drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)),
                                 leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7),
                                 numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows,
                                 printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)),
                                 dRow = 0; dRow < numRows; dRow++) {
                            for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "",
                                     dow = 0; dow < 7; dow++) daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [ printDate ]) : [ !0, "" ],
                                otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate,
                                tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>",
                                printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
                            calender += tbody + "</tr>";
                        }
                        drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                            group += calender;
                    }
                    html += group;
                }
                return html += buttonPanel, inst._keyEvent = !1, html;
            },
            _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
                var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
                if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"; else {
                    for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear,
                             monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                             month = 0; month < 12; month++) (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                    monthHtml += "</select>";
                }
                if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")),
                        !inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"; else {
                    for (years = this._get(inst, "yearRange").split(":"), thisYear = new Date().getFullYear(),
                             determineYear = function(value) {
                                 var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                                 return isNaN(year) ? thisYear : year;
                             }, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")),
                             year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear,
                             inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; year <= endYear; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                    inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null;
                }
                return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml),
                    html += "</div>";
            },
            _adjustInstDate: function(inst, offset, period) {
                var year = inst.selectedYear + ("Y" === period ? offset : 0), month = inst.selectedMonth + ("M" === period ? offset : 0), date = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0), newDate = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, date)));
                inst.selectedDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = newDate.getMonth(),
                    inst.drawYear = inst.selectedYear = newDate.getFullYear(), "M" !== period && "Y" !== period || this._notifyChange(inst);
            },
            _restrictMinMax: function(inst, date) {
                var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && date < minDate ? minDate : date;
                return maxDate && newDate > maxDate ? maxDate : newDate;
            },
            _notifyChange: function(inst) {
                var onChange = this._get(inst, "onChangeMonthYear");
                onChange && onChange.apply(inst.input ? inst.input[0] : null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
            },
            _getNumberOfMonths: function(inst) {
                var numMonths = this._get(inst, "numberOfMonths");
                return null == numMonths ? [ 1, 1 ] : "number" == typeof numMonths ? [ 1, numMonths ] : numMonths;
            },
            _getMinMaxDate: function(inst, minMax) {
                return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
            },
            _getDaysInMonth: function(year, month) {
                return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
            },
            _getFirstDayOfMonth: function(year, month) {
                return new Date(year, month, 1).getDay();
            },
            _canAdjustMonth: function(inst, offset, curYear, curMonth) {
                var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
                return offset < 0 && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())),
                    this._isInRange(inst, date);
            },
            _isInRange: function(inst, date) {
                var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), minYear = null, maxYear = null, years = this._get(inst, "yearRange");
                return years && (yearSplit = years.split(":"), currentYear = new Date().getFullYear(),
                    minYear = parseInt(yearSplit[0], 10), maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear),
                yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
            },
            _getFormatConfig: function(inst) {
                var shortYearCutoff = this._get(inst, "shortYearCutoff");
                return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10),
                    {
                        shortYearCutoff: shortYearCutoff,
                        dayNamesShort: this._get(inst, "dayNamesShort"),
                        dayNames: this._get(inst, "dayNames"),
                        monthNamesShort: this._get(inst, "monthNamesShort"),
                        monthNames: this._get(inst, "monthNames")
                    };
            },
            _formatDate: function(inst, day, month, year) {
                day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth,
                    inst.currentYear = inst.selectedYear);
                var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
            }
        }), test.fn.datepicker = function(options) {
            if (!this.length) return this;
            test.datepicker.initialized || (test(document).on("mousedown", test.datepicker._checkExternalClick),
                test.datepicker.initialized = !0), 0 === test("#" + test.datepicker._mainDivId).length && test("body").append(test.datepicker.dpDiv);
            var otherArgs = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? test.datepicker["_" + options + "Datepicker"].apply(test.datepicker, [ this[0] ].concat(otherArgs)) : this.each(function() {
                        "string" == typeof options ? test.datepicker["_" + options + "Datepicker"].apply(test.datepicker, [ this ].concat(otherArgs)) : test.datepicker._attachDatepicker(this, options);
                    }) : test.datepicker["_" + options + "Datepicker"].apply(test.datepicker, [ this[0] ].concat(otherArgs));
        }, test.datepicker = new Datepicker(), test.datepicker.initialized = !1, test.datepicker.uuid = new Date().getTime(),
            test.datepicker.version = "1.12.1";
        var a = (test.datepicker, test.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
            !1);
        test(document).on("mouseup", function() {
            a = !1;
        });
        test.widget("ui.mouse", {
            version: "1.12.1",
            options: {
                cancel: "input, textarea, button, select, option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var self = this;
                this.element.on("mousedown." + this.widgetName, function(event) {
                    return self._mouseDown(event);
                }).on("click." + this.widgetName, function(event) {
                    if (!0 === test.data(event.target, self.widgetName + ".preventClickEvent")) return test.removeData(event.target, self.widgetName + ".preventClickEvent"),
                        event.stopImmediatePropagation(), !1;
                }), this.started = !1;
            },
            _mouseDestroy: function() {
                this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            },
            _mouseDown: function(event) {
                if (!a) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
                    var self = this, result = 1 === event.which, pending = !("string" != typeof this.options.cancel || !event.target.nodeName) && test(event.target).closest(this.options.cancel).length;
                    return !(result && !pending && this._mouseCapture(event)) || (this.mouseDelayMet = !this.options.delay,
                        this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                            self.mouseDelayMet = !0;
                        }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1,
                            !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === test.data(event.target, this.widgetName + ".preventClickEvent") && test.removeData(event.target, this.widgetName + ".preventClickEvent"),
                                this._mouseMoveDelegate = function(event) {
                                    return self._mouseMove(event);
                                }, this._mouseUpDelegate = function(event) {
                                return self._mouseUp(event);
                            }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                                event.preventDefault(), a = !0, !0));
                }
            },
            _mouseMove: function(event) {
                if (this._mouseMoved) {
                    if (test.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) return this._mouseUp(event);
                    if (!event.which) if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(event);
                }
                return (event.which || event.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(event),
                        event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1,
                        this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted);
            },
            _mouseUp: function(event) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
                this._mouseStarted && (this._mouseStarted = !1, event.target === this._mouseDownEvent.target && test.data(event.target, this.widgetName + ".preventClickEvent", !0),
                    this._mouseStop(event)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
                    delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, a = !1, event.preventDefault();
            },
            _mouseDistanceMet: function(event) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet;
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0;
            }
        }), test.ui.plugin = {
            add: function(key, option, set) {
                var i, proto = test.ui[key].prototype;
                for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
            },
            call: function(instance, name, args, allowDisconnected) {
                var i, set = instance.plugins[name];
                if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)) for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
            }
        }, test.ui.safeBlur = function(elem) {
            elem && "body" !== elem.nodeName.toLowerCase() && test(elem).trigger("blur");
        };
        test.widget("ui.draggable", test.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"),
                    this._setHandleClassName(), this._mouseInit();
            },
            _setOption: function(key, value) {
                this._super(key, value), "handle" === key && (this._removeHandleClassName(), this._setHandleClassName());
            },
            _destroy: function() {
                return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this._removeHandleClassName(),
                        void this._mouseDestroy());
            },
            _mouseCapture: function(event) {
                var o = this.options;
                return !(this.helper || o.disabled || test(event.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(event),
                    !!this.handle && (this._blurActiveElement(event), this._blockFrames(o.iframeFix === !0 ? "iframe" : o.iframeFix),
                        !0));
            },
            _blockFrames: function(selector) {
                this.iframeBlocks = this.document.find(selector).map(function() {
                    var iframe = test(this);
                    return test("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
                });
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
            },
            _blurActiveElement: function(error) {
                var el = test.ui.safeActiveElement(this.document[0]), host = test(error.target);
                host.closest(el).length || test.ui.safeBlur(el);
            },
            _mouseStart: function(event) {
                var o = this.options;
                return this.helper = this._createHelper(event), this._addClass(this.helper, "ui-draggable-dragging"),
                    this._cacheHelperProportions(), test.ui.ddmanager && (test.ui.ddmanager.current = this),
                    this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0),
                    this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                        return "fixed" === test(this).css("position");
                    }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(event),
                    this.originalPosition = this.position = this._generatePosition(event, !1), this.originalPageX = event.pageX,
                    this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
                    this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(),
                    test.ui.ddmanager && !o.dropBehaviour && test.ui.ddmanager.prepareOffsets(this, event),
                        this._mouseDrag(event, !0), test.ui.ddmanager && test.ui.ddmanager.dragStart(this, event),
                        !0);
            },
            _refreshOffsets: function(e) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }, this.offset.click = {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                };
            },
            _mouseDrag: function(event, fromFocus) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(event, !0),
                        this.positionAbs = this._convertPositionTo("absolute"), !fromFocus) {
                    var ui = this._uiHash();
                    if (this._trigger("drag", event, ui) === !1) return this._mouseUp(new test.Event("mouseup", event)),
                        !1;
                    this.position = ui.position;
                }
                return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px",
                test.ui.ddmanager && test.ui.ddmanager.drag(this, event), !1;
            },
            _mouseStop: function(event) {
                var self = this, dropped = !1;
                return test.ui.ddmanager && !this.options.dropBehaviour && (dropped = test.ui.ddmanager.drop(this, event)),
                this.dropped && (dropped = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !dropped || "valid" === this.options.revert && dropped || this.options.revert === !0 || test.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped) ? test(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        self._trigger("stop", event) !== !1 && self._clear();
                    }) : this._trigger("stop", event) !== !1 && this._clear(), !1;
            },
            _mouseUp: function(event) {
                return this._unblockFrames(), test.ui.ddmanager && test.ui.ddmanager.dragStop(this, event),
                this.handleElement.is(event.target) && this.element.trigger("focus"), test.ui.mouse.prototype._mouseUp.call(this, event);
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new test.Event("mouseup", {
                        target: this.element[0]
                    })) : this._clear(), this;
            },
            _getHandle: function(event) {
                return !this.options.handle || !!test(event.target).closest(this.element.find(this.options.handle)).length;
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
                    this._addClass(this.handleElement, "ui-draggable-handle");
            },
            _removeHandleClassName: function() {
                this._removeClass(this.handleElement, "ui-draggable-handle");
            },
            _createHelper: function(event) {
                var o = this.options, e = test.isFunction(o.helper), $target = e ? test(o.helper.apply(this.element[0], [ event ])) : "clone" === o.helper ? this.element.clone().removeAttr("id") : this.element;
                return $target.parents("body").length || $target.appendTo("parent" === o.appendTo ? this.element[0].parentNode : o.appendTo),
                e && $target[0] === this.element[0] && this._setPositionRelative(), $target[0] === this.element[0] || /(fixed|absolute)/.test($target.css("position")) || $target.css("position", "absolute"),
                    $target;
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
            },
            _adjustOffsetFromHelper: function(obj) {
                "string" == typeof obj && (obj = obj.split(" ")), test.isArray(obj) && (obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left),
                "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
            },
            _isRootNode: function(el) {
                return /(html|body)/i.test(el.tagName) || el === this.document[0];
            },
            _getParentOffset: function() {
                var po = this.offsetParent.offset(), version = this.document[0];
                return "absolute" === this.cssPosition && this.scrollParent[0] !== version && test.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(),
                    po.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (po = {
                    top: 0,
                    left: 0
                }), {
                    top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                };
            },
            _getRelativeOffset: function() {
                if ("relative" !== this.cssPosition) return {
                    top: 0,
                    left: 0
                };
                var p = this.element.position(), fixed = this._isRootNode(this.scrollParent[0]);
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (fixed ? 0 : this.scrollParent.scrollTop()),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (fixed ? 0 : this.scrollParent.scrollLeft())
                };
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                };
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                };
            },
            _setContainment: function() {
                var over, c, ce, o = this.options, el = this.document[0];
                return this.relativeContainer = null, o.containment ? "window" === o.containment ? void (this.containment = [ test(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, test(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, test(window).scrollLeft() + test(window).width() - this.helperProportions.width - this.margins.left, test(window).scrollTop() + (test(window).height() || el.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : "document" === o.containment ? void (this.containment = [ 0, 0, test(el).width() - this.helperProportions.width - this.margins.left, (test(el).height() || el.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : o.containment.constructor === Array ? void (this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode),
                                    c = test(o.containment), ce = c[0], void (ce && (over = /(scroll|auto)/.test(c.css("overflow")),
                                    this.containment = [ (parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ],
                                    this.relativeContainer = c))) : void (this.containment = null);
            },
            _convertPositionTo: function(d, pos) {
                pos || (pos = this.position);
                var mod = "absolute" === d ? 1 : -1, scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
                return {
                    top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
                    left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
                };
            },
            _generatePosition: function(event, constrainPosition) {
                var containment, co, top, left, o = this.options, scroll = this._isRootNode(this.scrollParent[0]), pageX = event.pageX, pageY = event.pageY;
                return scroll && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }), constrainPosition && (this.containment && (this.relativeContainer ? (co = this.relativeContainer.offset(),
                        containment = [ this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top ]) : containment = this.containment,
                event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left),
                event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top),
                event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left),
                event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)),
                o.grid && (top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY,
                    pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top,
                    left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX,
                    pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left),
                "y" === o.axis && (pageX = this.originalPageX), "x" === o.axis && (pageY = this.originalPageY)),
                    {
                        top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : scroll ? 0 : this.offset.scroll.top),
                        left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : scroll ? 0 : this.offset.scroll.left)
                    };
            },
            _clear: function() {
                this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                    this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
            },
            _trigger: function(type, event, ui) {
                return ui = ui || this._uiHash(), test.ui.plugin.call(this, type, [ event, ui, this ], !0),
                /^(drag|start|stop)/.test(type) && (this.positionAbs = this._convertPositionTo("absolute"),
                    ui.offset = this.positionAbs), test.Widget.prototype._trigger.call(this, type, event, ui);
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                };
            }
        }), test.ui.plugin.add("draggable", "connectToSortable", {
            start: function(event, ui, inst) {
                var uiSortable = test.extend({}, ui, {
                    item: inst.element
                });
                inst.sortables = [], test(inst.options.connectToSortable).each(function() {
                    var sortable = test(this).sortable("instance");
                    sortable && !sortable.options.disabled && (inst.sortables.push(sortable), sortable.refreshPositions(),
                        sortable._trigger("activate", event, uiSortable));
                });
            },
            stop: function(event, ui, inst) {
                var uiSortable = test.extend({}, ui, {
                    item: inst.element
                });
                inst.cancelHelperRemoval = !1, test.each(inst.sortables, function() {
                    var self = this;
                    self.isOver ? (self.isOver = 0, inst.cancelHelperRemoval = !0, self.cancelHelperRemoval = !1,
                            self._storedCSS = {
                                position: self.placeholder.css("position"),
                                top: self.placeholder.css("top"),
                                left: self.placeholder.css("left")
                            }, self._mouseStop(event), self.options.helper = self.options._helper) : (self.cancelHelperRemoval = !0,
                            self._trigger("deactivate", event, uiSortable));
                });
            },
            drag: function(event, ui, inst) {
                test.each(inst.sortables, function() {
                    var a = !1, self = this;
                    self.positionAbs = inst.positionAbs, self.helperProportions = inst.helperProportions,
                        self.offset.click = inst.offset.click, self._intersectsWith(self.containerCache) && (a = !0,
                        test.each(inst.sortables, function() {
                            return this.positionAbs = inst.positionAbs, this.helperProportions = inst.helperProportions,
                                this.offset.click = inst.offset.click, this !== self && this._intersectsWith(this.containerCache) && test.contains(self.element[0], this.element[0]) && (a = !1),
                                a;
                        })), a ? (self.isOver || (self.isOver = 1, inst._parent = ui.helper.parent(), self.currentItem = ui.helper.appendTo(self.element).data("ui-sortable-item", !0),
                            self.options._helper = self.options.helper, self.options.helper = function() {
                            return ui.helper[0];
                        }, event.target = self.currentItem[0], self._mouseCapture(event, !0), self._mouseStart(event, !0, !0),
                            self.offset.click.top = inst.offset.click.top, self.offset.click.left = inst.offset.click.left,
                            self.offset.parent.left -= inst.offset.parent.left - self.offset.parent.left, self.offset.parent.top -= inst.offset.parent.top - self.offset.parent.top,
                            inst._trigger("toSortable", event), inst.dropped = self.element, test.each(inst.sortables, function() {
                            this.refreshPositions();
                        }), inst.currentItem = inst.element, self.fromOutside = inst), self.currentItem && (self._mouseDrag(event),
                            ui.position = self.position)) : self.isOver && (self.isOver = 0, self.cancelHelperRemoval = !0,
                            self.options._revert = self.options.revert, self.options.revert = !1, self._trigger("out", event, self._uiHash(self)),
                            self._mouseStop(event, !0), self.options.revert = self.options._revert, self.options.helper = self.options._helper,
                        self.placeholder && self.placeholder.remove(), ui.helper.appendTo(inst._parent),
                            inst._refreshOffsets(event), ui.position = inst._generatePosition(event, !0), inst._trigger("fromSortable", event),
                            inst.dropped = !1, test.each(inst.sortables, function() {
                            this.refreshPositions();
                        }));
                });
            }
        }), test.ui.plugin.add("draggable", "cursor", {
            start: function(event, ui, instance) {
                var t = test("body"), o = instance.options;
                t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor);
            },
            stop: function(e, t, n) {
                var o = n.options;
                o._cursor && test("body").css("cursor", o._cursor);
            }
        }), test.ui.plugin.add("draggable", "opacity", {
            start: function(event, ui, instance) {
                var t = test(ui.helper), o = instance.options;
                t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity);
            },
            stop: function(event, ui, instance) {
                var o = instance.options;
                o._opacity && test(ui.helper).css("opacity", o._opacity);
            }
        }), test.ui.plugin.add("draggable", "scroll", {
            start: function(position, labelText, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
                i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
            },
            drag: function(event, ui, i) {
                var o = i.options, scrolled = !1, el = i.scrollParentNotHidden[0], r = i.document[0];
                el !== r && "HTML" !== el.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + el.offsetHeight - event.pageY < o.scrollSensitivity ? el.scrollTop = scrolled = el.scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (el.scrollTop = scrolled = el.scrollTop - o.scrollSpeed)),
                    o.axis && "y" === o.axis || (i.overflowOffset.left + el.offsetWidth - event.pageX < o.scrollSensitivity ? el.scrollLeft = scrolled = el.scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (el.scrollLeft = scrolled = el.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (event.pageY - test(r).scrollTop() < o.scrollSensitivity ? scrolled = test(r).scrollTop(test(r).scrollTop() - o.scrollSpeed) : test(window).height() - (event.pageY - test(r).scrollTop()) < o.scrollSensitivity && (scrolled = test(r).scrollTop(test(r).scrollTop() + o.scrollSpeed))),
                    o.axis && "y" === o.axis || (event.pageX - test(r).scrollLeft() < o.scrollSensitivity ? scrolled = test(r).scrollLeft(test(r).scrollLeft() - o.scrollSpeed) : test(window).width() - (event.pageX - test(r).scrollLeft()) < o.scrollSensitivity && (scrolled = test(r).scrollLeft(test(r).scrollLeft() + o.scrollSpeed)))),
                scrolled !== !1 && test.ui.ddmanager && !o.dropBehaviour && test.ui.ddmanager.prepareOffsets(i, event);
            }
        }), test.ui.plugin.add("draggable", "snap", {
            start: function(position, labelText, i) {
                var o = i.options;
                i.snapElements = [], test(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                    var $t = test(this), $o = $t.offset();
                    this !== i.element[0] && i.snapElements.push({
                        item: this,
                        width: $t.outerWidth(),
                        height: $t.outerHeight(),
                        top: $o.top,
                        left: $o.left
                    });
                });
            },
            drag: function(event, ui, inst) {
                var ts, bs, ls, rs, l, r, t, b, i, first, o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
                for (i = inst.snapElements.length - 1; i >= 0; i--) l = inst.snapElements[i].left - inst.margins.left,
                    r = l + inst.snapElements[i].width, t = inst.snapElements[i].top - inst.margins.top,
                    b = t + inst.snapElements[i].height, x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !test.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item) ? (inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, test.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })), inst.snapElements[i].snapping = !1) : ("inner" !== o.snapMode && (ts = Math.abs(t - y2) <= d,
                        bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d,
                    ts && (ui.position.top = inst._convertPositionTo("relative", {
                        top: t - inst.helperProportions.height,
                        left: 0
                    }).top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                        top: b,
                        left: 0
                    }).top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: l - inst.helperProportions.width
                    }).left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: r
                    }).left)), first = ts || bs || ls || rs, "outer" !== o.snapMode && (ts = Math.abs(t - y1) <= d,
                        bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d,
                    ts && (ui.position.top = inst._convertPositionTo("relative", {
                        top: t,
                        left: 0
                    }).top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                        top: b - inst.helperProportions.height,
                        left: 0
                    }).top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: r - inst.helperProportions.width
                    }).left)), !inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, test.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })), inst.snapElements[i].snapping = ts || bs || ls || rs || first);
            }
        }), test.ui.plugin.add("draggable", "stack", {
            start: function(event, ui, instance) {
                var min, o = instance.options, group = test.makeArray(test(o.stack)).sort(function(a, b) {
                    return (parseInt(test(a).css("zIndex"), 10) || 0) - (parseInt(test(b).css("zIndex"), 10) || 0);
                });
                group.length && (min = parseInt(test(group[0]).css("zIndex"), 10) || 0, test(group).each(function(i) {
                    test(this).css("zIndex", min + i);
                }), this.css("zIndex", min + group.length));
            }
        }), test.ui.plugin.add("draggable", "zIndex", {
            start: function(event, ui, instance) {
                var t = test(ui.helper), o = instance.options;
                t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex);
            },
            stop: function(event, ui, instance) {
                var o = instance.options;
                o._zIndex && test(ui.helper).css("zIndex", o._zIndex);
            }
        });
        test.ui.draggable;
        test.widget("ui.resizable", test.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                classes: {
                    "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
                },
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(value) {
                return parseFloat(value) || 0;
            },
            _isNumber: function(arg) {
                return !isNaN(parseFloat(arg));
            },
            _hasScroll: function(el, a) {
                if ("hidden" === test(el).css("overflow")) return !1;
                var scroll = a && "left" === a ? "scrollLeft" : "scrollTop", has = !1;
                return el[scroll] > 0 || (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0,
                        has);
            },
            _create: function() {
                var e, o = this.options, self = this;
                this._addClass("ui-resizable"), test.extend(this, {
                    _aspectRatio: !!o.aspectRatio,
                    aspectRatio: o.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(test("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
                    this.elementIsWrapper = !0, e = {
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom"),
                    marginLeft: this.originalElement.css("marginLeft")
                }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"),
                    this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(),
                o.autoHide && test(this.element).on("mouseenter", function() {
                    o.disabled || (self._removeClass("ui-resizable-autohide"), self._handles.show());
                }).on("mouseleave", function() {
                    o.disabled || self.resizing || (self._addClass("ui-resizable-autohide"), self._handles.hide());
                }), this._mouseInit();
            },
            _destroy: function() {
                this._mouseDestroy();
                var wrapper, cleanup = function(e) {
                    test(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
                };
                return this.elementIsWrapper && (cleanup(this.element), wrapper = this.element,
                    this.originalElement.css({
                        position: wrapper.css("position"),
                        width: wrapper.outerWidth(),
                        height: wrapper.outerHeight(),
                        top: wrapper.css("top"),
                        left: wrapper.css("left")
                    }).insertAfter(wrapper), wrapper.remove()), this.originalElement.css("resize", this.originalResizeStyle),
                    cleanup(this.originalElement), this;
            },
            _setOption: function(key, value) {
                switch (this._super(key, value), key) {
                    case "handles":
                        this._removeHandles(), this._setupHandles();
                }
            },
            _setupHandles: function() {
                var handle, i, val, offset, axis, o = this.options, self = this;
                if (this.handles = o.handles || (test(".ui-resizable-handle", this.element).length ? {
                                n: ".ui-resizable-n",
                                e: ".ui-resizable-e",
                                s: ".ui-resizable-s",
                                w: ".ui-resizable-w",
                                se: ".ui-resizable-se",
                                sw: ".ui-resizable-sw",
                                ne: ".ui-resizable-ne",
                                nw: ".ui-resizable-nw"
                            } : "e,s,se"), this._handles = test(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                                                                                                                 val = this.handles.split(","), this.handles = {}, i = 0; i < val.length; i++) handle = test.trim(val[i]),
                    offset = "ui-resizable-" + handle, axis = test("<div>"), this._addClass(axis, "ui-resizable-handle " + offset),
                    axis.css({
                        zIndex: o.zIndex
                    }), this.handles[handle] = ".ui-resizable-" + handle, this.element.append(axis);
                this._renderAxis = function(target) {
                    var i, axis, padPos, padWrapper;
                    target = target || this.element;
                    for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = test(this.handles[i]),
                            this._on(this.handles[i], {
                                mousedown: self._mouseDown
                            })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (axis = test(this.handles[i], this.element),
                        padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth(),
                        padPos = [ "padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left" ].join(""),
                        target.css(padPos, padWrapper), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);
                }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")),
                    this._handles.disableSelection(), this._handles.on("mouseover", function() {
                    self.resizing || (this.className && (axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                        self.axis = axis && axis[1] ? axis[1] : "se");
                }), o.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
            },
            _removeHandles: function() {
                this._handles.remove();
            },
            _mouseCapture: function(event) {
                var i, handle, capture = !1;
                for (i in this.handles) handle = test(this.handles[i])[0], (handle === event.target || test.contains(handle, event.target)) && (capture = !0);
                return !this.options.disabled && capture;
            },
            _mouseStart: function(event) {
                var i, j, cursor, o = this.options, el = this.element;
                return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")),
                    j = this._num(this.helper.css("top")), o.containment && (i += test(o.containment).scrollLeft() || 0,
                    j += test(o.containment).scrollTop() || 0), this.offset = this.helper.offset(),
                    this.position = {
                        left: i,
                        top: j
                    }, this.size = this._helper ? {
                        width: this.helper.width(),
                        height: this.helper.height()
                    } : {
                        width: el.width(),
                        height: el.height()
                    }, this.originalSize = this._helper ? {
                        width: el.outerWidth(),
                        height: el.outerHeight()
                    } : {
                        width: el.width(),
                        height: el.height()
                    }, this.sizeDiff = {
                    width: el.outerWidth() - el.width(),
                    height: el.outerHeight() - el.height()
                }, this.originalPosition = {
                    left: i,
                    top: j
                }, this.originalMousePosition = {
                    left: event.pageX,
                    top: event.pageY
                }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
                    cursor = test(".ui-resizable-" + this.axis).css("cursor"), test("body").css("cursor", "auto" === cursor ? this.axis + "-resize" : cursor),
                    this._addClass("ui-resizable-resizing"), this._propagate("start", event), !0;
            },
            _mouseDrag: function(event) {
                var data, t, r = this.originalMousePosition, b = this.axis, dx = event.pageX - r.left || 0, dy = event.pageY - r.top || 0, e = this._change[b];
                return this._updatePrevProperties(), !!e && (data = e.apply(this, [ event, dx, dy ]),
                    this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)),
                    data = this._respectSize(data, event), this._updateCache(data), this._propagate("resize", event),
                    t = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                test.isEmptyObject(t) || (this._updatePrevProperties(), this._trigger("resize", event, this.ui()),
                    this._applyChanges()), !1);
            },
            _mouseStop: function(event) {
                this.resizing = !1;
                var pr, ista, soffseth, soffsetw, s, left, top, o = this.options, that = this;
                return this._helper && (pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName),
                    soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width,
                    s = {
                        width: that.helper.width() - soffsetw,
                        height: that.helper.height() - soffseth
                    }, left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null,
                    top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null,
                o.animate || this.element.css(test.extend(s, {
                    top: top,
                    left: left
                })), that.helper.height(that.size.height), that.helper.width(that.size.width), this._helper && !o.animate && this._proportionallyResize()),
                    test("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"),
                    this._propagate("stop", event), this._helper && this.helper.remove(), !1;
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                }, this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                };
            },
            _applyChanges: function() {
                var options = {};
                return this.position.top !== this.prevPosition.top && (options.top = this.position.top + "px"),
                this.position.left !== this.prevPosition.left && (options.left = this.position.left + "px"),
                this.size.width !== this.prevSize.width && (options.width = this.size.width + "px"),
                this.size.height !== this.prevSize.height && (options.height = this.size.height + "px"),
                    this.helper.css(options), options;
            },
            _updateVirtualBoundaries: function(forceAspectRatio) {
                var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
                b = {
                    minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                    maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                    minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                    maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
                }, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio,
                    pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio,
                    pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth),
                pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth),
                pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b;
            },
            _updateCache: function(data) {
                this.offset = this.helper.offset(), this._isNumber(data.left) && (this.position.left = data.left),
                this._isNumber(data.top) && (this.position.top = data.top), this._isNumber(data.height) && (this.size.height = data.height),
                this._isNumber(data.width) && (this.size.width = data.width);
            },
            _updateRatio: function(data) {
                var cpos = this.position, csize = this.size, a = this.axis;
                return this._isNumber(data.height) ? data.width = data.height * this.aspectRatio : this._isNumber(data.width) && (data.height = data.width / this.aspectRatio),
                "sw" === a && (data.left = cpos.left + (csize.width - data.width), data.top = null),
                "nw" === a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)),
                    data;
            },
            _respectSize: function(data) {
                var o = this._vBoundaries, a = this.axis, ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height, dw = this.originalPosition.left + this.originalSize.width, dh = this.originalPosition.top + this.originalSize.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
                return isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight),
                ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight), isminw && cw && (data.left = dw - o.minWidth),
                ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight),
                ismaxh && ch && (data.top = dh - o.maxHeight), data.width || data.height || data.left || !data.top ? data.width || data.height || data.top || !data.left || (data.left = null) : data.top = null,
                    data;
            },
            _getPaddingPlusBorderDimensions: function(elem) {
                for (var i = 0, parts = [], p = [ elem.css("borderTopWidth"), elem.css("borderRightWidth"), elem.css("borderBottomWidth"), elem.css("borderLeftWidth") ], x = [ elem.css("paddingTop"), elem.css("paddingRight"), elem.css("paddingBottom"), elem.css("paddingLeft") ]; i < 4; i++) parts[i] = parseFloat(p[i]) || 0,
                    parts[i] += parseFloat(x[i]) || 0;
                return {
                    height: parts[0] + parts[2],
                    width: parts[1] + parts[3]
                };
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length) for (var element, i = 0, p = this.helper || this.element; i < this._proportionallyResizeElements.length; i++) element = this._proportionallyResizeElements[i],
                this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(element)),
                    element.css({
                        height: p.height() - this.outerDimensions.height || 0,
                        width: p.width() - this.outerDimensions.width || 0
                    });
            },
            _renderProxy: function() {
                var el = this.element, o = this.options;
                this.elementOffset = el.offset(), this._helper ? (this.helper = this.helper || test("<div style='overflow:hidden;'></div>"),
                        this._addClass(this.helper, this._helper), this.helper.css({
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        position: "absolute",
                        left: this.elementOffset.left + "px",
                        top: this.elementOffset.top + "px",
                        zIndex: ++o.zIndex
                    }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
            },
            _change: {
                e: function(event, dx) {
                    return {
                        width: this.originalSize.width + dx
                    };
                },
                w: function(event, dx) {
                    var cs = this.originalSize, sp = this.originalPosition;
                    return {
                        left: sp.left + dx,
                        width: cs.width - dx
                    };
                },
                n: function(event, dx, dy) {
                    var cs = this.originalSize, sp = this.originalPosition;
                    return {
                        top: sp.top + dy,
                        height: cs.height - dy
                    };
                },
                s: function(event, dx, dy) {
                    return {
                        height: this.originalSize.height + dy
                    };
                },
                se: function(event, dx, dy) {
                    return test.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
                },
                sw: function(event, dx, dy) {
                    return test.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
                },
                ne: function(event, dx, dy) {
                    return test.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
                },
                nw: function(event, dx, dy) {
                    return test.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
                }
            },
            _propagate: function(n, event) {
                test.ui.plugin.call(this, n, [ event, this.ui() ]), "resize" !== n && this._trigger(n, event, this.ui());
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                };
            }
        }), test.ui.plugin.add("resizable", "animate", {
            stop: function(event) {
                var that = test(this).resizable("instance"), o = that.options, pr = that._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, style = {
                    width: that.size.width - soffsetw,
                    height: that.size.height - soffseth
                }, left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null, top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;
                that.element.animate(test.extend(style, top && left ? {
                        top: top,
                        left: left
                    } : {}), {
                    duration: o.animateDuration,
                    easing: o.animateEasing,
                    step: function() {
                        var data = {
                            width: parseFloat(that.element.css("width")),
                            height: parseFloat(that.element.css("height")),
                            top: parseFloat(that.element.css("top")),
                            left: parseFloat(that.element.css("left"))
                        };
                        pr && pr.length && test(pr[0]).css({
                            width: data.width,
                            height: data.height
                        }), that._updateCache(data), that._propagate("resize", event);
                    }
                });
            }
        }), test.ui.plugin.add("resizable", "containment", {
            start: function() {
                var element, p, co, ch, cw, width, height, that = test(this).resizable("instance"), o = that.options, el = that.element, oc = o.containment, ce = oc instanceof test ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
                ce && (that.containerElement = test(ce), /document/.test(oc) || oc === document ? (that.containerOffset = {
                        left: 0,
                        top: 0
                    }, that.containerPosition = {
                        left: 0,
                        top: 0
                    }, that.parentData = {
                        element: test(document),
                        left: 0,
                        top: 0,
                        width: test(document).width(),
                        height: test(document).height() || document.body.parentNode.scrollHeight
                    }) : (element = test(ce), p = [], test([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) {
                        p[i] = that._num(element.css("padding" + name));
                    }), that.containerOffset = element.offset(), that.containerPosition = element.position(),
                        that.containerSize = {
                            height: element.innerHeight() - p[3],
                            width: element.innerWidth() - p[1]
                        }, co = that.containerOffset, ch = that.containerSize.height, cw = that.containerSize.width,
                        width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw, height = that._hasScroll(ce) ? ce.scrollHeight : ch,
                        that.parentData = {
                            element: ce,
                            left: co.left,
                            top: co.top,
                            width: width,
                            height: height
                        }));
            },
            resize: function(event) {
                var woset, hoset, isParent, isOffsetRelative, that = test(this).resizable("instance"), o = that.options, co = that.containerOffset, cp = that.position, pRatio = that._aspectRatio || event.shiftKey, cop = {
                    top: 0,
                    left: 0
                }, ce = that.containerElement, u = !0;
                ce[0] !== document && /static/.test(ce.css("position")) && (cop = co), cp.left < (that._helper ? co.left : 0) && (that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left),
                pRatio && (that.size.height = that.size.width / that.aspectRatio, u = !1), that.position.left = o.helper ? co.left : 0),
                cp.top < (that._helper ? co.top : 0) && (that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top),
                pRatio && (that.size.width = that.size.height * that.aspectRatio, u = !1), that.position.top = that._helper ? co.top : 0),
                    isParent = that.containerElement.get(0) === that.element.parent().get(0), isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position")),
                    isParent && isOffsetRelative ? (that.offset.left = that.parentData.left + that.position.left,
                            that.offset.top = that.parentData.top + that.position.top) : (that.offset.left = that.element.offset().left,
                            that.offset.top = that.element.offset().top), woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left)),
                    hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)),
                woset + that.size.width >= that.parentData.width && (that.size.width = that.parentData.width - woset,
                pRatio && (that.size.height = that.size.width / that.aspectRatio, u = !1)), hoset + that.size.height >= that.parentData.height && (that.size.height = that.parentData.height - hoset,
                pRatio && (that.size.width = that.size.height * that.aspectRatio, u = !1)), u || (that.position.left = that.prevPosition.left,
                    that.position.top = that.prevPosition.top, that.size.width = that.prevSize.width,
                    that.size.height = that.prevSize.height);
            },
            stop: function() {
                var that = test(this).resizable("instance"), o = that.options, co = that.containerOffset, cop = that.containerPosition, ce = that.containerElement, helper = test(that.helper), ho = helper.offset(), w = helper.outerWidth() - that.sizeDiff.width, h = helper.outerHeight() - that.sizeDiff.height;
                that._helper && !o.animate && /relative/.test(ce.css("position")) && test(this).css({
                    left: ho.left - cop.left - co.left,
                    width: w,
                    height: h
                }), that._helper && !o.animate && /static/.test(ce.css("position")) && test(this).css({
                    left: ho.left - cop.left - co.left,
                    width: w,
                    height: h
                });
            }
        }), test.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var that = test(this).resizable("instance"), o = that.options;
                test(o.alsoResize).each(function() {
                    var t = test(this);
                    t.data("ui-resizable-alsoresize", {
                        width: parseFloat(t.width()),
                        height: parseFloat(t.height()),
                        left: parseFloat(t.css("left")),
                        top: parseFloat(t.css("top"))
                    });
                });
            },
            resize: function(event, ui) {
                var that = test(this).resizable("instance"), o = that.options, os = that.originalSize, op = that.originalPosition, delta = {
                    height: that.size.height - os.height || 0,
                    width: that.size.width - os.width || 0,
                    top: that.position.top - op.top || 0,
                    left: that.position.left - op.left || 0
                };
                test(o.alsoResize).each(function() {
                    var el = test(this), start = test(this).data("ui-resizable-alsoresize"), style = {}, css = el.parents(ui.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                    test.each(css, function(i, prop) {
                        var sum = (start[prop] || 0) + (delta[prop] || 0);
                        sum && sum >= 0 && (style[prop] = sum || null);
                    }), el.css(style);
                });
            },
            stop: function() {
                test(this).removeData("ui-resizable-alsoresize");
            }
        }), test.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var that = test(this).resizable("instance"), cs = that.size;
                that.ghost = that.originalElement.clone(), that.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: cs.height,
                    width: cs.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }), that._addClass(that.ghost, "ui-resizable-ghost"), test.uiBackCompat !== !1 && "string" == typeof that.options.ghost && that.ghost.addClass(this.options.ghost),
                    that.ghost.appendTo(that.helper);
            },
            resize: function() {
                var that = test(this).resizable("instance");
                that.ghost && that.ghost.css({
                    position: "relative",
                    height: that.size.height,
                    width: that.size.width
                });
            },
            stop: function() {
                var that = test(this).resizable("instance");
                that.ghost && that.helper && that.helper.get(0).removeChild(that.ghost.get(0));
            }
        }), test.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var self, element = test(this).resizable("instance"), o = element.options, fields = element.size, img = element.originalSize, collapsingPanel = element.originalPosition, otherPanel = element.axis, resizeSettings = "number" == typeof o.grid ? [ o.grid, o.grid ] : o.grid, animation = resizeSettings[0] || 1, duration = resizeSettings[1] || 1, bar = Math.round((fields.width - img.width) / animation) * animation, height = Math.round((fields.height - img.height) / duration) * duration, width = img.width + bar, maxW = img.height + height, minW = o.maxWidth && o.maxWidth < width, barH = o.maxHeight && o.maxHeight < maxW, maxH = o.minWidth && o.minWidth > width, minH = o.minHeight && o.minHeight > maxW;
                o.grid = resizeSettings, maxH && (width += animation), minH && (maxW += duration),
                minW && (width -= animation), barH && (maxW -= duration), /^(se|s|e)$/.test(otherPanel) ? (element.size.width = width,
                        element.size.height = maxW) : /^(ne)$/.test(otherPanel) ? (element.size.width = width,
                            element.size.height = maxW, element.position.top = collapsingPanel.top - height) : /^(sw)$/.test(otherPanel) ? (element.size.width = width,
                                element.size.height = maxW, element.position.left = collapsingPanel.left - bar) : ((maxW - duration <= 0 || width - animation <= 0) && (self = element._getPaddingPlusBorderDimensions(this)),
                                maxW - duration > 0 ? (element.size.height = maxW, element.position.top = collapsingPanel.top - height) : (maxW = duration - self.height,
                                        element.size.height = maxW, element.position.top = collapsingPanel.top + img.height - maxW),
                                width - animation > 0 ? (element.size.width = width, element.position.left = collapsingPanel.left - bar) : (width = animation - self.width,
                                        element.size.width = width, element.position.left = collapsingPanel.left + img.width - width));
            }
        });
        test.ui.resizable;
        test.widget("ui.dialog", {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                classes: {
                    "ui-dialog": "ui-corner-all",
                    "ui-dialog-titlebar": "ui-corner-all"
                },
                closeOnEscape: !0,
                closeText: "Close",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(pos) {
                        var topOffset = test(this).css(pos).offset().top;
                        topOffset < 0 && test(this).css("top", pos.top - topOffset);
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            sizeRelatedOptions: {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions: {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle),
                this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog),
                    this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(),
                    this._createButtonPane(), this.options.draggable && test.fn.draggable && this._makeDraggable(),
                this.options.resizable && test.fn.resizable && this._makeResizable(), this._isOpen = !1,
                    this._trackFocus();
            },
            _init: function() {
                this.options.autoOpen && this.open();
            },
            _appendTo: function() {
                var element = this.options.appendTo;
                return element && (element.jquery || element.nodeType) ? test(element) : this.document.find(element || "body").eq(0);
            },
            _destroy: function() {
                var next, originalPosition = this.originalPosition;
                this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(),
                    this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle),
                    next = originalPosition.parent.children().eq(originalPosition.index), next.length && next[0] !== this.element[0] ? next.before(this.element) : originalPosition.parent.append(this.element);
            },
            widget: function() {
                return this.uiDialog;
            },
            disable: test.noop,
            enable: test.noop,
            close: function(event) {
                var self = this;
                this._isOpen && this._trigger("beforeClose", event) !== !1 && (this._isOpen = !1,
                    this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || test.ui.safeBlur(test.ui.safeActiveElement(this.document[0])),
                    this._hide(this.uiDialog, this.options.hide, function() {
                        self._trigger("close", event);
                    }));
            },
            isOpen: function() {
                return this._isOpen;
            },
            moveToTop: function() {
                this._moveToTop();
            },
            _moveToTop: function(event, index) {
                var c = !1, n = this.uiDialog.siblings(".ui-front:visible").map(function() {
                    return +test(this).css("z-index");
                }).get(), max = Math.max.apply(null, n);
                return max >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", max + 1),
                    c = !0), c && !index && this._trigger("focus", event), c;
            },
            open: function() {
                var that = this;
                return this._isOpen ? void (this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0,
                        this.opener = test(test.ui.safeActiveElement(this.document[0])), this._size(), this._position(),
                        this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
                        this._show(this.uiDialog, this.options.show, function() {
                            that._focusTabbable(), that._trigger("focus");
                        }), this._makeFocusTarget(), void this._trigger("open"));
            },
            _focusTabbable: function() {
                var hasFocus = this._focusedElement;
                hasFocus || (hasFocus = this.element.find("[autofocus]")), hasFocus.length || (hasFocus = this.element.find(":tabbable")),
                hasFocus.length || (hasFocus = this.uiDialogButtonPane.find(":tabbable")), hasFocus.length || (hasFocus = this.uiDialogTitlebarClose.filter(":tabbable")),
                hasFocus.length || (hasFocus = this.uiDialog), hasFocus.eq(0).trigger("focus");
            },
            _keepFocus: function(event) {
                function checkFocus() {
                    var activeElement = test.ui.safeActiveElement(this.document[0]), isActive = this.uiDialog[0] === activeElement || test.contains(this.uiDialog[0], activeElement);
                    isActive || this._focusTabbable();
                }
                event.preventDefault(), checkFocus.call(this), this._delay(checkFocus);
            },
            _createWrapper: function() {
                this.uiDialog = test("<div>").hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"),
                    this._on(this.uiDialog, {
                        keydown: function(event) {
                            if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === test.ui.keyCode.ESCAPE) return event.preventDefault(),
                                void this.close(event);
                            if (event.keyCode === test.ui.keyCode.TAB && !event.isDefaultPrevented()) {
                                var tabbables = this.uiDialog.find(":tabbable"), element = tabbables.filter(":first"), last = tabbables.filter(":last");
                                event.target !== last[0] && event.target !== this.uiDialog[0] || event.shiftKey ? event.target !== element[0] && event.target !== this.uiDialog[0] || !event.shiftKey || (this._delay(function() {
                                        last.trigger("focus");
                                    }), event.preventDefault()) : (this._delay(function() {
                                        element.trigger("focus");
                                    }), event.preventDefault());
                            }
                        },
                        mousedown: function(event) {
                            this._moveToTop(event) && this._focusTabbable();
                        }
                    }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                });
            },
            _createTitlebar: function() {
                var uiDialogTitle;
                this.uiDialogTitlebar = test("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"),
                    this._on(this.uiDialogTitlebar, {
                        mousedown: function(event) {
                            test(event.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus");
                        }
                    }), this.uiDialogTitlebarClose = test("<button type='button'></button>").button({
                    label: test("<a>").text(this.options.closeText).html(),
                    icon: "ui-icon-closethick",
                    showLabel: !1
                }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"),
                    this._on(this.uiDialogTitlebarClose, {
                        click: function(event) {
                            event.preventDefault(), this.close(event);
                        }
                    }), uiDialogTitle = test("<span>").uniqueId().prependTo(this.uiDialogTitlebar),
                    this._addClass(uiDialogTitle, "ui-dialog-title"), this._title(uiDialogTitle), this.uiDialogTitlebar.prependTo(this.uiDialog),
                    this.uiDialog.attr({
                        "aria-labelledby": uiDialogTitle.attr("id")
                    });
            },
            _title: function(title) {
                this.options.title ? title.text(this.options.title) : title.html("&#160;");
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = test("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"),
                    this.uiButtonSet = test("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
                    this._createButtons();
            },
            _createButtons: function() {
                var that = this, buttons = this.options.buttons;
                return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), test.isEmptyObject(buttons) || test.isArray(buttons) && !buttons.length ? void this._removeClass(this.uiDialog, "ui-dialog-buttons") : (test.each(buttons, function(name, props) {
                        var click, buttonOptions;
                        props = test.isFunction(props) ? {
                                click: props,
                                text: name
                            } : props, props = test.extend({
                            type: "button"
                        }, props), click = props.click, buttonOptions = {
                            icon: props.icon,
                            iconPosition: props.iconPosition,
                            showLabel: props.showLabel,
                            icons: props.icons,
                            text: props.text
                        }, delete props.click, delete props.icon, delete props.iconPosition, delete props.showLabel,
                            delete props.icons, "boolean" == typeof props.text && delete props.text, test("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet).on("click", function() {
                            click.apply(that.element[0], arguments);
                        });
                    }), this._addClass(this.uiDialog, "ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog));
            },
            _makeDraggable: function() {
                function filteredUi(ui) {
                    return {
                        position: ui.position,
                        offset: ui.offset
                    };
                }
                var that = this, options = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(event, ui) {
                        that._addClass(test(this), "ui-dialog-dragging"), that._blockFrames(), that._trigger("dragStart", event, filteredUi(ui));
                    },
                    drag: function(event, ui) {
                        that._trigger("drag", event, filteredUi(ui));
                    },
                    stop: function(event, ui) {
                        var left = ui.offset.left - that.document.scrollLeft(), top = ui.offset.top - that.document.scrollTop();
                        options.position = {
                            my: "left top",
                            at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
                            of: that.window
                        }, that._removeClass(test(this), "ui-dialog-dragging"), that._unblockFrames(), that._trigger("dragStop", event, filteredUi(ui));
                    }
                });
            },
            _makeResizable: function() {
                function filteredUi(ui) {
                    return {
                        originalPosition: ui.originalPosition,
                        originalSize: ui.originalSize,
                        position: ui.position,
                        size: ui.size
                    };
                }
                var that = this, options = this.options, handles = options.resizable, position = this.uiDialog.css("position"), resizeHandles = "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: options.maxWidth,
                    maxHeight: options.maxHeight,
                    minWidth: options.minWidth,
                    minHeight: this._minHeight(),
                    handles: resizeHandles,
                    start: function(event, ui) {
                        that._addClass(test(this), "ui-dialog-resizing"), that._blockFrames(), that._trigger("resizeStart", event, filteredUi(ui));
                    },
                    resize: function(event, ui) {
                        that._trigger("resize", event, filteredUi(ui));
                    },
                    stop: function(event, ui) {
                        var offset = that.uiDialog.offset(), left = offset.left - that.document.scrollLeft(), top = offset.top - that.document.scrollTop();
                        options.height = that.uiDialog.height(), options.width = that.uiDialog.width(),
                            options.position = {
                                my: "left top",
                                at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
                                of: that.window
                            }, that._removeClass(test(this), "ui-dialog-resizing"), that._unblockFrames(), that._trigger("resizeStop", event, filteredUi(ui));
                    }
                }).css("position", position);
            },
            _trackFocus: function() {
                this._on(this.widget(), {
                    focusin: function(event) {
                        this._makeFocusTarget(), this._focusedElement = test(event.target);
                    }
                });
            },
            _makeFocusTarget: function() {
                this._untrackInstance(), this._trackingInstances().unshift(this);
            },
            _untrackInstance: function() {
                var ids = this._trackingInstances(), index = test.inArray(this, ids);
                index !== -1 && ids.splice(index, 1);
            },
            _trackingInstances: function() {
                var instances = this.document.data("ui-dialog-instances");
                return instances || (instances = [], this.document.data("ui-dialog-instances", instances)),
                    instances;
            },
            _minHeight: function() {
                var options = this.options;
                return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height);
            },
            _position: function() {
                var isVisible = this.uiDialog.is(":visible");
                isVisible || this.uiDialog.show(), this.uiDialog.position(this.options.position),
                isVisible || this.uiDialog.hide();
            },
            _setOptions: function(options) {
                var that = this, resize = !1, resizableOptions = {};
                test.each(options, function(key, value) {
                    that._setOption(key, value), key in that.sizeRelatedOptions && (resize = !0), key in that.resizableRelatedOptions && (resizableOptions[key] = value);
                }), resize && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", resizableOptions);
            },
            _setOption: function(key, value) {
                var isDraggable, isResizable, uiDialog = this.uiDialog;
                "disabled" !== key && (this._super(key, value), "appendTo" === key && this.uiDialog.appendTo(this._appendTo()),
                "buttons" === key && this._createButtons(), "closeText" === key && this.uiDialogTitlebarClose.button({
                    label: test("<a>").text("" + this.options.closeText).html()
                }), "draggable" === key && (isDraggable = uiDialog.is(":data(ui-draggable)"), isDraggable && !value && uiDialog.draggable("destroy"),
                !isDraggable && value && this._makeDraggable()), "position" === key && this._position(),
                "resizable" === key && (isResizable = uiDialog.is(":data(ui-resizable)"), isResizable && !value && uiDialog.resizable("destroy"),
                isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value),
                isResizable || value === !1 || this._makeResizable()), "title" === key && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
            },
            _size: function() {
                var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
                    height: "auto",
                    width: options.width
                }).outerHeight(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight),
                    maxContentHeight = "number" == typeof options.maxHeight ? Math.max(0, options.maxHeight - nonContentHeight) : "none",
                    "auto" === options.height ? this.element.css({
                            minHeight: minContentHeight,
                            maxHeight: maxContentHeight,
                            height: "auto"
                        }) : this.element.height(Math.max(0, options.height - nonContentHeight)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var iframe = test(this);
                    return test("<div>").css({
                        position: "absolute",
                        width: iframe.outerWidth(),
                        height: iframe.outerHeight()
                    }).appendTo(iframe.parent()).offset(iframe.offset())[0];
                });
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
            },
            _allowInteraction: function(event) {
                return !!test(event.target).closest(".ui-dialog").length || !!test(event.target).closest(".ui-datepicker").length;
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var colliding = !0;
                    this._delay(function() {
                        colliding = !1;
                    }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                        focusin: function(event) {
                            colliding || this._allowInteraction(event) || (event.preventDefault(), this._trackingInstances()[0]._focusTabbable());
                        }
                    }), this.overlay = test("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
                        this._on(this.overlay, {
                            mousedown: "_keepFocus"
                        }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
                }
            },
            _destroyOverlay: function() {
                if (this.options.modal && this.overlay) {
                    var overlays = this.document.data("ui-dialog-overlays") - 1;
                    overlays ? this.document.data("ui-dialog-overlays", overlays) : (this._off(this.document, "focusin"),
                            this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null;
                }
            }
        }), test.uiBackCompat !== !1 && test.widget("ui.dialog", test.ui.dialog, {
            options: {
                dialogClass: ""
            },
            _createWrapper: function() {
                this._super(), this.uiDialog.addClass(this.options.dialogClass);
            },
            _setOption: function(key, value) {
                "dialogClass" === key && this.uiDialog.removeClass(this.options.dialogClass).addClass(value),
                    this._superApply(arguments);
            }
        });
        test.ui.dialog;
        test.widget("ui.droppable", {
            version: "1.12.1",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                addClasses: !0,
                greedy: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var min, o = this.options, accept = o.accept;
                this.isover = !1, this.isout = !0, this.accept = test.isFunction(accept) ? accept : function(d) {
                        return d.is(accept);
                    }, this.proportions = function() {
                    return arguments.length ? void (min = arguments[0]) : min ? min : min = {
                                width: this.element[0].offsetWidth,
                                height: this.element[0].offsetHeight
                            };
                }, this._addToManager(o.scope), o.addClasses && this._addClass("ui-droppable");
            },
            _addToManager: function(scope) {
                test.ui.ddmanager.droppables[scope] = test.ui.ddmanager.droppables[scope] || [],
                    test.ui.ddmanager.droppables[scope].push(this);
            },
            _splice: function(drop) {
                for (var i = 0; i < drop.length; i++) drop[i] === this && drop.splice(i, 1);
            },
            _destroy: function() {
                var drop = test.ui.ddmanager.droppables[this.options.scope];
                this._splice(drop);
            },
            _setOption: function(key, value) {
                if ("accept" === key) this.accept = test.isFunction(value) ? value : function(d) {
                        return d.is(value);
                    }; else if ("scope" === key) {
                    var drop = test.ui.ddmanager.droppables[this.options.scope];
                    this._splice(drop), this._addToManager(value);
                }
                this._super(key, value);
            },
            _activate: function(event) {
                var draggable = test.ui.ddmanager.current;
                this._addActiveClass(), draggable && this._trigger("activate", event, this.ui(draggable));
            },
            _deactivate: function(event) {
                var draggable = test.ui.ddmanager.current;
                this._removeActiveClass(), draggable && this._trigger("deactivate", event, this.ui(draggable));
            },
            _over: function(event) {
                var draggable = test.ui.ddmanager.current;
                draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this._addHoverClass(),
                    this._trigger("over", event, this.ui(draggable)));
            },
            _out: function(event) {
                var draggable = test.ui.ddmanager.current;
                draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this._removeHoverClass(),
                    this._trigger("out", event, this.ui(draggable)));
            },
            _drop: function(event, custom) {
                var draggable = custom || test.ui.ddmanager.current, a = !1;
                return !(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                        var inst = test(this).droppable("instance");
                        if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && call(draggable, test.extend(inst, {
                                offset: inst.element.offset()
                            }), inst.options.tolerance, event)) return a = !0, !1;
                    }), !a && (!!this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this._removeActiveClass(),
                        this._removeHoverClass(), this._trigger("drop", event, this.ui(draggable)), this.element)));
            },
            ui: function(c) {
                return {
                    draggable: c.currentItem || c.element,
                    helper: c.helper,
                    position: c.position,
                    offset: c.positionAbs
                };
            },
            _addHoverClass: function() {
                this._addClass("ui-droppable-hover");
            },
            _removeHoverClass: function() {
                this._removeClass("ui-droppable-hover");
            },
            _addActiveClass: function() {
                this._addClass("ui-droppable-active");
            },
            _removeActiveClass: function() {
                this._removeClass("ui-droppable-active");
            }
        });
        var call = test.ui.intersect = function() {
            function isOverAxis(x, reference, size) {
                return x >= reference && x < reference + size;
            }
            return function(draggable, droppable, toleranceMode, event) {
                if (!droppable.offset) return !1;
                var x = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left, y = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top, pos = x + draggable.helperProportions.width, i = y + draggable.helperProportions.height, left = droppable.offset.left, top = droppable.offset.top, right = left + droppable.proportions().width, bottom = top + droppable.proportions().height;
                switch (toleranceMode) {
                    case "fit":
                        return left <= x && pos <= right && top <= y && i <= bottom;

                    case "intersect":
                        return left < x + draggable.helperProportions.width / 2 && pos - draggable.helperProportions.width / 2 < right && top < y + draggable.helperProportions.height / 2 && i - draggable.helperProportions.height / 2 < bottom;

                    case "pointer":
                        return isOverAxis(event.pageY, top, droppable.proportions().height) && isOverAxis(event.pageX, left, droppable.proportions().width);

                    case "touch":
                        return (y >= top && y <= bottom || i >= top && i <= bottom || y < top && i > bottom) && (x >= left && x <= right || pos >= left && pos <= right || x < left && pos > right);

                    default:
                        return !1;
                }
            };
        }();
        test.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(t, event) {
                var i, j, m = test.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type : null, list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                droppablesLoop: for (i = 0; i < m.length; i++) if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
                    for (j = 0; j < list.length; j++) if (list[j] === m[i].element[0]) {
                        m[i].proportions().height = 0;
                        continue droppablesLoop;
                    }
                    m[i].visible = "none" !== m[i].element.css("display"), m[i].visible && ("mousedown" === type && m[i]._activate.call(m[i], event),
                        m[i].offset = m[i].element.offset(), m[i].proportions({
                        width: m[i].element[0].offsetWidth,
                        height: m[i].element[0].offsetHeight
                    }));
                }
            },
            drop: function(draggable, event) {
                var dropped = !1;
                return test.each((test.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && call(draggable, this, this.options.tolerance, event) && (dropped = this._drop.call(this, event) || dropped),
                    !this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = !0,
                        this.isover = !1, this._deactivate.call(this, event)));
                }), dropped;
            },
            dragStart: function(draggable, event) {
                draggable.element.parentsUntil("body").on("scroll.droppable", function() {
                    draggable.options.refreshPositions || test.ui.ddmanager.prepareOffsets(draggable, event);
                });
            },
            drag: function(draggable, event) {
                draggable.options.refreshPositions && test.ui.ddmanager.prepareOffsets(draggable, event),
                    test.each(test.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
                        if (!this.options.disabled && !this.greedyChild && this.visible) {
                            var parentInstance, scope, parent, intersects = call(draggable, this, this.options.tolerance, event), c = !intersects && this.isover ? "isout" : intersects && !this.isover ? "isover" : null;
                            c && (this.options.greedy && (scope = this.options.scope, parent = this.element.parents(":data(ui-droppable)").filter(function() {
                                return test(this).droppable("instance").options.scope === scope;
                            }), parent.length && (parentInstance = test(parent[0]).droppable("instance"), parentInstance.greedyChild = "isover" === c)),
                            parentInstance && "isover" === c && (parentInstance.isover = !1, parentInstance.isout = !0,
                                parentInstance._out.call(parentInstance, event)), this[c] = !0, this["isout" === c ? "isover" : "isout"] = !1,
                                this["isover" === c ? "_over" : "_out"].call(this, event), parentInstance && "isout" === c && (parentInstance.isout = !1,
                                parentInstance.isover = !0, parentInstance._over.call(parentInstance, event)));
                        }
                    });
            },
            dragStop: function(draggable, event) {
                draggable.element.parentsUntil("body").off("scroll.droppable"), draggable.options.refreshPositions || test.ui.ddmanager.prepareOffsets(draggable, event);
            }
        }, test.uiBackCompat !== !1 && test.widget("ui.droppable", test.ui.droppable, {
            options: {
                hoverClass: !1,
                activeClass: !1
            },
            _addActiveClass: function() {
                this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
            },
            _removeActiveClass: function() {
                this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
            },
            _addHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
            },
            _removeHoverClass: function() {
                this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
            }
        });
        test.ui.droppable, test.widget("ui.progressbar", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-progressbar": "ui-corner-all",
                    "ui-progressbar-value": "ui-corner-left",
                    "ui-progressbar-complete": "ui-corner-right"
                },
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = test("<div>").appendTo(this.element),
                    this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue();
            },
            _destroy: function() {
                this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
            },
            value: function(newValue) {
                return void 0 === newValue ? this.options.value : (this.options.value = this._constrainedValue(newValue),
                        void this._refreshValue());
            },
            _constrainedValue: function(newValue) {
                return void 0 === newValue && (newValue = this.options.value), this.indeterminate = newValue === !1,
                "number" != typeof newValue && (newValue = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, newValue));
            },
            _setOptions: function(options) {
                var value = options.value;
                delete options.value, this._super(options), this.options.value = this._constrainedValue(value),
                    this._refreshValue();
            },
            _setOption: function(key, value) {
                "max" === key && (value = Math.max(this.min, value)), this._super(key, value);
            },
            _setOptionDisabled: function(value) {
                this._super(value), this.element.attr("aria-disabled", value), this._toggleClass(null, "ui-state-disabled", !!value);
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
            },
            _refreshValue: function() {
                var value = this.options.value, percentage = this._percentage();
                this.valueDiv.toggle(this.indeterminate || value > this.min).width(percentage.toFixed(0) + "%"),
                    this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, value === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate),
                    this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = test("<div>").appendTo(this.valueDiv),
                            this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                            "aria-valuemax": this.options.max,
                            "aria-valuenow": value
                        }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== value && (this.oldValue = value,
                    this._trigger("change")), value === this.options.max && this._trigger("complete");
            }
        }), test.widget("ui.selectable", test.ui.mouse, {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var self = this;
                this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    self.elementPos = test(self.element[0]).offset(), self.selectees = test(self.options.filter, self.element[0]),
                        self._addClass(self.selectees, "ui-selectee"), self.selectees.each(function() {
                        var $this = test(this), pos = $this.offset(), options = {
                            left: pos.left - self.elementPos.left,
                            top: pos.top - self.elementPos.top
                        };
                        test.data(this, "selectable-item", {
                            element: this,
                            $element: $this,
                            left: options.left,
                            top: options.top,
                            right: options.left + $this.outerWidth(),
                            bottom: options.top + $this.outerHeight(),
                            startselected: !1,
                            selected: $this.hasClass("ui-selected"),
                            selecting: $this.hasClass("ui-selecting"),
                            unselecting: $this.hasClass("ui-unselecting")
                        });
                    });
                }, this.refresh(), this._mouseInit(), this.helper = test("<div>"), this._addClass(this.helper, "ui-selectable-helper");
            },
            _destroy: function() {
                this.selectees.removeData("selectable-item"), this._mouseDestroy();
            },
            _mouseStart: function(event) {
                var self = this, options = this.options;
                this.opos = [ event.pageX, event.pageY ], this.elementPos = test(this.element[0]).offset(),
                this.options.disabled || (this.selectees = test(options.filter, this.element[0]),
                    this._trigger("start", event), test(options.appendTo).append(this.helper), this.helper.css({
                    left: event.pageX,
                    top: event.pageY,
                    width: 0,
                    height: 0
                }), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var selectee = test.data(this, "selectable-item");
                    selectee.startselected = !0, event.metaKey || event.ctrlKey || (self._removeClass(selectee.$element, "ui-selected"),
                        selectee.selected = !1, self._addClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !0,
                        self._trigger("unselecting", event, {
                            unselecting: selectee.element
                        }));
                }), test(event.target).parents().addBack().each(function() {
                    var doSelect, selectee = test.data(this, "selectable-item");
                    if (selectee) return doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected"),
                        self._removeClass(selectee.$element, doSelect ? "ui-unselecting" : "ui-selected")._addClass(selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting"),
                        selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect,
                        doSelect ? self._trigger("selecting", event, {
                                selecting: selectee.element
                            }) : self._trigger("unselecting", event, {
                                unselecting: selectee.element
                            }), !1;
                }));
            },
            _mouseDrag: function(event) {
                if (this.dragged = !0, !this.options.disabled) {
                    var tmp, that = this, options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
                    return x1 > x2 && (tmp = x2, x2 = x1, x1 = tmp), y1 > y2 && (tmp = y2, y2 = y1,
                        y1 = tmp), this.helper.css({
                        left: x1,
                        top: y1,
                        width: x2 - x1,
                        height: y2 - y1
                    }), this.selectees.each(function() {
                        var selectee = test.data(this, "selectable-item"), hit = !1, coords = {};
                        selectee && selectee.element !== that.element[0] && (coords.left = selectee.left + that.elementPos.left,
                            coords.right = selectee.right + that.elementPos.left, coords.top = selectee.top + that.elementPos.top,
                            coords.bottom = selectee.bottom + that.elementPos.top, "touch" === options.tolerance ? hit = !(coords.left > x2 || coords.right < x1 || coords.top > y2 || coords.bottom < y1) : "fit" === options.tolerance && (hit = coords.left > x1 && coords.right < x2 && coords.top > y1 && coords.bottom < y2),
                            hit ? (selectee.selected && (that._removeClass(selectee.$element, "ui-selected"),
                                    selectee.selected = !1), selectee.unselecting && (that._removeClass(selectee.$element, "ui-unselecting"),
                                    selectee.unselecting = !1), selectee.selecting || (that._addClass(selectee.$element, "ui-selecting"),
                                    selectee.selecting = !0, that._trigger("selecting", event, {
                                    selecting: selectee.element
                                }))) : (selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (that._removeClass(selectee.$element, "ui-selecting"),
                                        selectee.selecting = !1, that._addClass(selectee.$element, "ui-selected"), selectee.selected = !0) : (that._removeClass(selectee.$element, "ui-selecting"),
                                        selectee.selecting = !1, selectee.startselected && (that._addClass(selectee.$element, "ui-unselecting"),
                                        selectee.unselecting = !0), that._trigger("unselecting", event, {
                                        unselecting: selectee.element
                                    }))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (that._removeClass(selectee.$element, "ui-selected"),
                                    selectee.selected = !1, that._addClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !0,
                                    that._trigger("unselecting", event, {
                                        unselecting: selectee.element
                                    })))));
                    }), !1;
                }
            },
            _mouseStop: function(event) {
                var self = this;
                return this.dragged = !1, test(".ui-unselecting", this.element[0]).each(function() {
                    var selectee = test.data(this, "selectable-item");
                    self._removeClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !1,
                        selectee.startselected = !1, self._trigger("unselected", event, {
                        unselected: selectee.element
                    });
                }), test(".ui-selecting", this.element[0]).each(function() {
                    var selectee = test.data(this, "selectable-item");
                    self._removeClass(selectee.$element, "ui-selecting")._addClass(selectee.$element, "ui-selected"),
                        selectee.selecting = !1, selectee.selected = !0, selectee.startselected = !0, self._trigger("selected", event, {
                        selected: selectee.element
                    });
                }), this._trigger("stop", event), this.helper.remove(), !1;
            }
        }), test.widget("ui.selectmenu", [ test.ui.formResetMixin, {
            version: "1.12.1",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                classes: {
                    "ui-selectmenu-button-open": "ui-corner-top",
                    "ui-selectmenu-button-closed": "ui-corner-all"
                },
                disabled: null,
                icons: {
                    button: "ui-icon-triangle-1-s"
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                width: !1,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null
            },
            _create: function() {
                var selectmenuId = this.element.uniqueId().attr("id");
                this.ids = {
                    element: selectmenuId,
                    button: selectmenuId + "-button",
                    menu: selectmenuId + "-menu"
                }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1,
                    this.menuItems = test();
            },
            _drawButton: function() {
                var text, self = this, err = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
                    click: function(e) {
                        this.button.focus(), e.preventDefault();
                    }
                }), this.element.hide(), this.button = test("<span>", {
                    tabindex: this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true",
                    title: this.element.attr("title")
                }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"),
                    text = test("<span>").appendTo(this.button), this._addClass(text, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button),
                    this.buttonItem = this._renderButtonItem(err).appendTo(this.button), this.options.width !== !1 && this._resizeButton(),
                    this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                    self._rendered || self._refreshMenu();
                });
            },
            _drawMenu: function() {
                var that = this;
                this.menu = test("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu
                }), this.menuWrap = test("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
                    this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                    classes: {
                        "ui-menu": "ui-corner-bottom"
                    },
                    role: "listbox",
                    select: function(event, ui) {
                        event.preventDefault(), that._setSelection(), that._select(ui.item.data("ui-selectmenu-item"), event);
                    },
                    focus: function(event, ui) {
                        var item = ui.item.data("ui-selectmenu-item");
                        null != that.focusIndex && item.index !== that.focusIndex && (that._trigger("focus", event, {
                            item: item
                        }), that.isOpen || that._select(item, event)), that.focusIndex = item.index, that.button.attr("aria-activedescendant", that.menuItems.eq(item.index).attr("id"));
                    }
                }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                    return !1;
                }, this.menuInstance._isDivider = function() {
                    return !1;
                };
            },
            refresh: function() {
                this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})),
                null === this.options.width && this._resizeButton();
            },
            _refreshMenu: function() {
                var item, options = this.element.find("option");
                this.menu.empty(), this._parseOptions(options), this._renderMenu(this.menu, this.items),
                    this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),
                    this._rendered = !0, options.length && (item = this._getSelectedItem(), this.menuInstance.focus(null, item),
                    this._setAria(item.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));
            },
            open: function(event) {
                this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"),
                        this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0,
                    this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick),
                    this._trigger("open", event)));
            },
            _position: function() {
                this.menuWrap.position(test.extend({
                    of: this.button
                }, this.options.position));
            },
            close: function(event) {
                this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document),
                    this._trigger("close", event));
            },
            widget: function() {
                return this.button;
            },
            menuWidget: function() {
                return this.menu;
            },
            _renderButtonItem: function(item) {
                var li = test("<span>");
                return this._setText(li, item.label), this._addClass(li, "ui-selectmenu-text"),
                    li;
            },
            _renderMenu: function(ul, items) {
                var that = this, currentOptgroup = "";
                test.each(items, function(groupItem, item) {
                    var panel;
                    item.optgroup !== currentOptgroup && (panel = test("<li>", {
                        text: item.optgroup
                    }), that._addClass(panel, "ui-selectmenu-optgroup", "ui-menu-divider" + (item.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")),
                        panel.appendTo(ul), currentOptgroup = item.optgroup), that._renderItemData(ul, item);
                });
            },
            _renderItemData: function(item, index) {
                return this._renderItem(item, index).data("ui-selectmenu-item", index);
            },
            _renderItem: function(ul, item) {
                var e = test("<li>"), t = test("<div>", {
                    title: item.element.attr("title")
                });
                return item.disabled && this._addClass(e, null, "ui-state-disabled"), this._setText(t, item.label),
                    e.append(t).appendTo(ul);
            },
            _setText: function(element, content) {
                content ? element.text(content) : element.html("&#160;");
            },
            _move: function(direction, event) {
                var item, target, filter = ".ui-menu-item";
                this.isOpen ? item = this.menuItems.eq(this.focusIndex).parent("li") : (item = this.menuItems.eq(this.element[0].selectedIndex).parent("li"),
                        filter += ":not(.ui-state-disabled)"), target = "first" === direction || "last" === direction ? item["first" === direction ? "prevAll" : "nextAll"](filter).eq(-1) : item[direction + "All"](filter).eq(0),
                target.length && this.menuInstance.focus(event, target);
            },
            _getSelectedItem: function() {
                return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
            },
            _toggle: function(inXhr) {
                this[this.isOpen ? "close" : "open"](inXhr);
            },
            _setSelection: function() {
                var selection;
                this.range && (window.getSelection ? (selection = window.getSelection(), selection.removeAllRanges(),
                        selection.addRange(this.range)) : this.range.select(), this.button.focus());
            },
            _documentClick: {
                mousedown: function(event) {
                    this.isOpen && (test(event.target).closest(".ui-selectmenu-menu, #" + test.ui.escapeSelector(this.ids.button)).length || this.close(event));
                }
            },
            _buttonEvents: {
                mousedown: function() {
                    var selection;
                    window.getSelection ? (selection = window.getSelection(), selection.rangeCount && (this.range = selection.getRangeAt(0))) : this.range = document.selection.createRange();
                },
                click: function(toggle) {
                    this._setSelection(), this._toggle(toggle);
                },
                keydown: function(event) {
                    var preventDefault = !0;
                    switch (event.keyCode) {
                        case test.ui.keyCode.TAB:
                        case test.ui.keyCode.ESCAPE:
                            this.close(event), preventDefault = !1;
                            break;

                        case test.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(event);
                            break;

                        case test.ui.keyCode.UP:
                            event.altKey ? this._toggle(event) : this._move("prev", event);
                            break;

                        case test.ui.keyCode.DOWN:
                            event.altKey ? this._toggle(event) : this._move("next", event);
                            break;

                        case test.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(event) : this._toggle(event);
                            break;

                        case test.ui.keyCode.LEFT:
                            this._move("prev", event);
                            break;

                        case test.ui.keyCode.RIGHT:
                            this._move("next", event);
                            break;

                        case test.ui.keyCode.HOME:
                        case test.ui.keyCode.PAGE_UP:
                            this._move("first", event);
                            break;

                        case test.ui.keyCode.END:
                        case test.ui.keyCode.PAGE_DOWN:
                            this._move("last", event);
                            break;

                        default:
                            this.menu.trigger(event), preventDefault = !1;
                    }
                    preventDefault && event.preventDefault();
                }
            },
            _selectFocusedItem: function(event) {
                var $li = this.menuItems.eq(this.focusIndex).parent("li");
                $li.hasClass("ui-state-disabled") || this._select($li.data("ui-selectmenu-item"), event);
            },
            _select: function(item, event) {
                var oldIndex = this.element[0].selectedIndex;
                this.element[0].selectedIndex = item.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(item)),
                    this._setAria(item), this._trigger("select", event, {
                    item: item
                }), item.index !== oldIndex && this._trigger("change", event, {
                    item: item
                }), this.close(event);
            },
            _setAria: function(item) {
                var id = this.menuItems.eq(item.index).attr("id");
                this.button.attr({
                    "aria-labelledby": id,
                    "aria-activedescendant": id
                }), this.menu.attr("aria-activedescendant", id);
            },
            _setOption: function(key, value) {
                if ("icons" === key) {
                    var elem = this.button.find("span.ui-icon");
                    this._removeClass(elem, null, this.options.icons.button)._addClass(elem, null, value.button);
                }
                this._super(key, value), "appendTo" === key && this.menuWrap.appendTo(this._appendTo()),
                "width" === key && this._resizeButton();
            },
            _setOptionDisabled: function(value) {
                this._super(value), this.menuInstance.option("disabled", value), this.button.attr("aria-disabled", value),
                    this._toggleClass(this.button, null, "ui-state-disabled", value), this.element.prop("disabled", value),
                    value ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0);
            },
            _appendTo: function() {
                var element = this.options.appendTo;
                return element && (element = element.jquery || element.nodeType ? test(element) : this.document.find(element).eq(0)),
                element && element[0] || (element = this.element.closest(".ui-front, dialog")),
                element.length || (element = this.document[0].body), element;
            },
            _toggleAttr: function() {
                this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen),
                    this.menu.attr("aria-hidden", !this.isOpen);
            },
            _resizeButton: function() {
                var width = this.options.width;
                return width === !1 ? void this.button.css("width", "") : (null === width && (width = this.element.show().outerWidth(),
                        this.element.hide()), void this.button.outerWidth(width));
            },
            _resizeMenu: function() {
                this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));
            },
            _getCreateOptions: function() {
                var elem = this._super();
                return elem.disabled = this.element.prop("disabled"), elem;
            },
            _parseOptions: function($list) {
                var self = this, codes = [];
                $list.each(function(i, el) {
                    codes.push(self._parseOption(test(el), i));
                }), this.items = codes;
            },
            _parseOption: function(element, attr) {
                var optgroup = element.parent("optgroup");
                return {
                    element: element,
                    index: attr,
                    value: element.val(),
                    label: element.text(),
                    optgroup: optgroup.attr("label") || "",
                    disabled: optgroup.prop("disabled") || element.prop("disabled")
                };
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(),
                    this.element.removeUniqueId(), this.labels.attr("for", this.ids.element);
            }
        } ]), test.widget("ui.slider", test.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                classes: {
                    "ui-slider": "ui-corner-all",
                    "ui-slider-handle": "ui-corner-all",
                    "ui-slider-range": "ui-corner-all ui-widget-header"
                },
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            numPages: 5,
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null,
                    this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"),
                    this._refresh(), this._animateOff = !1;
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
            },
            _createHandles: function() {
                var index, n, options = this.options, list = this.element.find(".ui-slider-handle"), i = "<span tabindex='0'></span>", values = [];
                for (n = options.values && options.values.length || 1, list.length > n && (list.slice(n).remove(),
                    list = list.slice(0, n)), index = list.length; index < n; index++) values.push(i);
                this.handles = list.add(test(values.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
                    this.handle = this.handles.eq(0), this.handles.each(function(i) {
                    test(this).data("ui-slider-handle-index", i).attr("tabIndex", 0);
                });
            },
            _createRange: function() {
                var options = this.options;
                options.range ? (options.range === !0 && (options.values ? options.values.length && 2 !== options.values.length ? options.values = [ options.values[0], options.values[0] ] : test.isArray(options.values) && (options.values = options.values.slice(0)) : options.values = [ this._valueMin(), this._valueMin() ]),
                        this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"),
                                this.range.css({
                                    left: "",
                                    bottom: ""
                                })) : (this.range = test("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")),
                    "min" !== options.range && "max" !== options.range || this._addClass(this.range, "ui-slider-range-" + options.range)) : (this.range && this.range.remove(),
                        this.range = null);
            },
            _setupEvents: function() {
                this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles),
                    this._focusable(this.handles);
            },
            _destroy: function() {
                this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
            },
            _mouseCapture: function(event) {
                var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle, that = this, o = this.options;
                return !o.disabled && (this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight()
                    }, this.elementOffset = this.element.offset(), position = {
                        x: event.pageX,
                        y: event.pageY
                    }, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1,
                        this.handles.each(function(i) {
                            var thisDistance = Math.abs(normValue - that.values(i));
                            (distance > thisDistance || distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min)) && (distance = thisDistance,
                                closestHandle = test(this), index = i);
                        }), allowed = this._start(event, index), allowed !== !1 && (this._mouseSliding = !0,
                        this._handleIndex = index, this._addClass(closestHandle, null, "ui-state-active"),
                        closestHandle.trigger("focus"), offset = closestHandle.offset(), mouseOverHandle = !test(event.target).parents().addBack().is(".ui-slider-handle"),
                        this._clickOffset = mouseOverHandle ? {
                                left: 0,
                                top: 0
                            } : {
                                left: event.pageX - offset.left - closestHandle.width() / 2,
                                top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
                            }, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue),
                        this._animateOff = !0, !0));
            },
            _mouseStart: function() {
                return !0;
            },
            _mouseDrag: function(event) {
                var position = {
                    x: event.pageX,
                    y: event.pageY
                }, normValue = this._normValueFromMouse(position);
                return this._slide(event, this._handleIndex, normValue), !1;
            },
            _mouseStop: function(event) {
                return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1,
                    this._stop(event, this._handleIndex), this._change(event, this._handleIndex), this._handleIndex = null,
                    this._clickOffset = null, this._animateOff = !1, !1;
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
            },
            _normValueFromMouse: function(position) {
                var out, i, n, val, x;
                return "horizontal" === this.orientation ? (out = this.elementSize.width, i = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (out = this.elementSize.height,
                        i = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                    n = i / out, n > 1 && (n = 1), n < 0 && (n = 0), "vertical" === this.orientation && (n = 1 - n),
                    val = this._valueMax() - this._valueMin(), x = this._valueMin() + n * val, this._trimAlignValue(x);
            },
            _uiHash: function(key, value, silent) {
                var options = {
                    handle: this.handles[key],
                    handleIndex: key,
                    value: void 0 !== value ? value : this.value()
                };
                return this._hasMultipleValues() && (options.value = void 0 !== value ? value : this.values(key),
                    options.values = silent || this.values()), options;
            },
            _hasMultipleValues: function() {
                return this.options.values && this.options.values.length;
            },
            _start: function(event, draggable) {
                return this._trigger("start", event, this._uiHash(draggable));
            },
            _slide: function(event, index, value) {
                var allowed, i, list = this.value(), values = this.values();
                this._hasMultipleValues() && (i = this.values(index ? 0 : 1), list = this.values(index),
                2 === this.options.values.length && this.options.range === !0 && (value = 0 === index ? Math.min(i, value) : Math.max(i, value)),
                    values[index] = value), value !== list && (allowed = this._trigger("slide", event, this._uiHash(index, value, values)),
                allowed !== !1 && (this._hasMultipleValues() ? this.values(index, value) : this.value(value)));
            },
            _stop: function(event, draggable) {
                this._trigger("stop", event, this._uiHash(draggable));
            },
            _change: function(event, index) {
                this._keySliding || this._mouseSliding || (this._lastChangedValue = index, this._trigger("change", event, this._uiHash(index)));
            },
            value: function(newValue) {
                return arguments.length ? (this.options.value = this._trimAlignValue(newValue),
                        this._refreshValue(), void this._change(null, 0)) : this._value();
            },
            values: function(index, newValue) {
                var vals, newValues, i;
                if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue),
                    this._refreshValue(), void this._change(null, index);
                if (!arguments.length) return this._values();
                if (!test.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(index) : this.value();
                for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]),
                    this._change(null, i);
                this._refreshValue();
            },
            _setOption: function(key, value) {
                var i, valsLength = 0;
                switch ("range" === key && this.options.range === !0 && ("min" === value ? (this.options.value = this._values(0),
                        this.options.values = null) : "max" === value && (this.options.value = this._values(this.options.values.length - 1),
                        this.options.values = null)), test.isArray(this.options.values) && (valsLength = this.options.values.length),
                    this._super(key, value), key) {
                    case "orientation":
                        this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation),
                            this._refreshValue(), this.options.range && this._refreshRange(value), this.handles.css("horizontal" === value ? "bottom" : "left", "");
                        break;

                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;

                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), i = valsLength - 1; i >= 0; i--) this._change(null, i);
                        this._animateOff = !1;
                        break;

                    case "step":
                    case "min":
                    case "max":
                        this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                        break;

                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1;
                }
            },
            _setOptionDisabled: function(canvas) {
                this._super(canvas), this._toggleClass(null, "ui-state-disabled", !!canvas);
            },
            _value: function() {
                var val = this.options.value;
                return val = this._trimAlignValue(val);
            },
            _values: function(index) {
                var val, vals, i;
                if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
                if (this._hasMultipleValues()) {
                    for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
                    return vals;
                }
                return [];
            },
            _trimAlignValue: function(val) {
                if (val <= this._valueMin()) return this._valueMin();
                if (val >= this._valueMax()) return this._valueMax();
                var step = this.options.step > 0 ? this.options.step : 1, valModStep = (val - this._valueMin()) % step, alignValue = val - valModStep;
                return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step : -step),
                    parseFloat(alignValue.toFixed(5));
            },
            _calculateNewMax: function() {
                var value = this.options.max, start = this._valueMin(), step = this.options.step, end = Math.round((value - start) / step) * step;
                value = end + start, value > this.options.max && (value -= step), this.max = parseFloat(value.toFixed(this._precision()));
            },
            _precision: function() {
                var precision = this._precisionOf(this.options.step);
                return null !== this.options.min && (precision = Math.max(precision, this._precisionOf(this.options.min))),
                    precision;
            },
            _precisionOf: function(num) {
                var str = num.toString(), decimal = str.indexOf(".");
                return decimal === -1 ? 0 : str.length - decimal - 1;
            },
            _valueMin: function() {
                return this.options.min;
            },
            _valueMax: function() {
                return this.max;
            },
            _refreshRange: function(b) {
                "vertical" === b && this.range.css({
                    width: "",
                    left: ""
                }), "horizontal" === b && this.range.css({
                    height: "",
                    bottom: ""
                });
            },
            _refreshValue: function() {
                var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range, o = this.options, that = this, animate = !this._animateOff && o.animate, _set = {};
                this._hasMultipleValues() ? this.handles.each(function(i) {
                        valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100,
                            _set["horizontal" === that.orientation ? "left" : "bottom"] = valPercent + "%",
                            test(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), that.options.range === !0 && ("horizontal" === that.orientation ? (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
                                left: valPercent + "%"
                            }, o.animate), 1 === i && that.range[animate ? "animate" : "css"]({
                                width: valPercent - lastValPercent + "%"
                            }, {
                                queue: !1,
                                duration: o.animate
                            })) : (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
                                bottom: valPercent + "%"
                            }, o.animate), 1 === i && that.range[animate ? "animate" : "css"]({
                                height: valPercent - lastValPercent + "%"
                            }, {
                                queue: !1,
                                duration: o.animate
                            }))), lastValPercent = valPercent;
                    }) : (value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(),
                        valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0,
                        _set["horizontal" === this.orientation ? "left" : "bottom"] = valPercent + "%",
                        this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), "min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        width: valPercent + "%"
                    }, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        width: 100 - valPercent + "%"
                    }, o.animate), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        height: valPercent + "%"
                    }, o.animate), "max" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        height: 100 - valPercent + "%"
                    }, o.animate));
            },
            _handleEvents: {
                keydown: function(event) {
                    var allowed, curVal, newVal, step, index = test(event.target).data("ui-slider-handle-index");
                    switch (event.keyCode) {
                        case test.ui.keyCode.HOME:
                        case test.ui.keyCode.END:
                        case test.ui.keyCode.PAGE_UP:
                        case test.ui.keyCode.PAGE_DOWN:
                        case test.ui.keyCode.UP:
                        case test.ui.keyCode.RIGHT:
                        case test.ui.keyCode.DOWN:
                        case test.ui.keyCode.LEFT:
                            if (event.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(test(event.target), null, "ui-state-active"),
                                    allowed = this._start(event, index), allowed === !1)) return;
                    }
                    switch (step = this.options.step, curVal = newVal = this._hasMultipleValues() ? this.values(index) : this.value(),
                        event.keyCode) {
                        case test.ui.keyCode.HOME:
                            newVal = this._valueMin();
                            break;

                        case test.ui.keyCode.END:
                            newVal = this._valueMax();
                            break;

                        case test.ui.keyCode.PAGE_UP:
                            newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / this.numPages);
                            break;

                        case test.ui.keyCode.PAGE_DOWN:
                            newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / this.numPages);
                            break;

                        case test.ui.keyCode.UP:
                        case test.ui.keyCode.RIGHT:
                            if (curVal === this._valueMax()) return;
                            newVal = this._trimAlignValue(curVal + step);
                            break;

                        case test.ui.keyCode.DOWN:
                        case test.ui.keyCode.LEFT:
                            if (curVal === this._valueMin()) return;
                            newVal = this._trimAlignValue(curVal - step);
                    }
                    this._slide(event, index, newVal);
                },
                keyup: function(event) {
                    var index = test(event.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(event, index), this._change(event, index),
                        this._removeClass(test(event.target), null, "ui-state-active"));
                }
            }
        }), test.widget("ui.sortable", test.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(x, reference, size) {
                return x >= reference && x < reference + size;
            },
            _isFloating: function(item) {
                return /left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"));
            },
            _create: function() {
                this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(),
                    this._mouseInit(), this._setHandleClassName(), this.ready = !0;
            },
            _setOption: function(key, value) {
                this._super(key, value), "handle" === key && this._setHandleClassName();
            },
            _setHandleClassName: function() {
                var self = this;
                this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"),
                    test.each(this.items, function() {
                        self._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
                    });
            },
            _destroy: function() {
                this._mouseDestroy();
                for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
                return this;
            },
            _mouseCapture: function(event, overrideHandle) {
                var currentItem = null, validHandle = !1, that = this;
                return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(event),
                        test(event.target).parents().each(function() {
                            if (test.data(this, that.widgetName + "-item") === that) return currentItem = test(this),
                                !1;
                        }), test.data(event.target, that.widgetName + "-item") === that && (currentItem = test(event.target)),
                    !!currentItem && (!(this.options.handle && !overrideHandle && (test(this.options.handle, currentItem).find("*").addBack().each(function() {
                        this === event.target && (validHandle = !0);
                    }), !validHandle)) && (this.currentItem = currentItem, this._removeCurrentsFromItems(),
                        !0))));
            },
            _mouseStart: function(event, jsEvent, view) {
                var i, body, o = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event),
                        this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(),
                        this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, test.extend(this.offset, {
                        click: {
                            left: event.pageX - this.offset.left,
                            top: event.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"),
                        this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX,
                        this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
                        this.domPosition = {
                            prev: this.currentItem.prev()[0],
                            parent: this.currentItem.parent()[0]
                        }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(),
                    o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (body = this.document.find("body"),
                        this.storedCursor = body.css("cursor"), body.css("cursor", o.cursor), this.storedStylesheet = test("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body)),
                    o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
                        this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
                        this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
                        this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(),
                        !view) for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, this._uiHash(this));
                return test.ui.ddmanager && (test.ui.ddmanager.current = this), test.ui.ddmanager && !o.dropBehaviour && test.ui.ddmanager.prepareOffsets(this, event),
                    this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(event),
                    !0;
            },
            _mouseDrag: function(event) {
                var i, item, itemElement, intersection, o = this.options, scrolled = !1;
                for (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"),
                     this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed),
                        this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (event.pageY - this.document.scrollTop() < o.scrollSensitivity ? scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed) : this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity && (scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed)),
                        event.pageX - this.document.scrollLeft() < o.scrollSensitivity ? scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed) : this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity && (scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed))),
                scrolled !== !1 && test.ui.ddmanager && !o.dropBehaviour && test.ui.ddmanager.prepareOffsets(this, event)),
                         this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
                     this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
                         i = this.items.length - 1; i >= 0; i--) if (item = this.items[i], itemElement = item.item[0],
                        intersection = this._intersectsWithPointer(item), intersection && item.instance === this.currentContainer && !(itemElement === this.currentItem[0] || this.placeholder[1 === intersection ? "next" : "prev"]()[0] === itemElement || test.contains(this.placeholder[0], itemElement) || "semi-dynamic" === this.options.type && test.contains(this.element[0], itemElement))) {
                    if (this.direction = 1 === intersection ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(item)) break;
                    this._rearrange(event, item), this._trigger("change", event, this._uiHash());
                    break;
                }
                return this._contactContainers(event), test.ui.ddmanager && test.ui.ddmanager.drag(this, event),
                    this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs,
                    !1;
            },
            _mouseStop: function(event, noPropagation) {
                if (event) {
                    if (test.ui.ddmanager && !this.options.dropBehaviour && test.ui.ddmanager.drop(this, event),
                            this.options.revert) {
                        var that = this, cur = this.placeholder.offset(), axis = this.options.axis, animation = {};
                        axis && "x" !== axis || (animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                        axis && "y" !== axis || (animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                            this.reverting = !0, test(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function() {
                            that._clear(event);
                        });
                    } else this._clear(event, noPropagation);
                    return !1;
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp(new test.Event("mouseup", {
                        target: null
                    })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS),
                            this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                    for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, this._uiHash(this)),
                        this.containers[i].containerCache.over = 0);
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
                    test.extend(this, {
                        helper: null,
                        dragging: !1,
                        reverting: !1,
                        _noFinalSort: null
                    }), this.domPosition.prev ? test(this.domPosition.prev).after(this.currentItem) : test(this.domPosition.parent).prepend(this.currentItem)),
                    this;
            },
            serialize: function(o) {
                var items = this._getItemsAsjQuery(o && o.connected), str = [];
                return o = o || {}, test(items).each(function() {
                    var res = (test(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
                    res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
                }), !str.length && o.key && str.push(o.key + "="), str.join("&");
            },
            toArray: function(o) {
                var items = this._getItemsAsjQuery(o && o.connected), ret = [];
                return o = o || {}, items.each(function() {
                    ret.push(test(o.item || this).attr(o.attribute || "id") || "");
                }), ret;
            },
            _intersectsWith: function(item) {
                var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElement = "x" === this.options.axis || y1 + dyClick > t && y1 + dyClick < b, isOverElementWidth = "y" === this.options.axis || x1 + dxClick > l && x1 + dxClick < r, d = isOverElement && isOverElementWidth;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"] ? d : l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
            },
            _intersectsWithPointer: function(item) {
                var verticalDirection, ii, node = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), l = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width), p = node && l;
                return !!p && (verticalDirection = this._getDragVerticalDirection(), ii = this._getDragHorizontalDirection(),
                        this.floating ? "right" === ii || "down" === verticalDirection ? 2 : 1 : verticalDirection && ("down" === verticalDirection ? 2 : 1));
            },
            _intersectsWithSides: function(item) {
                var val = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), ret = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), fn = this._getDragVerticalDirection(), event = this._getDragHorizontalDirection();
                return this.floating && event ? "right" === event && ret || "left" === event && !ret : fn && ("down" === fn && val || "up" === fn && !val);
            },
            _getDragVerticalDirection: function() {
                var y = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== y && (y > 0 ? "down" : "up");
            },
            _getDragHorizontalDirection: function() {
                var delta = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== delta && (delta > 0 ? "right" : "left");
            },
            refresh: function(event) {
                return this._refreshItems(event), this._setHandleClassName(), this.refreshPositions(),
                    this;
            },
            _connectWith: function() {
                var options = this.options;
                return options.connectWith.constructor === String ? [ options.connectWith ] : options.connectWith;
            },
            _getItemsAsjQuery: function(connected) {
                function addItems() {
                    items.push(this);
                }
                var i, j, cur, inst, items = [], queries = [], connectWith = this._connectWith();
                if (connectWith && connected) for (i = connectWith.length - 1; i >= 0; i--) for (cur = test(connectWith[i], this.document[0]),
                                                                                                     j = cur.length - 1; j >= 0; j--) inst = test.data(cur[j], this.widgetFullName),
                inst && inst !== this && !inst.options.disabled && queries.push([ test.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : test(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst ]);
                for (queries.push([ test.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : test(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]),
                         i = queries.length - 1; i >= 0; i--) queries[i][0].each(addItems);
                return test(items);
            },
            _removeCurrentsFromItems: function() {
                var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = test.grep(this.items, function(item) {
                    for (var j = 0; j < list.length; j++) if (list[j] === item.item[0]) return !1;
                    return !0;
                });
            },
            _refreshItems: function(event) {
                this.items = [], this.containers = [ this ];
                var i, j, cur, inst, targetData, _queries, item, queriesLength, items = this.items, queries = [ [ test.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                        item: this.currentItem
                    }) : test(this.options.items, this.element), this ] ], connectWith = this._connectWith();
                if (connectWith && this.ready) for (i = connectWith.length - 1; i >= 0; i--) for (cur = test(connectWith[i], this.document[0]),
                                                                                                      j = cur.length - 1; j >= 0; j--) inst = test.data(cur[j], this.widgetFullName),
                inst && inst !== this && !inst.options.disabled && (queries.push([ test.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                        item: this.currentItem
                    }) : test(inst.options.items, inst.element), inst ]), this.containers.push(inst));
                for (i = queries.length - 1; i >= 0; i--) for (targetData = queries[i][1], _queries = queries[i][0],
                                                                   j = 0, queriesLength = _queries.length; j < queriesLength; j++) item = test(_queries[j]),
                    item.data(this.widgetName + "-item", targetData), items.push({
                    item: item,
                    instance: targetData,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                });
            },
            refreshPositions: function(fast) {
                this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)),
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, item, t, p;
                for (i = this.items.length - 1; i >= 0; i--) item = this.items[i], item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0] || (t = this.options.toleranceElement ? test(this.options.toleranceElement, item.item) : item.item,
                fast || (item.width = t.outerWidth(), item.height = t.outerHeight()), p = t.offset(),
                    item.left = p.left, item.top = p.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) p = this.containers[i].element.offset(),
                    this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top,
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this;
            },
            _createPlaceholder: function(that) {
                that = that || this;
                var className, o = that.options;
                o.placeholder && o.placeholder.constructor !== String || (className = o.placeholder,
                    o.placeholder = {
                        element: function() {
                            var nodeName = that.currentItem[0].nodeName.toLowerCase(), elem = test("<" + nodeName + ">", that.document[0]);
                            return that._addClass(elem, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(elem, "ui-sortable-helper"),
                                "tbody" === nodeName ? that._createTrPlaceholder(that.currentItem.find("tr").eq(0), test("<tr>", that.document[0]).appendTo(elem)) : "tr" === nodeName ? that._createTrPlaceholder(that.currentItem, elem) : "img" === nodeName && elem.attr("src", that.currentItem.attr("src")),
                            className || elem.css("visibility", "hidden"), elem;
                        },
                        update: function(p, c) {
                            className && !o.forcePlaceholderSize || (c.height() || c.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10)),
                            c.width() || c.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10)));
                        }
                    }), that.placeholder = test(o.placeholder.element.call(that.element, that.currentItem)),
                    that.currentItem.after(that.placeholder), o.placeholder.update(that, that.placeholder);
            },
            _createTrPlaceholder: function(d, q) {
                var that = this;
                d.children().each(function() {
                    test("<td>&#160;</td>", that.document[0]).attr("colspan", test(this).attr("colspan") || 1).appendTo(q);
                });
            },
            _contactContainers: function(event) {
                var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis, innermostContainer = null, innermostIndex = null;
                for (i = this.containers.length - 1; i >= 0; i--) if (!test.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
                    if (innermostContainer && test.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
                    innermostContainer = this.containers[i], innermostIndex = i;
                } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)),
                    this.containers[i].containerCache.over = 0);
                if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex].containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)),
                    this.containers[innermostIndex].containerCache.over = 1); else {
                    for (dist = 1e4, itemWithLeastDistance = null, floating = innermostContainer.floating || this._isFloating(this.currentItem),
                             posProperty = floating ? "left" : "top", sizeProperty = floating ? "width" : "height",
                             axis = floating ? "pageX" : "pageY", j = this.items.length - 1; j >= 0; j--) test.contains(this.containers[innermostIndex].element[0], this.items[j].item[0]) && this.items[j].item[0] !== this.currentItem[0] && (cur = this.items[j].item.offset()[posProperty],
                        nearBottom = !1, event[axis] - cur > this.items[j][sizeProperty] / 2 && (nearBottom = !0),
                    Math.abs(event[axis] - cur) < dist && (dist = Math.abs(event[axis] - cur), itemWithLeastDistance = this.items[j],
                        this.direction = nearBottom ? "up" : "down"));
                    if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[innermostIndex]) return void (this.currentContainer.containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash()),
                        this.currentContainer.containerCache.over = 1));
                    itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) : this._rearrange(event, null, this.containers[innermostIndex].element, !0),
                        this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)),
                        this.currentContainer = this.containers[innermostIndex], this.options.placeholder.update(this.currentContainer, this.placeholder),
                        this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1;
                }
            },
            _createHelper: function(event) {
                var o = this.options, helper = test.isFunction(o.helper) ? test(o.helper.apply(this.element[0], [ event, this.currentItem ])) : "clone" === o.helper ? this.currentItem.clone() : this.currentItem;
                return helper.parents("body").length || test("parent" !== o.appendTo ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]),
                helper[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), helper[0].style.width && !o.forceHelperSize || helper.width(this.currentItem.width()),
                helper[0].style.height && !o.forceHelperSize || helper.height(this.currentItem.height()),
                    helper;
            },
            _adjustOffsetFromHelper: function(obj) {
                "string" == typeof obj && (obj = obj.split(" ")), test.isArray(obj) && (obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left),
                "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var po = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && test.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(),
                    po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && test.ui.ie) && (po = {
                    top: 0,
                    left: 0
                }), {
                    top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                };
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var p = this.currentItem.position();
                    return {
                        top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    };
                }
                return {
                    top: 0,
                    left: 0
                };
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                };
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                };
            },
            _setContainment: function() {
                var ce, co, over, o = this.options;
                "parent" === o.containment && (o.containment = this.helper[0].parentNode), "document" !== o.containment && "window" !== o.containment || (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === o.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === o.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]),
                /^(document|window|parent)$/.test(o.containment) || (ce = test(o.containment)[0],
                    co = test(o.containment).offset(), over = "hidden" !== test(ce).css("overflow"),
                    this.containment = [ co.left + (parseInt(test(ce).css("borderLeftWidth"), 10) || 0) + (parseInt(test(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt(test(ce).css("borderTopWidth"), 10) || 0) + (parseInt(test(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(test(ce).css("borderLeftWidth"), 10) || 0) - (parseInt(test(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(test(ce).css("borderTopWidth"), 10) || 0) - (parseInt(test(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
            },
            _convertPositionTo: function(d, pos) {
                pos || (pos = this.position);
                var mod = "absolute" === d ? 1 : -1, scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && test.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
                return {
                    top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
                    left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
                };
            },
            _generatePosition: function(event) {
                var top, left, o = this.options, pageX = event.pageX, pageY = event.pageY, scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && test.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
                this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left),
                event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top),
                event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left),
                event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)),
                o.grid && (top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1],
                    pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top,
                    left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0],
                    pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left)),
                    {
                        top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
                        left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
                    };
            },
            _rearrange: function(event, i, a, hardRefresh) {
                a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? i.item[0] : i.item[0].nextSibling),
                    this.counter = this.counter ? ++this.counter : 1;
                var counter = this.counter;
                this._delay(function() {
                    counter === this.counter && this.refreshPositions(!hardRefresh);
                });
            },
            _clear: function(event, noPropagation) {
                function delayEvent(type, instance, container) {
                    return function(event) {
                        container._trigger(type, event, instance._uiHash(instance));
                    };
                }
                this.reverting = !1;
                var i, delayedTriggers = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
                        this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS) "auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
                    this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
                } else this.currentItem.show();
                for (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
                    this._trigger("receive", event, this._uiHash(this.fromOutside));
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
                    this._trigger("update", event, this._uiHash());
                }), this !== this.currentContainer && (noPropagation || (delayedTriggers.push(function(event) {
                    this._trigger("remove", event, this._uiHash());
                }), delayedTriggers.push(function(c) {
                    return function(event) {
                        c._trigger("receive", event, this._uiHash(this));
                    };
                }.call(this, this.currentContainer)), delayedTriggers.push(function(c) {
                    return function(event) {
                        c._trigger("update", event, this._uiHash(this));
                    };
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(delayEvent("deactivate", this, this.containers[i])),
                this.containers[i].containerCache.over && (delayedTriggers.push(delayEvent("out", this, this.containers[i])),
                    this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
                        this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
                    this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
                        this.dragging = !1, noPropagation || this._trigger("beforeStop", event, this._uiHash()),
                        this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
                        this.helper = null), !noPropagation) {
                    for (i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
                    this._trigger("stop", event, this._uiHash());
                }
                return this.fromOutside = !1, !this.cancelHelperRemoval;
            },
            _trigger: function() {
                test.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
            },
            _uiHash: function(inst) {
                var self = inst || this;
                return {
                    helper: self.helper,
                    placeholder: self.placeholder || test([]),
                    position: self.position,
                    originalPosition: self.originalPosition,
                    offset: self.positionAbs,
                    item: self.currentItem,
                    sender: inst ? inst.element : null
                };
            }
        });
        test.widget("ui.spinner", {
            version: "1.12.1",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                classes: {
                    "ui-spinner": "ui-corner-all",
                    "ui-spinner-down": "ui-corner-br",
                    "ui-spinner-up": "ui-corner-tr"
                },
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min),
                    this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0),
                    this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete");
                    }
                });
            },
            _getCreateOptions: function() {
                var options = this._super(), element = this.element;
                return test.each([ "min", "max", "step" ], function(i, attr) {
                    var val = element.attr(attr);
                    null != val && val.length && (options[attr] = val);
                }), options;
            },
            _events: {
                keydown: function(event) {
                    this._start(event) && this._keydown(event) && event.preventDefault();
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val();
                },
                blur: function(event) {
                    return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(),
                            void (this.previous !== this.element.val() && this._trigger("change", event)));
                },
                mousewheel: function(event, delta) {
                    if (delta) {
                        if (!this.spinning && !this._start(event)) return !1;
                        this._spin((delta > 0 ? 1 : -1) * this.options.step, event), clearTimeout(this.mousewheelTimer),
                            this.mousewheelTimer = this._delay(function() {
                                this.spinning && this._stop(event);
                            }, 100), event.preventDefault();
                    }
                },
                "mousedown .ui-spinner-button": function(event) {
                    function checkFocus() {
                        var isActive = this.element[0] === test.ui.safeActiveElement(this.document[0]);
                        isActive || (this.element.trigger("focus"), this.previous = previous, this._delay(function() {
                            this.previous = previous;
                        }));
                    }
                    var previous;
                    previous = this.element[0] === test.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(),
                        event.preventDefault(), checkFocus.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur, checkFocus.call(this);
                    }), this._start(event) !== !1 && this._repeat(null, test(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event);
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(event) {
                    if (test(event.currentTarget).hasClass("ui-state-active")) return this._start(event) !== !1 && void this._repeat(null, test(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event);
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>");
            },
            _draw: function() {
                this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"),
                    this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                    classes: {
                        "ui-button": ""
                    }
                }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"),
                    this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({
                    icon: this.options.icons.up,
                    showLabel: !1
                }), this.buttons.last().button({
                    icon: this.options.icons.down,
                    showLabel: !1
                }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height());
            },
            _keydown: function(event) {
                var options = this.options, keyCode = test.ui.keyCode;
                switch (event.keyCode) {
                    case keyCode.UP:
                        return this._repeat(null, 1, event), !0;

                    case keyCode.DOWN:
                        return this._repeat(null, -1, event), !0;

                    case keyCode.PAGE_UP:
                        return this._repeat(null, options.page, event), !0;

                    case keyCode.PAGE_DOWN:
                        return this._repeat(null, -options.page, event), !0;
                }
                return !1;
            },
            _start: function(event) {
                return !(!this.spinning && this._trigger("start", event) === !1) && (this.counter || (this.counter = 1),
                        this.spinning = !0, !0);
            },
            _repeat: function(i, steps, event) {
                i = i || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                    this._repeat(40, steps, event);
                }, i), this._spin(steps * this.options.step, event);
            },
            _spin: function(step, event) {
                var value = this.value() || 0;
                this.counter || (this.counter = 1), value = this._adjustValue(value + step * this._increment(this.counter)),
                this.spinning && this._trigger("spin", event, {
                    value: value
                }) === !1 || (this._value(value), this.counter++);
            },
            _increment: function(i) {
                var incremental = this.options.incremental;
                return incremental ? test.isFunction(incremental) ? incremental(i) : Math.floor(i * i * i / 5e4 - i * i / 500 + 17 * i / 200 + 1) : 1;
            },
            _precision: function() {
                var precision = this._precisionOf(this.options.step);
                return null !== this.options.min && (precision = Math.max(precision, this._precisionOf(this.options.min))),
                    precision;
            },
            _precisionOf: function(num) {
                var str = num.toString(), decimal = str.indexOf(".");
                return decimal === -1 ? 0 : str.length - decimal - 1;
            },
            _adjustValue: function(val) {
                var min, i, o = this.options;
                return min = null !== o.min ? o.min : 0, i = val - min, i = Math.round(i / o.step) * o.step,
                    val = min + i, val = parseFloat(val.toFixed(this._precision())), null !== o.max && val > o.max ? o.max : null !== o.min && val < o.min ? o.min : val;
            },
            _stop: function(event) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer),
                    this.counter = 0, this.spinning = !1, this._trigger("stop", event));
            },
            _setOption: function(key, value) {
                var prevValue, element, elem;
                return "culture" === key || "numberFormat" === key ? (prevValue = this._parse(this.element.val()),
                        this.options[key] = value, void this.element.val(this._format(prevValue))) : ("max" !== key && "min" !== key && "step" !== key || "string" == typeof value && (value = this._parse(value)),
                    "icons" === key && (element = this.buttons.first().find(".ui-icon"), this._removeClass(element, null, this.options.icons.up),
                        this._addClass(element, null, value.up), elem = this.buttons.last().find(".ui-icon"),
                        this._removeClass(elem, null, this.options.icons.down), this._addClass(elem, null, value.down)),
                        void this._super(key, value));
            },
            _setOptionDisabled: function(value) {
                this._super(value), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!value),
                    this.element.prop("disabled", !!value), this.buttons.button(value ? "disable" : "enable");
            },
            _setOptions: modifier(function(options) {
                this._super(options);
            }),
            _parse: function(val) {
                return "string" == typeof val && "" !== val && (val = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(val, 10, this.options.culture) : +val),
                    "" === val || isNaN(val) ? null : val;
            },
            _format: function(value) {
                return "" === value ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(value, this.options.numberFormat, this.options.culture) : value;
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                });
            },
            isValid: function() {
                var value = this.value();
                return null !== value && value === this._adjustValue(value);
            },
            _value: function(value, allowAny) {
                var parsed;
                "" !== value && (parsed = this._parse(value), null !== parsed && (allowAny || (parsed = this._adjustValue(parsed)),
                    value = this._format(parsed))), this.element.val(value), this._refresh();
            },
            _destroy: function() {
                this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),
                    this.uiSpinner.replaceWith(this.element);
            },
            stepUp: modifier(function(steps) {
                this._stepUp(steps);
            }),
            _stepUp: function(steps) {
                this._start() && (this._spin((steps || 1) * this.options.step), this._stop());
            },
            stepDown: modifier(function(steps) {
                this._stepDown(steps);
            }),
            _stepDown: function(steps) {
                this._start() && (this._spin((steps || 1) * -this.options.step), this._stop());
            },
            pageUp: modifier(function(pages) {
                this._stepUp((pages || 1) * this.options.page);
            }),
            pageDown: modifier(function(pages) {
                this._stepDown((pages || 1) * this.options.page);
            }),
            value: function(newVal) {
                return arguments.length ? void modifier(this._value).call(this, newVal) : this._parse(this.element.val());
            },
            widget: function() {
                return this.uiSpinner;
            }
        }), test.uiBackCompat !== !1 && test.widget("ui.spinner", test.ui.spinner, {
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            },
            _uiSpinnerHtml: function() {
                return "<span>";
            },
            _buttonHtml: function() {
                return "<a></a><a></a>";
            }
        });
        test.ui.spinner;
        test.widget("ui.tabs", {
            version: "1.12.1",
            delay: 300,
            options: {
                active: null,
                classes: {
                    "ui-tabs": "ui-corner-all",
                    "ui-tabs-nav": "ui-corner-all",
                    "ui-tabs-panel": "ui-corner-bottom",
                    "ui-tabs-tab": "ui-corner-top"
                },
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function() {
                var rhash = /#.*$/;
                return function(anchor) {
                    var anchorUrl, locationUrl;
                    anchorUrl = anchor.href.replace(rhash, ""), locationUrl = location.href.replace(rhash, "");
                    try {
                        anchorUrl = decodeURIComponent(anchorUrl);
                    } catch (s) {}
                    try {
                        locationUrl = decodeURIComponent(locationUrl);
                    } catch (s) {}
                    return anchor.hash.length > 1 && anchorUrl === locationUrl;
                };
            }(),
            _create: function() {
                var that = this, options = this.options;
                this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, options.collapsible),
                    this._processTabs(), options.active = this._initialActive(), test.isArray(options.disabled) && (options.disabled = test.unique(options.disabled.concat(test.map(this.tabs.filter(".ui-state-disabled"), function(li) {
                    return that.tabs.index(li);
                }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(options.active) : this.active = test(),
                    this._refresh(), this.active.length && this.load(options.active);
            },
            _initialActive: function() {
                var active = this.options.active, collapsible = this.options.collapsible, locationHash = location.hash.substring(1);
                return null === active && (locationHash && this.tabs.each(function(i, el) {
                    if (test(el).attr("aria-controls") === locationHash) return active = i, !1;
                }), null === active && (active = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
                null !== active && active !== -1 || (active = !!this.tabs.length && 0)), active !== !1 && (active = this.tabs.index(this.tabs.eq(active)),
                active === -1 && (active = !collapsible && 0)), !collapsible && active === !1 && this.anchors.length && (active = 0),
                    active;
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : test()
                };
            },
            _tabKeydown: function(event) {
                var focusedTab = test(test.ui.safeActiveElement(this.document[0])).closest("li"), selectedIndex = this.tabs.index(focusedTab), goingForward = !0;
                if (!this._handlePageNav(event)) {
                    switch (event.keyCode) {
                        case test.ui.keyCode.RIGHT:
                        case test.ui.keyCode.DOWN:
                            selectedIndex++;
                            break;

                        case test.ui.keyCode.UP:
                        case test.ui.keyCode.LEFT:
                            goingForward = !1, selectedIndex--;
                            break;

                        case test.ui.keyCode.END:
                            selectedIndex = this.anchors.length - 1;
                            break;

                        case test.ui.keyCode.HOME:
                            selectedIndex = 0;
                            break;

                        case test.ui.keyCode.SPACE:
                            return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex);

                        case test.ui.keyCode.ENTER:
                            return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex !== this.options.active && selectedIndex);

                        default:
                            return;
                    }
                    event.preventDefault(), clearTimeout(this.activating), selectedIndex = this._focusNextTab(selectedIndex, goingForward),
                    event.ctrlKey || event.metaKey || (focusedTab.attr("aria-selected", "false"), this.tabs.eq(selectedIndex).attr("aria-selected", "true"),
                        this.activating = this._delay(function() {
                            this.option("active", selectedIndex);
                        }, this.delay));
                }
            },
            _panelKeydown: function(event) {
                this._handlePageNav(event) || event.ctrlKey && event.keyCode === test.ui.keyCode.UP && (event.preventDefault(),
                    this.active.trigger("focus"));
            },
            _handlePageNav: function(event) {
                return event.altKey && event.keyCode === test.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
                        !0) : event.altKey && event.keyCode === test.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
                            !0) : void 0;
            },
            _findNextTab: function(index, goingForward) {
                function constrain() {
                    return index > lastTabIndex && (index = 0), index < 0 && (index = lastTabIndex),
                        index;
                }
                for (var lastTabIndex = this.tabs.length - 1; test.inArray(constrain(), this.options.disabled) !== -1; ) index = goingForward ? index + 1 : index - 1;
                return index;
            },
            _focusNextTab: function(index, goingForward) {
                return index = this._findNextTab(index, goingForward), this.tabs.eq(index).trigger("focus"),
                    index;
            },
            _setOption: function(key, value) {
                return "active" === key ? void this._activate(value) : (this._super(key, value),
                    "collapsible" === key && (this._toggleClass("ui-tabs-collapsible", null, value),
                    value || this.options.active !== !1 || this._activate(0)), "event" === key && this._setupEvents(value),
                        void ("heightStyle" === key && this._setupHeightStyle(value)));
            },
            _sanitizeSelector: function(hash) {
                return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
            },
            refresh: function() {
                var options = this.options, lis = this.tablist.children(":has(a[href])");
                options.disabled = test.map(lis.filter(".ui-state-disabled"), function(tab) {
                    return lis.index(tab);
                }), this._processTabs(), options.active !== !1 && this.anchors.length ? this.active.length && !test.contains(this.tablist[0], this.active[0]) ? this.tabs.length === options.disabled.length ? (options.active = !1,
                                this.active = test()) : this._activate(this._findNextTab(Math.max(0, options.active - 1), !1)) : options.active = this.tabs.index(this.active) : (options.active = !1,
                        this.active = test()), this._refresh();
            },
            _refresh: function() {
                this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event),
                    this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                        "aria-hidden": "false"
                    })) : this.tabs.eq(0).attr("tabIndex", 0);
            },
            _processTabs: function() {
                var that = this, items = this.tabs, q = this.anchors, value = this.panels;
                this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"),
                    this.tablist.on("mousedown" + this.eventNamespace, "> li", function(e) {
                        test(this).is(".ui-state-disabled") && e.preventDefault();
                    }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                        test(this).closest("li").is(".ui-state-disabled") && this.blur();
                    }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
                    role: "tab",
                    tabIndex: -1
                }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
                    return test("a", this)[0];
                }).attr({
                    role: "presentation",
                    tabIndex: -1
                }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = test(), this.anchors.each(function(i, anchor) {
                    var selector, panel, panelId, anchorId = test(anchor).uniqueId().attr("id"), tab = test(anchor).closest("li"), originalAriaControls = tab.attr("aria-controls");
                    that._isLocal(anchor) ? (selector = anchor.hash, panelId = selector.substring(1),
                            panel = that.element.find(that._sanitizeSelector(selector))) : (panelId = tab.attr("aria-controls") || test({}).uniqueId()[0].id,
                            selector = "#" + panelId, panel = that.element.find(selector), panel.length || (panel = that._createPanel(panelId),
                            panel.insertAfter(that.panels[i - 1] || that.tablist)), panel.attr("aria-live", "polite")),
                    panel.length && (that.panels = that.panels.add(panel)), originalAriaControls && tab.data("ui-tabs-aria-controls", originalAriaControls),
                        tab.attr({
                            "aria-controls": panelId,
                            "aria-labelledby": anchorId
                        }), panel.attr("aria-labelledby", anchorId);
                }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
                items && (this._off(items.not(this.tabs)), this._off(q.not(this.anchors)), this._off(value.not(this.panels)));
            },
            _getList: function() {
                return this.tablist || this.element.find("ol, ul").eq(0);
            },
            _createPanel: function(id) {
                return test("<div>").attr("id", id).data("ui-tabs-destroy", !0);
            },
            _setOptionDisabled: function(val) {
                var element, li, id;
                for (test.isArray(val) && (val.length ? val.length === this.anchors.length && (val = !0) : val = !1),
                         id = 0; li = this.tabs[id]; id++) element = test(li), val === !0 || test.inArray(id, val) !== -1 ? (element.attr("aria-disabled", "true"),
                        this._addClass(element, null, "ui-state-disabled")) : (element.removeAttr("aria-disabled"),
                        this._removeClass(element, null, "ui-state-disabled"));
                this.options.disabled = val, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, val === !0);
            },
            _setupEvents: function(classes) {
                var events = {};
                classes && test.each(classes.split(" "), function(index, eventName) {
                    events[eventName] = "_eventHandler";
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function(e) {
                        e.preventDefault();
                    }
                }), this._on(this.anchors, events), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs);
            },
            _setupHeightStyle: function(heightStyle) {
                var maxHeight, parent = this.element.parent();
                "fill" === heightStyle ? (maxHeight = parent.height(), maxHeight -= this.element.outerHeight() - this.element.height(),
                        this.element.siblings(":visible").each(function() {
                            var elem = test(this), position = elem.css("position");
                            "absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0));
                        }), this.element.children().not(this.panels).each(function() {
                        maxHeight -= test(this).outerHeight(!0);
                    }), this.panels.each(function() {
                        test(this).height(Math.max(0, maxHeight - test(this).innerHeight() + test(this).height()));
                    }).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0, this.panels.each(function() {
                        maxHeight = Math.max(maxHeight, test(this).height("").height());
                    }).height(maxHeight));
            },
            _eventHandler: function(event) {
                var options = this.options, active = this.active, anchor = test(event.currentTarget), tab = anchor.closest("li"), clickedIsActive = tab[0] === active[0], collapsing = clickedIsActive && options.collapsible, toShow = collapsing ? test() : this._getPanelForTab(tab), toHide = active.length ? this._getPanelForTab(active) : test(), eventData = {
                    oldTab: active,
                    oldPanel: toHide,
                    newTab: collapsing ? test() : tab,
                    newPanel: toShow
                };
                event.preventDefault(), tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || clickedIsActive && !options.collapsible || this._trigger("beforeActivate", event, eventData) === !1 || (options.active = !collapsing && this.tabs.index(tab),
                    this.active = clickedIsActive ? test() : tab, this.xhr && this.xhr.abort(), toHide.length || toShow.length || test.error("jQuery UI Tabs: Mismatching fragment identifier."),
                toShow.length && this.load(this.tabs.index(tab), event), this._toggle(event, eventData));
            },
            _toggle: function(event, eventData) {
                function complete() {
                    that.running = !1, that._trigger("activate", event, eventData);
                }
                function show() {
                    that._addClass(eventData.newTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                        toShow.length && that.options.show ? that._show(toShow, that.options.show, complete) : (toShow.show(),
                                complete());
                }
                var that = this, toShow = eventData.newPanel, toHide = eventData.oldPanel;
                this.running = !0, toHide.length && this.options.hide ? this._hide(toHide, this.options.hide, function() {
                        that._removeClass(eventData.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                            show();
                    }) : (this._removeClass(eventData.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                        toHide.hide(), show()), toHide.attr("aria-hidden", "true"), eventData.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), toShow.length && toHide.length ? eventData.oldTab.attr("tabIndex", -1) : toShow.length && this.tabs.filter(function() {
                        return 0 === test(this).attr("tabIndex");
                    }).attr("tabIndex", -1), toShow.attr("aria-hidden", "false"), eventData.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                });
            },
            _activate: function(index) {
                var anchor, active = this._findActive(index);
                active[0] !== this.active[0] && (active.length || (active = this.active), anchor = active.find(".ui-tabs-anchor")[0],
                    this._eventHandler({
                        target: anchor,
                        currentTarget: anchor,
                        preventDefault: test.noop
                    }));
            },
            _findActive: function(index) {
                return index === !1 ? test() : this.tabs.eq(index);
            },
            _getIndex: function(index) {
                return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + test.ui.escapeSelector(index) + "']"))),
                    index;
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace),
                    this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    test.data(this, "ui-tabs-destroy") ? test(this).remove() : test(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
                }), this.tabs.each(function() {
                    var li = test(this), prev = li.data("ui-tabs-aria-controls");
                    prev ? li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls") : li.removeAttr("aria-controls");
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
            },
            enable: function(index) {
                var val = this.options.disabled;
                val !== !1 && (void 0 === index ? val = !1 : (index = this._getIndex(index), val = test.isArray(val) ? test.map(val, function(num) {
                            return num !== index ? num : null;
                        }) : test.map(this.tabs, function(li, num) {
                            return num !== index ? num : null;
                        })), this._setOptionDisabled(val));
            },
            disable: function(index) {
                var val = this.options.disabled;
                if (val !== !0) {
                    if (void 0 === index) val = !0; else {
                        if (index = this._getIndex(index), test.inArray(index, val) !== -1) return;
                        val = test.isArray(val) ? test.merge([ index ], val).sort() : [ index ];
                    }
                    this._setOptionDisabled(val);
                }
            },
            load: function(index, event) {
                index = this._getIndex(index);
                var that = this, tab = this.tabs.eq(index), anchor = tab.find(".ui-tabs-anchor"), panel = this._getPanelForTab(tab), eventData = {
                    tab: tab,
                    panel: panel
                }, cb = function(jqXHR, status) {
                    "abort" === status && that.panels.stop(!1, !0), that._removeClass(tab, "ui-tabs-loading"),
                        panel.removeAttr("aria-busy"), jqXHR === that.xhr && delete that.xhr;
                };
                this._isLocal(anchor[0]) || (this.xhr = test.ajax(this._ajaxSettings(anchor, event, eventData)),
                this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(tab, "ui-tabs-loading"),
                    panel.attr("aria-busy", "true"), this.xhr.done(function(data, status, xhr) {
                    setTimeout(function() {
                        panel.html(data), that._trigger("load", event, eventData), cb(xhr, status);
                    }, 1);
                }).fail(function(error, reply) {
                    setTimeout(function() {
                        cb(error, reply);
                    }, 1);
                })));
            },
            _ajaxSettings: function(anchor, event, eventData) {
                var that = this;
                return {
                    url: anchor.attr("href").replace(/#.*$/, ""),
                    beforeSend: function(jqXHR, settings) {
                        return that._trigger("beforeLoad", event, test.extend({
                            jqXHR: jqXHR,
                            ajaxSettings: settings
                        }, eventData));
                    }
                };
            },
            _getPanelForTab: function(tab) {
                var id = test(tab).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + id));
            }
        }), test.uiBackCompat !== !1 && test.widget("ui.tabs", test.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
            }
        });
        test.ui.tabs;
        test.widget("ui.tooltip", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-tooltip": "ui-corner-all ui-widget-shadow"
                },
                content: function() {
                    var title = test(this).attr("title") || "";
                    return test("<a>").text(title).html();
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function(elem, id) {
                var describedby = (elem.attr("aria-describedby") || "").split(/\s+/);
                describedby.push(id), elem.data("ui-tooltip-id", id).attr("aria-describedby", test.trim(describedby.join(" ")));
            },
            _removeDescribedBy: function(elem) {
                var id = elem.data("ui-tooltip-id"), describedby = (elem.attr("aria-describedby") || "").split(/\s+/), index = test.inArray(id, describedby);
                index !== -1 && describedby.splice(index, 1), elem.removeData("ui-tooltip-id"),
                    describedby = test.trim(describedby.join(" ")), describedby ? elem.attr("aria-describedby", describedby) : elem.removeAttr("aria-describedby");
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.liveRegion = test("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                    this.disabledTitles = test([]);
            },
            _setOption: function(key, value) {
                var that = this;
                this._super(key, value), "content" === key && test.each(this.tooltips, function(id, element) {
                    that._updateContent(element.element);
                });
            },
            _setOptionDisabled: function(newIndicator) {
                this[newIndicator ? "_disable" : "_enable"]();
            },
            _disable: function() {
                var that = this;
                test.each(this.tooltips, function(id, component) {
                    var event = test.Event("blur");
                    event.target = event.currentTarget = component.element[0], that.close(event, !0);
                }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                    var element = test(this);
                    if (element.is("[title]")) return element.data("ui-tooltip-title", element.attr("title")).removeAttr("title");
                }));
            },
            _enable: function() {
                this.disabledTitles.each(function() {
                    var element = test(this);
                    element.data("ui-tooltip-title") && element.attr("title", element.data("ui-tooltip-title"));
                }), this.disabledTitles = test([]);
            },
            open: function(event) {
                var that = this, target = test(event ? event.target : this.element).closest(this.options.items);
                target.length && !target.data("ui-tooltip-id") && (target.attr("title") && target.data("ui-tooltip-title", target.attr("title")),
                    target.data("ui-tooltip-open", !0), event && "mouseover" === event.type && target.parents().each(function() {
                    var blurEvent, parent = test(this);
                    parent.data("ui-tooltip-open") && (blurEvent = test.Event("blur"), blurEvent.target = blurEvent.currentTarget = this,
                        that.close(blurEvent, !0)), parent.attr("title") && (parent.uniqueId(), that.parents[this.id] = {
                        element: this,
                        title: parent.attr("title")
                    }, parent.attr("title", ""));
                }), this._registerCloseHandlers(event, target), this._updateContent(target, event));
            },
            _updateContent: function(obj, event) {
                var data, callback = this.options.content, that = this, type = event ? event.type : null;
                return "string" == typeof callback || callback.nodeType || callback.jquery ? this._open(event, obj, callback) : (data = callback.call(obj[0], function(err) {
                        that._delay(function() {
                            obj.data("ui-tooltip-open") && (event && (event.type = type), this._open(event, obj, err));
                        });
                    }), void (data && this._open(event, obj, data)));
            },
            _open: function(event, target, content) {
                function position(index) {
                    options.of = index, tooltip.is(":hidden") || tooltip.position(options);
                }
                var me, tooltip, button, element, options = test.extend({}, this.options.position);
                if (content) {
                    if (me = this._find(target)) return void me.tooltip.find(".ui-tooltip-content").html(content);
                    target.is("[title]") && (event && "mouseover" === event.type ? target.attr("title", "") : target.removeAttr("title")),
                        me = this._tooltip(target), tooltip = me.tooltip, this._addDescribedBy(target, tooltip.attr("id")),
                        tooltip.find(".ui-tooltip-content").html(content), this.liveRegion.children().hide(),
                        element = test("<div>").html(tooltip.find(".ui-tooltip-content").html()), element.removeAttr("name").find("[name]").removeAttr("name"),
                        element.removeAttr("id").find("[id]").removeAttr("id"), element.appendTo(this.liveRegion),
                        this.options.track && event && /^mouse/.test(event.type) ? (this._on(this.document, {
                                mousemove: position
                            }), position(event)) : tooltip.position(test.extend({
                                of: target
                            }, this.options.position)), tooltip.hide(), this._show(tooltip, this.options.show),
                    this.options.track && this.options.show && this.options.show.delay && (button = this.delayedShow = setInterval(function() {
                        tooltip.is(":visible") && (position(options.of), clearInterval(button));
                    }, test.fx.interval)), this._trigger("open", event, {
                        tooltip: tooltip
                    });
                }
            },
            _registerCloseHandlers: function(event, target) {
                var events = {
                    keyup: function(event) {
                        if (event.keyCode === test.ui.keyCode.ESCAPE) {
                            var fakeEvent = test.Event(event);
                            fakeEvent.currentTarget = target[0], this.close(fakeEvent, !0);
                        }
                    }
                };
                target[0] !== this.element[0] && (events.remove = function() {
                    this._removeTooltip(this._find(target).tooltip);
                }), event && "mouseover" !== event.type || (events.mouseleave = "close"), event && "focusin" !== event.type || (events.focusout = "close"),
                    this._on(!0, target, events);
            },
            close: function(event) {
                var tooltip, that = this, target = test(event ? event.currentTarget : this.element), c = this._find(target);
                return c ? (tooltip = c.tooltip, void (c.closing || (clearInterval(this.delayedShow),
                    target.data("ui-tooltip-title") && !target.attr("title") && target.attr("title", target.data("ui-tooltip-title")),
                        this._removeDescribedBy(target), c.hiding = !0, tooltip.stop(!0), this._hide(tooltip, this.options.hide, function() {
                        that._removeTooltip(test(this));
                    }), target.removeData("ui-tooltip-open"), this._off(target, "mouseleave focusout keyup"),
                    target[0] !== this.element[0] && this._off(target, "remove"), this._off(this.document, "mousemove"),
                    event && "mouseleave" === event.type && test.each(this.parents, function(id, parent) {
                        test(parent.element).attr("title", parent.title), delete that.parents[id];
                    }), c.closing = !0, this._trigger("close", event, {
                        tooltip: tooltip
                    }), c.hiding || (c.closing = !1)))) : void target.removeData("ui-tooltip-open");
            },
            _tooltip: function(s) {
                var r = test("<div>").attr("role", "tooltip"), n = test("<div>").appendTo(r), id = r.uniqueId().attr("id");
                return this._addClass(n, "ui-tooltip-content"), this._addClass(r, "ui-tooltip", "ui-widget ui-widget-content"),
                    r.appendTo(this._appendTo(s)), this.tooltips[id] = {
                    element: s,
                    tooltip: r
                };
            },
            _find: function(target) {
                var id = target.data("ui-tooltip-id");
                return id ? this.tooltips[id] : null;
            },
            _removeTooltip: function(tooltip) {
                tooltip.remove(), delete this.tooltips[tooltip.attr("id")];
            },
            _appendTo: function($element) {
                var body = $element.closest(".ui-front, dialog");
                return body.length || (body = this.document[0].body), body;
            },
            _destroy: function() {
                var that = this;
                test.each(this.tooltips, function(id, element) {
                    var event = test.Event("blur"), input = element.element;
                    event.target = event.currentTarget = input[0], that.close(event, !0), test("#" + id).remove(),
                    input.data("ui-tooltip-title") && (input.attr("title") || input.attr("title", input.data("ui-tooltip-title")),
                        input.removeData("ui-tooltip-title"));
                }), this.liveRegion.remove();
            }
        }), test.uiBackCompat !== !1 && test.widget("ui.tooltip", test.ui.tooltip, {
            options: {
                tooltipClass: null
            },
            _tooltip: function() {
                var ui = this._superApply(arguments);
                return this.options.tooltipClass && ui.tooltip.addClass(this.options.tooltipClass),
                    ui;
            }
        });
        test.ui.tooltip;
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(options) {
    "use strict";
    var bbVer = options.fn.jquery.split(" ")[0].split(".");
    if (bbVer[0] < 2 && bbVer[1] < 9 || 1 == bbVer[0] && 9 == bbVer[1] && bbVer[2] < 1 || bbVer[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function(_) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
        return !1;
    }
    _.fn.emulateTransitionEnd = function(duration) {
        var a = !1, _this = this;
        _(this).one("bsTransitionEnd", function() {
            a = !0;
        });
        var callback = function() {
            a || _(_this).trigger(_.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, _(function() {
        _.support.transition = transitionEnd(), _.support.transition && (_.event.special.bsTransitionEnd = {
            bindType: _.support.transition.end,
            delegateType: _.support.transition.end,
            handle: function(e) {
                if (_(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        });
    });
}
(jQuery), +function(hide) {
    "use strict";
    function initialize(name) {
        return this.each(function() {
            var $this = hide(this), data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof name && data[name].call($this);
        });
    }
    var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
        hide(el).on("click", dismiss, this.close);
    };
    Alert.VERSION = "3.3.7", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = hide(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = hide("#" === selector ? [] : selector);
        e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")),
            $parent.trigger(e = hide.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"),
            hide.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
    };
    var old = hide.fn.alert;
    hide.fn.alert = initialize, hide.fn.alert.Constructor = Alert, hide.fn.alert.noConflict = function() {
        return hide.fn.alert = old, this;
    }, hide(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery), +function(handler) {
    "use strict";
    function button(next) {
        return this.each(function() {
            var $this = handler(this), data = $this.data("bs.button"), options = "object" == typeof next && next;
            data || $this.data("bs.button", data = new Button(this, options)), "toggle" == next ? data.toggle() : next && data.setState(next);
        });
    }
    var Button = function(element, options) {
        this.$element = handler(element), this.options = handler.extend({}, Button.DEFAULTS, options),
            this.isLoading = !1;
    };
    Button.VERSION = "3.3.7", Button.DEFAULTS = {
        loadingText: "loading..."
    }, Button.prototype.setState = function(key) {
        var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", obj = $el.data();
        key += "Text", null == obj.resetText && $el.data("resetText", $el[val]()), setTimeout(handler.proxy(function() {
            $el[val](null == obj[key] ? this.options[key] : obj[key]), "loadingText" == key ? (this.isLoading = !0,
                    $el.addClass(d).attr(d, d).prop(d, !0)) : this.isLoading && (this.isLoading = !1,
                    $el.removeClass(d).removeAttr(d).prop(d, !1));
        }, this), 0);
    }, Button.prototype.toggle = function() {
        var selector = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") ? ($input.prop("checked") && (selector = !1), $parent.find(".active").removeClass("active"),
                    this.$element.addClass("active")) : "checkbox" == $input.prop("type") && ($input.prop("checked") !== this.$element.hasClass("active") && (selector = !1),
                    this.$element.toggleClass("active")), $input.prop("checked", this.$element.hasClass("active")),
            selector && $input.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var old = handler.fn.button;
    handler.fn.button = button, handler.fn.button.Constructor = Button, handler.fn.button.noConflict = function() {
        return handler.fn.button = old, this;
    }, handler(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var el = handler(e.target).closest(".btn");
        button.call(el, "toggle"), handler(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(),
            el.is("input,button") ? el.trigger("focus") : el.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        handler(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function(_) {
    "use strict";
    function init(option) {
        return this.each(function() {
            var $this = _(this), data = $this.data("bs.carousel"), options = _.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option), action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle();
        });
    }
    var Carousel = function(element, options) {
        this.$element = _(element), this.$indicators = this.$element.find(".carousel-indicators"),
            this.options = options, this.paused = null, this.sliding = null, this.interval = null,
            this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", _.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", _.proxy(this.pause, this)).on("mouseleave.bs.carousel", _.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.3.7", Carousel.TRANSITION_DURATION = 600, Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, Carousel.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;

                case 39:
                    this.next();
                    break;

                default:
                    return;
            }
            e.preventDefault();
        }
    }, Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(_.proxy(this.next, this), this.options.interval)),
            this;
    }, Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
    }, Carousel.prototype.getItemForDirection = function(remove, item) {
        var i = this.getItemIndex(item), media = "prev" == remove && 0 === i || "next" == remove && i == this.$items.length - 1;
        if (media && !this.options.wrap) return item;
        var offset = "prev" == remove ? -1 : 1, index = (i + offset) % this.$items.length;
        return this.$items.eq(index);
    }, Carousel.prototype.to = function(pos) {
        var that = this, idx = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(pos > this.$items.length - 1 || pos < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                that.to(pos);
            }) : idx == pos ? this.pause().cycle() : this.slide(pos > idx ? "next" : "prev", this.$items.eq(pos));
    }, Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && _.support.transition && (this.$element.trigger(_.support.transition.end),
            this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, Carousel.prototype.next = function() {
        if (!this.sliding) return this.slide("next");
    }, Carousel.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev");
    }, Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active"), $next = next || this.getItemForDirection(type, $active), isCycling = this.interval, direction = "next" == type ? "left" : "right", that = this;
        if ($next.hasClass("active")) return this.sliding = !1;
        var r = $next[0], e = _.Event("slide.bs.carousel", {
            relatedTarget: r,
            direction: direction
        });
        if (this.$element.trigger(e), !e.isDefaultPrevented()) {
            if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = _(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var scrollEvent = _.Event("slid.bs.carousel", {
                relatedTarget: r,
                direction: direction
            });
            return _.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type),
                    $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                    $next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")),
                        that.sliding = !1, setTimeout(function() {
                        that.$element.trigger(scrollEvent);
                    }, 0);
                }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"),
                    $next.addClass("active"), this.sliding = !1, this.$element.trigger(scrollEvent)),
            isCycling && this.cycle(), this;
        }
    };
    var old = _.fn.carousel;
    _.fn.carousel = init, _.fn.carousel.Constructor = Carousel, _.fn.carousel.noConflict = function() {
        return _.fn.carousel = old, this;
    };
    var onClick = function(event) {
        var href, $this = _(this), target = _($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if (target.hasClass("carousel")) {
            var element = _.extend({}, target.data(), $this.data()), elementId = $this.attr("data-slide-to");
            elementId && (element.interval = !1), init.call(target, element), elementId && target.data("bs.carousel").to(elementId),
                event.preventDefault();
        }
    };
    _(document).on("click.bs.carousel.data-api", "[data-slide]", onClick).on("click.bs.carousel.data-api", "[data-slide-to]", onClick),
        _(window).on("load", function() {
            _('[data-ride="carousel"]').each(function() {
                var instance = _(this);
                init.call(instance, instance.data());
            });
        });
}(jQuery), +function(callback) {
    "use strict";
    function success($this) {
        var href, body = $this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return callback(body);
    }
    function remove(a) {
        return this.each(function() {
            var $this = callback(this), data = $this.data("bs.collapse"), options = callback.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof a && a);
            !data && options.toggle && /show|hide/.test(a) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)),
            "string" == typeof a && data[a]();
        });
    }
    var Collapse = function(element, options) {
        this.$element = callback(element), this.options = callback.extend({}, Collapse.DEFAULTS, options),
            this.$trigger = callback('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'),
            this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    Collapse.VERSION = "3.3.7", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var hasData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (hasData = actives.data("bs.collapse"), hasData && hasData.transitioning))) {
                var startEvent = callback.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (remove.call(actives, "hide"), hasData || actives.data("bs.collapse", null));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0),
                        this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),
                            this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!callback.support.transition) return complete.call(this);
                    var scrollSize = callback.camelCase([ "scroll", dimension ].join("-"));
                    this.$element.one("bsTransitionEnd", callback.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                }
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = callback.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                    this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return callback.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", callback.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, Collapse.prototype.getParent = function() {
        return callback(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(callback.proxy(function(i, s) {
            var m = callback(s);
            this.addAriaAndCollapsedClass(success(m), m);
        }, this)).end();
    }, Collapse.prototype.addAriaAndCollapsedClass = function(element, target) {
        var value = element.hasClass("in");
        element.attr("aria-expanded", value), target.toggleClass("collapsed", !value).attr("aria-expanded", value);
    };
    var old = callback.fn.collapse;
    callback.fn.collapse = remove, callback.fn.collapse.Constructor = Collapse, callback.fn.collapse.noConflict = function() {
        return callback.fn.collapse = old, this;
    }, callback(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = callback(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = success($this), data = $target.data("bs.collapse"), hash = data ? "toggle" : $this.data();
        remove.call($target, hash);
    });
}(jQuery), +function(test) {
    "use strict";
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && test(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    function clearMenus(e) {
        e && 3 === e.which || (test(eventName).remove(), test(selector).each(function() {
            var $this = test(this), $panel = getParent($this), relatedTarget = {
                relatedTarget: this
            };
            $panel.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && test.contains($panel[0], e.target) || ($panel.trigger(e = test.Event("hide.bs.dropdown", relatedTarget)),
            e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $panel.removeClass("open").trigger(test.Event("hidden.bs.dropdown", relatedTarget)))));
        }));
    }
    function remove(name) {
        return this.each(function() {
            var $this = test(this), data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof name && data[name].call($this);
        });
    }
    var eventName = ".dropdown-backdrop", selector = '[data-toggle="dropdown"]', Dropdown = function(element) {
        test(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.7", Dropdown.prototype.toggle = function(e) {
        var $this = test(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this), isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
                "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && test(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(test(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = test.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger(test.Event("shown.bs.dropdown", relatedTarget));
            }
            return !1;
        }
    }, Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = test(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(selector).trigger("focus"),
                    $this.trigger("click");
                var target = " li:not(.disabled):visible a", headers = $parent.find(".dropdown-menu" + target);
                if (headers.length) {
                    var i = headers.index(e.target);
                    38 == e.which && i > 0 && i--, 40 == e.which && i < headers.length - 1 && i++, ~i || (i = 0),
                        headers.eq(i).trigger("focus");
                }
            }
        }
    };
    var old = test.fn.dropdown;
    test.fn.dropdown = remove, test.fn.dropdown.Constructor = Dropdown, test.fn.dropdown.noConflict = function() {
        return test.fn.dropdown = old, this;
    }, test(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", selector, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", selector, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function(_) {
    "use strict";
    function modal(option, _relatedTarget) {
        return this.each(function() {
            var $this = _(this), data = $this.data("bs.modal"), options = _.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
        });
    }
    var Modal = function(element, options) {
        this.options = options, this.$body = _(document.body), this.$element = _(element),
            this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null,
            this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, _.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    Modal.VERSION = "3.3.7", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150,
        Modal.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, Modal.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e);
    }, Modal.prototype.show = function(_relatedTarget) {
        var that = this, e = _.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0,
            this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(),
            this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', _.proxy(this.hide, this)),
            this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                    _(e.target).is(that.$element) && (that.ignoreBackdropClick = !0);
                });
            }), this.backdrop(function() {
            var transition = _.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0),
                that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"),
                that.enforceFocus();
            var e = _.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                    that.$element.trigger("focus").trigger(e);
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        }));
    }, Modal.prototype.hide = function(e) {
        e && e.preventDefault(), e = _.Event("hide.bs.modal"), this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(),
            _(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"), _.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", _.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
    }, Modal.prototype.enforceFocus = function() {
        _(document).off("focusin.bs.modal").on("focusin.bs.modal", _.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", _.proxy(function(i) {
                27 == i.which && this.hide();
            }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, Modal.prototype.resize = function() {
        this.isShown ? _(window).on("resize.bs.modal", _.proxy(this.handleUpdate, this)) : _(window).off("resize.bs.modal");
    }, Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(), this.backdrop(function() {
            that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(),
                that.$element.trigger("hidden.bs.modal");
        });
    }, Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, Modal.prototype.backdrop = function(callback) {
        var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = _.support.transition && animate;
            if (this.$backdrop = _(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body),
                    this.$element.on("click.dismiss.bs.modal", _.proxy(function(evt) {
                        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (evt.target === evt.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
                    }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"),
                    !callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var complete = function() {
                that.removeBackdrop(), callback && callback();
            };
            _.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", complete).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : complete();
        } else callback && callback();
    }, Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, Modal.prototype.adjustDialog = function() {
        var has_vert_scrollbar = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && has_vert_scrollbar ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !has_vert_scrollbar ? this.scrollbarWidth : ""
        });
    }, Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, Modal.prototype.checkScrollbar = function() {
        var windowWidth = window.innerWidth;
        if (!windowWidth) {
            var e = document.documentElement.getBoundingClientRect();
            windowWidth = e.right - Math.abs(e.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < windowWidth, this.scrollbarWidth = this.measureScrollbar();
    }, Modal.prototype.setScrollbar = function() {
        var index = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", index + this.scrollbarWidth);
    }, Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, Modal.prototype.measureScrollbar = function() {
        var div = document.createElement("div");
        div.className = "modal-scrollbar-measure", this.$body.append(div);
        var width = div.offsetWidth - div.clientWidth;
        return this.$body[0].removeChild(div), width;
    };
    var old = _.fn.modal;
    _.fn.modal = modal, _.fn.modal.Constructor = Modal, _.fn.modal.noConflict = function() {
        return _.fn.modal = old, this;
    }, _(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = _(this), href = $this.attr("href"), data = _($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = data.data("bs.modal") ? "toggle" : _.extend({
                remote: !/#/.test(href) && href
            }, data.data(), $this.data());
        $this.is("a") && e.preventDefault(), data.one("show.bs.modal", function(e) {
            e.isDefaultPrevented() || data.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        }), modal.call(data, option, this);
    });
}(jQuery), +function(_) {
    "use strict";
    function remove(a) {
        return this.each(function() {
            var $this = _(this), data = $this.data("bs.tooltip"), options = "object" == typeof a && a;
            !data && /destroy|hide/.test(a) || (data || $this.data("bs.tooltip", data = new Tooltip(this, options)),
            "string" == typeof a && data[a]());
        });
    }
    var Tooltip = function(element, options) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null,
            this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", element, options);
    };
    Tooltip.VERSION = "3.3.7", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        if (this.enabled = !0, this.type = type, this.$element = _(element), this.options = this.getOptions(options),
                this.$viewport = this.options.viewport && _(_.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
                this.inState = {
                    click: !1,
                    hover: !1,
                    focus: !1
                }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var classes = this.options.trigger.split(" "), i = classes.length; i--; ) {
            var className = classes[i];
            if ("click" == className) this.$element.on("click." + this.type, this.options.selector, _.proxy(this.toggle, this)); else if ("manual" != className) {
                var eventIn = "hover" == className ? "mouseenter" : "focusin", eventOut = "hover" == className ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, _.proxy(this.enter, this)),
                    this.$element.on(eventOut + "." + this.type, this.options.selector, _.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = _.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = _.extend({}, this.getDefaults(), this.$element.data(), options),
        options.delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }), options;
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && _.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : _(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()),
            _(obj.currentTarget).data("bs." + this.type, self)), obj instanceof _.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = !0),
            self.tip().hasClass("in") || "in" == self.hoverState ? void (self.hoverState = "in") : (clearTimeout(self.timeout),
                    self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
                        "in" == self.hoverState && self.show();
                    }, self.options.delay.show)) : self.show());
    }, Tooltip.prototype.isInStateTrue = function() {
        for (var url in this.inState) if (this.inState[url]) return !0;
        return !1;
    }, Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : _(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()),
                _(obj.currentTarget).data("bs." + this.type, self)), obj instanceof _.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = !1),
                !self.isInStateTrue()) return clearTimeout(self.timeout), self.hoverState = "out",
            self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
                    "out" == self.hoverState && self.hide();
                }, self.options.delay.hide)) : self.hide();
    }, Tooltip.prototype.show = function() {
        var e = _.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var result = _.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !result) return;
            var that = this, $tip = this.tip(), j = this.getUID(this.type);
            this.setContent(), $tip.attr("id", j), this.$element.attr("aria-describedby", j),
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element),
                this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, view = this.getPosition(this.$viewport);
                placement = "bottom" == placement && pos.bottom + actualHeight > view.bottom ? "top" : "top" == placement && pos.top - actualHeight < view.top ? "bottom" : "right" == placement && pos.right + actualWidth > view.width ? "left" : "left" == placement && pos.left - actualWidth < view.left ? "right" : placement,
                    $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                var context = that.hoverState;
                that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == context && that.leave(that);
            };
            _.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, top = parseInt($tip.css("margin-top"), 10), left = parseInt($tip.css("margin-left"), 10);
        isNaN(top) && (top = 0), isNaN(left) && (left = 0), offset.top += top, offset.left += left,
            _.offset.setOffset($tip[0], _.extend({
                using: function(props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    });
                }
            }, offset), 0), $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var args = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        args.left ? offset.left += args.left : offset.top += args.top;
        var t = /top|bottom/.test(placement), e = t ? 2 * args.left - width + actualWidth : 2 * args.top - height + actualHeight, p = t ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(e, $tip[0][p], t);
    }, Tooltip.prototype.replaceArrow = function(val1, val2, horizontal) {
        this.arrow().css(horizontal ? "left" : "top", 50 * (1 - val1 / val2) + "%").css(horizontal ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
    }, Tooltip.prototype.hide = function(complete) {
        function callback() {
            "in" != that.hoverState && $tip.detach(), that.$element && that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type),
            complete && complete();
        }
        var that = this, $tip = _(this.$tip), e = _.Event("hide.bs." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return $tip.removeClass("in"),
            _.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", callback).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : callback(),
            this.hoverState = null, this;
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function(node) {
        node = node || this.$element;
        var el = node[0], n = "BODY" == el.tagName, o = el.getBoundingClientRect();
        null == o.width && (o = _.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var view = window.SVGElement && el instanceof window.SVGElement, options = n ? {
                top: 0,
                left: 0
            } : view ? null : node.offset(), defaults = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : node.scrollTop()
        }, args = n ? {
                width: _(window).width(),
                height: _(window).height()
            } : null;
        return _.extend({}, o, defaults, args, options);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : "top" == placement ? {
                    top: pos.top - actualHeight,
                    left: pos.left + pos.width / 2 - actualWidth / 2
                } : "left" == placement ? {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth
                    } : {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(number, offset, options, callback) {
        var result = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return result;
        var height = this.options.viewport && this.options.viewport.padding || 0, pos = this.getPosition(this.$viewport);
        if (/right|left/.test(number)) {
            var actualHeight = offset.top - height - pos.scroll, y = offset.top + height - pos.scroll + callback;
            actualHeight < pos.top ? result.top = pos.top - actualHeight : y > pos.top + pos.height && (result.top = pos.top + pos.height - y);
        } else {
            var top = offset.left - height, left = offset.left + height + options;
            top < pos.left ? result.left = pos.left - top : left > pos.right && (result.left = pos.left + pos.width - left);
        }
        return result;
    }, Tooltip.prototype.getTitle = function() {
        var title, $e = this.$element, o = this.options;
        return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
    }, Tooltip.prototype.getUID = function(id) {
        do id += ~~(1e6 * Math.random()); while (document.getElementById(id));
        return id;
    }, Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = _(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.enable = function() {
        this.enabled = !0;
    }, Tooltip.prototype.disable = function() {
        this.enabled = !1;
    }, Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && (self = _(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()),
            _(e.currentTarget).data("bs." + this.type, self))), e ? (self.inState.click = !self.inState.click,
                self.isInStateTrue() ? self.enter(self) : self.leave(self)) : self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }, Tooltip.prototype.destroy = function() {
        var self = this;
        clearTimeout(this.timeout), this.hide(function() {
            self.$element.off("." + self.type).removeData("bs." + self.type), self.$tip && self.$tip.detach(),
                self.$tip = null, self.$arrow = null, self.$viewport = null, self.$element = null;
        });
    };
    var old = _.fn.tooltip;
    _.fn.tooltip = remove, _.fn.tooltip.Constructor = Tooltip, _.fn.tooltip.noConflict = function() {
        return _.fn.tooltip = old, this;
    };
}(jQuery), +function(self) {
    "use strict";
    function remove(a) {
        return this.each(function() {
            var $this = self(this), data = $this.data("bs.popover"), options = "object" == typeof a && a;
            !data && /destroy|hide/.test(a) || (data || $this.data("bs.popover", data = new Popover(this, options)),
            "string" == typeof a && data[a]());
        });
    }
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!self.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.3.7", Popover.DEFAULTS = self.extend({}, self.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), Popover.prototype = self.extend({}, self.fn.tooltip.Constructor.prototype),
        Popover.prototype.constructor = Popover, Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content),
            $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element, o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var old = self.fn.popover;
    self.fn.popover = remove, self.fn.popover.Constructor = Popover, self.fn.popover.noConflict = function() {
        return self.fn.popover = old, this;
    };
}(jQuery), +function(callback) {
    "use strict";
    function ScrollSpy(defaultValue, options) {
        this.$body = callback(document.body), this.$scrollElement = callback(callback(defaultValue).is(document.body) ? window : defaultValue),
            this.options = callback.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a",
            this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0,
            this.$scrollElement.on("scroll.bs.scrollspy", callback.proxy(this.process, this)),
            this.refresh(), this.process();
    }
    function fn(a) {
        return this.each(function() {
            var $this = callback(this), data = $this.data("bs.scrollspy"), options = "object" == typeof a && a;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof a && data[a]();
        });
    }
    ScrollSpy.VERSION = "3.3.7", ScrollSpy.DEFAULTS = {
        offset: 10
    }, ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, ScrollSpy.prototype.refresh = function() {
        var self = this, len = "offset", pos = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(),
        callback.isWindow(this.$scrollElement[0]) || (len = "position", pos = this.$scrollElement.scrollTop()),
            this.$body.find(this.selector).map(function() {
                var $el = callback(this), href = $el.data("target") || $el.attr("href"), $href = /^#./.test(href) && callback(href);
                return $href && $href.length && $href.is(":visible") && [ [ $href[len]().top + pos, href ] ] || null;
            }).sort(function(a, b) {
                return a[0] - b[0];
            }).each(function() {
                self.offsets.push(this[0]), self.targets.push(this[1]);
            });
    }, ScrollSpy.prototype.process = function() {
        var j, x = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), z = this.options.offset + i - this.$scrollElement.height(), elements = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), x >= z) return activeTarget != (j = targets[targets.length - 1]) && this.activate(j);
        if (activeTarget && x < elements[0]) return this.activeTarget = null, this.clear();
        for (j = elements.length; j--; ) activeTarget != targets[j] && x >= elements[j] && (void 0 === elements[j + 1] || x < elements[j + 1]) && this.activate(targets[j]);
    }, ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target, this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = callback(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")),
            active.trigger("activate.bs.scrollspy");
    }, ScrollSpy.prototype.clear = function() {
        callback(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var old = callback.fn.scrollspy;
    callback.fn.scrollspy = fn, callback.fn.scrollspy.Constructor = ScrollSpy, callback.fn.scrollspy.noConflict = function() {
        return callback.fn.scrollspy = old, this;
    }, callback(window).on("load.bs.scrollspy.data-api", function() {
        callback('[data-spy="scroll"]').each(function() {
            var ret = callback(this);
            fn.call(ret, ret.data());
        });
    });
}(jQuery), +function(b) {
    "use strict";
    function tab(name) {
        return this.each(function() {
            var $this = b(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof name && data[name]();
        });
    }
    var Tab = function(element) {
        this.element = b(element);
    };
    Tab.VERSION = "3.3.7", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")),
                !$this.parent("li").hasClass("active")) {
            var $d = $ul.find(".active:last a"), e = b.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            }), event = b.Event("show.bs.tab", {
                relatedTarget: $d[0]
            });
            if ($d.trigger(e), $this.trigger(event), !event.isDefaultPrevented() && !e.isDefaultPrevented()) {
                var $target = b(selector);
                this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                    $d.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }), $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $d[0]
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
                element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
                $container ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"),
            element.parent(".dropdown-menu").length && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            callback && callback();
        }
        var $active = container.find("> .active"), $container = callback && b.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && $container ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(),
            $active.removeClass("in");
    };
    var old = b.fn.tab;
    b.fn.tab = tab, b.fn.tab.Constructor = Tab, b.fn.tab.noConflict = function() {
        return b.fn.tab = old, this;
    };
    var mouseup = function(e) {
        e.preventDefault(), tab.call(b(this), "show");
    };
    b(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', mouseup).on("click.bs.tab.data-api", '[data-toggle="pill"]', mouseup);
}(jQuery), +function(_) {
    "use strict";
    function initialize(key) {
        return this.each(function() {
            var $this = _(this), data = $this.data("bs.affix"), options = "object" == typeof key && key;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof key && data[key]();
        });
    }
    var Affix = function(element, options) {
        this.options = _.extend({}, Affix.DEFAULTS, options), this.$target = _(this.options.target).on("scroll.bs.affix.data-api", _.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", _.proxy(this.checkPositionWithEventLoop, this)),
            this.$element = _(element), this.affixed = null, this.unpin = null, this.pinnedOffset = null,
            this.checkPosition();
    };
    Affix.VERSION = "3.3.7", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0,
        target: window
    }, Affix.prototype.getState = function(date, value, options, callback) {
        var scrollTop = this.$target.scrollTop(), offset = this.$element.offset(), height = this.$target.height();
        if (null != options && "top" == this.affixed) return scrollTop < options && "top";
        if ("bottom" == this.affixed) return null != options ? !(scrollTop + this.unpin <= offset.top) && "bottom" : !(scrollTop + height <= date - callback) && "bottom";
        var v = null == this.affixed, w = v ? scrollTop : offset.top, h = v ? height : value;
        return null != options && scrollTop <= options ? "top" : null != callback && w + h >= date - callback && "bottom";
    }, Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout(_.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = this.$element.height(), offset = this.options.offset, top = offset.top, b = offset.bottom, r = Math.max(_(document).height(), _(document.body).height());
            "object" != typeof offset && (b = top = offset), "function" == typeof top && (top = offset.top(this.$element)),
            "function" == typeof b && (b = offset.bottom(this.$element));
            var affix = this.getState(r, c, top, b);
            if (this.affixed != affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : ""), e = _.Event(affixType + ".bs.affix");
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null,
                    this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == affix && this.$element.offset({
                top: r - c - b
            });
        }
    };
    var old = _.fn.affix;
    _.fn.affix = initialize, _.fn.affix.Constructor = Affix, _.fn.affix.noConflict = function() {
        return _.fn.affix = old, this;
    }, _(window).on("load", function() {
        _('[data-spy="affix"]').each(function() {
            var $this = _(this), data = $this.data();
            data.offset = data.offset || {}, null != data.offsetBottom && (data.offset.bottom = data.offsetBottom),
            null != data.offsetTop && (data.offset.top = data.offsetTop), initialize.call($this, data);
        });
    });
}(jQuery), function(e, win, doc, data) {
    function Plugin(element, options) {
        this.element = element, this.settings = e.extend({}, defaults, options), this._defaults = defaults,
            this._name = pluginName, this.init();
    }
    var pluginName = "numerator", defaults = {
        easing: "swing",
        duration: 500,
        delimiter: data,
        rounding: 0,
        toValue: data,
        fromValue: data,
        queue: !1,
        onStart: function() {},
        onStep: function() {},
        onProgress: function() {},
        onComplete: function() {}
    };
    Plugin.prototype = {
        init: function() {
            this.parseElement(), this.setValue();
        },
        parseElement: function() {
            var val = e.trim(e(this.element).text());
            this.settings.fromValue = this.settings.fromValue || this.format(val);
        },
        setValue: function() {
            var self = this;
            e({
                value: self.settings.fromValue
            }).animate({
                value: self.settings.toValue
            }, {
                duration: parseInt(self.settings.duration, 10),
                easing: self.settings.easing,
                start: self.settings.onStart,
                step: function(error, val) {
                    e(self.element).text(self.format(error)), self.settings.onStep(error, val);
                },
                progress: self.settings.onProgress,
                complete: self.settings.onComplete
            });
        },
        format: function(x) {
            var that = this;
            return x = parseInt(this.settings.rounding) < 1 ? parseInt(x, 10) : parseFloat(x).toFixed(parseInt(this.settings.rounding)),
                that.settings.delimiter ? this.delimit(x) : x;
        },
        delimit: function(word) {
            var that = this;
            if (word = word.toString(), that.settings.rounding && parseInt(that.settings.rounding, 10) > 0) {
                var string = word.substring(word.length - (that.settings.rounding + 1), word.length), length = word.substring(0, word.length - (that.settings.rounding + 1));
                return that.addDelimiter(length) + string;
            }
            return that.addDelimiter(word);
        },
        addDelimiter: function(spy) {
            return spy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.settings.delimiter);
        }
    }, e.fn[pluginName] = function(options) {
        return this.each(function() {
            e.data(this, "plugin_" + pluginName) && e.data(this, "plugin_" + pluginName, null),
                e.data(this, "plugin_" + pluginName, new Plugin(this, options));
        });
    };
}(jQuery, window, document), function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory(jQuery);
}(function(self) {
    "use strict";
    function parseDateString(dateString) {
        if (dateString instanceof Date) return dateString;
        if (String(dateString).match(matchers)) return String(dateString).match(/^[0-9]*$/) && (dateString = Number(dateString)),
        String(dateString).match(/\-/) && (dateString = String(dateString).replace(/\-/g, "/")),
            new Date(dateString);
        throw new Error("Couldn't cast `" + dateString + "` to a date object.");
    }
    function remove(rect) {
        var key = rect.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(key);
    }
    function strftime(offsetObject) {
        return function(format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) for (var i = 0, len = directives.length; i < len; ++i) {
                var r = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), regexp = remove(r[0]), str = r[1] || "", type = r[3] || "", value = null;
                r = r[2], _data.hasOwnProperty(r) && (value = _data[r], value = Number(offsetObject[value])),
                null !== value && ("!" === str && (value = pluralize(type, value)), "" === str && value < 10 && (value = "0" + value.toString()),
                    format = format.replace(regexp, value.toString()));
            }
            return format = format.replace(/%/, "%");
        };
    }
    function pluralize(_ref, hdiff) {
        var path = "s", type = "";
        return _ref && (_ref = _ref.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === _ref.length ? path = _ref[0] : (type = _ref[0],
                path = _ref[1])), Math.abs(hdiff) > 1 ? path : type;
    }
    var instances = [], matchers = [], info = {
        precision: 100,
        elapse: !1,
        defer: !1
    };
    matchers.push(/^[0-9]*$/.source), matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
        matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
        matchers = new RegExp(matchers.join("|"));
    var _data = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }, Countdown = function(el, finalDate, callback) {
        this.el = el, this.$el = self(el), this.interval = null, this.offset = {}, this.options = self.extend({}, info),
            this.instanceNumber = instances.length, instances.push(this), this.$el.data("countdown-instance", this.instanceNumber),
        callback && ("function" == typeof callback ? (this.$el.on("update.countdown", callback),
                this.$el.on("stoped.countdown", callback), this.$el.on("finish.countdown", callback)) : this.options = self.extend({}, info, callback)),
            this.setFinalDate(finalDate), this.options.defer === !1 && this.start();
    };
    self.extend(Countdown.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var self = this;
            this.update(), this.interval = setInterval(function() {
                self.update.call(self);
            }, this.options.precision);
        },
        stop: function() {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped");
        },
        toggle: function() {
            this.interval ? this.stop() : this.start();
        },
        pause: function() {
            this.stop();
        },
        resume: function() {
            this.start();
        },
        remove: function() {
            this.stop.call(this), instances[this.instanceNumber] = null, delete this.$el.data().countdownInstance;
        },
        setFinalDate: function(value) {
            this.finalDate = parseDateString(value);
        },
        update: function() {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var s, types = void 0 !== self._data(this.el, "events"), now = new Date();
            s = this.finalDate.getTime() - now.getTime(), s = Math.ceil(s / 1e3), s = !this.options.elapse && s < 0 ? 0 : Math.abs(s),
            this.totalSecsLeft !== s && types && (this.totalSecsLeft = s, this.elapsed = now >= this.finalDate,
                this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this.finalDate.getFullYear() - now.getFullYear()),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                    totalMinutes: Math.floor(this.totalSecsLeft / 60),
                    totalSeconds: this.totalSecsLeft
                }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(),
                    this.dispatchEvent("finish")));
        },
        dispatchEvent: function(eventName) {
            var event = self.Event(eventName + ".countdown");
            event.finalDate = this.finalDate, event.elapsed = this.elapsed, event.offset = self.extend({}, this.offset),
                event.strftime = strftime(this.offset), this.$el.trigger(event);
        }
    }), self.fn.countdown = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var instanceNumber = self(this).data("countdown-instance");
            if (void 0 !== instanceNumber) {
                var instance = instances[instanceNumber], method = argumentsArray[0];
                Countdown.prototype.hasOwnProperty(method) ? instance[method].apply(instance, argumentsArray.slice(1)) : null === String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (instance.setFinalDate.call(instance, method),
                            instance.start()) : self.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
            } else new Countdown(this, argumentsArray[0], argumentsArray[1]);
        });
    };
}), 
	$(document).ready(function() {
    function update(userId) {
        var $this = $("#" + userId);
        return $(".modal-window").hide(), $this.show().css("margin-top", $this.innerHeight() / -2),
            $this.show().css("margin-left", $this.innerWidth() / -2), $(".modal-layout").show(),
            $("body").css("overflow", "hidden").css("padding-right", scrollbarWidth()), !1;
    }
    $.ajaxSetup({
        headers: {
            "X-XSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    }), $(".modal-toggle").click(function() {
        return update($(this).attr("data-toggle"));
    }), $(".modal-window__close-button").click(function() {
        return $(".modal-layout").hide(), $(".modal-window").hide(), $("body").css("overflow", "auto").css("padding-right", 0),
            !1;
    }), $(".modal-layout").click(function() {
        return $(".modal-layout").hide(), $(".modal-window").hide(), $("body").css("overflow", "auto").css("padding-right", 0),
            !1;
    }), $(".modal-window .pay-system__img-wrapper").click(function() {
        return $(".pay-system__img-wrapper").removeClass("modal-window__img-wrapper_select"),
            $(this).addClass("modal-window__img-wrapper_select"), !1;
    }), $(".modal-window .pay-system__more_show").click(function() {
        return $(".pay-system__more_show").hide(), $(".pay-system__more_hide").show(), $(".modal-window__img-wrapper_additionally").show(),
            !1;
    }), $(".modal-window .pay-system__more_hide").click(function() {
        return $(".pay-system__more_hide").hide(), $(".pay-system__more_show").show(), $(".modal-window__img-wrapper_additionally").hide(),
            !1;
    }), $("#btn-cash-in").click(function() {
        var body = $("#add-cash .modal-window__img-wrapper_select img");
        if (!body.length) return alert("Выберите способ оплаты!"), !1;
        var elapsed = parseInt($("#add-cash input").val());
				void $.ajax({
                url: "/pay",
                type: "get",
                data: {
                    amount: elapsed,
                    currency: body.attr("data-currency"),
                    provider: body.attr("data-provider")
                },
                dataType: "json",
                success: function(msg) {
					if(msg.success == true)
					{
						window.location.href = msg.redirect_url;
					}
					else
					{
						alert(msg.error);
					}
                }
            });
    }), $(document).click(function() {
        $(".menu-button__wrapper").removeClass("menu-button__wrapper_active"), $(".header-drop-menu").removeClass("header-drop-menu_active");
    }), $(".cases-tab").click(function() {
        return $(".cases-tab").addClass("button-rounding_trans-dark").removeClass("button-rounding_dark button-rounding_disabled"),
            $(this).addClass("button-rounding_dark button-rounding_disabled").removeClass("button-rounding_trans-dark"),
            $($(this).attr("data-toggleUp")).slideUp(300).addClass("cases-row_toggle"), $($(this).attr("data-toggleDown")).slideDown(300).removeClass("cases-row_toggle"),
            !1;
    }), $(".lk-tabs__lk-tab").click(function() {
        return $(".lk-tabs__lk-tab").addClass("button-rounding_trans-dark").removeClass("button-rounding_dark button-rounding_disabled"),
            $(this).addClass("button-rounding_dark button-rounding_disabled").removeClass("button-rounding_trans-dark"),
            $($(this).attr("data-toggleUp")).hide().addClass("lk-block_toggle"), $($(this).attr("data-toggleDown")).show().removeClass("lk-block_toggle"),
            !1;
    }), $(".finance__filter-button").click(function() {
        return $(".finance__filter-button").removeClass("nav-line__link_active"), $(this).addClass("nav-line__link_active"),
            $($(this).attr("data-toggleUp")).hide(), $($(this).attr("data-toggleDown")).show(300),
            !1;
    }),$("#getbonus").click(function() {
        $.ajax({
            url: "/takeBonus",
            type: "post",
            data: {
            },
            dataType: "json",
            success: function(response) {
              if(response.status == 'true'){
                  alert(response.message);
              }else{
                  alert(response.message);
              }
            }
        });
    }),$("#promocode_btn").click(function() {
        $.ajax({
            url: "/activate",
            type: "post",
            data: {
                user: login,
                code: $("#promocode_value").val()
            },
            dataType: "json",
            success: function(response) {
                switch (response.status) {
                    case 200:
                        $(".user-balance").numerator({
                            easing: "linear",
                            duration: 1e3,
                            toValue: response.balance
                        }), alert("Промокод успешно активирован!"), $("#promocode_value").val("");
                        break;

                    case 401:
                        alert("Вы пытаетесь ввести собственный промокод! Не надо так!");
                        break;

                    case 404:
                        alert("Промокод не найден! Проверьте правильность написания кода!");
                        break;

                    case 403:
                        alert("Вы уже использовали промокод! Не надо так!");
                }
            }
        });
    }), $(".lk-tabs__lk-tab").click(function() {
        return $(".lk-tabs__lk-tab").addClass("button-rounding_trans-dark").removeClass("button-rounding_dark button-rounding_disabled"),
            $(this).addClass("button-rounding_dark button-rounding_disabled").removeClass("button-rounding_trans-dark"),
            $($(this).attr("data-toggleUp")).hide().addClass("lk-block_toggle"),
            $($(this).attr("data-toggleDown")).show().removeClass("lk-block_toggle"), !1
    }),$("#promo_btn").click(function() {
        $.ajax({
            url: "/promo",
            type: "post",
            data: {
                user: login,
                code: $("#promo_value").val()
            },
            dataType: "json",
            success: function(response) {
                if(response.status == 'true'){
                    $(".user-balance").numerator({
                        easing: "linear",
                        duration: 1e3,
                        toValue: response.balance
                    }), alert("Промокод успешно активирован!"), $("#promo_value").val("");
                }else{
                    alert(response.error);
                }
            }
        });
    }), $("#change-kod__change-button").click(function() {
        return $("#change-kod__input").removeAttr("disabled"), $(this).addClass("hidden"),
            $("#change-kod__save-button").removeClass("hidden"), !1;
    }), $("#change-kod__save-button").click(function() {
        var url = $("#change-kod__input").val();
        return $("#change-kod__input").attr("value", url).attr("disabled", !0), $(this).addClass("hidden"),
            $("#change-kod__change-button").removeClass("hidden"), !1;
    }), $("#btn-profile-delivery-save").click(function() {
        var c = !1, result = {
            _token: $('meta[name="csrf-token"]').attr("content")
        };
        $(".address input").each(function() {
            return 0 == $(this).val().length ? (alert($(this).attr("data-error")), c = !0, !1) : void (result[$(this).attr("name")] = $(this).val());
        }), c || $.ajax({
            url: "/updateDelivery",
            type: "post",
            data: result,
            dataType: "json",
            success: function(response) {
                switch (response.status) {
                    case 200:
                        alert("Анкета доставки товаров успешно сохранена!");
                        break;

                    case 500:
                        alert("Ошибка сохранения данных. Проверьте правильность заполнения формы.");
                }
            }
        });
    }), $("#buy_slow").click(function() {
        var data = {
            user: login,
            item_1_id: null,
            item_2_id: null,
            item_3_id: null,
            item_4_id: null,
            item_5_id: null
        }, p = 1, t = 0;
        return $(".box__cart-line .box_cart").each(function() {
            "0" == $(this).attr("data-free") && (data["item_" + p + "_id"] = $(this).attr("data-id"),
                t++), p++;
        }), 0 == t ? (alert("Необходимо добавить в корзину как минимум 1 товар!"),
                !1) : void $.ajax({
                url: "/deliverSlow",
                type: "post",
                data: data,
                dataType: "json",
                success: function(response) {
                    switch (response.status) {
                        case 200:
                            alert('Доставка успешно оформлена! Детали вы можете посмотреть в разделе "Мои доставки"');
                            location.reload();
                            break;
                        case 456:
                            alert('Один из товаров продан или существует!');
                            break;

                        case 501:
                            alert("Неправильное количество товаров в корзине");
                            break;

                        case 502:
                            alert('Заполните анкету для доставки товаров на вкладке "Профиль"');
                            window.location.href = '/profile';
                            break;

                        case 400:
                            update("need-money"), $("#need-money span.amount").html((parseInt($(".user-balance").html()) - 300) * -1);
                            break;

                        case 500:
                            alert("Ошибка оформления заказа. Обратитесь в службу поддержк¸.");
                    }
                }
            });
    }), $("#buy_fast").click(function() {
        var data = {
            user: login,
            item_1_id: null,
            item_2_id: null,
            item_3_id: null,
            item_4_id: null,
            item_5_id: null
        }, p = 1, t = 0;
        return $(".box__cart-line .box_cart").each(function() {
            "0" == $(this).attr("data-free") && (data["item_" + p + "_id"] = $(this).attr("data-id"),
                t++), p++;
        }), 0 == t ? (alert("Необходимо добавить в корзину как минимум 1 товар!"),
                !1) : void $.ajax({
                url: "/deliverFast",
                type: "post",
                data: data,
                dataType: "json",
                success: function(response) {
                    switch (response.status) {
                        case 200:
                            alert('Доставка успешно оформлена! Детали вы можете посмотреть в разделе "Мои доставки"');
                            location.reload();
                            break;
                        case 456:
                            alert('Один из товаров продан или существует!');
                            break;

                        case 501:
                            alert("Неправильное количество товаров в корзине");
                            break;

                        case 502:
                            alert('Заполните анкету для доставки товаров на вкладке "Профиль"');
                            window.location.href = '/profile';
                            break;

                        case 400:
                            update("need-money"), $("#need-money span.amount").html((parseInt($(".user-balance").html()) - 300) * -1);
                            break;

                        case 500:
                            alert("Ошибка оформления заказа. Обратитесь в службу поддержк¸.");
                    }
                }
            });
    }), $(".tooltip_on").tooltip(), $(".vk-selector").click(function() {
        return $(this).toggleClass("vk-selector_disabled"), $($(this).attr("data-toggle")).toggleClass("profile-row__user-link_disabled"),
            !1;
    });
    for (var data = [ "online", "user", "case" ], i = 0; i < data.length; i++) {
        var $target = $(".counter-" + data[i]);
        $target.numerator({
            easing: "linear",
            duration: 1e3,
            toValue: $target.attr("data-value")
        });
    }
    var rangeSlider = function(){
        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

        slider.each(function(){

            value.each(function(){
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });

            range.on('input', function(){
                $(this).next(value).html(this.value);
                $('#pro').html(this.value);
                var result = (this.value / 100) * Math.round($("#box_price").val());
                $("#box_price2").val(Math.round(result));
                $("#procent").val(Math.round(this.value));
                $('.price-box').html(Math.round(result));
                $("#start-roulette").html('<span class="game_ico"></span>начать играть за '+Math.round(result)+' P');
                window.proas =  Math.round(this.value);
            });
        });
    };
    $(".chance_minus").click(function() {
        $(".range-slider__range").val(parseInt($(".range-slider__range").val())-10);
        $(".range-slider__range").trigger('change');
        $('#pro').html(parseInt($(".range-slider__range").val()));
        var result = (parseInt($(".range-slider__range").val()) / 100) * Math.round($("#box_price").val());
        $("#box_price2").val(Math.round(result));
        $("#procent").val(Math.round(parseInt($(".range-slider__range").val())));
        $('.price-box').html(Math.round(result));
        $("#start-roulette").html('<span class="game_ico"></span>начать играть за '+Math.round(result) + ' P');
        window.proas =  Math.round(parseInt($(".range-slider__range").val()));
    });
    $(".chance_plus").click(function() {
        $(".range-slider__range").val(parseInt($(".range-slider__range").val())+10);
        $(".range-slider__range").trigger('change');
        $('#pro').html(parseInt($(".range-slider__range").val()));
        var result = (parseInt($(".range-slider__range").val()) / 100) * Math.round($("#box_price").val());
        $("#box_price2").val(Math.round(result));
        $("#procent").val(Math.round(parseInt($(".range-slider__range").val())));
        $('.price-box').html(Math.round(result));
        $("#start-roulette").html('<span class="game_ico"></span>начать играть за '+Math.round(result) + ' P');
        window.proas =  Math.round(parseInt($(".range-slider__range").val()));
    });
    rangeSlider();
    var init = function() {
        this.addFeedItem = function(s, v, i, n) {
            $(".coin-block-min__new").html('<div class="coin-block-min__coin-glow"></div><img src="' + s + '" alt="coin25" class="coin-block-min__coin-img"><div class="coin-block-min__ava-link"><div class="circle-ava"><a href="' + i + '"><img src="' + v + '" alt="ava" class="circle-ava__img"></a></div></div>').addClass("coin-block-min_" + n).removeClass("coin-block-min__new"),
                $(".coin-block-min__new_min").addClass("coin-block-min__new").removeClass("coin-block-min__new_min"),
                $(".live-win__coins-wrapper").prepend('<div class="coin-block-min coin-block-min__new_min"></div>');
        }, this.spin = function() {
            console.log(window.proas);
            if(window.proas === undefined){ window.proas = 50;}
            $.ajax({
                url: "/open",
                type: "post",
                data: {
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    id: $("#box_id").val(),
                    pro:  window.proas
                },
                dataType: "json",
                success: function(response) {
                    switch (response.status) {
                        case 200:
                            _test.spin(response.number),
                                $("#win-name").html(response.name),
                                $(".game-win__block-prize-img").attr("src",response.image),
                                $("#win-sale-item span.price").html(response.price_sale),
                                $("#user-item-id").val(response.user_item_id),
                                $(".user-balance").numerator({
                                    easing: "linear",
                                    duration: 1e3,
                                    toValue: response.balance
                                });
                            break;

                        case 401:
                            update("need-money"), $("#need-money span.amount").html((parseInt($(".user-balance").html()) - parseInt(window.button_price)) * -1),
                                $("#button-game-again").click();
                            break;

                        case 403:
                            update("login"), $("#button-game-again").click();
                    }
                }
            });
        }, this.sale = function(pObj) {
            $.ajax({
                url: "/sale",
                type: "POST",
                data: {
                    id: pObj
                },
                dataType: "json",
                success: function(response) {
                    $(".user-balance").numerator({
                        easing: "linear",
                        duration: 1e3,
                        toValue: response.balance
                    });
                }
            });
        };
    };
    window.app = new init();
    var _test = new Roulette();
    $("#start-roulette").click(function() {
        if(window.proas  <= 0){return alert('Procentage must be atleast 10%!');}
        window.button_open = $(this).html(),
            window.button_price = $(".price-box").html(),

            $(this).addClass("button-line__button_disabled").attr("disabled", "disabled").html("Идет открытие коробки..."),
            app.spin();
    }), $("#win-sale-item").click(function() {
        var ida = $("#user-item-id").val();
        $.ajax({
            url: "/sale",
            type: "POST",
            data: {
                id: ida,
            },
            dataType: "json",
            success: function(response) {
                $(".user-balance").numerator({
                    easing: "linear",
                    duration: 1e3,
                    toValue: response.balance
                });
            }
        });
        $("#button-game-again").click();
    }), $("#win-order-item").click(function() {
        window.location.href = "/profile";
    }), $("#button-game-again").click(function() {
        $(".roulette div:first-child").css("margin-left", 0), $(".game-win").css("display", "none"),
            $(".main-wrapper, .footer-wrapper").removeClass("blur"), $("body").css("overflow", "auto").css("padding-right", 0),
            $("#start-roulette").removeClass("button-line__button_disabled").removeAttr("disabled").html(window.button_open);
    }), $("#gcase50timer").countdown({
        until: new Date(2016, 11, 4, 15, 37),
        labels: [ "год", "мес", "н", "д", "ч", "м", "с" ],
        labels1: [ "год", "мес ", "н", "д", "ч", "м", "с" ],
        format: "DHMS"
    }), $("#konkurs-block-timer").countdown({
        until: new Date(2016, 11, 26, 15, 37),
        labels: [ "год", "мес", "н", "д", "ч", "м", "с" ],
        labels1: [ "год", "мес ", "н", "д", "ч", "м", "с" ],
        format: "DHMS"
    }), $(".box-select .add-cart").click(function() {
        var id = $(this).attr("data-id"), title = $(this).attr("data-title"), url = $(this).attr("data-image"), a = !1;
        return $(".box__cart-line .box_cart").each(function() {
            0 == a && "1" == $(this).attr("data-free") && ($(this).attr("data-free", "0").attr("data-id", id),
                $(this).find(".box__name").html(title), $(this).find(".box__img-wrapper").html('<img src="' + url + '">'),
                a = !0);
        }), 0 == a ? alert('Можно добавить только 5 товаров в одну посылку! Вы можете удалить товары из корзины, чтобы заменить их другими или нажмите кнопку "Заказать доставку"') : $("#box-" + id).addClass("hidden"),
            !1;
    }), $(".box_cart button").click(function() {
        var $parent = $(this).parent().parent();
        return $("#box-" + $parent.attr("data-id")).removeClass("hidden"), $parent.attr("data-free", "1").attr("data-id", ""),
            $parent.find(".box__img-wrapper").html(""), $parent.find(".box__name").html(""),
            !1;
    }), $(".box-select .sale-box").click(function() {
            var id = $(this).attr("data-id");
            app.sale(id), $("#box-" + id).addClass("hidden");

    }),$(".aasasasa").click(function() {
        var id = $(this).attr("data-id");
        window.location.href = '/aukcion/'+id;

    }), $(".shop-buy").click(function() {
        window.button_price = $(this).attr("data-price"), $.ajax({
            url: "/shop/buy",
            type: "post",
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                id: $(this).attr("data-id"),
                user: login
            },
            dataType: "json",
            success: function(response) {
                switch (response.status) {
                    case 200:
                        $(".user-balance").numerator({
                            easing: "linear",
                            duration: 1e3,
                            toValue: response.balance
                        });
						alert('Спасибо за покупку! Для заказа доставки перейдите на страницу "Мой профиль"');
                        break;

                    case 443:
                        alert('Извините произошла ошибка напишите в саппорт. :("');
                        break;

                    case 401:
                        update("need-money"), $("#need-money span.amount").html((parseInt($(".user-balance").html()) - parseInt(window.button_price)) * -1);
                        break;

                    case 403:
                        update("login");
                }
            }
        });
    });
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(a, b, c, d, e) {
        return d * (b /= e) * b + c;
    },
    easeOutQuad: function(renderContext, time, dt, diff, dur) {
        return -diff * (time /= dur) * (time - 2) + dt;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function(a, b, c, d, e) {
        return d * (b /= e) * b * b + c;
    },
    easeOutCubic: function(e, t, x, y, d) {
        return y * ((t = t / d - 1) * t * t + 1) + x;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c;
    },
    easeOutQuart: function(t, time, dt, u, dur) {
        return -u * ((time = time / dur - 1) * time * time * time - 1) + dt;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(e, t, x, y, d) {
        return y * ((t = t / d - 1) * t * t * t * t + 1) + x;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(t, time, dt, u, dur) {
        return -u * Math.cos(time / dur * (Math.PI / 2)) + u + dt;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(t, time, dt, u, d) {
        return -u / 2 * (Math.cos(Math.PI * time / d) - 1) + dt;
    },
    easeInExpo: function(x, t, b, c, d) {
        return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        return 0 == t ? b : t == d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(t, time, dt, u, dur) {
        return u * Math.sqrt(1 - (time = time / dur - 1) * time) + dt;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(a, b, c, d, t) {
        var s = 1.70158, p = 0, diff = d;
        if (0 == b) return c;
        if (1 == (b /= t)) return c + d;
        if (p || (p = .3 * t), diff < Math.abs(d)) {
            diff = d;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(d / diff);
        return -(diff * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * t - s) * (2 * Math.PI) / p)) + c;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158, p = 0, a = c;
        if (0 == t) return b;
        if (1 == (t /= d)) return b + c;
        if (p || (p = .3 * d), a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158, p = 0, a = c;
        if (0 == t) return b;
        if (2 == (t /= d / 2)) return b + c;
        if (p || (p = d * (.3 * 1.5)), a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return t < 1 ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), (t /= d / 2) < 1 ? c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        return (t /= d) < 1 / 2.75 ? c * (7.5625 * t * t) + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    },
    easeInOutBounce: function(x, t, b, c, d) {
        return t < d / 2 ? .5 * jQuery.easing.easeInBounce(x, 2 * t, 0, c, d) + b : .5 * jQuery.easing.easeOutBounce(x, 2 * t - d, 0, c, d) + .5 * c + b;
    }
});

var Roulette = function() {
    for (var options = $(".roulette .item"), parent = $(".roulette").first(), len = options.first().outerWidth(), n = options.length, o = 0; o < 50; o++) options.clone().appendTo(parent);
    this.spin = function(opts) {
        var i = (10 * n + opts - 4) * len, ret = -i, getType = 8e3;
        options.first().animate({
            marginLeft: ret
        }, getType, "easeInOutCubic", function() {
            var socket = io.connect(':2020', {rememberTransport: false});
            socket.emit('update');
            options.first().clearQueue(), options.first().stop(), $(".game-win").css("display", "block"),
              $("body").css("overflow", "hidden").css("padding-right", scrollbarWidth());
        });
    };
};

$(document).ready(function(){
    window.liveUrl = ':2020';

    var socket = io(window.liveUrl, {
        'max reconnection attempts':Infinity,
        'transports': ['websocket', 'polling', 'flashsocket'],
        'sync disconnect on unload': true
    });
    socket.on('live', function (data1) {
        data1 = data1.reverse();
        $('.live-win__coins-wrapper').empty();
        $.each(data1, function(i) {
            data = data1[i];
            app.addFeedItem(data.image, data.avatar, '/account/'+data.user, data.color);
        });
    });



    window.statbox = {'box':0, 'users':0};
    socket.on('statbox', function (data_statbox) {
        if (window.statbox['box'] != data_statbox[0]) {
            numberTo(".counter-case",data_statbox[0]);
            window.statbox['box'] = data_statbox[0];
        }
        if (window.statbox['users'] != data_statbox[1]) {
            numberTo(".counter-user", data_statbox[1]);
            window.statbox['users'] = data_statbox[1];
        }
    });
});