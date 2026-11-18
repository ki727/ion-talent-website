const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs'); const assert=require('node:assert/strict');
const out='docs/qa/issue-1';const origin='http://127.0.0.1:3001';const paths=['/global','/global/uk','/global/europe','/global/us','/global/middle-east','/global/asia-pacific'];
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const capable=()=>{Object.defineProperty(navigator,'hardwareConcurrency',{value:8,configurable:true});Object.defineProperty(navigator,'deviceMemory',{value:8,configurable:true})};
 const report={pages:[],fallbacks:[],links:[],menus:[],forms:[],errors:[]};
 for (const [device,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})) {
  const context=await browser.newContext({viewport}); await context.addInitScript(capable); const page=await context.newPage();
  await page.addInitScript(()=>{window.__cls=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true})});
  page.on('response',r=>{if(r.status()>=400)report.errors.push({device,resource:r.url(),status:r.status()})});
  page.on('pageerror',e=>report.errors.push({device,url:page.url(),message:e.message}));
  page.on('console',m=>{if(['error','warning'].includes(m.type())) report.errors.push({device,url:page.url(),type:m.type(),message:m.text()})});
  for (const path of paths) {
   const response=await page.goto(origin+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1300);
   const slug=path==='/global'?'global':path.split('/').pop();
   await page.screenshot({path:`${out}/screenshots/after-${slug}-${device}-hero.png`,timeout:60000});
   for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=Math.round(viewport.height*.7)) {await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(100)}
   await page.waitForTimeout(650);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(500);
   await page.screenshot({path:`${out}/screenshots/after-${slug}-${device}-full.png`,fullPage:true,timeout:60000});
   const data=await page.evaluate(()=>({bodyFont:getComputedStyle(document.body).fontFamily,headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),heroBackground:getComputedStyle(document.querySelector('main section')||document.querySelector('.ion-home-hero')).backgroundColor,overflow:document.documentElement.scrollWidth>innerWidth,hiddenReveals:[...document.querySelectorAll('.fade-up')].filter(e=>getComputedStyle(e).opacity==='0').length,videoCount:document.querySelectorAll('video').length,canvas:[...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height})),robots:document.querySelector('meta[name="robots"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,cls:window.__cls,failedImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),mediaRequests:performance.getEntriesByType('resource').filter(r=>/\.mp4/.test(r.name)).map(r=>r.name)}));
   assert.equal(data.overflow,false,path+' overflow');assert.equal(data.hiddenReveals,0);assert.match(data.bodyFont,/Inter/);assert.match(data.headingFont,/Raleway/);assert(data.fonts.some(f=>f.includes('Inter')));assert(data.fonts.some(f=>f.includes('Raleway')));assert.match(data.robots,/noindex/);assert.equal(data.canonical,undefined);assert.equal(data.failedImages.length,0);
   if(path!='/global')assert.equal(data.heroBackground,'rgb(15, 23, 42)');if(path==='/global'){assert.equal(data.videoCount,0);assert.equal(data.mediaRequests.length,0)}else assert.equal(data.videoCount,path.endsWith('middle-east')?1:0);
   report.pages.push({path,device,status:response.status(),noindexHeader:response.headers()['x-robots-tag'],...data});fs.writeFileSync(out+'/results.json',JSON.stringify(report,null,2)); console.log(device,path,'PASS');
  }
  await context.close();
 }
 // Market child routes and every internal link used in global/market navigation.
 const page=await browser.newPage();await page.addInitScript(capable);const links=new Set(['/global/ae','/global/sa','/global/gcc','/global/north-america','/global/rest-of-world','/salary-guide','/resources/ion-talent-uae-saudi-salary-hiring-guide-2026.pdf','/icon.svg']);
 for(const path of paths){await page.goto(origin+path);for(const href of await page.locator('a[href^="/"]').evaluateAll(es=>es.map(e=>e.getAttribute('href'))))links.add(href)}
 for(const href of links){const url=new URL(href,origin);const res=await page.request.get(url.href);assert(res.status()<400,href+' '+res.status());let anchor=true;if(url.hash){await page.goto(url.href);anchor=await page.locator(`[id="${url.hash.slice(1)}"]`).count()>0;assert(anchor,href)}report.links.push({href,status:res.status(),anchor})}
 // Responsive header and menu links, body lock/unlock, and CTA anchor.
 for(const width of [320,390,768,1024,1280,1440,1920]){await page.setViewportSize({width,height:900});await page.goto(origin+'/global');await page.waitForTimeout(500);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'header overflow '+width);const menu=page.getByRole('button',{name:'Open menu',exact:true});if(await menu.isVisible()){await menu.click();assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');await page.getByRole('navigation',{name:'Mobile',exact:true}).getByRole('link',{name:'United Kingdom',exact:true}).click();await page.waitForURL('**/global/uk');assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');}report.menus.push({width,pass:true})}
 // Content must survive without hydration, animation preferences, and observer support.
 for(const mode of ['no-js','reduced-motion','save-data','weak-device','no-webgl','no-observer']){
  const context=await browser.newContext({viewport:{width:1440,height:1000},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
  await context.addInitScript(capable);
  if(mode==='save-data')await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
  if(mode==='weak-device')await context.addInitScript(()=>Object.defineProperty(navigator,'hardwareConcurrency',{value:2}));
  if(mode==='no-webgl')await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}});
  if(mode==='no-observer')await context.addInitScript(()=>{delete window.IntersectionObserver});
  const p=await context.newPage();await p.goto(origin+'/global');await p.waitForTimeout(1200);const state=await p.evaluate(()=>({hidden:[...document.querySelectorAll('.fade-up')].filter(e=>getComputedStyle(e).opacity==='0').length,canvas:document.querySelectorAll('canvas').length,videos:document.querySelectorAll('video').length,headline:document.querySelector('h1').innerText}));assert.equal(state.hidden,0,mode);assert.equal(state.videos,0);if(!['no-webgl'].includes(mode))assert.equal(state.canvas,0,mode);report.fallbacks.push({mode,...state});if(mode==='no-js')await p.screenshot({path:`${out}/screenshots/after-global-no-js-full.png`,fullPage:true});await context.close();
 }
 // A resize used to attempt texStorage2D again on an immutable WebGL texture.
 await page.setViewportSize({width:1440,height:1000});await page.goto(origin+'/global');await page.waitForTimeout(1000);for(const width of [1920,1280,1440]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(400)}report.resize=await page.locator('canvas').evaluateAll(cs=>cs.map(c=>({width:c.width,height:c.height,error:c.getContext('webgl2')?.getError()})));
 assert.equal(report.resize.length,1,'Capable desktop must render Dark Veil');assert(report.resize.every(c=>c.error===0));
 const canvas=page.locator('canvas');const first=await canvas.screenshot();await page.waitForTimeout(600);const second=await canvas.screenshot();report.animationChanges=!first.equals(second);assert(report.animationChanges,'Dark Veil should animate');
 assert.equal(report.errors.filter(e=>e.message?.includes('React error')).length,0,'No hydration recovery errors');
 fs.writeFileSync(out+'/results.json',JSON.stringify(report,null,2));await browser.close(); console.log('All visual/layout checks passed');
})().catch(e=>{console.error(e);process.exit(1)});
