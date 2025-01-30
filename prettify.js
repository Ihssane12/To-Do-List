var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(function () {
  function L(a) {
    function m(a) {
      var f = a.charCodeAt(0);
      if (f !== 92) return f;
      var b = a.charAt(1);
      return (f = r[b])
        ? f
        : "0" <= b && b <= "7"
        ? parseInt(a.substring(1), 8)
        : b === "u" || b === "x"
        ? parseInt(a.substring(2), 16)
        : a.charCodeAt(1);
    }
    function e(a) {
      if (a < 32) return (a < 16 ? "\\x0" : "\\x") + a.toString(16);
      a = String.fromCharCode(a);
      if (a === "\\" || a === "-" || a === "[" || a === "]") a = "\\" + a;
      return a;
    }
    function h(a) {
      for (
        var f = a
            .substring(1, a.length - 1)
            .match(
              /\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g
            ),
          a = [],
          b = [],
          o = f[0] === "^",
          c = o ? 1 : 0,
          i = f.length;
        c < i;
        ++c
      ) {
        var j = f[c];
        if (/\\[bdsw]/i.test(j)) a.push(j);
        else {
          var j = m(j),
            d;
          c + 2 < i && "-" === f[c + 1]
            ? ((d = m(f[c + 2])), (c += 2))
            : (d = j);
          b.push([j, d]);
          d < 65 ||
            j > 122 ||
            (d < 65 ||
              j > 90 ||
              b.push([Math.max(65, j) | 32, Math.min(d, 90) | 32]),
            d < 97 || j > 122 || b.push([Math.max(97, j) & -33, Math.min(d, 122) & -33]));
        }
      }
      b.sort(function (a, f) {
        return a[0] - f[0] || f[1] - a[1];
      });
      f = [];
      j = [NaN, NaN];
      for (c = 0; c < b.length; ++c) (i = b[c]), i[0] <= j[1] + 1 ? (j[1] = Math.max(j[1], i[1])) : f.push((j = i));
      b = ["["];
      o && b.push("^");
      b.push.apply(b, a);
      for (c = 0; c < f.length; ++c)
        (i = f[c]),
          b.push(e(i[0])),
          i[1] > i[0] && (i[1] + 1 > i[0] && b.push("-"), b.push(e(i[1])));
      b.push("]");
      return b.join("");
    }
    function y(a) {
      for (
        var f = a.source.match(
            /\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g
          ),
          b = f.length,
          d = [],
          c = 0,
          i = 0;
        c < b;
        ++c
      ) {
        var j = f[c];
        j === "(" ? ++i : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (d[j] = -1);
      }
      for (c = 1; c < d.length; ++c) -1 === d[c] && (d[c] = ++t);
      for (i = c = 0; c < b; ++c)
        (j = f[c]),
          j === "("
            ? (++i, d[i] === void 0 && (f[c] = "(?:"))
            : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (f[c] = "\\" + d[i]);
      for (i = c = 0; c < b; ++c) "^" === f[c] && "^" !== f[c + 1] && (f[c] = "");
      if (a.ignoreCase && s)
        for (c = 0; c < b; ++c)
          (j = f[c]),
            (a = j.charAt(0)),
            j.length >= 2 && a === "["
              ? (f[c] = h(j))
              : a !== "\\" && (f[c] = j.replace(/[A-Za-z]/g, function (a) {
                  a = a.charCodeAt(0);
                  return "[" + String.fromCharCode(a & -33, a | 32) + "]";
                }));
      return f.join("");
    }
    for (var t = 0, s = !1, l = !1, p = 0, d = a.length; p < d; ++p) {
      var g = a[p];
      if (g.ignoreCase) l = !0;
      else if (/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
        s = !0;
        l = !1;
        break;
      }
    }
    for (var r = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 }, n = [], p = 0, d = a.length; p < d; ++p) {
      g = a[p];
      if (g.global || g.multiline) throw Error("" + g);
      n.push("(?:" + y(g) + ")");
    }
    return RegExp(n.join("|"), l ? "gi" : "g");
  }
  function M(a) {
    function m(a) {
      switch (a.nodeType) {
        case 1:
          if (e.test(a.className)) break;
          for (var g = a.firstChild; g; g = g.nextSibling) m(g);
          g = a.nodeName;
          if ("BR" === g || "LI" === g) (h[s] = "\n"), (t[s << 1] = y++), (t[s++ << 1 | 1] = a);
          break;
        case 3:
        case 4:
          (g = a.nodeValue),
            g.length && ((g = p ? g.replace(/\r\n?/g, "\n") : g.replace(/[\t\n\r ]+/g, " ")), (h[s] = g), (t[s << 1] = y), (y += g.length), (t[s++ << 1 | 1] = a));
      }
    }
    var e = /(?:^|\s)nocode(?:\s|$)/,
      h = [],
      y = 0,
      t = [],
      s = 0,
      l;
    a.currentStyle ? (l = a.currentStyle.whiteSpace) : window.getComputedStyle && (l = document.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
    var p = l && "pre" === l.substring(0, 3);
    m(a);
    return { a: h.join("").replace(/\n$/, ""), c: t };
  }
  function B(a, m, e, h) {
    m && ((a = { a: m, d: a }), e(a), h.push.apply(h, a.e));
  }
  function x(a, m) {
    function e(a) {
      for (var l = a.d, p = [l, "pln"], d = 0, g = a.a.match(y) || [], r = {}, n = 0, z = g.length; n < z; ++n) {
        var f = g[n],
          b = r[f],
          o = void 0,
          c;
        if (typeof b === "string") c = !1;
        else {
          var i = h[f.charAt(0)];
          if (i) (o = f.match(i[1])), (b = i[0]);
          else {
            for (c = 0; c < t; ++c) if (((i = m[c]), (o = f.match(i[1])))) {
              b = i[0];
              break;
            }
            o || (b = "pln");
          }
          if ((c = b.length >= 5 && "lang-" === b.substring(0, 5)) && !(o && typeof o[1] === "string")) (c = !1), (b = "src");
          c || (r[f] = b);
        }
        i = d;
        d += f.length;
        if (c) {
          c = o[1];
          var j = f.indexOf(c),
            k = j + c.length;
          o[2] && ((k = f.length - o[2].length), (j = k - c.length));
          b = b.substring(5);
          B(l + i, f.substring(0, j), e, p);
          B(l + i + j, c, C(b, c), p);
          B(l + i + k, f.substring(k), e, p);
        } else p.push(l + i, b);
      }
      a.e = p;
    }
    var h = {},
      y;
    (function () {
      for (var e = a.concat(m), l = [], p = {}, d = 0, g = e.length; d < g; ++d) {
        var r = e[d],
          n = r[3];
        if (n) for (var k = n.length; --k >= 0; ) h[n.charAt(k)] = r;
        r = r[1];
        n = "" + r;