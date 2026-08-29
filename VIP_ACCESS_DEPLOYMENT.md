# Déploiement de l'accès VIP sur Render

Les quatre pages protégées ne doivent plus être déployées sur GitHub Pages ou
sur un autre hébergement statique. Ne déployez pas l'intégralité du dossier
Downloads : il contient des fichiers sans rapport. Déployez uniquement le
projet web (dont `server.js`, `protected-pages/`, `access-vip.html`, les
ressources `css`, `js`, `images` et son `package.json`) comme un service web
Render qui exécute `server.js`; les contenus se trouvent dans
`protected-pages/` et le serveur refuse explicitement toute URL vers ce
dossier.

Dans Render, configurez les variables d'environnement suivantes :

- `DATABASE_URL` : base PostgreSQL existante contenant la table `customers`.
- `RESEND_API_KEY` : clé Resend existante.
- `VIP_ACCESS_SECRET` : secret aléatoire long (au moins 32 caractères), unique
  à la production. Il signe les codes et les cookies de session.
- `VIP_ACCESS_EMAIL_FROM` : expéditeur Resend vérifié, par exemple
  `Cheriz <vip@votredomaine.fr>`.
- `NODE_ENV=production` : impose le cookie HTTPS sécurisé.
- `VIP_ALLOWED_ORIGINS` : `https://cheriz.boutique.bienmangercommunity.com,https://bienmangercommunity.com`.
- Les variables Stripe existantes : `STRIPE_SECRET_KEY`,
  `STRIPE_WEBHOOK_SECRET`, et les éventuelles variables déjà utilisées par le
  serveur.

Après le premier déploiement, ouvrez l'URL Render. Les URL `/`,
`/blog.html`, `/nos-evenements.html` et `/nos-solutions-entreprise.html`
affichent l'entrée VIP sans cookie et retournent le contenu seulement après
validation. Configurez ensuite le domaine
`cheriz.boutique.bienmangercommunity.com` pour pointer vers le service Render
(et non vers GitHub Pages), puis retirez ces quatre anciennes pages du dépôt ou
remplacez-les par les pages d'entrée fournies ici.

La qualification est vraie lorsqu'un client a `vip_unlimited = TRUE` ou
`vip_credits > 0`. Le code est valable dix minutes, limité à cinq essais, et la
session HTTP-only expire après huit heures.
