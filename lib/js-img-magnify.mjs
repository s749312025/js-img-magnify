const M = (o) => {
  let s = (n, l) => {
    for (const i in l)
      n.style[i] = l[i] || "";
  }, a = (n, l, i) => n > i ? i : n < l ? l : n, e = {
    src: o.src,
    zoom: o.zoom || 3,
    target: o.target,
    width: o.width || "auto",
    MagnifyDomWidth: o.MagnifyDomWidth || 200,
    MagnifyDomStyles: o.MagnifyDomStyles || {},
    overflow: o.overflow === void 0 ? !0 : o.overflow
  };
  const r = document.createElement("div");
  r.style.cssText = `position: relative; width: ${e.width + "px"};`, e.target.append(r);
  let c = 0, p = 0;
  const d = new Image();
  d.src = e.src, d.style.cssText = "width: 100%; display: block;", r.append(d);
  let g = 0, h = 0, y = e.MagnifyDomWidth;
  const t = o.MagnifyDom || document.createElement("div");
  o.MagnifyDom && (e.MagnifyDomStyles = {}), o.MagnifyDom ? s(t, {
    backgroundRepeat: "no-repeat",
    ...e.MagnifyDomStyles
  }) : s(t, {
    position: "absolute",
    display: "none",
    width: y + "px",
    height: y + "px",
    boxShadow: "inset 0 0 30px 3px rgba(0, 0, 0, 0.25)",
    pointerEvents: "none",
    backgroundImage: `url(${e.src})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ffffff",
    ...e.MagnifyDomStyles
  }), o.MagnifyDom || r.append(t), t.move = () => {
    let n = t.getBoundingClientRect().width, l = t.getBoundingClientRect().height, i = parseInt(t.style.borderWidth) || 0, b = g - n / 2, v = h - l / 2, u = -(g * e.zoom - n / 2 + i), f = -(h * e.zoom - l / 2 + i);
    e.overflow || (b = a(b, 0, c - n), v = a(v, 0, p - l), u = a(u, -c * e.zoom + n - i, -i), f = a(f, -p * e.zoom + l - i, -i)), o.MagnifyDom ? s(t, {
      backgroundPositionX: u + "px",
      backgroundPositionY: f + "px",
      backgroundSize: `${c * e.zoom}px ${p * e.zoom}px`
    }) : s(t, {
      left: b + "px",
      top: v + "px",
      backgroundPositionX: u + "px",
      backgroundPositionY: f + "px",
      backgroundSize: `${c * e.zoom}px ${p * e.zoom}px`
    });
  };
  const x = () => {
    c = d.width, p = d.height, d.addEventListener("mousemove", k), d.addEventListener("mouseleave", D), d.addEventListener("mouseover", w);
  }, k = (n) => {
    g = n.pageX - r.offsetLeft, h = n.pageY - r.offsetTop, t.move && t.move();
  }, D = () => {
    o.MagnifyDom ? s(t, {
      backgroundImage: ""
    }) : t.style.display = "none";
  }, w = () => {
    o.MagnifyDom ? s(t, {
      backgroundImage: `url(${e.src})`
    }) : t.style.display = "block";
  };
  d.onload = x;
};
let m = window;
m.magnifyImg = M;
export {
  M as default,
  M as magnifyImg
};
