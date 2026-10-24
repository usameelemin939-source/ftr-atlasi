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
      const source = document.createElement("a"); source.className = "term-source"; source.href = term.source; source.target = "_blank"; source.rel = "noopener noreferrer"; source.textContent = "Kaynağı gör ↗";
      card.append(top, title, latin, description, source); fragment.append(card);
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
  const track = document.querySelector("#progress-track"), fill = document.querySelector("#progress-fill"), best = document.querySelector("#best-score");
  let pool = [], index = 0, score = 0, wrong = [], answered = false, isReview = false;
  const letters = ["A", "B", "C", "D"];

  function readBest() { try { return Number(localStorage.getItem("ftr-atlasi-best-score") || 0); } catch { return 0; } }
  function showBest() { const value = readBest(); if (value > 0) { best.hidden = false; best.textContent = `En iyi sonucun: ${value} / ${data.questions.length}`; } }
  showBest();
  function startQuiz(review = false) { isReview = review; pool = review ? [...wrong] : [...data.questions]; index = 0; score = 0; wrong = []; answered = false; welcome.hidden = true; result.hidden = true; play.hidden = false; renderQuestion(); }
  function renderQuestion() {
    if (index >= pool.length) return renderResult();
    answered = false; const item = pool[index];
    document.querySelector("#question-position").textContent = `Soru ${index + 1} / ${pool.length}`;
    document.querySelector("#live-score").textContent = `Puan ${score}`;
    document.querySelector("#question-category").textContent = item.category;
    const title = document.querySelector("#question-title"); title.textContent = item.question;
    track.setAttribute("aria-valuemax", pool.length); track.setAttribute("aria-valuenow", index); fill.style.width = `${Math.round(index / pool.length * 100)}%`;
    answers.replaceChildren(); feedback.hidden = true; feedback.className = "feedback"; feedback.replaceChildren(); next.hidden = true;
    item.options.forEach((option, choice) => { const button = document.createElement("button"); button.type = "button"; button.className = "answer-option"; const letter = document.createElement("span"); letter.className = "answer-letter"; letter.textContent = letters[choice]; const label = document.createElement("span"); label.textContent = option; button.append(letter, label); button.addEventListener("click", () => choose(choice)); answers.append(button); });
    title.focus({ preventScroll: true });
  }
  function choose(choice) {
    if (answered) return; answered = true; const item = pool[index]; const buttons = [...answers.querySelectorAll("button")];
    buttons.forEach((button, i) => { button.disabled = true; if (i === item.answer) button.classList.add("answer-correct"); if (i === choice && choice !== item.answer) button.classList.add("answer-wrong"); });
    const correct = choice === item.answer; if (correct) score++; else wrong.push(item);
    document.querySelector("#live-score").textContent = `Puan ${score}`; track.setAttribute("aria-valuenow", index + 1); fill.style.width = `${Math.round((index + 1) / pool.length * 100)}%`;
    feedback.hidden = false; feedback.classList.toggle("wrong", !correct); feedback.append(document.createTextNode(`${correct ? "Doğru! " : "Birlikte hatırlayalım. "}${item.explanation} `));
    const link = document.createElement("a"); link.href = item.source; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Kaynak"; feedback.append(link);
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
  document.querySelector("#start-quiz").addEventListener("click", () => startQuiz());
  next.addEventListener("click", () => { index++; renderQuestion(); });
  document.querySelector("#restart-quiz").addEventListener("click", () => startQuiz());
  document.querySelector("#retry-wrong").addEventListener("click", () => startQuiz(true));
})();
