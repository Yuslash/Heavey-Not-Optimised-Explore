import { RigidBody } from "@react-three/rapier"

export function BlockOne({position = [0, 0, 0]})
{
    return <group position={position} >
    <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
        <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[4,6]} />
            <meshStandardMaterial color={'black'} />
        </mesh>
        <mesh position={[2.05,1,0]}>
            <boxGeometry args={[0.1,2,6]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
        <mesh position={[-2.05, 1, 0]}>
            <boxGeometry args={[0.1, 2, 6]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    </RigidBody>
    </group>
}

export function BlockFloor({ position = [0, 0, 0] }) {
    return <group position={position} >
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
            <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[4, 6]} />
                <meshStandardMaterial color={'black'} />
            </mesh>
        </RigidBody>
    </group>
}

export function BlockWide({ position = [0, 0, 0] }) {
    return <group position={position} >
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
            <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[20, 12]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>
        </RigidBody>
    </group>
}


export default function Environment()
{
    return <>
        <BlockOne />
        <BlockOne position={[0, 0, -4]} />
        <BlockOne position={[0, 0, -8]} />
        <BlockFloor position={[0, 0, -12]} />
        <BlockWide position={[0, 0, -16]} />
    </>
}