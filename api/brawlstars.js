// Fichier: api/brawlstars.js
export default async function handler(req, res) {
    // 1. On force l'autorisation pour éviter l'erreur CORS sur ton GitHub Pages
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    const { tag } = req.query;
    if (!tag) {
        return res.status(400).json({ error: 'Tag manquant' });
    }

    // 2. TON SCRIPT SECURISE : Tu colles TON Bearer Token ici !
    // Personne sur internet ne pourra le voir, il est caché sur le serveur.
    const MY_SECRET_TOKEN = "COLLE_TON_TOKEN_SUPERCELL_ICI";

    const cleanTag = tag.replace('#', '').toUpperCase().trim();
    const url = `https://api.brawlstars.com/v1/players/%23${cleanTag}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${MY_SECRET_TOKEN}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Erreur Supercell' });
        }

        const data = await response.json();
        // On renvoie juste les trophées à ton application
        return res.status(200).json({ trophies: data.trophies });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
