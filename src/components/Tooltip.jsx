import React from 'react';
import PropTypes from 'prop-types';
import { Rect, Text } from 'react-konva';

const Tooltip = ({ nodeRef, onClick }) => {
	const { x, y } = nodeRef.current.attrs;
	return <>
		<Rect
			x={x}
			y={y}
			width={150}
			height={70}
			fill="black"
			opacity={0.6}
			shadowBlur={3}
			onClick={onClick}
		/>
		<Text
			text="Just click on node to add new child"
			x={x + 10}
			y={y + 15}
			width={130}
			fontSize={15}
			align="center"
			fill="white"
			fontFamily="Calibri"
			onClick={onClick}
		/>
	</>
}

Tooltip.propTypes = {
	nodeRef: PropTypes.shape({ current: PropTypes.object }),
	onClick: PropTypes.func.isRequired
};

export default Tooltip;
