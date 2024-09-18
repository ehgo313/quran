const path = require('path')
const fs = require('fs/promises')

async function main() {
    const quranTextPath = path.resolve(process.env.QURAN_TEXT)

    const allSurah = await fs.readdir(path.resolve(quranTextPath, 'surah'))

    for (const surah of allSurah.slice(0, 1)) {
        const surahDetail = await fs.readdir(path.resolve(quranTextPath, 'surah', surah))
        const name = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 1]), { encoding: 'utf-8' })
        const nameLatin = await fs.readFile(path.resolve(quranTextPath, 'surah', surah, surahDetail[surahDetail.length - 2]), { encoding: 'utf-8' })
        const allAyah = surahDetail.slice(0, surahDetail.length - 2)

        for (const ayahFile of allAyah) {
            const ayah =  await fs.readFile(path.resolve(quranTextPath, 'surah', surah, ayahFile), { encoding: 'utf-8' })
            const tafsir =  await fs.readFile(path.resolve(quranTextPath, 'tafsir/id/kemenag', surah, ayahFile), { encoding: 'utf-8' })
            const translation =  await fs.readFile(path.resolve(quranTextPath, 'translations/id', surah, ayahFile), { encoding: 'utf-8' })
        }
    }

    process.exit(1)
}

main()