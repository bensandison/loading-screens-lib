import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";
import mapRange from "../utils/mapRange";
import { MathUtils } from "three";
import { useGLTF } from "@react-three/drei";

export default function PlanetUserRotate({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	const { scene } = useGLTF("/little_planet/scene.gltf");
	const copiedScene = useMemo(() => scene.clone(), [scene]);

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
				object={copiedScene}
				scale={0.19}
				position={[0, 0.5, 0]}
			></primitive>
		</Suspense>
	);
}
