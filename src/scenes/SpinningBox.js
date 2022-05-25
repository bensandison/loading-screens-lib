import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function SpinningBox() {
	const boxRef = useRef();
	useFrame((state, delta) => {
		boxRef.current.rotation.x += 0.02;
		boxRef.current.rotation.y += 0.02;
	});

	const colors = [
		"magenta",
		"purple",
		"magenta",
		"purple",
		"magenta",
		"purple",
	];

	return (
		<>
			<mesh ref={boxRef} scale={[3, 3, 3]}>
				<boxGeometry args={[1, 1, 1]} />
				{colors.map((color, i) => {
					return (
						<meshBasicMaterial
							key={i}
							color={color}
							attach={`material-${i}`}
						></meshBasicMaterial>
					);
				})}
			</mesh>
		</>
	);
}
