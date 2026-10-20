//give a star for the repo
//قم بعمل نجمة للمستودع
import axios from 'axios';

const API = 'https://takamura-vx.vercel.app/api/gemini';

let handler = async (m, { text, command, usedPrefix }) => {

	if (!text) {
		return m.reply(`*~⊹‏⊱≼━┈═━⌬〔🤖〕⌬━═┈━≽⊰~*
⿴݃ • \`جـيـمـيـنـي\` 𝆹𝅥  ͎۫ᩧ.𖥔 ˖ 🍌
╮⌬╼╌═┅═⏣⊰🍌⊱⏣═┅═╌╾⌬
┊⌔📝︙ *الاسـتـعـمـال⇜* \`${usedPrefix + command} مرحبا\`
┊⌔1️⃣︙ \`${usedPrefix}gemini\` *⇜ Gemini 1.5 Flash*
┊⌔2️⃣︙ \`${usedPrefix}gemini25\` *⇜ Gemini 2.5 Flash*
┊⌔3️⃣︙ \`${usedPrefix}gemini25lite\` *⇜ Gemini 2.5 Lite*
┊⌔4️⃣︙ \`${usedPrefix}gemini25native\` *⇜ Gemini 2.5 Native*
*~⊹‏⊱≼━┈═━⌬〔🤖〕⌬━═┈━≽⊰~*`);
	}

	let model;
	let modelName;

	if (command === 'gemini' || command === 'جيميني') {
		model = '38flash';
		modelName = 'Gemini 1.5 Flash';
	} else if (command === 'gemini25' || command === 'جيميني25') {
		model = '25flash-default';
		modelName = 'Gemini 2.5 Flash';
	} else if (command === 'gemini25lite' || command === 'جيميني-لايت') {
		model = '25lite';
		modelName = 'Gemini 2.5 Lite';
	} else if (command === 'gemini25native' || command === 'جيميني-نيتف') {
		model = '25native';
		modelName = 'Gemini 2.5 Native';
	} else {
		return;
	}

	await m.react('⏳');

	try {
		const start = Date.now();

		const { data } = await axios.get(`${API}/ask`, {
			params: { prompt: text, model },
			timeout: 60000
		});

		if (!data?.status) throw new Error(data?.error || 'فشل الطلب');

		const reply = data.result?.reply;
		if (!reply) throw new Error('لا يوجد رد');

		const cap = `*~⊹‏⊱≼━┈═━⌬〔🤖〕⌬━═┈━≽⊰~*
⿴݃ • \`${modelName}\` 𝆹𝅥  ͎۫ᩧ.𖥔 ˖ 🍌
╮⌬╼╌═┅═⏣⊰🍌⊱⏣═┅═╌╾⌬

${reply.trim()}

╢ـ ㌐ ˒ ׅ━ׄ┄ׅ -ּ  ֗୨🍌୧ ּ  ֗━ׄ┄ׅ━ׄ㌐ ˒ 
┊⌔🧠︙ *الـمـوديـل⇜* \`${model}\`
┊⌔⚡︙ *الـسـرعـة⇜* \`${Date.now() - start} ms\`
*~⊹‏⊱≼━┈═━⌬〔🤖〕⌬━═┈━≽⊰~*
> ${global.namebot || 'BOT'}`;

		await m.reply(cap);
		await m.react('✅');
	} catch (e) {
		await m.react('❌');
		const msg = e?.response?.data?.error || e?.message || 'خطأ غير معروف';
		m.reply(`*❌ خطأ:* \`${msg}\``);
	}
};

handler.help = ['جيميني', 'gemini25', 'gemini25lite', 'gemini25native'];
handler.tags = ['ai'];
handler.command = [
	'gemini', 'جيميني',
	'gemini25', 'جيميني25',
	'gemini25lite', 'جيميني-لايت',
	'gemini25native', 'جيميني-نيتف'
];

export default handler;
