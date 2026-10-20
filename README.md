<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:09090b,50:6d28d9,100:0891b2&height=200&section=header&text=YAMAZAKI%20X1&fontSize=46&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=WhatsApp%20Bot%20Plugins&descAlignY=60&descSize=18" width="100%" alt="YAMAZAKI X1" />

### ⚡ مكتبة إضافات بوتات واتساب
**Open Source • JavaScript (ESM) • Baileys**

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&pause=1200&color=A78BFA&center=true&vCenter=true&width=520&lines=Plugins+ready+to+drop+in;Fast.+Clean.+Modular.;Built+for+Baileys+bots" alt="typing" />

<br/>

[

![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

](https://wa.me/message/OWNIPAUHZGRDG1)
[

![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram&logoColor=white)

](https://www.instagram.com/yamazaki_x1/)
[

![Channel](https://img.shields.io/badge/WhatsApp-Channel-128C7E?style=for-the-badge&logo=whatsapp&logoColor=white)

](https://whatsapp.com/channel/0029VbDme5w2v1IwlyQ0Dm1a)



![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)




![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=flat-square&logo=javascript&logoColor=black)




![Baileys](https://img.shields.io/badge/Baileys-Compatible-6d28d9?style=flat-square)




![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/YOUR_REPO?style=flat-square&color=0891b2)



</div>

---

## 📑 الفهرس

- [نبذة](#-نبذة)
- [المميزات](#-المميزات)
- [التثبيت](#-التثبيت)
- [مثال سريع](#-مثال-سريع)
- [التوافق](#-التوافق)
- [المساهمة](#-المساهمة)
- [التواصل](#-التواصل)
- [إخلاء المسؤولية](#%EF%B8%8F-إخلاء-المسؤولية)

---

## 📦 نبذة

مجموعة إضافات (Plugins) لبوتات واتساب مكتوبة بـ **JavaScript ES Modules**، مصمّمة لتكون خفيفة، مستقلة، وسهلة النسخ والتركيب داخل أي بوت يعتمد على Baileys.

## ✨ المميزات

| الفئة | الوصف |
|:--|:--|
| 🤖 **أوامر البوت** | أوامر وميزات جاهزة للاستخدام الفوري |
| 🛡️ **إدارة المجموعات** | أدوات للتحكم والإشراف على القروبات |
| 🎵 **التحميل** | تكامل مع خدمات تحميل الوسائط |
| 🧠 **الذكاء الاصطناعي** | أدوات وواجهات AI وAPIs |
| ⚙️ **أدوات المطورين** | Utilities لتسريع تطوير البوتات |

## 🚀 التثبيت

```bash
# 1) استنسخ المستودع
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 2) انسخ الإضافة التي تريدها إلى مجلد plugins في بوتك
cp YOUR_REPO/plugins/example.js /path/to/your-bot/plugins/

# 3) ثبّت الاعتماديات المطلوبة للإضافة
npm install

# 4) أضف مفاتيح الـ API (إن وُجدت) ثم أعد تشغيل البوت
npm start
```

> 💡 كل إضافة مستقلة بذاتها؛ راجع أول الملف لمعرفة الاعتماديات والإعدادات المطلوبة.

## 💻 مثال سريع

```js
const handler = async (m, { conn }) => {
  await conn.reply(m.chat, 'Plugin working! ✅', m)
}

handler.help = ['test']
handler.tags = ['main']
handler.command = ['test']

export default handler
```

## 🧩 التوافق

| العنصر | التفاصيل |
|:--|:--|
| **اللغة** | JavaScript (ESM) |
| **البيئة** | Node.js 18+ |
| **الإطار** | بوتات مبنية على Baileys (يختلف التوافق حسب الإضافة) |

## 🤝 المساهمة

المساهمات مرحّب بها:

1. اعمل **Fork** للمستودع
2. أنشئ فرعاً جديداً: `git checkout -b feature/my-plugin`
3. أضف إضافتك مع تعليق مختصر في أول الملف
4. افتح **Pull Request**

## 📬 التواصل

- 📸 **Instagram:** [@yamazaki_x1](https://www.instagram.com/yamazaki_x1/)
- 💬 **WhatsApp:** [راسلني](https://wa.me/message/OWNIPAUHZGRDG1)
- 📢 **القناة:** [انضم هنا](https://whatsapp.com/channel/0029VbDme5w2v1IwlyQ0Dm1a)

## ⚖️ إخلاء المسؤولية

الإضافات مقدّمة لأغراض التطوير والتعلّم. راجع الكود والاعتماديات قبل الاستخدام، واحترم خصوصية المستخدمين وشروط استخدام واتساب.

---

<div align="center">

⭐ **إذا أفادك المستودع، اترك نجمة!**

<sub>Made with 💜 by <b>YAMAZAKI X1</b></sub>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0891b2,50:6d28d9,100:09090b&height=100&section=footer" width="100%" alt="footer" />

</div>
