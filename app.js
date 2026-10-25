(() => {
  "use strict";
  const data = window.FTR_DATA;
  const grid = document.querySelector("#term-grid");
  const search = document.querySelector("#term-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const empty = document.querySelector("#empty-state");
  const count = document.querySelector("#results-count");
  let activeFilter = "all";

  const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
  function renderTerms() {
    const q = normalize(search.value.trim());
    const terms = data.terms.filter((term) => (activeFilter === "all" || term.category === activeFilter) && (!q || normalize(`${term.tr} ${term.la} ${term.description} ${data.categories[term.category]}`).includes(q)));
    grid.replaceChildren();
    const fragment = document.createDocumentFragment();
    terms.forEach((term) => {
      const card = document.createElement("article"); card.className = "term-card";
      const top = document.createElement("div"); top.className = "term-topline";
      const category = document.createElement("span"); category.className = "term-category"; category.textContent = data.categories[term.category];
      const symbol = document.createElement("span"); symbol.className = "term-symbol"; symbol.setAttribute("aria-hidden", "true"); symbol.textContent = "✳"; top.append(category, symbol);
      const title = document.createElement("h3"); title.textContent = term.tr;
      const latin = document.createElement("p"); latin.className = "term-latin"; latin.lang = "la"; latin.textContent = term.la;
      const description = document.createElement("p"); description.className = "term-description"; description.textContent = term.description;
      const details = document.createElement("details"); details.className = "term-details";
      const summary = document.createElement("summary"); summary.textContent = "Kartı genişlet";
      const extra = document.createElement("div"); extra.className = "term-extra";
      const label = document.createElement("strong"); label.textContent = "Hatırlatma";
      const note = document.createElement("p"); note.textContent = term.description;
      extra.append(label, note); details.append(summary, extra);
      card.append(top, title, latin, description, details); fragment.append(card);
    });
    grid.append(fragment); grid.hidden = terms.length === 0; grid.setAttribute("aria-busy", "false"); empty.hidden = terms.length > 0;
    count.textContent = `${terms.length} terim gösteriliyor`;
    filters.forEach((button) => { button.classList.toggle("active", button.dataset.filter === activeFilter); button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)); const badge = button.querySelector("[data-count]"); if (badge) badge.textContent = data.terms.length; });
  }
  search.addEventListener("input", renderTerms);
  filters.forEach((button) => button.addEventListener("click", () => { activeFilter = button.dataset.filter; renderTerms(); }));
  document.querySelector("#clear-search").addEventListener("click", () => { search.value = ""; activeFilter = "all"; renderTerms(); search.focus(); });
  document.addEventListener("keydown", (event) => { if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); search.focus(); } });
  renderTerms();

  const welcome = document.querySelector("#quiz-welcome"), play = document.querySelector("#quiz-play"), result = document.querySelector("#quiz-result");
  const answers = document.querySelector("#answer-list"), feedback = document.querySelector("#answer-feedback"), next = document.querySelector("#next-question");
  const hintButton = document.querySelector("#show-hint"), hintText = document.querySelector("#hint-text");
  const track = document.querySelector("#progress-track"), fill = document.querySelector("#progress-fill"), best = document.querySelector("#best-score");
  let pool = [], index = 0, score = 0, wrong = [], answered = false, isReview = false;
  const hints = [
    "Standart anatomik pozisyonda kişi dik durur ve avuç içleri öne bakar.",
    "Proksimal, distal teriminin tersidir: uzvun başlangıcına daha yakın.",
    "Kalça ile diz arasında bulunan uzun kemiği düşün.",
    "Omuz ile dirsek arasındaki kemik.",
    "Anatomik pozisyonda başparmak tarafı, önkolun lateral tarafıdır.",
    "Dizin önünde bulunan, quadriceps tendonuyla ilişkili kemik.",
    "Dirseği bükmeye yardım eden iki başlı kas.",
    "Dirseği açma hareketi ekstansiyondur.",
    "Dizin açılmasını sağlayan büyük ön uyluk kas grubu.",
    "Omuz ve kalça eklemleri geniş hareket açıklığına sahip top-yuva tipindedir.",
    "Bu eklem türünde eklem boşluğu ve sinovyal sıvı bulunur.",
    "Medial, vücudun orta çizgisine daha yakın demektir."
  ];
  function prepareQuestions(items) {
    const offset = Math.floor(Math.random() * 4);
    return items.map((original, i) => {
      const item = {...original, options: [...original.options]};
      const correct = item.options[item.answer];
      const distractors = item.options.filter((_, n) => n !== item.answer);
      for (let j = distractors.length - 1; j > 0; j--) { const k = Math.floor(Math.random() * (j + 1)); [distractors[j], distractors[k]] = [distractors[k], distractors[j]]; }
      const target = (i + offset) % item.options.length;
      distractors.splice(target, 0, correct);
      item.options = distractors; item.answer = target;
      item.hint = original.hint || hints[data.questions.indexOf(original)] || "Sorudaki Latince terimi ve ilgili anatomik bölgeyi hatırla.";
      return item;
    });
  }
  const letters = ["A", "B", "C", "D"];

  function readBest() { try { return Number(localStorage.getItem("ftr-atlasi-best-score") || 0); } catch { return 0; } }
  function showBest() { const value = readBest(); if (value > 0) { best.hidden = false; best.textContent = `En iyi sonucun: ${value} / ${data.questions.length}`; } }
  showBest();
  function startQuiz(review = false) { isReview = review; pool = prepareQuestions(review ? [...wrong] : [...data.questions]); index = 0; score = 0; wrong = []; answered = false; welcome.hidden = true; result.hidden = true; play.hidden = false; renderQuestion(); }
  function renderQuestion() {
    if (index >= pool.length) return renderResult();
    answered = false; const item = pool[index];
    document.querySelector("#question-position").textContent = `Soru ${index + 1} / ${pool.length}`;
    document.querySelector("#live-score").textContent = `Puan ${score}`;
    document.querySelector("#question-category").textContent = item.category;
    const title = document.querySelector("#question-title"); title.textContent = item.question;
    track.setAttribute("aria-valuemax", pool.length); track.setAttribute("aria-valuenow", index); fill.style.width = `${Math.round(index / pool.length * 100)}%`;
    answers.replaceChildren(); hintText.hidden = true; hintText.textContent = ""; hintButton.hidden = false; hintButton.disabled = false; feedback.hidden = true; feedback.className = "feedback"; feedback.replaceChildren(); next.hidden = true;
    item.options.forEach((option, choice) => { const button = document.createElement("button"); button.type = "button"; button.className = "answer-option"; const letter = document.createElement("span"); letter.className = "answer-letter"; letter.textContent = letters[choice]; const label = document.createElement("span"); label.textContent = option; button.append(letter, label); button.addEventListener("click", () => choose(choice)); answers.append(button); });
    title.focus({ preventScroll: true });
  }
  function choose(choice) {
    if (answered) return; answered = true; const item = pool[index]; const buttons = [...answers.querySelectorAll("button")];
    buttons.forEach((button, i) => { button.disabled = true; if (i === item.answer) button.classList.add("answer-correct"); if (i === choice && choice !== item.answer) button.classList.add("answer-wrong"); });
    const correct = choice === item.answer; if (correct) score++; else wrong.push(item);
    document.querySelector("#live-score").textContent = `Puan ${score}`; track.setAttribute("aria-valuenow", index + 1); fill.style.width = `${Math.round((index + 1) / pool.length * 100)}%`;
    hintButton.disabled = true; feedback.hidden = false; feedback.classList.toggle("wrong", !correct); feedback.append(document.createTextNode(`${correct ? "Doğru! " : "Birlikte hatırlayalım. "}${item.explanation} `));
    
    next.textContent = index === pool.length - 1 ? "Sonucu gör →" : "Sonraki soru →"; next.hidden = false;
  }
  function renderResult() {
    play.hidden = true; result.hidden = false;
    document.querySelector("#result-kicker").textContent = isReview ? "TEKRAR TAMAMLANDI" : "QUIZ TAMAMLANDI";
    document.querySelector("#result-title").textContent = score === pool.length ? "Harika, hepsi doğru!" : score >= Math.ceil(pool.length * .7) ? "Güzel iş çıkardın." : "Güzel bir tekrar oldu.";
    document.querySelector("#result-score").textContent = `${score} / ${pool.length} doğru`;
    document.querySelector("#result-copy").textContent = wrong.length ? "Yanlışlarına yeniden bakabilir, sonra tüm quizi tekrar deneyebilirsin." : "Bu turda yanlış cevabın yok. İstersen tüm quizi tekrar çöz.";
    document.querySelector("#result-mark").textContent = wrong.length ? "↻" : "✓";
    const review = document.querySelector("#wrong-review"); review.replaceChildren(); review.hidden = wrong.length === 0;
    if (wrong.length) { const label = document.createElement("strong"); label.textContent = "Bir tur daha bakabileceğin sorular:"; const list = document.createElement("ul"); wrong.forEach((item) => { const li = document.createElement("li"); li.textContent = `${item.question} Doğru yanıt: ${item.options[item.answer]}.`; list.append(li); }); review.append(label, list); }
    document.querySelector("#retry-wrong").hidden = wrong.length === 0;
    if (!isReview && score > readBest()) { try { localStorage.setItem("ftr-atlasi-best-score", score); } catch { /* Depolama kapalı olsa da quiz kullanılabilir. */ } showBest(); }
  }
  const modelData = {
    femur: {url:"https://sketchfab.com/models/a9c1f1a88b104c3fbfe975fa10b31b31/embed?autostart=0&ui_theme=dark",name:"Uyluk kemiği",latin:"Femur",source:"https://sketchfab.com/3d-models/human-femur-a9c1f1a88b104c3fbfe975fa10b31b31",facts:["İnsan vücudunun en uzun kemiğidir.","Proksimal ucu kalça eklemine katılır.","Distal ucu diz ekleminin oluşumuna katılır."]},
    tibia: {url:"https://sketchfab.com/models/7c1979d6127749bc80a9d9276d24edcd/embed?autostart=0&ui_theme=dark",name:"Kaval kemiği",latin:"Tibia",source:"https://sketchfab.com/3d-models/human-tibia-7c1979d6127749bc80a9d9276d24edcd",facts:["Alt bacağın iç tarafında bulunur.","Alt bacağın temel ağırlık taşıyan kemiğidir.","Diz ve ayak bileği eklemlerine katılır."]},
    fibula: {url:"https://sketchfab.com/models/5f239617db8d4d2eaaf13b8616acf70e/embed?autostart=0&ui_theme=dark",name:"Kamış kemiği",latin:"Fibula",source:"https://sketchfab.com/3d-models/human-fibula-5f239617db8d4d2eaaf13b8616acf70e",facts:["Alt bacağın dış tarafında yer alır.","Tibia kadar ağırlık taşımaz.","Ayak bileğinin dış tarafındaki çıkıntıya katılır."]},
    foot: {url:"https://sketchfab.com/models/3741b9acf74b4206aa6fd9dbb20ad583/embed?autostart=0&ui_theme=dark",name:"Ayak kemikleri",latin:"Ossa pedis",source:"https://sketchfab.com/3d-models/human-foot-bones-3741b9acf74b4206aa6fd9dbb20ad583",facts:["Ayak kemikleri tarsal, metatarsal ve falanks kemiklerine ayrılır.","Yedi tarsal kemik ayak bileği ve arka ayak bölgesinde bulunur.","Her ayakta beş metatarsal kemik vardır."]}
  };
  document.querySelectorAll("[data-model]").forEach((button) => button.addEventListener("click", () => {
    const item = modelData[button.dataset.model]; if (!item) return;
    document.querySelector("#model-frame").src = item.url;
    document.querySelector("#model-frame").title = item.name + " — " + item.latin + " 3B modeli";
    document.querySelector("#model-name").textContent = item.name;
    document.querySelector("#model-latin").textContent = item.latin;
    const facts = document.querySelector("#model-facts"); facts.replaceChildren();
    item.facts.forEach((fact) => { const li = document.createElement("li"); li.textContent = fact; facts.append(li); });
    document.querySelector("#model-source").href = item.source;
    document.querySelectorAll("[data-model]").forEach((b) => { const active = b === button; b.classList.toggle("is-active", active); b.setAttribute("aria-pressed", String(active)); });
  }));
  hintButton.addEventListener("click", () => { const item = pool[index]; hintText.textContent = item.hint || "Sorudaki anatomik bölgeyi ve Latince adı hatırla."; hintText.hidden = false; hintButton.hidden = true; });
  document.querySelector("#start-quiz").addEventListener("click", () => startQuiz());
  next.addEventListener("click", () => { index++; renderQuestion(); });
  document.querySelector("#restart-quiz").addEventListener("click", () => startQuiz());
  document.querySelector("#retry-wrong").addEventListener("click", () => startQuiz(true));

  function renderCourseProgress(){
    document.querySelectorAll("[data-course-progress][data-course-total]").forEach(card=>{
      const course=card.dataset.courseProgress;
      const total=Number(card.dataset.courseTotal);
      const bar=card.querySelector(".course-progress span");
      const label=card.querySelector(".course-card-body small");
      if(!course||!Number.isInteger(total)||total<1||!bar||!label)return;
      let completed=new Set();
      try{
        const storageKey=course==="anatomi"?"ftraCompleted":"ftraCourseCompleted_"+course;
        const saved=JSON.parse(localStorage.getItem(storageKey)||"[]");
        if(Array.isArray(saved)){
          if(course==="anatomi")completed=new Set(saved.filter(id=>typeof id==="string"&&/^l(?:[1-9]|10)$/.test(id)));
          else completed=new Set(saved.filter(i=>Number.isInteger(i)&&i>=0&&i<total));
        }
      }catch(error){}
      const count=completed.size;
      const percent=Math.round(count/total*100);
      bar.style.width=percent+"%";
      bar.setAttribute("role","progressbar");
      bar.setAttribute("aria-valuemin","0");
      bar.setAttribute("aria-valuemax",String(total));
      bar.setAttribute("aria-valuenow",String(count));
      bar.setAttribute("aria-label",count+" / "+total+" konu tamamlandı");
      label.textContent=count===0?"Henüz konu tamamlanmadı":count===total?"Tüm konular tamamlandı":count+" / "+total+" konu tamamlandı";
    });
  }
  function renderDailyPlan(){
    const summary=document.querySelector("#dailyPlanSummary");
    const detail=document.querySelector("#dailyPlanDetail");
    const progress=document.querySelector("#dailyPlanProgress");
    const primary=document.querySelector("#dailyPlanPrimary");
    const complete=document.querySelector("#dailyPlanComplete");
    if(!summary||!detail||!progress||!primary||!complete)return;
    const now=new Date();
    const today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
    let history=[],schedule={},ratings={};
    try{const v=JSON.parse(localStorage.getItem("ftraQuizHistory")||"[]");if(Array.isArray(v))history=v;}catch(e){}
    try{const v=JSON.parse(localStorage.getItem("ftraRecallSchedule")||"{}");if(v&&typeof v==="object"&&!Array.isArray(v))schedule=v;}catch(e){}
    try{const v=JSON.parse(localStorage.getItem("ftraRecallRatings")||"{}");if(v&&typeof v==="object"&&!Array.isArray(v))ratings=v;}catch(e){}
    const due=Object.values(schedule).filter(item=>item&&typeof item.due==="string"&&item.due<=today).length;
    const latest=history.length?history[history.length-1]:null;
    const names={direction:"Anatomik pozisyon ve yönler",bones:"Kemikler ve iskelet",joints:"Eklem sınıflandırması",muscle:"Kas ve hareket terimleri",nervous:"Sinir sistemi"};
    let weak=null;
    if(latest&&Array.isArray(latest.topics)){
      const topics=latest.topics.filter(t=>t&&names[t.key]&&Number.isFinite(t.correct)&&Number.isFinite(t.total)&&t.total>0);
      if(topics.length){weak=topics.reduce((a,b)=>a.correct/a.total<=b.correct/b.total?a:b);}
    }
    let done=false;
    try{done=localStorage.getItem("ftraDailyGoal_"+today)==="done"}catch(e){}
    summary.textContent=done?"Bugünkü 15 dakikalık hedef tamamlandı.":due>0?due+" tekrar kartı seni bekliyor.":weak?"Öncelik: "+names[weak.key]+".":"15 dakikalık bir çalışma seç.";
    detail.textContent=due>0?"Öneri: tekrar kartlarını gözden geçir.":weak?"Son testindeki bu konuya odaklan.":"Ders seç, kısa bir tekrar yap ve mini test çöz.";
    progress.style.width=done?"100%":due>0?"25%":weak?"15%":"0%";
    progress.parentElement?.setAttribute("aria-label",done?"Günlük hedef tamamlandı":"Günlük çalışma planı");
    primary.href=due>0?"dersler.html#boneRecall":weak?"dersler.html?topic="+encodeURIComponent(weak.key)+"#quiz":"dersler.html";
    primary.textContent=due>0?"Tekrar kartlarına git":weak?"Eksik konuyu çalış":"Derslere git";
    complete.textContent=done?"Hedef tamamlandı":"Bugünkü hedefi tamamladım";
    complete.disabled=done;
    complete.onclick=()=>{
      try{localStorage.setItem("ftraDailyGoal_"+today,"done")}catch(e){}
      renderCourseProgress();
      renderDailyPlan();
    };
  }
  window.addEventListener("storage",event=>{
    if(event.key===null||event.key==="ftraCompleted"||event.key?.startsWith("ftraCourseCompleted_")){
      renderCourseProgress();
    }
    if(event.key===null||event.key?.startsWith("ftraDailyGoal_")||event.key==="ftraQuizHistory"||event.key==="ftraRecallSchedule"||event.key==="ftraRecallRatings"){
      renderDailyPlan();
    }
  });
  renderDailyPlan();
})();
