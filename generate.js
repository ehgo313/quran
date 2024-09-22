const path = require('path')
const fs = require('fs/promises')

const quranTextPath = path.resolve(process.env.QURAN_TEXT)

async function main() {
    const allSurahPath = path.resolve('content/surah')

    const allSurah = await fs.readdir(path.resolve(quranTextPath, 'surah'))

    await createDir(allSurahPath)
    await createDir(path.resolve('data'))

    let i = 0
    const dataIndex = []

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
            slug: normalizeSurah(nameLatin),
            prev,
            next
        })

        await fs.writeFile(path.resolve(surahPath, '_index.md'), surahFm)

        for (const ayahFile of allAyah) {
            const ayah = removeNewLine(await fs.readFile(path.resolve(quranTextPath, 'surah', surah, ayahFile), { encoding: 'utf-8' }))
            const tafsir = fixSymbol(await fs.readFile(path.resolve(quranTextPath, 'tafsir/id/kemenag', surah, ayahFile), { encoding: 'utf-8' }))
            const translation = removeNewLine(await fs.readFile(path.resolve(quranTextPath, 'translations/id', surah, ayahFile), { encoding: 'utf-8' }))

            if (/\\(?![nr])/.test(tafsir)) {
                console.log(`${surah} - ${ayahFile}`)
                console.log(tafsir)

                process.exit(0)
            }

            const [ayahNo] = ayahFile.split('.')

            const ayahFm = createFrontMatter({
                title: `"Surah ${removeNewLine(nameLatin)} Ayat ${ayahNo}"`,
                no: ayahNo,
                ayah,
                arabic_no: numToArabic(ayahNo),
                translation: `"${wrapQuotes(translation)}"`,
            })

            const content = createContent(ayahFm, ['## Tafsir', tafsir])

            await fs.writeFile(path.resolve(surahPath, `${ayahNo}.md`), content)
        }

        dataIndex.push({
            slug: normalizeSurah(nameLatin),
            name: removeNewLine(nameLatin),
            ayah: allAyah.length,
            no: +surah
        })

        i++

        console.log(`${i}/${allSurah.length}`)
    }

    await fs.writeFile(path.resolve('data', 'surah.json'), JSON.stringify(dataIndex, null, 2), { encoding: 'utf-8' })

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

function fixSymbol(str) {
    return str
        .replaceAll('\\n', '\n')
        .replaceAll('\\r', '\r')
        .replaceAll(/\\(?![nr])/g, '')
}

function createContent(fm, elem) {
    const content = elem
        .join('\n\n')

    return fm + '\n\n' + content
}

main()