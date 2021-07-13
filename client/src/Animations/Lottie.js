import { Player } from '@lottiefiles/react-lottie-player';

export const Error404 = ({onComplete}) => {

    return <Player
        autoplay
        speed="0.75"
        loop
        onEvent={(e) => { if (e === 'complete') onComplete() }}
        src="https://assets7.lottiefiles.com/packages/lf20_GIyuXJ.json"
        style={{ height: '300px', width: '300px' }}
    />
}
