const glut_q_factor = 0.98;

function glutenrot(rotfactor) {
  const maxrot = 0.7;
  return 1 - Math.pow(rotfactor / maxrot, 1.75);
}

function uy(T) {
  const ay = 0.0124;
  const by = 2.981;
  const cy = -0.3355;
  const T0 = 36;
  const x = T0 - T;
  const uyval = ay * Math.pow(x, by) * Math.exp(cy * x);
  return uyval;
}

function ph_slowdown(rotfactor) {
  const maxrot = 0.7;
  const ph_slowdown_val = 1 - Math.pow(rotfactor / maxrot, 2);
  return ph_slowdown_val;
}

function u_glut(stiffness) {
  const xc = 1;
  const by = 7;
  const x0 = 2.0;
  const cy = -by / (x0 - xc);
  const ay = Math.pow(x0 - xc, -by) * Math.exp(-cy * (x0 - xc));
  const x = x0 - stiffness;
  const u_glut_val = ay * Math.pow(x, by) * Math.exp(cy * x);
  return u_glut_val;
}

function gluten_quality(h, xi, rotfactor) {
  const stiffness =
    stiff_xi(xi) * stiff_h(h) * glutenrot(rotfactor) * glut_q_factor;
  const gluten_quality_val = u_glut(stiffness);
  return gluten_quality_val;
}

function ulb(T) {
  const alb = 0.095;
  const blb = 1.75;
  const clb = -0.2045;
  const Tlb0 = 41;
  const x = Tlb0 - T;
  const test = Math.pow(x, blb);
  const ulbval = alb * Math.pow(x, blb) * Math.exp(clb * x);
  console.log({ ulbval, x, blb, test });
  return ulbval;
}

function uh(h) {
  const umin = 0.9;
  const hmax = 0.6;
  const th = 0.3;
  const uh_val = umin + (1 - umin) * (1 - Math.exp((hmax - h) / th));
  return uh_val;
}

function stiff_h(h) {
  const umin = 0.75;
  const hmax = 0.56;
  const th = 0.07;
  const hc = 1.2;
  const d = 13;
  const u0 = 1.3;
  const stiff_h_val =
    u0 *
    (umin + (1 - umin) * Math.exp((hmax - h) / th)) *
    (1 - Math.pow(h / hc, d));
  return stiff_h_val;
}

function ui(xi) {
  const ximax = 0.07;
  const ai = 1.4;
  const ui0 = 1;
  const ui_val = ui0 * (1 - Math.pow(xi / ximax, ai));
  return ui_val;
}

function stiff_xi(xi) {
  const ximin = 0;
  const txi = 0.01;
  const u0 = 1.05;
  const umin = 0.85;
  const stiff_xi_val =
    u0 * (umin + (1 - umin) * (1 - Math.exp((ximin - xi) / txi)));
  return stiff_xi_val;
}

function uall(T, h, xi, u0, rotfactor) {
  const uall_val =
    u0 *
    uy(T) *
    uh(h, rotfactor) *
    ui(xi) *
    ph_slowdown(rotfactor) *
    gluten_quality(h, xi, rotfactor);
  return uall_val;
}

function uall_lb(T, h, xi, ulb0, rotfactor) {
  console.log(T);
  console.log(ulb(T));
  const uall_lb_val =
    ulb0 *
    ulb(T) *
    uh(h, rotfactor) *
    ui(xi) *
    ph_slowdown(rotfactor) *
    gluten_quality(h, xi, rotfactor);
  return uall_lb_val;
}

export function uall_ave(temp, hydration, salt, speed, innorot) {
  const uall_ave_val =
    (uall(temp, hydration, salt, speed, innorot) +
      uall_lb(temp, hydration, salt, speed, innorot)) /
    2;
  return uall_ave_val;
}
