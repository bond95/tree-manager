import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Node from '../Node';
import Tooltip from '../Tooltip';
import { FIRST_NODE } from '../../constants/nodes';

import { Stage, Layer } from 'react-konva';

const getNodesChildren = (nodes, id) => (
	!nodes[id]
		? []
		: nodes[id].reduce((acc, cur) => Array.isArray(nodes[cur]) ? [...acc, ...nodes[cur]] : acc, [])
);

class App extends React.Component {
	state = {
		showTooltip: false
	};
	firstNodeRef = React.createRef();

	componentDidMount() {
		this.setState({ showTooltip: true });
	}

	buildNodes = () => {
		const { tree, onAddNode } = this.props;
		const nodeChilds = {};	// Object where key is parent ID, value is array of child nodes
		const nodeComponents = {};
		// Parse each node
		for (let node of tree) {
			if (!nodeChilds[node.parent]) {
				nodeChilds[node.parent] = [];
			}
			nodeChilds[node.parent].push(node.id);
			nodeComponents[node.id] = <Node key={node.id} id={node.id} onAddNode={onAddNode} />
			if (node.id === FIRST_NODE.id) {
				nodeComponents[node.id] = <Node key={node.id} id={node.id} onAddNode={onAddNode} ref={this.firstNodeRef} />
			}
		}

		let currentId = FIRST_NODE.parent;
		let nodeStack = [FIRST_NODE.parent];
		// Building tree starting from leafes
		do {
			const nodesChildren = getNodesChildren(nodeChilds, currentId);
			if (nodesChildren.length === 0 && currentId !== null) {
				if (nodeChilds[currentId]) {
					nodeComponents[currentId] = React.cloneElement(
						nodeComponents[currentId],
						{},
						nodeChilds[currentId].map(id => nodeComponents[id])
					);
				}
				delete nodeChilds[currentId];
				nodeStack.pop();
			} else {
				nodeStack.push(...nodeChilds[currentId]);
				nodeStack.push(...nodesChildren);
			}
			currentId = nodeStack[nodeStack.length - 1];
		} while (nodeStack.length > 1);
		return nodeChilds[FIRST_NODE.parent].map(id => nodeComponents[id]);
	}

	render() {
		return (
			<div className="App">
				<div className="top-panel">
					<h1>Tree Manager</h1>
				</div>
				<Stage
					width={window.innerWidth - 12}
					height={window.innerHeight - 112}
					draggable={true}
					onMouseOver={() => document.body.style.cursor = 'move'}
					onMouseLeave={() => document.body.style.cursor = 'default'}
				>
					<Layer>
						{this.buildNodes()}
						{this.state.showTooltip && <Tooltip nodeRef={this.firstNodeRef} onClick={() => this.setState({ showTooltip: false })} />}
					</Layer>
				</Stage>
			</div>
		);
	}
}

App.propTypes = {
	tree: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			parent: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.oneOf([null])
			])
		})
	),
	onAddNode: PropTypes.func.isRequired
}

export default App;
