import { Screen } from './Screen'
import { Control } from './Control'
import { useEffect, useState } from 'react'
import defaultBackground from '../img/DefaultBackground.jpg'

function MainContent(props) {
    const [files, setFiles] = useState([])
    const defaultFile = {type: 'image', url: defaultBackground}
    const defaultControl = {playing: false, muted: false}
    const [activeFile, _setActiveFile] = useState(defaultFile)
    const [control, _setControl] = useState(defaultControl)
    const [muted, setMuted] = useState(false)
    const [playing, setPlaying] = useState(false)

    const setActiveFile = (file) => {
        const preFile = JSON.parse(localStorage.getItem('activeFile')) || defaultFile
        if (file.url === preFile.url) {
            _setActiveFile(defaultFile)
            setControl({showing: defaultFile})
            localStorage.setItem('activeFile', JSON.stringify(defaultFile))
        } else {
            _setActiveFile(file)
            setControl({showing: file})
            localStorage.setItem('activeFile', JSON.stringify(file))
        }
    }

    const setControl = (object) => {
        const keys = Object.keys(object)
        const controls = Object.assign(control)

        for (let index = 0; index < keys.length; index++) {
            controls[keys[index]] = object[keys[index]]
            if (keys[index] === 'muted') {
                setMuted(object[keys[index]])
            }
            if (keys[index] === 'playing') {
                setPlaying(object[keys[index]])
            }
        }

        localStorage.setItem('control', JSON.stringify(controls))
    }

    useEffect(() => {
        window.addEventListener('storage', () => {
            const defaultFile2 = {type: 'image', url: defaultBackground}
            const defaultControl2 = {playing: false, muted: false}
            const activeFile = JSON.parse(localStorage.getItem('activeFile')) || defaultFile2
            const actualControl = JSON.parse(localStorage.getItem('control')) || defaultControl2
            _setActiveFile(activeFile)
            _setControl(actualControl)
        })
    }, [])

    if (props.mode === '') {
        return (
        <div className='switchModeContainer'>
            <button className='buttons screenButton' onClick={() => props.setMode('screen')}/>
            <button className='buttons controlButton' onClick={() => props.setMode('control')}/>
        </div>
        )
    }
    if (props.mode === 'screen') {
        return (
            <Screen 
                control={control} 
                setControl={setControl} 
                activeFile={activeFile}
            />
        )
    }
    if (props.mode === 'control') {
        return (
            <Control
                defaultFile={defaultFile}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
                control={control} 
                setControl={setControl} 
                files={files} 
                setFiles={setFiles}
                volumeStatus={muted}
                playing={playing}
            />
        )
    }
}

export { MainContent }