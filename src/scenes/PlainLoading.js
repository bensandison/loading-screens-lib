export default function PlainLoading() {
	return (
		<mesh scale={[3, 3, 3]} rotation={[0, 120, 70]}>
			<boxGeometry />
			<meshNormalMaterial />
		</mesh>
	);
}
