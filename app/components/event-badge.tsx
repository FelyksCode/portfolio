"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

const originalWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].startsWith("THREE.Clock:")) {
    return;
  }
  originalWarn(...args);
};

const CARD_W = 1.7;
const CARD_H = 2.3;
const CARD_T = 0.055;
const CORNER = 0.09;
const STRAP_WIDTH = 0.14;
const STRAP_SEGMENTS = 48;
const CHAIN_TOP = CARD_H / 2 + 0.24;
const REST = new THREE.Vector3(0, -0.19, -0.35);
const ANCHOR_L = new THREE.Vector3(-0.62, 2.75, -0.35);
const ANCHOR_R = new THREE.Vector3(0.62, 2.75, -0.35);
const STRAP_LEN = ANCHOR_L.distanceTo(
  new THREE.Vector3(0, REST.y + CHAIN_TOP, REST.z),
);
const MAX_STRETCH = STRAP_LEN * 1.8;
const ELASTIC_K = 45;
const ELASTIC_C = 2.6;
const BOUNDS_MIN = new THREE.Vector3(-1.0, -1.6, REST.z);
const BOUNDS_MAX = new THREE.Vector3(1.0, 1.9, REST.z);
const MAX_TILT = 1.0;
const GRAVITY = 7;
const AIR_DAMP = 0.7;

const clipRest = new THREE.Vector3(0, REST.y + CHAIN_TOP, REST.z);

function buildChain(anchor: THREE.Vector3) {
  const m2 = anchor
    .clone()
    .add(clipRest)
    .multiplyScalar(0.5)
    .add(new THREE.Vector3(0, -0.18, 0.03));
  const m1 = anchor
    .clone()
    .add(m2)
    .multiplyScalar(0.5)
    .add(new THREE.Vector3(0, -0.13, 0.02));
  return [anchor.clone(), m1, m2, clipRest.clone()];
}

const chainL = buildChain(ANCHOR_L);
const chainR = buildChain(ANCHOR_R);

function roundedRectShape(w: number, h: number, r: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

const INK = "#161b26";
const SLATE = "#5c6575";
const VERM = "#e8340e";
const AMBER = "#e8a33d";
const CARD_BG = "#fbfbf7";

const BARCODE = [
  2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 1, 4, 2, 1, 3, 2, 1, 1, 2, 1, 3, 1, 4,
  1, 1, 2, 1, 2, 3, 1, 1, 3, 2, 1, 2, 1, 1, 4, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1,
];

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const total = BARCODE.reduce((a, b) => a + b, 0);
  const unit = w / total;
  let cx = x;
  ctx.fillStyle = INK;
  for (let i = 0; i < BARCODE.length; i++) {
    const bw = BARCODE[i] * unit;
    if (i % 2 === 0) ctx.fillRect(cx, y, bw, h);
    cx += bw;
  }
}

