import { Sparkles, useGLTF, useTexture } from "@react-three/drei"

export default function Portal()
{
   const { nodes } = useGLTF('/model/portal.glb')
   const bakedTexture = useTexture('/model/baked.jpg')
   bakedTexture.flipY = false
    return <>
    <mesh position-y={0.01} scale-x={2.5} scale={2.5} scale-z={2.5} position-z={-17 } geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedTexture} />
    </mesh>
    <mesh
     geometry={nodes.poleLightA.geometry} 
    position={[1.80,2.67,-16.45]}
    scale={2.8}

    />

        <mesh
            geometry={nodes.poleLightA.geometry}
            position={[-1.60, 2.67, -16.45]}
            scale={2.8}

        />

        <mesh geometry={nodes.portalLight.geometry} scale={3}
            position={[0,2,-21.5]}
            rotation-x={Math.PI / 2}
            
         />

         <Sparkles
         position-z={-18}
         size={12}
         scale={[12,2,8]}
         color={'green'}
         count={300}
          />

    </>
}