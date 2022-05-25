import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Planet() {
	const gltf = useLoader(GLTFLoader, "/little_planet/scene.gltf");

	const ref = useRef();
	useFrame((state, delta) => {
		ref.current.rotation.y += 0.04;
	});

	return (
		<Suspense fallback={null}>
			<primitive
				ref={ref}
				object={gltf.scene}
				scale={0.19}
				position={[0, 0.5, 0]}
			/>
		</Suspense>
	);
}
