import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import Planet from "./scenes/Planet";
import SpinningBox from "./scenes/SpinningBox";
import PlanetUserRotate from "./scenes/PlanetUserRotate";

const canvasSize = 300;

export default function App() {
	// Mouse ref - passed as a prop so scenes can call useMouse():
	const mouseRef = useRef();

	// All scenes to create buttons out of:
	const scenesArr = [
		{ name: "Planet", element: <Planet mouseRef={mouseRef} /> },
		{ name: "Spinning Box", element: <SpinningBox /> },
		{
			name: "Planet User Rotate",
			element: <PlanetUserRotate mouseRef={mouseRef} />,
		},
	];

	const [scene, setScene] = useState(scenesArr[0].element);

	return (
		<Box className="App" height="100vh" m={0}>
			<Flex
				ref={mouseRef}
				as="main"
				height="90%"
				justify="center"
				align="center"
				direction="column"
			>
				<Box
					height={canvasSize}
					width={canvasSize}
					borderWidth={2}
					borderRadius="2xl"
				>
					<Canvas>
						<ambientLight intensity={0.5} />
						<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
						<pointLight position={[-10, -10, -10]} />
						{scene}
					</Canvas>
				</Box>
				<Text fontSize="4xl" fontWeight="semibold">
					Loading...
				</Text>
			</Flex>
			<Flex
				height="10%"
				direction="row"
				align="center"
				justify="center"
				gap="2"
			>
				{scenesArr.map((item, i) => {
					return (
						<Button
							key={i}
							onClick={() => setScene(item.element)}
							py="8"
							px="5"
							fontSize="2xl"
						>
							{item.name}
						</Button>
					);
				})}
			</Flex>
		</Box>
	);
}
