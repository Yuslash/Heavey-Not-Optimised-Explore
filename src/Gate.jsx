import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Gate()
{
    const animationName = "Animation"
    const {scene, animations} = useGLTF('/gate.glb')
    const {actions} = useAnimations(animations, scene)

    
    useEffect(()=>
    {
        const action = actions[animationName]
        
        if(action)
        {
            action.play()
        } 

    },[])

    return <>
        <primitive object={scene} scale={[0.8, 0.6, 0.6]} position={[0,0,-11]} />
    </>
}