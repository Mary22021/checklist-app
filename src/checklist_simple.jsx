import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const getToday = () => new Date().toISOString().split('T')[0];
const today = new Date();

const monthlyTargets = {
  6: { weight: 98, goal: "Moins de sucre, marche + elliptique" },
  7: { weight: 94, goal: "Maintenir rythme, crudités et eau" },
  8: { weight: 91, goal: "Renforcement doux, collation, jeûne régulier" },
  9: { weight: 88, goal: "Réduction féculents, recettes allégées" },
 10: { weight: 84, goal: "Plats maison, fruits, marche douce" },
 11: { weight: 81, goal: "Stabilisation, éviter excès, étirements" },
 12: { weight: 80, goal: "Maintien, consolidation, fierté 🎉" },
};

const sleepTips = [
  "Évite les écrans 30 min avant le coucher 📵",
  "Crée-toi une routine calme avant de dormir 🕯️",
  "Bois une tisane chaude le soir 🍵",
  "Va au lit à la même heure tous les jours 🛏️",
  "Baisse la lumière 1h avant le dodo 🕯️",
  "Fais un bain chaud ou une douche tiède 🛁",
  "Écoute une musique douce ou un bruit blanc 🎶",
];

const defaultAffirmations = [
  "Je prends soin de moi avec amour 💖",
  "Chaque petit pas me rapproche de mon objectif 🚶‍♀️",
  "Mon corps est mon allié, pas mon ennemi 🌈",
  "Je mérite de me sentir bien dans ma peau ✨",
  "Je suis capable, courageuse et constante 💪",
  "Ma santé est plus forte chaque jour 🌿",
  "Je fais de mon mieux et c’est suffisant 🧘‍♀️",
];

const checklistItems = [
  "💧 0,5 L d’eau au réveil",
  "🧘 5-10 min de mouvement doux",
  "🛁 Hygiène et habillage",
  "🍞 Petit-déjeuner sain",
  "💼 Début de travail calme",
  "🥗 Crudités au déjeuner",
  "🍚 Féculent au déjeuner",
  "🍗 Protéines au déjeuner",
  "🥦 Légumes cuits au déjeuner",
  "🍊 1 fruit au déjeuner",
  "🚰 0,5 L d’eau avant déjeuner",
  "☕ Collation saine (si faim)",
  "🥣 Soupe maison au dîner",
  "🥚 Yaourt ou œuf au dîner",
  "🥬 Légumes au dîner",
  "🚿 0,5 L d’eau avant dîner",
  "⏳ Pas de repas après 18h",
  "🚶 Marche douce 15-30 min",
  "🥤 2L d’eau total aujourd’hui",
  "🧘‍♀️ Moment calme ou positif",
  "🚴‍♀️ Elliptique sous bureau utilisé",
  "🛌 J’ai dormi au moins 7h",
  "🌸 5 min de gratitude ou respiration"
];

