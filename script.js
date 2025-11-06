// Hero particle background (lightweight)
(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize(){
    w = canvas.width = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
  }

  function rand(min,max){return Math.random()*(max-min)+min}

  function init(){
    resize();
    particles = Array.from({length: Math.round(Math.min(120, w*h/5000))}, ()=>({
      x: rand(0,w), y: rand(0,h), vx: rand(-0.3,0.3), vy: rand(-0.2,0.2), r: rand(0.6,1.6)
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    // draw connections
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,209,255,0.08)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      // connect nearby
      for(let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,168,214,'+ (0.12 - d/110*0.1) +')';
          ctx.lineWidth = 1*(1 - d/110);
          ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', ()=>{ resize(); init(); });
  init(); requestAnimationFrame(step);

  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  toggle && toggle.addEventListener('click', ()=>{
    if(nav.style.display==='flex') nav.style.display='none'; else nav.style.display='flex';
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
})();