function drawFront(ctx: CanvasRenderingContext2D) {
  const W = 512;
  const H = 720;
  ctx.fillStyle = CARD_BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(22, 27, 38, 0.16)";
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.strokeStyle = "rgba(22, 27, 38, 0.45)";
  ctx.lineWidth = 2;
  ctx.strokeRect(46, 40, 58, 58);

  ctx.font = '600 21px "IBM Plex Mono"';
  ctx.fillStyle = VERM;
  ctx.textAlign = "center";
  ctx.fillText("FI·26", 75, 78);
  ctx.textAlign = "left";
  ctx.font = '400 19px "IBM Plex Mono"';
  ctx.fillStyle = SLATE;
  ctx.textAlign = "right";
  ctx.fillText("UMN · JAKARTA, ID", W - 46, 78);
  ctx.textAlign = "left";

  ctx.strokeStyle = "rgba(22, 27, 38, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(46, 122);
  ctx.lineTo(W - 46, 122);
  ctx.stroke();

  ctx.fillStyle = INK;
  ctx.font = '700 74px "Archivo"';
  ctx.fillText("FELIX", 46, 252);
  ctx.fillText("IVANDER", 46, 344);

  ctx.fillStyle = SLATE;
  ctx.font = '500 20px "IBM Plex Mono"';
  ctx.fillText("SOFTWARE ENGINEER", 46, 400);
  ctx.fillText("BACKEND · FULL-STACK", 46, 430);

  ctx.strokeStyle = VERM;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(46, 452);
  ctx.lineTo(186, 452);
  ctx.stroke();

  ctx.fillStyle = VERM;
  ctx.beginPath();
  ctx.arc(56, 512, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = '600 22px "IBM Plex Mono"';
  ctx.fillText("OPEN TO WORK", 82, 519);

  ctx.strokeStyle = "rgba(22, 27, 38, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(46, 584);
  ctx.lineTo(W - 46, 584);
  ctx.stroke();

  ctx.fillStyle = SLATE;
  ctx.font = '400 18px "IBM Plex Mono"';
  ctx.fillText("JAKARTA TIMUR · ID", 46, 622);
  ctx.textAlign = "right";
  ctx.fillText("EXP. 2026", W - 46, 622);
  ctx.textAlign = "left";

  drawBarcode(ctx, 106, 630, 300, 42);
  ctx.fillStyle = SLATE;
  ctx.font = '400 12px "IBM Plex Mono"';
  ctx.textAlign = "center";
  ctx.fillText("ID-BDG-01 · 2026", W / 2, 692);
  ctx.textAlign = "left";

  ctx.fillStyle = VERM;
  ctx.fillRect(0, H - 12, W, 12);
}

function drawBack(ctx: CanvasRenderingContext2D) {
  const W = 512;
  const H = 720;
  ctx.fillStyle = CARD_BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(22, 27, 38, 0.16)";
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.font = '600 21px "IBM Plex Mono"';
  ctx.fillStyle = VERM;
  ctx.fillText("CONTACT", 46, 74);
  ctx.font = '400 19px "IBM Plex Mono"';
  ctx.fillStyle = SLATE;
  ctx.textAlign = "right";
  ctx.fillText("FI·26", W - 46, 74);
  ctx.textAlign = "left";

  ctx.strokeStyle = "rgba(22, 27, 38, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(46, 102);
  ctx.lineTo(W - 46, 102);
  ctx.stroke();

  ctx.font = '500 19px "IBM Plex Mono"';
  ctx.fillStyle = VERM;
  ctx.fillText("EMAIL", 46, 156);
  ctx.font = '600 26px "Archivo"';
  ctx.fillStyle = INK;
  ctx.fillText("ifelixivander@gmail.com", 46, 190);

  ctx.font = '500 19px "IBM Plex Mono"';
  ctx.fillStyle = VERM;
  ctx.fillText("PHONE", 46, 306);
  ctx.font = '600 26px "Archivo"';
  ctx.fillStyle = INK;
  ctx.fillText("0819-0261-2828", 46, 340);

  ctx.font = '500 19px "IBM Plex Mono"';
  ctx.fillStyle = VERM;
  ctx.fillText("BASE", 46, 456);
  ctx.font = '600 26px "Archivo"';
  ctx.fillStyle = INK;
  ctx.fillText("JAKARTA TIMUR · ID", 46, 490);

  ctx.strokeStyle = "rgba(22, 27, 38, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(46, 560);
  ctx.lineTo(W - 46, 560);
  ctx.stroke();

  ctx.fillStyle = AMBER;
  ctx.fillRect((W - 8) / 2, 590, 8, 8);
  ctx.fillStyle = SLATE;
  ctx.font = '400 18px "IBM Plex Mono"';
  ctx.fillText("© 2026 FELIX IVANDER", 46, 598);
  ctx.textAlign = "right";
  ctx.fillText("UMN ID-BDG-01", W - 46, 598);
  ctx.textAlign = "left";

  drawBarcode(ctx, 106, 630, 300, 42);

  ctx.fillStyle = VERM;
  ctx.fillRect(0, H - 12, W, 12);
}

function countInk(ctx: CanvasRenderingContext2D) {
  const data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
  let ink = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (Math.abs(r - 251) + Math.abs(g - 251) + Math.abs(b - 247) > 12) ink++;
  }
  return ink;
}

function makeTexture(side: "front" | "back") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  console.log("[badge]", side, "2d ctx:", ctx ? "ok" : "NULL");
  const draw = side === "front" ? drawFront : drawBack;
  try {
    if (ctx) draw(ctx);
  } catch (err) {
    console.error("[badge] face draw failed", err);
  }
  if (ctx) console.log("[badge]", side, "ink px:", countInk(ctx));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  void document.fonts.ready.then(() => {
    try {
      if (ctx) draw(ctx);
    } catch (err) {
      console.error("[badge] face redraw failed", err);
    }
    texture.needsUpdate = true;
    if (ctx) console.log("[badge]", side, "redraw ink px:", countInk(ctx));
  });
  return texture;
}

function makeStrapTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#1d2536";
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = "#e8340e";
    ctx.fillRect(0, 0, 256, 9);
    ctx.fillRect(0, 55, 256, 9);
    ctx.fillStyle = "#94a0b5";
    ctx.font = '600 20px "IBM Plex Mono"';
    ctx.textAlign = "center";
    ctx.fillText("FI·26 · FELIX IVANDER", 128, 38);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeRibbonGeometry(
  points: THREE.Vector3[],
  width: number,
  segments: number,
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const UP = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const right = new THREE.Vector3();
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPoint(t, tmp);
    curve.getTangentAt(t, tangent);
    right.crossVectors(tangent, UP);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize().multiplyScalar(width / 2);
    positions.push(p.x + right.x, p.y + right.y, p.z + right.z);
    positions.push(p.x - right.x, p.y - right.y, p.z - right.z);
    uvs.push(t, 0, t, 1);
    if (i < segments) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = i * 2 + 2;
      const d = i * 2 + 3;
      indices.push(a, d, b, a, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function updateRibbonGeometry(
  geometry: THREE.BufferGeometry,
  points: THREE.Vector3[],
  width: number,
  segments: number,
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const UP = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const right = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPoint(t, tmp);
    curve.getTangentAt(t, tangent);
    right.crossVectors(tangent, UP);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize().multiplyScalar(width / 2);
    pos.setXYZ(i * 2, p.x + right.x, p.y + right.y, p.z + right.z);
    pos.setXYZ(i * 2 + 1, p.x - right.x, p.y - right.y, p.z - right.z);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

function springToward(
  pos: THREE.Vector3,
  vel: THREE.Vector3,
  target: THREE.Vector3,
  k: number,
  c: number,
  dt: number,
) {
  vel.x += (target.x - pos.x) * k * dt - vel.x * c * dt;
  vel.y += (target.y - pos.y) * k * dt - vel.y * c * dt;
  vel.z += (target.z - pos.z) * k * dt - vel.z * c * dt;
  pos.addScaledVector(vel, dt);
}

function updateStrap(
  pts: THREE.Vector3[],
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  rm: boolean,
  dt: number,
) {
  const mid2 = pts[0]
    .clone()
    .add(pts[3])
    .multiplyScalar(0.5)
    .add(new THREE.Vector3(0, -0.2, 0.03));
  springToward(pts[2], v2, mid2, 30, rm ? 30 : 3.5, dt);
  const mid1 = pts[0]
    .clone()
    .add(pts[2])
    .multiplyScalar(0.5)
    .add(new THREE.Vector3(0, -0.15, 0.02));
  springToward(pts[1], v1, mid1, 42, rm ? 36 : 4, dt);
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function getCanvas(): HTMLCanvasElement | null {
  return document.querySelector<HTMLCanvasElement>(".badge-canvas canvas");
}

function pointerToWorld(
  dom: HTMLCanvasElement,
  camera: THREE.Camera,
  clientX: number,
  clientY: number,
) {
  const rect = dom.getBoundingClientRect();
  const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
  const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
  const vec = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
  const dir = vec.sub(camera.position).normalize();
  const t = (REST.z - camera.position.z) / dir.z;
  return camera.position.clone().add(dir.multiplyScalar(t)).setZ(REST.z);
}

function Badge() {
  const group = useRef<THREE.Group>(null);
  const strapL = useRef<THREE.Mesh>(null);
  const strapR = useRef<THREE.Mesh>(null);
  const camera = useThree((state) => state.camera);

  const active = useRef(false);
  const offset = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3().copy(REST));
  const posVel = useRef(new THREE.Vector3());
  const strapVel = useRef([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const rotY = useRef(0);
  const rotX = useRef(0);
  const rotVelY = useRef(0);
  const rotVelX = useRef(0);
  const lastPointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);
  const firstFrame = useRef(true);

  const textures = useMemo(
    () => ({ front: makeTexture("front"), back: makeTexture("back") }),
    [],
  );

  const frontMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: textures.front,
        toneMapped: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      }),
    [textures],
  );
  const backMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: textures.back,
        toneMapped: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      }),
    [textures],
  );

  const cardGeometry = useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(CARD_W, CARD_H, CORNER),
      {
        depth: CARD_T,
        bevelEnabled: true,
        bevelSize: 0.01,
        bevelThickness: 0.01,
        bevelSegments: 2,
      },
    );
    geometry.translate(0, 0, -CARD_T / 2);
    return geometry;
  }, []);

  const faceGeometry = useMemo(() => {
    const geometry = new THREE.ShapeGeometry(
      roundedRectShape(CARD_W, CARD_H, CORNER),
    );
    const uv = geometry.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, uv.getX(i) / CARD_W + 0.5, uv.getY(i) / CARD_H + 0.5);
    }
    uv.needsUpdate = true;
    return geometry;
  }, []);

  const strapTexture = useMemo(() => makeStrapTexture(), []);
  const strapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: strapTexture,
        side: THREE.DoubleSide,
        roughness: 0.6,
      }),
    [strapTexture],
  );
  const strapGeometryL = useMemo(
    () => makeRibbonGeometry(chainL.map((p) => p.clone()), STRAP_WIDTH, STRAP_SEGMENTS),
    [],
  );
  const strapGeometryR = useMemo(
    () => makeRibbonGeometry(chainR.map((p) => p.clone()), STRAP_WIDTH, STRAP_SEGMENTS),
    [],
  );
  useEffect(
    () => () => {
      strapTexture.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      strapMaterial.dispose();
      textures.front.dispose();
      textures.back.dispose();
      strapGeometryL.dispose();
      strapGeometryR.dispose();
    },
    [strapTexture, frontMaterial, backMaterial, strapMaterial, textures, strapGeometryL, strapGeometryR],
  );

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const handleMove = (event: PointerEvent) => {
      if (!active.current || !group.current) return;
      const point = pointerToWorld(canvas, camera, event.clientX, event.clientY);
      target.current.copy(point).sub(offset.current);
      const clipTarget = new THREE.Vector3(
        target.current.x,
        target.current.y + CHAIN_TOP,
        target.current.z,
      );
      for (let i = 0; i < 2; i++) {
        for (const a of [ANCHOR_L, ANCHOR_R]) {
          const d = new THREE.Vector3().subVectors(clipTarget, a);
          const dist = d.length();
          if (dist > MAX_STRETCH) {
            d.multiplyScalar(MAX_STRETCH / dist);
            clipTarget.copy(a).add(d);
          }
        }
      }
      target.current
        .set(clipTarget.x, clipTarget.y - CHAIN_TOP, clipTarget.z)
        .clamp(BOUNDS_MIN, BOUNDS_MAX);
      const dx = event.clientX - lastPointer.current.x;
      const dy = event.clientY - lastPointer.current.y;
      lastPointer.current = { x: event.clientX, y: event.clientY };
      rotY.current += dx * 0.01;
      rotVelY.current = dx * 0.01;
      rotX.current = THREE.MathUtils.clamp(
        rotX.current - dy * 0.004,
        -MAX_TILT,
        MAX_TILT,
      );
      rotVelX.current = -dy * 0.004;
    };
    const handleUp = () => {
      active.current = false;
      canvas.style.cursor = "grab";
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("blur", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("blur", handleUp);
    };
  }, [camera]);

  const handleDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    active.current = true;
    lastPointer.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    };
    posVel.current.set(0, 0, 0);
    rotVelY.current = 0;
    rotVelX.current = 0;
    const canvas = getCanvas();
    if (canvas) canvas.style.cursor = "grabbing";
    const point = pointerToWorld(
      getCanvas()!,
      camera,
      event.nativeEvent.clientX,
      event.nativeEvent.clientY,
    );
    offset.current.copy(point).sub(group.current!.position);
  };

  useFrame((_state, delta) => {
    const g = group.current;
    if (!g) return;
    if (firstFrame.current) {
      firstFrame.current = false;
      console.log(
        "[badge] frame 1 ok | maps wired:",
        frontMaterial.map === textures.front,
        backMaterial.map === textures.back,
      );
    }
    const dt = Math.min(delta, 0.05);
    const rm = reduced.current;

    if (active.current) {
      g.position.lerp(target.current, 1 - Math.exp(-22 * dt));
      g.rotation.y = damp(g.rotation.y, rotY.current, 18, dt);
      g.rotation.x = damp(g.rotation.x, rotX.current, 18, dt);
      g.rotation.z = damp(g.rotation.z, 0.05, 6, dt);
    } else {
      const dampFactor = rm ? 6 : AIR_DAMP;
      posVel.current.multiplyScalar(Math.exp(-dampFactor * dt));
      posVel.current.y -= GRAVITY * dt;
      g.position.addScaledVector(posVel.current, dt);

      rotVelY.current +=
        (0 - rotY.current) * (rm ? 6 : 1.8) * dt - rotVelY.current * (rm ? 4 : 1.8) * dt;
      rotY.current += rotVelY.current * dt;
      rotVelX.current +=
        (0 - rotX.current) * (rm ? 6 : 1.8) * dt - rotVelX.current * (rm ? 4 : 1.8) * dt;
      rotX.current += rotVelX.current * dt;
      g.rotation.y = rotY.current;
      g.rotation.x = rotX.current;
      g.rotation.z = damp(g.rotation.z, 0, 6, dt);
    }

    const anchors = [ANCHOR_L, ANCHOR_R];
    if (!active.current) {
      for (const a of anchors) {
        const clipP = new THREE.Vector3(0, CHAIN_TOP, 0)
          .applyQuaternion(g.quaternion)
          .add(g.position);
        const d = new THREE.Vector3().subVectors(clipP, a);
        const dist = d.length();
        if (dist > STRAP_LEN) {
          d.normalize();
          const vRad = posVel.current.dot(d);
          const accel = -(ELASTIC_K * (dist - STRAP_LEN) + ELASTIC_C * vRad);
          posVel.current.addScaledVector(d, accel * dt);
        }
      }
    }
    for (const a of anchors) {
      const clipP = new THREE.Vector3(0, CHAIN_TOP, 0)
        .applyQuaternion(g.quaternion)
        .add(g.position);
      const d = new THREE.Vector3().subVectors(clipP, a);
      const dist = d.length();
      if (dist > MAX_STRETCH) {
        d.multiplyScalar((dist - MAX_STRETCH) / dist);
        g.position.sub(d);
      }
    }
    g.position.clamp(BOUNDS_MIN, BOUNDS_MAX);

    const clipNow = new THREE.Vector3(0, CHAIN_TOP, 0)
      .applyQuaternion(g.quaternion)
      .add(g.position);
    chainL[3].copy(clipNow);
    chainR[3].copy(clipNow);
    updateStrap(chainL, strapVel.current[0], strapVel.current[1], rm, dt);
    updateStrap(chainR, strapVel.current[2], strapVel.current[3], rm, dt);

    if (strapL.current) {
      updateRibbonGeometry(
        strapL.current.geometry,
        chainL,
        STRAP_WIDTH,
        STRAP_SEGMENTS,
      );
    }
    if (strapR.current) {
      updateRibbonGeometry(
        strapR.current.geometry,
        chainR,
        STRAP_WIDTH,
        STRAP_SEGMENTS,
      );
    }
  });

  return (
    <>
      <group ref={group} position={REST.toArray()}>
        <mesh geometry={cardGeometry}>
          <meshPhysicalMaterial
            color="#f7f7f2"
            roughness={0.34}
            metalness={0.04}
            clearcoat={0.45}
            clearcoatRoughness={0.35}
          />
        </mesh>
        <mesh
          geometry={faceGeometry}
          material={frontMaterial}
          position={[0, 0, CARD_T / 2 + 0.02]}
          onPointerDown={handleDown}
        />
        <mesh
          geometry={faceGeometry}
          material={backMaterial}
          position={[0, 0, -(CARD_T / 2 + 0.02)]}
          rotation={[0, Math.PI, 0]}
        />
        <mesh position={[0, CARD_H / 2 + 0.08, 0]}>
          <torusGeometry args={[0.12, 0.025, 12, 32]} />
          <meshStandardMaterial color="#c9ced8" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, CARD_H / 2 + 0.17, 0]}>
          <boxGeometry args={[0.2, 0.14, 0.07]} />
          <meshStandardMaterial color="#1d2536" roughness={0.5} />
        </mesh>
      </group>
      <mesh ref={strapL} geometry={strapGeometryL} material={strapMaterial} />
      <mesh ref={strapR} geometry={strapGeometryR} material={strapMaterial} />
    </>
  );
}

export default function EventBadge() {
  return (
    <Canvas
      className="badge-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.1, 7.5], fov: 35 }}
      style={{
        position: "absolute",
        left: "-25%",
        top: "-8%",
        width: "150%",
        height: "150%",
        overflow: "visible",
        touchAction: "pan-y",
      }}
      aria-hidden
      onCreated={() => console.log("[badge] scene mounted")}
      fallback={
        <p className="badge-error">badge render failed — see console</p>
      }
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} />
      <Badge />
    </Canvas>
  );
}
