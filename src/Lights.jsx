export default function Lights()
{
    return <>
        <directionalLight
            // color={'blue'}
            castShadow
            position={ [ 4, 4, -8 ] }
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />
        <ambientLight intensity={ 1.5 } />
        {/* <rectAreaLight intensity={100} color={'green'} position-z={-18} /> */}
        <pointLight intensity={1000} position={[0,0,-18]} color={'green'} />
    

    </>
}