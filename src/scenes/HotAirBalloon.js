import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useMouse from "@react-hook/mouse-position";
import mapRange from "../utils/mapRange";

export default function Planet({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	const gltf = useLoader(GLTFLoader, "/hot_air_balloon/scene.gltf");
	const objRef = useRef();

	// positioning can be changed by the mouse:
	useEffect(() => {
		if (!mouse.x) return;
		const newPos = mapRange(mouse.x, 0, mouse.elementWidth, -0.7, 0.7);
		objRef.current.position.x = newPos;
	}, [mouse.elementWidth, mouse.isDown, mouse.x]);
	useEffect(() => {
		if (!mouse.y) return;
		const newPos = mapRange(mouse.y, mouse.elementHeight, 0, -0.5, 0.5);
		objRef.current.position.y = newPos;
	}, [mouse.elementHeight, mouse.isDown, mouse.y]);

	useFrame((state, delta) => {
		objRef.current.rotation.y += 0.04;
	});

	return (
		<Suspense fallback={null}>
			<primitive
				ref={objRef}
				object={gltf.scene}
				scale={1.2}
				position={[0, 0, 0]}
			/>
		</Suspense>
	);
}
