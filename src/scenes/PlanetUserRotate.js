import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useMouse from "@react-hook/mouse-position";
import mapRange from "../utils/mapRange";

export default function PlanetUserRotate({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	const [spinX, setSpinX] = useState(0.04);
	useEffect(() => {
		if (!mouse.x) return;
		const newPos = mapRange(mouse.x, 0, mouse.elementWidth, -0.15, 0.15);
		setSpinX(newPos);
	}, [mouse.elementWidth, mouse.x]);

	const [spinY, setSpinY] = useState(0.04);
	useEffect(() => {
		if (!mouse.y) return;
		const newPos = mapRange(mouse.y, 0, mouse.elementHeight, 0.02, -0.02);
		setSpinY(newPos);
	}, [mouse.elementHeight, mouse.y]);

	const gltf = useLoader(GLTFLoader, "/little_planet/scene.gltf");

	const objRef = useRef();

	useFrame((state, delta) => {
		objRef.current.rotation.y += spinX;
		objRef.current.rotation.z += spinY;
	});

	return (
		<Suspense fallback={null}>
			<primitive
				ref={objRef}
				object={gltf.scene}
				scale={0.19}
				position={[0, 0.5, 0]}
			/>
		</Suspense>
	);
}
