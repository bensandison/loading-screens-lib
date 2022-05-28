import useMouse from "@react-hook/mouse-position";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function ColorTaurus({ mouseRef }) {
	const mouse = useMouse(mouseRef, {
		enterDelay: 100,
		leaveDelay: 100,
	});

	const colorArray = ["blue", "green", "red"];
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!mouse.isDown) return;
		else boxRef.current.color = "red";
	}, [mouse.isDown, mouse.isTouch]);

	const boxRef = useRef();
	useFrame((state, delta) => {
		boxRef.current.rotation.x += 0.02;
		boxRef.current.rotation.y += 0.02;
	});

	const [wireframe, setWireframe] = useState(false);

	useEffect(() => {
		if (mouse.isDown) setWireframe(true);
		else setWireframe(false);
	});

	return (
		<>
			<mesh ref={boxRef} scale={[1, 1, 1]}>
				<torusKnotGeometry args={[1.5, 0.5]}></torusKnotGeometry>
				<meshNormalMaterial
					wireframe={wireframe}
					// flatShading
				></meshNormalMaterial>
			</mesh>
		</>
	);
}
