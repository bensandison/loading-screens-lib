import { Suspense, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function HeadPhones() {
	const { scene } = useGLTF("/head_phones/scene.gltf");
	const copiedScene = useMemo(() => scene.clone(), [scene]);

	const objRef = useRef();

	useFrame((state, delta) => {
		objRef.current.rotation.y += 0.03;
	});

	return (
		<Suspense fallback={null}>
			<primitive
				ref={objRef}
				object={copiedScene}
				scale={0.3}
				position={[0, -1.5, 0]}
			/>
		</Suspense>
	);
}
