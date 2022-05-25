import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Planet from "./scenes/Planet";
import SpinningBox from "./scenes/SpinningBox";

export default function App() {
	const [scene, setScene] = useState(<SpinningBox />);

	return (
		<Box className="App" height="100vh" m={0}>
			<Flex as="main" height="90%" justify="center" align="center">
				<Box height="300px" width="300px" borderWidth={2} borderRadius="2xl">
					<Canvas>
						<ambientLight intensity={0.5} />
						<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
						<pointLight position={[-10, -10, -10]} />
						{scene}
					</Canvas>
				</Box>
			</Flex>
			<Flex height="10%" direction="row" align="center" justify="center">
				<Button onClick={() => setScene(<SpinningBox />)}>Spinning Box</Button>
				<Button onClick={() => setScene(<Planet />)}>Planet</Button>
			</Flex>
		</Box>
	);
}
