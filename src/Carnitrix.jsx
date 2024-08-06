import { Float, useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Carnitrix()
{
    const animationName = "Animation"
    const { scene, animations } = useGLTF('/ben_10.glb')

    const { actions } = useAnimations(animations, scene)

    useFrame(()=>
    {
        const action = actions[animationName]
        if(action)
        {
            action.play()
        }
    })

    useFrame((state, delta)=>
    {
        scene.rotation.z += Math.sin(delta)  * 0.1
        scene.rotation.y += Math.sin(delta) * 0.1
        
    })

    return <>
        <primitive object={scene} scale={0.2} position={[0,2.2,-21]} />
    </>
}