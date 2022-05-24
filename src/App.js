import { FlyControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function App() {
	return (
		<div className="App">
			<Canvas>
				<FlyControls></FlyControls>
				<mesh>
					<boxGeometry args={[5, 5, 0]} />
					<meshStandardMaterial />
				</mesh>
			</Canvas>
		</div>
	);
}
