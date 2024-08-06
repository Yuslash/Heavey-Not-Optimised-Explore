import { MapControls, OrbitControls, PointerLockControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Environment from './Environment.jsx'
import Player from './Player.jsx'
import Models from './Models.jsx'
import { Physics, Debug } from '@react-three/rapier'
import BenModels from './BenModels.jsx'
import Wrath from './Wrath.jsx'
import Carnitrix from './Carnitrix.jsx'
import Gate from './Gate.jsx'
import Portal from './Portal.jsx'

export default function Experience()
{
    return <>
    {/* <OrbitControls /> */}

    <Physics>
    {/* <Debug /> */}
        <Lights />
        <Environment />
        {/* <Player /> */}
        {/* <Models /> */}
        {/* <BenModels /> */}
        <Wrath />
        <Carnitrix />
        <Gate />
        <Portal />
    </Physics>
    </>
}