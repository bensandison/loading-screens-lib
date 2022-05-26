import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useMouse from "@react-hook/mouse-position";
import mapRange from "../utils/mapRange";

export default function Planet({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	// positioning can be changed by the mouse:
	const [xPos, setXpos] = useState(0);
	const [yPos, setYpos] = useState(0);
	useEffect(() => {
		if (!mouse.x) return;
		const newPos = mapRange(mouse.x, 0, mouse.elementWidth, -0.7, 0.7);
		setXpos(newPos);
	}, [mouse.elementWidth, mouse.x]);
	useEffect(() => {
		if (!mouse.y) return;
		const newPos = mapRange(mouse.y, mouse.elementHeight, 0, 0.2, 0.8);
		setYpos(newPos);
	}, [mouse.elementHeight, mouse.y]);

	const gltf = useLoader(GLTFLoader, "/little_planet/scene.gltf");

	const objRef = useRef();

	useFrame((state, delta) => {
		objRef.current.rotation.y += 0.04;
	});

	return (
		<Suspense fallback={null}>
			<primitive
				ref={objRef}
				object={gltf.scene}
				scale={0.19}
				position={[xPos, yPos, 0]}
			/>
		</Suspense>
	);
}
