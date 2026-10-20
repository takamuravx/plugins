//by yamazaki
//https://whatsapp.com/channel/0029VbDme5w2v1IwlyQ0Dm1a

import axios from 'axios'
import * as cheerio from 'cheerio'

const BASE_URL = 'https://aivoicegenerator.com'
const DEFAULT_VOICE = 'xoCrBu0Re6807a59702179cfa9e078954784f43e7uPjtUJeN0_neural'

class AiVoiceGenerator {
constructor() {
this.base_url = BASE_URL
this.jar = {}
this.cache = {}
this.client = axios.create({
baseURL: this.base_url,
timeout: 35000,
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
'sec-ch-ua-platform': '"Android"',
'sec-ch-ua-mobile': '?1',
'sec-ch-ua': '"Lemur";v="135", "", "", "Microsoft Edge Simulate";v="135"'
}
})

    this.client.interceptors.request.use(req => {
        console.log(`[AI VOICE] REQUEST ${req.method?.toUpperCase()} ${req.url}`)
        const cookies = Object.entries(this.jar).map(([k, v]) => `${k}=${v}`).join('; ')
        if (cookies) req.headers.Cookie = cookies
        return req
    }, err => Promise.reject(err))

    this.client.interceptors.response.use(res => {
        console.log(`[AI VOICE] RESPONSE ${res.status} ${res.config?.url}`)
        const raw = res.headers?.['set-cookie'] || []
        ;(Array.isArray(raw) ? raw : [raw]).forEach(cookie => {
            if (!cookie) return
            const [pair] = cookie.split(';')
            const [key, ...value] = pair.split('=')
            if (key?.trim()) this.jar[key.trim()] = value.join('=').trim()
        })
        return res
    }, err => {
        console.error('[AI VOICE] HTTP ERROR:', err.response?.status || err.message)
        return Promise.reject(err)
    })
}

hd(ref = '') {
    return {
        'X-Requested-With': 'XMLHttpRequest',
        Referer: ref ? (ref.startsWith('http') ? ref : `${this.base_url}${ref}`) : `${this.base_url}/`,
        Origin: this.base_url,
        Accept: '*/*'
    }
}

val_str(value, name, required = true) {
    const clean = value != null ? String(value).trim() : ''
    if (required && !clean) throw new Error(`Parameter "${name}" is required.`)
    return clean
}

async ini() {
    if (this.cache.home) return this.cache.home

    console.log('[AI VOICE] Fetching homepage and CSRF token...')
    const res = await this.client.get('/', {
        headers: { 'Upgrade-Insecure-Requests': '1' }
    })

    const $ = cheerio.load(res.data || '')
    const csrf = $('input[name="csrf_test_name"]').val() || ''

    if (!csrf) throw new Error('Could not extract csrf_test_name from homepage.')

    this.cache.home = { csrf }
    console.log('[AI VOICE] CSRF token extracted successfully.')
    return this.cache.home
}

async voice_list({ lang } = {}) {
    try {
        const targetLang = lang ? this.val_str(lang, 'lang', false) : ''

        if (!this.cache.voices) {
            const res = await this.client.get('/home/tryme_voice/', {
                headers: {
                    ...this.hd('/'),
                    Accept: 'application/json, text/javascript, */*; q=0.01'
                }
            })

            const list = Array.isArray(res.data) ? res.data : []
            if (!list.length) throw new Error('The voice list returned empty.')
            this.cache.voices = list
        }

        let voices = this.cache.voices
        if (targetLang) {
            voices = voices.filter(v =>
                String(v.languageCode || '').toLowerCase() === targetLang.toLowerCase() ||
                String(v.languageName || '').toLowerCase().includes(targetLang.toLowerCase())
            )
        }

        return { status: true, result: { total_voices: voices.length, voices } }
    } catch (err) {
        console.error('[AI VOICE] VOICE LIST:', err.message)
        return { status: false, result: { message: err.message } }
    }
}

