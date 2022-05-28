import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useMouse from "@react-hook/mouse-position";
import mapRange from "../utils/mapRange";
import { MathUtils } from "three";

export default function PlanetUserRotate({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	const gltf = useLoader(GLTFLoader, "/little_planet/scene.gltf");

	const objRef = useRef();

	useEffect(() => {
		if (!mouse.x) return;
		let newRot = mapRange(mouse.x, 0, mouse.elementWidth, -180, 180);
		newRot = MathUtils.degToRad(newRot);

		objRef.current.rotation.y = newRot;
	}, [mouse.elementWidth, mouse.x]);

	useEffect(() => {
		if (!mouse.y) return;
		let newRot = mapRange(mouse.y, 0, mouse.elementHeight, -70, 110);
		newRot = MathUtils.degToRad(newRot);

		objRef.current.rotation.x = newRot;
	}, [mouse.elementHeight, mouse.y]);

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
