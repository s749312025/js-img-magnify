const x = (s) => {
  let c = (a, m) => {
    for (const g in m)
      a.style[g] = m[g] || "";
  }, e = {
    src: s.src,
    zoom: s.zoom || 3,
    target: s.target,
    width: s.width || "auto",
    MagnifyDomWidth: s.MagnifyDomWidth || 200
  };
  const n = document.createElement("div");
  n.style.cssText = `position: relative; width: ${e.width + "px"};`, e.target.append(n);
  let p = 0, r = 0;
  const o = new Image();
  o.src = e.src, o.style.cssText = "width: 100%; display: block;", n.append(o);
  let d = 0, l = 0, i = e.MagnifyDomWidth;
  const t = document.createElement("div");
  c(t, {
    position: "absolute",
    display: "none",
    width: i + "px",
    height: i + "px",
    boxShadow: "inset 0 0 30px 3px rgba(0, 0, 0, 0.25)",
    pointerEvents: "none",
    backgroundImage: `url(${e.src})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ffffff"
  }), n.append(t), t.move = () => {
    c(t, {
      left: d - i / 2 + "px",
      top: l - i / 2 + "px",
      backgroundPositionX: -(d * e.zoom - i / 2) + "px",
      backgroundPositionY: -(l * e.zoom - i / 2) + "px",
      backgroundSize: `${p * e.zoom}px ${r * e.zoom}px`
    });
  };
  const u = () => {
    p = o.width, r = o.height, o.addEventListener("mousemove", h), o.addEventListener("mouseleave", f), o.addEventListener("mouseover", v);
  }, h = (a) => {
    d = a.pageX - n.offsetLeft, l = a.pageY - n.offsetTop, t.move && t.move();
  }, f = () => {
    t.style.display = "none";
  }, v = () => {
    t.style.display = "block";
  };
  o.onload = u;
};
let b = window;
b.magnifyImg = x;
export {
  x as default,
  x as magnifyImg
};
