var dt = function() {
  function n(b) {
    var c = v,
      e = b.trainingSet,
      d = b.ignoredAttributes,
      a = {};
    if (d)
      for (var f in d) a[d[f]] = !0;
    this.root = c({
      trainingSet: e,
      ignoredAttributes: a,
      categoryAttr: b.categoryAttr || "category",
      minItemsCount: b.minItemsCount || 1,
      entropyThrehold: b.entropyThrehold || 0.01,
      maxTreeDepth: b.maxTreeDepth || 70
    })
  }

  function p(b, c) {
    for (var e = b.trainingSet, d = [], a = 0; a < c; a++) d[a] = [];
    for (a = e.length - 1; 0 <= a; a--) d[a % c].push(e[a]);
    e = [];
    for (a = 0; a < c; a++) {
      b.trainingSet = d[a];
      var f = new n(b);
      e.push(f)
    }
    this.trees = e
  }

  function q(b,
    c) {
    for (var e = {}, d = b.length - 1; 0 <= d; d--) e[b[d][c]] = 0;
    for (d = b.length - 1; 0 <= d; d--) e[b[d][c]] += 1;
    return e
  }

  function w(b, c) {
    var e = q(b, c),
      d = 0,
      a, f;
    for (f in e) a = e[f] / b.length, d += -a * Math.log(a);
    return d
  }

  function x(b, c) {
    var e = q(b, c),
      d = 0,
      a, f;
    for (f in e) e[f] > d && (d = e[f], a = f);
    return a
  }

  function v(b) {
    var c = b.trainingSet,
      e = b.minItemsCount,
      d = b.categoryAttr,
      a = b.entropyThrehold,
      f = b.maxTreeDepth,
      n = b.ignoredAttributes;
    if (0 == f || c.length <= e) return {
      category: x(c, d)
    };
    e = w(c, d);
    if (e <= a) return {
      category: x(c, d)
    };
    for (var m = {}, a = {
          gain: 0
        },
        y = c.length - 1; 0 <= y; y--) {
      var p = c[y],
        k;
      for (k in p)
        if (k != d && !n[k]) {
          var s = p[k],
            t;
          t = "number" == typeof s ? ">=" : "==";
          var r = k + t + s;
          if (!m[r]) {
            m[r] = !0;
            var r = D[t],
              g;
            g = c;
            for (var l = k, z = r, h = s, q = [], B = [], u = void 0, C = void 0, A = g.length - 1; 0 <= A; A--) u = g[A], C = u[l], z(C, h) ? q.push(u) : B.push(u);
            g = {
              match: q,
              notMatch: B
            };
            l = w(g.match, d);
            z = w(g.notMatch, d);
            h = 0;
            h += l * g.match.length;
            h += z * g.notMatch.length;
            h /= c.length;
            l = e - h;
            l > a.gain && (a = g, a.predicateName = t, a.predicate = r, a.attribute = k, a.pivot = s, a.gain = l)
          }
        }
    }
    if (!a.gain) return {
      category: x(c, d)
    };
    b.maxTreeDepth = f - 1;
    b.trainingSet = a.match;
    c = v(b);
    b.trainingSet = a.notMatch;
    b = v(b);
    return {
      attribute: a.attribute,
      predicate: a.predicate,
      predicateName: a.predicateName,
      pivot: a.pivot,
      match: c,
      notMatch: b,
      matchedCount: a.match.length,
      notMatchedCount: a.notMatch.length
    }
  }
  n.prototype.predict = function(b) {
    a: {
      for (var c = this.root, e, d, a;;) {
        if (c.category) {
          b = c.category;
          break a
        }
        e = c.attribute;
        e = b[e];
        d = c.predicate;
        a = c.pivot;
        c = d(e, a) ? c.match : c.notMatch
      }
      b = void 0
    }
    return b
  };
  p.prototype.predict = function(b) {
    var c = this.trees,
      e = {},
      d;
    for (d in c) {
      var a = c[d].predict(b);
      e[a] = e[a] ? e[a] + 1 : 1
    }
    return e
  };
  var D = {
      "==": function(b, c) {
        return b == c
      },
      ">=": function(b, c) {
        return b >= c
      }
    },
    m = {};
  m.DecisionTree = n;
  m.RandomForest = p;
  return m
}();
// feed and get
function getPriority(ros, nawod, naslo, nawoz, stres, chwast, wiek, dojrz) {
  var test = {
    roslina: ros,
    nawodnienie: nawod,
    naslonecznienie: naslo,
    nawoz: nawoz,
    poziom_stresu: stres,
    chwasty: chwast,
    wiek: wiek,
    dojrzala: dojrz
  };

  var decisionTreePrediction = decisionTree.predict(test);

  // Displaying predictions - to mozesz wywalic
  var item = JSON.stringify(test, null, 0);
  document.getElementById('testingItem').innerHTML = item;
  var decision = JSON.stringify(decisionTreePrediction, null, 0);
  document.getElementById('decisionTreePrediction').innerHTML = decision;
  if (decision == "tak") {
    return true;
  } else {
    return false;
  }
}
// Training set
var data = [{
    roslina: 'Paproc',
    nawodnienie: 0.9,
    naslonecznienie: 0.3,
    nawoz: 0.1,
    poziom_stresu: 0.7,
    chwasty: 'nie',
    wiek: 15,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Paproc',
    nawodnienie: 0.3,
    naslonecznienie: 0.9,
    nawoz: 0.2,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 30,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Paproc',
    nawodnienie: 0.9,
    naslonecznienie: 0.5,
    nawoz: 0.7,
    poziom_stresu: 0.2,
    chwasty: 'nie',
    wiek: 11,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Paproc',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.7,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Papryka',
    nawodnienie: 0.1,
    naslonecznienie: 0.1,
    nawoz: 0.6,
    poziom_stresu: 0.3,
    chwasty: 'tak',
    wiek: 13,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Papryka',
    nawodnienie: 0.3,
    naslonecznienie: 0.4,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 32,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Papryka',
    nawodnienie: 1,
    naslonecznienie: 0.3,
    nawoz: 0.8,
    poziom_stresu: 0.3,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Papryka',
    nawodnienie: 0.7,
    naslonecznienie: 0.3,
    nawoz: 0.9,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Ogorek',
    nawodnienie: 0.9,
    naslonecznienie: 0.1,
    nawoz: 0.2,
    poziom_stresu: 0.7,
    chwasty: 'tak',
    wiek: 14,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Ogorek',
    nawodnienie: 1,
    naslonecznienie: 0.5,
    nawoz: 0.1,
    poziom_stresu: 0.9,
    chwasty: 'tak',
    wiek: 33,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Ogorek',
    nawodnienie: 0.8,
    naslonecznienie: 0.7,
    nawoz: 0.6,
    poziom_stresu: 0.2,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Ogorek',
    nawodnienie: 1,
    naslonecznienie: 0.8,
    nawoz: 0.8,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 19,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Pomidor',
    nawodnienie: 0.2,
    naslonecznienie: 0.6,
    nawoz: 0.1,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 1,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Pomidor',
    nawodnienie: 0.1,
    naslonecznienie: 0.3,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 34,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Pomidor',
    nawodnienie: 0.9,
    naslonecznienie: 1,
    nawoz: 0.8,
    poziom_stresu: 0.1,
    chwasty: 'tak',
    wiek: 2,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Pomidor',
    nawodnienie: 0.9,
    naslonecznienie: 1,
    nawoz: 0.9,
    poziom_stresu: 0.1,
    chwasty: 'tak',
    wiek: 33,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Cebula',
    nawodnienie: 0.9,
    naslonecznienie: 0.9,
    nawoz: 0.8,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 32,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Cebula',
    nawodnienie: 0.9,
    naslonecznienie: 0.1,
    nawoz: 0.3,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 18,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Cebula',
    nawodnienie: 0.1,
    naslonecznienie: 0.3,
    nawoz: 0.1,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 30,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Cebula',
    nawodnienie: 0.1,
    naslonecznienie: 0.1,
    nawoz: 0.7,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 24,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Żyto',
    nawodnienie: 0.8,
    naslonecznienie: 0.8,
    nawoz: 0.9,
    poziom_stresu: 0.1,
    chwasty: 'tak',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Żyto',
    nawodnienie: 0.9,
    naslonecznienie: 0.7,
    nawoz: 0.9,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 17,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Żyto',
    nawodnienie: 0.1,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 14,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Żyto',
    nawodnienie: 0.4,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.9,
    chwasty: 'tak',
    wiek: 30,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Ziemniaki',
    nawodnienie: 0.9,
    naslonecznienie: 0.9,
    nawoz: 0.8,
    poziom_stresu: 0.2,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Ziemniaki',
    nawodnienie: 0.6,
    naslonecznienie: 0.6,
    nawoz: 0.1,
    poziom_stresu: 0.9,
    chwasty: 'nie',
    wiek: 38,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Ziemniaki',
    nawodnienie: 0.9,
    naslonecznienie: 0.8,
    nawoz: 0.8,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 10,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Ziemniaki',
    nawodnienie: 0.9,
    naslonecznienie: 0.3,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 10,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Sałata',
    nawodnienie: 0.1,
    naslonecznienie: 0.3,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 30,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Sałata',
    nawodnienie: 0.9,
    naslonecznienie: 1,
    nawoz: 1,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 7,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Sałata',
    nawodnienie: 1,
    naslonecznienie: 0.7,
    nawoz: 0.6,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Sałata',
    nawodnienie: 0.1,
    naslonecznienie: 0.7,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 20,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Burak',
    nawodnienie: 0.9,
    naslonecznienie: 1,
    nawoz: 0.9,
    poziom_stresu: 0.1,
    chwasty: 'tak',
    wiek: 36,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Burak',
    nawodnienie: 0.7,
    naslonecznienie: 0.9,
    nawoz: 0.8,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Burak',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Burak',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Marchew',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Marchew',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Marchew',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Marchew',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Pietruszka',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Pietruszka',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Pietruszka',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 38,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Pietruszka',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Fasola',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Fasola',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Fasola',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'niw',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Fasola',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 34,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Kukurydza',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Kukurydza',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Kukurydza',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Kukurydza',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 37,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Groszek',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Groszek',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Groszek',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 30,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Groszek',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Kapusta',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Kapusta',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Kapusta',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Kapusta',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 31,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Chrzan',
    nawodnienie: 0.6,
    naslonecznienie: 1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 26,
    dojrzala: 'tak',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Chrzan',
    nawodnienie: 0.7,
    naslonecznienie: 0.5,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'nie',
    wiek: 9,
    dojrzala: 'nie',
    warta_uwagi: 'nie'
  },
  {
    roslina: 'Chrzan',
    nawodnienie: 0.3,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.1,
    chwasty: 'nie',
    wiek: 28,
    dojrzala: 'nie',
    warta_uwagi: 'tak'
  },
  {
    roslina: 'Chrzan',
    nawodnienie: 0.2,
    naslonecznienie: 0.1,
    nawoz: 0.5,
    poziom_stresu: 0.5,
    chwasty: 'tak',
    wiek: 36,
    dojrzala: 'tak',
    warta_uwagi: 'tak'
  }
];

// Configuration
var config = {
  trainingSet: data,
  categoryAttr: 'warta_uwagi',
  ignoredAttributes: ['roslina']
};

// Building Decision Tree
var decisionTree = new dt.DecisionTree(config);

var ros = "Bataty";
var nawod = Math.random();
var naslo = Math.random();
var nawoz = Math.random();
var stres = Math.random();
var chwast = "tak";
var wiek = Math.floor(Math.random() * 41);
var dojrz = "";
if (wiek >= 30) {
  dojrz = "tak";
} else {
  dojrz = "nie";
}
var a = getPriority(ros, nawod, naslo, nawoz, stres, chwast, wiek, dojrz);
