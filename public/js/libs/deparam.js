function deparam(p) {
  var ret = {},
    seg = p.replace(/^\?/, "").split("&"),
    len = seg.length,
    i = 0,
    s;
  for (; i < len; i++) {
    if (!seg[i]) {
      continue;
    }
    s = seg[i].split("=");
    ret[s[0]] = s[1];
  }
  return ret;
}
