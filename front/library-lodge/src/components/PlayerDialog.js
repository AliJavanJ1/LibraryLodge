import {Replay} from "vimond-replay";
import {Dialog} from "@mui/material";
import 'vimond-replay/index.css';

export default function PlayerDialog({url, open, onClose}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={false}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    overflow: 'hidden',
                }
            }}
        >
            <Replay
                source="https://vimond.github.io/replay/public/example-media/progressive.mp4" // TODO: replace with url
                initialPlaybackProps={{ isPaused: true }}
            />
        </Dialog>
    )
}