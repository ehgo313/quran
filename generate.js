const path = require('path')
const fs = require('fs/promises')

const quranTextPath = path.resolve(process.env.QURAN_TEXT)

async function main() {
    const allSurahPath = path.resolve('content/surah')

    const allSurah = await fs.readdir(path.resolve(quranTextPath, 'surah'))

    await createDir(allSurahPath)

    await fs.writeFile(path.resolve(allSurahPath, '_index.md'), '---\ntitle: Surah\n---')

    let i = 0

    for (const surah of allSurah) {
        const surahDetail = await fs.readdir(path.resolve(quranTextPath, 'surah', surah))
        const name = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 1]), { encoding: 'utf-8' })
        const nameLatin = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 2]), { encoding: 'utf-8' })
        const allAyah = surahDetail.slice(0, surahDetail.length - 2)

        const surahPath = path.resolve('content/surah', normalizeSurah(nameLatin))

        await createDir(surahPath)

        const prev = await getPrev(+surah)
        const next = await getNext(+surah)

        const surahFm = createFrontMatter({
            title: `"${removeNewLine(nameLatin)}"`,
            arabic: `"${removeNewLine(name)}"`,
            no: surah,
            arabic_no: numToArabic(surah),
            ayah: allAyah.length,
            prev,
            next
        })

        await fs.writeFile(path.resolve(surahPath, '_index.md'), surahFm)

        for (const ayahFile of allAyah) {
            const ayah =  await fs.readFile(path.resolve(quranTextPath, 'surah', surah, ayahFile), { encoding: 'utf-8' })
            const tafsir =  await fs.readFile(path.resolve(quranTextPath, 'tafsir/id/kemenag', surah, ayahFile), { encoding: 'utf-8' })
            const translation =  await fs.readFile(path.resolve(quranTextPath, 'translations/id', surah, ayahFile), { encoding: 'utf-8' })

            const [ayahNo] = ayahFile.split('.')

            const ayahFm = createFrontMatter({
                title: `"${removeNewLine(nameLatin)} - ${ayahNo}"`,
                no: ayahNo,
                arabic_no: numToArabic(ayahNo),
                translation: `"${removeNewLine(translation)}"`,
                tafsir: `"${wrapQuotes(tafsir)}"`
            })

            await fs.writeFile(path.resolve(surahPath, `${ayahNo}.md`), `${ayahFm}\n${removeNewLine(ayah)}`)
        }

        i++

        console.log(`${i}/${allSurah.length}`)
    }

    process.exit(1)
}

async function createDir(path) {
    try {
        await fs.access(path)
    } catch (err) {
        await fs.mkdir(path)
    }
}

function removeNewLine(str) {
    return str.slice(0, str.length - 1)
}

function wrapQuotes(str) {
    return str.replace(/["]/gi, '\\"')
}

function numToArabic(num) {
    return `${num}`.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
}

function createFrontMatter(data) {
    const text = Object
        .entries(data)
        .map(([key, value]) => `${key}: ${value}\n`)
        .join('')

    return '---\n' + text + '---'
}

function normalizeSurah(surah) {
    return surah.replace(/[^\w-]/gi, '').toLowerCase()
}

async function getPrev(i) {
    if (i === 1) {
        return null
    }

    const prevI = `${i - 1}`

    const surahDetail = await fs.readdir(path.resolve(quranTextPath, 'surah', prevI))
    const nameLatin = await fs.readFile(path.resolve(quranTextPath, 'surah', prevI, surahDetail[surahDetail.length - 2]), { encoding: 'utf-8' })

    return normalizeSurah(nameLatin)
}

async function getNext(i) {
    if (i === 114) {
        return null
    }

    const nextI = `${i + 1}`

    const surahDetail = await fs.readdir(path.resolve(quranTextPath, 'surah', nextI))
    const nameLatin = await fs.readFile(path.resolve(quranTextPath, 'surah', nextI, surahDetail[surahDetail.length - 2]), { encoding: 'utf-8' })

    return normalizeSurah(nameLatin)
}

main()