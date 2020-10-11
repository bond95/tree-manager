import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Circle, Arrow, Text } from 'react-konva';

// getMaxNumberOfNestedChildren returning number of leafs for given subtree
const getMaxNumberOfNestedChildren = (children) =>
	React.Children.count(children) > 0
		? React.Children.map(children, (child) => getMaxNumberOfNestedChildren(child.props.children)).reduce((acc, cur) => acc + cur)
		: 1;

const Node = React.forwardRef(({ children, xOffset, yOffset, id, onAddNode }, ref) => {
	const [isMouserOver, setMouseOver] = useState(false);
	const childrenArray = [];
	if (children) {
		let numberOfNestedChildren = 0;
		for (let i = 0; i < children.length; i++) {
			// Get number of leafs for previous subtree
			if (i > 0) {
				numberOfNestedChildren += getMaxNumberOfNestedChildren(children[i - 1].props.children) - 1;
			}

			// Create child node and relation
			childrenArray.push(
				React.cloneElement(
					children[i],
					{ xOffset: xOffset + 100, yOffset: yOffset + (100 * (i + numberOfNestedChildren)) }
				)
			);
			childrenArray.push(
				<Arrow
					key={`arrow-${id}-${i}`}
					fill="black"
					stroke="black"
					points={[xOffset + 120, yOffset + 100, xOffset + 180, yOffset + (100 * (i + numberOfNestedChildren + 1))]}
				/>
			)
		}
	}
	return <>
		<Circle
			ref={ref}
			x={xOffset + 100}
			y={yOffset + 100}
			radius={20}
			fill="#484349"
			onClick={() => onAddNode({ parent: id })}
			onMouseOver={() => document.body.style.cursor = 'pointer'}
		/>
		{
			!isMouserOver &&
			<Text
				text={id}
				x={xOffset + 80}
				y={yOffset + 87}
				width={40}
				fontSize={30}
				align="center"
				fill="white"
				fontFamily="Calibri"
				onMouseOver={() => setMouseOver(true) }
			/>
		}
		{
			isMouserOver &&
			<Text
				text="+"
				x={xOffset + 80}
				y={yOffset + 85}
				width={40}
				fontSize={30}
				align="center"
				fill="white"
				fontFamily="Calibri"
				onMouseOut={() => setMouseOver(false)}
				onClick={() => onAddNode({ parent: id })}
				onMouseEnter={() => document.body.style.cursor = 'pointer'}
			/>
		}
		{childrenArray}
	</>
});

Node.propTypes = {
	id: PropTypes.number.isRequired,
	xOffset: PropTypes.number,
	yOffset: PropTypes.number,
	children: PropTypes.arrayOf(PropTypes.node),
	onAddNode: PropTypes.func.isRequired
}

Node.defaultProps = {
	xOffset: 0,
	yOffset: 0
};

export default Node;
