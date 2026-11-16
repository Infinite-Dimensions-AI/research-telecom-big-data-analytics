import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { evaluateBaseline, sampleScenario } from '@infinite-dimensions-ai/research-telecom-big-data-analytics-core';
import './style.css';

function NetworkScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    const count = 21;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      const y = 1 - 2 * (i + 0.5) / count;
      const radius = Math.sqrt(1 - y * y);
      const point = new THREE.Vector3(Math.cos(theta)*radius*3.35, y*3.35, Math.sin(theta)*radius*3.35);
      points.push(point);
      const material = new THREE.MeshBasicMaterial({color: i % 4 === 0 ? 0xffffff : '#a397ff'});
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(i % 4 === 0 ? .14 : .085, 1), material);
      mesh.position.copy(point);
      group.add(mesh);
    }
    const segments: number[] = [];
    for (let i=0;i<count;i++) for (let j=i+1;j<count;j++) if(points[i].distanceTo(points[j]) < 2.65) segments.push(...points[i].toArray(), ...points[j].toArray());
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3));
    const lines = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({color:'#a397ff',transparent:true,opacity:.33}));
    group.add(lines);
    const onResize = () => { const { width, height } = element.getBoundingClientRect(); if (!width || !height) return; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); };
    const resize = new ResizeObserver(onResize); resize.observe(element); onResize();
    let frame=0; let raf=0; let pointer=0;
    const onPointer = (event: PointerEvent) => { const rect=element.getBoundingClientRect();pointer=((event.clientX-rect.left)/Math.max(rect.width,1)-0.5)*0.4; };
    element.addEventListener('pointermove',onPointer);
    const tick = () => { frame+=0.006;group.rotation.y=frame+pointer;group.rotation.x=Math.sin(frame*.45)*.18;renderer.render(scene,camera);raf=requestAnimationFrame(tick); };
    tick();
    return () => { cancelAnimationFrame(raf); resize.disconnect(); element.removeEventListener('pointermove',onPointer); group.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(o.material as THREE.Material).dispose()}});lineGeometry.dispose();(lines.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove(); };
  }, []);
  return <div className="scene" ref={host} aria-label="Animated abstract research graph" />;
}
function App(){ const result=evaluateBaseline(sampleScenario); return <main>
  <nav><strong>INFINITE DIMENSIONS / RESEARCH</strong><a href="https://github.com/Infinite-Dimensions-AI/research-telecom-big-data-analytics">Source repository</a></nav>
  <div className="hero"><div className="copy"><p className="eyebrow">2012–2014 · Telecommunications analytics research</p><h1>Telecommunications Big Data Analytics Research</h1><p className="summary">Reconstruct Telecommunications industry-aligned analytics across business and operations support: churn, customer lifetime value, influence graphs, proactive service assurance, retention offers, fraud and next-best-action decision systems.</p><p className="question">How do operational and social relationships improve prediction and intervention decisions in historical telecom data?</p><div className="actions"><a href="/research-telecom-big-data-analytics/">Research documentation</a><a href="https://github.com/Infinite-Dimensions-AI/research-telecom-big-data-analytics/wiki">Wiki</a></div></div><NetworkScene /></div>
  <section className="output"><span>SYNTHETIC BASELINE · DEMONSTRATION ONLY</span><strong>{result.value.toFixed(3)} <small>{result.unit}</small></strong><p>{result.label}</p><p>No historical customer data, commercial datasets or measured results are implied.</p></section>
  <footer>Experimental interactive research visualization · React + TypeScript + Three.js</footer>
</main>};
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