async create({ text, voice = DEFAULT_VOICE, lang = 'jv-ID' } = {}) {
    try {
        const content = this.val_str(text, 'text')
        const voiceInput = this.val_str(voice, 'voice')
        const langInput = this.val_str(lang, 'lang')

        if (content.length > 3000) throw new Error('Text exceeds 3000 characters.')

        if (!this.cache.voices) {
            const list = await this.voice_list()
            if (!list.status) throw new Error(list.result.message)
        }

        const voices = this.cache.voices || []
        const selected =
            voices.find(v => String(v.ids) === voiceInput) ||
            voices.find(v =>
                String(v.name || '').toLowerCase() === voiceInput.toLowerCase() &&
                (
                    String(v.languageCode || '').toLowerCase() === langInput.toLowerCase() ||
                    String(v.languageName || '').toLowerCase().includes(langInput.toLowerCase())
                )
            ) ||
            voices.find(v => String(v.name || '').toLowerCase() === voiceInput.toLowerCase())

        if (!selected) {
            const examples = voices.slice(0, 10)
                .map(v => `${v.name} (${v.languageCode})`).join(', ')
            throw new Error(`Voice "${voiceInput}" not found. Available examples: ${examples}`)
        }

        const page = await this.ini()
        const activeLang = selected.languageCode || langInput

        console.log(`[AI VOICE] Generating ${content.length} characters; voice=${selected.name}; lang=${activeLang}`)

        const form = new URLSearchParams()
        form.append('csrf_test_name', page.csrf)
        form.append('front_tryme_language', activeLang)
        form.append('front_tryme_voice', selected.ids)
        form.append('front_tryme_text', content)

        const res = await this.client.post('/home/tryme_action/', form.toString(), {
            headers: {
                ...this.hd('/'),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })

        const result = res.data || {}
        if (!result.result || !result.tts_uri) {
            throw new Error(result.message || 'The website did not return an audio URL.')
        }

        const audioUrl = new URL(result.tts_uri, this.base_url).href
        console.log('[AI VOICE] Downloading audio:', audioUrl)

        const audioRes = await axios.get(audioUrl, {
            responseType: 'arraybuffer',
            timeout: 35000,
            maxContentLength: 25 * 1024 * 1024,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/135.0.0.0 Mobile Safari/537.36',
                Referer: `${this.base_url}/`
            }
        })

        const audio = Buffer.from(audioRes.data || [])
        if (!audio.length) throw new Error('The downloaded audio buffer is empty.')

        const contentType = String(audioRes.headers?.['content-type'] || '').toLowerCase()
        if (contentType.includes('text/html') || contentType.includes('application/json')) {
            throw new Error('The audio URL returned a webpage instead of an audio file.')
        }

        console.log(`[AI VOICE] Audio downloaded: ${audio.length} bytes`)

        return {
            status: true,
            result: {
                audio,
                audio_url: audioUrl,
                audio_format: 'mp3',
                voice_id: selected.ids,
                voice_name: selected.name,
                language: activeLang,
                language_name: selected.languageName,
                engine: selected.engine,
                gender: selected.gender,
                char_count: content.length
            }
        }
    } catch (err) {
        console.error('[AI VOICE] GENERATION ERROR:', err.response?.status || '', err.message)
        return {
            status: false,
            result: {
                message: err.response?.data?.message || err.message || 'Speech generation failed.'
            }
        }
    }
}

}

const api = new AiVoiceGenerator()

let handler = async (m, { conn, args, usedPrefix, command }) => {
const raw = String(m.text || '').trim()
const input = args.join(' ').trim() ||
raw.replace(new RegExp("^${usedPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${command}\\s*", 'i'), '').trim()

if (!input) {
    return m.reply(
        '*AI VOICE GENERATOR*\n\n' +
        `• ${usedPrefix + command} Hello world\n` +
        `• ${usedPrefix + command} --voices\n` +
        `• ${usedPrefix + command} --voices en-US\n` +
        `• ${usedPrefix + command} --voice Tuti | Halo dunia`
    )
}

if (/^--voices(?:\s|$)/i.test(input)) {
    const lang = input.replace(/^--voices\s*/i, '').trim()
    const response = await api.voice_list({ lang: lang || undefined })

    if (!response.status) throw response.result.message

    const voices = response.result.voices
    if (!voices.length) throw 'No voices found for the requested language.'

    const lines = voices.slice(0, 70).map((v, i) =>
        `${i + 1}. ${v.name}\nLanguage: ${v.languageName || v.languageCode}\nID: ${v.ids}\nGender: ${v.gender || 'Unknown'}`
    )

    return m.reply(
        `*AVAILABLE VOICES*\n\n${lines.join('\n\n')}\n\n` +
        `Total: ${voices.length}` +
        (voices.length > 70 ? '\nShowing the first 70 voices.' : '')
    )
}

let text = input
let voice = DEFAULT_VOICE

const voiceMatch = input.match(/^--voice\s+([^|]+)\|\s*([\s\S]+)$/i)
if (voiceMatch) {
    voice = voiceMatch[1].trim()
    text = voiceMatch[2].trim()
}

if (!text) throw 'Enter the text you want to convert to speech.'
if (text.length > 3000) throw 'Text cannot exceed 3000 characters.'

await conn.sendMessage(m.chat, {
    react: { text: '⏳', key: m.key }
}).catch(() => {})

const response = await api.create({ text, voice })

if (!response.status) {
    await conn.sendMessage(m.chat, {
        react: { text: '❌', key: m.key }
    }).catch(() => {})
    throw response.result.message
}

const result = response.result
const audio = result.audio

if (!Buffer.isBuffer(audio) || !audio.length) {
    throw 'The audio was generated without a valid audio buffer.'
}

await conn.sendMessage(m.chat, {
    audio,
    mimetype: 'audio/mpeg',
    fileName: 'ai-voice.mp3',
    ptt: false
}, { quoted: m })

await conn.sendMessage(m.chat, {
    react: { text: '✅', key: m.key }
}).catch(() => {})

}

handler.help = ['aivoice <text>', 'aivoice --voices', 'aivoice --voices <language>', 'aivoice --voice <name> | <text>']
handler.tags = ['tools', 'ai']
handler.command = /^(aivoice|صوت-ai|توليد-الصوت)$/i

export default handler
