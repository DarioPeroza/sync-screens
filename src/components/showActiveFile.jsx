function showActiveFile(file) {
    if (typeof file === 'object' && file.type === 'video') {
        return (
            <video src={file.url}/>
        )
    }
    if (typeof file === 'object' && file.type === 'image') {
        return (
            <img alt='Imagen activa' src={file.url}/>
        )
    }
}

export { showActiveFile }