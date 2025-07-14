import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const getToday = () => new Date().toISOString().split('T')[0];

const checklistItems = [
  "0,5 L d’eau au réveil",
  "5-10 min de mouvement doux",
  "Hygiène et habillage",
  "Petit-déjeuner sain",
  "Début de travail calme",
  "Crudités au déjeuner",
  "Féculent au déjeuner",
  "Protéines au déjeuner",
  "Légumes cuits au déjeuner",
  "1 fruit au déjeuner",
  "0,5 L d’eau avant déjeuner",
  "Collation saine (si faim)",
  "Soupe maison au dîner",
  "Yaourt ou œuf au dîner",
  "Légumes au dîner",
  "0,5 L d’eau avant dîner",
  "Pas de repas après 18h",
  "Marche douce 15-30 min",
  "2L d’eau total aujourd’hui",
  "Moment calme ou positif"
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

  useEffect(() => {
    const saved = localStorage.getItem(date);
    setChecks(saved ? JSON.parse(saved) : Array(checklistItems.length).fill(false));
  }, [date]);

  useEffect(() => {
    localStorage.setItem(date, JSON.stringify(checks));
  }, [checks, date]);

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

  const weeklyStats = calculateWeeklyStats();

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Checklist Journal - {date}</h1>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        style={{ marginBottom: '20px' }}
      />
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
    </div>
  );
}
