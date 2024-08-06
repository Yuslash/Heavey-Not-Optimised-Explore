import {  useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";


export default function Player()
{
       
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const reset = () =>
    {
        body.current.setTranslation({ x: 0, y:1 , z: 0  })
        body.current.setLinvel({ x: 0, y: 0, z: 0 })
        body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useFrame((state, delta)=>
    {
        const bodyPosition = body.current.translation()
        const {forward, backward, leftward, rightward} = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }
        
        const impulseStrength = 0.5 * delta  * 10
        const torqueStrength = 0.2 * delta * 10

        if(forward)
        {
            impulse.z -= impulseStrength
            torque.x += torqueStrength
            
        }

        if (backward) {
            impulse.z = impulseStrength
            torque.x -= torqueStrength
        }

        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        if(bodyPosition.y < -4)
        {
            reset()
        }
        

    })

    return <group position={[0,0,0]}>
        position={ [ 0, 1, 0 ] }
        <RigidBody colliders="ball"  ref={body} restitution={0.2} friction={1} linearDamping={0.5} angularDamping={0.5} position={[0,1,0]}>
        <mesh>
            <icosahedronGeometry args={[0.5,1]} />
            <meshStandardMaterial flatShading color={'orangered'} />
        </mesh>
    </RigidBody>
    </group>
}