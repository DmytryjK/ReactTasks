import React from "react";

function App() {
	return (
		<Container
			left = {
				<DynamicContent>
					<h2>Left Side content</h2>
				</DynamicContent>		
			}

			right = {
				<DynamicContent>
					<h2>Right Side content</h2>
				</DynamicContent>		
			}
		/>
			
	);
}

const Container = (props) => {
	return (
		<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
			<div className="left-side">
				{props.left}
			</div>
			<div className="right-side">
				{props.right}
			</div>
		</div>
	)
}

const DynamicContent = (props) => {
	return(
		<>
			{props.children}
		</>
	)
}

export default App;
