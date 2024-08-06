import { useAnimations, useGLTF, useKeyboardControls, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef,act, useEffect, useState } from "react"
import * as THREE from 'three'



export default function Models()
{    

    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { forward, backward, leftward, rightward } = getKeys() 

    const fox = useGLTF('/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations , fox.scene)
    const actions = animations.actions.Walk
    const idle = animations.actions.Survey
    const targetQuaternion = useRef(new THREE.Quaternion());

    

    useEffect(()=>
    {
        // actions.play()
    },[])

    useFrame((state, delta)=>
    {
        const actions = animations.actions.Walk
        const { forward, backward, leftward, rightward } = getKeys()
        
        if(forward)
        {
            fox.scene.position.z += delta
            actions.play()
        }

        if (leftward) {
            targetQuaternion.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), - Math.PI);
        } else if (rightward) {
            targetQuaternion.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
        } else {
            targetQuaternion.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);
        }

        // Apply smooth rotation using quaternion slerp
        fox.scene.quaternion.slerp(targetQuaternion.current, 0.1)

        if(!forward)
        {   
            actions.stop()
            idle.play()
        }

    })

    return <>
        <primitive object={fox.scene} scale={0.02} />
    </>
}