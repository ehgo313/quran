const path = require('path')
const fs = require('fs/promises')

async function main() {
    const quranTextPath = path.resolve(process.env.QURAN_TEXT)
    const allSurahPath = path.resolve('content/surah')

    const allSurah = await fs.readdir(path.resolve(quranTextPath, 'surah'))

    await createDir(allSurahPath)

    let i = 0

    for (const surah of allSurah) {
        const surahDetail = await fs.readdir(path.resolve(quranTextPath, 'surah', surah))
        const name = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 1]), { encoding: 'utf-8' })
        const nameLatin = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 2]), { encoding: 'utf-8' })
        const allAyah = surahDetail.slice(0, surahDetail.length - 2)

        const surahPath = path.resolve('content/surah', nameLatin.replace(/[^\w-]/gi, '').toLowerCase())

        await createDir(surahPath)

        await fs.writeFile(path.resolve(path.resolve(surahPath, 'index.md')), `---\nname: ${name}latin: "${nameLatin.slice(0, nameLatin.length - 1)}"\nayah: ${allAyah.length}\n---`)

        for (const ayahFile of allAyah) {
            const ayah =  await fs.readFile(path.resolve(quranTextPath, 'surah', surah, ayahFile), { encoding: 'utf-8' })
            const tafsir =  await fs.readFile(path.resolve(quranTextPath, 'tafsir/id/kemenag', surah, ayahFile), { encoding: 'utf-8' })
            const translation =  await fs.readFile(path.resolve(quranTextPath, 'translations/id', surah, ayahFile), { encoding: 'utf-8' })
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

main()