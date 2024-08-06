import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

export default function BenModels() {
    /**
     * Keyboard controls
     */
    const [subscribeKeys, getKeys] = useKeyboardControls();

    const animationName = 'root|root|megawhatt_idle|Base Layer';
    const { scene, animations } = useGLTF('/wrath.glb');
    const { actions } = useAnimations(animations, scene);

    // References for smooth movement and rotation
    const targetPosition = useRef(new THREE.Vector3());
    const targetQuaternion = useRef(new THREE.Quaternion());

    useEffect(() => {
        const action = actions[animationName];
        if (action) {
            action.play();
        }
    }, [actions, animationName]);

    useEffect(() => {
        scene.rotation.y = Math.PI; // Initial rotation setup
    }, [scene]);

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys();
        const camera = state.camera;

        // Update camera position
        camera.position.z = scene.position.z + 4
        camera.position.y = 3
        camera.position.x = 0

        camera.lookAt(scene.position)   

        const moveSpeed = 0.3; // Increase movement increment for better visibility

        // Determine target position and rotation
        if (forward) {
            targetPosition.current.copy(scene.position).setZ(scene.position.z - moveSpeed);
            targetQuaternion.current.setFromEuler(new THREE.Euler(0, Math.PI, 0));
        } else if (backward) {
            targetPosition.current.copy(scene.position).setZ(scene.position.z + moveSpeed);
            targetQuaternion.current.setFromEuler(new THREE.Euler(0, -Math.PI / 14, 0));
        } else if (leftward) {
            targetPosition.current.copy(scene.position).setX(scene.position.x - moveSpeed);
            targetQuaternion.current.setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0));
        } else if (rightward) {
            targetPosition.current.copy(scene.position).setX(scene.position.x + moveSpeed);
            targetQuaternion.current.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        }

        // Smoothly interpolate position and rotation
        scene.position.lerp(targetPosition.current, 0.1); // Adjust the factor for speed
        scene.quaternion.slerp(targetQuaternion.current, 0.1); // Adjust the factor for speed

        // Debugging logs

    });

    return (
        <>
            <primitive object={scene} />
        </>
    );
}
