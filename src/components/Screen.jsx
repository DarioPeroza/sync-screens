import ReactPlayer from 'react-player'
import '../css/Screen.css'

function Screen(props) {
    const {activeFile, control} = props

    const screen = () => {
        if (activeFile.type === 'image') {
            return (
                <img alt='Imagen principal' src={activeFile.url}/>
            )
        }
        if (activeFile.type === 'video') {
            return (
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    url={activeFile.url}
                    playing={control.playing}
                    muted={control.muted}
                    
                />
            )
        }
    }
    
    return (
        <div className="screenContainer" id="screenContainer">
            {screen()}
        </div>
    )
}

export { Screen }