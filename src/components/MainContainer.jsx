import { useEffect } from "react"
import { useState } from 'react'

function MainContainer(props) {
    const Content = props.Content
    const [ fullscreen, setFullscreen ] = useState(false)
    const topButtons = () => {
        if (props.mode !== '') {
            return (
                <div className='topButtonContainer'>
                    <button className='buttons backButton' onClick={() => {props.setMode('')}}/>
                    <button className={`buttons ${fullscreen? 'exitFullscreenButton':'fullscreenButton'}`} onClick={() => {setFullscreen(!fullscreen)}}>{'F'}</button>
                </div>
            )
        }
    }
    useEffect(() => {
        window.addEventListener('fullscreenchange', (e) => {
            if (!document.fullscreenElement) {
                setFullscreen(false)
            }
        })
    }, [])
    useEffect(() => {
        const mainContainer = document.querySelector("#mainContainer")
        if (fullscreen) {
            mainContainer.requestFullscreen()
        } else if (document.fullscreenElement !== null) {
            document.exitFullscreen();
        }
    }, [fullscreen])

    return (
        <div className='mainContainer' id='mainContainer'>
            {topButtons()}
            <div className='mainContainerContent'>
                <Content
                mode={props.mode}
                setMode={props.setMode}
                />
            </div>
        </div>
    )
}
export { MainContainer }