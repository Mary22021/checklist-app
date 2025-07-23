// // Main component
// export default function Semaine1Resume() { return <div>Semaine 1 Résumé</div>; }
import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "./components/ui/card.tsx";

export default function Semaine1Resume() {
  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-2xl font-bold text-center">Mon Journal Santé 🌿</h1>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">🌞 Routine Matinale</h2>
          <ul className="list-disc ml-4">
            <li>🕗 Réveil à 8h</li>
            <li>🚿 Douche et prière</li>
            <li>🌱 Marche pieds nus 15 min (prévu)</li>
            <li>💧 Eau au réveil</li>
            <li>🙏 Prière matinale</li>
            <li>☕ Café au lait sans sucre + pain + fromage</li>
            <li>💊 Vitamine D</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">🍽️ Repas</h2>
          <ul className="list-disc ml-4">
            <li>Déjeuner : légumes, salade, viande</li>
            <li>Dîner : patates, olives, œufs, viande hachée</li>
            <li>Collations : fruits, café, thé</li>
            <li>Pas de sucre ajouté 🟢</li>
            <li>Pas de pain le soir 🟢</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">🚶 Activité</h2>
          <ul className="list-disc ml-4">
            <li>Marche : jusqu’à 5 km / jour</li>
            <li>Pédalo : 40-45 min / jour (bureau)</li>
            <li>Ménage, jardin, chien 🐾</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">🧘 Bien-être & émotions</h2>
          <ul className="list-disc ml-4">
            <li>🙏 Prière du matin pour bien démarrer</li>
            <li>📿 Gratitude, intention, paix intérieure</li>
            <li>📸 Photo souvenir = moment d’amour</li>
            <li>🧹 Ménage = mouvement & clarté</li>
            <li>🎥 Détente : film ou moment calme</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">📉 Résultat</h2>
          <ul className="list-disc ml-4">
            <li>Début :14 juillet</li>
            <li>Perte  : 3,2 kg en 1 semaine</li>
            <li>Bravo pour la discipline 💪🌟</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
