#
# RequireJS text 0.26.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
# Available via the MIT or new BSD license.
# see: http://github.com/jrburke/requirejs for details
#
(->
  j = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"]
  l = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/i
  m = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/i
  n = typeof location isnt "undefined" and location.href
  i = []
  define ->
    e = undefined
    h = undefined
    k = undefined
    (if typeof window isnt "undefined" and window.navigator and window.document then h = (a, b) ->
      c = e.createXhr()
      c.open "GET", a, not 0
      c.onreadystatechange = ->
        c.readyState is 4 and b(c.responseText)

      c.send null
     else (if typeof process isnt "undefined" and process.versions and process.versions.node then (k = require.nodeRequire("fs")
    h = (a, b) ->
      b k.readFileSync(a, "utf8")

    ) else typeof Packages isnt "undefined" and (h = (a, b) ->
      c = new java.io.File(a)
      g = java.lang.System.getProperty("line.separator")
      c = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(c), "utf-8"))
      d = undefined
      f = undefined
      e = ""
      try
        d = new java.lang.StringBuffer
        (f = c.readLine()) and f.length() and f.charAt(0) is 65279 and (f = f.substring(1))
        d.append(f)
        while (f = c.readLine()) isnt null
          d.append(g)
          d.append(f)
        e = String(d.toString())
      finally
        c.close()
      b e
    )))
    e =
      version: "0.26.0"
      strip: (a) ->
        if a
          a = a.replace(l, "")
          b = a.match(m)
          b and (a = b[1])
        else
          a = ""
        a

      jsEscape: (a) ->
        a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace /[\r]/g, "\\r"

      createXhr: ->
        a = undefined
        b = undefined
        c = undefined
        if typeof XMLHttpRequest isnt "undefined"
          return new XMLHttpRequest
        else
          b = 0
          while b < 3
            c = j[b]
            try
              a = new ActiveXObject(c)
            if a
              j = [c]
              break
            b++
        throw Error("createXhr(): XMLHttpRequest not available")  unless a
        a

      get: h
      parseName: (a) ->
        b = not 1
        c = a.indexOf(".")
        e = a.substring(0, c)
        a = a.substring(c + 1, a.length)
        c = a.indexOf("!")
        c isnt -1 and (b = a.substring(c + 1, a.length)
        b = b is "strip"
        a = a.substring(0, c)
        )
        moduleName: e
        ext: a
        strip: b

      xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/
      canUseXhr: (a, b, c, g) ->
        d = e.xdRegExp.exec(a)
        f = undefined
        return not 0  unless d
        a = d[2]
        d = d[3]
        d = d.split(":")
        f = d[1]
        d = d[0]
        (not a or a is b) and (not d or d is c) and (not f and not d or f is g)

      finishLoad: (a, b, c, g, d) ->
        c = (if b then e.strip(c) else c)
        d.isBuild and d.inlineText and (i[a] = c)
        g c

      load: (a, b, c, g) ->
        d = e.parseName(a)
        f = d.moduleName + "." + d.ext
        h = b.toUrl(f)
        (if not n or e.canUseXhr(h) then e.get(h, (b) ->
          e.finishLoad a, d.strip, b, c, g
        ) else b([f], (a) ->
          e.finishLoad d.moduleName + "." + d.ext, d.strip, a, c, g
        ))

      write: (a, b, c) ->
        if b of i
          g = e.jsEscape(i[b])
          c "define('" + a + "!" + b + "', function () { return '" + g + "';});\n"

      writeFile: (a, b, c, g, d) ->
        b = e.parseName(b)
        f = b.moduleName + "." + b.ext
        h = c.toUrl(b.moduleName + "." + b.ext) + ".js"
        e.load f, c, (->
          e.write a, f, ((a) ->
            g h, a
          ), d
        ), d

)()