function getPast7Days() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export default function ChecklistJournal() {
  const [date, setDate] = useState(getToday());
  const [checks, setChecks] = useState(() => {
    const saved = localStorage.getItem(date);
    return saved ? JSON.parse(saved) : Array(checklistItems.length).fill(false);
  });
  const [customAffirmations, setCustomAffirmations] = useState(() => {
    const saved = localStorage.getItem("affirmations");
    return saved ? JSON.parse(saved) : [];
  });
  const [newAffirmation, setNewAffirmation] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(date);
    setChecks(saved ? JSON.parse(saved) : Array(checklistItems.length).fill(false));
  }, [date]);

  useEffect(() => {
    localStorage.setItem(date, JSON.stringify(checks));
  }, [checks, date]);

  useEffect(() => {
    if (date === getToday()) {
      const preset = [...checks];
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17, 19, 20, 21].forEach(i => preset[i] = true);
      setChecks(preset);
    }
  }, []);

  const toggleCheck = (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const exportToJSON = () => {
    const data = checklistItems.map((item, index) => ({ item, done: checks[index] }));
    const blob = new Blob([JSON.stringify({ date, data }, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `checklist_${date}.json`;
    link.click();
  };

  const exportToXLSX = () => {
    const data = checklistItems.map((item, index) => ({ Item: item, Done: checks[index] ? 'Yes' : 'No' }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Checklist");
    XLSX.writeFile(workbook, `checklist_${date}.xlsx`);
  };

  const calculateWeeklyStats = () => {
    const days = getPast7Days();
    let total = 0, done = 0;

    days.forEach(d => {
      const saved = localStorage.getItem(d);
      if (saved) {
        const checkArray = JSON.parse(saved);
        total += checkArray.length;
        done += checkArray.filter(Boolean).length;
      }
    });

    const percent = total ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  };

  const calculateTodayScore = () => {
    const done = checks.filter(Boolean).length;
    const total = checks.length;
    const percent = Math.round((done / total) * 100);
    let stars = "";
    if (percent >= 90) stars = "⭐⭐⭐⭐⭐";
    else if (percent >= 75) stars = "⭐⭐⭐⭐";
    else if (percent >= 50) stars = "⭐⭐⭐";
    else if (percent >= 25) stars = "⭐⭐";
    else if (percent > 0) stars = "⭐";
    else stars = "⛔";
    return { done, total, percent, stars };
  };

  const weeklyStats = calculateWeeklyStats();
  const todayScore = calculateTodayScore();
  const thisMonth = new Date().getMonth();
  const thisTarget = monthlyTargets[thisMonth] || {};
  const sleepTip = sleepTips[today.getDay() % sleepTips.length];
  const allAffirmations = [...defaultAffirmations, ...customAffirmations];
  const affirmation = allAffirmations[today.getDate() % allAffirmations.length];

  const addAffirmation = () => {
    if (newAffirmation.trim()) {
      const updated = [...customAffirmations, newAffirmation.trim()];
      setCustomAffirmations(updated);
      localStorage.setItem("affirmations", JSON.stringify(updated));
      setNewAffirmation("");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Checklist Journal - {date}</h1>

      <div style={{ backgroundColor: '#e6f7ff', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
        🌙 <strong>Astuce sommeil du jour :</strong><br />
        <em>{sleepTip}</em>
      </div>

      <div style={{ backgroundColor: '#fff9e6', padding: '10px', borderRadius: '10px', marginBottom: '20px' }}>
        🌟 <strong>Affirmation du jour :</strong><br />
        <em>{affirmation}</em>
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            value={newAffirmation}
            onChange={(e) => setNewAffirmation(e.target.value)}
            placeholder="Écris ta propre affirmation..."
            style={{ width: '100%', marginBottom: '5px' }}
          />
          <button onClick={addAffirmation}>Ajouter affirmation ✍️</button>
        </div>
      </div>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', marginBottom: '20px' }}>
        <strong>🎯 Objectif du mois :</strong><br />
        Poids cible : <strong>{thisTarget.weight || "-"} kg</strong><br />
        Focus : <em>{thisTarget.goal || "-"}</em>
      </div>

      <div>
        {checklistItems.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={checks[index]}
              onChange={() => toggleCheck(index)}
            />
            <label style={{ marginLeft: '8px' }}>{item}</label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={exportToJSON}>Exporter en JSON</button>
        <button onClick={exportToXLSX} style={{ marginLeft: '10px' }}>Exporter en Excel</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>Statistiques 7 derniers jours :</strong><br />
        Cases cochées : {weeklyStats.done} / {weeklyStats.total} ({weeklyStats.percent}%)
      </div>

      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        ⭐ <strong>Score aujourd’hui :</strong> {todayScore.done} / {todayScore.total} ({todayScore.percent}%) {todayScore.stars}
      </div>
    </div>
  );
}
