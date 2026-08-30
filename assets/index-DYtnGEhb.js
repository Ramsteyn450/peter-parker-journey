(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();class vl{constructor(){this.audio=new Audio,this.audio.loop=!1,this.audio.preload="auto",this.volume=.5,this.isPlaying=!1,this.isMuted=!1,this.userInteracted=!1,this.tracks=[{src:"music/Dude Orchestral Suite - BestTamilan.mp3",title:"Dude Orchestral Suite"},{src:"music/the_metro_proposal.mp3",title:"The Metro Proposal"},{src:"music/dude_sad_bgm.mp3",title:"Dude Sad BGM"},{src:"music/nalaru_po.mp3",title:"Nalaru Po (Sacrifice)"},{src:"music/oorum_blood.mp3",title:"Oorum Blood (Spider-Man)"},{src:"music/kannukulla_bgm_dude.mp3",title:"Kannukulla Theme"},{src:"music/Nallaru Po X Oorum Blood Orchestral Unplugged - BestTamilan.mp3",title:"Unplugged Orchestral"},{src:"music/The Metro Proposal - BestTamilan.mp3",title:"The Metro Proposal Suite"}],this.shuffledPlaylist=[],this.playlistIndex=0,this.specialOverrides={"#section-sacrifice":{src:"music/nalaru_po.mp3",title:"Nalaru Po (Sacrifice)"},"#section-valentine":{src:"music/The Metro Proposal - BestTamilan.mp3",title:"The Metro Proposal Suite"}},this.activeOverrideSrc=null,this.savedShuffledTime=0,this.fadePromise=Promise.resolve(),this.toggleBtn=null,this.trackNameEl=null,this.controllerEl=null,this.progressFillEl=null,this._initDOMReferences(),this._bindAudioEvents()}_initDOMReferences(){this.toggleBtn=document.getElementById("music-toggle"),this.trackNameEl=document.getElementById("music-track-name"),this.controllerEl=document.getElementById("music-controller"),this.progressFillEl=document.getElementById("music-progress-fill"),this.toggleBtn&&this.toggleBtn.addEventListener("click",()=>{this.userInteracted=!0,this.togglePlayPause()})}_bindAudioEvents(){this.audio.addEventListener("ended",()=>{console.log("[MUSIC] Track finished. Advancing playlist..."),this.playNextShuffledTrack()}),this.audio.addEventListener("timeupdate",()=>{if(this.audio.duration&&this.progressFillEl){const e=this.audio.currentTime/this.audio.duration*100;this.progressFillEl.style.width=`${e}%`}}),this.audio.addEventListener("play",()=>{this.isPlaying=!0,this._updateUI()}),this.audio.addEventListener("pause",()=>{this.isPlaying=!1,this._updateUI()})}generateShufflePlaylist(){const e=[...this.tracks];for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}if(this.shuffledPlaylist.length>0){const t=this.shuffledPlaylist[this.shuffledPlaylist.length-1].src;e[0].src===t&&e.length>1&&([e[0],e[1]]=[e[1],e[0]])}this.shuffledPlaylist=e,this.playlistIndex=0,console.log("[MUSIC] Fresh shuffled playlist generated:",this.shuffledPlaylist.map(t=>t.title))}onSectionIntersect(e){this.toggleBtn||this._initDOMReferences();const t=this.specialOverrides[e];t?this.playSpecialOverride(t.src,t.title):this.clearSpecialOverride()}async playSpecialOverride(e,t){this.activeOverrideSrc!==e&&(!this.activeOverrideSrc&&this.audio.src&&!this.audio.paused&&(this.savedShuffledTime=this.audio.currentTime),this.activeOverrideSrc=e,await this._transitionToTrack(e,t))}async clearSpecialOverride(){if(!this.activeOverrideSrc)return;this.activeOverrideSrc=null;const e=this.shuffledPlaylist[this.playlistIndex];e&&(await this._transitionToTrack(e.src,e.title,this.savedShuffledTime),this.savedShuffledTime=0)}async playNextShuffledTrack(){if(this.activeOverrideSrc)return;this.playlistIndex++,this.playlistIndex>=this.shuffledPlaylist.length&&this.generateShufflePlaylist();const e=this.shuffledPlaylist[this.playlistIndex];e&&await this._transitionToTrack(e.src,e.title)}async _transitionToTrack(e,t,i=0){const r=new URL(this.audio.src||"",window.location.href).pathname,n=new URL(e,window.location.href).pathname;r!==n&&(this.isPlaying&&this.userInteracted?this.fadePromise=this.fadePromise.then(()=>this.fadeTo(0,300)).then(()=>(this.audio.src=e,this.audio.currentTime=i,this.audio.load(),this.audio.play())).then(()=>this.fadeTo(this.volume,300)).catch(o=>{console.warn("[MUSIC] Track fade transition interrupted:",o.message),this.audio.volume=this.isMuted?0:this.volume}):(this.audio.src=e,this.audio.currentTime=i,this.audio.load()),this._updateUI())}fadeTo(e,t=300){return new Promise(i=>{const r=this.audio.volume,n=e-r,o=performance.now(),a=l=>{const c=l-o,d=Math.min(c/t,1);this.isMuted||(this.audio.volume=r+n*d),d<1?requestAnimationFrame(a):i()};requestAnimationFrame(a)})}unlock(){if(this.userInteracted=!0,this.generateShufflePlaylist(),!this.isPlaying){this.isPlaying=!0;const e=this.shuffledPlaylist[0];this._transitionToTrack(e.src,e.title).then(()=>{this.audio.play()}).catch(()=>{})}}togglePlayPause(){this.isPlaying?this.audio.pause():this.audio.src?this.audio.play().then(()=>{this.isPlaying=!0,this._updateUI()}).catch(()=>{}):this.unlock()}toggleMute(){this.isMuted=!this.isMuted,this.audio.volume=this.isMuted?0:this.volume,this._updateUI()}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.isMuted||(this.audio.volume=this.volume)}duckVolume(){this.fadeTo(this.volume*.15,300)}restoreVolume(){this.fadeTo(this.volume,300)}silence(){this.duckVolume()}resume(){this.userInteracted&&(this.restoreVolume(),this.audio.paused&&this.isPlaying&&this.audio.play().catch(()=>{}))}hide(){}show(){}pause(){this.stop()}stop(){this.audio.pause(),this.isPlaying=!1,this._updateUI()}_updateUI(){if(this.controllerEl=this.controllerEl||document.getElementById("music-controller"),this.trackNameEl=this.trackNameEl||document.getElementById("music-track-name"),!!this.controllerEl&&(!this.isPlaying||this.isMuted?this.controllerEl.classList.add("music-controller-off"):this.controllerEl.classList.remove("music-controller-off"),this.trackNameEl))if(this.activeOverrideSrc){const e=Object.values(this.specialOverrides).find(t=>t.src===this.activeOverrideSrc);this.trackNameEl.textContent=e?e.title:"—"}else{const e=this.shuffledPlaylist[this.playlistIndex];this.trackNameEl.textContent=e?e.title:"—"}}}const me=new vl;class xl{constructor(e){this.loaderEl=document.getElementById("loader"),this.fillEl=document.getElementById("loader-fill"),this.percentEl=document.getElementById("loader-percent"),this.onComplete=e,this.progress=0,this.isDone=!1,this._prepareTransitionOverlay()}_prepareTransitionOverlay(){this.overlay=document.createElement("div"),this.overlay.className="cinematic-zoom-overlay",this.overlay.style.cssText=`
      position: fixed;
      inset: 0;
      z-index: 10002;
      background: #050505;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
      pointer-events: none;
      transition: opacity 0.08s linear;
      will-change: opacity;
    `,this.glowBackplate=document.createElement("div"),this.glowBackplate.style.cssText=`
      position: absolute;
      inset: -50%;
      background: radial-gradient(circle at center, rgba(230, 36, 41, 0.95) 0%, rgba(230, 36, 41, 0.3) 40%, rgba(5, 5, 5, 0) 70%);
      opacity: 0;
      pointer-events: none;
      will-change: opacity;
    `;const e="/peter-parker-journey/";this.logoImg=document.createElement("img"),this.logoImg.src=`${e}spider-logo.png`,this.logoImg.alt="Spider-Man Logo",this.logoImg.style.cssText=`
      width: auto;
      height: 60vh;
      max-width: 80vw;
      object-fit: contain;
      opacity: 0;
      transform: scale(0.65) translate3d(0, 0, 0);
      will-change: transform;
    `,this.logoImg.decode().then(()=>console.log("[LOADER] Cinematic transition image pre-decoded")).catch(t=>console.warn("[LOADER] Image pre-decoding failed:",t)),this.overlay.appendChild(this.glowBackplate),this.overlay.appendChild(this.logoImg),document.body.appendChild(this.overlay)}start(){if(console.log("[LOADER] Critical assets started"),!this.loaderEl){this._finish();return}this._setProgress(15);const e=setTimeout(()=>{this.isDone||(console.warn("[LOADER] Failsafe timer reached"),this._setProgress(100),this._showExploreButton())},3500),t="/peter-parker-journey/",i=[{name:"logo",src:`${t}spider-logo.png`},{name:"hero",src:`${t}peter.png`}];let r=0;const n=i.length,o=i.map(a=>new Promise(l=>{const c=new Image;c.onload=()=>{r++,console.log(`[LOADER] ${a.name} loaded`);const d=15+Math.floor(r/n*85);this._setProgress(d),l(a.src)},c.onerror=()=>{r++,console.warn(`[LOADER] Asset failed: ${a.src}`);const d=15+Math.floor(r/n*85);this._setProgress(d),l(null)},c.src=a.src}));Promise.allSettled(o).then(()=>{clearTimeout(e),console.log("[LOADER] Critical loading complete"),this._setProgress(100),setTimeout(()=>this._showExploreButton(),300)})}_setProgress(e){this.isDone||(this.progress=e,this.fillEl&&(this.fillEl.style.width=`${e}%`),this.percentEl&&(this.percentEl.textContent=`${e}%`))}_showExploreButton(){if(this.isDone)return;const e=this.loaderEl.querySelector(".loader-subtitle"),t=this.loaderEl.querySelector(".loader-progress-track"),i=this.loaderEl.querySelector(".loader-percent");e&&(e.style.opacity="0",e.style.transition="opacity 0.4s ease"),t&&(t.style.opacity="0",t.style.transition="opacity 0.4s ease"),i&&(i.style.opacity="0",i.style.transition="opacity 0.4s ease"),setTimeout(()=>{e&&(e.style.display="none"),t&&(t.style.display="none"),i&&(i.style.display="none"),this._createExploreButton()},450)}_createExploreButton(){const e=this.loaderEl.querySelector(".loader-text");if(!e)return;const t=document.createElement("div");t.className="explore-btn-wrapper",t.style.cssText=`
      position: relative;
      margin-top: 20px;
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    `,t.innerHTML=`
      <!-- Expand pulse circle -->
      <div class="explore-btn-pulse" style="
        position: absolute;
        inset: -12px;
        border: 1px solid rgba(255, 46, 54, 0.4);
        border-radius: 50px;
        opacity: 0;
        transform: scale(0.85);
        pointer-events: none;
        transition: transform 0.5s ease, opacity 0.5s ease;
      "></div>

      <!-- Button element -->
      <button class="explore-journey-btn" style="
        position: relative;
        background: linear-gradient(135deg, #FF2E36 0%, #8A0B10 100%);
        border: 2px solid #FF555A;
        color: #FFFFFF;
        padding: 18px 48px;
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        border-radius: 50px;
        cursor: pointer;
        outline: none;
        box-shadow: 0 10px 30px rgba(255, 46, 54, 0.4), 0 0 10px rgba(255, 46, 54, 0.2);
        transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
      ">EXPLORE THE JOURNEY</button>
    `,e.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1",t.style.transform="translateY(0)"});const i=t.querySelector(".explore-journey-btn"),r=t.querySelector(".explore-btn-pulse");i.addEventListener("mousemove",n=>{const o=i.getBoundingClientRect(),a=n.clientX-(o.left+o.width/2),l=n.clientY-(o.top+o.height/2);i.style.transform=`translate(${a*.25}px, ${l*.25}px)`,r.style.transform=`translate(${a*.12}px, ${l*.12}px) scale(1.1)`}),i.addEventListener("mouseenter",()=>{r.style.opacity="1",r.style.transform="scale(1.1)",i.style.boxShadow="0 15px 40px rgba(255, 46, 54, 0.7), 0 0 25px rgba(255, 46, 54, 0.4)"}),i.addEventListener("mouseleave",()=>{r.style.opacity="0",r.style.transform="scale(0.85)",i.style.transform="translate(0px, 0px)",i.style.boxShadow="0 10px 30px rgba(255, 46, 54, 0.4), 0 0 10px rgba(255, 46, 54, 0.2)"}),i.addEventListener("click",()=>{i.disabled=!0,i.style.pointerEvents="none",setTimeout(()=>{try{me.pause()}catch{}const n=new Audio("/start.mp3");n.volume=.85,n.currentTime=0,n.play().catch(o=>{console.log("[LOADER] start.mp3 play failed:",o.message);const a=new Audio("/start.mpeg");a.volume=.85,a.play().catch(()=>{})})},0),this._triggerCinematicZoom()})}_triggerCinematicZoom(){!this.overlay||!this.logoImg||(this.overlay.style.visibility="visible",this.overlay.style.opacity="1",this.overlay.style.pointerEvents="all",this.logoImg.style.opacity="1",setTimeout(()=>{this.logoImg.style.transition="transform 0.80s cubic-bezier(0.85, 0, 1, 1)",this.logoImg.style.transform="scale(45) translate3d(0, 0, 0)",this.glowBackplate.style.transition="opacity 0.80s cubic-bezier(0.85, 0, 1, 1)",this.glowBackplate.style.opacity="1"},150),setTimeout(()=>{this.loaderEl&&(this.loaderEl.style.transition="opacity 0.05s linear",this.loaderEl.style.opacity="0"),this._finish(),this.overlay.style.transition="opacity 0.05s linear",this.overlay.style.opacity="0"},950),setTimeout(()=>{this.overlay.remove(),this.loaderEl&&this.loaderEl.remove()},1e3))}_finish(){var e;if(!this.isDone){this.isDone=!0,console.log("[LOADER] Entering experience");try{(e=this.onComplete)==null||e.call(this)}catch(t){console.error("[LOADER] Error in onComplete callback:",t)}}}}class bl{constructor(){var t,i;this.cursorEl=document.getElementById("custom-cursor"),this.dot=(t=this.cursorEl)==null?void 0:t.querySelector(".cursor-dot"),this.ring=(i=this.cursorEl)==null?void 0:i.querySelector(".cursor-ring");const e=window.matchMedia("(hover: none) and (pointer: coarse)").matches;!this.cursorEl||e||(this.mouseX=-100,this.mouseY=-100,this._init())}_init(){document.body.style.cursor="default",document.addEventListener("mousemove",t=>{this.mouseX=t.clientX,this.mouseY=t.clientY,this._moveCursor(this.mouseX,this.mouseY)},{passive:!0});const e="a, button, [data-cursor-hover], input, textarea, select, label, .memory-photo, .mind-word";document.addEventListener("mouseover",t=>{t.target.closest(e)&&document.body.classList.add("cursor-hover")}),document.addEventListener("mouseout",t=>{t.target.closest(e)&&document.body.classList.remove("cursor-hover")}),document.addEventListener("mousedown",()=>{document.body.classList.add("cursor-clicking")}),document.addEventListener("mouseup",()=>{document.body.classList.remove("cursor-clicking")})}_moveCursor(e,t){this.cursorEl&&(this.cursorEl.style.transform=`translate3d(${e}px, ${t}px, 0)`)}}class _l{constructor(){this.navEl=document.getElementById("main-nav"),this.menuBtn=document.getElementById("nav-menu-btn"),this.menuOverlay=document.getElementById("chapter-menu"),this.menuClose=document.getElementById("chapter-menu-close"),this.progressEl=document.getElementById("journey-progress"),this.progressDots=[],this.spideyHandle=document.getElementById("spidey-progress-handle"),this.chapterLinks=document.querySelectorAll(".chapter-link"),this.isMenuOpen=!1,this.currentChapter=0,this.isHidden=!1,this.targets=["#section-hero","#section-origin","#section-becoming","#section-homecoming","#section-love","#section-love-scroll","#section-infinity-war","#section-sacrifice","#section-new-spiderman","#section-brand-new-day","#section-valentine","#section-fan-challenge"],this._init()}_init(){var r,n,o,a,l;(r=this.menuBtn)==null||r.addEventListener("click",()=>this.openMenu()),(n=this.menuClose)==null||n.addEventListener("click",()=>this.closeMenu()),this.chapterLinks.forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const h=c.getAttribute("href");this.closeMenu(),setTimeout(()=>{const p=document.querySelector(h);p==null||p.scrollIntoView({behavior:"smooth",block:"start"})},400)})});const e=(o=this.menuOverlay)==null?void 0:o.querySelector(".chapter-menu-nav"),t=document.getElementById("menu-spidey-handle"),i=(a=this.menuOverlay)==null?void 0:a.querySelector(".menu-progress-line");e&&t&&i&&e.addEventListener("scroll",()=>{const c=e.scrollTop,d=e.scrollHeight-e.clientHeight,h=d>0?c/d*100:0;t.style.top=`${h}%`,i.style.height=`${h}%`;const p=e.getBoundingClientRect(),u=p.top+p.height/2;this.chapterLinks.forEach(g=>{const f=g.getBoundingClientRect(),y=f.top+f.height/2,w=Math.abs(y-u),x=p.height/2,E=Math.min(w/x,1),b=1-E*.15,T=-E*80,P=1-E*.55;g.style.transform=`translate3d(0, 0, ${T}px) scale(${b})`,g.style.opacity=`${P}`})},{passive:!0}),(l=this.menuOverlay)==null||l.addEventListener("click",c=>{c.target===this.menuOverlay&&this.closeMenu()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&this.isMenuOpen&&this.closeMenu()}),window.addEventListener("scroll",()=>this.updateProgressHandle(),{passive:!0}),this.updateProgressHandle(),this._observeSections()}openMenu(){var i,r,n;(i=this.menuOverlay)==null||i.removeAttribute("hidden"),(r=this.menuOverlay)==null||r.classList.add("active"),(n=this.menuBtn)==null||n.setAttribute("aria-expanded","true"),this.isMenuOpen=!0,document.body.style.overflow="hidden";const e=this.menuOverlay.querySelector(".menu-web-corner.top-left path"),t=this.menuOverlay.querySelector(".menu-web-corner.bottom-right path");e&&(e.style.strokeDashoffset="0"),t&&(t.style.strokeDashoffset="0"),requestAnimationFrame(()=>{this.chapterLinks.forEach((o,a)=>{o.style.transitionDelay=`${a*45}ms`,o.style.opacity="1",o.style.transform="translate3d(0, 0, 0)"}),setTimeout(()=>{var a;const o=(a=this.menuOverlay)==null?void 0:a.querySelector(".chapter-menu-nav");o&&o.dispatchEvent(new Event("scroll"))},500)})}closeMenu(){if(this.menuOverlay){this.menuOverlay.classList.remove("active");const e=this.menuOverlay.querySelector(".menu-web-corner.top-left path"),t=this.menuOverlay.querySelector(".menu-web-corner.bottom-right path");e&&(e.style.strokeDashoffset="300"),t&&(t.style.strokeDashoffset="300"),this.chapterLinks.forEach(i=>{i.style.transitionDelay="",i.style.transform="translate3d(0, 15px, -80px)",i.style.opacity="0"}),setTimeout(()=>{var i;this.menuOverlay.setAttribute("hidden",""),(i=this.menuBtn)==null||i.setAttribute("aria-expanded","false"),this.isMenuOpen=!1,document.body.style.overflow=""},500)}}updateChapter(e){this.currentChapter!==e&&(this.currentChapter=e,this.dots.forEach((t,i)=>{t.classList.toggle("active",i===e)}),this.chapterLinks.forEach(t=>{t.classList.toggle("active",parseInt(t.dataset.chapter)===e)}),this.targets[e]&&me.onSectionIntersect(this.targets[e]))}hide(){var e,t;this.isHidden||(this.isHidden=!0,(e=this.navEl)==null||e.classList.add("nav-hidden"),(t=this.progressEl)==null||t.classList.add("progress-hidden"))}show(){var e,t;this.isHidden=!1,(e=this.navEl)==null||e.classList.remove("nav-hidden"),(t=this.progressEl)==null||t.classList.remove("progress-hidden")}_observeSections(){this.targets.forEach((e,t)=>{const i=document.querySelector(e);if(!i)return;new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&this.updateChapter(t)})},{threshold:.35}).observe(i)})}updateProgressHandle(){var a;if(!this.spideyHandle)return;const e=window.scrollY||document.documentElement.scrollTop,t=document.documentElement.scrollHeight-window.innerHeight,r=2+(t>0?e/t*100:0)/100*96;this.spideyHandle.style.top=`${r}%`;const n=Math.sin(e*.008)*2.5;this.spideyHandle.style.transform=`translate(-50%, -50%) translate3d(0, 0, ${10+n}px)`;const o=(a=this.progressEl)==null?void 0:a.querySelector(".progress-line");o&&(o.style.height=`${r}%`)}}const Ot="/peter-parker-journey/",wl="https://valentine-finder-beige.vercel.app",Vt={mjMemory01:`${Ot}peter4.jpg`,mjMemory02:`${Ot}peter.png`,mjMemory03:`${Ot}peter4.jpg`,mjMemory04:`${Ot}peter1.webp`,mjMemory05:`${Ot}peter4.jpg`,disintegration01:`${Ot}peter.png`,disintegration02:`${Ot}peter1.webp`,disintegration03:`${Ot}peter2.webp`,disintegration04:`${Ot}peter3.webp`,disintegration05:`${Ot}peter4.jpg`,disintegration06:`${Ot}peter.png`},co={mjMemory:"",posters:{mjMemory:`${Ot}peter4.jpg`}},El=[{key:"mjMemory01",src:Vt.mjMemory01,caption:"The Moments That Mattered",date:"SOPHOMORE YEAR",style:{top:"5%",left:"8%",width:"240px",height:"300px",rotate:"-3deg"}},{key:"mjMemory02",src:Vt.mjMemory02,caption:"When Everything Felt Normal",date:"EUROPE TRIP",style:{top:"10%",left:"35%",width:"280px",height:"220px",rotate:"2deg"}},{key:"mjMemory03",src:Vt.mjMemory03,caption:"Before Everything Changed",date:"AFTER HOMECOMING",style:{top:"5%",left:"62%",width:"220px",height:"280px",rotate:"-1deg"}},{key:"mjMemory04",src:Vt.mjMemory04,caption:"The Last Normal Day",date:"JUNIOR YEAR",style:{top:"50%",left:"15%",width:"260px",height:"200px",rotate:"3deg"}},{key:"mjMemory05",src:Vt.mjMemory05,caption:"Everything We Almost Had",date:"FAR FROM HOME",style:{top:"52%",left:"50%",width:"240px",height:"260px",rotate:"-2deg"}}],Tl=[{word:"MJ",size:48,color:"#FF2E36",memory:{title:"MJ",body:"She was the one person who truly saw Peter Parker."}},{word:"MAY",size:36,color:"#FFFFFF",memory:{title:"Aunt May",body:'"With great power comes great responsibility." Her last words.'}},{word:"TONY",size:40,color:"#FFD700",memory:{title:"Tony Stark",body:"His mentor. His father figure. The man who believed in him first."}},{word:"NED",size:30,color:"#E0E0E0",memory:{title:"Ned Leeds",body:"His best friend. His guy in the chair. Who no longer remembers him."}},{word:"LOVE",size:44,color:"#FF2E36",memory:{title:"Love",body:"The one thing Peter could not protect, even with all his power."}},{word:"LOSS",size:38,color:"#FF555A",memory:{title:"Loss",body:"He lost Tony. He lost May. He chose to lose MJ."}},{word:"FEAR",size:28,color:"#E0E0E0",memory:{title:"Fear",body:"The fear of losing those he loved drove every choice he made."}},{word:"RESPONSIBILITY",size:22,color:"#FFFFFF",memory:{title:"Responsibility",body:'"With great power comes great responsibility."'}},{word:"FAILURE",size:26,color:"#FF555A",memory:{title:"Failure",body:"He blamed himself for everything. Every death. Every loss."}},{word:"SACRIFICE",size:34,color:"#FF2E36",memory:{title:"Sacrifice",body:"He asked Strange to make the world forget Peter Parker. Even MJ."}}],Sl=[{text:"Peter sees MJ for the first time.",scene:"FIRST SIGHT"},{text:"They become something more than friends.",scene:"SOMETHING MORE"},{text:"They laugh. For a moment, everything is fine.",scene:"THE GOOD DAYS"},{text:"He watches her. She watches him back.",scene:"FALLING"},{text:"They become a couple.",scene:"TOGETHER"},{text:"Peter tries to keep her safe from his world.",scene:"PROTECTION"},{text:"Their world becomes complicated. But they hold on.",scene:"HOLDING ON"}],Ml=["Green Goblin","Doctor Octopus","Electro","Sandman","Lizard"],kl=["Peter wants a normal life","Europe with his classmates","MJ. Always MJ.","Mysterio — a friend or a threat?","EDITH and the weight of Tony's legacy","Illusions and self-doubt","Peter becomes his own Spider-Man"];class Cl{constructor(){var e,t,i;this.el=document.getElementById("memory-viewer"),this.imgEl=(e=this.el)==null?void 0:e.querySelector(".memory-viewer-img"),this.captionEl=(t=this.el)==null?void 0:t.querySelector(".memory-viewer-caption p"),this.closeBtn=(i=this.el)==null?void 0:i.querySelector(".memory-viewer-close"),this.isOpen=!1,this._init()}_init(){var e,t;(e=this.closeBtn)==null||e.addEventListener("click",()=>this.close()),(t=this.el)==null||t.addEventListener("click",i=>{i.target===this.el&&this.close()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.isOpen&&this.close()})}open(e,t){this.el&&(this.isOpen=!0,this.imgEl&&(this.imgEl.src=e,this.imgEl.alt=t),this.captionEl&&(this.captionEl.textContent=t),this.el.classList.add("open"),document.body.style.overflow="hidden")}close(){this.el&&(this.isOpen=!1,this.el.classList.remove("open"),document.body.style.overflow="")}}class Pl{constructor(e,t){this.container=e,this.viewer=t,this.photos=El,this._build()}_build(){this.container&&(this.container.innerHTML="",this.photos.forEach((e,t)=>{const i=document.createElement("div");i.className="memory-photo",i.setAttribute("data-reveal",""),i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",`Memory: ${e.caption}`);const r=e.style;Object.assign(i.style,{top:r.top,left:r.left,width:r.width,height:r.height,transform:`rotate(${r.rotate})`}),i.style.transitionDelay=`${t*.15}s`,i.innerHTML=`
        <img
          src="${e.src}"
          alt="${e.caption}"
          loading="lazy"
          onerror="this.closest('.memory-photo').classList.add('placeholder-love')"
        />
        <div class="memory-caption">
          <div class="label">${e.caption}</div>
          <div class="label-red" style="font-size:9px;letter-spacing:0.2em;margin-top:4px;">${e.date}</div>
        </div>
      `;const n=()=>this.viewer.open(e.src,e.caption);i.addEventListener("click",n),i.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&n()}),this.container.appendChild(i)}),this._addPlaceholderBgs())}_addPlaceholderBgs(){const e=this.container.querySelectorAll(".memory-photo"),t=["linear-gradient(135deg, #1a0508 0%, #2d0910 100%)","linear-gradient(160deg, #0a0812 0%, #1a0508 100%)","linear-gradient(120deg, #2d0910 0%, #1a0810 100%)","linear-gradient(140deg, #0d0407 0%, #2d1015 100%)","linear-gradient(150deg, #1a0508 0%, #0a0812 100%)"];e.forEach((i,r)=>{i.querySelector("img").addEventListener("error",()=>{var a;i.style.background=t[r%t.length];const o=document.createElement("div");o.style.cssText=`
          position:absolute; inset:0; display:flex; align-items:center;
          justify-content:center; font-size:9px; letter-spacing:0.2em;
          color:rgba(245,245,245,0.15); text-transform:uppercase; text-align:center;
          padding:8px;
        `,o.textContent=((a=this.photos[r])==null?void 0:a.caption)||"MJ MEMORY",i.appendChild(o)})})}}class lt{constructor(){this.observers=[],this._initReveal(),this._initParallax(),this._init3DReveals()}_initReveal(){const e=document.querySelectorAll("[data-reveal], [data-reveal-left], [data-reveal-right]"),t=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&(r.target.classList.add("revealed"),t.unobserve(r.target))})},{threshold:.01,rootMargin:"100px 0px 100px 0px"});e.forEach(i=>t.observe(i)),this.observers.push(t),setTimeout(()=>{e.forEach(i=>{i.getBoundingClientRect().top<window.innerHeight+200&&i.classList.add("revealed")})},300),setTimeout(()=>{e.forEach(i=>i.classList.add("revealed"))},2e3)}_initParallax(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=document.querySelectorAll("[data-parallax]");if(!t.length)return;const i=()=>{t.forEach(r=>{const n=parseFloat(r.dataset.parallax)||.3,o=r.getBoundingClientRect(),a=o.top+o.height/2-window.innerHeight/2;r.style.transform=`translateY(${a*n}px)`})};window.addEventListener("scroll",i,{passive:!0})}static getStickyProgress(e){const t=e.getBoundingClientRect(),i=e.offsetHeight-window.innerHeight;return i<=0?0:Math.max(0,Math.min(1,-t.top/i))}static initLoveScroll(e){const t=e.querySelectorAll(".love-scene"),i=t.length;if(!t.length)return;const r=()=>{const n=lt.getStickyProgress(e),o=Math.min(Math.floor(n*i),i-1);t.forEach((a,l)=>{a.classList.toggle("active",l===o)})};window.addEventListener("scroll",r,{passive:!0})}static initHomecomingScroll(e){const t=e.querySelector(".homecoming-track");if(!t)return;const r=t.querySelectorAll(".homecoming-scene").length,n=()=>{const a=-(lt.getStickyProgress(e)*(r-1)*100);t.style.transform=`translateX(${a}vw)`};window.addEventListener("scroll",n,{passive:!0})}static initThreeSpiderMen(e){const t=e.querySelector(".world-1");e.querySelector(".world-2");const i=e.querySelector(".world-3"),r=e.querySelector(".three-sm-title-overlay");if(!t)return;const n=()=>{const o=lt.getStickyProgress(e);if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){if(o<.5){const l=o/.5;t.style.transform=`translateX(${l*25}%)`,i.style.transform=`translateX(${-l*25}%)`}o>=.5&&(t.style.transform="translateX(25%)",i.style.transform="translateX(-25%)")}r&&r.classList.toggle("visible",o>=.6)};window.addEventListener("scroll",n,{passive:!0})}static initSequentialReveal(e,t,i=.1){const r=e.querySelectorAll(t),n=new IntersectionObserver(o=>{o[0].isIntersecting&&(r.forEach((a,l)=>{setTimeout(()=>a.classList.add("revealed"),l*400)}),n.unobserve(e))},{threshold:i,rootMargin:"100px 0px 100px 0px"});n.observe(e),setTimeout(()=>{r.forEach(o=>o.classList.add("revealed"))},2e3)}static initDisintegration(e){const t=e.querySelectorAll(".disintegration-photo");let i=[];new IntersectionObserver(n=>{n[0].isIntersecting?(i.forEach(a=>clearTimeout(a)),i=[],t.forEach((a,l)=>{const c=setTimeout(()=>{a.classList.add("fading")},l*600);i.push(c)})):(i.forEach(a=>clearTimeout(a)),i=[],t.forEach(a=>{a.classList.remove("fading")}))},{threshold:.1}).observe(e)}_init3DReveals(){document.querySelectorAll("section.section").forEach(t=>{const i=t.querySelector(".container, .bnd-container, .fc-container, .love-scene-content, .becoming-content, .second-love-content, .peter-happy-section, .identity-chaos, .final-content");if(!i)return;i.classList.add("three-d-reveal");const r=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting?(o.target.classList.add("active"),window.threeDEngine&&t.id&&window.threeDEngine.setSection(`#${t.id}`)):o.target.classList.remove("active")})},{threshold:.08,rootMargin:"-50px 0px -50px 0px"});r.observe(i),this.observers.push(r)})}}function oi(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Xo(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var kt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Qr={duration:.5,overwrite:!1,delay:0},Ds,qe,ue,Lt=1e8,le=1/Lt,hs=Math.PI*2,Al=hs/4,Ol=0,Jo=Math.sqrt,Fl=Math.cos,Rl=Math.sin,ze=function(e){return typeof e=="string"},xe=function(e){return typeof e=="function"},ui=function(e){return typeof e=="number"},zs=function(e){return typeof e>"u"},ei=function(e){return typeof e=="object"},dt=function(e){return e!==!1},Ns=function(){return typeof window<"u"},fn=function(e){return xe(e)||ze(e)},Ko=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Je=Array.isArray,Il=/random\([^)]+\)/g,Ll=/,\s*/g,uo=/(?:-?\.?\d|\.)+/gi,Zo=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ur=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Zn=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Qo=/[+-]=-?[.\d]+/,Dl=/[^,'"\[\]\s]+/gi,zl=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,fe,jt,ps,Bs,Ct={},Dn={},ea,ta=function(e){return(Dn=_r(e,Ct))&&ft},Hs=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},en=function(e,t){return!t&&console.warn(e)},ia=function(e,t){return e&&(Ct[e]=t)&&Dn&&(Dn[e]=t)||Ct},tn=function(){return 0},Nl={suppressEvents:!0,isStart:!0,kill:!1},kn={suppressEvents:!0,kill:!1},Bl={suppressEvents:!0},qs={},Si=[],fs={},ra,bt={},Qn={},ho=30,Cn=[],$s="",Ys=function(e){var t=e[0],i,r;if(ei(t)||xe(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Cn.length;r--&&!Cn[r].targetTest(t););i=Cn[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Sa(e[r],i)))||e.splice(r,1);return e},Wi=function(e){return e._gsap||Ys(Dt(e))[0]._gsap},na=function(e,t,i){return(i=e[t])&&xe(i)?e[t]():zs(i)&&e.getAttribute&&e.getAttribute(t)||i},ut=function(e,t){return(e=e.split(",")).forEach(t)||e},Ee=function(e){return Math.round(e*1e5)/1e5||0},pe=function(e){return Math.round(e*1e7)/1e7||0},fr=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},Hl=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},zn=function(){var e=Si.length,t=Si.slice(0),i,r;for(fs={},Si.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Vs=function(e){return!!(e._initted||e._startAt||e.add)},sa=function(e,t,i,r){Si.length&&!qe&&zn(),e.render(t,i,!!(qe&&t<0&&Vs(e))),Si.length&&!qe&&zn()},oa=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Dl).length<2?t:ze(e)?e.trim():e},aa=function(e){return e},Pt=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},ql=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},_r=function(e,t){for(var i in t)e[i]=t[i];return e},po=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=ei(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},Nn=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},qr=function(e){var t=e.parent||fe,i=e.keyframes?ql(Je(e.keyframes)):Pt;if(dt(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},$l=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},la=function(e,t,i,r,n){var o=e[r],a;if(n)for(a=t[n];o&&o[n]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Gn=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var n=t._prev,o=t._next;n?n._next=o:e[i]===t&&(e[i]=o),o?o._prev=n:e[r]===t&&(e[r]=n),t._next=t._prev=t.parent=null},Ci=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ui=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Yl=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},gs=function(e,t,i,r){return e._startAt&&(qe?e._startAt.revert(kn):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Vl=function s(e){return!e||e._ts&&s(e.parent)},fo=function(e){return e._repeat?wr(e._tTime,e=e.duration()+e._rDelay)*e:0},wr=function(e,t){var i=Math.floor(e=pe(e/t));return e&&i===e?i-1:i},Bn=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},jn=function(e){return e._end=pe(e._start+(e._tDur/Math.abs(e._ts||e._rts||le)||0))},Xn=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=pe(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),jn(e),i._dirty||Ui(i,e)),e},ca=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Bn(e.rawTime(),t),(!t._dur||dn(0,t.totalDuration(),i)-t._tTime>le)&&t.render(i,!0)),Ui(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-le}},Jt=function(e,t,i,r){return t.parent&&Ci(t),t._start=pe((ui(i)?i:i||e!==fe?Ft(e,i,t):e._time)+t._delay),t._end=pe(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),la(e,t,"_first","_last",e._sort?"_start":0),ms(t)||(e._recent=t),r||ca(e,t),e._ts<0&&Xn(e,e._tTime),e},da=function(e,t){return(Ct.ScrollTrigger||Hs("scrollTrigger",t))&&Ct.ScrollTrigger.create(t,e)},ua=function(e,t,i,r,n){if(Us(e,t,n),!e._initted)return 1;if(!i&&e._pt&&!qe&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ra!==Et.frame)return Si.push(e),e._lazy=[n,r],1},Wl=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},ms=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Ul=function(e,t,i,r){var n=e.ratio,o=t<0||!t&&(!e._start&&Wl(e)&&!(!e._initted&&ms(e))||(e._ts<0||e._dp._ts<0)&&!ms(e))?0:1,a=e._rDelay,l=0,c,d,h;if(a&&e._repeat&&(l=dn(0,e._tDur,t),d=wr(l,a),e._yoyo&&d&1&&(o=1-o),d!==wr(e._tTime,a)&&(n=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==n||qe||r||e._zTime===le||!t&&e._zTime){if(!e._initted&&ua(e,t,r,i,l))return;for(h=e._zTime,e._zTime=t||(i?le:0),i||(i=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&gs(e,t,i,!0),e._onUpdate&&!i&&St(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&St(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ci(e,1),!i&&!qe&&(St(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Gl=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Er=function(e,t,i,r){var n=e._repeat,o=pe(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=n?n<0?1e10:pe(o*(n+1)+e._rDelay*n):o,a>0&&!r&&Xn(e,e._tTime=e._tDur*a),e.parent&&jn(e),i||Ui(e.parent,e),e},go=function(e){return e instanceof ct?Ui(e):Er(e,e._dur)},jl={_start:0,endTime:tn,totalDuration:tn},Ft=function s(e,t,i){var r=e.labels,n=e._recent||jl,o=e.duration()>=Lt?n.endTime(!1):e._dur,a,l,c;return ze(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?n:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(Je(i)?i[0]:i).totalDuration()),a>1?s(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},$r=function(e,t,i){var r=ui(t[1]),n=(r?2:1)+(e<2?0:1),o=t[n],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=dt(l.vars.inherit)&&l.parent;o.immediateRender=dt(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[n-1]}return new Pe(t[0],o,t[n+1])},Fi=function(e,t){return e||e===0?t(e):t},dn=function(e,t,i){return i<e?e:i>t?t:i},je=function(e,t){return!ze(e)||!(t=zl.exec(e))?"":t[1]},Xl=function(e,t,i){return Fi(i,function(r){return dn(e,t,r)})},ys=[].slice,ha=function(e,t){return e&&ei(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ei(e[0]))&&!e.nodeType&&e!==jt},Jl=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var n;return ze(r)&&!t||ha(r,1)?(n=i).push.apply(n,Dt(r)):i.push(r)})||i},Dt=function(e,t,i){return ue&&!t&&ue.selector?ue.selector(e):ze(e)&&!i&&(ps||!Tr())?ys.call((t||Bs).querySelectorAll(e),0):Je(e)?Jl(e,i):ha(e)?ys.call(e,0):e?[e]:[]},vs=function(e){return e=Dt(e)[0]||en("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Dt(t,i.querySelectorAll?i:i===e?en("Invalid scope")||Bs.createElement("div"):e)}},pa=function(e){return e.sort(function(){return .5-Math.random()})},fa=function(e){if(xe(e))return e;var t=ei(e)?e:{each:e},i=Gi(t.ease),r=t.from||0,n=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,d=r,h=r;return ze(r)?d=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(d=r[0],h=r[1]),function(p,u,g){var f=(g||t).length,y=o[f],w,x,E,b,T,P,_,A,k;if(!y){if(k=t.grid==="auto"?0:(t.grid||[1,Lt])[1],!k){for(_=-Lt;_<(_=g[k++].getBoundingClientRect().left)&&k<f;);k<f&&k--}for(y=o[f]=[],w=l?Math.min(k,f)*d-.5:r%k,x=k===Lt?0:l?f*h/k-.5:r/k|0,_=0,A=Lt,P=0;P<f;P++)E=P%k-w,b=x-(P/k|0),y[P]=T=c?Math.abs(c==="y"?b:E):Jo(E*E+b*b),T>_&&(_=T),T<A&&(A=T);r==="random"&&pa(y),y.max=_-A,y.min=A,y.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(k>f?f-1:c?c==="y"?f/k:k:Math.max(k,f/k))||0)*(r==="edges"?-1:1),y.b=f<0?n-f:n,y.u=je(t.amount||t.each)||0,i=i&&f<0?cc(i):i}return f=(y[p]-y.min)/y.max||0,pe(y.b+(i?i(f):f)*y.v)+y.u}},xs=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=pe(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(ui(i)?0:je(i))}},ga=function(e,t){var i=Je(e),r,n;return!i&&ei(e)&&(r=i=e.radius||Lt,e.values?(e=Dt(e.values),(n=!ui(e[0]))&&(r*=r)):e=xs(e.increment)),Fi(t,i?xe(e)?function(o){return n=e(o),Math.abs(n-o)<=r?n:o}:function(o){for(var a=parseFloat(n?o.x:o),l=parseFloat(n?o.y:0),c=Lt,d=0,h=e.length,p,u;h--;)n?(p=e[h].x-a,u=e[h].y-l,p=p*p+u*u):p=Math.abs(e[h]-a),p<c&&(c=p,d=h);return d=!r||c<=r?e[d]:o,n||d===o||ui(o)?d:d+je(o)}:xs(e))},ma=function(e,t,i,r){return Fi(Je(e)?!t:i===!0?!!(i=0):!r,function(){return Je(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},Kl=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(n,o){return o(n)},r)}},Zl=function(e,t){return function(i){return e(parseFloat(i))+(t||je(i))}},Ql=function(e,t,i){return va(e,t,0,1,i)},ya=function(e,t,i){return Fi(i,function(r){return e[~~t(r)]})},ec=function s(e,t,i){var r=t-e;return Je(e)?ya(e,s(0,e.length),t):Fi(i,function(n){return(r+(n-e)%r)%r+e})},tc=function s(e,t,i){var r=t-e,n=r*2;return Je(e)?ya(e,s(0,e.length-1),t):Fi(i,function(o){return o=(n+(o-e)%n)%n||0,e+(o>r?n-o:o)})},rn=function(e){return e.replace(Il,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Ll);return ma(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},va=function(e,t,i,r,n){var o=t-e,a=r-i;return Fi(n,function(l){return i+((l-e)/o*a||0)})},ic=function s(e,t,i,r){var n=isNaN(e+t)?0:function(u){return(1-u)*e+u*t};if(!n){var o=ze(e),a={},l,c,d,h,p;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Je(e)&&!Je(t)){for(d=[],h=e.length,p=h-2,c=1;c<h;c++)d.push(s(e[c-1],e[c]));h--,n=function(g){g*=h;var f=Math.min(p,~~g);return d[f](g-f)},i=t}else r||(e=_r(Je(e)?[]:{},e));if(!d){for(l in t)Ws.call(a,e,l,"get",t[l]);n=function(g){return Xs(g,a)||(o?e.p:e)}}}return Fi(i,n)},mo=function(e,t,i){var r=e.labels,n=Lt,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&n>(a=Math.abs(a))&&(l=o,n=a);return l},St=function(e,t,i){var r=e.vars,n=r[t],o=ue,a=e._ctx,l,c,d;if(n)return l=r[t+"Params"],c=r.callbackScope||e,i&&Si.length&&zn(),a&&(ue=a),d=l?n.apply(c,l):n.call(c),ue=o,d},Ir=function(e){return Ci(e),e.scrollTrigger&&e.scrollTrigger.kill(!!qe),e.progress()<1&&St(e,"onInterrupt"),e},hr,xa=[],ba=function(e){if(e)if(e=!e.name&&e.default||e,Ns()||e.headless){var t=e.name,i=xe(e),r=t&&!i&&e.init?function(){this._props=[]}:e,n={init:tn,render:Xs,add:Ws,kill:xc,modifier:vc,rawVars:0},o={targetTest:0,get:0,getSetter:js,aliases:{},register:0};if(Tr(),e!==r){if(bt[t])return;Pt(r,Pt(Nn(e,n),o)),_r(r.prototype,_r(n,Nn(e,o))),bt[r.prop=t]=r,e.targetTest&&(Cn.push(r),qs[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}ia(t,r),e.register&&e.register(ft,r,ht)}else xa.push(e)},ae=255,Lr={aqua:[0,ae,ae],lime:[0,ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ae],navy:[0,0,128],white:[ae,ae,ae],olive:[128,128,0],yellow:[ae,ae,0],orange:[ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ae,0,0],pink:[ae,192,203],cyan:[0,ae,ae],transparent:[ae,ae,ae,0]},es=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*ae+.5|0},_a=function(e,t,i){var r=e?ui(e)?[e>>16,e>>8&ae,e&ae]:0:Lr.black,n,o,a,l,c,d,h,p,u,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Lr[e])r=Lr[e];else if(e.charAt(0)==="#"){if(e.length<6&&(n=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+n+n+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&ae,r&ae,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&ae,e&ae]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(uo),!t)l=+r[0]%360/360,c=+r[1]/100,d=+r[2]/100,o=d<=.5?d*(c+1):d+c-d*c,n=d*2-o,r.length>3&&(r[3]*=1),r[0]=es(l+1/3,n,o),r[1]=es(l,n,o),r[2]=es(l-1/3,n,o);else if(~e.indexOf("="))return r=e.match(Zo),i&&r.length<4&&(r[3]=1),r}else r=e.match(uo)||Lr.transparent;r=r.map(Number)}return t&&!g&&(n=r[0]/ae,o=r[1]/ae,a=r[2]/ae,h=Math.max(n,o,a),p=Math.min(n,o,a),d=(h+p)/2,h===p?l=c=0:(u=h-p,c=d>.5?u/(2-h-p):u/(h+p),l=h===n?(o-a)/u+(o<a?6:0):h===o?(a-n)/u+2:(n-o)/u+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(d*100+.5)),i&&r.length<4&&(r[3]=1),r},wa=function(e){var t=[],i=[],r=-1;return e.split(Mi).forEach(function(n){var o=n.match(ur)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},yo=function(e,t,i){var r="",n=(e+r).match(Mi),o=t?"hsla(":"rgba(",a=0,l,c,d,h;if(!n)return e;if(n=n.map(function(p){return(p=_a(p,t,1))&&o+(t?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),i&&(d=wa(e),l=i.c,l.join(r)!==d.c.join(r)))for(c=e.replace(Mi,"1").split(ur),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?n.shift()||o+"0,0,0,0)":(d.length?d:n.length?n:i).shift());if(!c)for(c=e.split(Mi),h=c.length-1;a<h;a++)r+=c[a]+n[a];return r+c[h]},Mi=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Lr)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),rc=/hsl[a]?\(/,Ea=function(e){var t=e.join(" "),i;if(Mi.lastIndex=0,Mi.test(t))return i=rc.test(t),e[1]=yo(e[1],i),e[0]=yo(e[0],i,wa(e[1])),!0},nn,Et=function(){var s=Date.now,e=500,t=33,i=s(),r=i,n=1e3/240,o=n,a=[],l,c,d,h,p,u,g=function f(y){var w=s()-r,x=y===!0,E,b,T,P;if((w>e||w<0)&&(i+=w-t),r+=w,T=r-i,E=T-o,(E>0||x)&&(P=++h.frame,p=T-h.time*1e3,h.time=T=T/1e3,o+=E+(E>=n?4:n-E),b=1),x||(l=c(f)),b)for(u=0;u<a.length;u++)a[u](T,p,P,y)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(y){return p/(1e3/(y||60))},wake:function(){ea&&(!ps&&Ns()&&(jt=ps=window,Bs=jt.document||{},Ct.gsap=ft,(jt.gsapVersions||(jt.gsapVersions=[])).push(ft.version),ta(Dn||jt.GreenSockGlobals||!jt.gsap&&jt||{}),xa.forEach(ba)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=d||function(y){return setTimeout(y,o-h.time*1e3+1|0)},nn=1,g(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(l),nn=0,c=tn},lagSmoothing:function(y,w){e=y||1/0,t=Math.min(w||33,e)},fps:function(y){n=1e3/(y||240),o=h.time*1e3+n},add:function(y,w,x){var E=w?function(b,T,P,_){y(b,T,P,_),h.remove(E)}:y;return h.remove(y),a[x?"unshift":"push"](E),Tr(),E},remove:function(y,w){~(w=a.indexOf(y))&&a.splice(w,1)&&u>=w&&u--},_listeners:a},h}(),Tr=function(){return!nn&&Et.wake()},Q={},nc=/^[\d.\-M][\d.\-,\s]/,sc=/["']/g,oc=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],n=1,o=i.length,a,l,c;n<o;n++)l=i[n],a=n!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(sc,"").trim():+c,r=l.substr(a+1).trim();return t},ac=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},lc=function(e){var t=(e+"").split("("),i=Q[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[oc(t[1])]:ac(e).split(",").map(oa)):Q._CE&&nc.test(e)?Q._CE("",e):i},cc=function(e){return function(t){return 1-e(1-t)}},Gi=function(e,t){return e&&(xe(e)?e:Q[e]||lc(e))||t},tr=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var n={easeIn:t,easeOut:i,easeInOut:r},o;return ut(e,function(a){Q[a]=Ct[a]=n,Q[o=a.toLowerCase()]=i;for(var l in n)Q[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Q[a+"."+l]=n[l]}),n},Ta=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},ts=function s(e,t,i){var r=t>=1?t:1,n=(i||(e?.3:.45))/(t<1?t:1),o=n/hs*(Math.asin(1/r)||0),a=function(d){return d===1?1:r*Math.pow(2,-10*d)*Rl((d-o)*n)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Ta(a);return n=hs/n,l.config=function(c,d){return s(e,c,d)},l},is=function s(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(n){return 1-i(1-n)}:Ta(i);return r.config=function(n){return s(e,n)},r};ut("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;tr(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Q.Linear.easeNone=Q.none=Q.Linear.easeIn;tr("Elastic",ts("in"),ts("out"),ts());(function(s,e){var t=1/e,i=2*t,r=2.5*t,n=function(a){return a<t?s*a*a:a<i?s*Math.pow(a-1.5/e,2)+.75:a<r?s*(a-=2.25/e)*a+.9375:s*Math.pow(a-2.625/e,2)+.984375};tr("Bounce",function(o){return 1-n(1-o)},n)})(7.5625,2.75);tr("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});tr("Circ",function(s){return-(Jo(1-s*s)-1)});tr("Sine",function(s){return s===1?1:-Fl(s*Al)+1});tr("Back",is("in"),is("out"),is());Q.SteppedEase=Q.steps=Ct.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),n=t?1:0,o=1-le;return function(a){return((r*dn(0,o,a)|0)+n)*i}}};Qr.ease=Q["quad.out"];ut("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return $s+=s+","+s+"Params,"});var Sa=function(e,t){this.id=Ol++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:na,this.set=t?t.getSetter:js},sn=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Er(this,+t.duration,1,1),this.data=t.data,ue&&(this._ctx=ue,ue.data.push(this)),nn||Et.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Er(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(Tr(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Xn(this,i),!n._dp||n.parent||ca(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Jt(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===le||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),sa(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+fo(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+fo(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*n,r):this._repeat?wr(this._tTime,n)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-le?0:this._rts;if(this._rts===i)return this;var n=this.parent&&this._ts?Bn(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-le?0:this._rts,this.totalTime(dn(-Math.abs(this._delay),this.totalDuration(),n),r!==!1),jn(this),Yl(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Tr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==le&&(this._tTime-=le)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=pe(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Jt(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(dt(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Bn(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Bl);var r=qe;return qe=i,Vs(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),qe=r,this},e.globalTime=function(i){for(var r=this,n=arguments.length?i:r.rawTime();r;)n=r._start+n/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):n},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,go(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,go(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Ft(this,i),dt(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,dt(r)),this._dur||(this._zTime=-le),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-le:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-le,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,n;return!!(!i||this._ts&&this._initted&&i.isActive()&&(n=i.rawTime(!0))>=r&&n<this.endTime(!0)-le)},e.eventCallback=function(i,r,n){var o=this.vars;return arguments.length>1?(r?(o[i]=r,n&&(o[i+"Params"]=n),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this,n=r._prom;return new Promise(function(o){var a=xe(i)?i:aa,l=function(){var d=r.then;r.then=null,n&&n(),xe(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=d),o(a),r.then=d};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Ir(this)},s}();Pt(sn.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-le,_prom:0,_ps:!1,_rts:1});var ct=function(s){Xo(e,s);function e(i,r){var n;return i===void 0&&(i={}),n=s.call(this,i)||this,n.labels={},n.smoothChildTiming=!!i.smoothChildTiming,n.autoRemoveChildren=!!i.autoRemoveChildren,n._sort=dt(i.sortChildren),fe&&Jt(i.parent||fe,oi(n),r),i.reversed&&n.reverse(),i.paused&&n.paused(!0),i.scrollTrigger&&da(oi(n),i.scrollTrigger),n}var t=e.prototype;return t.to=function(r,n,o){return $r(0,arguments,this),this},t.from=function(r,n,o){return $r(1,arguments,this),this},t.fromTo=function(r,n,o,a){return $r(2,arguments,this),this},t.set=function(r,n,o){return n.duration=0,n.parent=this,qr(n).repeatDelay||(n.repeat=0),n.immediateRender=!!n.immediateRender,new Pe(r,n,Ft(this,o),1),this},t.call=function(r,n,o){return Jt(this,Pe.delayedCall(0,r,n),o)},t.staggerTo=function(r,n,o,a,l,c,d){return o.duration=n,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=d,o.parent=this,new Pe(r,o,Ft(this,l)),this},t.staggerFrom=function(r,n,o,a,l,c,d){return o.runBackwards=1,qr(o).immediateRender=dt(o.immediateRender),this.staggerTo(r,n,o,a,l,c,d)},t.staggerFromTo=function(r,n,o,a,l,c,d,h){return a.startAt=o,qr(a).immediateRender=dt(a.immediateRender),this.staggerTo(r,n,a,l,c,d,h)},t.render=function(r,n,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,d=r<=0?0:pe(r),h=this._zTime<0!=r<0&&(this._initted||!c),p,u,g,f,y,w,x,E,b,T,P,_;if(this!==fe&&d>l&&r>=0&&(d=l),d!==this._tTime||o||h){if(a!==this._time&&c&&(d+=this._time-a,r+=this._time-a),p=d,b=this._start,E=this._ts,w=!E,h&&(c||(a=this._zTime),(r||!n)&&(this._zTime=r)),this._repeat){if(P=this._yoyo,y=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(y*100+r,n,o);if(p=pe(d%y),d===l?(f=this._repeat,p=c):(T=pe(d/y),f=~~T,f&&f===T&&(p=c,f--),p>c&&(p=c)),T=wr(this._tTime,y),!a&&this._tTime&&T!==f&&this._tTime-T*y-this._dur<=0&&(T=f),P&&f&1&&(p=c-p,_=1),f!==T&&!this._lock){var A=P&&T&1,k=A===(P&&f&1);if(f<T&&(A=!A),a=A?0:d%c?c:d,this._lock=1,this.render(a||(_?0:pe(f*y)),n,!c)._lock=0,this._tTime=d,!n&&this.parent&&St(this,"onRepeat"),this.vars.repeatRefresh&&!_&&(this.invalidate()._lock=1,T=f),a&&a!==this._time||w!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,k&&(this._lock=2,a=A?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!_&&this.invalidate()),this._lock=0,!this._ts&&!w)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=Gl(this,pe(a),pe(p)),x&&(d-=p-(p=x._start))),this._tTime=d,this._time=p,this._act=!!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&d&&c&&!n&&!T&&(St(this,"onStart"),this._tTime!==d))return this;if(p>=a&&r>=0)for(u=this._first;u;){if(g=u._next,(u._act||p>=u._start)&&u._ts&&x!==u){if(u.parent!==this)return this.render(r,n,o);if(u.render(u._ts>0?(p-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(p-u._start)*u._ts,n,o),p!==this._time||!this._ts&&!w){x=0,g&&(d+=this._zTime=-le);break}}u=g}else{u=this._last;for(var M=r<0?r:p;u;){if(g=u._prev,(u._act||M<=u._end)&&u._ts&&x!==u){if(u.parent!==this)return this.render(r,n,o);if(u.render(u._ts>0?(M-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(M-u._start)*u._ts,n,o||qe&&Vs(u)),p!==this._time||!this._ts&&!w){x=0,g&&(d+=this._zTime=M?-le:le);break}}u=g}}if(x&&!n&&(this.pause(),x.render(p>=a?0:-le)._zTime=p>=a?1:-1,this._ts))return this._start=b,jn(this),this.render(r,n,o);this._onUpdate&&!n&&St(this,"onUpdate",!0),(d===l&&this._tTime>=this.totalDuration()||!d&&a)&&(b===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(d===l&&this._ts>0||!d&&this._ts<0)&&Ci(this,1),!n&&!(r<0&&!a)&&(d||a||!l)&&(St(this,d===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,n){var o=this;if(ui(n)||(n=Ft(this,n,r)),!(r instanceof sn)){if(Je(r))return r.forEach(function(a){return o.add(a,n)}),this;if(ze(r))return this.addLabel(r,n);if(xe(r))r=Pe.delayedCall(0,r);else return this}return this!==r?Jt(this,r,n):this},t.getChildren=function(r,n,o,a){r===void 0&&(r=!0),n===void 0&&(n=!0),o===void 0&&(o=!0),a===void 0&&(a=-Lt);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Pe?n&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,n,o)))),c=c._next;return l},t.getById=function(r){for(var n=this.getChildren(1,1,1),o=n.length;o--;)if(n[o].vars.id===r)return n[o]},t.remove=function(r){return ze(r)?this.removeLabel(r):xe(r)?this.killTweensOf(r):(r.parent===this&&Gn(this,r),r===this._recent&&(this._recent=this._last),Ui(this))},t.totalTime=function(r,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=pe(Et.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),s.prototype.totalTime.call(this,r,n),this._forcing=0,this):this._tTime},t.addLabel=function(r,n){return this.labels[r]=Ft(this,n),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,n,o){var a=Pe.delayedCall(0,n||tn,o);return a.data="isPause",this._hasPause=1,Jt(this,a,Ft(this,r))},t.removePause=function(r){var n=this._first;for(r=Ft(this,r);n;)n._start===r&&n.data==="isPause"&&Ci(n),n=n._next},t.killTweensOf=function(r,n,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)bi!==a[l]&&a[l].kill(r,n);return this},t.getTweensOf=function(r,n){for(var o=[],a=Dt(r),l=this._first,c=ui(n),d;l;)l instanceof Pe?Hl(l._targets,a)&&(c?(!bi||l._initted&&l._ts)&&l.globalTime(0)<=n&&l.globalTime(l.totalDuration())>n:!n||l.isActive())&&o.push(l):(d=l.getTweensOf(a,n)).length&&o.push.apply(o,d),l=l._next;return o},t.tweenTo=function(r,n){n=n||{};var o=this,a=Ft(o,r),l=n,c=l.startAt,d=l.onStart,h=l.onStartParams,p=l.immediateRender,u,g=Pe.to(o,Pt({ease:n.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:n.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||le,onStart:function(){if(o.pause(),!u){var y=n.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==y&&Er(g,y,0,1).render(g._time,!0,!0),u=1}d&&d.apply(g,h||[])}},n));return p?g.render(0):g},t.tweenFromTo=function(r,n,o){return this.tweenTo(n,Pt({startAt:{time:Ft(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),mo(this,Ft(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),mo(this,Ft(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+le)},t.shiftChildren=function(r,n,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=pe(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(n)for(c in l)l[c]>=o&&(l[c]+=r);return Ui(this)},t.invalidate=function(r){var n=this._first;for(this._lock=0;n;)n.invalidate(r),n=n._next;return s.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var n=this._first,o;n;)o=n._next,this.remove(n),n=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Ui(this)},t.totalDuration=function(r){var n=0,o=this,a=o._last,l=Lt,c,d,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),d=a._start,d>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Jt(o,a,d-a._delay,1)._lock=0):l=d,d<0&&a._ts&&(n-=d,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=pe(d/o._ts),o._time-=d,o._tTime-=d),o.shiftChildren(-d,!1,-1/0),l=0),a._end>n&&a._ts&&(n=a._end),a=c;Er(o,o===fe&&o._time>n?o._time:n,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(fe._ts&&(sa(fe,Bn(r,fe)),ra=Et.frame),Et.frame>=ho){ho+=kt.autoSleep||120;var n=fe._first;if((!n||!n._ts)&&kt.autoSleep&&Et._listeners.length<2){for(;n&&!n._ts;)n=n._next;n||Et.sleep()}}},e}(sn);Pt(ct.prototype,{_lock:0,_hasPause:0,_forcing:0});var dc=function(e,t,i,r,n,o,a){var l=new ht(this._pt,e,t,0,1,Oa,null,n),c=0,d=0,h,p,u,g,f,y,w,x;for(l.b=i,l.e=r,i+="",r+="",(w=~r.indexOf("random("))&&(r=rn(r)),o&&(x=[i,r],o(x,e,t),i=x[0],r=x[1]),p=i.match(Zn)||[];h=Zn.exec(r);)g=h[0],f=r.substring(c,h.index),u?u=(u+1)%5:f.substr(-5)==="rgba("&&(u=1),g!==p[d++]&&(y=parseFloat(p[d-1])||0,l._pt={_next:l._pt,p:f||d===1?f:",",s:y,c:g.charAt(1)==="="?fr(y,g)-y:parseFloat(g)-y,m:u&&u<4?Math.round:0},c=Zn.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Qo.test(r)||w)&&(l.e=0),this._pt=l,l},Ws=function(e,t,i,r,n,o,a,l,c,d){xe(r)&&(r=r(n||0,e,o));var h=e[t],p=i!=="get"?i:xe(h)?c?e[t.indexOf("set")||!xe(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,u=xe(h)?c?gc:Pa:Gs,g;if(ze(r)&&(~r.indexOf("random(")&&(r=rn(r)),r.charAt(1)==="="&&(g=fr(p,r)+(je(p)||0),(g||g===0)&&(r=g))),!d||p!==r||bs)return!isNaN(p*r)&&r!==""?(g=new ht(this._pt,e,t,+p||0,r-(p||0),typeof h=="boolean"?yc:Aa,0,u),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&Hs(t,r),dc.call(this,e,t,p,r,u,l||kt.stringFilter,c))},uc=function(e,t,i,r,n){if(xe(e)&&(e=Yr(e,n,t,i,r)),!ei(e)||e.style&&e.nodeType||Je(e)||Ko(e))return ze(e)?Yr(e,n,t,i,r):e;var o={},a;for(a in e)o[a]=Yr(e[a],n,t,i,r);return o},Ma=function(e,t,i,r,n,o){var a,l,c,d;if(bt[e]&&(a=new bt[e]).init(n,a.rawVars?t[e]:uc(t[e],r,n,o,i),i,r,o)!==!1&&(i._pt=l=new ht(i._pt,n,e,0,1,a.render,a,0,a.priority),i!==hr))for(c=i._ptLookup[i._targets.indexOf(n)],d=a._props.length;d--;)c[a._props[d]]=l;return a},bi,bs,Us=function s(e,t,i){var r=e.vars,n=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,d=r.runBackwards,h=r.yoyoEase,p=r.keyframes,u=r.autoRevert,g=e._dur,f=e._startAt,y=e._targets,w=e.parent,x=w&&w.data==="nested"?w.vars.targets:y,E=e._overwrite==="auto"&&!Ds,b=e.timeline,T=r.easeReverse||h,P,_,A,k,M,C,S,O,R,z,N,I,D;if(b&&(!p||!n)&&(n="none"),e._ease=Gi(n,Qr.ease),e._rEase=T&&(Gi(T)||e._ease),e._from=!b&&!!r.runBackwards,e._from&&(e.ratio=1),!b||p&&!r.stagger){if(O=y[0]?Wi(y[0]).harness:0,I=O&&r[O.prop],P=Nn(r,qs),f&&(f._zTime<0&&f.progress(1),t<0&&d&&a&&!u?f.render(-1,!0):f.revert(d&&g?kn:Nl),f._lazy=0),o){if(Ci(e._startAt=Pe.set(y,Pt({data:"isStart",overwrite:!1,parent:w,immediateRender:!0,lazy:!f&&dt(l),startAt:null,delay:0,onUpdate:c&&function(){return St(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(qe||!a&&!u)&&e._startAt.revert(kn),a&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(d&&g&&!f){if(t&&(a=!1),A=Pt({overwrite:!1,data:"isFromStart",lazy:a&&!f&&dt(l),immediateRender:a,stagger:0,parent:w},P),I&&(A[O.prop]=I),Ci(e._startAt=Pe.set(y,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(qe?e._startAt.revert(kn):e._startAt.render(-1,!0)),e._zTime=t,!a)s(e._startAt,le,le);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&dt(l)||l&&!g,_=0;_<y.length;_++){if(M=y[_],S=M._gsap||Ys(y)[_]._gsap,e._ptLookup[_]=z={},fs[S.id]&&Si.length&&zn(),N=x===y?_:x.indexOf(M),O&&(R=new O).init(M,I||P,e,N,x)!==!1&&(e._pt=k=new ht(e._pt,M,R.name,0,1,R.render,R,0,R.priority),R._props.forEach(function(q){z[q]=k}),R.priority&&(C=1)),!O||I)for(A in P)bt[A]&&(R=Ma(A,P,e,N,M,x))?R.priority&&(C=1):z[A]=k=Ws.call(e,M,A,"get",P[A],N,x,0,r.stringFilter);e._op&&e._op[_]&&e.kill(M,e._op[_]),E&&e._pt&&(bi=e,fe.killTweensOf(M,z,e.globalTime(t)),D=!e.parent,bi=0),e._pt&&l&&(fs[S.id]=1)}C&&Fa(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!D,p&&t<=0&&b.render(Lt,!0,!0)},hc=function(e,t,i,r,n,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],d,h,p,u;if(!c)for(c=e._ptCache[t]=[],p=e._ptLookup,u=e._targets.length;u--;){if(d=p[u][t],d&&d.d&&d.d._pt)for(d=d.d._pt;d&&d.p!==t&&d.fp!==t;)d=d._next;if(!d)return bs=1,e.vars[t]="+=0",Us(e,a),bs=0,l?en(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(d)}for(u=c.length;u--;)h=c[u],d=h._pt||h,d.s=(r||r===0)&&!n?r:d.s+(r||0)+o*d.c,d.c=i-d.s,h.e&&(h.e=Ee(i)+je(h.e)),h.b&&(h.b=d.s+je(h.b))},pc=function(e,t){var i=e[0]?Wi(e[0]).harness:0,r=i&&i.aliases,n,o,a,l;if(!r)return t;n=_r({},t);for(o in r)if(o in n)for(l=r[o].split(","),a=l.length;a--;)n[l[a]]=n[o];return n},fc=function(e,t,i,r){var n=t.ease||r||"power1.inOut",o,a;if(Je(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:n})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:n})},Yr=function(e,t,i,r,n){return xe(e)?e.call(t,i,r,n):ze(e)&&~e.indexOf("random(")?rn(e):e},ka=$s+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Ca={};ut(ka+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Ca[s]=1});var Pe=function(s){Xo(e,s);function e(i,r,n,o){var a;typeof r=="number"&&(n.duration=r,r=n,n=null),a=s.call(this,o?r:qr(r))||this;var l=a.vars,c=l.duration,d=l.delay,h=l.immediateRender,p=l.stagger,u=l.overwrite,g=l.keyframes,f=l.defaults,y=l.scrollTrigger,w=r.parent||fe,x=(Je(i)||Ko(i)?ui(i[0]):"length"in r)?[i]:Dt(i),E,b,T,P,_,A,k,M;if(a._targets=x.length?Ys(x):en("GSAP target "+i+" not found. https://gsap.com",!kt.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=u,g||p||fn(c)||fn(d)){r=a.vars;var C=r.easeReverse||r.yoyoEase;if(E=a.timeline=new ct({data:"nested",defaults:f||{},targets:w&&w.data==="nested"?w.vars.targets:x}),E.kill(),E.parent=E._dp=oi(a),E._start=0,p||fn(c)||fn(d)){if(P=x.length,k=p&&fa(p),ei(p))for(_ in p)~ka.indexOf(_)&&(M||(M={}),M[_]=p[_]);for(b=0;b<P;b++)T=Nn(r,Ca),T.stagger=0,C&&(T.easeReverse=C),M&&_r(T,M),A=x[b],T.duration=+Yr(c,oi(a),b,A,x),T.delay=(+Yr(d,oi(a),b,A,x)||0)-a._delay,!p&&P===1&&T.delay&&(a._delay=d=T.delay,a._start+=d,T.delay=0),E.to(A,T,k?k(b,A,x):0),E._ease=Q.none;E.duration()?c=d=0:a.timeline=0}else if(g){qr(Pt(E.vars.defaults,{ease:"none"})),E._ease=Gi(g.ease||r.ease||"none");var S=0,O,R,z;if(Je(g))g.forEach(function(N){return E.to(x,N,">")}),E.duration();else{T={};for(_ in g)_==="ease"||_==="easeEach"||fc(_,g[_],T,g.easeEach);for(_ in T)for(O=T[_].sort(function(N,I){return N.t-I.t}),S=0,b=0;b<O.length;b++)R=O[b],z={ease:R.e,duration:(R.t-(b?O[b-1].t:0))/100*c},z[_]=R.v,E.to(x,z,S),S+=z.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||a.duration(c=E.duration())}else a.timeline=0;return u===!0&&!Ds&&(bi=oi(a),fe.killTweensOf(x),bi=0),Jt(w,oi(a),n),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!g&&a._start===pe(w._time)&&dt(h)&&Vl(oi(a))&&w.data!=="nested")&&(a._tTime=-le,a.render(Math.max(0,-d)||0)),y&&da(oi(a),y),a}var t=e.prototype;return t.render=function(r,n,o){var a=this._time,l=this._tDur,c=this._dur,d=r<0,h=r>l-le&&!d?l:r<le?0:r,p,u,g,f,y,w,x,E;if(!c)Ul(this,r,n,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==d||this._lazy){if(p=h,E=this.timeline,this._repeat){if(f=c+this._rDelay,this._repeat<-1&&d)return this.totalTime(f*100+r,n,o);if(p=pe(h%f),h===l?(g=this._repeat,p=c):(y=pe(h/f),g=~~y,g&&g===y?(p=c,g--):p>c&&(p=c)),w=this._yoyo&&g&1,w&&(p=c-p),y=wr(this._tTime,f),p===a&&!o&&this._initted&&g===y)return this._tTime=h,this;g!==y&&this.vars.repeatRefresh&&!w&&!this._lock&&p!==f&&this._initted&&(this._lock=o=1,this.render(pe(f*g),!0).invalidate()._lock=0)}if(!this._initted){if(ua(this,d?r:p,o,n,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==y))return this;if(c!==this._dur)return this.render(r,n,o)}if(this._rEase){var b=p<a;if(b!==this._inv){var T=b?a:c-a;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=T?(b?-1:1)/T:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((p-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(p/c);if(this._from&&(this.ratio=x=1-x),this._tTime=h,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!n&&!y&&(St(this,"onStart"),this._tTime!==h))return this;for(u=this._pt;u;)u.r(x,u.d),u=u._next;E&&E.render(r<0?r:E._dur*E._ease(p/this._dur),n,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!n&&(d&&gs(this,r,n,o),St(this,"onUpdate")),this._repeat&&g!==y&&this.vars.onRepeat&&!n&&this.parent&&St(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(d&&!this._onUpdate&&gs(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ci(this,1),!n&&!(d&&!a)&&(h||a||w)&&(St(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),s.prototype.invalidate.call(this,r)},t.resetTo=function(r,n,o,a,l){nn||Et.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),d;return this._initted||Us(this,c),d=this._ease(c/this._dur),hc(this,r,n,o,a,d,c,l)?this.resetTo(r,n,o,a,1):(Xn(this,0),this.parent||la(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,n){if(n===void 0&&(n="all"),!r&&(!n||n==="all"))return this._lazy=this._pt=0,this.parent?Ir(this):this.scrollTrigger&&this.scrollTrigger.kill(!!qe),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,n,bi&&bi.vars.overwrite!==!0)._first||Ir(this),this.parent&&o!==this.timeline.totalDuration()&&Er(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Dt(r):a,c=this._ptLookup,d=this._pt,h,p,u,g,f,y,w;if((!n||n==="all")&&$l(a,l))return n==="all"&&(this._pt=0),Ir(this);for(h=this._op=this._op||[],n!=="all"&&(ze(n)&&(f={},ut(n,function(x){return f[x]=1}),n=f),n=pc(a,n)),w=a.length;w--;)if(~l.indexOf(a[w])){p=c[w],n==="all"?(h[w]=n,g=p,u={}):(u=h[w]=h[w]||{},g=n);for(f in g)y=p&&p[f],y&&((!("kill"in y.d)||y.d.kill(f)===!0)&&Gn(this,y,"_pt"),delete p[f]),u!=="all"&&(u[f]=1)}return this._initted&&!this._pt&&d&&Ir(this),this},e.to=function(r,n){return new e(r,n,arguments[2])},e.from=function(r,n){return $r(1,arguments)},e.delayedCall=function(r,n,o,a){return new e(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:n,onReverseComplete:n,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,n,o){return $r(2,arguments)},e.set=function(r,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new e(r,n)},e.killTweensOf=function(r,n,o){return fe.killTweensOf(r,n,o)},e}(sn);Pt(Pe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ut("staggerTo,staggerFrom,staggerFromTo",function(s){Pe[s]=function(){var e=new ct,t=ys.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var Gs=function(e,t,i){return e[t]=i},Pa=function(e,t,i){return e[t](i)},gc=function(e,t,i,r){return e[t](r.fp,i)},mc=function(e,t,i){return e.setAttribute(t,i)},js=function(e,t){return xe(e[t])?Pa:zs(e[t])&&e.setAttribute?mc:Gs},Aa=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},yc=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Oa=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Xs=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},vc=function(e,t,i,r){for(var n=this._pt,o;n;)o=n._next,n.p===r&&n.modifier(e,t,i),n=o},xc=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Gn(this,t,"_pt"):t.dep||(i=1),t=r;return!i},bc=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Fa=function(e){for(var t=e._pt,i,r,n,o;t;){for(i=t._next,r=n;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:n=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=n},ht=function(){function s(t,i,r,n,o,a,l,c,d){this.t=i,this.s=n,this.c=o,this.p=r,this.r=a||Aa,this.d=l||this,this.set=c||Gs,this.pr=d||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,r,n){this.mSet=this.mSet||this.set,this.set=bc,this.m=i,this.mt=n,this.tween=r},s}();ut($s+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return qs[s]=1});Ct.TweenMax=Ct.TweenLite=Pe;Ct.TimelineLite=Ct.TimelineMax=ct;fe=new ct({sortChildren:!1,defaults:Qr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});kt.stringFilter=Ea;var ji=[],Pn={},_c=[],vo=0,wc=0,rs=function(e){return(Pn[e]||_c).map(function(t){return t()})},_s=function(){var e=Date.now(),t=[];e-vo>2&&(rs("matchMediaInit"),ji.forEach(function(i){var r=i.queries,n=i.conditions,o,a,l,c;for(a in r)o=jt.matchMedia(r[a]).matches,o&&(l=1),o!==n[a]&&(n[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),rs("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),vo=e,rs("matchMedia"))},Ra=function(){function s(t,i){this.selector=i&&vs(i),this.data=[],this._r=[],this.isReverted=!1,this.id=wc++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,r,n){xe(i)&&(n=r,r=i,i=xe);var o=this,a=function(){var c=ue,d=o.selector,h;return c&&c!==o&&c.data.push(o),n&&(o.selector=vs(n)),ue=o,h=r.apply(o,arguments),xe(h)&&o._r.push(h),ue=c,o.selector=d,o.isReverted=!1,h};return o.last=a,i===xe?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=ue;ue=null,i(this),ue=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof s?i.push.apply(i,r.getTweens()):r instanceof Pe&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var n=this;if(i?function(){for(var a=n.getTweens(),l=n.data.length,c;l--;)c=n.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(d){return a.splice(a.indexOf(d),1)}));for(a.map(function(d){return{g:d._dur||d._delay||d._sat&&!d._sat.vars.immediateRender?d.globalTime(0):-1/0,t:d}}).sort(function(d,h){return h.g-d.g||-1/0}).forEach(function(d){return d.t.revert(i)}),l=n.data.length;l--;)c=n.data[l],c instanceof ct?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Pe)&&c.revert&&c.revert(i);n._r.forEach(function(d){return d(i,n)}),n.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=ji.length;o--;)ji[o].id===this.id&&ji.splice(o,1)},e.revert=function(i){this.kill(i||{})},s}(),Ec=function(){function s(t){this.contexts=[],this.scope=t,ue&&ue.data.push(this)}var e=s.prototype;return e.add=function(i,r,n){ei(i)||(i={matches:i});var o=new Ra(0,n||this.scope),a=o.conditions={},l,c,d;ue&&!o.selector&&(o.selector=ue.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(c in i)c==="all"?d=1:(l=jt.matchMedia(i[c]),l&&(ji.indexOf(o)<0&&ji.push(o),(a[c]=l.matches)&&(d=1),l.addListener?l.addListener(_s):l.addEventListener("change",_s)));return d&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},s}(),Hn={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return ba(r)})},timeline:function(e){return new ct(e)},getTweensOf:function(e,t){return fe.getTweensOf(e,t)},getProperty:function(e,t,i,r){ze(e)&&(e=Dt(e)[0]);var n=Wi(e||{}).get,o=i?aa:oa;return i==="native"&&(i=""),e&&(t?o((bt[t]&&bt[t].get||n)(e,t,i,r)):function(a,l,c){return o((bt[a]&&bt[a].get||n)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=Dt(e),e.length>1){var r=e.map(function(d){return ft.quickSetter(d,t,i)}),n=r.length;return function(d){for(var h=n;h--;)r[h](d)}}e=e[0]||{};var o=bt[t],a=Wi(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(d){var h=new o;hr._pt=0,h.init(e,i?d+i:d,hr,0,[e]),h.render(1,h),hr._pt&&Xs(1,hr)}:a.set(e,l);return o?c:function(d){return c(e,l,i?d+i:d,a,1)}},quickTo:function(e,t,i){var r,n=ft.to(e,Pt((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,c,d){return n.resetTo(t,l,c,d)};return o.tween=n,o},isTweening:function(e){return fe.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Gi(e.ease,Qr.ease)),po(Qr,e||{})},config:function(e){return po(kt,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,n=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!bt[a]&&!Ct[a]&&en(t+" effect requires "+a+" plugin.")}),Qn[t]=function(a,l,c){return i(Dt(a),Pt(l||{},n),c)},o&&(ct.prototype[t]=function(a,l,c){return this.add(Qn[t](a,ei(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Q[e]=Gi(t)},parseEase:function(e,t){return arguments.length?Gi(e,t):Q},getById:function(e){return fe.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new ct(e),r,n;for(i.smoothChildTiming=dt(e.smoothChildTiming),fe.remove(i),i._dp=0,i._time=i._tTime=fe._time,r=fe._first;r;)n=r._next,(t||!(!r._dur&&r instanceof Pe&&r.vars.onComplete===r._targets[0]))&&Jt(i,r,r._start-r._delay),r=n;return Jt(fe,i,0),i},context:function(e,t){return e?new Ra(e,t):ue},matchMedia:function(e){return new Ec(e)},matchMediaRefresh:function(){return ji.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||_s()},addEventListener:function(e,t){var i=Pn[e]||(Pn[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Pn[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:ec,wrapYoyo:tc,distribute:fa,random:ma,snap:ga,normalize:Ql,getUnit:je,clamp:Xl,splitColor:_a,toArray:Dt,selector:vs,mapRange:va,pipe:Kl,unitize:Zl,interpolate:ic,shuffle:pa},install:ta,effects:Qn,ticker:Et,updateRoot:ct.updateRoot,plugins:bt,globalTimeline:fe,core:{PropTween:ht,globals:ia,Tween:Pe,Timeline:ct,Animation:sn,getCache:Wi,_removeLinkedListItem:Gn,reverting:function(){return qe},context:function(e){return e&&ue&&(ue.data.push(e),e._ctx=ue),ue},suppressOverwrites:function(e){return Ds=e}}};ut("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Hn[s]=Pe[s]});Et.add(ct.updateRoot);hr=Hn.to({},{duration:0});var Tc=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Sc=function(e,t){var i=e._targets,r,n,o;for(r in t)for(n=i.length;n--;)o=e._ptLookup[n][r],o&&(o=o.d)&&(o._pt&&(o=Tc(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[n],r))},ns=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,n,o){o._onInit=function(a){var l,c;if(ze(n)&&(l={},ut(n,function(d){return l[d]=1}),n=l),t){l={};for(c in n)l[c]=t(n[c]);n=l}Sc(a,n)}}}},ft=Hn.registerPlugin({name:"attr",init:function(e,t,i,r,n){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,n,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)qe?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},ns("roundProps",xs),ns("modifiers"),ns("snap",ga))||Hn;Pe.version=ct.version=ft.version="3.15.0";ea=1;Ns()&&Tr();Q.Power0;Q.Power1;Q.Power2;Q.Power3;Q.Power4;Q.Linear;Q.Quad;Q.Cubic;Q.Quart;Q.Quint;Q.Strong;Q.Elastic;Q.Back;Q.SteppedEase;Q.Bounce;Q.Sine;Q.Expo;Q.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xo,_i,gr,Js,Yi,bo,Ks,Mc=function(){return typeof window<"u"},hi={},Hi=180/Math.PI,mr=Math.PI/180,sr=Math.atan2,_o=1e8,Zs=/([A-Z])/g,kc=/(left|right|width|margin|padding|x)/i,Cc=/[\s,\(]\S/,Kt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ws=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Pc=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ac=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Oc=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Fc=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Ia=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},La=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Rc=function(e,t,i){return e.style[t]=i},Ic=function(e,t,i){return e.style.setProperty(t,i)},Lc=function(e,t,i){return e._gsap[t]=i},Dc=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},zc=function(e,t,i,r,n){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(n,o)},Nc=function(e,t,i,r,n){var o=e._gsap;o[t]=i,o.renderTransform(n,o)},ge="transform",pt=ge+"Origin",Bc=function s(e,t){var i=this,r=this.target,n=r.style,o=r._gsap;if(e in hi&&n){if(this.tfm=this.tfm||{},e!=="transform")e=Kt[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=ai(r,a)}):this.tfm[e]=o.x?o[e]:ai(r,e),e===pt&&(this.tfm.zOrigin=o.zOrigin);else return Kt.transform.split(",").forEach(function(a){return s.call(i,a,t)});if(this.props.indexOf(ge)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(pt,t,"")),e=ge}(n||t)&&this.props.push(e,t,n[e])},Da=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Hc=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,n,o;for(n=0;n<e.length;n+=3)e[n+1]?e[n+1]===2?t[e[n]](e[n+2]):t[e[n]]=e[n+2]:e[n+2]?i[e[n]]=e[n+2]:i.removeProperty(e[n].substr(0,2)==="--"?e[n]:e[n].replace(Zs,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),n=Ks(),(!n||!n.isStart)&&!i[ge]&&(Da(i),r.zOrigin&&i[pt]&&(i[pt]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},za=function(e,t){var i={target:e,props:[],revert:Hc,save:Bc};return e._gsap||ft.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},Na,Es=function(e,t){var i=_i.createElementNS?_i.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):_i.createElement(e);return i&&i.style?i:_i.createElement(e)},Mt=function s(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Zs,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&s(e,Sr(t)||t,1)||""},wo="O,Moz,ms,Ms,Webkit".split(","),Sr=function(e,t,i){var r=t||Yi,n=r.style,o=5;if(e in n&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(wo[o]+e in n););return o<0?null:(o===3?"ms":o>=0?wo[o]:"")+e},Ts=function(){Mc()&&window.document&&(xo=window,_i=xo.document,gr=_i.documentElement,Yi=Es("div")||{style:{}},Es("div"),ge=Sr(ge),pt=ge+"Origin",Yi.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Na=!!Sr("perspective"),Ks=ft.core.reverting,Js=1)},Eo=function(e){var t=e.ownerSVGElement,i=Es("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),n;r.style.display="block",i.appendChild(r),gr.appendChild(i);try{n=r.getBBox()}catch{}return i.removeChild(r),gr.removeChild(i),n},To=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Ba=function(e){var t,i;try{t=e.getBBox()}catch{t=Eo(e),i=1}return t&&(t.width||t.height)||i||(t=Eo(e)),t&&!t.width&&!t.x&&!t.y?{x:+To(e,["x","cx","x1"])||0,y:+To(e,["y","cy","y1"])||0,width:0,height:0}:t},Ha=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Ba(e))},Pi=function(e,t){if(t){var i=e.style,r;t in hi&&t!==pt&&(t=ge),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Zs,"-$1").toLowerCase())):i.removeAttribute(t)}},wi=function(e,t,i,r,n,o){var a=new ht(e._pt,t,i,0,1,o?La:Ia);return e._pt=a,a.b=r,a.e=n,e._props.push(i),a},So={deg:1,rad:1,turn:1},qc={grid:1,flex:1},Ai=function s(e,t,i,r){var n=parseFloat(i)||0,o=(i+"").trim().substr((n+"").length)||"px",a=Yi.style,l=kc.test(t),c=e.tagName.toLowerCase()==="svg",d=(c?"client":"offset")+(l?"Width":"Height"),h=100,p=r==="px",u=r==="%",g,f,y,w;if(r===o||!n||So[r]||So[o])return n;if(o!=="px"&&!p&&(n=s(e,t,i,"px")),w=e.getCTM&&Ha(e),(u||o==="%")&&(hi[t]||~t.indexOf("adius")))return g=w?e.getBBox()[l?"width":"height"]:e[d],Ee(u?n/g*h:n/100*g);if(a[l?"width":"height"]=h+(p?o:r),f=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,w&&(f=(e.ownerSVGElement||{}).parentNode),(!f||f===_i||!f.appendChild)&&(f=_i.body),y=f._gsap,y&&u&&y.width&&l&&y.time===Et.time&&!y.uncache)return Ee(n/y.width*h);if(u&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+r,g=e[d],x?e.style[t]=x:Pi(e,t)}else(u||o==="%")&&!qc[Mt(f,"display")]&&(a.position=Mt(e,"position")),f===e&&(a.position="static"),f.appendChild(Yi),g=Yi[d],f.removeChild(Yi),a.position="absolute";return l&&u&&(y=Wi(f),y.time=Et.time,y.width=f[d]),Ee(p?g*n/h:g&&n?h/g*n:0)},ai=function(e,t,i,r){var n;return Js||Ts(),t in Kt&&t!=="transform"&&(t=Kt[t],~t.indexOf(",")&&(t=t.split(",")[0])),hi[t]&&t!=="transform"?(n=an(e,r),n=t!=="transformOrigin"?n[t]:n.svg?n.origin:$n(Mt(e,pt))+" "+n.zOrigin+"px"):(n=e.style[t],(!n||n==="auto"||r||~(n+"").indexOf("calc("))&&(n=qn[t]&&qn[t](e,t,i)||Mt(e,t)||na(e,t)||(t==="opacity"?1:0))),i&&!~(n+"").trim().indexOf(" ")?Ai(e,t,n,i)+i:n},$c=function(e,t,i,r){if(!i||i==="none"){var n=Sr(t,e,1),o=n&&Mt(e,n,1);o&&o!==i?(t=n,i=o):t==="borderColor"&&(i=Mt(e,"borderTopColor"))}var a=new ht(this._pt,e.style,t,0,1,Oa),l=0,c=0,d,h,p,u,g,f,y,w,x,E,b,T;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Mt(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(f=e.style[t],e.style[t]=r,r=Mt(e,t)||r,f?e.style[t]=f:Pi(e,t)),d=[i,r],Ea(d),i=d[0],r=d[1],p=i.match(ur)||[],T=r.match(ur)||[],T.length){for(;h=ur.exec(r);)y=h[0],x=r.substring(l,h.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),y!==(f=p[c++]||"")&&(u=parseFloat(f)||0,b=f.substr((u+"").length),y.charAt(1)==="="&&(y=fr(u,y)+b),w=parseFloat(y),E=y.substr((w+"").length),l=ur.lastIndex-E.length,E||(E=E||kt.units[t]||b,l===r.length&&(r+=E,a.e+=E)),b!==E&&(u=Ai(e,t,f,E)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:u,c:w-u,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?La:Ia;return Qo.test(r)&&(a.e=0),this._pt=a,a},Mo={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Yc=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Mo[i]||i,t[1]=Mo[r]||r,t.join(" ")},Vc=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,n=t.u,o=i._gsap,a,l,c;if(n==="all"||n===!0)r.cssText="",l=1;else for(n=n.split(","),c=n.length;--c>-1;)a=n[c],hi[a]&&(l=1,a=a==="transformOrigin"?pt:ge),Pi(i,a);l&&(Pi(i,ge),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",an(i,1),o.uncache=1,Da(r)))}},qn={clearProps:function(e,t,i,r,n){if(n.data!=="isFromStart"){var o=e._pt=new ht(e._pt,t,i,0,0,Vc);return o.u=r,o.pr=-10,o.tween=n,e._props.push(i),1}}},on=[1,0,0,1,0,0],qa={},$a=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ko=function(e){var t=Mt(e,ge);return $a(t)?on:t.substr(7).match(Zo).map(Ee)},Qs=function(e,t){var i=e._gsap||Wi(e),r=e.style,n=ko(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,n=[l.a,l.b,l.c,l.d,l.e,l.f],n.join(",")==="1,0,0,1,0,0"?on:n):(n===on&&!e.offsetParent&&e!==gr&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,gr.appendChild(e)),n=ko(e),l?r.display=l:Pi(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):gr.removeChild(e))),t&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n)},Ss=function(e,t,i,r,n,o){var a=e._gsap,l=n||Qs(e,!0),c=a.xOrigin||0,d=a.yOrigin||0,h=a.xOffset||0,p=a.yOffset||0,u=l[0],g=l[1],f=l[2],y=l[3],w=l[4],x=l[5],E=t.split(" "),b=parseFloat(E[0])||0,T=parseFloat(E[1])||0,P,_,A,k;i?l!==on&&(_=u*y-g*f)&&(A=b*(y/_)+T*(-f/_)+(f*x-y*w)/_,k=b*(-g/_)+T*(u/_)-(u*x-g*w)/_,b=A,T=k):(P=Ba(e),b=P.x+(~E[0].indexOf("%")?b/100*P.width:b),T=P.y+(~(E[1]||E[0]).indexOf("%")?T/100*P.height:T)),r||r!==!1&&a.smooth?(w=b-c,x=T-d,a.xOffset=h+(w*u+x*f)-w,a.yOffset=p+(w*g+x*y)-x):a.xOffset=a.yOffset=0,a.xOrigin=b,a.yOrigin=T,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[pt]="0px 0px",o&&(wi(o,a,"xOrigin",c,b),wi(o,a,"yOrigin",d,T),wi(o,a,"xOffset",h,a.xOffset),wi(o,a,"yOffset",p,a.yOffset)),e.setAttribute("data-svg-origin",b+" "+T)},an=function(e,t){var i=e._gsap||new Sa(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,n=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Mt(e,pt)||"0",d,h,p,u,g,f,y,w,x,E,b,T,P,_,A,k,M,C,S,O,R,z,N,I,D,q,m,$,K,ie,ne,ce;return d=h=p=f=y=w=x=E=b=0,u=g=1,i.svg=!!(e.getCTM&&Ha(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[ge]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ge]!=="none"?l[ge]:"")),r.scale=r.rotate=r.translate="none"),_=Qs(e,i.svg),i.svg&&(i.uncache?(D=e.getBBox(),c=i.xOrigin-D.x+"px "+(i.yOrigin-D.y)+"px",I=""):I=!t&&e.getAttribute("data-svg-origin"),Ss(e,I||c,!!I||i.originIsAbsolute,i.smooth!==!1,_)),T=i.xOrigin||0,P=i.yOrigin||0,_!==on&&(C=_[0],S=_[1],O=_[2],R=_[3],d=z=_[4],h=N=_[5],_.length===6?(u=Math.sqrt(C*C+S*S),g=Math.sqrt(R*R+O*O),f=C||S?sr(S,C)*Hi:0,x=O||R?sr(O,R)*Hi+f:0,x&&(g*=Math.abs(Math.cos(x*mr))),i.svg&&(d-=T-(T*C+P*O),h-=P-(T*S+P*R))):(ce=_[6],ie=_[7],m=_[8],$=_[9],K=_[10],ne=_[11],d=_[12],h=_[13],p=_[14],A=sr(ce,K),y=A*Hi,A&&(k=Math.cos(-A),M=Math.sin(-A),I=z*k+m*M,D=N*k+$*M,q=ce*k+K*M,m=z*-M+m*k,$=N*-M+$*k,K=ce*-M+K*k,ne=ie*-M+ne*k,z=I,N=D,ce=q),A=sr(-O,K),w=A*Hi,A&&(k=Math.cos(-A),M=Math.sin(-A),I=C*k-m*M,D=S*k-$*M,q=O*k-K*M,ne=R*M+ne*k,C=I,S=D,O=q),A=sr(S,C),f=A*Hi,A&&(k=Math.cos(A),M=Math.sin(A),I=C*k+S*M,D=z*k+N*M,S=S*k-C*M,N=N*k-z*M,C=I,z=D),y&&Math.abs(y)+Math.abs(f)>359.9&&(y=f=0,w=180-w),u=Ee(Math.sqrt(C*C+S*S+O*O)),g=Ee(Math.sqrt(N*N+ce*ce)),A=sr(z,N),x=Math.abs(A)>2e-4?A*Hi:0,b=ne?1/(ne<0?-ne:ne):0),i.svg&&(I=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!$a(Mt(e,ge)),I&&e.setAttribute("transform",I))),Math.abs(x)>90&&Math.abs(x)<270&&(n?(u*=-1,x+=f<=0?180:-180,f+=f<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=d-((i.xPercent=d&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-d)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=h-((i.yPercent=h&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=p+o,i.scaleX=Ee(u),i.scaleY=Ee(g),i.rotation=Ee(f)+a,i.rotationX=Ee(y)+a,i.rotationY=Ee(w)+a,i.skewX=x+a,i.skewY=E+a,i.transformPerspective=b+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[pt]=$n(c)),i.xOffset=i.yOffset=0,i.force3D=kt.force3D,i.renderTransform=i.svg?Uc:Na?Ya:Wc,i.uncache=0,i},$n=function(e){return(e=e.split(" "))[0]+" "+e[1]},ss=function(e,t,i){var r=je(t);return Ee(parseFloat(t)+parseFloat(Ai(e,"x",i+"px",r)))+r},Wc=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Ya(e,t)},Ni="0deg",Or="0px",Bi=") ",Ya=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,d=i.rotationY,h=i.rotationX,p=i.skewX,u=i.skewY,g=i.scaleX,f=i.scaleY,y=i.transformPerspective,w=i.force3D,x=i.target,E=i.zOrigin,b="",T=w==="auto"&&e&&e!==1||w===!0;if(E&&(h!==Ni||d!==Ni)){var P=parseFloat(d)*mr,_=Math.sin(P),A=Math.cos(P),k;P=parseFloat(h)*mr,k=Math.cos(P),o=ss(x,o,_*k*-E),a=ss(x,a,-Math.sin(P)*-E),l=ss(x,l,A*k*-E+E)}y!==Or&&(b+="perspective("+y+Bi),(r||n)&&(b+="translate("+r+"%, "+n+"%) "),(T||o!==Or||a!==Or||l!==Or)&&(b+=l!==Or||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Bi),c!==Ni&&(b+="rotate("+c+Bi),d!==Ni&&(b+="rotateY("+d+Bi),h!==Ni&&(b+="rotateX("+h+Bi),(p!==Ni||u!==Ni)&&(b+="skew("+p+", "+u+Bi),(g!==1||f!==1)&&(b+="scale("+g+", "+f+Bi),x.style[ge]=b||"translate(0, 0)"},Uc=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,d=i.skewY,h=i.scaleX,p=i.scaleY,u=i.target,g=i.xOrigin,f=i.yOrigin,y=i.xOffset,w=i.yOffset,x=i.forceCSS,E=parseFloat(o),b=parseFloat(a),T,P,_,A,k;l=parseFloat(l),c=parseFloat(c),d=parseFloat(d),d&&(d=parseFloat(d),c+=d,l+=d),l||c?(l*=mr,c*=mr,T=Math.cos(l)*h,P=Math.sin(l)*h,_=Math.sin(l-c)*-p,A=Math.cos(l-c)*p,c&&(d*=mr,k=Math.tan(c-d),k=Math.sqrt(1+k*k),_*=k,A*=k,d&&(k=Math.tan(d),k=Math.sqrt(1+k*k),T*=k,P*=k)),T=Ee(T),P=Ee(P),_=Ee(_),A=Ee(A)):(T=h,A=p,P=_=0),(E&&!~(o+"").indexOf("px")||b&&!~(a+"").indexOf("px"))&&(E=Ai(u,"x",o,"px"),b=Ai(u,"y",a,"px")),(g||f||y||w)&&(E=Ee(E+g-(g*T+f*_)+y),b=Ee(b+f-(g*P+f*A)+w)),(r||n)&&(k=u.getBBox(),E=Ee(E+r/100*k.width),b=Ee(b+n/100*k.height)),k="matrix("+T+","+P+","+_+","+A+","+E+","+b+")",u.setAttribute("transform",k),x&&(u.style[ge]=k)},Gc=function(e,t,i,r,n){var o=360,a=ze(n),l=parseFloat(n)*(a&&~n.indexOf("rad")?Hi:1),c=l-r,d=r+c+"deg",h,p;return a&&(h=n.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*_o)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*_o)%o-~~(c/o)*o)),e._pt=p=new ht(e._pt,t,i,r,c,Pc),p.e=d,p.u="deg",e._props.push(i),p},Co=function(e,t){for(var i in t)e[i]=t[i];return e},jc=function(e,t,i){var r=Co({},i._gsap),n="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,d,h,p,u,g;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[ge]=t,a=an(i,1),Pi(i,ge),i.setAttribute("transform",c)):(c=getComputedStyle(i)[ge],o[ge]=t,a=an(i,1),o[ge]=c);for(l in hi)c=r[l],d=a[l],c!==d&&n.indexOf(l)<0&&(u=je(c),g=je(d),h=u!==g?Ai(i,l,c,g):parseFloat(c),p=parseFloat(d),e._pt=new ht(e._pt,a,l,h,p-h,ws),e._pt.u=g||0,e._props.push(l));Co(a,r)};ut("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",r="Bottom",n="Left",o=(e<3?[t,i,r,n]:[t+n,t+i,r+i,r+n]).map(function(a){return e<2?s+a:"border"+a+s});qn[e>1?"border"+s:s]=function(a,l,c,d,h){var p,u;if(arguments.length<4)return p=o.map(function(g){return ai(a,g,c)}),u=p.join(" "),u.split(p[0]).length===5?p[0]:u;p=(d+"").split(" "),u={},o.forEach(function(g,f){return u[g]=p[f]=p[f]||p[(f-1)/2|0]}),a.init(l,u,h)}});var Va={name:"css",register:Ts,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,n){var o=this._props,a=e.style,l=i.vars.startAt,c,d,h,p,u,g,f,y,w,x,E,b,T,P,_,A,k;Js||Ts(),this.styles=this.styles||za(e),A=this.styles.props,this.tween=i;for(f in t)if(f!=="autoRound"&&(d=t[f],!(bt[f]&&Ma(f,t,i,r,e,n)))){if(u=typeof d,g=qn[f],u==="function"&&(d=d.call(i,r,e,n),u=typeof d),u==="string"&&~d.indexOf("random(")&&(d=rn(d)),g)g(this,e,f,d,i)&&(_=1);else if(f.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(f)+"").trim(),d+="",Mi.lastIndex=0,Mi.test(c)||(y=je(c),w=je(d),w?y!==w&&(c=Ai(e,f,c,w)+w):y&&(d+=y)),this.add(a,"setProperty",c,d,r,n,0,0,f),o.push(f),A.push(f,0,a[f]);else if(u!=="undefined"){if(l&&f in l?(c=typeof l[f]=="function"?l[f].call(i,r,e,n):l[f],ze(c)&&~c.indexOf("random(")&&(c=rn(c)),je(c+"")||c==="auto"||(c+=kt.units[f]||je(ai(e,f))||""),(c+"").charAt(1)==="="&&(c=ai(e,f))):c=ai(e,f),p=parseFloat(c),x=u==="string"&&d.charAt(1)==="="&&d.substr(0,2),x&&(d=d.substr(2)),h=parseFloat(d),f in Kt&&(f==="autoAlpha"&&(p===1&&ai(e,"visibility")==="hidden"&&h&&(p=0),A.push("visibility",0,a.visibility),wi(this,a,"visibility",p?"inherit":"hidden",h?"inherit":"hidden",!h)),f!=="scale"&&f!=="transform"&&(f=Kt[f],~f.indexOf(",")&&(f=f.split(",")[0]))),E=f in hi,E){if(this.styles.save(f),k=d,u==="string"&&d.substring(0,6)==="var(--"){if(d=Mt(e,d.substring(4,d.indexOf(")"))),d.substring(0,5)==="calc("){var M=e.style.perspective;e.style.perspective=d,d=Mt(e,"perspective"),M?e.style.perspective=M:Pi(e,"perspective")}h=parseFloat(d)}if(b||(T=e._gsap,T.renderTransform&&!t.parseTransform||an(e,t.parseTransform),P=t.smoothOrigin!==!1&&T.smooth,b=this._pt=new ht(this._pt,a,ge,0,1,T.renderTransform,T,0,-1),b.dep=1),f==="scale")this._pt=new ht(this._pt,T,"scaleY",T.scaleY,(x?fr(T.scaleY,x+h):h)-T.scaleY||0,ws),this._pt.u=0,o.push("scaleY",f),f+="X";else if(f==="transformOrigin"){A.push(pt,0,a[pt]),d=Yc(d),T.svg?Ss(e,d,0,P,0,this):(w=parseFloat(d.split(" ")[2])||0,w!==T.zOrigin&&wi(this,T,"zOrigin",T.zOrigin,w),wi(this,a,f,$n(c),$n(d)));continue}else if(f==="svgOrigin"){Ss(e,d,1,P,0,this);continue}else if(f in qa){Gc(this,T,f,p,x?fr(p,x+d):d);continue}else if(f==="smoothOrigin"){wi(this,T,"smooth",T.smooth,d);continue}else if(f==="force3D"){T[f]=d;continue}else if(f==="transform"){jc(this,d,e);continue}}else f in a||(f=Sr(f)||f);if(E||(h||h===0)&&(p||p===0)&&!Cc.test(d)&&f in a)y=(c+"").substr((p+"").length),h||(h=0),w=je(d)||(f in kt.units?kt.units[f]:y),y!==w&&(p=Ai(e,f,c,w)),this._pt=new ht(this._pt,E?T:a,f,p,(x?fr(p,x+h):h)-p,!E&&(w==="px"||f==="zIndex")&&t.autoRound!==!1?Fc:ws),this._pt.u=w||0,E&&k!==d?(this._pt.b=c,this._pt.e=k,this._pt.r=Oc):y!==w&&w!=="%"&&(this._pt.b=c,this._pt.r=Ac);else if(f in a)$c.call(this,e,f,c,x?x+d:d);else if(f in e)this.add(e,f,c||e[f],x?x+d:d,r,n);else if(f!=="parseTransform"){Hs(f,d);continue}E||(f in a?A.push(f,0,a[f]):typeof e[f]=="function"?A.push(f,2,e[f]()):A.push(f,1,c||e[f])),o.push(f)}}_&&Fa(this)},render:function(e,t){if(t.tween._time||!Ks())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:ai,aliases:Kt,getSetter:function(e,t,i){var r=Kt[t];return r&&r.indexOf(",")<0&&(t=r),t in hi&&t!==pt&&(e._gsap.x||ai(e,"x"))?i&&bo===i?t==="scale"?Dc:Lc:(bo=i||{})&&(t==="scale"?zc:Nc):e.style&&!zs(e.style[t])?Rc:~t.indexOf("-")?Ic:js(e,t)},core:{_removeProperty:Pi,_getMatrix:Qs}};ft.utils.checkPrefix=Sr;ft.core.getStyleSaver=za;(function(s,e,t,i){var r=ut(s+","+e+","+t,function(n){hi[n]=1});ut(e,function(n){kt.units[n]="deg",qa[n]=1}),Kt[r[13]]=s+","+e,ut(i,function(n){var o=n.split(":");Kt[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ut("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){kt.units[s]="px"});ft.registerPlugin(Va);var Wa=ft.registerPlugin(Va)||ft;Wa.core.Tween;function Xc(s,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(s,i.key,i)}}function Jc(s,e,t){return e&&Xc(s.prototype,e),s}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var He,An,Tt,Ei,Ti,yr,Ua,qi,vr,Ga,ci,Yt,ja,Xa=function(){return He||typeof window<"u"&&(He=window.gsap)&&He.registerPlugin&&He},Ja=1,pr=[],j=[],Qt=[],Vr=Date.now,Ms=function(e,t){return t},Kc=function(){var e=vr.core,t=e.bridge||{},i=e._scrollers,r=e._proxies;i.push.apply(i,j),r.push.apply(r,Qt),j=i,Qt=r,Ms=function(o,a){return t[o](a)}},ki=function(e,t){return~Qt.indexOf(e)&&Qt[Qt.indexOf(e)+1][t]},Wr=function(e){return!!~Ga.indexOf(e)},tt=function(e,t,i,r,n){return e.addEventListener(t,i,{passive:r!==!1,capture:!!n})},et=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},gn="scrollLeft",mn="scrollTop",ks=function(){return ci&&ci.isPressed||j.cache++},Yn=function(e,t){var i=function r(n){if(n||n===0){Ja&&(Tt.history.scrollRestoration="manual");var o=ci&&ci.isPressed;n=r.v=Math.round(n)||(ci&&ci.iOS?1:0),e(n),r.cacheID=j.cache,o&&Ms("ss",n)}else(t||j.cache!==r.cacheID||Ms("ref"))&&(r.cacheID=j.cache,r.v=e());return r.v+r.offset};return i.offset=0,e&&i},st={s:gn,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Yn(function(s){return arguments.length?Tt.scrollTo(s,Fe.sc()):Tt.pageXOffset||Ei[gn]||Ti[gn]||yr[gn]||0})},Fe={s:mn,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:st,sc:Yn(function(s){return arguments.length?Tt.scrollTo(st.sc(),s):Tt.pageYOffset||Ei[mn]||Ti[mn]||yr[mn]||0})},at=function(e,t){return(t&&t._ctx&&t._ctx.selector||He.utils.toArray)(e)[0]||(typeof e=="string"&&He.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Zc=function(e,t){for(var i=t.length;i--;)if(t[i]===e||t[i].contains(e))return!0;return!1},Oi=function(e,t){var i=t.s,r=t.sc;Wr(e)&&(e=Ei.scrollingElement||Ti);var n=j.indexOf(e),o=r===Fe.sc?1:2;!~n&&(n=j.push(e)-1),j[n+o]||tt(e,"scroll",ks);var a=j[n+o],l=a||(j[n+o]=Yn(ki(e,i),!0)||(Wr(e)?r:Yn(function(c){return arguments.length?e[i]=c:e[i]})));return l.target=e,a||(l.smooth=He.getProperty(e,"scrollBehavior")==="smooth"),l},Cs=function(e,t,i){var r=e,n=e,o=Vr(),a=o,l=t||50,c=Math.max(500,l*3),d=function(g,f){var y=Vr();f||y-o>l?(n=r,r=g,a=o,o=y):i?r+=g:r=n+(g-n)/(y-a)*(o-a)},h=function(){n=r=i?0:r,a=o=0},p=function(g){var f=a,y=n,w=Vr();return(g||g===0)&&g!==r&&d(g),o===a||w-a>c?0:(r+(i?y:-y))/((i?w:o)-f)*1e3};return{update:d,reset:h,getVelocity:p}},Fr=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Po=function(e){var t=Math.max.apply(Math,e),i=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(i)?t:i},Ka=function(){vr=He.core.globals().ScrollTrigger,vr&&vr.core&&Kc()},Za=function(e){return He=e||Xa(),!An&&He&&typeof document<"u"&&document.body&&(Tt=window,Ei=document,Ti=Ei.documentElement,yr=Ei.body,Ga=[Tt,Ei,Ti,yr],He.utils.clamp,ja=He.core.context||function(){},qi="onpointerenter"in yr?"pointer":"mouse",Ua=Te.isTouch=Tt.matchMedia&&Tt.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Tt||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Yt=Te.eventTypes=("ontouchstart"in Ti?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Ti?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Ja=0},500),An=1),vr||Ka(),An};st.op=Fe;j.cache=0;var Te=function(){function s(t){this.init(t)}var e=s.prototype;return e.init=function(i){An||Za(He)||console.warn("Please gsap.registerPlugin(Observer)"),vr||Ka();var r=i.tolerance,n=i.dragMinimum,o=i.type,a=i.target,l=i.lineHeight,c=i.debounce,d=i.preventDefault,h=i.onStop,p=i.onStopDelay,u=i.ignore,g=i.wheelSpeed,f=i.event,y=i.onDragStart,w=i.onDragEnd,x=i.onDrag,E=i.onPress,b=i.onRelease,T=i.onRight,P=i.onLeft,_=i.onUp,A=i.onDown,k=i.onChangeX,M=i.onChangeY,C=i.onChange,S=i.onToggleX,O=i.onToggleY,R=i.onHover,z=i.onHoverEnd,N=i.onMove,I=i.ignoreCheck,D=i.isNormalizer,q=i.onGestureStart,m=i.onGestureEnd,$=i.onWheel,K=i.onEnable,ie=i.onDisable,ne=i.onClick,ce=i.scrollSpeed,Se=i.capture,Me=i.allowClicks,Ke=i.lockAxis,$e=i.onLockAxis;this.target=a=at(a)||Ti,this.vars=i,u&&(u=He.utils.toArray(u)),r=r||1e-9,n=n||0,g=g||1,ce=ce||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Tt.getComputedStyle(yr).lineHeight)||22);var pi,Ze,Qe,ee,be,ot,gt,v=this,mt=0,ti=0,fi=i.passive||!d&&i.passive!==!1,ye=Oi(a,st),ii=Oi(a,Fe),gi=ye(),Ri=ii(),Re=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Yt[0]==="pointerdown",mi=Wr(a),_e=a.ownerDocument||Ei,Nt=[0,0,0],At=[0,0,0],ri=0,kr=function(){return ri=Vr()},ke=function(H,te){return(v.event=H)&&u&&Zc(H.target,u)||te&&Re&&H.pointerType!=="touch"||I&&I(H,te)},un=function(){v._vx.reset(),v._vy.reset(),Ze.pause(),h&&h(v)},ni=function(){var H=v.deltaX=Po(Nt),te=v.deltaY=Po(At),F=Math.abs(H)>=r,Y=Math.abs(te)>=r;C&&(F||Y)&&C(v,H,te,Nt,At),F&&(T&&v.deltaX>0&&T(v),P&&v.deltaX<0&&P(v),k&&k(v),S&&v.deltaX<0!=mt<0&&S(v),mt=v.deltaX,Nt[0]=Nt[1]=Nt[2]=0),Y&&(A&&v.deltaY>0&&A(v),_&&v.deltaY<0&&_(v),M&&M(v),O&&v.deltaY<0!=ti<0&&O(v),ti=v.deltaY,At[0]=At[1]=At[2]=0),(ee||Qe)&&(N&&N(v),Qe&&(y&&Qe===1&&y(v),x&&x(v),Qe=0),ee=!1),ot&&!(ot=!1)&&$e&&$e(v),be&&($(v),be=!1),pi=0},ir=function(H,te,F){Nt[F]+=H,At[F]+=te,v._vx.update(H),v._vy.update(te),c?pi||(pi=requestAnimationFrame(ni)):ni()},rr=function(H,te){Ke&&!gt&&(v.axis=gt=Math.abs(H)>Math.abs(te)?"x":"y",ot=!0),gt!=="y"&&(Nt[2]+=H,v._vx.update(H,!0)),gt!=="x"&&(At[2]+=te,v._vy.update(te,!0)),c?pi||(pi=requestAnimationFrame(ni)):ni()},yi=function(H){if(!ke(H,1)){H=Fr(H,d);var te=H.clientX,F=H.clientY,Y=te-v.x,B=F-v.y,V=v.isDragging;v.x=te,v.y=F,(V||(Y||B)&&(Math.abs(v.startX-te)>=n||Math.abs(v.startY-F)>=n))&&(Qe||(Qe=V?2:1),V||(v.isDragging=!0),rr(Y,B))}},Ii=v.onPress=function(W){ke(W,1)||W&&W.button||(v.axis=gt=null,Ze.pause(),v.isPressed=!0,W=Fr(W),mt=ti=0,v.startX=v.x=W.clientX,v.startY=v.y=W.clientY,v._vx.reset(),v._vy.reset(),tt(D?a:_e,Yt[1],yi,fi,!0),v.deltaX=v.deltaY=0,E&&E(v))},X=v.onRelease=function(W){if(!ke(W,1)){et(D?a:_e,Yt[1],yi,!0);var H=!isNaN(v.y-v.startY),te=v.isDragging,F=te&&(Math.abs(v.x-v.startX)>3||Math.abs(v.y-v.startY)>3),Y=Fr(W);!F&&H&&(v._vx.reset(),v._vy.reset(),d&&Me&&He.delayedCall(.08,function(){if(Vr()-ri>300&&!W.defaultPrevented){if(W.target.click)W.target.click();else if(_e.createEvent){var B=_e.createEvent("MouseEvents");B.initMouseEvent("click",!0,!0,Tt,1,Y.screenX,Y.screenY,Y.clientX,Y.clientY,!1,!1,!1,!1,0,null),W.target.dispatchEvent(B)}}})),v.isDragging=v.isGesturing=v.isPressed=!1,h&&te&&!D&&Ze.restart(!0),Qe&&ni(),w&&te&&w(v),b&&b(v,F)}},Li=function(H){return H.touches&&H.touches.length>1&&(v.isGesturing=!0)&&q(H,v.isDragging)},Bt=function(){return(v.isGesturing=!1)||m(v)},Ht=function(H){if(!ke(H)){var te=ye(),F=ii();ir((te-gi)*ce,(F-Ri)*ce,1),gi=te,Ri=F,h&&Ze.restart(!0)}},qt=function(H){if(!ke(H)){H=Fr(H,d),$&&(be=!0);var te=(H.deltaMode===1?l:H.deltaMode===2?Tt.innerHeight:1)*g;ir(H.deltaX*te,H.deltaY*te,0),h&&!D&&Ze.restart(!0)}},Di=function(H){if(!ke(H)){var te=H.clientX,F=H.clientY,Y=te-v.x,B=F-v.y;v.x=te,v.y=F,ee=!0,h&&Ze.restart(!0),(Y||B)&&rr(Y,B)}},nr=function(H){v.event=H,R(v)},si=function(H){v.event=H,z(v)},Cr=function(H){return ke(H)||Fr(H,d)&&ne(v)};Ze=v._dc=He.delayedCall(p||.25,un).pause(),v.deltaX=v.deltaY=0,v._vx=Cs(0,50,!0),v._vy=Cs(0,50,!0),v.scrollX=ye,v.scrollY=ii,v.isDragging=v.isGesturing=v.isPressed=!1,ja(this),v.enable=function(W){return v.isEnabled||(tt(mi?_e:a,"scroll",ks),o.indexOf("scroll")>=0&&tt(mi?_e:a,"scroll",Ht,fi,Se),o.indexOf("wheel")>=0&&tt(a,"wheel",qt,fi,Se),(o.indexOf("touch")>=0&&Ua||o.indexOf("pointer")>=0)&&(tt(a,Yt[0],Ii,fi,Se),tt(_e,Yt[2],X),tt(_e,Yt[3],X),Me&&tt(a,"click",kr,!0,!0),ne&&tt(a,"click",Cr),q&&tt(_e,"gesturestart",Li),m&&tt(_e,"gestureend",Bt),R&&tt(a,qi+"enter",nr),z&&tt(a,qi+"leave",si),N&&tt(a,qi+"move",Di)),v.isEnabled=!0,v.isDragging=v.isGesturing=v.isPressed=ee=Qe=!1,v._vx.reset(),v._vy.reset(),gi=ye(),Ri=ii(),W&&W.type&&Ii(W),K&&K(v)),v},v.disable=function(){v.isEnabled&&(pr.filter(function(W){return W!==v&&Wr(W.target)}).length||et(mi?_e:a,"scroll",ks),v.isPressed&&(v._vx.reset(),v._vy.reset(),et(D?a:_e,Yt[1],yi,!0)),et(mi?_e:a,"scroll",Ht,Se),et(a,"wheel",qt,Se),et(a,Yt[0],Ii,Se),et(_e,Yt[2],X),et(_e,Yt[3],X),et(a,"click",kr,!0),et(a,"click",Cr),et(_e,"gesturestart",Li),et(_e,"gestureend",Bt),et(a,qi+"enter",nr),et(a,qi+"leave",si),et(a,qi+"move",Di),v.isEnabled=v.isPressed=v.isDragging=!1,ie&&ie(v))},v.kill=v.revert=function(){v.disable();var W=pr.indexOf(v);W>=0&&pr.splice(W,1),ci===v&&(ci=0)},pr.push(v),D&&Wr(a)&&(ci=v),v.enable(f)},Jc(s,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),s}();Te.version="3.15.0";Te.create=function(s){return new Te(s)};Te.register=Za;Te.getAll=function(){return pr.slice()};Te.getById=function(s){return pr.filter(function(e){return e.vars.id===s})[0]};Xa()&&He.registerPlugin(Te);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var L,cr,G,se,_t,re,eo,Vn,ln,Ur,Dr,yn,Ue,Jn,Ps,rt,Ao,Oo,dr,Qa,os,el,it,As,tl,il,xi,Os,to,xr,io,Gr,Fs,as,vn=1,Ge=Date.now,ls=Ge(),zt=0,zr=0,Fo=function(e,t,i){var r=xt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return i["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Ro=function(e,t){return t&&(!xt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Qc=function s(){return zr&&requestAnimationFrame(s)},Io=function(){return Jn=1},Lo=function(){return Jn=0},Xt=function(e){return e},Nr=function(e){return Math.round(e*1e5)/1e5||0},rl=function(){return typeof window<"u"},nl=function(){return L||rl()&&(L=window.gsap)&&L.registerPlugin&&L},Zi=function(e){return!!~eo.indexOf(e)},sl=function(e){return(e==="Height"?io:G["inner"+e])||_t["client"+e]||re["client"+e]},ol=function(e){return ki(e,"getBoundingClientRect")||(Zi(e)?function(){return Ln.width=G.innerWidth,Ln.height=io,Ln}:function(){return li(e)})},ed=function(e,t,i){var r=i.d,n=i.d2,o=i.a;return(o=ki(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?sl(n):e["client"+n])||0}},td=function(e,t){return!t||~Qt.indexOf(e)?ol(e):function(){return Ln}},Zt=function(e,t){var i=t.s,r=t.d2,n=t.d,o=t.a;return Math.max(0,(i="scroll"+r)&&(o=ki(e,i))?o()-ol(e)()[n]:Zi(e)?(_t[i]||re[i])-sl(r):e[i]-e["offset"+r])},xn=function(e,t){for(var i=0;i<dr.length;i+=3)(!t||~t.indexOf(dr[i+1]))&&e(dr[i],dr[i+1],dr[i+2])},xt=function(e){return typeof e=="string"},Xe=function(e){return typeof e=="function"},Br=function(e){return typeof e=="number"},$i=function(e){return typeof e=="object"},Rr=function(e,t,i){return e&&e.progress(t?0:1)&&i&&e.pause()},or=function(e,t,i){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,i)}):t(e,i);r&&r.totalTime&&(e.callbackAnimation=r)}},ar=Math.abs,al="left",ll="top",ro="right",no="bottom",Xi="width",Ji="height",jr="Right",Xr="Left",Jr="Top",Kr="Bottom",Ce="padding",Rt="margin",Mr="Width",so="Height",Oe="px",It=function(e){return G.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},id=function(e){var t=It(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Do=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},li=function(e,t){var i=t&&It(e)[Ps]!=="matrix(1, 0, 0, 1, 0, 0)"&&L.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return i&&i.progress(0).kill(),r},Wn=function(e,t){var i=t.d2;return e["offset"+i]||e["client"+i]||0},cl=function(e){var t=[],i=e.labels,r=e.duration(),n;for(n in i)t.push(i[n]/r);return t},rd=function(e){return function(t){return L.utils.snap(cl(e),t)}},oo=function(e){var t=L.utils.snap(e),i=Array.isArray(e)&&e.slice(0).sort(function(r,n){return r-n});return i?function(r,n,o){o===void 0&&(o=.001);var a;if(!n)return t(r);if(n>0){for(r-=o,a=0;a<i.length;a++)if(i[a]>=r)return i[a];return i[a-1]}else for(a=i.length,r+=o;a--;)if(i[a]<=r)return i[a];return i[0]}:function(r,n,o){o===void 0&&(o=.001);var a=t(r);return!n||Math.abs(a-r)<o||a-r<0==n<0?a:t(n<0?r-e:r+e)}},nd=function(e){return function(t,i){return oo(cl(e))(t,i.direction)}},bn=function(e,t,i,r){return i.split(",").forEach(function(n){return e(t,n,r)})},De=function(e,t,i,r,n){return e.addEventListener(t,i,{passive:!r,capture:!!n})},Le=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},_n=function(e,t,i){i=i&&i.wheelHandler,i&&(e(t,"wheel",i),e(t,"touchmove",i))},zo={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},wn={toggleActions:"play",anticipatePin:0},Un={top:0,left:0,center:.5,bottom:1,right:1},On=function(e,t){if(xt(e)){var i=e.indexOf("="),r=~i?+(e.charAt(i-1)+1)*parseFloat(e.substr(i+1)):0;~i&&(e.indexOf("%")>i&&(r*=t/100),e=e.substr(0,i-1)),e=r+(e in Un?Un[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},En=function(e,t,i,r,n,o,a,l){var c=n.startColor,d=n.endColor,h=n.fontSize,p=n.indent,u=n.fontWeight,g=se.createElement("div"),f=Zi(i)||ki(i,"pinType")==="fixed",y=e.indexOf("scroller")!==-1,w=f?re:i.tagName==="IFRAME"?i.contentDocument.body:i,x=e.indexOf("start")!==-1,E=x?c:d,b="border-color:"+E+";font-size:"+h+";color:"+E+";font-weight:"+u+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return b+="position:"+((y||l)&&f?"fixed;":"absolute;"),(y||l||!f)&&(b+=(r===Fe?ro:no)+":"+(o+parseFloat(p))+"px;"),a&&(b+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=x,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=b,g.innerText=t||t===0?e+"-"+t:e,w.children[0]?w.insertBefore(g,w.children[0]):w.appendChild(g),g._offset=g["offset"+r.op.d2],Fn(g,0,r,x),g},Fn=function(e,t,i,r){var n={display:"block"},o=i[r?"os2":"p2"],a=i[r?"p2":"os2"];e._isFlipped=r,n[i.a+"Percent"]=r?-100:0,n[i.a]=r?"1px":0,n["border"+o+Mr]=1,n["border"+a+Mr]=0,n[i.p]=t+"px",L.set(e,n)},U=[],Rs={},cn,No=function(){return Ge()-zt>34&&(cn||(cn=requestAnimationFrame(di)))},lr=function(){(!it||!it.isPressed||it.startX>re.clientWidth)&&(j.cache++,it?cn||(cn=requestAnimationFrame(di)):di(),zt||er("scrollStart"),zt=Ge())},cs=function(){il=G.innerWidth,tl=G.innerHeight},Hr=function(e){j.cache++,(e===!0||!Ue&&!el&&!se.fullscreenElement&&!se.webkitFullscreenElement&&(!As||il!==G.innerWidth||Math.abs(G.innerHeight-tl)>G.innerHeight*.25))&&Vn.restart(!0)},Qi={},sd=[],dl=function s(){return Le(J,"scrollEnd",s)||Vi(!0)},er=function(e){return Qi[e]&&Qi[e].map(function(t){return t()})||sd},vt=[],ul=function(e){for(var t=0;t<vt.length;t+=5)(!e||vt[t+4]&&vt[t+4].query===e)&&(vt[t].style.cssText=vt[t+1],vt[t].getBBox&&vt[t].setAttribute("transform",vt[t+2]||""),vt[t+3].uncache=1)},hl=function(){return j.forEach(function(e){return Xe(e)&&++e.cacheID&&(e.rec=e())})},ao=function(e,t){var i;for(rt=0;rt<U.length;rt++)i=U[rt],i&&(!t||i._ctx===t)&&(e?i.kill(1):i.revert(!0,!0));Gr=!0,t&&ul(t),t||er("revert")},pl=function(e,t){j.cache++,(t||!nt)&&j.forEach(function(i){return Xe(i)&&i.cacheID++&&(i.rec=0)}),xt(e)&&(G.history.scrollRestoration=to=e)},nt,Ki=0,Bo,od=function(){if(Bo!==Ki){var e=Bo=Ki;requestAnimationFrame(function(){return e===Ki&&Vi(!0)})}},fl=function(){re.appendChild(xr),io=!it&&xr.offsetHeight||G.innerHeight,re.removeChild(xr)},Ho=function(e){return ln(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Vi=function(e,t){if(_t=se.documentElement,re=se.body,eo=[G,se,_t,re],zt&&!e&&!Gr){De(J,"scrollEnd",dl);return}fl(),nt=J.isRefreshing=!0,Gr||hl();var i=er("refreshInit");Qa&&J.sort(),t||ao(),j.forEach(function(r){Xe(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),U.slice(0).forEach(function(r){return r.refresh()}),Gr=!1,U.forEach(function(r){if(r._subPinOffset&&r.pin){var n=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[n];r.revert(!0,1),r.adjustPinSpacing(r.pin[n]-o),r.refresh()}}),Fs=1,Ho(!0),U.forEach(function(r){var n=Zt(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>n,a=r._startClamp&&r.start>=n;(o||a)&&r.setPositions(a?n-1:r.start,o?Math.max(a?n:r.start+1,n):r.end,!0)}),Ho(!1),Fs=0,i.forEach(function(r){return r&&r.render&&r.render(-1)}),j.forEach(function(r){Xe(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),pl(to,1),Vn.pause(),Ki++,nt=2,di(2),U.forEach(function(r){return Xe(r.vars.onRefresh)&&r.vars.onRefresh(r)}),nt=J.isRefreshing=!1,er("refresh")},Is=0,Rn=1,Zr,di=function(e){if(e===2||!nt&&!Gr){J.isUpdating=!0,Zr&&Zr.update(0);var t=U.length,i=Ge(),r=i-ls>=50,n=t&&U[0].scroll();if(Rn=Is>n?-1:1,nt||(Is=n),r&&(zt&&!Jn&&i-zt>200&&(zt=0,er("scrollEnd")),Dr=ls,ls=i),Rn<0){for(rt=t;rt-- >0;)U[rt]&&U[rt].update(0,r);Rn=1}else for(rt=0;rt<t;rt++)U[rt]&&U[rt].update(0,r);J.isUpdating=!1}cn=0},Ls=[al,ll,no,ro,Rt+Kr,Rt+jr,Rt+Jr,Rt+Xr,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],In=Ls.concat([Xi,Ji,"boxSizing","max"+Mr,"max"+so,"position",Rt,Ce,Ce+Jr,Ce+jr,Ce+Kr,Ce+Xr]),ad=function(e,t,i){br(i);var r=e._gsap;if(r.spacerIsNative)br(r.spacerState);else if(e._gsap.swappedIn){var n=t.parentNode;n&&(n.insertBefore(e,t),n.removeChild(t))}e._gsap.swappedIn=!1},ds=function(e,t,i,r){if(!e._gsap.swappedIn){for(var n=Ls.length,o=t.style,a=e.style,l;n--;)l=Ls[n],o[l]=i[l];o.position=i.position==="absolute"?"absolute":"relative",i.display==="inline"&&(o.display="inline-block"),a[no]=a[ro]="auto",o.flexBasis=i.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Xi]=Wn(e,st)+Oe,o[Ji]=Wn(e,Fe)+Oe,o[Ce]=a[Rt]=a[ll]=a[al]="0",br(r),a[Xi]=a["max"+Mr]=i[Xi],a[Ji]=a["max"+so]=i[Ji],a[Ce]=i[Ce],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},ld=/([A-Z])/g,br=function(e){if(e){var t=e.t.style,i=e.length,r=0,n,o;for((e.t._gsap||L.core.getCache(e.t)).uncache=1;r<i;r+=2)o=e[r+1],n=e[r],o?t[n]=o:t[n]&&t.removeProperty(n.replace(ld,"-$1").toLowerCase())}},Tn=function(e){for(var t=In.length,i=e.style,r=[],n=0;n<t;n++)r.push(In[n],i[In[n]]);return r.t=e,r},cd=function(e,t,i){for(var r=[],n=e.length,o=i?8:0,a;o<n;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Ln={left:0,top:0},qo=function(e,t,i,r,n,o,a,l,c,d,h,p,u,g){Xe(e)&&(e=e(l)),xt(e)&&e.substr(0,3)==="max"&&(e=p+(e.charAt(4)==="="?On("0"+e.substr(3),i):0));var f=u?u.time():0,y,w,x;if(u&&u.seek(0),isNaN(e)||(e=+e),Br(e))u&&(e=L.utils.mapRange(u.scrollTrigger.start,u.scrollTrigger.end,0,p,e)),a&&Fn(a,i,r,!0);else{Xe(t)&&(t=t(l));var E=(e||"0").split(" "),b,T,P,_;x=at(t,l)||re,b=li(x)||{},(!b||!b.left&&!b.top)&&It(x).display==="none"&&(_=x.style.display,x.style.display="block",b=li(x),_?x.style.display=_:x.style.removeProperty("display")),T=On(E[0],b[r.d]),P=On(E[1]||"0",i),e=b[r.p]-c[r.p]-d+T+n-P,a&&Fn(a,P,r,i-P<20||a._isStart&&P>20),i-=i-P}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var A=e+i,k=o._isStart;y="scroll"+r.d2,Fn(o,A,r,k&&A>20||!k&&(h?Math.max(re[y],_t[y]):o.parentNode[y])<=A+1),h&&(c=li(a),h&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+Oe))}return u&&x&&(y=li(x),u.seek(p),w=li(x),u._caScrollDist=y[r.p]-w[r.p],e=e/u._caScrollDist*p),u&&u.seek(f),u?e:Math.round(e)},dd=/(webkit|moz|length|cssText|inset)/i,$o=function(e,t,i,r){if(e.parentNode!==t){var n=e.style,o,a;if(t===re){e._stOrig=n.cssText,a=It(e);for(o in a)!+o&&!dd.test(o)&&a[o]&&typeof n[o]=="string"&&o!=="0"&&(n[o]=a[o]);n.top=i,n.left=r}else n.cssText=e._stOrig;L.core.getCache(e).uncache=1,t.appendChild(e)}},gl=function(e,t,i){var r=t,n=r;return function(o){var a=Math.round(e());return a!==r&&a!==n&&Math.abs(a-r)>3&&Math.abs(a-n)>3&&(o=a,i&&i()),n=r,r=Math.round(o),r}},Sn=function(e,t,i){var r={};r[t.p]="+="+i,L.set(e,r)},Yo=function(e,t){var i=Oi(e,t),r="_scroll"+t.p2,n=function o(a,l,c,d,h){var p=o.tween,u=l.onComplete,g={};c=c||i();var f=gl(i,c,function(){p.kill(),o.tween=0});return h=d&&h||0,d=d||a-c,p&&p.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return f(c+d*p.ratio+h*p.ratio*p.ratio)},l.onUpdate=function(){j.cache++,o.tween&&di()},l.onComplete=function(){o.tween=0,u&&u.call(p)},p=o.tween=L.to(e,l),p};return e[r]=i,i.wheelHandler=function(){return n.tween&&n.tween.kill()&&(n.tween=0)},De(e,"wheel",i.wheelHandler),J.isTouch&&De(e,"touchmove",i.wheelHandler),n},J=function(){function s(t,i){cr||s.register(L)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Os(this),this.init(t,i)}var e=s.prototype;return e.init=function(i,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!zr){this.update=this.refresh=this.kill=Xt;return}i=Do(xt(i)||Br(i)||i.nodeType?{trigger:i}:i,wn);var n=i,o=n.onUpdate,a=n.toggleClass,l=n.id,c=n.onToggle,d=n.onRefresh,h=n.scrub,p=n.trigger,u=n.pin,g=n.pinSpacing,f=n.invalidateOnRefresh,y=n.anticipatePin,w=n.onScrubComplete,x=n.onSnapComplete,E=n.once,b=n.snap,T=n.pinReparent,P=n.pinSpacer,_=n.containerAnimation,A=n.fastScrollEnd,k=n.preventOverlaps,M=i.horizontal||i.containerAnimation&&i.horizontal!==!1?st:Fe,C=!h&&h!==0,S=at(i.scroller||G),O=L.core.getCache(S),R=Zi(S),z=("pinType"in i?i.pinType:ki(S,"pinType")||R&&"fixed")==="fixed",N=[i.onEnter,i.onLeave,i.onEnterBack,i.onLeaveBack],I=C&&i.toggleActions.split(" "),D="markers"in i?i.markers:wn.markers,q=R?0:parseFloat(It(S)["border"+M.p2+Mr])||0,m=this,$=i.onRefreshInit&&function(){return i.onRefreshInit(m)},K=ed(S,R,M),ie=td(S,R),ne=0,ce=0,Se=0,Me=Oi(S,M),Ke,$e,pi,Ze,Qe,ee,be,ot,gt,v,mt,ti,fi,ye,ii,gi,Ri,Re,mi,_e,Nt,At,ri,kr,ke,un,ni,ir,rr,yi,Ii,X,Li,Bt,Ht,qt,Di,nr,si;if(m._startClamp=m._endClamp=!1,m._dir=M,y*=45,m.scroller=S,m.scroll=_?_.time.bind(_):Me,Ze=Me(),m.vars=i,r=r||i.animation,"refreshPriority"in i&&(Qa=1,i.refreshPriority===-9999&&(Zr=m)),O.tweenScroll=O.tweenScroll||{top:Yo(S,Fe),left:Yo(S,st)},m.tweenTo=Ke=O.tweenScroll[M.p],m.scrubDuration=function(F){Li=Br(F)&&F,Li?X?X.duration(F):X=L.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Li,paused:!0,onComplete:function(){return w&&w(m)}}):(X&&X.progress(1).kill(),X=0)},r&&(r.vars.lazy=!1,r._initted&&!m.isReverted||r.vars.immediateRender!==!1&&i.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),m.animation=r.pause(),r.scrollTrigger=m,m.scrubDuration(h),yi=0,l||(l=r.vars.id)),b&&((!$i(b)||b.push)&&(b={snapTo:b}),"scrollBehavior"in re.style&&L.set(R?[re,_t]:S,{scrollBehavior:"auto"}),j.forEach(function(F){return Xe(F)&&F.target===(R?se.scrollingElement||_t:S)&&(F.smooth=!1)}),pi=Xe(b.snapTo)?b.snapTo:b.snapTo==="labels"?rd(r):b.snapTo==="labelsDirectional"?nd(r):b.directional!==!1?function(F,Y){return oo(b.snapTo)(F,Ge()-ce<500?0:Y.direction)}:L.utils.snap(b.snapTo),Bt=b.duration||{min:.1,max:2},Bt=$i(Bt)?Ur(Bt.min,Bt.max):Ur(Bt,Bt),Ht=L.delayedCall(b.delay||Li/2||.1,function(){var F=Me(),Y=Ge()-ce<500,B=Ke.tween;if((Y||Math.abs(m.getVelocity())<10)&&!B&&!Jn&&ne!==F){var V=(F-ee)/ye,Ie=r&&!C?r.totalProgress():V,Z=Y?0:(Ie-Ii)/(Ge()-Dr)*1e3||0,we=L.utils.clamp(-V,1-V,ar(Z/2)*Z/.185),Ye=V+(b.inertia===!1?0:we),ve,de,oe=b,$t=oe.onStart,he=oe.onInterrupt,yt=oe.onComplete;if(ve=pi(Ye,m),Br(ve)||(ve=Ye),de=Math.max(0,Math.round(ee+ve*ye)),F<=be&&F>=ee&&de!==F){if(B&&!B._initted&&B.data<=ar(de-F))return;b.inertia===!1&&(we=ve-V),Ke(de,{duration:Bt(ar(Math.max(ar(Ye-Ie),ar(ve-Ie))*.185/Z/.05||0)),ease:b.ease||"power3",data:ar(de-F),onInterrupt:function(){return Ht.restart(!0)&&he&&or(m,he)},onComplete:function(){m.update(),ne=Me(),r&&!C&&(X?X.resetTo("totalProgress",ve,r._tTime/r._tDur):r.progress(ve)),yi=Ii=r&&!C?r.totalProgress():m.progress,x&&x(m),yt&&or(m,yt)}},F,we*ye,de-F-we*ye),$t&&or(m,$t,Ke.tween)}}else m.isActive&&ne!==F&&Ht.restart(!0)}).pause()),l&&(Rs[l]=m),p=m.trigger=at(p||u!==!0&&u),si=p&&p._gsap&&p._gsap.stRevert,si&&(si=si(m)),u=u===!0?p:at(u),xt(a)&&(a={targets:p,className:a}),u&&(g===!1||g===Rt||(g=!g&&u.parentNode&&u.parentNode.style&&It(u.parentNode).display==="flex"?!1:Ce),m.pin=u,$e=L.core.getCache(u),$e.spacer?ii=$e.pinState:(P&&(P=at(P),P&&!P.nodeType&&(P=P.current||P.nativeElement),$e.spacerIsNative=!!P,P&&($e.spacerState=Tn(P))),$e.spacer=Re=P||se.createElement("div"),Re.classList.add("pin-spacer"),l&&Re.classList.add("pin-spacer-"+l),$e.pinState=ii=Tn(u)),i.force3D!==!1&&L.set(u,{force3D:!0}),m.spacer=Re=$e.spacer,rr=It(u),kr=rr[g+M.os2],_e=L.getProperty(u),Nt=L.quickSetter(u,M.a,Oe),ds(u,Re,rr),Ri=Tn(u)),D){ti=$i(D)?Do(D,zo):zo,v=En("scroller-start",l,S,M,ti,0),mt=En("scroller-end",l,S,M,ti,0,v),mi=v["offset"+M.op.d2];var Cr=at(ki(S,"content")||S);ot=this.markerStart=En("start",l,Cr,M,ti,mi,0,_),gt=this.markerEnd=En("end",l,Cr,M,ti,mi,0,_),_&&(nr=L.quickSetter([ot,gt],M.a,Oe)),!z&&!(Qt.length&&ki(S,"fixedMarkers")===!0)&&(id(R?re:S),L.set([v,mt],{force3D:!0}),un=L.quickSetter(v,M.a,Oe),ir=L.quickSetter(mt,M.a,Oe))}if(_){var W=_.vars.onUpdate,H=_.vars.onUpdateParams;_.eventCallback("onUpdate",function(){m.update(0,0,1),W&&W.apply(_,H||[])})}if(m.previous=function(){return U[U.indexOf(m)-1]},m.next=function(){return U[U.indexOf(m)+1]},m.revert=function(F,Y){if(!Y)return m.kill(!0);var B=F!==!1||!m.enabled,V=Ue;B!==m.isReverted&&(B&&(qt=Math.max(Me(),m.scroll.rec||0),Se=m.progress,Di=r&&r.progress()),ot&&[ot,gt,v,mt].forEach(function(Ie){return Ie.style.display=B?"none":"block"}),B&&(Ue=m,m.update(B)),u&&(!T||!m.isActive)&&(B?ad(u,Re,ii):ds(u,Re,It(u),ke)),B||m.update(B),Ue=V,m.isReverted=B)},m.refresh=function(F,Y,B,V){if(!((Ue||!m.enabled)&&!Y)){if(u&&F&&zt){De(s,"scrollEnd",dl);return}!nt&&$&&$(m),Ue=m,Ke.tween&&!B&&(Ke.tween.kill(),Ke.tween=0),X&&X.pause(),f&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(vi){return vi.vars.immediateRender&&vi.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),m.isReverted||m.revert(!0,!0),m._subPinOffset=!1;var Ie=K(),Z=ie(),we=_?_.duration():Zt(S,M),Ye=ye<=.01||!ye,ve=0,de=V||0,oe=$i(B)?B.end:i.end,$t=i.endTrigger||p,he=$i(B)?B.start:i.start||(i.start===0||!p?0:u?"0 0":"0 100%"),yt=m.pinnedContainer=i.pinnedContainer&&at(i.pinnedContainer,m),Wt=p&&Math.max(0,U.indexOf(m))||0,Ne=Wt,Be,Ve,zi,hn,We,Ae,Ut,Kn,lo,Pr,Gt,Ar,pn;for(D&&$i(B)&&(Ar=L.getProperty(v,M.p),pn=L.getProperty(mt,M.p));Ne-- >0;)Ae=U[Ne],Ae.end||Ae.refresh(0,1)||(Ue=m),Ut=Ae.pin,Ut&&(Ut===p||Ut===u||Ut===yt)&&!Ae.isReverted&&(Pr||(Pr=[]),Pr.unshift(Ae),Ae.revert(!0,!0)),Ae!==U[Ne]&&(Wt--,Ne--);for(Xe(he)&&(he=he(m)),he=Fo(he,"start",m),ee=qo(he,p,Ie,M,Me(),ot,v,m,Z,q,z,we,_,m._startClamp&&"_startClamp")||(u?-.001:0),Xe(oe)&&(oe=oe(m)),xt(oe)&&!oe.indexOf("+=")&&(~oe.indexOf(" ")?oe=(xt(he)?he.split(" ")[0]:"")+oe:(ve=On(oe.substr(2),Ie),oe=xt(he)?he:(_?L.utils.mapRange(0,_.duration(),_.scrollTrigger.start,_.scrollTrigger.end,ee):ee)+ve,$t=p)),oe=Fo(oe,"end",m),be=Math.max(ee,qo(oe||($t?"100% 0":we),$t,Ie,M,Me()+ve,gt,mt,m,Z,q,z,we,_,m._endClamp&&"_endClamp"))||-.001,ve=0,Ne=Wt;Ne--;)Ae=U[Ne]||{},Ut=Ae.pin,Ut&&Ae.start-Ae._pinPush<=ee&&!_&&Ae.end>0&&(Be=Ae.end-(m._startClamp?Math.max(0,Ae.start):Ae.start),(Ut===p&&Ae.start-Ae._pinPush<ee||Ut===yt)&&isNaN(he)&&(ve+=Be*(1-Ae.progress)),Ut===u&&(de+=Be));if(ee+=ve,be+=ve,m._startClamp&&(m._startClamp+=ve),m._endClamp&&!nt&&(m._endClamp=be||-.001,be=Math.min(be,Zt(S,M))),ye=be-ee||(ee-=.01)&&.001,Ye&&(Se=L.utils.clamp(0,1,L.utils.normalize(ee,be,qt))),m._pinPush=de,ot&&ve&&(Be={},Be[M.a]="+="+ve,yt&&(Be[M.p]="-="+Me()),L.set([ot,gt],Be)),u&&!(Fs&&m.end>=Zt(S,M)))Be=It(u),hn=M===Fe,zi=Me(),At=parseFloat(_e(M.a))+de,!we&&be>1&&(Gt=(R?se.scrollingElement||_t:S).style,Gt={style:Gt,value:Gt["overflow"+M.a.toUpperCase()]},R&&It(re)["overflow"+M.a.toUpperCase()]!=="scroll"&&(Gt.style["overflow"+M.a.toUpperCase()]="scroll")),ds(u,Re,Be),Ri=Tn(u),Ve=li(u,!0),Kn=z&&Oi(S,hn?st:Fe)(),g?(ke=[g+M.os2,ye+de+Oe],ke.t=Re,Ne=g===Ce?Wn(u,M)+ye+de:0,Ne&&(ke.push(M.d,Ne+Oe),Re.style.flexBasis!=="auto"&&(Re.style.flexBasis=Ne+Oe)),br(ke),yt&&U.forEach(function(vi){vi.pin===yt&&vi.vars.pinSpacing!==!1&&(vi._subPinOffset=!0)}),z&&Me(qt)):(Ne=Wn(u,M),Ne&&Re.style.flexBasis!=="auto"&&(Re.style.flexBasis=Ne+Oe)),z&&(We={top:Ve.top+(hn?zi-ee:Kn)+Oe,left:Ve.left+(hn?Kn:zi-ee)+Oe,boxSizing:"border-box",position:"fixed"},We[Xi]=We["max"+Mr]=Math.ceil(Ve.width)+Oe,We[Ji]=We["max"+so]=Math.ceil(Ve.height)+Oe,We[Rt]=We[Rt+Jr]=We[Rt+jr]=We[Rt+Kr]=We[Rt+Xr]="0",We[Ce]=Be[Ce],We[Ce+Jr]=Be[Ce+Jr],We[Ce+jr]=Be[Ce+jr],We[Ce+Kr]=Be[Ce+Kr],We[Ce+Xr]=Be[Ce+Xr],gi=cd(ii,We,T),nt&&Me(0)),r?(lo=r._initted,os(1),r.render(r.duration(),!0,!0),ri=_e(M.a)-At+ye+de,ni=Math.abs(ye-ri)>1,z&&ni&&gi.splice(gi.length-2,2),r.render(0,!0,!0),lo||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),os(0)):ri=ye,Gt&&(Gt.value?Gt.style["overflow"+M.a.toUpperCase()]=Gt.value:Gt.style.removeProperty("overflow-"+M.a));else if(p&&Me()&&!_)for(Ve=p.parentNode;Ve&&Ve!==re;)Ve._pinOffset&&(ee-=Ve._pinOffset,be-=Ve._pinOffset),Ve=Ve.parentNode;Pr&&Pr.forEach(function(vi){return vi.revert(!1,!0)}),m.start=ee,m.end=be,Ze=Qe=nt?qt:Me(),!_&&!nt&&(Ze<qt&&Me(qt),m.scroll.rec=0),m.revert(!1,!0),ce=Ge(),Ht&&(ne=-1,Ht.restart(!0)),Ue=0,r&&C&&(r._initted||Di)&&r.progress()!==Di&&r.progress(Di||0,!0).render(r.time(),!0,!0),(Ye||Se!==m.progress||_||f||r&&!r._initted)&&(r&&!C&&(r._initted||Se||r.vars.immediateRender!==!1)&&r.totalProgress(_&&ee<-.001&&!Se?L.utils.normalize(ee,be,0):Se,!0),m.progress=Ye||(Ze-ee)/ye===Se?0:Se),u&&g&&(Re._pinOffset=Math.round(m.progress*ri)),X&&X.invalidate(),isNaN(Ar)||(Ar-=L.getProperty(v,M.p),pn-=L.getProperty(mt,M.p),Sn(v,M,Ar),Sn(ot,M,Ar-(V||0)),Sn(mt,M,pn),Sn(gt,M,pn-(V||0))),Ye&&!nt&&m.update(),d&&!nt&&!fi&&(fi=!0,d(m),fi=!1)}},m.getVelocity=function(){return(Me()-Qe)/(Ge()-Dr)*1e3||0},m.endAnimation=function(){Rr(m.callbackAnimation),r&&(X?X.progress(1):r.paused()?C||Rr(r,m.direction<0,1):Rr(r,r.reversed()))},m.labelToScroll=function(F){return r&&r.labels&&(ee||m.refresh()||ee)+r.labels[F]/r.duration()*ye||0},m.getTrailing=function(F){var Y=U.indexOf(m),B=m.direction>0?U.slice(0,Y).reverse():U.slice(Y+1);return(xt(F)?B.filter(function(V){return V.vars.preventOverlaps===F}):B).filter(function(V){return m.direction>0?V.end<=ee:V.start>=be})},m.update=function(F,Y,B){if(!(_&&!B&&!F)){var V=nt===!0?qt:m.scroll(),Ie=F?0:(V-ee)/ye,Z=Ie<0?0:Ie>1?1:Ie||0,we=m.progress,Ye,ve,de,oe,$t,he,yt,Wt;if(Y&&(Qe=Ze,Ze=_?Me():V,b&&(Ii=yi,yi=r&&!C?r.totalProgress():Z)),y&&u&&!Ue&&!vn&&zt&&(!Z&&ee<V+(V-Qe)/(Ge()-Dr)*y?Z=1e-4:Z===1&&be>V+(V-Qe)/(Ge()-Dr)*y&&(Z=.9999)),Z!==we&&m.enabled){if(Ye=m.isActive=!!Z&&Z<1,ve=!!we&&we<1,he=Ye!==ve,$t=he||!!Z!=!!we,m.direction=Z>we?1:-1,m.progress=Z,$t&&!Ue&&(de=Z&&!we?0:Z===1?1:we===1?2:3,C&&(oe=!he&&I[de+1]!=="none"&&I[de+1]||I[de],Wt=r&&(oe==="complete"||oe==="reset"||oe in r))),k&&(he||Wt)&&(Wt||h||!r)&&(Xe(k)?k(m):m.getTrailing(k).forEach(function(zi){return zi.endAnimation()})),C||(X&&!Ue&&!vn?(X._dp._time-X._start!==X._time&&X.render(X._dp._time-X._start),X.resetTo?X.resetTo("totalProgress",Z,r._tTime/r._tDur):(X.vars.totalProgress=Z,X.invalidate().restart())):r&&r.totalProgress(Z,!!(Ue&&(ce||F)))),u){if(F&&g&&(Re.style[g+M.os2]=kr),!z)Nt(Nr(At+ri*Z));else if($t){if(yt=!F&&Z>we&&be+1>V&&V+1>=Zt(S,M),T)if(!F&&(Ye||yt)){var Ne=li(u,!0),Be=V-ee;$o(u,re,Ne.top+(M===Fe?Be:0)+Oe,Ne.left+(M===Fe?0:Be)+Oe)}else $o(u,Re);br(Ye||yt?gi:Ri),ni&&Z<1&&Ye||Nt(At+(Z===1&&!yt?ri:0))}}b&&!Ke.tween&&!Ue&&!vn&&Ht.restart(!0),a&&(he||E&&Z&&(Z<1||!as))&&ln(a.targets).forEach(function(zi){return zi.classList[Ye||E?"add":"remove"](a.className)}),o&&!C&&!F&&o(m),$t&&!Ue?(C&&(Wt&&(oe==="complete"?r.pause().totalProgress(1):oe==="reset"?r.restart(!0).pause():oe==="restart"?r.restart(!0):r[oe]()),o&&o(m)),(he||!as)&&(c&&he&&or(m,c),N[de]&&or(m,N[de]),E&&(Z===1?m.kill(!1,1):N[de]=0),he||(de=Z===1?1:3,N[de]&&or(m,N[de]))),A&&!Ye&&Math.abs(m.getVelocity())>(Br(A)?A:2500)&&(Rr(m.callbackAnimation),X?X.progress(1):Rr(r,oe==="reverse"?1:!Z,1))):C&&o&&!Ue&&o(m)}if(ir){var Ve=_?V/_.duration()*(_._caScrollDist||0):V;un(Ve+(v._isFlipped?1:0)),ir(Ve)}nr&&nr(-V/_.duration()*(_._caScrollDist||0))}},m.enable=function(F,Y){m.enabled||(m.enabled=!0,De(S,"resize",Hr),R||De(S,"scroll",lr),$&&De(s,"refreshInit",$),F!==!1&&(m.progress=Se=0,Ze=Qe=ne=Me()),Y!==!1&&m.refresh())},m.getTween=function(F){return F&&Ke?Ke.tween:X},m.setPositions=function(F,Y,B,V){if(_){var Ie=_.scrollTrigger,Z=_.duration(),we=Ie.end-Ie.start;F=Ie.start+we*F/Z,Y=Ie.start+we*Y/Z}m.refresh(!1,!1,{start:Ro(F,B&&!!m._startClamp),end:Ro(Y,B&&!!m._endClamp)},V),m.update()},m.adjustPinSpacing=function(F){if(ke&&F){var Y=ke.indexOf(M.d)+1;ke[Y]=parseFloat(ke[Y])+F+Oe,ke[1]=parseFloat(ke[1])+F+Oe,br(ke)}},m.disable=function(F,Y){if(F!==!1&&m.revert(!0,!0),m.enabled&&(m.enabled=m.isActive=!1,Y||X&&X.pause(),qt=0,$e&&($e.uncache=1),$&&Le(s,"refreshInit",$),Ht&&(Ht.pause(),Ke.tween&&Ke.tween.kill()&&(Ke.tween=0)),!R)){for(var B=U.length;B--;)if(U[B].scroller===S&&U[B]!==m)return;Le(S,"resize",Hr),R||Le(S,"scroll",lr)}},m.kill=function(F,Y){m.disable(F,Y),X&&!Y&&X.kill(),l&&delete Rs[l];var B=U.indexOf(m);B>=0&&U.splice(B,1),B===rt&&Rn>0&&rt--,B=0,U.forEach(function(V){return V.scroller===m.scroller&&(B=1)}),B||nt||(m.scroll.rec=0),r&&(r.scrollTrigger=null,F&&r.revert({kill:!1}),Y||r.kill()),ot&&[ot,gt,v,mt].forEach(function(V){return V.parentNode&&V.parentNode.removeChild(V)}),Zr===m&&(Zr=0),u&&($e&&($e.uncache=1),B=0,U.forEach(function(V){return V.pin===u&&B++}),B||($e.spacer=0)),i.onKill&&i.onKill(m)},U.push(m),m.enable(!1,!1),si&&si(m),r&&r.add&&!ye){var te=m.update;m.update=function(){m.update=te,j.cache++,ee||be||m.refresh()},L.delayedCall(.01,m.update),ye=.01,ee=be=0}else m.refresh();u&&od()},s.register=function(i){return cr||(L=i||nl(),rl()&&window.document&&s.enable(),cr=zr),cr},s.defaults=function(i){if(i)for(var r in i)wn[r]=i[r];return wn},s.disable=function(i,r){zr=0,U.forEach(function(o){return o[r?"kill":"disable"](i)}),Le(G,"wheel",lr),Le(se,"scroll",lr),clearInterval(yn),Le(se,"touchcancel",Xt),Le(re,"touchstart",Xt),bn(Le,se,"pointerdown,touchstart,mousedown",Io),bn(Le,se,"pointerup,touchend,mouseup",Lo),Vn.kill(),xn(Le);for(var n=0;n<j.length;n+=3)_n(Le,j[n],j[n+1]),_n(Le,j[n],j[n+2])},s.enable=function(){if(G=window,se=document,_t=se.documentElement,re=se.body,L){if(ln=L.utils.toArray,Ur=L.utils.clamp,Os=L.core.context||Xt,os=L.core.suppressOverwrites||Xt,to=G.history.scrollRestoration||"auto",Is=G.pageYOffset||0,L.core.globals("ScrollTrigger",s),re){zr=1,xr=document.createElement("div"),xr.style.height="100vh",xr.style.position="absolute",fl(),Qc(),Te.register(L),s.isTouch=Te.isTouch,xi=Te.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),As=Te.isTouch===1,De(G,"wheel",lr),eo=[G,se,_t,re],L.matchMedia?(s.matchMedia=function(d){var h=L.matchMedia(),p;for(p in d)h.add(p,d[p]);return h},L.addEventListener("matchMediaInit",function(){hl(),ao()}),L.addEventListener("matchMediaRevert",function(){return ul()}),L.addEventListener("matchMedia",function(){Vi(0,1),er("matchMedia")}),L.matchMedia().add("(orientation: portrait)",function(){return cs(),cs})):console.warn("Requires GSAP 3.11.0 or later"),cs(),De(se,"scroll",lr);var i=re.hasAttribute("style"),r=re.style,n=r.borderTopStyle,o=L.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=li(re),Fe.m=Math.round(a.top+Fe.sc())||0,st.m=Math.round(a.left+st.sc())||0,n?r.borderTopStyle=n:r.removeProperty("border-top-style"),i||(re.setAttribute("style",""),re.removeAttribute("style")),yn=setInterval(No,250),L.delayedCall(.5,function(){return vn=0}),De(se,"touchcancel",Xt),De(re,"touchstart",Xt),bn(De,se,"pointerdown,touchstart,mousedown",Io),bn(De,se,"pointerup,touchend,mouseup",Lo),Ps=L.utils.checkPrefix("transform"),In.push(Ps),cr=Ge(),Vn=L.delayedCall(.2,Vi).pause(),dr=[se,"visibilitychange",function(){var d=G.innerWidth,h=G.innerHeight;se.hidden?(Ao=d,Oo=h):(Ao!==d||Oo!==h)&&Hr()},se,"DOMContentLoaded",Vi,G,"load",Vi,G,"resize",Hr],xn(De),U.forEach(function(d){return d.enable(0,1)}),l=0;l<j.length;l+=3)_n(Le,j[l],j[l+1]),_n(Le,j[l],j[l+2])}else if(se){var c=function d(){s.enable(),se.removeEventListener("DOMContentLoaded",d)};se.addEventListener("DOMContentLoaded",c)}}},s.config=function(i){"limitCallbacks"in i&&(as=!!i.limitCallbacks);var r=i.syncInterval;r&&clearInterval(yn)||(yn=r)&&setInterval(No,r),"ignoreMobileResize"in i&&(As=s.isTouch===1&&i.ignoreMobileResize),"autoRefreshEvents"in i&&(xn(Le)||xn(De,i.autoRefreshEvents||"none"),el=(i.autoRefreshEvents+"").indexOf("resize")===-1)},s.scrollerProxy=function(i,r){var n=at(i),o=j.indexOf(n),a=Zi(n);~o&&j.splice(o,a?6:2),r&&(a?Qt.unshift(G,r,re,r,_t,r):Qt.unshift(n,r))},s.clearMatchMedia=function(i){U.forEach(function(r){return r._ctx&&r._ctx.query===i&&r._ctx.kill(!0,!0)})},s.isInViewport=function(i,r,n){var o=(xt(i)?at(i):i).getBoundingClientRect(),a=o[n?Xi:Ji]*r||0;return n?o.right-a>0&&o.left+a<G.innerWidth:o.bottom-a>0&&o.top+a<G.innerHeight},s.positionInViewport=function(i,r,n){xt(i)&&(i=at(i));var o=i.getBoundingClientRect(),a=o[n?Xi:Ji],l=r==null?a/2:r in Un?Un[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return n?(o.left+l)/G.innerWidth:(o.top+l)/G.innerHeight},s.killAll=function(i){if(U.slice(0).forEach(function(n){return n.vars.id!=="ScrollSmoother"&&n.kill()}),i!==!0){var r=Qi.killAll||[];Qi={},r.forEach(function(n){return n()})}},s}();J.version="3.15.0";J.saveStyles=function(s){return s?ln(s).forEach(function(e){if(e&&e.style){var t=vt.indexOf(e);t>=0&&vt.splice(t,5),vt.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),L.core.getCache(e),Os())}}):vt};J.revert=function(s,e){return ao(!s,e)};J.create=function(s,e){return new J(s,e)};J.refresh=function(s){return s?Hr(!0):(cr||J.register())&&Vi(!0)};J.update=function(s){return++j.cache&&di(s===!0?2:0)};J.clearScrollMemory=pl;J.maxScroll=function(s,e){return Zt(s,e?st:Fe)};J.getScrollFunc=function(s,e){return Oi(at(s),e?st:Fe)};J.getById=function(s){return Rs[s]};J.getAll=function(){return U.filter(function(s){return s.vars.id!=="ScrollSmoother"})};J.isScrolling=function(){return!!zt};J.snapDirectional=oo;J.addEventListener=function(s,e){var t=Qi[s]||(Qi[s]=[]);~t.indexOf(e)||t.push(e)};J.removeEventListener=function(s,e){var t=Qi[s],i=t&&t.indexOf(e);i>=0&&t.splice(i,1)};J.batch=function(s,e){var t=[],i={},r=e.interval||.016,n=e.batchMax||1e9,o=function(c,d){var h=[],p=[],u=L.delayedCall(r,function(){d(h,p),h=[],p=[]}).pause();return function(g){h.length||u.restart(!0),h.push(g.trigger),p.push(g),n<=h.length&&u.progress(1)}},a;for(a in e)i[a]=a.substr(0,2)==="on"&&Xe(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Xe(n)&&(n=n(),De(J,"refresh",function(){return n=e.batchMax()})),ln(s).forEach(function(l){var c={};for(a in i)c[a]=i[a];c.trigger=l,t.push(J.create(c))}),t};var Vo=function(e,t,i,r){return t>r?e(r):t<0&&e(0),i>r?(r-t)/(i-t):i<0?t/(t-i):1},us=function s(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Te.isTouch?" pinch-zoom":""):"none",e===_t&&s(re,t)},Mn={auto:1,scroll:1},ud=function(e){var t=e.event,i=e.target,r=e.axis,n=(t.changedTouches?t.changedTouches[0]:t).target,o=n._gsap||L.core.getCache(n),a=Ge(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;n&&n!==re&&(n.scrollHeight<=n.clientHeight&&n.scrollWidth<=n.clientWidth||!(Mn[(l=It(n)).overflowY]||Mn[l.overflowX]));)n=n.parentNode;o._isScroll=n&&n!==i&&!Zi(n)&&(Mn[(l=It(n)).overflowY]||Mn[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},ml=function(e,t,i,r){return Te.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&ud,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return i&&De(se,Te.eventTypes[0],Uo,!1,!0)},onDisable:function(){return Le(se,Te.eventTypes[0],Uo,!0)}})},hd=/(input|label|select|textarea)/i,Wo,Uo=function(e){var t=hd.test(e.target.tagName);(t||Wo)&&(e._gsapAllow=!0,Wo=t)},pd=function(e){$i(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,i=t.normalizeScrollX,r=t.momentum,n=t.allowNestedScroll,o=t.onRelease,a,l,c=at(e.target)||_t,d=L.core.globals().ScrollSmoother,h=d&&d.get(),p=xi&&(e.content&&at(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),u=Oi(c,Fe),g=Oi(c,st),f=1,y=(Te.isTouch&&G.visualViewport?G.visualViewport.scale*G.visualViewport.width:G.outerWidth)/G.innerWidth,w=0,x=Xe(r)?function(){return r(a)}:function(){return r||2.8},E,b,T=ml(c,e.type,!0,n),P=function(){return b=!1},_=Xt,A=Xt,k=function(){l=Zt(c,Fe),A=Ur(xi?1:0,l),i&&(_=Ur(0,Zt(c,st))),E=Ki},M=function(){p._gsap.y=Nr(parseFloat(p._gsap.y)+u.offset)+"px",p.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(p._gsap.y)+", 0, 1)",u.offset=u.cacheID=0},C=function(){if(b){requestAnimationFrame(P);var D=Nr(a.deltaY/2),q=A(u.v-D);if(p&&q!==u.v+u.offset){u.offset=q-u.v;var m=Nr((parseFloat(p&&p._gsap.y)||0)-u.offset);p.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+m+", 0, 1)",p._gsap.y=m+"px",u.cacheID=j.cache,di()}return!0}u.offset&&M(),b=!0},S,O,R,z,N=function(){k(),S.isActive()&&S.vars.scrollY>l&&(u()>l?S.progress(1)&&u(l):S.resetTo("scrollY",l))};return p&&L.set(p,{y:"+=0"}),e.ignoreCheck=function(I){return xi&&I.type==="touchmove"&&C()||f>1.05&&I.type!=="touchstart"||a.isGesturing||I.touches&&I.touches.length>1},e.onPress=function(){b=!1;var I=f;f=Nr((G.visualViewport&&G.visualViewport.scale||1)/y),S.pause(),I!==f&&us(c,f>1.01?!0:i?!1:"x"),O=g(),R=u(),k(),E=Ki},e.onRelease=e.onGestureStart=function(I,D){if(u.offset&&M(),!D)z.restart(!0);else{j.cache++;var q=x(),m,$;i&&(m=g(),$=m+q*.05*-I.velocityX/.227,q*=Vo(g,m,$,Zt(c,st)),S.vars.scrollX=_($)),m=u(),$=m+q*.05*-I.velocityY/.227,q*=Vo(u,m,$,Zt(c,Fe)),S.vars.scrollY=A($),S.invalidate().duration(q).play(.01),(xi&&S.vars.scrollY>=l||m>=l-1)&&L.to({},{onUpdate:N,duration:q})}o&&o(I)},e.onWheel=function(){S._ts&&S.pause(),Ge()-w>1e3&&(E=0,w=Ge())},e.onChange=function(I,D,q,m,$){if(Ki!==E&&k(),D&&i&&g(_(m[2]===D?O+(I.startX-I.x):g()+D-m[1])),q){u.offset&&M();var K=$[2]===q,ie=K?R+I.startY-I.y:u()+q-$[1],ne=A(ie);K&&ie!==ne&&(R+=ne-ie),u(ne)}(q||D)&&di()},e.onEnable=function(){us(c,i?!1:"x"),J.addEventListener("refresh",N),De(G,"resize",N),u.smooth&&(u.target.style.scrollBehavior="auto",u.smooth=g.smooth=!1),T.enable()},e.onDisable=function(){us(c,!0),Le(G,"resize",N),J.removeEventListener("refresh",N),T.kill()},e.lockAxis=e.lockAxis!==!1,a=new Te(e),a.iOS=xi,xi&&!u()&&u(1),xi&&L.ticker.add(Xt),z=a._dc,S=L.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:i?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:gl(u,u(),function(){return S.pause()})},onUpdate:di,onComplete:z.vars.onComplete}),a};J.sort=function(s){if(Xe(s))return U.sort(s);var e=G.pageYOffset||0;return J.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+G.innerHeight}),U.sort(s||function(t,i){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((i.vars.containerAnimation?1e6:i._sortY)+(i.vars.refreshPriority||0)*-1e6)})};J.observe=function(s){return new Te(s)};J.normalizeScroll=function(s){if(typeof s>"u")return it;if(s===!0&&it)return it.enable();if(s===!1){it&&it.kill(),it=s;return}var e=s instanceof Te?s:pd(s);return it&&it.target===e.target&&it.kill(),Zi(e.target)&&(it=e),e};J.core={_getVelocityProp:Cs,_inputObserver:ml,_scrollers:j,_proxies:Qt,bridge:{ss:function(){zt||er("scrollStart"),zt=Ge()},ref:function(){return Ue}}};nl()&&L.registerPlugin(J);class fd{constructor(){this.ctx=null,this.enabled=!0,this._initOnFirstGesture()}_initOnFirstGesture(){const e=()=>{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),window.removeEventListener("click",e),window.removeEventListener("keydown",e)};window.addEventListener("click",e,{once:!0}),window.addEventListener("keydown",e,{once:!0})}_ensureContext(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}return this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}playShutter(){const e=this._ensureContext();if(!e)return;const t=e.createOscillator(),i=e.createGain(),r=e.currentTime;t.type="sine",t.frequency.setValueAtTime(800,r),t.frequency.exponentialRampToValueAtTime(120,r+.08),i.gain.setValueAtTime(.12,r),i.gain.exponentialRampToValueAtTime(.001,r+.09),t.connect(i),i.connect(e.destination),t.start(r),t.stop(r+.09)}playClose(){const e=this._ensureContext();if(!e)return;const t=e.createOscillator(),i=e.createGain(),r=e.currentTime;t.type="sine",t.frequency.setValueAtTime(150,r),t.frequency.exponentialRampToValueAtTime(450,r+.12),i.gain.setValueAtTime(.08,r),i.gain.exponentialRampToValueAtTime(.001,r+.14),t.connect(i),i.connect(e.destination),t.start(r),t.stop(r+.14)}playSpiderSense(){const e=this._ensureContext();if(!e)return;const t=e.createOscillator(),i=e.createGain(),r=e.currentTime;t.type="sawtooth",t.frequency.setValueAtTime(60,r),t.frequency.linearRampToValueAtTime(120,r+.4),t.frequency.linearRampToValueAtTime(50,r+.9),i.gain.setValueAtTime(.001,r),i.gain.linearRampToValueAtTime(.08,r+.3),i.gain.exponentialRampToValueAtTime(.001,r+.9),t.connect(i),i.connect(e.destination),t.start(r),t.stop(r+.9)}playWebShoot(){const e=this._ensureContext();if(!e)return;const t=e.createOscillator(),i=e.createGain(),r=e.currentTime;t.type="triangle",t.frequency.setValueAtTime(1200,r),t.frequency.exponentialRampToValueAtTime(180,r+.15),i.gain.setValueAtTime(.1,r),i.gain.exponentialRampToValueAtTime(.001,r+.16),t.connect(i),i.connect(e.destination),t.start(r),t.stop(r+.16)}playHeartbeat(){const e=this._ensureContext();if(!e)return;const t=e.createOscillator(),i=e.createGain(),r=e.currentTime;t.type="sine",t.frequency.setValueAtTime(65,r),t.frequency.exponentialRampToValueAtTime(35,r+.25),i.gain.setValueAtTime(.25,r),i.gain.exponentialRampToValueAtTime(.001,r+.28),t.connect(i),i.connect(e.destination),t.start(r),t.stop(r+.28)}playCorrect(){const e=this._ensureContext();if(!e)return;const t=e.currentTime,i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.setValueAtTime(523.25,t),r.gain.setValueAtTime(.08,t),r.gain.exponentialRampToValueAtTime(.001,t+.1),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.1);const n=e.createOscillator(),o=e.createGain();n.type="sine",n.frequency.setValueAtTime(659.25,t+.08),o.gain.setValueAtTime(.08,t+.08),o.gain.exponentialRampToValueAtTime(.001,t+.22),n.connect(o),o.connect(e.destination),n.start(t+.08),n.stop(t+.22)}playIncorrect(){const e=this._ensureContext();if(!e)return;const t=e.currentTime,i=e.createOscillator(),r=e.createGain();i.type="sawtooth",i.frequency.setValueAtTime(150,t),i.frequency.linearRampToValueAtTime(90,t+.25),r.gain.setValueAtTime(.06,t),r.gain.exponentialRampToValueAtTime(.001,t+.25),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+.25)}}const wt=new fd;class gd{constructor(){this.canvas=document.createElement("canvas"),this.canvas.id="heart-canvas",this.canvas.style.cssText=`
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2;
    `,document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.particles=[],this.maxParticles=40,this.mode="LOVE",this.mouseX=window.innerWidth/2,this.mouseY=window.innerHeight/2,this.raf=null,this.isRunning=!1,this._resize(),window.addEventListener("resize",()=>this._resize(),{passive:!0}),window.addEventListener("mousemove",e=>{this.mouseX=e.clientX,this.mouseY=e.clientY},{passive:!0}),this._initParticles(),this.start()}_resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}setMode(e){this.mode!==e&&(this.mode=e,e==="NONE"?this.particles=[]:this._initParticles())}_initParticles(){this.particles=[];let e=this.maxParticles;this.mode==="HEARTBREAK"?e=12:this.mode==="MEMORY"?e=20:this.mode==="SACRIFICE"?e=22:this.mode==="VALENTINE"&&(e=45);for(let t=0;t<e;t++)this.particles.push(this._createParticle())}_createParticle(){const e=this.canvas.width,t=this.canvas.height;let i="#E50914",r="#FF1E2D";return this.mode==="SACRIFICE"?(i="#7A0008",r="#E50914"):this.mode==="HEARTBREAK"?(i="#550005",r="#7A0008"):this.mode==="MEMORY"?(i="#7A0008",r="#E50914"):this.mode==="VALENTINE"&&(i="#FF1E2D",r="#FF1E2D"),{x:Math.random()*e,y:Math.random()*t,size:Math.random()*8+4,vx:(Math.random()-.5)*.8,vy:this.mode==="SACRIFICE"?Math.random()*.6+.2:-(Math.random()*.6+.2),alpha:this.mode==="HEARTBREAK"?Math.random()*.35+.1:Math.random()*.6+.2,rotation:Math.random()*Math.PI*2,vRot:(Math.random()-.5)*.02,color:i,shadowColor:r,isCracked:this.mode==="HEARTBREAK"}}_drawHeart(e,t,i,r,n,o,a,l,c){e.save(),e.translate(t,i),e.rotate(n),e.scale(r/15,r/15),e.globalAlpha=o,e.beginPath(),e.moveTo(0,0),e.bezierCurveTo(-5,-5,-10,0,0,10),e.bezierCurveTo(10,0,5,-5,0,0),e.closePath(),e.fillStyle=l,e.shadowColor=c,e.shadowBlur=a?4:12,e.fill(),a&&(e.beginPath(),e.moveTo(0,-3),e.lineTo(-2,2),e.lineTo(2,6),e.strokeStyle="#050505",e.lineWidth=1.5,e.stroke()),e.restore()}start(){this.isRunning||(this.isRunning=!0,this._loop())}stop(){this.isRunning=!1,this.raf&&cancelAnimationFrame(this.raf)}_loop(){if(this.isRunning){if(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.mode!=="NONE"){const e=this.canvas.width,t=this.canvas.height;for(let i=0;i<this.particles.length;i++){const r=this.particles[i],n=this.mouseX-r.x,o=this.mouseY-r.y,a=Math.sqrt(n*n+o*o);if(a<180&&a>10){const p=(180-a)/180;this.mode==="HEARTBREAK"?(r.x-=n/a*p*1.5,r.y-=o/a*p*1.5):(r.x+=n/a*p*.6,r.y+=o/a*p*.6)}r.x+=r.vx,r.y+=r.vy,r.rotation+=r.vRot,r.y<-20&&(r.y=t+20),r.y>t+20&&(r.y=-20),r.x<-20&&(r.x=e+20),r.x>e+20&&(r.x=-20);const l=e/2,c=Math.abs(r.x-l);let d=1;const h=e*.25;c<h&&(d=Math.max(0,c/h)),this._drawHeart(this.ctx,r.x,r.y,r.size,r.rotation,r.alpha*d,r.isCracked,r.color,r.shadowColor)}}this.raf=requestAnimationFrame(()=>this._loop())}}}const yl=new gd;Wa.registerPlugin(J);class md{constructor(){this._initWebMorphs(),this._initElasticWebClicks()}_initElasticWebClicks(){document.querySelectorAll(".hero-web-svg, .loader-web").forEach(t=>{t.style.transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",t.addEventListener("click",()=>{wt.playWebShoot(),t.style.transform="scale(1.12) rotate(4deg)",setTimeout(()=>{t.style.transform="scale(1) rotate(0deg)"},400)})})}_initWebMorphs(){const e=document.getElementById("section-love");if(!e)return;const t=document.createElement("div");t.className="web-heart-symbol",t.style.cssText=`
      position: absolute;
      top: 20px;
      right: 40px;
      width: 44px;
      height: 44px;
      pointer-events: none;
      z-index: 2;
      opacity: 0.8;
      filter: drop-shadow(0 0 10px #FF2E36);
    `,t.innerHTML=`
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M 50 30 C 35 10, 10 25, 10 50 C 10 70, 50 95, 50 95 C 50 95, 90 70, 90 50 C 90 25, 65 10, 50 30 Z" fill="none" stroke="#FF2E36" stroke-width="3" stroke-dasharray="200" stroke-dashoffset="0"/>
        <line x1="50" y1="30" x2="50" y2="95" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <line x1="20" y1="45" x2="80" y2="45" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      </svg>
    `,e.appendChild(t)}}class yd{constructor(){this.overlay=null,this.videoEl=null,this.isPlaying=!1,this.isMuted=!1,this.previousMusicVolume=.5,this.backgroundVideosState=new Map,this._createDOM()}_createDOM(){if(document.getElementById("cinematic-memory-viewer")){this.overlay=document.getElementById("cinematic-memory-viewer"),this.videoEl=this.overlay.querySelector(".memory-viewer-video");return}const e=document.createElement("div");e.id="cinematic-memory-viewer",e.style.cssText=`
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(5, 5, 5, 0.85);
      backdrop-filter: blur(12px) brightness(0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    `,e.innerHTML=`
      <div class="memory-viewer-container" style="
        position: relative;
        width: min(1000px, 90vw);
        background: #050505;
        border: 1px solid rgba(255, 46, 54, 0.35);
        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 46, 54, 0.15);
        border-radius: 12px;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        display: flex;
        flex-direction: column;
      ">
        <!-- Close Button -->
        <button class="memory-viewer-close" aria-label="Close memory" style="
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s ease;
        ">✕</button>

        <!-- Video Wrapper -->
        <div style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000;">
          <video class="memory-viewer-video" style="width: 100%; height: 100%; object-fit: contain; display: block;" playsinline></video>
          
          <!-- Cinematic Memory Label Overlay -->
          <div style="
            position: absolute;
            top: 20px;
            left: 20px;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.65);
            padding: 6px 14px;
            border-left: 3px solid #FF2E36;
            border-radius: 0 4px 4px 0;
            font-size: 11px;
            letter-spacing: 0.2em;
            color: #FF555A;
            text-transform: uppercase;
            font-weight: 700;
          ">CINEMATIC MEMORY</div>
        </div>

        <!-- Details Footer -->
        <div style="padding: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); background: linear-gradient(180deg, #090909 0%, #050505 100%);">
          <h3 class="memory-viewer-title" style="color: #FFF; font-family: var(--font-display); font-size: clamp(20px, 2.5vw, 28px); margin: 0 0 8px 0; letter-spacing: 0.05em; text-transform: uppercase;">MEMORY TITLE</h3>
          <p class="memory-viewer-caption" style="color: #C0C0C0; font-size: 14px; line-height: 1.5; margin: 0; font-family: var(--font-body);">Memory caption goes here...</p>

          <!-- Custom UI Controls -->
          <div style="display: flex; align-items: center; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
            <!-- Play/Pause -->
            <button class="viewer-play-btn" style="
              background: #FF2E36;
              border: none;
              color: #FFF;
              padding: 10px 24px;
              border-radius: 4px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">PAUSE</button>

            <!-- Progress Bar -->
            <div class="viewer-progress-container" style="
              flex-grow: 1;
              height: 4px;
              background: rgba(255, 255, 255, 0.15);
              border-radius: 2px;
              position: relative;
              cursor: pointer;
              min-width: 150px;
            ">
              <div class="viewer-progress-fill" style="
                width: 0%;
                height: 100%;
                background: #FF2E36;
                border-radius: 2px;
                transition: width 0.1s linear;
              "></div>
            </div>

            <!-- Mute/Unmute -->
            <button class="viewer-mute-btn" style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFF;
              padding: 10px 18px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">MUTE</button>

            <!-- Fullscreen -->
            <button class="viewer-fullscreen-btn" style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #FFF;
              padding: 10px 18px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            ">FULLSCREEN</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(e),this.overlay=e,this.videoEl=e.querySelector(".memory-viewer-video"),this._bindEvents()}_bindEvents(){const e=this.overlay.querySelector(".memory-viewer-close"),t=this.overlay.querySelector(".viewer-play-btn"),i=this.overlay.querySelector(".viewer-mute-btn"),r=this.overlay.querySelector(".viewer-fullscreen-btn"),n=this.overlay.querySelector(".viewer-progress-container"),o=this.overlay.querySelector(".viewer-progress-fill");e.addEventListener("click",()=>{wt.playClose(),this.close()}),this.overlay.addEventListener("click",a=>{a.target===this.overlay&&(wt.playClose(),this.close())}),t.addEventListener("click",()=>{this.videoEl.paused?(this.videoEl.play().catch(()=>{}),t.textContent="PAUSE"):(this.videoEl.pause(),t.textContent="PLAY")}),i.addEventListener("click",()=>{this.isMuted=!this.isMuted,this.videoEl.muted=this.isMuted,i.textContent=this.isMuted?"UNMUTE":"MUTE"}),r.addEventListener("click",()=>{var a,l,c;document.fullscreenElement?(c=document.exitFullscreen)==null||c.call(document):(l=(a=this.videoEl).requestFullscreen)==null||l.call(a).catch(()=>{var d,h;(h=(d=this.overlay.querySelector(".memory-viewer-container")).requestFullscreen)==null||h.call(d)})}),this.videoEl.addEventListener("timeupdate",()=>{if(this.videoEl.duration){const a=this.videoEl.currentTime/this.videoEl.duration*100;o.style.width=`${a}%`}}),n.addEventListener("click",a=>{if(this.videoEl.duration){const l=n.getBoundingClientRect(),c=(a.clientX-l.left)/l.width;this.videoEl.currentTime=c*this.videoEl.duration}}),this.videoEl.addEventListener("ended",()=>{console.log("[MEMORY VIEWER] Video finished naturally."),this.close()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&this.isPlaying&&this.close()})}show(e,t,i){if(!this.overlay||!this.videoEl)return;this.isPlaying=!0,this._pauseAllOtherVideos(),this.previousMusicVolume=me.volume,me.setVolume(this.previousMusicVolume*.15),this.videoEl.src=e,this.videoEl.load(),this.overlay.querySelector(".memory-viewer-title").textContent=t,this.overlay.querySelector(".memory-viewer-caption").textContent=i,this.overlay.style.opacity="1",this.overlay.style.pointerEvents="all";const r=this.overlay.querySelector(".memory-viewer-container");r.style.transform="scale(1) translateY(0)",setTimeout(()=>{this.videoEl.play().then(()=>{this.overlay.querySelector(".viewer-play-btn").textContent="PAUSE"}).catch(n=>{console.warn("[MEMORY VIEWER] Playblocked or failed:",n)})},450)}close(){if(!this.isPlaying)return;this.isPlaying=!1,this.videoEl.pause(),this.videoEl.src="",me.setVolume(this.previousMusicVolume),this._resumeAllOtherVideos(),this.overlay.style.opacity="0",this.overlay.style.pointerEvents="none";const e=this.overlay.querySelector(".memory-viewer-container");e.style.transform="scale(0.9) translateY(20px)"}_pauseAllOtherVideos(){this.backgroundVideosState.clear(),document.querySelectorAll("video").forEach(t=>{t!==this.videoEl&&!t.paused&&(this.backgroundVideosState.set(t,!0),t.pause(),console.log("[MEDIA MANAGER] Pausing active background video:",t))})}_resumeAllOtherVideos(){this.backgroundVideosState.forEach((e,t)=>{e&&t&&(t.play().catch(i=>{console.warn("[MEDIA MANAGER] Failed to resume background video:",i)}),console.log("[MEDIA MANAGER] Resumed background video."))}),this.backgroundVideosState.clear()}}const vd=new yd;class xd{constructor(){this.windows=[],this.activeVideo=null,this.musicDucked=!1,setTimeout(()=>this.init(),100)}init(){document.querySelectorAll(".cinematic-memory-window").forEach((t,i)=>{this._setupWindow(t,i+1)}),this._setupIntersectionObserver()}_setupWindow(e,t){const i=e.getAttribute("data-video-src")||"",r=e.getAttribute("data-poster")||"",n=e.getAttribute("data-title")||"Memory",o=e.getAttribute("data-caption")||"",a=e.getAttribute("data-chapter")||"CH",l=e.hasAttribute("data-is-photo");e.style.cssText=`
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border: 1px solid rgba(122, 0, 8, 0.4);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(122, 0, 8, 0.15);
      cursor: pointer;
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: border-color 0.4s ease, box-shadow 0.4s ease;
    `,e.innerHTML=`
      <!-- Glow background layer -->
      <div class="video-glow-layer" style="
        position: absolute;
        inset: -5%;
        z-index: 1;
        background: radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%);
        pointer-events: none;
        transform: translateZ(-20px);
        transition: transform 0.4s ease;
      "></div>
      
      <!-- Glass reflection layer -->
      <div class="video-glass-layer" style="
        position: absolute;
        inset: 0;
        z-index: 5;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.02) 100%);
        pointer-events: none;
        transform: translateZ(15px);
        transition: transform 0.4s ease;
        border-radius: 8px;
      "></div>

      <!-- Web Detail Overlay -->
      <div class="web-strand-overlay" style="
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        background-image: radial-gradient(circle at 10% 10%, rgba(255, 46, 54, 0.1) 0%, transparent 60%);
        opacity: 0.7;
      "></div>

      <!-- Reflection sweep -->
      <div class="reflection-sweep" style="
        position: absolute;
        inset: 0;
        z-index: 4;
        pointer-events: none;
        background: linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.08) 50%, transparent 55%);
        transform: translateX(-100%);
        transition: transform 0.8s ease;
      "></div>

      <!-- Media element -->
      ${l?`<img class="window-media" src="${r}" alt="${n}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95) contrast(1.05); transition: filter 0.4s ease, transform 0.4s ease; z-index: 2; position: relative;" />`:`<video class="window-media window-video" src="${i}" poster="${r}" loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9) contrast(1.05); opacity: 0.85; transition: all 0.5s ease; z-index: 2; position: relative;"></video>`}

      <!-- Badge (Metal/Glass Edge) -->
      <div style="
        position: absolute;
        top: 14px;
        left: 14px;
        z-index: 6;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(13, 13, 13, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        padding: 5px 10px;
        backdrop-filter: blur(5px);
      ">
        <span style="
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${l?"#C0C0C0":"#FF2E36"};
          box-shadow: ${l?"none":"0 0 8px #FF2E36"};
        "></span>
        <span style="
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #FFF;
          font-weight: 700;
          text-transform: uppercase;
        ">${l?"FROZEN MOMENT":"FILM MEMORY"}</span>
      </div>

      <!-- Metadata tag (Chapter & Number) -->
      <div style="
        position: absolute;
        bottom: 14px;
        right: 14px;
        z-index: 6;
        background: rgba(13, 13, 13, 0.75);
        border: 1px solid rgba(255, 46, 54, 0.3);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 9px;
        color: #FF555A;
        letter-spacing: 0.1em;
        font-weight: 700;
        backdrop-filter: blur(5px);
      ">
        ${a} • MEMORY #${String(t).padStart(2,"0")}
      </div>

      <!-- SOUND ON / SOUND OFF Toggle Button (for video) -->
      ${l?"":`<button class="window-sound-toggle" style="
            position: absolute;
            bottom: 14px;
            left: 14px;
            z-index: 7;
            background: rgba(13, 13, 13, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFF;
            padding: 5px 12px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
          ">
            <span class="sound-toggle-icon">🔇</span> SOUND ON
          </button>`}
    `;const c=e.querySelector(".window-video"),d=e.querySelector(".reflection-sweep"),h=e.querySelector(".window-sound-toggle");e.addEventListener("mousemove",p=>{const u=e.getBoundingClientRect(),g=p.clientX-(u.left+u.width/2),f=p.clientY-(u.top+u.height/2),y=-(f/(u.height/2))*6,w=g/(u.width/2)*6;e.style.transform=`rotateX(${y}deg) rotateY(${w}deg) scale(1.015)`,e.style.borderColor="rgba(255, 46, 54, 0.6)",e.style.boxShadow="0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 46, 54, 0.15)",d&&(d.style.transform=`translateX(${g/u.width*100}%)`);const x=e.querySelector(".video-glass-layer"),E=e.querySelector(".video-glow-layer");x&&(x.style.transform=`translate3d(${g*.03}px, ${f*.03}px, 15px)`),E&&(E.style.transform=`translate3d(${-g*.04}px, ${-f*.04}px, -20px)`)}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)",e.style.borderColor="rgba(255, 46, 54, 0.3)",e.style.boxShadow="0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 46, 54, 0.05)",d&&(d.style.transform="translateX(-100%)");const p=e.querySelector(".video-glass-layer"),u=e.querySelector(".video-glow-layer");p&&(p.style.transform="translateZ(15px)"),u&&(u.style.transform="translateZ(-20px)")}),e.addEventListener("click",p=>{p.target.closest(".window-sound-toggle")||(c&&c.pause(),vd.show(l?r:i,n,o))}),h&&c&&h.addEventListener("click",p=>{p.stopPropagation();const u=h.querySelector(".sound-toggle-icon");c.muted?(c.muted=!1,u.textContent="🔊",h.style.background="#FF2E36",h.style.borderColor="#FF555A",h.innerHTML='<span class="sound-toggle-icon">🔊</span> SOUND OFF',me.setVolume(.08),this.musicDucked=!0):(c.muted=!0,u.textContent="🔇",h.style.background="rgba(13, 13, 13, 0.8)",h.style.borderColor="rgba(255, 255, 255, 0.2)",h.innerHTML='<span class="sound-toggle-icon">🔇</span> SOUND ON',me.setVolume(.5),this.musicDucked=!1)}),c&&this.windows.push({el:e,videoEl:c,soundToggle:h})}_setupIntersectionObserver(){const e=new IntersectionObserver(t=>{t.forEach(i=>{const r=this.windows.find(n=>n.el===i.target);r&&(i.isIntersecting?(this.windows.forEach(n=>{n!==r&&!n.videoEl.paused&&(n.videoEl.pause(),console.log("[CINEMATIC MANAGER] Pausing non-focused memory video."))}),r.videoEl.play().catch(n=>console.log("Autoplay blocked:",n)),r.videoEl.style.opacity="1",r.videoEl.style.filter="brightness(1.05) contrast(1.1)",this.activeVideo=r.videoEl,console.log("[CINEMATIC MANAGER] Autoplaying memory video in viewport.")):(r.videoEl.pause(),r.videoEl.style.opacity="0.85",r.videoEl.style.filter="brightness(0.9) contrast(1.05)",this.activeVideo===r.videoEl&&this.musicDucked&&(me.setVolume(.5),this.musicDucked=!1)))})},{threshold:.55});this.windows.forEach(t=>e.observe(t.el))}}new xd;class bd{constructor(){this.canvas=null,this.ctx=null,this.particles=[],this.animationFrameId=null,this.mouse={x:null,y:null,targetX:0,targetY:0},this.scrollZ=0,this.activeSection="#section-hero",this.isLowEnd=!1,this.atmosphereSettings={"#section-hero":{speed:.5,density:45,opacity:.22,color:"255, 46, 54"},"#section-origin":{speed:.45,density:35,opacity:.18,color:"255, 46, 54"},"#section-becoming":{speed:.6,density:40,opacity:.2,color:"255, 46, 54"},"#section-homecoming":{speed:.5,density:35,opacity:.18,color:"255, 46, 54"},"#section-love":{speed:.2,density:50,opacity:.35,color:"255, 90, 95"},"#section-love-scroll":{speed:.2,density:50,opacity:.35,color:"255, 90, 95"},"#section-infinity-war":{speed:.35,density:35,opacity:.18,color:"180, 20, 20"},"#section-sacrifice":{speed:.15,density:45,opacity:.28,color:"140, 0, 8"},"#section-mj-forgets":{speed:.05,density:15,opacity:.06,color:"100, 100, 100"},"#section-alone":{speed:.15,density:15,opacity:.08,color:"255, 46, 54"},"#section-new-spiderman":{speed:.7,density:50,opacity:.25,color:"255, 46, 54"},"#section-brand-new-day":{speed:.6,density:40,opacity:.2,color:"255, 46, 54"},"#section-valentine":{speed:.35,density:45,opacity:.3,color:"255, 90, 95"},"#section-fan-challenge":{speed:.45,density:35,opacity:.2,color:"255, 46, 54"}},this._detectPerformance(),this._createCanvas(),this._bindEvents(),this._startLoop()}_detectPerformance(){const e=window.innerWidth<768,t=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;this.isLowEnd=e||t,console.log(`[3D ENGINE] Low-end mode: ${this.isLowEnd}`)}_createCanvas(){this.canvas=document.createElement("canvas"),this.canvas.id="global-3d-particles",this.canvas.style.cssText=`
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
    `,document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._resizeCanvas()}_resizeCanvas(){this.canvas&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this._populateParticles())}_populateParticles(){this.particles=[];const e=this.atmosphereSettings[this.activeSection]||this.atmosphereSettings["#section-hero"];let t=this.isLowEnd?Math.floor(e.density*.4):e.density;for(let i=0;i<t;i++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,z:Math.random()*800+100,size:Math.random()*2+.8,speedFactor:Math.random()*.5+.5})}_bindEvents(){window.addEventListener("resize",()=>this._resizeCanvas()),window.addEventListener("mousemove",e=>{this.mouse.targetX=e.clientX/window.innerWidth-.5,this.mouse.targetY=e.clientY/window.innerHeight-.5},{passive:!0}),window.addEventListener("scroll",()=>{this.scrollZ=window.scrollY*.14},{passive:!0}),document.addEventListener("visibilitychange",()=>{document.hidden?this._stopLoop():this._startLoop()}),document.addEventListener("mouseover",e=>{const t=e.target.closest(".cinematic-video-frame");t&&!t.dataset.tiltBound&&this._bindTiltCard(t)})}_bindTiltCard(e){e.dataset.tiltBound="true",e.addEventListener("mousemove",t=>{if(this.isLowEnd)return;const i=e.getBoundingClientRect(),r=t.clientX-(i.left+i.width/2),n=t.clientY-(i.top+i.height/2),o=-(n/(i.height/2))*2,a=r/(i.width/2)*2;e.style.transform=`rotateX(${o}deg) rotateY(${a}deg) scale(1.015)`;const l=e.querySelector(".video-glass-layer"),c=e.querySelector(".video-glow-layer");l&&(l.style.transform=`translate3d(${r*.035}px, ${n*.035}px, 15px)`),c&&(c.style.transform=`translate3d(${-r*.045}px, ${-n*.045}px, -20px)`)}),e.addEventListener("mouseleave",()=>{e.style.transform="none";const t=e.querySelector(".video-glass-layer"),i=e.querySelector(".video-glow-layer");t&&(t.style.transform="translateZ(15px)"),i&&(i.style.transform="translateZ(-20px)")})}setSection(e){this.activeSection!==e&&(this.activeSection=e,this._populateParticles())}_startLoop(){if(this.animationFrameId)return;const e=()=>{this._updateParticles(),this._updateTransforms(),this.animationFrameId=requestAnimationFrame(e)};this.animationFrameId=requestAnimationFrame(e)}_stopLoop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}_updateParticles(){if(!this.canvas||!this.ctx)return;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);const e=this.atmosphereSettings[this.activeSection]||this.atmosphereSettings["#section-hero"];this.mouse.x+=(this.mouse.targetX-this.mouse.x)*.08,this.mouse.y+=(this.mouse.targetY-this.mouse.y)*.08,this.particles.forEach(t=>{t.z-=e.speed*t.speedFactor*3.5,t.z<10&&(t.z=Math.random()*800+600,t.x=Math.random()*this.canvas.width,t.y=Math.random()*this.canvas.height);const i=320,r=i/(i+t.z),n=this.canvas.width/2,o=this.canvas.height/2,a=-this.mouse.x*(i-t.z)*.15,l=-this.mouse.y*(i-t.z)*.15,c=(t.x-n)*r+n+a,d=(t.y-o)*r+o+l,h=t.size*r*3.8;this.ctx.beginPath(),this.ctx.arc(c,d,h,0,Math.PI*2);const p=Math.max(0,Math.min(1,(1-t.z/900)*e.opacity));this.ctx.fillStyle=`rgba(${e.color}, ${p})`,this.ctx.fill()})}_updateTransforms(){if(this.isLowEnd)return;const e=document.querySelector(".hero-3d-scene");if(e){const t=-this.mouse.y*3.8,i=this.mouse.x*3.8,r=Math.min(this.scrollZ,80);e.style.transform=`rotateX(${t}deg) rotateY(${i}deg) translateZ(${r}px)`}}}function _d(){const s=document.getElementById("section-hero");s&&(s.style.position="relative",s.style.overflow="hidden",s.style.transformStyle="preserve-3d",s.style.perspective="1000px",s.innerHTML=`
    <!-- Layered 3D Camera Parallax Scene (z-index: 0) -->
    <div class="hero-3d-scene" style="
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      will-change: transform;
      background: #0d0508;
      z-index: 0;
    ">
      <!-- LAYER 1: Deep Sky Backplate (slowest, recedes in depth) -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: -12%;
        transform: translateZ(-160px) scale(1.22);
        opacity: 0.85;
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(0.9) contrast(1.1) saturate(0.9);" />
      </div>

      <!-- LAYER 2: Sky Clouds & Far City Skyline -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: -8%;
        transform: translateZ(-90px) scale(1.12);
        opacity: 0.95;
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(1.05) contrast(1.05) hue-rotate(-2deg);" />
      </div>

      <!-- LAYER 3: Main Peter + MJ mid-ground composition -->
      <div class="hero-3d-layer" style="
        position: absolute;
        inset: 0;
        transform: translateZ(0px) scale(1);
        pointer-events: none;
      ">
        <img src="peter.png" style="width:100%; height:100%; object-fit:cover; object-position:center 25%; filter: brightness(1.15) contrast(1.1);" />
      </div>

      <!-- LAYER 4: Foreground Depth framing web strands -->
      <svg class="hero-web-strand top-left" viewBox="0 0 100 100" style="
        position: absolute;
        top: -20px;
        left: -20px;
        width: 320px;
        height: 320px;
        pointer-events: none;
        stroke: var(--spider-red);
        fill: none;
        opacity: 0.28;
        transform: translateZ(60px) scale(0.85);
      ">
        <path d="M 0 0 C 30 12, 70 24, 100 36 M 0 0 C 12 30, 24 70, 36 100 M 10 10 C 20 20, 30 20, 40 10 M 20 20 C 30 30, 30 30, 45 20" stroke-width="0.35" />
      </svg>

      <svg class="hero-web-strand bottom-right" viewBox="0 0 100 100" style="
        position: absolute;
        bottom: -20px;
        right: -20px;
        width: 320px;
        height: 320px;
        pointer-events: none;
        stroke: var(--spider-red);
        fill: none;
        opacity: 0.22;
        transform: translateZ(-60px) scale(1.18);
      ">
        <path d="M 100 100 C 70 88, 32 78, 0 66 M 100 100 C 88 70, 78 32, 66 0 M 90 90 C 80 80, 70 80, 60 90" stroke-width="0.35" />
      </svg>
    </div>

    <!-- Hero Local Overlay Layer (z-index: 1) -->
    <div class="hero-local-overlay" style="
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(122,0,8,0.1) 45%, rgba(5,5,5,0.85) 100%);
    "></div>

    <!-- Hero Content Layer (z-index: 2, slightly pushed forward in 3D space) -->
    <div class="hero-content" id="hero-content" style="
      position: relative;
      z-index: 2;
      text-align: center;
      padding: var(--space-lg);
      max-width: 900px;
      margin: 0 auto;
      transform-style: preserve-3d;
      transform: translateZ(40px);
    ">
      <p class="hero-eyebrow" id="hero-eyebrow" style="font-size:clamp(12px, 1.2vw, 15px); letter-spacing:0.4em; text-transform:uppercase; color:#FFD700; font-weight:700; margin-bottom:var(--space-xs); text-shadow:0 0 12px rgba(255,215,0,0.6);">
        EVERY HERO HAS A STORY.
      </p>
      
      <p class="hero-tagline" id="hero-tagline" style="font-family:var(--font-quote); font-style:italic; font-size:clamp(22px,3.5vw,36px); color:#FFFFFF; margin-bottom:var(--space-md); text-shadow:0 2px 15px rgba(0,0,0,0.9); font-weight:600;">
        THIS IS HIS.
      </p>

      <h1 class="hero-main-title" id="hero-main-title" style="font-family:var(--font-display); font-size:clamp(64px,11vw,140px); line-height:0.9; letter-spacing:0.06em; text-transform:uppercase; color:#FFFFFF; text-shadow:0 0 40px rgba(255,255,255,0.4), 0 8px 30px rgba(0,0,0,0.95);">
        PETER <span style="color:#FF2E36; text-shadow:0 0 40px rgba(255,46,54,0.9), 0 0 80px rgba(255,46,54,0.5);">PARKER</span>
      </h1>

      <p class="hero-subtitle" id="hero-subtitle" style="font-size:clamp(12px,1.1vw,16px); letter-spacing:0.35em; text-transform:uppercase; color:#FFFFFF; font-weight:600; margin-top:var(--space-sm); margin-bottom:var(--space-xl); text-shadow:0 2px 10px rgba(0,0,0,0.9);">
        THE BOY BEHIND THE MASK
      </p>

      <div class="hero-cta" id="hero-cta" style="transform: translateZ(15px);">
        <button class="btn-cinematic" id="hero-enter-btn" aria-label="Enter the journey" style="
          padding: 20px 52px;
          border-radius: 4px;
        ">
          ENTER THE JOURNEY &nbsp;➔
        </button>
      </div>
    </div>
  `,wd())}function wd(){const s=document.getElementById("hero-enter-btn"),e=document.getElementById("section-origin");s==null||s.addEventListener("click",()=>{me.unlock();const t=document.createElement("div");t.style.cssText=`
      position: fixed;
      inset: 0;
      background: #050505;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    `,t.innerHTML=`
      <svg id="transition-spider" viewBox="0 0 100 100" style="
        width: 140px;
        height: 140px;
        fill: var(--spider-red);
        filter: drop-shadow(0 0 25px rgba(229, 9, 20, 0.85));
        transform: translateZ(-250px) scale(0.4);
        opacity: 0;
        transition: transform 0.75s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.4s ease;
      ">
        <path d="M 50 15 C 47 25, 45 35, 45 42 C 45 48, 47 50, 50 50 C 53 50, 55 48, 55 42 C 55 35, 53 25, 50 15 Z M 50 50 C 42 55, 38 65, 38 72 C 38 82, 45 85, 50 85 C 55 85, 62 82, 62 72 C 62 65, 58 55, 50 50 Z M 45 42 C 30 35, 20 20, 15 10 C 18 22, 30 35, 43 40 M 55 42 C 70 35, 80 20, 85 10 C 82 22, 70 35, 57 40 M 44 48 C 25 50, 15 52, 5 55 C 15 58, 30 55, 43 52 M 56 48 C 75 50, 85 52, 95 55 C 85 58, 70 55, 57 52 M 45 55 C 28 65, 18 78, 8 90 C 18 82, 32 72, 45 62 M 55 55 C 72 65, 82 78, 92 90 C 82 82, 68 72, 55 62"/>
      </svg>
    `,document.body.appendChild(t);const i=document.querySelector(".hero-3d-scene");i&&(i.style.transition="transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)",i.style.transform="translateZ(-150px) scale(0.82) rotateX(4deg)"),requestAnimationFrame(()=>{t.style.opacity="1";const r=t.querySelector("#transition-spider");r&&(r.style.opacity="1",r.style.transform="translateZ(250px) scale(15)")}),setTimeout(()=>{e==null||e.scrollIntoView({behavior:"auto",block:"start"})},780),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),400),i&&(i.style.transition="",i.style.transform="")},1100)})}function Ed(){const s=document.getElementById("section-origin");s&&(s.style.background="linear-gradient(135deg, #050505 0%, #0d0003 50%, #050505 100%)",s.style.padding="var(--space-section) 0",s.innerHTML=`
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 var(--space-lg);">
      <div class="origin-grid" style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:var(--space-2xl);align-items:center;">
        
        <!-- Interactive Cinematic Memory Window -->
        <div class="origin-image-side" data-reveal-left style="width: 100%; display: flex; justify-content: center;">
          <div class="cinematic-memory-window" 
               data-video-src="peter intro.mp4" 
               data-poster="peter1.webp"
               data-title="Peter Parker: The Boy Behind the Mask"
               data-caption="A teenager with the mind of a scientist and the heart of a hero before everything changed."
               data-chapter="ORIGIN"
               style="width: 100%; max-width: 680px;">
          </div>
        </div>

        <!-- Content side -->
        <div class="origin-content-side">
          <p class="label label-red" data-reveal style="color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;margin-bottom:var(--space-xs);">CHAPTER 01</p>
          <h2 class="chapter-title" data-reveal style="color:#FFFFFF;font-size:clamp(44px,7vw,90px);line-height:0.95;text-shadow:0 0 30px rgba(255,46,54,0.45);text-transform:uppercase;">
            PETER <span style="color:#FF2E36;">PARKER</span>
          </h2>
          <p class="body-lg" data-reveal style="color:#E0E0E0;font-size:clamp(17px,1.6vw,22px);line-height:1.6;font-family:var(--font-quote);font-style:italic;margin-top: 10px;">
            "Before the mask, there was Peter. Before the hero, there was a kid."
          </p>
          <p class="body-lg" data-reveal style="margin-top:var(--space-md);color:#A8A8A8;font-size:16px;line-height:1.6;">
            A brilliant, lonely teenager from Queens raised by his Aunt May. Ordinary — except that he never was.
          </p>

          <div class="origin-facts" data-reveal style="margin-top:var(--space-xl);display:flex;flex-direction:column;gap:var(--space-md);">
            ${[["QUEENS, NEW YORK","Peter Benjamin Parker grew up in Forest Hills, Midtown High School student."],["THE BOY BEHIND THE MASK","A kid who wanted to make a difference, struggling to balance normal life with destiny."],["RADIOACTIVE SPIDER","One bite. Everything changed."]].map(([e,t])=>`
              <div class="origin-fact" style="display:flex;gap:16px;align-items:flex-start;padding:16px;background:rgba(255,46,54,0.04);border-left:3px solid #FF2E36;border-radius:0 8px 8px 0;backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,0.02);border-right:1px solid rgba(255,255,255,0.02);">
                <div>
                  <p class="label label-red" style="margin-bottom:4px;color:#FF555A;font-weight:700;font-size:12px;letter-spacing:0.25em;">${e}</p>
                  <p style="font-size:15px;line-height:1.5;color:#E0E0E0;">${t}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `)}function Td(){const s=document.getElementById("section-becoming");s&&(s.style.background="linear-gradient(135deg, #180509 0%, #360a13 50%, #0d1e40 100%)",s.innerHTML=`
    <!-- Full bleed image background -->
    <div class="becoming-bg-img" style="position:absolute;inset:0;overflow:hidden;">
      <img src="peter2.webp" alt="Spider-Man" class="becoming-img-full" style="width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(1.1) contrast(1.1);" />
      <div class="becoming-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(10,5,8,0.5) 0%, rgba(10,5,8,0.3) 50%, rgba(10,5,8,0.85) 100%);"></div>
    </div>

    <div class="becoming-content" style="position:relative;z-index:3;max-width:850px;margin:0 auto;text-align:center;padding:var(--space-lg);">
      <div class="becoming-title-stack" data-reveal>
        <p class="label" style="letter-spacing:0.5em;color:#FFD700;font-size:14px;font-weight:700;margin-bottom:var(--space-md);text-shadow:0 0 12px rgba(255,215,0,0.5);">
          PETER PARKER BECAME
        </p>
        <h2 class="becoming-name" style="font-family:var(--font-display);font-size:clamp(60px,10vw,130px);color:#FF2E36;letter-spacing:0.04em;text-shadow:0 0 50px rgba(255,46,54,0.9), 0 0 100px rgba(255,46,54,0.4);line-height:0.95;">SPIDER&#8209;MAN</h2>
        <p class="body-lg" style="margin-top:var(--space-lg);max-width:600px;margin-left:auto;margin-right:auto;text-align:center;color:#FFFFFF;font-size:clamp(18px,2vw,24px);line-height:1.6;text-shadow:0 2px 20px rgba(0,0,0,0.9);">
          One bite from a radioactive spider. One moment of hesitation.
          One uncle who didn't need to die. And a boy who swore he never
          would let anyone else pay that price.
        </p>
      </div>
    </div>
  `)}function Sd(){const s=document.getElementById("section-homecoming");s&&(s.style.minHeight="auto",s.style.padding="var(--space-2xl) 0 var(--space-xl)",s.style.background="linear-gradient(180deg, #050505 0%, #0c0812 50%, #050505 100%)",s.style.position="relative",s.innerHTML=`
    <div class="container" style="max-width:1100px;margin:0 auto;padding:0 var(--space-lg);position:relative;z-index:2;">
      <!-- Section Header -->
      <div style="text-align:center;margin-bottom:var(--space-xl);" data-reveal>
        <p class="label label-red" style="letter-spacing:0.4em;margin-bottom:var(--space-xs);color:#FF2E36;font-weight:700;">
          HOMECOMING — CHAPTER 02
        </p>
        <h2 class="chapter-title" style="color:#FFFFFF;font-size:clamp(44px,7vw,90px);letter-spacing:0.04em;text-shadow:0 0 40px rgba(11,61,145,0.4);text-transform:uppercase;">
          THE HOMEMADE <span style="color:#FF2E36;">SUIT</span>
        </h2>
        <p class="body-lg" style="margin-top:var(--space-md);max-width:620px;margin-left:auto;margin-right:auto;color:#E0E0E0;font-size:clamp(17px,1.6vw,22px);line-height:1.6;">
          Parker built his first suit from scratch. A kid trying to be a hero in the streets of Queens.
        </p>
      </div>

      <!-- Suit Showcase Cards Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--space-lg);margin-bottom:var(--space-xl);">
        <!-- Suit Card 1: Homemade -->
        <div class="becoming-suit-placeholder" style="
          border-radius:12px;overflow:hidden;background:rgba(11,61,145,0.1);border:1px solid rgba(255,46,54,0.25);
          box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(11,61,145,0.15);padding:24px;text-align:center;backdrop-filter:blur(8px);
        " data-reveal>
          <div style="width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:16px;">
            <img src="peter2.webp" alt="Homemade Suit" style="width:100%;height:100%;object-fit:cover;filter:brightness(1.1) contrast(1.1);" />
          </div>
          <p class="label label-red" style="font-weight:700;margin-bottom:6px;color:#FF2E36;">QUEENS VIGILANTE</p>
          <p style="color:#FFFFFF;font-size:15px;line-height:1.5;">Sweatpants, goggles, and homemade web-shooters.</p>
        </div>

        <!-- Suit Card 2: Tony Stark Mentorship -->
        <div class="becoming-suit-placeholder" style="
          border-radius:12px;overflow:hidden;background:rgba(255,46,54,0.06);border:1px solid rgba(255,46,54,0.3);
          box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(230,36,41,0.2);padding:24px;text-align:center;backdrop-filter:blur(8px);
        " data-reveal style="transition-delay:0.15s">
          <div style="width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:16px;">
            <img src="peter.png" alt="Stark Suit" style="width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:brightness(1.1) contrast(1.1);" />
          </div>
          <p class="label label-red" style="font-weight:700;margin-bottom:6px;color:#FF2E36;">STARK UPGRADE</p>
          <p style="color:#FFFFFF;font-size:15px;line-height:1.5;">Advanced optics, AI assistance, and high-tensile webbing.</p>
        </div>
      </div>

      <!-- Tony Stark Quote Block -->
      <div style="
        max-width:800px;margin:0 auto var(--space-2xl) auto;text-align:center;padding:var(--space-lg);
        background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.8);backdrop-filter:blur(8px);
      " data-reveal style="transition-delay:0.25s">
        <blockquote style="quotes:none;margin:0;">
          <p style="color:#FFFFFF;font-family:var(--font-quote);font-style:italic;font-size:clamp(22px,3.2vw,36px);line-height:1.4;text-shadow:0 2px 20px rgba(0,0,0,0.95);">
            "If you're nothing without the suit, then you shouldn't have it."
          </p>
          <footer style="margin-top:var(--space-md);color:#FF2E36;font-size:var(--fs-label);letter-spacing:0.35em;font-weight:700;">
            — TONY STARK
          </footer>
        </blockquote>
      </div>

      <!-- ==========================================
           PETER HAPPY — CELEBRATION MEMORY SECTION
           ========================================== -->
      <div class="peter-happy-section" style="
        margin-top: var(--space-3xl);
        padding-top: var(--space-2xl);
        border-top: 1px solid rgba(255, 46, 54, 0.12);
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="text-align: center; margin-bottom: var(--space-xl);">
          <p class="label label-red" style="letter-spacing: 0.35em; color: #FF2E36; font-weight: 700; margin-bottom: var(--space-xs);">
            MEMORABLE CLIMAX
          </p>
          <blockquote style="quotes: none; margin: 0; font-family: var(--font-quote); font-style: italic; color: #FFF; font-size: clamp(20px, 3vw, 32px); line-height: 1.4; text-shadow: 0 0 20px rgba(255, 46, 54, 0.35);">
            "FOR A MOMENT, THE CITY DIDN’T SEE A KID IN A MASK.<br/>
            <span style="color: #FF2E36;">THEY SAW A HERO.</span>"
          </blockquote>
        </div>

        <!-- Double Memory Cards Layout -->
        <div style="display: flex; gap: var(--space-xl); justify-content: center; flex-wrap: wrap; width: 100%; max-width: 900px;">
          <!-- Primary Celebration Memory Video Card -->
          <div class="cinematic-memory-window" 
               data-video-src="peter happy.mp4"
               data-poster="peter happy.jpg"
               data-title="The World Sees a Hero"
               data-caption="Peter Parker is celebrated by the city he protects. A moment of true joy and recognition before the storm."
               data-chapter="HOMECOMING"
               style="width: 380px; max-width: 90%;">
          </div>

          <!-- Secondary alternate STILL memory image Card -->
          <div class="cinematic-memory-window" 
               data-is-photo
               data-poster="peter happy 2.jpg"
               data-title="A Hero Embraced"
               data-caption="Spider-Man surrounded by the people of Queens who believe in him."
               data-chapter="HOMECOMING"
               style="width: 380px; max-width: 90%;">
          </div>
        </div>
      </div>

    </div>
  `)}function Md(){const s=document.getElementById("section-love");s&&(s.style.background="linear-gradient(135deg, #1f070d 0%, #420f1a 50%, #1f070d 100%)",s.innerHTML=`
    <!-- Full bleed MJ + Peter image -->
    <div class="mj-full-bg" style="position:absolute;inset:0;overflow:hidden;">
      <img src="peter4.jpg" alt="MJ and Spider-Man — Far From Home" class="mj-full-img" style="width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:brightness(1.1) contrast(1.1);" />
      <div class="mj-full-overlay" style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(15,5,8,0.4) 0%, rgba(15,5,8,0.2) 40%, rgba(15,5,8,0.85) 100%);"></div>
    </div>

    <div class="mj-hero-text" data-reveal style="position:relative;z-index:3;text-align:center;max-width:850px;margin:0 auto var(--space-2xl);padding:var(--space-lg);">
      <p class="label label-red" style="margin-bottom:var(--space-md);color:#FF2E36;font-size:14px;letter-spacing:0.4em;font-weight:700;">CHAPTER 05</p>
      <h2 class="chapter-title" style="font-size:clamp(56px,9vw,120px);color:#FFFFFF;text-shadow:0 0 50px rgba(255,46,54,0.6), 0 4px 30px rgba(0,0,0,0.95);line-height:0.95;">
        PETER <span style="color:#FF2E36;">&</span> MJ
      </h2>
      <p class="body-lg" style="
        margin-top:var(--space-lg);
        max-width:550px;
        margin-left:auto;margin-right:auto;
        text-align:center;
        color:#FFFFFF;
        font-size:clamp(18px,2vw,24px);
        line-height:1.6;
        text-shadow:0 2px 20px rgba(0,0,0,0.9);
      ">
        She called him "loser." She quoted Plath at decathlons.
        She rolled her eyes at everything. And Peter Parker
        fell completely, helplessly in love with her.
      </p>
    </div>

    <!-- Love progression bottom -->
    <div class="love-progression-bar" data-reveal style="position:relative;z-index:3;display:flex;align-items:center;justify-content:center;gap:var(--space-md);flex-wrap:wrap;max-width:900px;margin:0 auto;padding:16px;background:rgba(255,46,54,0.15);border:1px solid rgba(255,46,54,0.4);border-radius:30px;backdrop-filter:blur(8px);">
      ${["FIRST GLANCE","FRIENDSHIP","FALLING","LOVE","HAPPINESS"].map(e=>`
        <div class="love-step-item" style="display:flex;align-items:center;gap:8px;">
          <div class="love-step-dot" style="width:8px;height:8px;border-radius:50%;background:#FF2E36;box-shadow:0 0 10px #FF2E36;"></div>
          <p class="love-step-text" style="font-size:12px;letter-spacing:0.25em;color:#FFFFFF;font-weight:700;text-transform:uppercase;">${e}</p>
        </div>
      `).join('<div class="love-step-line" style="width:25px;height:2px;background:rgba(255,255,255,0.4);"></div>')}
    </div>
  `)}function kd(s){const e=document.getElementById("section-memory-wall");if(!e)return;e.innerHTML=`
    <div class="container" style="text-align:center;">
      <p class="label label-red" data-reveal>PETER & MJ</p>
      <h2 class="memory-wall-title" data-reveal style="transition-delay:0.1s">
        THE MEMORIES
      </h2>
      <p class="body-lg" data-reveal style="transition-delay:0.2s;max-width:500px;margin:0 auto var(--space-xl)">
        Not all love stories are told in words. Some live in photographs,
        in glances, in ordinary moments that felt extraordinary.
      </p>
    </div>

    <div class="memory-wall-grid" id="memory-wall-grid" role="list" aria-label="MJ and Peter memories"></div>

    <p class="label" style="
      text-align:center;margin-top:var(--space-xl);
      color:rgba(168,168,168,0.3);letter-spacing:0.3em;
    " data-reveal>
      CLICK A MEMORY TO REMEMBER
    </p>
  `;const t=document.getElementById("memory-wall-grid");t&&s&&new Pl(t,s)}function Cd(){const s=document.getElementById("section-love-scroll");if(!s)return;const e=["linear-gradient(160deg,#2d0910 0%,#1a0508 100%)","linear-gradient(160deg,#1a0508 0%,#3d0d15 100%)","linear-gradient(160deg,#3d0d15 0%,#1a0810 100%)","linear-gradient(160deg,#1a0810 0%,#2d0910 100%)","linear-gradient(160deg,#2d1015 0%,#1a0508 100%)","linear-gradient(160deg,#1a0810 0%,#3d0d15 100%)","linear-gradient(160deg,#2d0910 0%,#1a0810 100%)"];s.innerHTML=`
    <div class="love-scroll-sticky" id="love-scroll-sticky">
      ${Sl.map((t,i)=>`
        <div class="love-scene${i===0?" active":""}" id="love-scene-${i}" aria-label="${t.scene}">
          <div style="
            position:absolute;inset:0;
            background:${e[i]};
            transition:opacity 1s ease;
          " aria-hidden="true"></div>

          <div class="love-scene-content" style="position:relative;z-index:2;max-width:800px;text-align:center;padding:var(--space-lg);">
            <p class="love-scene-num" style="color:var(--spider-red);font-size:var(--fs-label);letter-spacing:0.4em;margin-bottom:var(--space-md);">${t.scene}</p>

            <div class="love-scene-image" aria-label="${t.scene} — image" style="max-width:550px;aspect-ratio:16/9;margin:0 auto var(--space-lg);border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(230,36,41,0.2);border:1px solid rgba(230,36,41,0.3);">
              <img src="peter4.jpg" alt="Peter and MJ" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
            </div>

            <p class="love-scene-text" style="color:var(--white);font-family:var(--font-quote);font-style:italic;font-size:clamp(20px,3vw,32px);line-height:1.5;text-shadow:0 2px 20px rgba(0,0,0,0.9);">"${t.text}"</p>
          </div>
        </div>
      `).join("")}
    </div>
  `,lt.initLoveScroll(s)}function Pd(){const s=document.getElementById("section-infinity-war");s&&(s.innerHTML=`
    <div class="infinity-war-sticky" id="iw-sticky">
      <div class="iw-bg" id="iw-bg" style="background:radial-gradient(ellipse at center,#2d0610 0%,#0B0B0F 100%);"></div>

      <!-- Dust particles (created by JS) -->
      <div class="dust-container" id="dust-container" aria-hidden="true"></div>

      <div class="iw-content" id="iw-content" style="max-width:900px;margin:0 auto;text-align:center;padding:var(--space-lg);">
        <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);letter-spacing:0.4em;">
          INFINITY WAR
        </p>
        <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;color:var(--white);font-size:clamp(40px,6vw,80px);text-shadow:0 0 50px rgba(230,36,41,0.5);">
          EVERYTHING<br/>CHANGED AGAIN.
        </h2>

        <div style="margin-top:var(--space-xl);display:flex;align-items:center;justify-content:center;position:relative;">
          <div style="
            width:min(400px,85vw);aspect-ratio:4/3;border-radius:12px;overflow:hidden;
            box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(230,36,41,0.3);
            border:1px solid rgba(230,36,41,0.3);
          " data-reveal>
            <img src="peter3.webp" alt="Titan Battle" style="width:100%;height:100%;object-fit:cover;" />
          </div>
        </div>

        <!-- The Snap -->
        <div id="snap-section" style="text-align:center;margin-top:var(--space-xl);opacity:1;">
          <p class="chapter-title" style="color:var(--spider-red);font-size:clamp(32px,5vw,64px);text-shadow:0 0 30px var(--spider-red);">THE SNAP.</p>
          <div style="margin-top:var(--space-lg);">
            <blockquote class="iw-quote" id="snap-quote" style="opacity:1;color:var(--white);font-family:var(--font-quote);font-style:italic;font-size:clamp(22px,3.5vw,36px);line-height:1.5;">
              "I don't feel so good..."
              <br/><br/>
              "I don't want to go."
              <footer class="iw-attribution" style="margin-top:var(--space-md);color:var(--spider-red);font-size:var(--fs-label);letter-spacing:0.3em;">— PETER PARKER</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  `,s.style.minHeight="120vh",Ad(s))}function Ad(s){let e=!1;new IntersectionObserver(i=>{i[0].isIntersecting&&!e&&(e=!0,Od())},{threshold:.2}).observe(s)}function Od(){const s=document.getElementById("dust-container");if(!s)return;const e=60;for(let t=0;t<e;t++){const i=document.createElement("div");i.className="dust-particle",i.style.cssText=`
      left: ${40+Math.random()*20}%;
      top: ${30+Math.random()*40}%;
      --tx: ${(Math.random()-.5)*200}px;
      --ty: ${(Math.random()-.5)*200}px;
      animation: dust-particle ${1.5+Math.random()*2}s ease-out ${Math.random()*2}s forwards;
      background: rgba(245,245,245,${.3+Math.random()*.4});
      width: ${2+Math.random()*3}px;
      height: ${2+Math.random()*3}px;
    `,s.appendChild(i)}}function Fd(){const s=document.getElementById("section-endgame");s&&(s.innerHTML=`
    <div class="endgame-content container" style="text-align:center;padding:var(--space-section) 0;">
      <p class="endgame-time-jump" data-reveal style="font-family:var(--font-display);font-size:clamp(48px,8vw,110px);color:var(--white);letter-spacing:0.05em;text-shadow:0 0 50px rgba(11,61,145,0.6);">
        <span style="color:var(--spider-blue);">FIVE YEARS</span> LATER...
      </p>

      <div style="
        width:min(700px,90vw);aspect-ratio:16/9;
        margin:var(--space-xl) auto;
        border-radius:12px;overflow:hidden;
        border:1px solid rgba(11,61,145,0.3);
        box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 50px rgba(11,61,145,0.3);
        position:relative;
      " data-reveal style="transition-delay:0.2s">
        <img src="peter2.webp" alt="Endgame Return" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
        <div style="
          position:absolute;inset:0;
          background:radial-gradient(circle at center,rgba(11,61,145,0.2) 0%,rgba(5,5,5,0.7) 100%);
        " aria-hidden="true"></div>
      </div>

      <div style="text-align:center;max-width:650px;margin:0 auto;" data-reveal style="transition-delay:0.3s">
        <p class="body-lg" style="margin-bottom:var(--space-md);color:var(--white);font-size:clamp(18px,2vw,22px);line-height:1.6;">
          They came back. Peter came back. But Tony Stark didn't.
        </p>
        <p class="body-lg" style="color:rgba(245,245,245,0.8);font-size:clamp(16px,1.5vw,18px);line-height:1.6;">
          The man who made him Spider-Man paid the ultimate price.
          Peter was left to carry that weight into whatever came next.
        </p>
      </div>

      <div style="
        margin-top:var(--space-xl);
        padding:var(--space-lg);
        border-left:3px solid var(--spider-red);
        background:rgba(230,36,41,0.05);
        border-radius:0 12px 12px 0;
        max-width:600px;margin-left:auto;margin-right:auto;
        text-align:left;
        box-shadow:0 10px 40px rgba(0,0,0,0.5);
      " data-reveal style="transition-delay:0.4s">
        <p class="cinematic-quote" style="color:var(--white);font-size:clamp(20px,2.5vw,28px);">
          "If you're nothing without the suit,<br/>
          then you shouldn't have it."
        </p>
        <p class="label label-red" style="margin-top:var(--space-md);letter-spacing:0.3em;">
          TONY STARK — IN MEMORIAM
        </p>
      </div>
    </div>
  `,s.classList.add("section--full-vh"))}function Rd(){const s=document.getElementById("section-far-from-home");s&&(s.innerHTML=`
    <div class="ffh-grid container" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;padding:var(--space-section) 0;">
      <!-- Content left -->
      <div>
        <p class="label label-red" data-reveal style="letter-spacing:0.4em;">CHAPTER 10</p>
        <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;color:var(--white);font-size:clamp(40px,6vw,80px);margin-top:var(--space-xs);">
          FAR FROM<br/>HOME
        </h2>
        <p class="body-lg" data-reveal style="transition-delay:0.2s;margin-top:var(--space-lg);color:rgba(245,245,245,0.85);font-size:clamp(16px,1.5vw,20px);line-height:1.6;">
          Peter wanted one thing: a normal summer. A chance to tell MJ
          how he felt. A trip to Europe without saving the world.
        </p>
        <p class="body-lg" data-reveal style="transition-delay:0.3s;margin-top:var(--space-md);color:var(--spider-red);font-weight:600;">
          The world had other plans.
        </p>

        <div class="ffh-scenes" data-reveal style="transition-delay:0.4s;margin-top:var(--space-xl);display:flex;flex-direction:column;gap:var(--space-sm);">
          ${kl.map(e=>`<p class="ffh-scene-item" style="color:var(--white);font-size:15px;letter-spacing:0.15em;text-transform:uppercase;padding:8px 16px;background:rgba(255,255,255,0.05);border-left:2px solid var(--spider-blue);border-radius:0 6px 6px 0;">${e}</p>`).join("")}
        </div>
      </div>

      <!-- Visual right -->
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <div style="
          height:380px;border-radius:12px;overflow:hidden;
          position:relative;border:1px solid rgba(11,61,145,0.3);
          box-shadow:0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(11,61,145,0.25);
        " data-reveal style="transition-delay:0.1s">
          <img src="peter4.jpg" alt="Far From Home Europe" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%);" aria-hidden="true"></div>
        </div>

        <div style="
          padding:var(--space-lg);
          border:1px solid rgba(255,245,245,0.15);
          background:rgba(11,61,145,0.1);
          border-radius:12px;
          backdrop-filter:blur(8px);
        " data-reveal style="transition-delay:0.2s">
          <p class="label label-red" style="margin-bottom:8px;letter-spacing:0.3em;">MYSTERIO</p>
          <p class="cinematic-quote" style="font-size:clamp(18px,2.2vw,24px);color:var(--white);">
            "The world needs the next Iron Man."
          </p>
          <p class="label" style="margin-top:12px;color:rgba(245,245,245,0.5);letter-spacing:0.2em;">— BUT PETER WASN'T TONY.</p>
        </div>
      </div>
    </div>
  `,s.classList.add("section--full-vh"))}function Id(){const s=document.getElementById("section-identity");if(!s)return;const e=[{tag:"BREAKING NEWS",text:"SPIDER-MAN IS PETER PARKER"},{tag:"LIVE UPDATE",text:"Queens Teen Unmasked"},{tag:"TRENDING",text:"#PeterParker #SpiderMan"},{tag:"STATEMENT",text:"Mysterio reveals identity"},{tag:"ALERT",text:"Peter Parker — Midtown High"},{tag:"REPORT",text:"His friends. His school. Exposed."},{tag:"WORLDWIDE",text:"The world knows his name."},{tag:"CHAOS",text:"Everything changed in seconds."}];s.innerHTML=`
    <!-- Ambient background glow -->
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center, rgba(230,36,41,0.2) 0%, rgba(5,5,5,0.95) 100%);pointer-events:none;" aria-hidden="true"></div>

    <!-- Floating chaos panels -->
    <div class="identity-chaos" id="identity-chaos" aria-hidden="true">
      ${e.map((t,i)=>`
        <div class="identity-panel" style="${Ld(i)}background:rgba(230,36,41,0.15);border:1px solid rgba(230,36,41,0.4);border-radius:8px;backdrop-filter:blur(8px);box-shadow:0 10px 30px rgba(0,0,0,0.8);">
          <p class="identity-panel-tag" style="color:var(--spider-red);font-weight:700;">${t.tag}</p>
          <p class="identity-panel-text" style="color:var(--white);font-size:14px;font-weight:600;">${t.text}</p>
        </div>
      `).join("")}
    </div>

    <!-- Central message -->
    <div class="identity-title-main" data-reveal style="position:relative;z-index:3;text-align:center;max-width:700px;margin:0 auto;">
      <p class="label label-red" style="margin-bottom:var(--space-md);letter-spacing:0.4em;">CHAPTER 11</p>
      <h2 class="identity-everyone-knows" style="font-family:var(--font-display);font-size:clamp(56px,10vw,130px);color:var(--spider-red);text-shadow:0 0 60px rgba(230,36,41,0.8);line-height:0.9;">EVERYONE<br/><span style="color:var(--white);text-shadow:0 0 40px rgba(255,255,255,0.4);">KNOWS.</span></h2>
      <p class="body-lg" style="
        margin-top:var(--space-lg);text-align:center;
        max-width:550px;margin-left:auto;margin-right:auto;
        color:rgba(245,245,245,0.9);font-size:clamp(16px,1.8vw,22px);line-height:1.6;
      ">
        One moment. One revelation. Peter Parker's life — as he knew it — was over.
      </p>
    </div>
  `,s.classList.add("section--full-vh"),Dd()}function Ld(s){const e=["top:12%;left:8%;","top:8%;left:35%;","top:15%;right:10%;","top:40%;left:5%;","top:65%;left:15%;","top:75%;right:8%;","top:45%;right:12%;","bottom:12%;left:42%;"],t=[18,22,26,20,24,16,28,21],i=e[s]||"top:50%;left:50%;",r=t[s]||20;return`
    ${i}
    --dx1:${(Math.random()*20-10).toFixed(0)}px;
    --dy1:${(Math.random()*20-10).toFixed(0)}px;
    --dx2:${(Math.random()*20-10).toFixed(0)}px;
    --dy2:${(Math.random()*20-10).toFixed(0)}px;
    --dx3:${(Math.random()*20-10).toFixed(0)}px;
    --dy3:${(Math.random()*20-10).toFixed(0)}px;
    animation:identity-float ${r}s ease-in-out ${s*.5}s infinite;
    opacity:0.9;
  `}function Dd(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.getElementById("identity-chaos");e&&e.querySelectorAll(".identity-panel").forEach((t,i)=>{t.style.opacity="0.9"})}function zd(){const s=document.getElementById("section-no-way-home");s&&(s.innerHTML=`
    <!-- Portal rings background -->
    <div class="portal-bg" aria-hidden="true">
      <div class="portal-ring portal-ring-1" style="border-color:rgba(11,61,145,0.4)"></div>
      <div class="portal-ring portal-ring-2" style="border-color:rgba(11,61,145,0.25)"></div>
      <div class="portal-ring portal-ring-3" style="border-color:rgba(11,61,145,0.15)"></div>
      <div class="portal-ring portal-ring-4" style="border-color:rgba(11,61,145,0.08)"></div>
    </div>

    <div class="nwh-content">
      <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);">
        NO WAY HOME
      </p>
      <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;text-align:center;">
        THE WORLD<br/>BROKE OPEN.
      </h2>
      <p class="body-lg" data-reveal style="
        transition-delay:0.2s;text-align:center;
        margin-top:var(--space-lg);max-width:500px;margin-left:auto;margin-right:auto;
      ">
        Doctor Strange attempted the impossible. The multiverse shattered.
        Every enemy who ever knew Peter Parker's name came through.
      </p>

      <!-- Villain tags -->
      <div class="nwh-villains" data-reveal style="transition-delay:0.3s" role="list" aria-label="Villains from the multiverse">
        ${Ml.map(e=>`<div class="nwh-villain" role="listitem">${e}</div>`).join("")}
      </div>

      <!-- Multiverse visual -->
      <div style="
        margin-top:var(--space-xl);
        width:min(500px,90vw);height:min(280px,50vw);
        border:1px solid rgba(11,61,145,0.25);
        border-radius:12px;
        position:relative;overflow:hidden;
        display:flex;align-items:center;justify-content:center;
        margin-left:auto;margin-right:auto;
        box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(11, 61, 145, 0.2);
      " data-reveal style="transition-delay:0.4s" aria-label="The Multiverse Shattered">
        <img src="multiverse.jpg" alt="The Multiverse Shattered" style="width:100%;height:100%;object-fit:cover;filter:brightness(1.05) contrast(1.1);" />
      </div>
    </div>
  `,s.classList.add("section--full-vh"),s.style.padding="var(--space-section) 0")}function Nd(){const s=document.getElementById("section-three-spidermen");if(!s)return;s.innerHTML=`
    <div class="three-sm-sticky" id="three-sm-sticky">
      <div class="three-worlds" id="three-worlds" style="display: grid; grid-template-columns: 1fr 1fr 1fr; height: 100vh;">

        <!-- World 1: Tobey -->
        <div class="world-1" role="region" aria-label="World 1: Tobey Maguire's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <div class="world-divider world-divider--right" aria-hidden="true" style="z-index:5;"></div>
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 1 — TOBEY</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="tobey.webp" alt="Tobey Maguire's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.9); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>

        <!-- World 2: Andrew -->
        <div class="world-2" role="region" aria-label="World 2: Andrew Garfield's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 2 — ANDREW</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="andrew.webp" alt="Andrew Garfield's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.95); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>

        <!-- World 3: Tom -->
        <div class="world-3" role="region" aria-label="World 3: Tom Holland's Spider-Man" style="position:relative; overflow:hidden; height:100%;">
          <div class="world-divider world-divider--left" aria-hidden="true" style="z-index:5;"></div>
          <p class="world-num" style="z-index:5; top:var(--space-xl); left:50%; transform:translateX(-50%); position:absolute;">WORLD 3 — TOM</p>
          <div style="position:absolute; inset:0; z-index:1; overflow:hidden;">
            <img src="tom.jpg" alt="Tom Holland's Spider-Man" style="width:100%; height:100%; object-fit:cover; object-position:center top; filter:grayscale(60%) brightness(0.9); transition:all 0.4s ease;" />
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 50%, transparent 100%); pointer-events:none;"></div>
          </div>
        </div>
      </div>

      <!-- Final title overlay (appears after merge) -->
      <div class="three-sm-title-overlay" id="three-sm-overlay" aria-live="polite" style="z-index:10;">
        <div class="three-sm-final-title">
          <p class="line1">THREE WORLDS. &nbsp; ONE CHOICE.</p>
          <h2 class="line2">THREE <span>SPIDER-MEN.</span></h2>
        </div>
      </div>
    </div>
  `,s.style.minHeight="230vh",lt.initThreeSpiderMen(s),s.querySelectorAll(".world-1, .world-2, .world-3").forEach(t=>{const i=t.querySelector("img");t.addEventListener("mouseenter",()=>{i&&(i.style.filter="grayscale(0%) brightness(1.1) contrast(1.05)",i.style.transform="scale(1.025)")}),t.addEventListener("mouseleave",()=>{i&&(i.style.filter="grayscale(60%) brightness(0.9)",i.style.transform="scale(1)")})})}class Bd{constructor(e,t={}){this.container=e,this.options={src:t.src||"",poster:t.poster||"",ratio:t.ratio||"16-9",autoplay:t.autoplay!==void 0?t.autoplay:!1,muted:t.muted!==void 0?t.muted:!1,label:t.label||"DUMMY VIDEO PLACEHOLDER"},this.isPlaying=!1,this.isMuted=this.options.muted,this._build(),this._bindEvents(),this._observeViewport()}_build(){this.container.className+=` video-wrapper video-wrapper--${this.options.ratio}`,this.container.setAttribute("data-cursor-hover","");const t=this.options.src&&!this.options.src.includes("/assets/videos/")?"":"background: linear-gradient(160deg, #0D0D0D 0%, #0B3D91 40%, #050505 100%);";this.container.innerHTML=`
      <!-- DUMMY VIDEO: Replace src with real video path -->
      <video
        class="video-element"
        src="${this.options.src}"
        ${this.options.poster?`poster="${this.options.poster}"`:""}
        ${this.options.muted?"muted":""}
        playsinline
        preload="none"
        aria-label="${this.options.label}"
      ></video>

      ${this.options.poster?`<img class="video-poster" src="${this.options.poster}" alt="${this.options.label} poster" />`:`<div class="video-poster placeholder-city" style="${t}" aria-label="${this.options.label} — ${this.options.label}"></div>`}

      <div class="video-controls" role="toolbar" aria-label="Video controls">
        <button class="video-btn video-play-btn" aria-label="Play or pause video">
          <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        </button>

        <div class="video-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="video-progress-fill"></div>
        </div>

        <button class="video-btn video-mute-btn" aria-label="Toggle mute">
          <svg class="mute-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <svg class="mute-on-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        </button>

        <button class="video-btn video-fullscreen-btn" aria-label="Toggle fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/>
            <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>
      </div>
    `,this.videoEl=this.container.querySelector(".video-element"),this.posterEl=this.container.querySelector(".video-poster"),this.playBtn=this.container.querySelector(".video-play-btn"),this.muteBtn=this.container.querySelector(".video-mute-btn"),this.fullscreenBtn=this.container.querySelector(".video-fullscreen-btn"),this.progressBar=this.container.querySelector(".video-progress"),this.progressFill=this.container.querySelector(".video-progress-fill"),this.playIcon=this.container.querySelector(".play-icon"),this.pauseIcon=this.container.querySelector(".pause-icon"),this.muteOffIcon=this.container.querySelector(".mute-off-icon"),this.muteOnIcon=this.container.querySelector(".mute-on-icon")}_bindEvents(){var e,t,i,r;this.videoEl&&((e=this.playBtn)==null||e.addEventListener("click",()=>this.togglePlay()),this.videoEl.addEventListener("click",()=>this.togglePlay()),(t=this.muteBtn)==null||t.addEventListener("click",()=>this.toggleMute()),(i=this.fullscreenBtn)==null||i.addEventListener("click",()=>this.toggleFullscreen()),this.videoEl.addEventListener("timeupdate",()=>{if(!this.videoEl.duration)return;const n=this.videoEl.currentTime/this.videoEl.duration*100;this.progressFill&&(this.progressFill.style.width=`${n}%`),this.progressBar&&this.progressBar.setAttribute("aria-valuenow",Math.round(n))}),(r=this.progressBar)==null||r.addEventListener("click",n=>{const o=this.progressBar.getBoundingClientRect(),a=(n.clientX-o.left)/o.width;this.videoEl.currentTime=a*this.videoEl.duration}),this.videoEl.addEventListener("canplay",()=>{this.videoEl.classList.add("loaded"),this.posterEl&&(this.posterEl.style.opacity="0")}),this.videoEl.addEventListener("ended",()=>{this.isPlaying=!1,this._updatePlayUI(),me.restoreAfterVideo()}),this.videoEl.addEventListener("play",()=>{this.isPlaying=!0,this._updatePlayUI()}),this.videoEl.addEventListener("pause",()=>{this.isPlaying=!1,this._updatePlayUI()}))}_observeViewport(){if(!this.videoEl||!this.options.autoplay)return;new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting?this.play():this.pause()})},{threshold:.5}).observe(this.container)}togglePlay(){this.isPlaying?this.pause():this.play()}play(){this.videoEl&&(this.videoEl.play().catch(()=>{}),me.duckForVideo())}pause(){this.videoEl&&(this.videoEl.pause(),me.restoreAfterVideo())}toggleMute(){this.isMuted=!this.isMuted,this.videoEl&&(this.videoEl.muted=this.isMuted),this.muteOffIcon&&(this.muteOffIcon.style.display=this.isMuted?"none":""),this.muteOnIcon&&(this.muteOnIcon.style.display=this.isMuted?"":"none")}toggleFullscreen(){var e,t,i;document.fullscreenElement?(i=document.exitFullscreen)==null||i.call(document):(t=(e=this.container).requestFullscreen)==null||t.call(e)}_updatePlayUI(){this.playIcon&&(this.playIcon.style.display=this.isPlaying?"none":""),this.pauseIcon&&(this.pauseIcon.style.display=this.isPlaying?"":"none")}}function Hd(){const s=document.getElementById("section-second-love");if(!s)return;s.innerHTML=`
    <div class="second-love-content container" style="text-align:center;">
      <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);">
        EVEN IN THE CHAOS
      </p>
      <h2 class="chapter-title" data-reveal style="transition-delay:0.1s">
        LOVE WAS<br/>STILL THERE.
      </h2>

      <!-- MJ memory video or image -->
      <div style="
        margin:var(--space-xl) auto;
        max-width:700px;
      " data-reveal style="transition-delay:0.2s">
        <div id="mj-memory-video"></div>
      </div>

      <p class="body-lg" data-reveal style="
        transition-delay:0.3s;
        font-family:var(--font-quote);font-style:italic;
        max-width:600px;margin:0 auto;
      ">
        Even though everything around him was collapsing — the multiverse,
        his identity, his world — his feelings for MJ never wavered.
      </p>

      <div style="
        margin-top:var(--space-xl);
        padding:var(--space-lg);
        border:1px solid rgba(230,36,41,0.1);
        max-width:500px;margin-left:auto;margin-right:auto;
      " data-reveal style="transition-delay:0.4s">
        <p class="cinematic-quote" style="font-size:clamp(18px,2.5vw,26px);">
          He could lose the multiverse.<br/>
          He could lose his identity.<br/>
          He could not lose her.
        </p>
      </div>

      <div style="
        display:flex;gap:var(--space-xl);justify-content:center;
        margin-top:var(--space-xl);
        flex-wrap:wrap;
      " data-reveal style="transition-delay:0.5s">
        ${["PROTECTION","FEAR","MEMORIES","LOVE"].map(t=>`
          <div style="text-align:center;">
            <p class="chapter-title" style="font-size:clamp(28px,4vw,56px);color:rgba(230,36,41,0.4);">${t}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `,s.classList.add("section--full-vh"),s.style.padding="var(--space-section) 0";const e=document.getElementById("mj-memory-video");e&&new Bd(e,{src:co.mjMemory,poster:co.posters.mjMemory,ratio:"16-9",label:"MJ Memory — DUMMY VIDEO PLACEHOLDER"})}function qd(){const s=document.getElementById("section-aunt-may");s&&(s.style.background="linear-gradient(135deg, #1f070b 0%, #3d0e16 50%, #0d1224 100%)",s.style.padding="var(--space-section) 0",s.innerHTML=`
    <div class="aunt-may-layout" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;max-width:1200px;margin:0 auto;padding:0 var(--space-lg);">
      <!-- Image side — peter3.webp: battered Peter face -->
      <div class="aunt-may-img-side" data-reveal-left style="position:relative;width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,46,54,0.3);border:2px solid rgba(255,46,54,0.3);">
        <img src="peter3.webp" alt="Peter Parker — After the sacrifice" class="aunt-may-img" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.1) contrast(1.1);" />
        <div class="aunt-may-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(31,7,11,0.7) 0%, transparent 60%);"></div>
      </div>

      <!-- Text side -->
      <div class="aunt-may-text-side" data-reveal-right>
        <p class="label label-red" style="margin-bottom:var(--space-lg);color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;">CHAPTER 15 — LOSS</p>

        <blockquote class="aunt-may-quote-block">
          <p style="color:#FFD700;font-size:14px;letter-spacing:0.35em;font-weight:700;margin-bottom:var(--space-md);text-shadow:0 0 10px rgba(255,215,0,0.5);">
            WITH GREAT POWER...
          </p>
          <h2 class="chapter-title" style="color:#FFFFFF;font-size:clamp(40px,6.5vw,85px);line-height:0.95;text-shadow:0 0 40px rgba(255,46,54,0.6);">
            COMES GREAT<br/><span style="color:#FF2E36;">RESPONSIBILITY.</span>
          </h2>
          <footer style="margin-top:var(--space-lg);">
            <p class="label label-red" style="color:#FF2E36;font-size:14px;letter-spacing:0.3em;font-weight:700;">— AUNT MAY</p>
          </footer>
        </blockquote>

        <p class="body-lg" style="margin-top:var(--space-xl);border-top:1px solid rgba(255,255,255,0.15);padding-top:var(--space-lg);color:#FFFFFF;font-size:clamp(17px,1.6vw,22px);line-height:1.6;">
          She gave him the most important words he would ever carry.
          And then she was gone. And Peter Parker would never be the same.
        </p>
      </div>
    </div>
  `)}class $d{constructor(e){this.container=e,this.words=Tl,this.activePanel=null,this.wordEls=[],this.mouseX=0,this.mouseY=0,this.raf=null,this.isActive=!1,this.positions=[{x:50,y:22},{x:30,y:45},{x:70,y:38},{x:18,y:65},{x:65,y:70},{x:40,y:80},{x:82,y:58},{x:12,y:32},{x:55,y:55},{x:78,y:80}],this._build()}_build(){var t;if(!this.container)return;this.container.innerHTML=`
      <div class="mind-center-figure" aria-hidden="true">
        <div style="width:80px;height:200px;background:linear-gradient(180deg,#1a1a1a 0%,#050505 100%);opacity:0.3;"></div>
      </div>
      <div id="mind-words-layer"></div>
      <div class="mind-memory-panel" id="mind-panel" role="dialog" aria-modal="true">
        <button class="mind-memory-close" id="mind-panel-close" aria-label="Close memory">✕</button>
        <p class="label label-red" id="mind-panel-title" style="margin-bottom:16px;"></p>
        <p id="mind-panel-body" style="font-size:16px;line-height:1.7;color:var(--muted-white);"></p>
      </div>
    `;const e=this.container.querySelector("#mind-words-layer");this.panel=this.container.querySelector("#mind-panel"),this.panelTitle=this.container.querySelector("#mind-panel-title"),this.panelBody=this.container.querySelector("#mind-panel-body"),(t=document.getElementById("mind-panel-close"))==null||t.addEventListener("click",()=>this.closePanel()),this.words.forEach((i,r)=>{const n=document.createElement("div");n.className="mind-word",n.textContent=i.word,n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label",`Think about: ${i.word}`);const o=this.positions[r]||{x:50,y:50};n.style.cssText=`
        left: ${o.x}%;
        top: ${o.y}%;
        font-size: ${i.size}px;
        color: ${i.color};
        transform: translate(-50%, -50%);
        animation: mind-float ${8+r*1.2}s ease-in-out ${r*.5}s infinite;
        opacity: 0.7;
      `,n.style.willChange="transform",n.addEventListener("click",()=>this.openPanel(i,r)),n.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&this.openPanel(i,r)}),e.appendChild(n),this.wordEls.push({el:n,baseX:o.x,baseY:o.y,speed:.3+r%3*.15})}),this._bindMouseMove(),this._observeActivation()}_bindMouseMove(){this.container.addEventListener("mousemove",e=>{const t=this.container.getBoundingClientRect();this.mouseX=(e.clientX-t.left)/t.width-.5,this.mouseY=(e.clientY-t.top)/t.height-.5},{passive:!0}),this.container.addEventListener("mouseleave",()=>{this.mouseX=0,this.mouseY=0})}_observeActivation(){new IntersectionObserver(t=>{t[0].isIntersecting?(this.isActive=!0,this._startParallax()):(this.isActive=!1,cancelAnimationFrame(this.raf))},{threshold:.2}).observe(this.container)}_startParallax(){const e=()=>{if(!this.isActive)return;window.matchMedia("(prefers-reduced-motion: reduce)").matches||this.wordEls.forEach(({el:i,baseX:r,baseY:n,speed:o})=>{const a=this.mouseX*30*o,l=this.mouseY*20*o;i.style.transform=`translate(calc(-50% + ${a}px), calc(-50% + ${l}px))`}),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}openPanel(e,t){var i,r;this.panel&&(this.panelTitle&&(this.panelTitle.textContent=e.memory.title),this.panelBody&&(this.panelBody.textContent=e.memory.body),this.panel.classList.add("open"),this.panel.removeAttribute("hidden"),(r=(i=this.panel).focus)==null||r.call(i))}closePanel(){var e;(e=this.panel)==null||e.classList.remove("open")}}function Yd(){const s=document.getElementById("section-mind");if(!s)return;s.innerHTML=`
    <!-- Title -->
    <div style="
      position:absolute;top:var(--space-xl);left:50%;
      transform:translateX(-50%);z-index:5;text-align:center;
      width: 90%;
    " aria-hidden="true">
      <p class="label" style="letter-spacing:0.4em;color:rgba(168,168,168,0.3);margin-bottom:8px;">
        INSIDE PETER'S MIND
      </p>
      <p style="font-size:12px;color:rgba(255,255,255,0.65);margin:0;letter-spacing:0.1em;text-transform:uppercase;">
        His thoughts are fractured. Tap the fragments to explore what remains of his memories.
      </p>
    </div>

    <p style="
      position:absolute;bottom:var(--space-xl);left:50%;
      transform:translateX(-50%);z-index:5;
      font-size:10px;letter-spacing:0.25em;text-transform:uppercase;
      color:rgba(168,168,168,0.2);white-space:nowrap;
    " aria-label="Click any word to explore Peter's memories">
      CLICK ANY WORD TO EXPLORE
    </p>

    <!-- Mind container -->
    <div class="mind-container" id="mind-container" role="region" aria-label="Peter's mind — interactive memory map">
    </div>

    <!-- Memory viewer (inside section, managed by PeterMind) -->
  `,s.classList.add("section--full-vh");const e=document.getElementById("mind-container");e&&new $d(e)}function Vd(){const s=document.getElementById("section-choice");if(!s)return;const e=[{text:"THERE IS ONLY ONE WAY.",class:""},{text:null,class:"choice-pause"},{text:"EVERYONE MUST FORGET",class:""},{text:"PETER PARKER.",class:"choice-line--emphasis"},{text:null,class:"choice-pause"},{text:"EVEN MJ.",class:"choice-line--emphasis",extra:"color:var(--spider-red)"}];s.innerHTML=`
    <div class="choice-content" id="choice-content">
      ${e.map((t,i)=>t.text?`<p
          class="choice-line ${t.class}"
          data-choice-line
          style="transition-delay:${i*.3}s;${t.extra||""}"
        >${t.text}</p>`:`<div class="${t.class}" aria-hidden="true"></div>`).join("")}
    </div>
  `,s.classList.add("section--full-vh"),lt.initSequentialReveal(s,"[data-choice-line]",.4)}function Wd(){const s=document.getElementById("section-sacrifice");if(!s)return;s.style.minHeight="auto",s.style.padding="var(--space-3xl) 0",s.style.background="#020202";const e=[{text:"PETER CHOOSES EVERYONE.",class:"sacrifice-quote-sub"},{text:"HE CHOOSES RESPONSIBILITY.",class:"sacrifice-quote-sub"},{text:"HE CHOOSES TO BE FORGOTTEN.",class:"sacrifice-quote-sub"},{text:null,class:"sacrifice-silence"},{text:"HE CHOOSES TO LOSE MJ.",class:"sacrifice-line--mj"},{text:"“SOME CHOICES DON'T FEEL LIKE HEROISM.”",class:"sacrifice-quote-final"},{text:"“THEY FEEL LIKE LOSING EVERYTHING.”",class:"sacrifice-quote-final-red"}];s.innerHTML=`
    <!-- Minimal pitch black background -->
    <div style="
      position:absolute;inset:0;
      background: #010101;
    " aria-hidden="true"></div>

    <div class="sacrifice-content" id="sacrifice-content" style="
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 var(--space-lg);
    ">
      ${e.map((r,n)=>{if(!r.text)return`<div class="${r.class}" aria-hidden="true" style="height: 20px;"></div>`;let o="";return r.class==="sacrifice-quote-sub"?o="color: #555; font-size: 16px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; opacity: 0;":r.class==="sacrifice-line--mj"?o="color: #FFF; font-size: clamp(24px, 3.5vw, 44px); letter-spacing: 0.1em; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; opacity: 0;":r.class==="sacrifice-quote-final"?o="color: #A0A0A0; font-family: var(--font-quote); font-style: italic; font-size: clamp(20px, 2.5vw, 30px); opacity: 0;":r.class==="sacrifice-quote-final-red"&&(o="color: #C62828; font-family: var(--font-quote); font-style: italic; font-size: clamp(20px, 2.5vw, 30px); margin-bottom: 30px; text-shadow: 0 0 15px rgba(198, 40, 40, 0.4); opacity: 0;"),`<p
          class="sacrifice-line ${r.class}"
          data-sacrifice-line
          style="${o} transition: opacity 0.8s ease, transform 0.8s ease; transform: translateY(15px);"
        >${r.text}</p>`}).join("")}

      <!-- Soft Desaturated Cinematic Memory Window with subtle red heart edge glow -->
      <div class="cinematic-memory-window" 
           id="mj-leave-window"
           data-sacrifice-line
           data-video-src="peter mj.mp4"
           data-poster="peter4.jpg"
           data-title="Leaving Her"
           data-caption="Peter Parker makes the ultimate sacrifice. He leaves MJ to live her life in peace, letting go of his last connection to love."
           data-chapter="SACRIFICE"
           style="
             width: 440px; 
             max-width: 95%; 
             transform: rotate(-1deg) translateY(15px);
             opacity: 0;
             transition: opacity 0.8s ease, transform 0.8s ease;
             border-color: rgba(198, 40, 40, 0.35);
             box-shadow: 0 20px 60px rgba(0,0,0,0.95), 0 0 35px rgba(198, 40, 40, 0.08);
           ">
      </div>
    </div>
  `;let t=!1;new IntersectionObserver(r=>{r[0].isIntersecting?(me.setVolume(.08),yl.setMode("NONE"),t||(t=!0,s.querySelectorAll("[data-sacrifice-line]").forEach((a,l)=>{setTimeout(()=>{a.style.opacity="1",a.style.transform=a.id==="mj-leave-window"?"rotate(-1deg) translateY(0)":"translateY(0)"},l*700)}))):me.setVolume(.5)},{threshold:.15}).observe(s)}function Ud(){const s=document.getElementById("section-mj-forgets");s&&(s.style.background="linear-gradient(135deg, #1c0a0e 0%, #3d141d 50%, #1c0a0e 100%)",s.style.padding="var(--space-section) 0",s.innerHTML=`
    <div class="mj-forgets-layout" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;max-width:1200px;margin:0 auto;padding:0 var(--space-lg);">
      <!-- Real image: peter1.webp -->
      <div class="mj-forgets-img-side" data-reveal-left style="position:relative;width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,46,54,0.25);border:2px solid rgba(255,255,255,0.2);">
        <img src="peter1.webp" alt="Peter Parker — NWH coffee shop" class="mj-forgets-img" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.15) contrast(1.05);" />
        <div class="mj-forgets-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(28,10,14,0.6) 0%, transparent 60%);"></div>
      </div>

      <!-- Text side -->
      <div class="mj-forgets-text-side" data-reveal-right>
        <p class="label label-red" style="margin-bottom:var(--space-xl);color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;">THE HARDEST MOMENT</p>

        <p class="mj-forgets-line" data-mj-forgets-line style="font-family:var(--font-display);font-size:clamp(36px,5vw,70px);color:#FFFFFF;letter-spacing:0.04em;line-height:1;">SHE FORGOT HIM.</p>

        <div style="height:var(--space-md)" aria-hidden="true"></div>

        <p class="mj-forgets-line mj-forgets-line--climax" data-mj-forgets-line
           style="font-family:var(--font-display);font-size:clamp(36px,5vw,70px);color:#FF2E36;letter-spacing:0.04em;line-height:1;text-shadow:0 0 30px rgba(255,46,54,0.8);">
          HE REMEMBERED EVERYTHING.
        </p>

        <div style="height:var(--space-lg)" aria-hidden="true"></div>

        <p class="mj-forgets-line--pause" data-mj-forgets-line style="color:#FFFFFF;font-size:clamp(17px,1.6vw,22px);line-height:1.6;background:rgba(255,255,255,0.06);padding:20px;border-left:3px solid #FF2E36;border-radius:0 8px 8px 0;backdrop-filter:blur(8px);">
          He walked in. She smiled the way she always did — warm,
          curious, kind. But she didn't know him. She didn't remember
          him. And Peter Parker — who could lift buildings, who had
          faced gods and monsters — smiled back.
          And chose not to say a word.
        </p>

        <div style="height:var(--space-lg)" aria-hidden="true"></div>

        <p class="mj-forgets-line" data-mj-forgets-line style="font-family:var(--font-display);font-size:clamp(28px,4vw,50px);color:#FFD700;letter-spacing:0.1em;text-shadow:0 0 20px rgba(255,215,0,0.5);">
          THAT WAS HIS SACRIFICE.
        </p>
      </div>
    </div>
  `,lt.initSequentialReveal(s,"[data-mj-forgets-line]",.4))}function Gd(){const s=document.getElementById("section-disintegration");if(!s)return;const e=[{src:Vt.disintegration01,caption:"Queens"},{src:Vt.disintegration02,caption:"Aunt May"},{src:Vt.disintegration03,caption:"Ned"},{src:Vt.disintegration04,caption:"MJ"},{src:Vt.disintegration05,caption:"Tony"},{src:Vt.disintegration06,caption:"Peter Parker"}],t=["linear-gradient(135deg,#1a0408 0%,#2d0910 100%)","linear-gradient(135deg,#1a1a1a 0%,#0D0D0D 100%)","linear-gradient(135deg,#07152E 0%,#050505 100%)","linear-gradient(135deg,#2d0910 0%,#1a0508 100%)","linear-gradient(135deg,#1a0406 0%,#0D0D0D 100%)","linear-gradient(135deg,#0D0D0D 0%,#050505 100%)"];s.innerHTML=`
    <div style="text-align:center;margin-bottom:var(--space-xl);" data-reveal>
      <p class="label label-red" style="margin-bottom:var(--space-md);">THE MEMORIES FADING</p>
      <h2 class="chapter-title">EVERYTHING HE KNEW</h2>
    </div>

    <div class="disintegration-grid" id="disintegration-grid" role="list" aria-label="Fading memories">
      ${e.map((i,r)=>`
        <div
          class="disintegration-photo"
          role="listitem"
          aria-label="${i.caption} — fading memory"
          style="background:${t[r]};transition-delay:${r*.6}s;"
        >
          <!-- DUMMY IMAGE: Replace src with ${i.src} -->
          <img
            src="${i.src}"
            alt="${i.caption}"
            loading="lazy"
            style="width:100%;height:100%;object-fit:cover;opacity:0.6;"
            onerror="this.style.display='none'"
          />
          <div style="
            position:absolute;inset:0;display:flex;align-items:center;
            justify-content:center;flex-direction:column;gap:8px;
          ">
            <p style="font-size:var(--fs-small);letter-spacing:0.2em;
              color:rgba(245,245,245,0.15);text-transform:uppercase;">${i.caption}</p>
          </div>
        </div>
      `).join("")}
    </div>

    <p class="body-lg" style="
      text-align:center;margin-top:var(--space-xl);
      font-family:var(--font-quote);font-style:italic;
      color:var(--muted-white);max-width:500px;margin-left:auto;margin-right:auto;
    " data-reveal>
      One by one. The memories. Fading.
    </p>
  `,s.style.padding="var(--space-section) var(--space-md)",s.style.minHeight="100vh",s.style.flexDirection="column",lt.initDisintegration(s)}function jd(){const s=document.getElementById("section-alone");if(!s)return;const e=["MJ","AUNT MAY","NED","TONY STARK","HAPPY HOGAN"];s.innerHTML=`
    <div class="alone-content container" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-xl); align-items: center; width: 100%; max-width: var(--container-width);">
      <!-- Left side: Spidey Iron image in its original 2:1 ratio -->
      <div class="alone-figure" data-reveal-left style="display: flex; justify-content: center; align-items: center; width: 100%; height: auto;">
        <div style="width: 100%; max-width: 550px; aspect-ratio: 2/1; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 46, 54, 0.25); box-shadow: 0 20px 50px rgba(0,0,0,0.95), 0 0 30px rgba(255,46,54,0.15);">
          <img src="spidey iron.jpg" alt="Peter and Tony Stark" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
      </div>

      <!-- Right side: Text details -->
      <div class="alone-negative-space" style="position: relative; z-index: 10; height: auto;">
        <div class="alone-text" data-reveal-right style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
          <h2 class="chapter-title" style="color:var(--white); font-size: clamp(40px, 6vw, 80px); line-height: 1.0; text-transform: uppercase;">
            NO ONE<br/>REMEMBERS.
          </h2>
          <p class="body-lg" style="margin-top:var(--space-lg); max-width:480px; color:#A8A8A8; font-size: 16px; line-height: 1.75;">
            No Tony. No May. No MJ. No Ned.<br/><br/>
            Peter Parker. Completely alone. In a new apartment. With a new suit. And a responsibility that never ends.
          </p>

          <!-- Clean left-aligned lost memory list -->
          <div class="alone-names-lost" aria-label="People who no longer remember Peter" style="display: flex; flex-direction: column; gap: 14px; margin-top: 35px; align-items: flex-start;">
            ${e.map(t=>`
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="width: 6px; height: 6px; background-color: var(--spider-red); border-radius: 50%; display: inline-block; opacity: 0.7; filter: drop-shadow(0 0 4px var(--spider-red));"></span>
                <span class="alone-name" style="font-size: 12px; letter-spacing: 0.25em; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 700; text-decoration: line-through; text-decoration-color: var(--spider-red); display: inline-block;">
                  ${t}
                </span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `,s.classList.add("section--full-vh"),s.style.minHeight="100vh",s.style.display="flex",s.style.alignItems="center",s.style.background="#050505",s.style.padding="var(--space-section) 0"}function Xd(){const s=document.getElementById("section-new-spiderman");s&&(s.innerHTML=`
    <div class="new-sm-sticky" style="position: relative; width: 100%; display: flex; align-items: center; justify-content: center; padding: var(--space-2xl) 0; height: auto;">
      <div class="new-sm-city-bg" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden; z-index: 1;">
        <!-- NYC night sky -->
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, #050510 0%, #07152E 50%, #050505 100%);"></div>
        <!-- Stars -->
        ${Array.from({length:30},()=>`
          <div style="
            position: absolute;
            left: ${Math.random()*100}%; top: ${Math.random()*60}%;
            width: ${1+Math.random()*2}px; height: ${1+Math.random()*2}px;
            border-radius: 50%;
            background: rgba(245, 245, 245, ${.1+Math.random()*.4});
            animation: loader-pulse ${2+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite;
          " aria-hidden="true"></div>
        `).join("")}
        <!-- City lights strip at bottom -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 120px; background: linear-gradient(180deg, transparent 0%, rgba(11,61,145,0.08) 60%, rgba(11,61,145,0.15) 100%);" aria-hidden="true"></div>
      </div>

      <div class="new-sm-figure" data-reveal style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 600px; padding: 0 var(--space-lg); width: 100%;">
        <!-- Centered spidey sad.webp in original 16:9 aspect ratio -->
        <div style="width: 100%; max-width: 500px; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; border: 1px solid rgba(11, 61, 145, 0.35); box-shadow: 0 20px 50px rgba(0,0,0,0.95), 0 0 30px rgba(11,61,145,0.18);">
          <img src="spidey sad.webp" alt="Lonely Spider-Man" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>

        <h2 class="chapter-title" style="font-size: clamp(36px, 5vw, 72px); letter-spacing: 0.05em; text-align: center; text-transform: uppercase; margin-top: 15px; text-shadow: 0 0 30px rgba(11,61,145,0.45);">
          A NEW<br/>BEGINNING.
        </h2>

        <p class="body-lg" style="margin-top: var(--space-md); text-align: center; max-width: 450px; font-family: var(--font-quote); font-style: italic; color: #E0E0E0; line-height: 1.75;">
          No one to call him. No one waiting at home. Just a city that needed a hero. And a boy who could never say no.
        </p>
      </div>
    </div>
  `,s.style.minHeight="100vh",s.style.display="flex",s.style.alignItems="center",s.style.background="#050505",s.style.padding="var(--space-section) 0")}function Jd(){const s=document.getElementById("section-final");if(!s)return;s.innerHTML=`
    <div class="final-content" id="final-content">
      <p class="final-line" data-final-line>HE LOST HIS LOVE.</p>
      <p class="final-line" data-final-line style="transition-delay:0.8s">HE LOST HIS FAMILY.</p>
      <p class="final-line" data-final-line style="transition-delay:1.6s">HE LOST HIS OLD LIFE.</p>

      <div style="height:var(--space-xl)" aria-hidden="true"></div>

      <p class="final-line final-line--break" data-final-line style="transition-delay:2.6s">
        BUT HE NEVER LOST<br/>HIS RESPONSIBILITY.
      </p>

      <div style="height:var(--space-xl)" aria-hidden="true"></div>

      <h2 class="final-name" data-final-name style="color:var(--muted-white);">
        PETER PARKER
      </h2>
      <h2 class="final-name final-name--red" data-final-name style="transition-delay:0.6s">
        SPIDER&#8209;MAN
      </h2>
    </div>
  `,s.classList.add("section--full-vh");const e=new IntersectionObserver(t=>{t[0].isIntersecting&&(s.querySelectorAll("[data-final-line], [data-final-name]").forEach(i=>{i.classList.add("revealed")}),e.disconnect())},{threshold:.3});e.observe(s)}function Kd(){const s=document.getElementById("section-valentine");s&&(s.innerHTML=`
    <!-- Ambient pulse -->
    <div class="valentine-bg-pulse" aria-hidden="true"></div>

    <!-- Glowing Heart SVG Symbol -->
    <div class="valentine-heart" id="valentine-heart" aria-hidden="true" style="cursor:pointer;filter:drop-shadow(0 0 25px var(--spider-red));">
      <svg viewBox="0 0 100 100" width="80" height="80">
        <path d="M 50 30 C 35 10, 10 25, 10 50 C 10 70, 50 95, 50 95 C 50 95, 90 70, 90 50 C 90 25, 65 10, 50 30 Z" fill="var(--spider-red)" />
      </svg>
    </div>

    <!-- Title -->
    <h2 class="valentine-title" id="valentine-title" style="color:var(--white);text-shadow:0 0 30px rgba(229,9,20,0.55);">
      FIND YOUR<br/><span style="color:var(--spider-red);">VALENTINE</span>
    </h2>

    <!-- Story lines -->
    <div class="valentine-story" id="valentine-story">
      <p id="v-line-1" style="color:var(--white);font-size:clamp(18px,2vw,24px);">PETER PARKER FOUND LOVE.</p>
      <p id="v-line-2" style="color:var(--muted-white);font-size:clamp(18px,2vw,24px);">HE LOST IT.</p>
      <p id="v-line-3" style="color:var(--spider-red);font-size:clamp(18px,2vw,24px);">BUT HE NEVER STOPPED LOVING.</p>
    </div>

    <!-- CTA label -->
    <p class="valentine-cta-label" id="valentine-cta-label" style="color:var(--white);letter-spacing:0.35em;font-weight:700;">YOUR STORY STARTS HERE.</p>

    <!-- CTA button -->
    <div class="valentine-btn-wrap" id="valentine-btn-wrap">
      <a
        href="${wl}"
        id="valentine-btn"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-cinematic btn-valentine"
        aria-label="Find Your Valentine — opens in new tab"
        style="
          background: #050505;
          border: 1px solid var(--dark-red);
          color: var(--white);
          box-shadow: 0 0 20px rgba(229, 9, 20, 0.35);
          font-weight: 700;
        "
      >
        FIND YOUR VALENTINE
      </a>
    </div>

    <!-- Fine print -->
    <p style="
      position:absolute;bottom:var(--space-md);
      font-size:11px;letter-spacing:0.25em;
      color:rgba(255,255,255,0.4);text-align:center;
      text-transform:uppercase;
    " aria-hidden="true">
      PETER & MJ — FOREVER IN OUR HEARTS
    </p>
  `,s.classList.add("section--full-vh"),Zd(s),Qd())}function Zd(s){const e=new IntersectionObserver(t=>{if(t[0].isIntersecting){wt.playHeartbeat(),yl.setMode("VALENTINE");const i=document.getElementById("valentine-heart"),r=document.getElementById("valentine-title"),n=document.getElementById("v-line-1"),o=document.getElementById("v-line-2"),a=document.getElementById("v-line-3"),l=document.getElementById("valentine-cta-label"),c=document.getElementById("valentine-btn-wrap"),d=(h,p)=>{h&&setTimeout(()=>h.classList.add("revealed"),p)};d(i,200),d(r,600),d(n,1200),d(o,1800),d(a,2400),d(l,3e3),d(c,3600),e.disconnect()}},{threshold:.2});e.observe(s)}function Qd(){const s=document.getElementById("valentine-btn"),e=document.getElementById("valentine-heart");e==null||e.addEventListener("click",()=>{wt.playHeartbeat(),e.style.transform="scale(1.35)",setTimeout(()=>{e.style.transform="scale(1)"},300)}),s==null||s.addEventListener("mouseenter",()=>{wt.playHeartbeat()}),s==null||s.addEventListener("click",t=>{t.preventDefault(),wt.playWebShoot(),setTimeout(()=>{window.open(s.href,"_blank","noopener,noreferrer")},120)})}function eu(){const s=document.getElementById("section-brand-new-day");if(!s)return;if(s.style.minHeight="100vh",s.style.background="#050505",s.style.position="relative",s.style.overflow="hidden",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="var(--space-2xl) 0",s.innerHTML=`
    <!-- Subtle Red Glow Atmospheric Backplate -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 1;
    " aria-hidden="true"></div>

    <div class="bnd-container" style="
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    ">
      <!-- Title Section -->
      <div class="bnd-header" style="text-align: center; margin-bottom: 20px;">
        <span class="bnd-chapter" style="
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.35em;
          color: rgba(255, 255, 255, 0.35);
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(15px);
          transition: transform 0.8s ease, opacity 0.8s ease;
        ">Chapter 10</span>
        
        <h2 class="bnd-title-main" style="
          font-family: var(--font-display);
          font-size: clamp(38px, 6vw, 72px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.8s ease 0.2s, opacity 0.8s ease 0.2s;
        ">
          SPIDER-MAN<br>
          <span style="color: var(--spider-red); text-shadow: 0 0 25px rgba(229, 9, 20, 0.45);">BRAND NEW DAY</span>
        </h2>
      </div>

      <!-- Main Layout: Grid on desktop, stack on mobile -->
      <div class="bnd-layout" style="display: flex; gap: var(--space-2xl); align-items: center; justify-content: center; width: 100%;">
        
        <!-- Left: Cinematic Video Player Frame -->
        <div class="bnd-video-wrapper cinematic-video-frame" style="
          flex: 1.2;
          width: 100%;
          max-width: 680px;
          opacity: 0;
          transform: scale(0.97);
          filter: blur(10px);
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.4s, opacity 0.8s ease 0.4s, filter 0.8s ease 0.4s;
        ">
          <!-- Glow background layer -->
          <div class="video-glow-layer" style="
            position: absolute;
            inset: -5%;
            z-index: 1;
            background: radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%);
            pointer-events: none;
            transform: translateZ(-20px);
            transition: transform 0.4s ease;
          "></div>
          
          <!-- Glass reflection layer -->
          <div class="video-glass-layer" style="
            position: absolute;
            inset: 0;
            z-index: 5;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.02) 100%);
            pointer-events: none;
            transform: translateZ(15px);
            transition: transform 0.4s ease;
            border-radius: 8px;
          "></div>

          <video 
            id="bnd-video"
            src="Brand new day.mp4" 
            autoplay 
            loop 
            muted 
            playsinline 
            style="width: 100%; display: block; object-fit: contain; position: relative; z-index: 2;"
          ></video>
          <!-- Audio Toggle overlay button -->
          <button id="bnd-audio-toggle" style="
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(5, 5, 5, 0.85);
            border: 1px solid var(--dark-red);
            color: var(--white);
            padding: 8px 16px;
            font-family: var(--font-display);
            font-size: 11px;
            letter-spacing: 0.15em;
            border-radius: 4px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            pointer-events: auto;
          ">
            <span id="bnd-audio-icon">🔇</span>
            <span id="bnd-audio-text">SOUND OFF</span>
          </button>
        </div>

        <!-- Right: Story Notes -->
        <div class="bnd-notes-wrapper" style="
          flex: 0.8;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          text-align: left;
          max-width: 420px;
        ">
          <div class="bnd-note bnd-note-1" style="
            opacity: 0;
            transform: translateX(25px);
            transition: transform 0.8s ease 0.6s, opacity 0.8s ease 0.6s;
          ">
            <h4 style="
              font-family: var(--font-display);
              font-size: 13px;
              letter-spacing: 0.2em;
              color: var(--spider-red);
              margin: 0 0 10px 0;
              text-transform: uppercase;
            ">The Next Chapter</h4>
            <p style="
              font-size: 15px;
              line-height: 1.7;
              color: var(--muted-white);
              margin: 0;
              font-weight: 500;
            ">
              Peter Parker's story didn't end when the world forgot him. It became a new beginning.
            </p>
          </div>

          <div class="bnd-note bnd-note-2" style="
            opacity: 0;
            transform: translateX(25px);
            transition: transform 0.8s ease 1s, opacity 0.8s ease 1s;
            border-left: 2px solid var(--dark-red);
            padding-left: 16px;
          ">
            <p style="
              font-family: var(--font-display);
              font-size: 14px;
              letter-spacing: 0.1em;
              color: var(--white);
              margin: 0 0 6px 0;
              text-transform: uppercase;
              font-weight: 700;
            ">A New York. A new suit. A new day.</p>
            <p style="
              font-size: 13px;
              line-height: 1.6;
              color: var(--muted-gray);
              margin: 0;
            ">
              But the responsibility remains.
            </p>
          </div>
        </div>

      </div>
    </div>
  `,!document.getElementById("bnd-layout-styles")){const l=document.createElement("style");l.id="bnd-layout-styles",l.textContent=`
      @media (max-width: 768px) {
        .bnd-layout {
          flex-direction: column !important;
          gap: var(--space-lg) !important;
        }
        .bnd-notes-wrapper {
          text-align: center !important;
          align-items: center !important;
          max-width: 100% !important;
        }
        .bnd-note-2 {
          border-left: none !important;
          border-top: 1px solid var(--dark-red) !important;
          padding-left: 0 !important;
          padding-top: 12px !important;
        }
      }
    `,document.head.appendChild(l)}const e=s.querySelector("#bnd-video"),t=s.querySelector("#bnd-audio-toggle"),i=s.querySelector("#bnd-audio-icon"),r=s.querySelector("#bnd-audio-text");let n=!1;t&&e&&t.addEventListener("click",()=>{n=e.muted,n?(e.muted=!1,i&&(i.textContent="🔊"),r&&(r.textContent="SOUND ON"),t.style.borderColor="var(--spider-red)",t.style.boxShadow="0 0 15px rgba(229, 9, 20, 0.65)",me.duckVolume()):(e.muted=!0,i&&(i.textContent="🔇"),r&&(r.textContent="SOUND OFF"),t.style.borderColor="var(--dark-red)",t.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.5)",me.restoreVolume())});const o=new IntersectionObserver(l=>{l.forEach(c=>{if(c.isIntersecting){s.querySelector(".bnd-chapter").style.opacity="1",s.querySelector(".bnd-chapter").style.transform="translateY(0)",s.querySelector(".bnd-title-main").style.opacity="1",s.querySelector(".bnd-title-main").style.transform="translateY(0)";const d=s.querySelector(".bnd-video-wrapper");d.style.opacity="1",d.style.transform="scale(1)",d.style.filter="blur(0)",s.querySelector(".bnd-note-1").style.opacity="1",s.querySelector(".bnd-note-1").style.transform="translateX(0)",s.querySelector(".bnd-note-2").style.opacity="1",s.querySelector(".bnd-note-2").style.transform="translateX(0)",o.unobserve(s)}})},{threshold:.15});o.observe(s),new IntersectionObserver(l=>{l[0].isIntersecting?e&&(e.play().catch(()=>{}),n&&(e.muted=!1,i&&(i.textContent="🔊"),r&&(r.textContent="SOUND ON"),t&&(t.style.borderColor="var(--spider-red)",t.style.boxShadow="0 0 15px rgba(229, 9, 20, 0.65)"),me.duckVolume())):(e&&(e.muted=!0,i&&(i.textContent="🔇"),r&&(r.textContent="SOUND OFF"),t&&(t.style.borderColor="var(--dark-red)",t.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.5)")),me.restoreVolume())},{threshold:.1}).observe(s)}function tu(){const s=document.getElementById("section-fan-challenge");if(!s)return;s.style.minHeight="100vh",s.style.background="#050505",s.style.position="relative",s.style.overflow="hidden",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="var(--space-2xl) 0";const e={easy:[{id:1,category:"Characters",question:"Who raised Peter Parker after his parents disappeared?",options:["Aunt May & Uncle Ben","Aunt Harriet & Uncle George","Happy Hogan & Pepper Potts","Professor Charles Xavier"],answer:0,explanation:"Uncle Ben and Aunt May raised Peter in Forest Hills, Queens, as their own son."},{id:2,category:"Locations",question:"Which New York City borough does Peter Parker grow up in?",options:["Brooklyn","Manhattan","Queens","The Bronx"],answer:2,explanation:"Peter is famously the friendly neighborhood hero from Queens."},{id:3,category:"Spider-Man History",question:"What specific event grants Peter Parker his arachnid powers?",options:["A lightning strike","A radioactive spider bite","A genetic experiment by his father","A lab chemical explosion"],answer:1,explanation:"A radioactive spider bite during a science demonstration alters Peter's DNA."},{id:4,category:"Characters",question:"Which newspaper does Peter sell photographs of Spider-Man to?",options:["The Daily Bugle","The Daily Planet","The New York Times","Gotham Gazette"],answer:0,explanation:"J. Jonah Jameson hires Peter to snap photos for the Daily Bugle."},{id:5,category:"Movies",question:"Who is Peter Parker's best friend in the MCU Spider-Man trilogy?",options:["Harry Osborn","Ned Leeds","Flash Thompson","Gwen Stacy"],answer:1,explanation:"Ned Leeds is Peter's high-school best friend and his 'guy in the chair'."},{id:6,category:"Movies",question:"What is MJ's full name in the MCU Spider-Man movies?",options:["Mary Jane Watson","Michelle Jones-Watson","Madeline Joyce","Martha Jameson"],answer:1,explanation:"She is Michelle Jones-Watson, commonly called MJ by Peter and Ned."},{id:7,category:"Movies",question:"Who directed the original Spider-Man film trilogy (2002-2007)?",options:["Marc Webb","Jon Watts","Sam Raimi","Christopher Nolan"],answer:2,explanation:"Sam Raimi directed the legendary trilogy starring Tobey Maguire."},{id:8,category:"Suits",question:"What color is the primary base of Spider-Man's classic suit?",options:["Black & Yellow","Red & Blue","Green & Silver","Purple & Orange"],answer:1,explanation:"The iconic classic suit features red and blue colors with web patterns."},{id:9,category:"Characters",question:"Who is Spider-Man's love interest who falls from a bridge in the comics?",options:["Mary Jane Watson","Gwen Stacy","Felicia Hardy","Betty Brant"],answer:1,explanation:"Gwen Stacy tragically falls to her death in The Amazing Spider-Man #121."},{id:10,category:"Iconic Moments",question:"Whose death directly inspires Peter's life of heroics?",options:["Aunt May","Uncle Ben","Tony Stark","Gwen Stacy"],answer:1,explanation:"Uncle Ben's tragic murder makes Peter realize that with great power comes great responsibility."}],medium:[{id:11,category:"Villains",question:"Which villain is the father of Peter's friend Harry Osborn?",options:["Doctor Octopus","Green Goblin","The Sandman","Mysterio"],answer:1,explanation:"Norman Osborn, Harry's father, is the villainous Green Goblin."},{id:12,category:"Suits",question:"What is the high-tech suit built for Peter by Tony Stark in Avengers: Infinity War?",options:["The Stealth Suit","The Stark Suit","The Iron Spider","The Velocity Suit"],answer:2,explanation:"Tony Stark designs the nano-tech Iron Spider suit to help Peter fight in space."},{id:13,category:"Iconic Moments",question:"Where does Peter ring a giant bell to tear off the alien symbiote?",options:["Empire State University lab","A church bell tower","The Daily Bugle roof","Grand Central Station"],answer:1,explanation:"The heavy sonic vibrations of the church bell help Peter strip off the symbiote suit."},{id:14,category:"Movies",question:"Which actor plays Peter Parker in The Amazing Spider-Man duology?",options:["Tobey Maguire","Tom Holland","Andrew Garfield","Jake Gyllenhaal"],answer:2,explanation:"Andrew Garfield plays Peter Parker in the 2012 and 2014 films."},{id:15,category:"Villains",question:"What is the name of the scientist who becomes Doctor Octopus?",options:["Otto Octavius","Curt Connors","Max Dillon","Quentin Beck"],answer:0,explanation:"Dr. Otto Octavius becomes the mechanical-armed villain Doc Ock."},{id:16,category:"Movies",question:"Which song plays during Miles Morales' leap of faith in Into the Spider-Verse?",options:["Elevate","Sunflower","Whats Up Danger","Start a Riot"],answer:2,explanation:"'What's Up Danger' by Blackway & Black Caviar scores this iconic scene."},{id:17,category:"Villains",question:"Who is the deceptive villain in Spider-Man: Far From Home?",options:["Vulture","Electro","Mysterio","Green Goblin"],answer:2,explanation:"Quentin Beck uses hologram technology to pose as Mysterio, a hero from another world."},{id:18,category:"Villains",question:"Max Dillon gains electrical powers after falling into a tank of what?",options:["Radioactive waste","Electric eels","Charged plasma","Acidic compound"],answer:1,explanation:"An accident involving Oscorp electric eels turns Max Dillon into Electro."},{id:19,category:"Villains",question:"Who is the weapon creator Vulture in MCU Spider-Man: Homecoming?",options:["Mac Gargan","Herman Schultz","Adrian Toomes","Phineas Mason"],answer:2,explanation:"Adrian Toomes leads a salvage crew and turns alien scrap metal into weaponry."},{id:20,category:"Iconic Moments",question:"Finish the quote: 'With great power comes great...'",options:["Destiny","Responsibility","Sacrifice","Consequences"],answer:1,explanation:"'With great power comes great responsibility' is the cornerstone of Spider-Man lore."}],hard:[{id:21,category:"Spider-Man History",question:"What universe designation number belongs to the main Marvel Comics Spider-Man?",options:["Earth-1610","Earth-616","Earth-199999","Earth-833"],answer:1,explanation:"Earth-616 is the standard home universe for the classic Marvel comics continuity."},{id:22,category:"Characters",question:"Who is the female spider-hero bitten by the same spider as Peter Parker?",options:["Gwen Stacy","Jessica Drew","Cindy Moon","Anya Corazon"],answer:2,explanation:"Cindy Moon (Silk) was bitten by the same radioactive spider moments after Peter."},{id:23,category:"Spider-Man History",question:"Who is the very first opponent Peter fights in his first comic appearance?",options:["Burglar","Crusher Hogan","The Chameleon","Green Goblin"],answer:1,explanation:"Peter tests his new strength in a wrestling match against Crusher Hogan in Amazing Fantasy #15."},{id:24,category:"Movies",question:"What is the name of the Midtown Science decathlon captain in Homecoming?",options:["Liz Allan","Sally Avril","Cindy Moon","Gwen Stacy"],answer:0,explanation:"Liz Allan (Adrian Toomes' daughter) is the captain of the academic decathlon team."},{id:25,category:"Locations",question:"Where is the lab where Peter gets bitten in the 2002 Sam Raimi movie?",options:["Columbia University","Empire State University","Stark Industries","Oscorp Headquarters"],answer:0,explanation:"Peter is bitten in the genetics laboratory during a field trip to Columbia University."},{id:26,category:"Movies",question:"In No Way Home, what is the official name of Doctor Strange's memory spell?",options:["Runic Dispersal","Spell of the Dark Dimension","Runes of Kof-Kol","Vapors of Valtorr"],answer:2,explanation:"Doctor Strange casts the Runes of Kof-Kol spell to wipe memory of Peter Parker."},{id:27,category:"Spider-Man History",question:"Who co-created Spider-Man alongside writer Stan Lee in 1962?",options:["Jack Kirby","Steve Ditko","John Romita Sr.","Bob Kane"],answer:1,explanation:"Steve Ditko co-created and designed the look, suit, and gadgets of Spider-Man."},{id:28,category:"Characters",question:"What is the name of Peter Parker's clone who became the Scarlet Spider?",options:["Ben Reilly","Kaine Parker","Miles Warren","Peter Clone"],answer:0,explanation:"Ben Reilly, created by the Jackal, fights crime under the moniker Scarlet Spider."},{id:29,category:"Characters",question:"What is the name of the multi-dimensional spider-hero force led by Miguel O'Hara?",options:["Web Warriors","The Spider-Society","Spider-Alliance","Tangled Web"],answer:1,explanation:"The Spider-Society operates out of Nueva York in Earth-928 to fix universe anomalies."},{id:30,category:"Movies",question:"In MCU Homecoming, what Lego set do Ned and Peter plan to build?",options:["Lego Death Star","Lego Millennium Falcon","Lego Stark Tower","Lego Avengers Quinjet"],answer:0,explanation:"Ned Leeds drops and shatters their Lego Death Star when he discovers Peter is Spider-Man."}]};let t=[],i=0,r=0,n=null,o=null;function a(C){const S=[...C];for(let O=S.length-1;O>0;O--){const R=Math.floor(Math.random()*(O+1));[S[O],S[R]]=[S[R],S[O]]}return S}function l(){const C=a(e.easy),S=a(e.medium),O=a(e.hard),R=[C[0],S[0],S[1],O[0],O[1]];t=a(R),i=0,r=0}s.innerHTML=`
    <!-- Dynamic Canvas Web Net Particle Background -->
    <canvas id="fc-bg-canvas" style="
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    "></canvas>

    <!-- Dark Atmospheric Ambient Lights -->
    <div style="
      position: absolute;
      top: 30%;
      left: 15%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 1;
    "></div>
    <div style="
      position: absolute;
      bottom: 20%;
      right: 15%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.06) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    "></div>

    <div class="fc-container" style="
      width: 90%;
      max-width: 850px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    ">
      <!-- 1. LANDING/START STATE -->
      <div id="fc-start-panel" style="display: flex; flex-direction: column; align-items: center; gap: var(--space-md); width: 100%;">
        <span style="
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.35em;
          color: var(--spider-red);
          text-transform: uppercase;
        ">The Ultimate Fan Test</span>

        <h2 style="
          font-family: var(--font-display);
          font-size: clamp(34px, 5.5vw, 68px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.1;
        ">
          HOW BIG A<br>
          <span style="color: var(--spider-red); text-shadow: 0 0 25px rgba(229, 9, 20, 0.35);">SPIDER-MAN FAN</span><br>
          ARE YOU?
        </h2>

        <p style="
          font-family: var(--font-quote);
          font-style: italic;
          font-size: clamp(15px, 1.8vw, 20px);
          color: var(--muted-white);
          max-width: 520px;
          line-height: 1.6;
          margin-top: 5px;
        ">
          "Five questions. One result. Let's see how well you know the web."
        </p>

        <button id="fc-start-btn" class="btn-cinematic" style="
          margin-top: var(--space-lg);
          background: var(--dark-red);
          border-color: var(--spider-red);
          padding: 16px 48px;
          font-weight: 700;
        ">START THE CHALLENGE</button>
      </div>

      <!-- 2. GAME WORKSPACE -->
      <div id="fc-game-panel" style="display: none; flex-direction: column; width: 100%; text-align: left; gap: var(--space-md);">
        <!-- Top Status Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xs);">
          <span id="fc-question-counter" style="
            font-family: var(--font-display);
            font-size: 13px;
            letter-spacing: 0.2em;
            color: var(--muted-gray);
            text-transform: uppercase;
          ">QUESTION 01 / 05</span>
          
          <span id="fc-timer" style="
            font-family: var(--font-display);
            font-size: 12px;
            letter-spacing: 0.1em;
            color: var(--spider-red);
          ">TIME: 00:00</span>
        </div>

        <!-- Progress Track Web Nodes -->
        <div style="display:flex; align-items:center; width:100%; gap:4px; margin-bottom: 5px;">
          <div id="fc-progress-bar-fill" style="
            height: 2px;
            width: 0%;
            background: var(--spider-red);
            box-shadow: 0 0 8px var(--spider-red);
            transition: width 0.4s ease;
          "></div>
          <div style="flex: 1; height: 1px; background: rgba(255, 255, 255, 0.08);"></div>
        </div>

        <div id="fc-progress-nodes" style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 25px;">
          <!-- Active nodes inserted dynamically: 🔴, ○ -->
        </div>

        <!-- Interactive Question Card (with dynamic perspective / 3D transform) -->
        <div class="fc-card" style="
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 9, 20, 0.2);
          border-radius: 8px;
          padding: clamp(20px, var(--space-xl), var(--space-2xl));
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95);
          width: 100%;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        ">
          <div id="fc-question-category" style="
            font-family: var(--font-display);
            font-size: 11px;
            letter-spacing: 0.3em;
            color: var(--spider-red);
            text-transform: uppercase;
          ">CATEGORY: ---</div>

          <h3 id="fc-question-text" style="
            font-family: var(--font-display);
            font-size: clamp(20px, 3.2vw, 30px);
            color: var(--white);
            line-height: 1.35;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          ">QUESTION TEXT</h3>

          <!-- Selection Stack -->
          <div id="fc-options-stack" style="
            display: flex;
            flex-direction: column;
            gap: 12px;
          ">
            <!-- Selectable buttons inserted dynamically -->
          </div>

          <!-- Bottom Explanation / Next wrapper -->
          <div id="fc-feedback-area" style="
            display: none;
            flex-direction: column;
            gap: 16px;
            border-top: 1px dashed rgba(255, 255, 255, 0.1);
            padding-top: var(--space-md);
            margin-top: var(--space-xs);
          ">
            <p id="fc-feedback-status" style="
              font-family: var(--font-display);
              font-size: 14px;
              letter-spacing: 0.15em;
              margin: 0;
              text-transform: uppercase;
              font-weight: 700;
            ">CORRECT</p>
            
            <p id="fc-explanation-text" style="
              font-size: 14px;
              line-height: 1.6;
              color: var(--muted-white);
              margin: 0;
            ">Explanation detail</p>

            <button id="fc-next-btn" class="btn-cinematic" style="
              align-self: flex-end;
              padding: 10px 24px;
              font-size: 11px;
              background: var(--dark-red);
              border-color: var(--spider-red);
            ">NEXT QUESTION →</button>
          </div>
        </div>
      </div>

      <!-- 3. RESULT VIEW -->
      <div id="fc-result-panel" style="display: none; flex-direction: column; align-items: center; width: 100%; gap: var(--space-md);">
        <!-- Giant Glowing Vector Spider Emblem -->
        <svg viewBox="0 0 100 100" style="
          width: 90px;
          height: 90px;
          fill: var(--spider-red);
          filter: drop-shadow(0 0 15px rgba(229, 9, 20, 0.7));
          opacity: 0;
          transform: scale(0.7);
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease;
        " id="fc-result-spider">
          <path d="M 50 15 C 47 25, 45 35, 45 42 C 45 48, 47 50, 50 50 C 53 50, 55 48, 55 42 C 55 35, 53 25, 50 15 Z M 50 50 C 42 55, 38 65, 38 72 C 38 82, 45 85, 50 85 C 55 85, 62 82, 62 72 C 62 65, 58 55, 50 50 Z M 45 42 C 30 35, 20 20, 15 10 C 18 22, 30 35, 43 40 M 55 42 C 70 35, 80 20, 85 10 C 82 22, 70 35, 57 40 M 44 48 C 25 50, 15 52, 5 55 C 15 58, 30 55, 43 52 M 56 48 C 75 50, 85 52, 95 55 C 85 58, 70 55, 57 52 M 45 55 C 28 65, 18 78, 8 90 C 18 82, 32 72, 45 62 M 55 55 C 72 65, 82 78, 92 90 C 82 82, 68 72, 55 62"/>
        </svg>

        <span style="
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.3em;
          color: var(--muted-gray);
          text-transform: uppercase;
          margin-top: 10px;
        ">Your Challenge Score</span>

        <!-- Animated Score Count -->
        <h3 id="fc-result-score" style="
          font-family: var(--font-display);
          font-size: clamp(56px, 9vw, 90px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.05em;
          line-height: 1;
        ">0 / 5</h3>

        <h4 id="fc-result-level" style="
          font-family: var(--font-display);
          font-size: clamp(24px, 4vw, 38px);
          color: var(--spider-red);
          text-shadow: 0 0 20px rgba(229, 9, 20, 0.45);
          margin: 10px 0 5px 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.8s ease 0.4s, opacity 0.8s ease 0.4s;
        ">ROOKIE</h4>

        <p id="fc-result-desc" style="
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted-white);
          max-width: 480px;
          margin: 0 0 30px 0;
          opacity: 0;
          filter: blur(5px);
          transition: opacity 0.8s ease 0.7s, filter 0.8s ease 0.7s;
        ">Description goes here.</p>

        <!-- Result Control Row -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <button id="fc-btn-retry" class="btn-cinematic" style="
            background: var(--dark-red);
            border-color: var(--spider-red);
            font-weight: 700;
          ">TRY AGAIN</button>

          <button id="fc-btn-share" class="btn-cinematic" style="
            border-color: rgba(255,255,255,0.12);
          ">SHARE RESULT 🔗</button>
          
          <button id="fc-btn-back" class="btn-cinematic" style="
            border-color: rgba(255,255,255,0.12);
          ">BACK TO JOURNEY</button>
        </div>
      </div>
    </div>
  `,A(),k();const c=s.querySelector("#fc-start-panel"),d=s.querySelector("#fc-game-panel"),h=s.querySelector("#fc-result-panel"),p=s.querySelector("#fc-start-btn"),u=s.querySelector("#fc-next-btn"),g=s.querySelector("#fc-btn-retry"),f=s.querySelector("#fc-btn-share"),y=s.querySelector("#fc-btn-back");p==null||p.addEventListener("click",()=>{wt.playWebShoot(),w()}),u==null||u.addEventListener("click",()=>{wt.playShutter(),T()}),g==null||g.addEventListener("click",()=>{wt.playWebShoot(),w()}),y==null||y.addEventListener("click",()=>{wt.playClose();const C=document.getElementById("section-valentine");C==null||C.scrollIntoView({behavior:"smooth",block:"start"})}),f==null||f.addEventListener("click",()=>{_()});function w(){l(),c.style.display="none",h.style.display="none",d.style.display="flex",me.duckVolume(),o=performance.now(),x(),clearInterval(n),n=setInterval(x,1e3),E()}function x(){const C=Math.floor((performance.now()-o)/1e3),S=String(Math.floor(C/60)).padStart(2,"0"),O=String(C%60).padStart(2,"0"),R=s.querySelector("#fc-timer");R&&(R.textContent=`TIME: ${S}:${O}`)}function E(){const C=t[i];if(!C)return;const S=s.querySelector("#fc-question-counter");S&&(S.textContent=`QUESTION 0${i+1} / 05`);const O=s.querySelector("#fc-progress-bar-fill");if(O){const m=i/5*100;O.style.width=`${m}%`}const R=s.querySelector("#fc-progress-nodes");R&&(R.innerHTML=Array.from({length:5}).map((m,$)=>{let K="○",ie="rgba(255, 255, 255, 0.2)";return $<i?(K="●",ie="var(--spider-red)"):$===i&&(K="🔴",ie="var(--bright-red)"),`<span style="color:${ie}; font-size:14px; transition:color 0.3s ease;">${K}</span>`}).join('<span style="color:rgba(255,255,255,0.08); flex:1; text-align:center; font-size:10px;">──</span>'));const z=s.querySelector("#fc-question-category");z&&(z.textContent=`CATEGORY: ${C.category} • DIFFICULTY: ${C.difficulty}`);const N=s.querySelector("#fc-question-text");N&&(N.textContent=C.question);const I=s.querySelector("#fc-options-stack");if(I){I.innerHTML=C.options.map(($,K)=>`
        <button class="fc-option-btn" data-index="${K}" style="
          width: 100%;
          text-align: left;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #FFF;
          font-family: var(--font-body);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          outline: none;
        ">
          ${$}
        </button>
      `).join("");const m=I.querySelectorAll(".fc-option-btn");m.forEach($=>{$.addEventListener("click",()=>{b(parseInt($.dataset.index),m)}),$.addEventListener("mouseenter",()=>{$.disabled||($.style.transform="translateY(-2px)",$.style.background="rgba(255, 46, 54, 0.03)",$.style.borderColor="rgba(255, 46, 54, 0.35)")}),$.style.transform="none",$.addEventListener("mouseleave",()=>{!$.disabled&&!$.classList.contains("selected")&&($.style.transform="none",$.style.background="rgba(255, 255, 255, 0.02)",$.style.borderColor="rgba(255, 255, 255, 0.08)")})})}const D=s.querySelector("#fc-feedback-area");D&&(D.style.display="none");const q=s.querySelector(".fc-card");q&&(q.style.opacity="0",q.style.transform="translateX(25px)",requestAnimationFrame(()=>{q.style.transition="transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s ease",q.style.opacity="1",q.style.transform="translateX(0)"}))}function b(C,S){const O=t[i],R=C===O.answer;R?(r++,wt.playCorrect()):wt.playIncorrect(),S.forEach((D,q)=>{D.disabled=!0,D.style.pointerEvents="none",q===O.answer?(D.style.borderColor="#00E676",D.style.boxShadow="0 0 15px rgba(0, 230, 118, 0.2)",D.style.background="rgba(0, 230, 118, 0.04)"):q===C?(D.style.borderColor="#FF1744",D.style.boxShadow="0 0 15px rgba(255, 23, 68, 0.2)",D.style.background="rgba(255, 23, 68, 0.04)"):D.style.opacity="0.4"});const z=s.querySelector("#fc-feedback-area"),N=s.querySelector("#fc-feedback-status"),I=s.querySelector("#fc-explanation-text");z&&N&&I&&(N.textContent=R?"✓ CORRECT":"✗ INCORRECT",N.style.color=R?"#00E676":"#FF1744",I.textContent=O.explanation,z.style.display="flex")}function T(){i++,i<5?E():P()}function P(){clearInterval(n),d.style.display="none",h.style.display="flex",me.restoreVolume();const C=s.querySelector("#fc-result-spider"),S=s.querySelector("#fc-result-score"),O=s.querySelector("#fc-result-level"),R=s.querySelector("#fc-result-desc");if(C&&S&&O&&R){C.style.opacity="0",C.style.transform="scale(0.7)",S.textContent="0 / 5",O.style.opacity="0",O.style.transform="translateY(20px)",R.style.opacity="0",R.style.filter="blur(5px)";let z="",N="",I="",D="";r<=1?(z="NEIGHBOURHOOD ROOKIE",N="Every hero starts somewhere. You're just getting started on the web.",I="rgba(229, 9, 20, 0.15)",D="40px"):r===2?(z="WEB-SLINGER IN TRAINING",N="You know the basics. The web is beginning to stick.",I="rgba(229, 9, 20, 0.25)",D="50px"):r===3?(z="FRIENDLY NEIGHBOURHOOD FAN",N="Not bad. You know Peter Parker, you know the mask.",I="rgba(229, 9, 20, 0.4)",D="60px"):r===4?(z="SPIDER-MAN SUPER FAN",N="With great knowledge comes great responsibility. You know the story.",I="rgba(229, 9, 20, 0.55)",D="70px"):(z="ULTIMATE SPIDER-MAN FAN",N="You're officially one of the people who knows the story behind the mask.",I="rgba(229, 9, 20, 0.75)",D="90px"),O.textContent=z,R.textContent=N,requestAnimationFrame(()=>{C.style.opacity="1",C.style.transform="scale(1)",C.style.filter=`drop-shadow(0 0 ${D} ${I})`});let q=0;const m=setInterval(()=>{q<r?(q++,S.textContent=`${q} / 5`):(clearInterval(m),S.textContent=`${r} / 5`)},150);setTimeout(()=>{O.style.opacity="1",O.style.transform="translateY(0)"},500),setTimeout(()=>{R.style.opacity="1",R.style.filter="blur(0)"},800)}}function _(){let C="Neighbourhood Rookie";r===2&&(C="Web-Slinger in Training"),r===3&&(C="Friendly Neighbourhood Fan"),r===4&&(C="Spider-Man Super Fan"),r===5&&(C="Ultimate Spider-Man Fan");const S=`I scored ${r}/5 and got "${C}" on the Peter Parker Spider-Man Fan Challenge! Can you beat my score? 🕷️🔴`,O=window.location.href;navigator.share?navigator.share({title:"Spider-Man Fan Challenge",text:S,url:O}).catch(()=>{}):navigator.clipboard.writeText(`${S} ${O}`).then(()=>{alert("Copied score challenge text to clipboard! Paste it to share.")}).catch(()=>{})}function A(){const C=s.querySelector("#fc-bg-canvas");if(!C)return;const S=C.getContext("2d");let O=C.width=s.offsetWidth,R=C.height=s.offsetHeight;window.addEventListener("resize",()=>{O=C.width=s.offsetWidth,R=C.height=s.offsetHeight});const z=[],N=45;class I{constructor(){this.x=Math.random()*O,this.y=Math.random()*R,this.vx=(Math.random()-.5)*.45,this.vy=(Math.random()-.5)*.45,this.r=Math.random()*2+.8}update(ie){if(this.x+=this.vx,this.y+=this.vy,this.x<0&&(this.x=O),this.x>O&&(this.x=0),this.y<0&&(this.y=R),this.y>R&&(this.y=0),ie.x!==null&&ie.y!==null){const ne=ie.x-this.x,ce=ie.y-this.y;Math.hypot(ne,ce)<160&&(this.x+=ne*.006,this.y+=ce*.006)}}draw(){S.beginPath(),S.arc(this.x,this.y,this.r,0,Math.PI*2),S.fillStyle="rgba(255, 46, 54, 0.22)",S.fill()}}for(let K=0;K<N;K++)z.push(new I);const D={x:null,y:null};s.addEventListener("mousemove",K=>{const ie=s.getBoundingClientRect();D.x=K.clientX-ie.left,D.y=K.clientY-ie.top}),s.addEventListener("mouseleave",()=>{D.x=null,D.y=null});let q;function m(){S.clearRect(0,0,O,R);for(let K=0;K<z.length;K++){const ie=z[K];ie.update(D),ie.draw();for(let ne=K+1;ne<z.length;ne++){const ce=z[ne],Se=Math.hypot(ie.x-ce.x,ie.y-ce.y);Se<115&&(S.beginPath(),S.moveTo(ie.x,ie.y),S.lineTo(ce.x,ce.y),S.strokeStyle=`rgba(255, 46, 54, ${.11*(1-Se/115)})`,S.lineWidth=.45,S.stroke())}}q=requestAnimationFrame(m)}new IntersectionObserver(K=>{K[0].isIntersecting?q||m():(cancelAnimationFrame(q),q=null)},{threshold:.05}).observe(s)}function k(){const C=s.querySelector(".fc-card");C&&(C.addEventListener("mousemove",S=>{const O=C.getBoundingClientRect(),R=S.clientX-(O.left+O.width/2),N=-((S.clientY-(O.top+O.height/2))/(O.height/2))*4.5,I=R/(O.width/2)*4.5;C.style.transform=`rotateX(${N}deg) rotateY(${I}deg) scale(1.015)`,C.style.borderColor="rgba(255, 46, 54, 0.45)",C.style.boxShadow="0 25px 60px rgba(0, 0, 0, 0.98), 0 0 35px rgba(255, 46, 54, 0.15)"}),C.addEventListener("mouseleave",()=>{C.style.transform="none",C.style.borderColor="rgba(229, 9, 20, 0.2)",C.style.boxShadow="0 20px 50px rgba(0, 0, 0, 0.95)"}))}new IntersectionObserver(C=>{C[0].isIntersecting||me.restoreVolume()},{threshold:.1}).observe(s)}let Go=!1;function iu(){if(Go)return;Go=!0,new bl,window.threeDEngine=new bd,new _l;const s=new Cl;_d(),Ed(),Td(),Sd(),Md(),kd(s),Cd(),Pd(),Fd(),Rd(),Id(),zd(),Nd(),Hd(),qd(),Yd(),Vd(),Wd(),Ud(),Gd(),jd(),Xd(),Jd(),Kd(),eu(),tu(),su(),new lt;const e=document.getElementById("section-homecoming");e&&lt.initHomecomingScroll(e);const t=document.getElementById("section-love-scroll");t&&lt.initLoveScroll(t);const i=document.getElementById("section-three-spidermen");i&&lt.initThreeSpiderMen(i);const r=document.getElementById("section-disintegration");r&&lt.initDisintegration(r),new md,ru(),nu(),console.log("🕷 Peter Parker: The Journey — initialized DOM sections.")}function jo(){var s;try{iu()}catch(e){console.error("[APP] Error during initApp:",e)}try{new xl(()=>{try{me.unlock()}catch{}}).start()}catch(e){console.error("[LOADER] Error starting loader:",e),(s=document.getElementById("loader"))==null||s.remove()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",jo):jo();function ru(){var c;const s=document.getElementById("easter-egg-overlay"),e=s==null?void 0:s.querySelector(".easter-egg-text");let t=!1;const i=d=>{!s||!e||t||(t=!0,e.textContent=d,s.removeAttribute("hidden"),s.classList.add("active"),setTimeout(()=>{s.style.animation="fade-out 0.4s ease forwards",setTimeout(()=>{s.setAttribute("hidden",""),s.classList.remove("active"),s.style.animation="",t=!1},400)},3e3))};let r=0;(c=document.querySelector(".nav-logo"))==null||c.addEventListener("click",d=>{d.preventDefault(),r++,r>=3&&(r=0,i('"ANYONE CAN WEAR THE MASK."'))});let n=[];const o=["ArrowUp","ArrowUp","ArrowDown","ArrowDown"];document.addEventListener("keydown",d=>{n.push(d.key),n.length>4&&n.shift(),JSON.stringify(n)===JSON.stringify(o)&&(i('"PETER PARKER."'),n=[])});let a=0;const l=document.getElementById("hero-web");l==null||l.addEventListener("click",()=>{a++,a>=2&&(a=0,i('"WITH GREAT POWER COMES GREAT RESPONSIBILITY."'))})}function nu(){const s=document.getElementById("section-alone");if(!s)return;new IntersectionObserver(t=>{t[0].isIntersecting&&me.resume()},{threshold:.3}).observe(s)}function su(){const s="/peter-parker-journey/";document.querySelectorAll("[src], [data-poster], [data-video-src]").forEach(t=>{if(t.hasAttribute("src")){const i=t.getAttribute("src");if(i&&!i.startsWith("http")&&!i.startsWith(s)&&!i.startsWith("data:")){const r=i.startsWith("/")?i.slice(1):i;t.setAttribute("src",`${s}${r}`)}}if(t.hasAttribute("data-poster")){const i=t.getAttribute("data-poster");if(i&&!i.startsWith("http")&&!i.startsWith(s)){const r=i.startsWith("/")?i.slice(1):i;t.setAttribute("data-poster",`${s}${r}`)}}if(t.hasAttribute("data-video-src")){const i=t.getAttribute("data-video-src");if(i&&!i.startsWith("http")&&!i.startsWith(s)){const r=i.startsWith("/")?i.slice(1):i;t.setAttribute("data-video-src",`${s}${r}`)}}})}
