import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import HotAirBalloon from "./scenes/HotAirBalloon";
import Taurus from "./scenes/Taurus";
import PlanetUserRotate from "./scenes/PlanetUserRotate";
import { Stats, useGLTF } from "@react-three/drei";
import ColorTaurus from "./scenes/ColorTaurus";
import HeadPhones from "./scenes/HeadPhones";

const canvasSize = 300;

// Preload models:
useGLTF.preload("/hot_air_balloon/scene.gltf");
useGLTF.preload("/little_planet/scene.gltf");
useGLTF.preload("/head_phones/scene.gltf");

export default function App() {
	// Mouse ref - passed as a prop so scenes can call useMouse():
	const mouseRef = useRef();

	// All scenes to create buttons out of:
	const sceneProps = { mouseRef: mouseRef }; //Pass in using array destructuring
	const scenesArr = [
		{ name: "Taurus", element: <Taurus {...sceneProps} /> },
		{ name: "Balloon", element: <HotAirBalloon {...sceneProps} /> },
		{ name: "Planet", element: <PlanetUserRotate {...sceneProps} /> },
		{ name: "Color Taurus", element: <ColorTaurus {...sceneProps} /> },
		{ name: "Headphones", element: <HeadPhones {...sceneProps} /> },
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
						<pointLight position={[10, 10, 10]} />
						{scene}
						<Stats></Stats>
					</Canvas>
				</Box>
				<Flex justify="center" align="center" gap={2}>
					<Spinner size="lg" thickness="3px" speed="0.5s"></Spinner>
					<Text fontSize="4xl" fontWeight="semibold">
						Loading
					</Text>
				</Flex>
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
