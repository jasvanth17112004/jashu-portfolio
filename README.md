# Jasvanth Portfolio — Developer Guide


---

## 📁 File Structure

```
jasvanth-portfolio/
│
├── index.html                  
│
├── css/
│   ├── variables.css           ← 🎨 Colors, fonts, spacing — EDIT FIRST
│   ├── reset.css               ← Browser reset + base styles
│   ├── layout.css              ← Container, buttons, ticker strip
│   ├── navbar.css              
│   ├── hero.css                
│   ├── about.css               
│   ├── skills.css              
│   ├── experience.css          
│   ├── projects.css            
│   ├── certifications.css      
│   ├── contact.css             
│   ├── footer.css              
│   └── animations.css          ← Reveal animations, keyframes
│
├── js/
│   ├── navbar.js               
│   ├── animations.js           
│   └── cursor.js               
│
└── assets/
    ├── images/
    │   └── portrait.jpg        
    └── resume.pdf              
```



All colors live in **`css/variables.css`**. Edit these variables:

```css
--accent:       #f5a623;   /* Main orange/amber color */
--accent-light: #ffc55e;   /* Hover state */
--bg-base:      #0a0a0f;   /* Darkest background */
--bg-surface:   #111118;   /* Section backgrounds */
--text-primary: #f0f0f5;   /* Main text */

## 🌐 Deploying

### GitHub Pages (Free)
1. Push to a GitHub repository
2. Settings → Pages → Deploy from branch → `main` / `root`
3. Your site will be at `https://yourusername.github.io/repo-name`


### Vercel (Free)
1. `npm install -g vercel` (requires Node.js)
2. `cd jasvanth-portfolio && vercel`

---

## 🛠 Built With

- Pure HTML5, CSS3, Vanilla JavaScript — no frameworks, no dependencies
- Google Fonts: [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)

yeahhh folks. it is build by me
