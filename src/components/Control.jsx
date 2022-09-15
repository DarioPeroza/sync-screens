import { useEffect, useState } from 'react'
import { setFileThumbnails as _setFileThumbnails } from '../helpers/setFileThumbnails'
import { FileThumbnails } from './fileThumbnails'
import { showActiveFile } from './showActiveFile'
import '../css/Control.css'

function Control(props) {
    const {defaultFile, files, setFiles, control, setControl, activeFile, setActiveFile, volumeStatus, playing} = props
    const [controlActiveFile, _setControlActiveFile] = useState(activeFile)
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.clear()
        })
    }, [])

    const setControlActiveFile = (file) => {
        _setControlActiveFile(file)
    }

    const setFileThumbnails = (newFiles) => {
        _setFileThumbnails(newFiles, files, setFiles).then(() => {
            document.querySelector('#addFilesInput').value = ''
        })
    }

    const showMedia = (reset = false) => {
        setControl({playing: false, muted: false})
        setActiveFile(controlActiveFile)
        if (reset) {
            setActiveFile(controlActiveFile, defaultFile)
        }
    }

    const hideMedia = () => {
        setActiveFile(defaultFile)
    }
    
    const deleteFile = file => {
        if (file.url !== defaultFile.url) {
            const filteredFiles = files.filter(f => f.url !== file.url)
            if (activeFile.url === file.url) {
                setControlActiveFile(defaultFile)
                setActiveFile(defaultFile)
            }
            setFiles(filteredFiles)
        }
    }

    const showAddButton = () => {
        return (
            <button 
                onClick={() => document.querySelector('#addFilesInput').click()}
                className='buttons addButton'
            />
        )
    }
    
    const showDeleteButton = () => {
        if (controlActiveFile.url !== defaultFile.url) {
            return (
                <button 
                    onClick={() => deleteFile(controlActiveFile)}
                    className='buttons deleteButton'
                />
            )
        }
    }

    const showCloseButton = () => {
        if (activeFile.url !== defaultFile.url) {
            return (
                <button 
                    onClick={() => hideMedia()}
                    className='buttons closeButton'
                />
            )
        }
    }

    const showMediaButton = () => {
        let eyeClass = 'showMediaButton'
        if (activeFile.url === controlActiveFile.url) {
            eyeClass = 'hideMediaButton'
        }
        if (controlActiveFile.url !== defaultFile.url) {
            return (
                <button 
                    onClick={() => showMedia()}
                    className={`buttons ${eyeClass}`}
                />
            )
        }
    }
    
    const showMuteButton = (muted) => {
        if (activeFile.type === 'video') {
            return (
                <button 
                    onClick={() => setControl({muted: !control.muted})}
                    className={`buttons ${muted? 'volumeButton': 'muteButton'}`}
                />
            )
        }
    }

    const showPlayButton = (playing) => {
        if (activeFile.type === 'video') {
            return (
                <button 
                    onClick={() => setControl({playing: !control.playing})}
                    className={`buttons ${playing? 'pauseButton': 'playButton'}`}
                />
            )
        }
    }

    const showResetButton = () => {
        if (activeFile.url !== defaultFile.url && activeFile.type === 'video') {
            return (
                <button 
                    onClick={() => showMedia(true)}
                    className={`buttons resetButton`}
                />
            )
        }
    }

    return (
        <div className="controlContainer">
            <div className='activeFile'>
                {showActiveFile(activeFile)}
            </div>
            <div className='controlPanel'>
                <div>
                    <input 
                        type={'file'} 
                        accept="audio/*,video/*,image/*" 
                        onChange={e => setFileThumbnails(e.target.files)}
                        id='addFilesInput'
                        multiple 
                    />
                    {showAddButton()}
                    {showDeleteButton()}
                </div>
                <div>
                    {showMuteButton(volumeStatus)}
                    {showPlayButton(playing)}
                    {showResetButton()}
                </div>
                <div>
                    {showMediaButton()}
                    {showCloseButton()}
                </div>
            </div>
            <FileThumbnails files={files} activeFile={controlActiveFile} setActiveFile={setControlActiveFile}/>
        </div>
    )
}

export { Control }