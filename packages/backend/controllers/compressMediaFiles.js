const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const compressImage = async (inputPath, outputPath, quality = 'low') => {
    const qualitySetting = quality === 'hd' ? 100 : 60;
    await sharp(inputPath)
        .jpeg({ quality: qualitySetting })
        .toFile(outputPath);
};

const compressVideo = async (inputPath, outputPath, quality = 'low') => {
    return new Promise((resolve, reject) => {
        const bitrate = quality === 'hd' ? '1500k' : '600k';

        ffmpeg(inputPath)
            .videoBitrate(bitrate)
            .outputOptions('-preset', 'fast')
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .save(outputPath);
    });
};

module.exports = {compressImage, compressVideo};

