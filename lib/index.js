var a = (i, t, e) => new Promise((s, o) => {
  var c = n => {
    try {
      r(e.next(n))
    } catch (u) {
      o(u)
    }
  }, m = n => {
    try {
      r(e.throw(n))
    } catch (u) {
      o(u)
    }
  }, r = n => n.done ? s(n.value) : Promise.resolve(n.value).then(c, m);
  r((e = e.apply(i, t)).next())
});
var p = {issueOpenedReply: "Thanks for opening this issue!", prOpenedReply: "Thanks for submit this pr!"};
module.exports = i => {
  i.on("issues.opened", e => a(exports, null, function* () {
    let s = yield t(e), o = e.issue({body: s.issueOpenedReply});
    yield e.octokit.issues.createComment(o)
  })), i.on("pull_request.opened", e => a(exports, null, function* () {
    let s = yield t(e), o = e.issue({body: s.issueOpenedReply});
    yield e.octokit.issues.createComment(o), i.log.info("pull_request.opened", o, e)
  }));
  let t = e => a(exports, null, function* () {
    var s;
    return (s = yield e.config("config.yml")) != null ? s : p
  })
};
