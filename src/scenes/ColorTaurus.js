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
		if (!mouse.isDown && !mouse.isTouch) return;

		// jump through colorArray
		setIndex((prev) => {
			if (prev > colorArray.length - 2) return 0;
			else return prev + 1;
		});
	}, [colorArray.length, mouse.isDown, mouse.isTouch]);

	const boxRef = useRef();

	useFrame((state, delta) => {
		boxRef.current.rotation.x += 0.02;
		boxRef.current.rotation.y += 0.02;
	});

	return (
		<>
			<mesh ref={boxRef} scale={[1, 1, 1]}>
				<torusKnotGeometry args={[1.5, 0.4, 139, 3, 3, 5]}></torusKnotGeometry>
				<meshPhysicalMaterial color={colorArray[index]}></meshPhysicalMaterial>
			</mesh>
		</>
	);
}
