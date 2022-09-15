import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator'

async function setFileThumbnails(filesToAdd, previousFiles, setFiles) {
    let newFiles = JSON.parse(JSON.stringify(previousFiles))
    for (let index = 0; index < filesToAdd.length; index++) {
        let file = filesToAdd[index]
        let url = URL.createObjectURL(file)
        let type = 'image'

        if (file.type.includes('video')) {
            type = 'video'
            await generateVideoThumbnails(file).then((thumbs) => {
                let fileToAdd = {url, type, thumb: thumbs[0]}
                newFiles.push(fileToAdd)
            })
        } else if (file.type.includes('image')) {
            let fileToAdd = {url, type}
            newFiles.push(fileToAdd)
        }
    }
    setFiles(newFiles)
}

export { setFileThumbnails }