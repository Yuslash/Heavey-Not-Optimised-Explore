import * as THREE from 'three'
import { useAnimations, useGLTF, useKeyboardControls,PointerLockControls } from "@react-three/drei"
import { useEffect, useRef  } from "react"
import { useFrame, useThree } from "@react-three/fiber";

export default function Wrath()
{
    const animationName = 'root|root|megawhatt_idle|Base Layer';
    const { scene, animations } = useGLTF('/wrath.glb')
    const { actions } = useAnimations(animations, scene)
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { camera } = useThree()

    const targetQuaternion = useRef(new THREE.Quaternion())

    useEffect(()=>
    {
        const action = actions[animationName]

        if(action)
        {
            action.play()
        }

    },[actions,animationName])

    scene.rotation.y = Math.PI
    camera.lookAt(scene.position)
    
    useFrame((state, delta)=>
    {  
        // camera.lookAt(scene.position)
        // camera.position.copy(scene.position)
        // camera.position.y += 3
        // camera.position.z +=  4

               
        const { forward, backward, leftward, rightward } = getKeys()

        if(forward) 
        {
            scene.position.z -= delta * 4
            targetQuaternion.current.setFromEuler(new THREE.Euler(0,Math.PI, 0))
        }
        if(backward)
        {
            scene.position.z += delta * 4
            targetQuaternion.current.setFromEuler(new THREE.Euler(0,- Math.PI / 14,0)) 
        } 
        if(rightward)
        {
            scene.position.x += delta * 4
            targetQuaternion.current.setFromEuler(new THREE.Euler(0,Math.PI / 2,0))
        }
        if(leftward)
        {
            scene.position.x -= delta * 4 
            targetQuaternion.current.setFromEuler(new THREE.Euler(0,-Math.PI / 2,0))
        }

        scene.quaternion.slerp(targetQuaternion.current,0.1)

        // camera controls
        const scenePosition = scene.position

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(scenePosition)
        //orbitControls configure
        cameraPosition.y += 4
        cameraPosition.z += 3
        
        const cameraTarget = new THREE.Vector3()
        cameraTarget.y += 2
        cameraTarget.copy(scenePosition)

        //third person configure
        // cameraTarget.y += 7
        // cameraPosition.y += 5
        // cameraPosition.z += 3.5


        state.camera.position.copy(cameraPosition)

    })

    return <>
        <primitive object={scene} />
    </>
}