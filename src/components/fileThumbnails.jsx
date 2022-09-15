function FileThumbnails(props) {
    const { files, activeFile, setActiveFile } = props

    let key = -1
    const items = files.map((file) => {
        let className = file === activeFile? 'mediaThumbnail activeMediaThumbnail': 'mediaThumbnail';
        key++        
        return (
            <li 
                onClick={() => setActiveFile(file)} 
                className={className}
                key={key}
            >
                <img alt="Thumbnail" src={file.thumb || file.url}/>
            </li>
        )
    })

    return <ul className='mediaThumbnails'>{items}</ul>
}

export { FileThumbnails }